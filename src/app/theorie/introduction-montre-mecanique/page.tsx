'use client';
import { MontreProvider } from '@/components/montre/MontreMecaniqueProvider';
import MontreMecaniqueComplete from '@/components/montre/MontreMecaniqueComplete';

export default function IntroductionMontreMecaniquePage() {
  return (
    <MontreProvider>
      <MontreMecaniqueComplete />
    </MontreProvider>
  );
}

export const metadata = {
  title: 'Introduction aux Montres Mécaniques | Horlolearn',
  description: 'Découvrez le fonctionnement fascinant des montres mécaniques',
};
