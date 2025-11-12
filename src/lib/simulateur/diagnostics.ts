import { Diagnostic } from './types';

export function generateDiagnostics(
  amplitude: number,
  pivotWear: number,
  beatError: number,
  magnetismLevel: number,
  totalDeviation: number
): Diagnostic[] {
  const diagnostics: Diagnostic[] = [];

  if (amplitude < 220) {
    diagnostics.push({ level: 'critical', text: `Amplitude critique (${amplitude}°) : risque de décrochage.` });
  } else if (amplitude < 260) {
    diagnostics.push({ level: 'warning', text: `Amplitude basse : vérifier lubrification.` });
  }

  if (pivotWear > 70) {
    diagnostics.push({ level: 'critical', text: `Usure pivots >70% : remplacement nécessaire.` });
  }

  if (beatError > 0.5) {
    diagnostics.push({ level: 'warning', text: `Battement élevé : collerette désaxée.` });
  }

  if (magnetismLevel > 60) {
    diagnostics.push({ level: 'critical', text: `Magnétisme ${magnetismLevel.toFixed(0)}% : démagnétisation requise.` });
  }

  if (Math.abs(totalDeviation) > 15) {
    diagnostics.push({ level: 'critical', text: `Déviation importante : régulation complexe requise.` });
  }

  if (diagnostics.length === 0) {
    diagnostics.push({ level: 'ok', text: `✅ Mouvement dans les tolérances.` });
  }

  return diagnostics;
}
