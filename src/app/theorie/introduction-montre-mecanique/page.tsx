import { MontreProvider } from '@/components/montre/MontreMecaniqueProvider';
import MontreMecaniqueComplete from '@/components/montre/MontreMecaniqueComplete';

export const metadata = {
  title: 'Introduction aux Montres Mécaniques | Horlolearn',
  description: 'Découvrez le fonctionnement fascinant des montres mécaniques',
};

export default function IntroductionMontreMecaniquePage() {
  return (
    <MontreProvider>
      <MontreMecaniqueComplete />
    </MontreProvider>
  );
}
