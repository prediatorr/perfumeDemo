import { useLenis } from './hooks/useLenis';
import { CustomCursor } from './components/CustomCursor';
import { Navigation } from './components/Navigation';
import { Hero } from './sections/Hero';
import { ScentCardStrip } from './sections/ScentCardStrip';
import { ArtOfScent } from './sections/ArtOfScent';
import { Collections } from './sections/Collections';
import { AtmosphereLab } from './sections/AtmosphereLab';
import { FragranceRitual } from './sections/FragranceRitual';
import { EmotionalMemory } from './sections/EmotionalMemory';
import { Contact } from './sections/Contact';
import { Footer } from './sections/Footer';

function App() {
  useLenis();

  return (
    <>
      <CustomCursor />
      <Navigation />
      <main>
        <Hero />
        <ScentCardStrip />
        <ArtOfScent />
        <Collections />
        <AtmosphereLab />
        <FragranceRitual />
        <EmotionalMemory />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

export default App;
