import { lazy, Suspense, useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ParticlesProvider } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import type { Engine } from "@tsparticles/engine";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { sendTelegramNotification } from "./utils/telegram";
import { useAudioPlayer } from "./hooks/useAudioPlayer";
import "./index.css";

const LoadingScreen = lazy(() => import("./components/LoadingScreen/LoadingScreen"));
const Hero = lazy(() => import("./components/Hero/Hero"));
const MusicPlayer = lazy(() => import("./components/MusicPlayer/MusicPlayer"));

gsap.registerPlugin(ScrollTrigger);

function HomePage() {
  const [started, setStarted] = useState(false);
  const audio = useAudioPlayer("/assets/audio/Аққуым.mp3");

  useEffect(() => {
    void sendTelegramNotification();
  }, []);

  const handleStart = () => {
    setStarted(true);
    void audio.play();
  };

  return (
    <main>
      {!started && <LoadingScreen onStart={handleStart} />}
      <div aria-hidden={!started} className={started ? "site-shell is-visible" : "site-shell"}>
        <Hero />
        <MusicPlayer audio={audio} />
      </div>
    </main>
  );
}

export default function App() {
  return (
    <ParticlesProvider init={(engine: Engine) => loadSlim(engine)}>
      <BrowserRouter>
        <Suspense fallback={<div className="screen-loader">Loading...</div>}>
          <Routes>
            <Route path="/" element={<HomePage />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </ParticlesProvider>
  );
}
