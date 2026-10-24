import { permanentRedirect } from 'next/navigation';

/**
 * Redirection permanente SEO (HTTP 308) vers la page officielle canonique
 * Évite les pénalités Google de contenu dupliqué (Duplicate Content)
 */
export default function HistoireRedirectPage() {
  permanentRedirect('/theorie/histoire-horlogerie-suisse');
}
