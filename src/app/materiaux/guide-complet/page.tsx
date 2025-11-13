import { Metadata } from 'next';
import GuideSidebar from './components/GuideSidebar';
import GuideContent from './components/GuideContent';
import styles from '../styles/guide.module.css';

export const metadata: Metadata = {
  title: 'Guide Complet des Matériaux | HorloLearn',
  description: 'Formation professionnelle sur les métaux et alliages en horlogerie suisse',
};

export default function GuideCompletPage() {
  return (
    <div className={styles.guideContainer}>
      <GuideSidebar />
      <GuideContent />
    </div>
  );
}
