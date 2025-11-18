import { Metadata } from "next";
import Header from "./components/Header";
import Footer from "./components/Footer";

export const metadata: Metadata = {
  title: "Horlogerie Suisse | AFP Horlogerie",
  description: "Découvrez l'histoire, les grandes manufactures, les savoir-faire et les écoles qui ont fait de la Suisse le berceau mondial de l'horlogerie."
};

export default function SuisseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100 transition-colors duration-500 flex flex-col">
      <Header />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  );
}
