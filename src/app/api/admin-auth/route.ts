// src/app/api/admin-auth/route.ts
import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

const COOKIE_NAME = 'horlo_admin_session';
const MAX_AGE_SECONDS = 60 * 60 * 8; // 8 heures

// Empreinte SHA-256 côté serveur uniquement (jamais exposée dans le bundle client)
// Peut être surchargée dans Vercel / .env.local via ADMIN_MODERATION_PASSWORD ou ADMIN_MODERATION_HASH
const DEFAULT_SERVER_HASH =
  'c19f367dbd785e7a9355ea112edccb4fc8e3ad192dc8a6a1ac0ac71621e67397';

// Protection anti-brute-force en mémoire côté serveur (par IP)
const loginAttempts = new Map<string, { count: number; lockUntil: number }>();

function getSigningSecret(): string {
  return (
    process.env.ADMIN_SESSION_SECRET ||
    process.env.ADMIN_MODERATION_PASSWORD ||
    `horlolearn-hmac-${DEFAULT_SERVER_HASH}`
  );
}

function signToken(exp: number): string {
  const payload = `admin.${exp}`;
  const hmac = crypto
    .createHmac('sha256', getSigningSecret())
    .update(payload)
    .digest('hex');
  return `${payload}.${hmac}`;
}

function verifyToken(token: string | undefined): boolean {
  try {
    if (!token || typeof token !== 'string') return false;
    const parts = token.split('.');
    if (parts.length !== 3 || parts[0] !== 'admin') return false;

    const exp = Number(parts[1]);
    if (!Number.isFinite(exp) || Date.now() > exp) return false;

    const expected = signToken(exp);
    const a = Buffer.from(token);
    const b = Buffer.from(expected);
    return a.length === b.length && crypto.timingSafeEqual(a, b);
  } catch {
    return false;
  }
}

function verifyPasswordConstantTime(input: string): boolean {
  try {
    const inputHashHex = crypto.createHash('sha256').update(input).digest('hex');
    const expectedHashHex = process.env.ADMIN_MODERATION_PASSWORD
      ? crypto
          .createHash('sha256')
          .update(process.env.ADMIN_MODERATION_PASSWORD.trim())
          .digest('hex')
      : (process.env.ADMIN_MODERATION_HASH || DEFAULT_SERVER_HASH).trim().toLowerCase();

    const a = Buffer.from(inputHashHex, 'utf8');
    const b = Buffer.from(expectedHashHex, 'utf8');
    return a.length === b.length && crypto.timingSafeEqual(a, b);
  } catch {
    return false;
  }
}

// 1. GET : Vérifie si le visiteur possède un cookie modérateur HttpOnly valide
export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get(COOKIE_NAME)?.value;
    return NextResponse.json(
      { isAdmin: verifyToken(token) },
      { headers: { 'Cache-Control': 'no-store, max-age=0' } }
    );
  } catch (error) {
    return NextResponse.json(
      { isAdmin: false },
      { headers: { 'Cache-Control': 'no-store, max-age=0' } }
    );
  }
}

// 2. POST : Authentification modérateur côté serveur
export async function POST(req: NextRequest) {
  try {
    const ip =
      req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
      req.headers.get('x-real-ip') ||
      'local';

    const now = Date.now();
    const record = loginAttempts.get(ip) || { count: 0, lockUntil: 0 };

    if (now < record.lockUntil) {
      const remainingSeconds = Math.ceil((record.lockUntil - now) / 1000);
      return NextResponse.json(
        {
          error: `Accès temporairement verrouillé suite à trop d’échecs. Réessayez dans ${remainingSeconds} secondes.`
        },
        { status: 429 }
      );
    }

    const body = await req.json().catch(() => ({}));
    const cleanInput = typeof body.password === 'string' ? body.password.trim() : '';

    if (!cleanInput || !verifyPasswordConstantTime(cleanInput)) {
      const nextAttempts = record.count + 1;
      const lockUntil = nextAttempts >= 4 ? now + 10 * 60 * 1000 : 0;
      loginAttempts.set(ip, { count: nextAttempts, lockUntil });

      const remaining = Math.max(0, 4 - nextAttempts);
      return NextResponse.json(
        {
          error:
            remaining === 0
              ? 'Sécurité : 4 tentatives infructueuses. Verrouillage de sécurité pendant 10 minutes.'
              : `Mot de passe incorrect (${remaining} tentative${remaining > 1 ? 's' : ''} restante${remaining > 1 ? 's' : ''}).`
        },
        { status: 401 }
      );
    }

    loginAttempts.delete(ip);
    const exp = now + MAX_AGE_SECONDS * 1000;
    const token = signToken(exp);

    const res = NextResponse.json({ success: true });
    res.cookies.set(COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
      maxAge: MAX_AGE_SECONDS
    });

    return res;
  } catch (error) {
    return NextResponse.json(
      { error: 'Erreur lors de l’authentification' },
      { status: 500 }
    );
  }
}

// 3. DELETE : Déconnexion modérateur (suppression du cookie HttpOnly)
export async function DELETE() {
  try {
    const res = NextResponse.json({ success: true });
    res.cookies.set(COOKIE_NAME, '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
      maxAge: 0
    });
    return res;
  } catch {
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
