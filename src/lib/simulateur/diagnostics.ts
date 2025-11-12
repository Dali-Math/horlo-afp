import type { Diagnostic, SimulationData } from './types';

/**
 * Génère un diagnostic automatique basé sur les données de simulation
 * Utilise des seuils empiriques issus de l'horlogerie professionnelle
 */
export function generateDiagnostics(data: SimulationData): Diagnostic[] {
  const diagnostics: Diagnostic[] = [];

  // ANALYSE AMPLITUDE
  if (data.amplitude < 200) {
    diagnostics.push({
      level: 'critical',
      text: `⚠️ CRITIQUE: Amplitude ${data.amplitude}° - Risque d'arrêt imminent. Causes probables: pivots grippés, spiral cassé, ressort moteur HS. RÉVISION URGENTE.`
    });
  } else if (data.amplitude < 220) {
    diagnostics.push({
      level: 'critical',
      text: `Amplitude critique (${data.amplitude}°): Risque de décrochage. Vérifier pivots, lubrification et tension ressort moteur.`
    });
  } else if (data.amplitude < 260) {
    diagnostics.push({
      level: 'warning',
      text: `Amplitude basse (${data.amplitude}°): Contrôler lubrification pivots, jeu balancier et encrassement échappement.`
    });
  } else if (data.amplitude > 340) {
    diagnostics.push({
      level: 'warning',
      text: `Amplitude excessive (${data.amplitude}°): Possible choc à la goupille, excès de lubrification ou défaut d'échappement.`
    });
  }

  // ANALYSE USURE PIVOTS
  if (data.pivotWear > 80) {
    diagnostics.push({
      level: 'critical',
      text: `🔴 Usure pivots critique (${data.pivotWear}%): Remplacement immédiat requis. Risque de bris d'axe. Prévoir: pivots neufs + pierres + huile Moebius 9010.`
    });
  } else if (data.pivotWear > 60) {
    diagnostics.push({
      level: 'critical',
      text: `Usure pivots >60%: Planifier remplacement sous 6 mois. Jeu excessif détecté.`
    });
  } else if (data.pivotWear > 40) {
    diagnostics.push({
      level: 'warning',
      text: `Usure pivots notable (${data.pivotWear}%): Surveiller. Lubrification tous les 6 mois recommandée.`
    });
  }

  // ANALYSE BATTEMENT
  if (data.beatError > 1.0) {
    diagnostics.push({
      level: 'critical',
      text: `Battement excessif (${data.beatError}ms): Collerette d'ancre fortement désaxée ou jeu axe balancier. Réglage complexe nécessaire.`
    });
  } else if (data.beatError > 0.5) {
    diagnostics.push({
      level: 'warning',
      text: `Battement élevé (${data.beatError}ms): Ajuster collerette d'ancre ou recentrer goupille plateau.`
    });
  } else if (data.beatError > 0.3) {
    diagnostics.push({
      level: 'warning',
      text: `Battement légèrement hors tolérance (${data.beatError}ms): Optimisation possible via réglage fin ancre.`
    });
  }

  // ANALYSE DÉVIATION TOTALE
  if (data.totalDeviation > 20) {
    diagnostics.push({
      level: 'critical',
      text: `Déviation excessive (+${data.totalDeviation.toFixed(1)}s/j): Mouvement hors spécifications. Analyse complète échappement + spiral requise.`
    });
  } else if (data.totalDeviation < -20) {
    diagnostics.push({
      level: 'critical',
      text: `Retard important (${data.totalDeviation.toFixed(1)}s/j): Friction anormale ou magnétisation. Vérifier antimagnétisme + nettoyage complet.`
    });
  } else if (Math.abs(data.totalDeviation) > 10) {
    diagnostics.push({
      level: 'warning',
      text: `Déviation hors tolérances chronomètre (${data.totalDeviation.toFixed(1)}s/j): Ajustement raquetterie ou spiral requis.`
    });
  }

  // ANALYSE ISOCHRONISME
  if (data.isochronismError > 8) {
    diagnostics.push({
      level: 'critical',
      text: `Défaut d'isochronisme sévère (${data.isochronismError.toFixed(1)}s/j): Spiral probablement fatigué ou déformé. Remplacement à envisager.`
    });
  } else if (data.isochronismError > 5) {
    diagnostics.push({
      level: 'warning',
      text: `Isochronisme dégradé: Vérifier fixation spiral (virole + piton), tension et planage.`
    });
  } else if (data.isochronismError > 3) {
    diagnostics.push({
      level: 'warning',
      text: `Isochronisme sous optimal: Contrôle annuel préventif recommandé.`
    });
  }

  // ANALYSE SCORE HUYGENS
  if (data.huygensScore < 50) {
    diagnostics.push({
      level: 'critical',
      text: `Stabilité positionnelle critique (${data.huygensScore.toFixed(0)}%): Déséquilibre majeur balancier ou défaut pivot. Recentrage masse nécessaire.`
    });
  } else if (data.huygensScore < 70) {
    diagnostics.push({
      level: 'warning',
      text: `Stabilité positionnelle faible: Vérifier équilibrage balancier et jeu pivots.`
    });
  }

  // ANALYSE ÂGE
  if (data.age > 10 && data.pivotWear < 30) {
    diagnostics.push({
      level: 'ok',
      text: `✅ Excellent entretien: ${data.age} ans avec usure minimale. Continuer programme de maintenance actuel.`
    });
  } else if (data.age > 15) {
    diagnostics.push({
      level: 'warning',
      text: `Mouvement ancien (${data.age} ans): Révision complète recommandée même sans symptômes. Lubrifiants potentiellement dégradés.`
    });
  }

  // ANALYSE RESSORT MOTEUR
  if (data.msWear > 70) {
    diagnostics.push({
      level: 'critical',
      text: `Ressort moteur critique (${data.msWear}%): Risque de cassure. Remplacement urgent + contrôle barillet/denture rochet.`
    });
  } else if (data.msWear > 50) {
    diagnostics.push({
      level: 'warning',
      text: `Ressort moteur fatigué: Réduction notable couple. Prévoir remplacement prochaine révision.`
    });
  }

  // CAS OPTIMAL
  if (diagnostics.length === 0) {
    diagnostics.push({
      level: 'ok',
      text: `✅ MOUVEMENT EN EXCELLENT ÉTAT: Tous les paramètres dans les tolérances COSC. Maintenance préventive annuelle suffisante.`
    });
  } else if (diagnostics.filter(d => d.level === 'critical').length === 0) {
    // Si pas de critique mais des warnings
    if (diagnostics.filter(d => d.level === 'warning').length <= 2) {
      diagnostics.push({
        level: 'ok',
        text: `État général: BON. Points d'attention identifiés mais non urgents. Surveiller évolution.`
      });
    }
  }

  return diagnostics;
}

/**
 * Génère des recommandations d'intervention basées sur les diagnostics
 */
export function generateRecommendations(diagnostics: Diagnostic[]): string[] {
  const recommendations: string[] = [];
  const criticals = diagnostics.filter(d => d.level === 'critical');
  const warnings = diagnostics.filter(d => d.level === 'warning');

  if (criticals.length > 0) {
    recommendations.push("🔴 INTERVENTION IMMÉDIATE REQUISE");
    recommendations.push("Consulter horloger certifié dans les 7 jours");
  } else if (warnings.length >= 3) {
    recommendations.push("🟡 RÉVISION RECOMMANDÉE");
    recommendations.push("Planifier intervention sous 3 mois");
  } else if (warnings.length > 0) {
    recommendations.push("🟢 SURVEILLANCE RENFORCÉE");
    recommendations.push("Contrôle dans 6 mois conseillé");
  } else {
    recommendations.push("✅ MAINTENANCE STANDARD");
    recommendations.push("Prochain contrôle dans 12-24 mois selon usage");
  }

  return recommendations;
}

/**
 * Calcule un score de santé global du mouvement (0-100)
 */
export function calculateHealthScore(data: SimulationData): number {
  let score = 100;

  // Pénalités amplitude
  if (data.amplitude < 220) score -= 30;
  else if (data.amplitude < 260) score -= 15;
  else if (data.amplitude < 280) score -= 5;

  // Pénalités usure
  score -= data.pivotWear * 0.3;
  score -= data.msWear * 0.2;

  // Pénalités battement
  if (data.beatError > 1.0) score -= 20;
  else if (data.beatError > 0.5) score -= 10;
  else if (data.beatError > 0.3) score -= 5;

  // Pénalités déviation
  if (Math.abs(data.totalDeviation) > 20) score -= 25;
  else if (Math.abs(data.totalDeviation) > 10) score -= 10;
  else if (Math.abs(data.totalDeviation) > 5) score -= 5;

  // Pénalités âge
  if (data.age > 15) score -= 10;
  else if (data.age > 10) score -= 5;

  return Math.max(0, Math.min(100, score));
}
