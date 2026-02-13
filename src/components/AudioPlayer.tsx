"use client";

import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, SkipBack, SkipForward, Headphones } from 'lucide-react';

interface AudioPlayerProps {
  src: string;
  title?: string;
  duration?: string;
}

export default function AudioPlayer({ src, title = "Listen to this article", duration }: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [totalDuration, setTotalDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  const audioRef = useRef<HTMLAudioElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleLoadedMetadata = () => {
      setTotalDuration(audio.duration);
      setIsLoading(false);
    };

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    const handleEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
    };

    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('ended', handleEnded);
    };
  }, []);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const audio = audioRef.current;
    const progress = progressRef.current;
    if (!audio || !progress) return;

    const rect = progress.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = x / rect.width;
    const newTime = percentage * totalDuration;

    audio.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isMuted) {
      audio.volume = volume;
      setIsMuted(false);
    } else {
      audio.volume = 0;
      setIsMuted(true);
    }
  };

  const changePlaybackRate = () => {
    const audio = audioRef.current;
    if (!audio) return;

    const rates = [1, 1.25, 1.5, 1.75, 2];
    const currentIndex = rates.indexOf(playbackRate);
    const nextIndex = (currentIndex + 1) % rates.length;
    const newRate = rates[nextIndex];

    audio.playbackRate = newRate;
    setPlaybackRate(newRate);
  };

  const skipBackward = () => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = Math.max(0, audio.currentTime - 10);
  };

  const skipForward = () => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = Math.min(totalDuration, audio.currentTime + 10);
  };

  const formatTime = (time: number) => {
    if (isNaN(time)) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const progressPercentage = totalDuration ? (currentTime / totalDuration) * 100 : 0;

  return (
    <div className="bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] p-[1px] rounded-xl my-8 animate-fade-in">
      <div className="bg-[var(--color-bg-primary)] dark:bg-[var(--color-bg-primary-dark)] rounded-xl p-6">
        <audio ref={audioRef} src={src} preload="metadata" />

        <div className="flex items-center gap-3 mb-4">
          <div className="flex-shrink-0">
            <div className="w-12 h-12 bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-secondary)] rounded-lg flex items-center justify-center animate-pulse">
              <Headphones className="w-6 h-6 text-white" />
            </div>
          </div>
          <div className="flex-grow">
            <h3 className="text-sm font-semibold text-[var(--color-text-primary)] dark:text-[var(--color-text-primary-dark)]">
              {title}
            </h3>
            {duration && (
              <p className="text-xs text-[var(--color-text-tertiary)] dark:text-[var(--color-text-tertiary-dark)]">
                Duration: {duration}
              </p>
            )}
          </div>
          <button
            onClick={changePlaybackRate}
            className="text-xs px-2 py-1 rounded-lg bg-[var(--color-bg-secondary)] dark:bg-[var(--color-bg-secondary-dark)] text-[var(--color-text-secondary)] dark:text-[var(--color-text-secondary-dark)] hover:bg-[var(--color-hover-light)] dark:hover:bg-[var(--color-hover-dark)] transition-colors"
          >
            {playbackRate}x
          </button>
        </div>

        {/* Progress Bar */}
        <div
          ref={progressRef}
          className="relative h-2 bg-[var(--color-bg-secondary)] dark:bg-[var(--color-bg-secondary-dark)] rounded-full mb-4 cursor-pointer group"
          onClick={handleProgressClick}
        >
          <div
            className="absolute h-full bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] rounded-full transition-all duration-300"
            style={{ width: `${progressPercentage}%` }}
          />
          <div
            className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-white border-2 border-[var(--color-primary)] rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
            style={{ left: `${progressPercentage}%`, transform: 'translate(-50%, -50%)' }}
          />
        </div>

        {/* Time Display */}
        <div className="flex justify-between text-xs text-[var(--color-text-tertiary)] dark:text-[var(--color-text-tertiary-dark)] mb-4">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(totalDuration)}</span>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-4">
          <button
            onClick={skipBackward}
            className="p-2 rounded-lg hover:bg-[var(--color-bg-secondary)] dark:hover:bg-[var(--color-bg-secondary-dark)] transition-colors"
            aria-label="Skip backward 10 seconds"
          >
            <SkipBack size={20} className="text-[var(--color-text-secondary)] dark:text-[var(--color-text-secondary-dark)]" />
          </button>

          <button
            onClick={togglePlay}
            disabled={isLoading}
            className="p-4 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] rounded-full hover:scale-105 transition-transform disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
            aria-label={isPlaying ? "Pause" : "Play"}
          >
            {isPlaying ? (
              <Pause size={24} className="text-white" />
            ) : (
              <Play size={24} className="text-white ml-1" />
            )}
          </button>

          <button
            onClick={skipForward}
            className="p-2 rounded-lg hover:bg-[var(--color-bg-secondary)] dark:hover:bg-[var(--color-bg-secondary-dark)] transition-colors"
            aria-label="Skip forward 10 seconds"
          >
            <SkipForward size={20} className="text-[var(--color-text-secondary)] dark:text-[var(--color-text-secondary-dark)]" />
          </button>

          <button
            onClick={toggleMute}
            className="p-2 rounded-lg hover:bg-[var(--color-bg-secondary)] dark:hover:bg-[var(--color-bg-secondary-dark)] transition-colors"
            aria-label={isMuted ? "Unmute" : "Mute"}
          >
            {isMuted ? (
              <VolumeX size={20} className="text-[var(--color-text-secondary)] dark:text-[var(--color-text-secondary-dark)]" />
            ) : (
              <Volume2 size={20} className="text-[var(--color-text-secondary)] dark:text-[var(--color-text-secondary-dark)]" />
            )}
          </button>
        </div>

        {isLoading && (
          <div className="absolute inset-0 bg-[var(--color-bg-primary)] dark:bg-[var(--color-bg-primary-dark)] bg-opacity-90 dark:bg-opacity-90 rounded-xl flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[var(--color-primary)]"></div>
          </div>
        )}
      </div>
    </div>
  );
}

// Also export for potential use in MDX files directly
export function Audio({ src, title, duration }: AudioPlayerProps) {
  return <AudioPlayer src={src} title={title} duration={duration} />;
}