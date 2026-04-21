// @file: src/components/ui/PodcastControls.tsx
"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { ArrowCounterclockwise, PlayCircle, PlayFill, StopFill, X } from "react-bootstrap-icons";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/Button";
import { Tooltip } from "@/components/ui/Tooltip";
import styles from "./PodcastControls.module.css";

type PodcastControlsProps = {
  src: string;
  gain?: number;
};

const PLAYBACK_RATES = [1, 1.5, 2] as const;

function formatTime(value: number) {
  if (!Number.isFinite(value) || value < 0) {
    return "00:00";
  }

  const minutes = Math.floor(value / 60);
  const seconds = Math.floor(value % 60);

  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

export function PodcastControls({ src, gain = 1 }: PodcastControlsProps) {
  const t = useTranslations("common.podcast");
  const audioId = useId();
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const audioSourceRef = useRef<MediaElementAudioSourceNode | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const [isHydrated, setIsHydrated] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [showHint, setShowHint] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [hasError, setHasError] = useState(false);
  const [playbackRate, setPlaybackRate] = useState<(typeof PLAYBACK_RATES)[number]>(1);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const mediaQuery = window.matchMedia("(max-width: 639px)");
    const sync = () => setIsMobile(mediaQuery.matches);

    sync();
    mediaQuery.addEventListener("change", sync);

    return () => {
      mediaQuery.removeEventListener("change", sync);
    };
  }, []);

  useEffect(() => {
    return () => {
      void audioContextRef.current?.close();
      audioContextRef.current = null;
      audioSourceRef.current = null;
      gainNodeRef.current = null;
    };
  }, []);

  useEffect(() => {
    const audio = audioRef.current;

    if (!audio) {
      return;
    }

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    const handleLoadedMetadata = () => {
      setDuration(audio.duration);
      setHasError(false);
    };

    const handleEnded = () => {
      setIsPlaying(false);
      setCurrentTime(audio.duration || 0);
    };

    const handlePause = () => {
      setIsPlaying(false);
    };

    const handlePlay = () => {
      setIsPlaying(true);
      setHasError(false);
    };

    const handleError = () => {
      setIsPlaying(false);
      setHasError(true);
    };

    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio.addEventListener("ended", handleEnded);
    audio.addEventListener("pause", handlePause);
    audio.addEventListener("play", handlePlay);
    audio.addEventListener("error", handleError);

    return () => {
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audio.removeEventListener("ended", handleEnded);
      audio.removeEventListener("pause", handlePause);
      audio.removeEventListener("play", handlePlay);
      audio.removeEventListener("error", handleError);
    };
  }, []);

  useEffect(() => {
    if (!isOpen && audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  }, [isOpen]);

  useEffect(() => {
    const audio = audioRef.current;

    if (!audio) {
      return;
    }

    audio.defaultPlaybackRate = playbackRate;
    audio.playbackRate = playbackRate;
  }, [playbackRate]);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setShowHint(false);
    }, 2500);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, []);

  const timeLabel = useMemo(() => `${formatTime(currentTime)} / ${formatTime(duration)}`, [currentTime, duration]);

  const ensureAudioGain = async () => {
    const audio = audioRef.current;

    if (!audio || gain <= 1 || typeof window === "undefined") {
      return;
    }

    const Context = window.AudioContext || (window as typeof window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;

    if (!Context) {
      return;
    }

    let context = audioContextRef.current;

    if (!context) {
      context = new Context();
      audioContextRef.current = context;
    }

    if (!audioSourceRef.current) {
      const source = context.createMediaElementSource(audio);
      const gainNode = context.createGain();

      gainNode.gain.value = gain;
      source.connect(gainNode);
      gainNode.connect(context.destination);

      audioSourceRef.current = source;
      gainNodeRef.current = gainNode;
    } else if (gainNodeRef.current) {
      gainNodeRef.current.gain.value = gain;
    }

    if (context.state === "suspended") {
      await context.resume();
    }
  };

  const handleStart = async () => {
    const audio = audioRef.current;

    if (!audio) {
      return;
    }

    try {
      setHasError(false);
      if (audio.readyState === 0) {
        audio.load();
      }
      await ensureAudioGain();
      await audio.play();
    } catch {
      setIsPlaying(false);
      setHasError(true);
    }
  };

  const handleStop = () => {
    const audio = audioRef.current;

    if (!audio) {
      return;
    }

    audio.pause();
  };

  const handleRestart = async () => {
    const audio = audioRef.current;

    if (!audio) {
      return;
    }

    audio.currentTime = 0;
    setCurrentTime(0);

    try {
      setHasError(false);
      await ensureAudioGain();
      await audio.play();
    } catch {
      setIsPlaying(false);
      setHasError(true);
    }
  };

  const handleSeek = (value: number) => {
    const audio = audioRef.current;

    if (!audio) {
      return;
    }

    audio.currentTime = value;
    setCurrentTime(value);
  };

  const handlePlaybackRateToggle = () => {
    setPlaybackRate((currentRate) => {
      const currentIndex = PLAYBACK_RATES.indexOf(currentRate);
      const nextIndex = (currentIndex + 1) % PLAYBACK_RATES.length;

      return PLAYBACK_RATES[nextIndex];
    });
  };

  const expandedLabel = isOpen ? t("close") : t("toggle");
  const playbackLabel = hasError ? t("unavailable") : isPlaying ? t("stop") : t("start");
  const playbackRateLabel = `${t("speed")}: x${playbackRate}`;
  const playbackDisabled = isHydrated ? hasError : false;
  const timelineDisabled = isHydrated ? hasError || duration <= 0 : false;
  const restartDisabled = isHydrated ? hasError || duration <= 0 : false;
  const panelContent = (
    <div className={`${styles.panel} ${isOpen ? styles.open : ""}`} aria-hidden={!isOpen}>
      <Tooltip content={playbackLabel} placement="bottom">
        <span className={`${styles.item} ${styles.delay1} inline-flex`}>
          <Button
            aria-label={playbackLabel}
            tone="main"
            className="h-8 min-w-8 px-0"
            disabled={playbackDisabled}
            onClick={isPlaying ? handleStop : handleStart}
          >
            {isPlaying ? <StopFill size={14} className="shrink-0" /> : <PlayFill size={14} className="shrink-0" />}
          </Button>
        </span>
      </Tooltip>

      <div className={`${styles.item} ${styles.delay2} ${styles.sliderWrap}`}>
        <input
          aria-label={t("timeline")}
          className={styles.slider}
          type="range"
          min={0}
          max={duration || 0}
          step={0.1}
          value={Math.min(currentTime, duration || 0)}
          disabled={timelineDisabled}
          onChange={(event) => handleSeek(Number(event.currentTarget.value))}
        />
      </div>

      <div className={`${styles.item} ${styles.delay3} ${styles.time}`} aria-live="off">
        {timeLabel}
      </div>

      <Tooltip content={playbackRateLabel} placement="bottom">
        <span className={`${styles.item} ${styles.delay4} inline-flex`}>
          <Button
            aria-label={playbackRateLabel}
            tone={playbackRate === 1 ? "main" : "accent"}
            className="h-8 min-w-8 px-2 text-xs"
            onClick={handlePlaybackRateToggle}
          >
            {`x${playbackRate}`}
          </Button>
        </span>
      </Tooltip>

      <Tooltip content={hasError ? t("unavailable") : t("restart")} placement="bottom">
        <span className={`${styles.item} ${styles.delay5} inline-flex`}>
          <Button
            aria-label={hasError ? t("unavailable") : t("restart")}
            tone="main"
            className="h-8 min-w-8 px-0"
            disabled={restartDisabled}
            onClick={handleRestart}
          >
            <ArrowCounterclockwise size={14} className="shrink-0" />
          </Button>
        </span>
      </Tooltip>
    </div>
  );

  return (
    <div className={styles.root}>
      <audio id={audioId} ref={audioRef} preload="none" src={src} />

      {isHydrated && isMobile ? createPortal(panelContent, document.body) : panelContent}

      <div className={`${styles.hint} ${showHint ? styles.hintVisible : ""}`} aria-hidden={!showHint}>
        {t("hint")}
      </div>

      <Tooltip content={expandedLabel} placement="bottom">
        <span className="inline-flex">
          <Button
            aria-controls={audioId}
            aria-expanded={isOpen}
            aria-label={expandedLabel}
            tone={isOpen ? "accent" : "main"}
            className="h-8 min-w-8 px-0"
            onClick={() => {
              setShowHint(false);
              if (isOpen) {
                setIsOpen(false);
                return;
              }

              setIsOpen(true);
              void handleStart();
            }}
          >
            {isOpen ? <X size={14} className="shrink-0" /> : <PlayCircle size={14} className="shrink-0" />}
          </Button>
        </span>
      </Tooltip>
    </div>
  );
}
