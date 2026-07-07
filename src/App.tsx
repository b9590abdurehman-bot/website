import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { LoadingScreen } from './screens/LoadingScreen';
import { LandingScreen } from './screens/LandingScreen';
import { GiftBoxScreen } from './screens/GiftBoxScreen';
import { FinalScreen } from './screens/FinalScreen';
import { MusicPlayer } from './components/MusicPlayer';
import { CursorTrail } from './components/CursorTrail';
import { AmbientEffects } from './components/AmbientEffects';

export default function App() {
  const [step, setStep] = useState('loading');
  const [openedGifts, setOpenedGifts] = useState<string[]>([]);

  useEffect(() => {
    if (step === 'loading') {
      const timer = setTimeout(() => setStep('landing'), 3500);
      return () => clearTimeout(timer);
    }
    return undefined;
  }, [step]);

  const handleGiftOpened = (id: string) => {
    if (!openedGifts.includes(id)) {
      setOpenedGifts([...openedGifts, id]);
    }
  };

  useEffect(() => {
    if (openedGifts.length === 3 && step === 'giftbox') {
      const timer = setTimeout(() => {
        setStep('final');
      }, 2500);
      return () => clearTimeout(timer);
    }
    return undefined;
  }, [openedGifts, step]);

  return (
    <div className="min-h-[100dvh] w-full relative overflow-hidden text-foreground">
      <MusicPlayer />
      <CursorTrail />
      <AmbientEffects />

      <AnimatePresence mode="wait">
        {step === 'loading' && <LoadingScreen key="loading" />}
        {step === 'landing' && <LandingScreen key="landing" onNext={() => setStep('giftbox')} />}
        {step === 'giftbox' && <GiftBoxScreen key="giftbox" openedGifts={openedGifts} onGiftOpened={handleGiftOpened} />}
        {step === 'final' && <FinalScreen key="final" />}
      </AnimatePresence>
    </div>
  );
}
