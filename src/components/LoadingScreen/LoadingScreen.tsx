import { FormEvent, memo, useEffect, useRef, useState } from "react";
import Particles from "@tsparticles/react";
import { gsap } from "gsap";
import heartBeat from "../../assets/lottie/heart-beat.json";
import { loadingParticles } from "../../config/particles/loadingParticles";
import { useParticlesEngine } from "../../hooks/useParticlesEngine";
import { LottieView } from "../LottieView";
import styles from "./LoadingScreen.module.css";

const INTRO_TEXT = "Бұл тек өзіңе арналған...";
const PASSWORD = "26052006";
const BUTTON_DELAY_MS = 1600;

type LoadingScreenProps = {
  onStart: () => void;
};

function LoadingScreen({ onStart }: LoadingScreenProps) {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const ready = useParticlesEngine();
  const [buttonVisible, setButtonVisible] = useState(false);
  const [password, setPassword] = useState("");
  const [unlocked, setUnlocked] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const timer = window.setTimeout(() => setButtonVisible(true), BUTTON_DELAY_MS);
    const context = gsap.context(() => {
      gsap.from(`.${styles.letter}`, {
        opacity: 0,
        y: 10,
        duration: 0.7,
        stagger: 0.12,
        ease: "power2.out",
        delay: 0.4,
      });
      gsap.from(`.${styles.passwordCard}`, {
        opacity: 0,
        y: 18,
        scale: 0.96,
        duration: 0.8,
        ease: "power3.out",
        delay: 1,
      });
    }, rootRef);

    return () => {
      window.clearTimeout(timer);
      context.revert();
    };
  }, []);

  const handleUnlock = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (password.trim() === PASSWORD) {
      setUnlocked(true);
      setError("");
      return;
    }
    setError("Құпия сөз дұрыс емес. Қайта байқап көр.");
  };

  const handleStart = () => {
    if (!rootRef.current) {
      onStart();
      return;
    }

    gsap.to(rootRef.current, {
      opacity: 0,
      scale: 1.05,
      duration: 0.8,
      ease: "power3.inOut",
      onComplete: onStart,
    });
  };

  return (
    <section className={styles.loading} ref={rootRef} aria-label="Romantic opening screen">
      {ready && <Particles className={styles.particles} options={loadingParticles} />}
      <div className={styles.content}>
        <div className={styles.heartWrap}>
          <LottieView animationData={heartBeat} loop />
        </div>
        <p className={styles.intro} aria-label={INTRO_TEXT}>
          {INTRO_TEXT.split(" ").map((word, index) => (
            <span className={styles.letter} key={`${word}-${index}`} aria-hidden="true">
              {word}
            </span>
          ))}
        </p>

        {!unlocked ? (
          <form className={styles.passwordCard} onSubmit={handleUnlock}>
            <label htmlFor="birthday-password">Туған күніңді жаз: күн, ай, жыл</label>
            <input
              id="birthday-password"
              value={password}
              onChange={(event) => setPassword(event.target.value.replace(/\D/g, "").slice(0, 8))}
              inputMode="numeric"
              autoComplete="off"
              placeholder="кк аа жжжж"
              aria-describedby="password-hint"
            />
            <p id="password-hint">Мысалы: күнің, айың, жылың бірге жазылады.</p>
            {error && <span className={styles.error}>{error}</span>}
            <button className={styles.unlockButton} type="submit">
              Тексеру
            </button>
          </form>
        ) : (
          <div className={styles.successCard}>
            <p>Дұрыс құпия сөз ❤️</p>
            {buttonVisible && (
              <button className={styles.startButton} type="button" onClick={handleStart} aria-label="Бастау">
                ❤️ Бастау
              </button>
            )}
          </div>
        )}
      </div>
    </section>
  );
}

export default memo(LoadingScreen);
