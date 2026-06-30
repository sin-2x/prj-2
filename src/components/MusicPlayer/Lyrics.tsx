import { memo, useEffect, useMemo, useRef } from "react";
import styles from "./MusicPlayer.module.css";

export type LyricLine = {
  time: number;
  text: string;
  mood: string;
};

type LyricsProps = {
  lines: LyricLine[];
  currentTime: number;
};

function Lyrics({ lines, currentTime }: LyricsProps) {
  const lineRefs = useRef<Array<HTMLParagraphElement | null>>([]);
  const activeIndex = useMemo(() => {
    const index = lines.findIndex((line, itemIndex) => {
      const next = lines[itemIndex + 1];
      return currentTime >= line.time && (!next || currentTime < next.time);
    });
    return Math.max(0, index);
  }, [currentTime, lines]);

  useEffect(() => {
    lineRefs.current[activeIndex]?.scrollIntoView({
      block: "center",
      behavior: "smooth",
    });
  }, [activeIndex]);

  return (
    <div className={styles.lyricsPanel} aria-label="Karaoke lyrics">
      {lines.map((line, index) => (
        <p
          className={index === activeIndex ? styles.activeLyric : styles.lyric}
          key={`${line.time}-${line.text}`}
          ref={(element) => {
            lineRefs.current[index] = element;
          }}
        >
          {line.text}
        </p>
      ))}
    </div>
  );
}

export default memo(Lyrics);
