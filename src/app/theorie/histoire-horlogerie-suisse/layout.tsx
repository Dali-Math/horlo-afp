import './styles/globals.css';

export const metadata = {
  title: "Histoire de l'Horlogerie Suisse - HorloLearn",
  description: "500 ans d'excellence horlogère suisse",
};

export default function HistoireHorlogerieLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
