'use client';
import { Diagnostic } from '@/lib/simulateur/types';

interface Props {
  diagnostics: Diagnostic[];
}

export default function DiagnosticsPanel({ diagnostics }: Props) {
  return (
    <div className="diagnostic">
      <h4>🔍 DIAGNOSTIC AUTOMATIQUE</h4>
      <ul className="diagnostic-list">
        {diagnostics.map((d, i) => (
          <li 
            key={i} 
            className={d.level === 'critical' ? 'text-red-500' : 
                       d.level === 'warning' ? 'text-yellow-400' : 
                       'text-green-400'}
          >
            → {d.text}
          </li>
        ))}
      </ul>
    </div>
  );
}
