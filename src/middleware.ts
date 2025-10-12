// middleware.ts
// i18n totalement désactivé pour stabiliser la version française
// Ce fichier garde une structure propre au cas où tu veux réactiver l'anglais plus tard.

export const config = {
  matcher: [],
};

// ✅ Aucun import, aucune redirection automatique
// ✅ Empêche toute boucle de redirection vers /fr ou /en
// ✅ Compatible avec ton next.config.js (locales: ["fr"] seulement)
