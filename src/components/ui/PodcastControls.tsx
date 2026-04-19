// @file: src/components/ui/PodcastControls.tsx
"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";
import { ArrowCounterclockwise, PlayCircle, PlayFill, StopFill, X } from "react-bootstrap-icons";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/Button";
import { Tooltip } from "@/components/ui/Tooltip";
import styles from "./PodcastControls.module.css";

type PodcastControlsProps = {
  src: string;
};

function formatTime(value: number) {
  if (!Number.isFinite(value) || value < 0) {
    return "00:00";
  }

  const minutes = Math.floor(value / 60);
  const seconds = Math.floor(value % 60);

  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

export function PodcastControls({ src }: PodcastControlsProps) {
  const t = useTranslations("common.podcast");
  const audioId = useId();
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isHydrated, setIsHydrated] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [showHint, setShowHint] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
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
    const timeoutId = window.setTimeout(() => {
      setShowHint(false);
    }, 2500);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, []);

  const timeLabel = useMemo(() => `${formatTime(currentTime)} / ${formatTime(duration)}`, [currentTime, duration]);

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

  const expandedLabel = isOpen ? t("close") : t("toggle");
  const playbackLabel = hasError ? t("unavailable") : isPlaying ? t("stop") : t("start");
  const playbackDisabled = isHydrated ? hasError : false;
  const timelineDisabled = isHydrated ? hasError || duration <= 0 : false;
  const restartDisabled = isHydrated ? hasError || duration <= 0 : false;

  return (
    <div className={styles.root}>
      <audio id={audioId} ref={audioRef} preload="none" src={src} />

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

        <Tooltip content={hasError ? t("unavailable") : t("restart")} placement="bottom">
          <span className={`${styles.item} ${styles.delay4} inline-flex`}>
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
              setIsOpen((value) => !value);
            }}
          >
            {isOpen ? <X size={14} className="shrink-0" /> : <PlayCircle size={14} className="shrink-0" />}
          </Button>
        </span>
      </Tooltip>
    </div>
  );
}
