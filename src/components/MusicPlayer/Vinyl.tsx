import { memo } from "react";
import styles from "./MusicPlayer.module.css";

type VinylProps = {
  playing: boolean;
};

function Vinyl({ playing }: VinylProps) {
  return (
    <div className={playing ? `${styles.vinyl} ${styles.spinning}` : styles.vinyl} aria-hidden="true">
      <div className={styles.vinylCenter}>Dinara</div>
    </div>
  );
}

export default memo(Vinyl);
