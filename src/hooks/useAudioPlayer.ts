import { useCallback, useEffect, useRef, useState } from "react";

export type AudioPlayerState = {
  currentTime: number;
  duration: number;
  volume: number;
  isPlaying: boolean;
  play: () => Promise<void>;
  pause: () => void;
  toggle: () => Promise<void>;
  seek: (time: number) => void;
  setVolume: (volume: number) => void;
  raiseVolume: () => void;
};

export function useAudioPlayer(src: string): AudioPlayerState {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolumeState] = useState(0.72);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const audio = new Audio(src);
    audio.preload = "metadata";
    audio.volume = volume;
    audioRef.current = audio;

    const syncTime = () => setCurrentTime(audio.currentTime);
    const syncDuration = () => setDuration(Number.isFinite(audio.duration) ? audio.duration : 0);
    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    audio.addEventListener("timeupdate", syncTime);
    audio.addEventListener("loadedmetadata", syncDuration);
    audio.addEventListener("play", handlePlay);
    audio.addEventListener("pause", handlePause);
    audio.addEventListener("ended", handlePause);

    return () => {
      audio.pause();
      audio.removeEventListener("timeupdate", syncTime);
      audio.removeEventListener("loadedmetadata", syncDuration);
      audio.removeEventListener("play", handlePlay);
      audio.removeEventListener("pause", handlePause);
      audio.removeEventListener("ended", handlePause);
    };
  }, [src]);

  const play = useCallback(async () => {
    try {
      await audioRef.current?.play();
    } catch {
      setIsPlaying(false);
    }
  }, []);

  const pause = useCallback(() => {
    audioRef.current?.pause();
  }, []);

  const toggle = useCallback(async () => {
    if (audioRef.current?.paused === false) {
      audioRef.current.pause();
      return;
    }
    await play();
  }, [play]);

  const seek = useCallback((time: number) => {
    if (!audioRef.current) return;
    audioRef.current.currentTime = Math.max(0, Math.min(time, audioRef.current.duration || 0));
    setCurrentTime(audioRef.current.currentTime);
  }, []);

  const setVolume = useCallback((nextVolume: number) => {
    const safeVolume = Math.max(0, Math.min(nextVolume, 1));
    if (audioRef.current) {
      audioRef.current.volume = safeVolume;
    }
    setVolumeState(safeVolume);
  }, []);

  const raiseVolume = useCallback(() => {
    setVolume(1);
  }, [setVolume]);

  return { currentTime, duration, volume, isPlaying, play, pause, toggle, seek, setVolume, raiseVolume };
}
