import { memo, useMemo } from "react";
import Particles from "@tsparticles/react";
import { FaCompactDisc, FaHeart, FaPause, FaPlay } from "react-icons/fa";
import { starParticles } from "../../config/particles/starParticles";
import { useParticlesEngine } from "../../hooks/useParticlesEngine";
import type { AudioPlayerState } from "../../hooks/useAudioPlayer";
import Vinyl from "./Vinyl";
import styles from "./MusicPlayer.module.css";

type MusicPlayerProps = {
  audio: AudioPlayerState;
};

const moodTimeline = [
  { time: 0, mood: "moon" },
  { time: 43, mood: "road" },
  { time: 58, mood: "hearts" },
  { time: 81, mood: "bloom" },
  { time: 101, mood: "rain" },
  { time: 124, mood: "light" },
  { time: 139, mood: "gold" },
  { time: 164, mood: "sunset" },
  { time: 199, mood: "rush" },
  { time: 213, mood: "burst" },
];

function formatTime(seconds: number) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60).toString().padStart(2, "0");
  return `${minutes}:${remainingSeconds}`;
}

function MusicPlayer({ audio }: MusicPlayerProps) {
  const ready = useParticlesEngine();
  const progress = audio.duration ? (audio.currentTime / audio.duration) * 100 : 0;
  const activeMood = useMemo(() => {
    const current = [...moodTimeline].reverse().find((item) => audio.currentTime >= item.time);
    return current?.mood ?? "moon";
  }, [audio.currentTime]);

  return (
    <section className={`${styles.music} ${styles[activeMood]}`} aria-label="Мен айтқым келген ән">
      {ready && <Particles className={styles.stars} options={starParticles} />}
      <div className={styles.moonGlow} aria-hidden="true" />
      <div className={styles.inner}>
        <div className={styles.header}>
          <span className={styles.badge}>
            <FaCompactDisc />
          </span>
          <p>Сөзбен айта алмағаным</p>
          <h2>Мен айтқым келген ән</h2>
          <span className={styles.caption}>
            <FaHeart />
            Бұл әуен жүректегі үнсіз сезімнің орнына сөйлесін.
          </span>
        </div>

        <div className={styles.playerCard}>
          <Vinyl playing={audio.isPlaying} />
          <div className={styles.equalizer} aria-hidden="true">
            <span />
            <span />
            <span />
            <span />
            <span />
          </div>
          <button className={styles.playButton} type="button" onClick={audio.toggle} aria-label="Play or pause music">
            {audio.isPlaying ? <FaPause /> : <FaPlay />}
          </button>
          <div className={styles.progressWrap}>
            <button
              className={styles.progressTrack}
              type="button"
              onClick={(event) => {
                const rect = event.currentTarget.getBoundingClientRect();
                const ratio = (event.clientX - rect.left) / rect.width;
                audio.seek(ratio * audio.duration);
              }}
              aria-label="Seek song"
            >
              <span className={styles.progressFill} style={{ width: `${progress}%` }} />
            </button>
            <div className={styles.time}>
              <span>{formatTime(audio.currentTime)}</span>
              <span>{formatTime(audio.duration)}</span>
            </div>
          </div>
          <label className={styles.volumeLabel}>
            Volume
            <input
              className={styles.volume}
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={audio.volume}
              onChange={(event) => audio.setVolume(Number(event.target.value))}
              aria-label="Volume"
            />
          </label>
        </div>
      </div>
    </section>
  );
}

export default memo(MusicPlayer);
