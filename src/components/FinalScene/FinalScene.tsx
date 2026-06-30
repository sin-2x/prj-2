import { memo, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Particles from "@tsparticles/react";
import { gsap } from "gsap";
import heartBurst from "../../assets/lottie/heart-burst.json";
import { finalBurstParticles } from "../../config/particles/finalBurstParticles";
import { useParticlesEngine } from "../../hooks/useParticlesEngine";
import type { AudioPlayerState } from "../../hooks/useAudioPlayer";
import { LottieView } from "../LottieView";
import styles from "./FinalScene.module.css";

type FinalSceneProps = {
  audio: AudioPlayerState;
};

const revealLines = [
  "Егер осы жерге дейін жеткен болсаң...",
  "Рақмет...",
  "Мен тек жүрегімдегі сезімді жеткізгім келді.",
  "Кейде бір ғана түсінбеушілік...\nЕкі жүректі алыстатып жібереді.",
  "Бірақ...\nЕгер жүрегіңде маған деген кішкентай болса да жылулық қалған болса...",
];

function FinalScene({ audio }: FinalSceneProps) {
  const rootRef = useRef<HTMLElement | null>(null);
  const ready = useParticlesEngine();
  const [visibleCount, setVisibleCount] = useState(0);
  const [climax, setClimax] = useState(false);
  const [settled, setSettled] = useState(false);
  const petals = useMemo(() => Array.from({ length: 50 }, (_, index) => index), []);

  useEffect(() => {
    const timers = revealLines.map((_, index) =>
      window.setTimeout(() => setVisibleCount(index + 1), 1700 * (index + 1)),
    );
    return () => timers.forEach(window.clearTimeout);
  }, []);

  const handleForgive = () => {
    setClimax(true);
    audio.raiseVolume();
    if (rootRef.current) {
      gsap.fromTo(rootRef.current, { filter: "brightness(1.8)" }, { filter: "brightness(1)", duration: 1.1 });
    }
    window.setTimeout(() => setSettled(true), 3000);
  };

  return (
    <section className={climax ? `${styles.final} ${styles.climax}` : styles.final} ref={rootRef} aria-label="Final scene">
      {ready && climax && <Particles className={styles.burst} options={finalBurstParticles} />}
      {climax && petals.map((item) => <span className={styles.rainPetal} key={item} style={{ left: `${(item * 17) % 100}%`, animationDelay: `${item * 0.05}s` }} />)}
      <div className={styles.inner}>
        <div className={styles.lines}>
          <AnimatePresence>
            {revealLines.slice(0, visibleCount).map((line) => (
              <motion.p
                key={line}
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1 }}
              >
                {line}
              </motion.p>
            ))}
          </AnimatePresence>
        </div>
        {visibleCount === revealLines.length && !climax && (
          <motion.button
            className={styles.forgiveButton}
            type="button"
            onClick={handleForgive}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.96 }}
            aria-label="Мені кешірші"
          >
            ❤️ Мені кешірші...
          </motion.button>
        )}
        {climax && (
          <div className={styles.lottieWrap}>
            <LottieView animationData={heartBurst} loop={false} />
          </div>
        )}
        {settled && (
          <motion.div className={styles.settled} initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}>
            <p>Мен күтемін...<br />Қанша уақыт болса да...</p>
            <p>Себебі...<br />Мен үшін сен әлі де ерекше жансың.</p>
          </motion.div>
        )}
      </div>
    </section>
  );
}

export default memo(FinalScene);
