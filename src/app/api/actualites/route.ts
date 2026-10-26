// src/app/api/actualites/route.ts
import { NextResponse } from 'next/server';

export const revalidate = 1800; // Mise en cache pendant 30 minutes (ISR)

export interface NewsItem {
  id: string;
  title: string;
  link: string;
  source: string;
  pubDate: string;
  time: string;
  category: string;
}

// Liste de secours garantie si le flux RSS est inaccessible
const FALLBACK_NEWS: NewsItem[] = [
  {
    id: 'fb-1',
    title: 'Exportations horlogères suisses : Résilience et demande soutenue en Haute Horlogerie',
    link: 'https://www.fhs.swiss/fre/statistics.html',
    source: 'Fédération Horlogère Suisse',
    pubDate: new Date().toISOString(),
    time: 'Aujourd’hui',
    category: 'Économie & Industrie'
  },
  {
    id: 'fb-2',
    title: 'Watches & Wonders Geneva : Préparatifs et innovations techniques attendus',
    link: 'https://www.watchesandwonders.com/',
    source: 'Fondation Haute Horlogerie',
    pubDate: new Date().toISOString(),
    time: 'Il y a 1 jour',
    category: 'Événements & Salons'
  },
  {
    id: 'fb-3',
    title: 'Innovations calibres : L’essor des échappements en silicium et des réserves de marche étendues',
    link: 'https://www.fhs.swiss/',
    source: 'Journal Suisse d’Horlogerie',
    pubDate: new Date().toISOString(),
    time: 'Il y a 2 jours',
    category: 'Innovation & Calibres'
  },
  {
    id: 'fb-4',
    title: 'Grand Prix d’Horlogerie de Genève (GPHG) : Les garde-temps présélectionnés',
    link: 'https://www.gphg.org/',
    source: 'GPHG Genève',
    pubDate: new Date().toISOString(),
    time: 'Il y a 3 jours',
    category: 'Haute Horlogerie'
  },
  {
    id: 'fb-5',
    title: 'Formation d’excellence : Les écoles suisses d’horlogerie recrutent la relève de demain',
    link: 'https://www.horlolearn.ch/theorie',
    source: 'HorloLearn Press',
    pubDate: new Date().toISOString(),
    time: 'Il y a 4 jours',
    category: 'Patrimoine & Histoire'
  },
  {
    id: 'fb-6',
    title: 'Ventes aux enchères horlogères : Nouveaux sommets historiques pour les pièces d’époque',
    link: 'https://www.phillips.com/watches',
    source: 'Tribune des Arts',
    pubDate: new Date().toISOString(),
    time: 'Il y a 5 jours',
    category: 'Enchères & Records'
  }
];

function decodeHtml(str: string): string {
  if (!str) return '';
  return str
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&apos;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&eacute;/g, 'é')
    .replace(/&egrave;/g, 'è')
    .replace(/&agrave;/g, 'à')
    .replace(/&ocirc;/g, 'ô')
    .replace(/&icirc;/g, 'î')
    .replace(/&ucirc;/g, 'û')
    .replace(/&ccedil;/g, 'ç')
    .trim();
}

function formatRelativeTime(dateStr: string): string {
  try {
    const d = new Date(dateStr);
    const now = new Date();
    const diffMs = now.getTime() - d.getTime();
    if (isNaN(diffMs) || diffMs < 0) return 'Récemment';

    const diffMinutes = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffMinutes < 60) {
      return `Il y a ${Math.max(5, diffMinutes)} min`;
    }
    if (diffHours < 24) {
      return `Il y a ${diffHours} h`;
    }
    if (diffDays === 1) {
      return 'Hier';
    }
    if (diffDays < 7) {
      return `Il y a ${diffDays} jours`;
    }
    return d.toLocaleDateString('fr-CH', { day: 'numeric', month: 'short' });
  } catch {
    return 'Récemment';
  }
}

function detectCategory(title: string): string {
  const text = title.toLowerCase();
  if (
    text.includes('calibre') ||
    text.includes('mouvement') ||
    text.includes('échappement') ||
    text.includes('silicium') ||
    text.includes('tourbillon') ||
    text.includes('chronographe') ||
    text.includes('brevet') ||
    text.includes('cosc') ||
    text.includes('technique') ||
    text.includes('spirale')
  ) {
    return 'Innovation & Calibres';
  }
  if (
    text.includes('exportation') ||
    text.includes('milliard') ||
    text.includes('chiffre') ||
    text.includes('marché') ||
    text.includes('croissance') ||
    text.includes('crise') ||
    text.includes('rachat') ||
    text.includes('industrie') ||
    text.includes('bilan') ||
    text.includes('fédération') ||
    text.includes('action') ||
    text.includes('seco')
  ) {
    return 'Économie & Industrie';
  }
  if (
    text.includes('watches & wonders') ||
    text.includes('salon') ||
    text.includes('foire') ||
    text.includes('bourse') ||
    text.includes('exposition') ||
    text.includes('geneva watch days') ||
    text.includes('gphg') ||
    text.includes('grand prix') ||
    text.includes('festival')
  ) {
    return 'Événements & Salons';
  }
  if (
    text.includes('enchère') ||
    text.includes('phillips') ||
    text.includes('sotheby') ||
    text.includes('christie') ||
    text.includes('record') ||
    text.includes('f.p. journe') ||
    text.includes('adjudication')
  ) {
    return 'Enchères & Records';
  }
  if (
    text.includes('histoire') ||
    text.includes('patrimoine') ||
    text.includes('musée') ||
    text.includes('mih') ||
    text.includes('hommage') ||
    text.includes('jubilé') ||
    text.includes('centenaire') ||
    text.includes('tradition') ||
    text.includes('archives')
  ) {
    return 'Patrimoine & Histoire';
  }
  return 'Haute Horlogerie';
}

export async function GET() {
  try {
    // Flux Google News ciblé sur la Suisse romande et l'horlogerie (30 derniers jours)
    const RSS_URL = 'https://news.google.com/rss/search?q=horlogerie+suisse+when:30d&hl=fr&gl=CH&ceid=CH:fr';

    const response = await fetch(RSS_URL, {
      next: { revalidate: 1800 },
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'application/rss+xml, application/xml, text/xml;q=0.9, */*;q=0.8',
      },
    });

    if (!response.ok) {
      throw new Error(`Erreur HTTP RSS: ${response.status}`);
    }

    const xml = await response.text();
    const rawItems: Array<NewsItem & { ts: number }> = [];
    const itemRegex = /<item>([\s\S]*?)<\/item>/g;
    let match;

    while ((match = itemRegex.exec(xml)) !== null) {
      const itemXml = match[1];

      const titleMatch =
        itemXml.match(/<title><!\[CDATA\[([\s\S]*?)\]\]><\/title>/) ||
        itemXml.match(/<title>([\s\S]*?)<\/title>/);
      const linkMatch = itemXml.match(/<link>([\s\S]*?)<\/link>/);
      const pubDateMatch = itemXml.match(/<pubDate>([\s\S]*?)<\/pubDate>/);
      const sourceMatch = itemXml.match(/<source[^>]*>([\s\S]*?)<\/source>/);

      const rawTitle = decodeHtml(titleMatch ? titleMatch[1] : '');
      let title = rawTitle;
      let source = sourceMatch ? decodeHtml(sourceMatch[1]) : '';

      if (rawTitle.includes(' - ')) {
        const parts = rawTitle.split(' - ');
        const candidateSource = parts.pop()?.trim();
        if (!source && candidateSource) source = candidateSource;
        title = parts.join(' - ').trim();
      }

      if (title && title.length > 8) {
        const pubDate = pubDateMatch ? pubDateMatch[1].trim() : '';
        const ts = pubDate ? new Date(pubDate).getTime() : 0;
        rawItems.push({
          id: '',
          title,
          link: linkMatch ? linkMatch[1].trim() : '#',
          source: source || 'Presse Horlogère',
          pubDate,
          time: formatRelativeTime(pubDate),
          category: detectCategory(title),
          ts: isNaN(ts) ? 0 : ts,
        });
      }
    }

    // Tri chronologique strict : de la dépêche la plus récente à la plus ancienne
    rawItems.sort((a, b) => b.ts - a.ts);

    const items: NewsItem[] = rawItems.map(({ ts, ...rest }, idx) => ({
      ...rest,
      id: `news-${idx + 1}`,
    }));

    const finalItems = items.length > 0 ? items : FALLBACK_NEWS;

    return NextResponse.json(
      {
        success: true,
        count: finalItems.length,
        lastUpdated: new Date().toISOString(),
        items: finalItems,
      },
      {
        headers: {
          'Cache-Control': 'public, s-maxage=1800, stale-while-revalidate=3600',
        },
      }
    );
  } catch (error) {
    console.error('[API Actualités Horlogères] Erreur :', error);
    return NextResponse.json(
      {
        success: false,
        count: FALLBACK_NEWS.length,
        lastUpdated: new Date().toISOString(),
        items: FALLBACK_NEWS,
        fallback: true,
      },
      {
        status: 200,
        headers: {
          'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
        },
      }
    );
  }
}
