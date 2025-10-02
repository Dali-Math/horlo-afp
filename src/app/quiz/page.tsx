export default function Quiz() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-6">Quiz et Tests Horlogerie</h1>
      <p className="text-lg mb-8">Testez et évaluez vos connaissances en horlogerie</p>

      {/* Plateformes de Quiz */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">🎯 Plateformes de Quiz en Ligne</h2>
        <ul className="space-y-2">
          <li><a href="https://www.proprofs.com/quiz-school/topic/watches" className="text-blue-600 hover:underline" target="_blank">ProProfs - Quiz Horlogerie</a></li>
          <li><a href="https://quizlet.com/search?query=horology" className="text-blue-600 hover:underline" target="_blank">Quizlet - Flashcards Horlogerie</a></li>
          <li><a href="https://www.sporcle.com/games/category/watches" className="text-blue-600 hover:underline" target="_blank">Sporcle - Quiz Montres</a></li>
          <li><a href="https://www.jetpunk.com/tags/watches" className="text-blue-600 hover:underline" target="_blank">JetPunk - Tests de connaissance</a></li>
        </ul>
      </section>

      {/* Quiz Interactifs */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">📱 Quiz Interactifs</h2>
        <ul className="space-y-2">
          <li><a href="https://kahoot.com/" className="text-blue-600 hover:underline" target="_blank">Kahoot! - Quiz collaboratifs (chercher "watches" ou "horology")</a></li>
          <li><a href="https://quizizz.com/" className="text-blue-600 hover:underline" target="_blank">Quizizz - Quiz interactifs</a></li>
          <li><a href="https://www.mentimeter.com/" className="text-blue-600 hover:underline" target="_blank">Mentimeter - Sondages et quiz</a></li>
        </ul>
      </section>

      {/* Flashcards et Mémorisation */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">🎴 Flashcards et Mémorisation</h2>
        <ul className="space-y-2">
          <li><a href="https://www.anki.com/" className="text-blue-600 hover:underline" target="_blank">Anki - Répétition espacée</a></li>
          <li><a href="https://quizlet.com/" className="text-blue-600 hover:underline" target="_blank">Quizlet - Cartes mémoires</a></li>
          <li><a href="https://www.brainscape.com/" className="text-blue-600 hover:underline" target="_blank">Brainscape - Apprentissage adaptatif</a></li>
        </ul>
      </section>

      {/* Certifications et Examens */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">🎓 Préparation aux Certifications</h2>
        <ul className="space-y-2">
          <li><a href="https://www.awci.com/education/" className="text-blue-600 hover:underline" target="_blank">AWCI - American Watchmakers-Clockmakers Institute</a></li>
          <li><a href="https://www.britishhorological.org/education" className="text-blue-600 hover:underline" target="_blank">BHI - British Horological Institute Exams</a></li>
          <li><a href="https://www.wostep.ch/" className="text-blue-600 hover:underline" target="_blank">WOSTEP - Watchmakers of Switzerland Training</a></li>
        </ul>
      </section>

      {/* Tests de Connaissance Spécialisés */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">🔍 Tests Spécialisés</h2>
        <ul className="space-y-2">
          <li><a href="https://www.coursera.org/" className="text-blue-600 hover:underline" target="_blank">Coursera - Cours avec quiz (chercher "horology" ou "watchmaking")</a></li>
          <li><a href="https://www.edx.org/" className="text-blue-600 hover:underline" target="_blank">edX - Formations certifiées</a></li>
          <li><a href="https://www.futurelearn.com/" className="text-blue-600 hover:underline" target="_blank">FutureLearn - Cours en ligne</a></li>
        </ul>
      </section>

      {/* Jeux Éducatifs */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">🎮 Jeux Éducatifs</h2>
        <ul className="space-y-2">
          <li><a href="https://www.purposegames.com/" className="text-blue-600 hover:underline" target="_blank">Purpose Games - Jeux éducatifs personnalisés</a></li>
          <li><a href="https://www.educaplay.com/" className="text-blue-600 hover:underline" target="_blank">Educaplay - Activités interactives</a></li>
        </ul>
      </section>
    </div>
  );
}
