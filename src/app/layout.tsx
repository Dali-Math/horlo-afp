export const metadata = {
  title: "HorloLearn – Plateforme d’Apprentissage AFP",
  description: "Module interactif de formation horlogère suisse AFP.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body
        style={{
          margin: 0,
          padding: 0,
          background: "#f8f9fb",
          color: "#222",
          fontFamily: "Inter, system-ui, sans-serif",
        }}
      >
        {children}
      </body>
    </html>
  );
}
