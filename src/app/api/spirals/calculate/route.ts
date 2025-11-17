import { NextRequest, NextResponse } from 'next/server';
import { calculateSpiral } from '@/lib/spiral-calculator';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { diametre, frequence, amplitude, materiau, typeSpiral } = body;

    // Validation
    const errors: string[] = [];
    if (!diametre || diametre <= 0) errors.push('diametre invalide');
    if (!frequence || ![18000, 21600, 25200, 28800, 36000].includes(frequence)) errors.push('frequence invalide');
    if (!amplitude || amplitude < 180 || amplitude > 330) errors.push('amplitude invalide');
    if (!['nivarox', 'silicium', 'acier'].includes(materiau)) errors.push('materiau invalide');
    if (!['phillips', 'breguet', 'grossmann'].includes(typeSpiral)) errors.push('typeSpiral invalide');

    if (errors.length > 0) {
      return NextResponse.json({ error: 'Validation failed', details: errors }, { status: 422 });
    }

    // Calcul
    const params = { diametre, frequence, amplitude, materiau, typeSpiral };
    const results = calculateSpiral(params);

    return NextResponse.json({ success: true, data: results });

  } catch (error) {
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ error: 'Method not allowed, use POST' }, { status: 405 });
}
