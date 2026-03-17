"use client";

import { type ReactElement, useEffect, useRef, useState } from "react";
import { Pause, Play, Volume2, VolumeX } from "lucide-react";

interface VideoPlayerProps {
  src: string;
  className?: string;
  onEnded?: () => void;
  onFadeStart?: () => void;
}

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    setIsMobile(window.innerWidth < 640);
  }, []);
  return isMobile;
}

export function VideoPlayer({ src, className, onEnded, onFadeStart }: VideoPlayerProps): ReactElement {
  const isMobile = useIsMobile();
  const [isMuted, setIsMuted] = useState(true); // start muted so autoplay works on mobile
  const [isPlaying, setIsPlaying] = useState(true);
  const [volume, setVolume] = useState(1);
  const [showUnmuteHint, setShowUnmuteHint] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const fadeStartFired = useRef(false);

  // Unmute on desktop after mount (autoplay with sound works on desktop)
  useEffect(() => {
    if (!isMobile && videoRef.current) {
      videoRef.current.muted = false;
      setIsMuted(false);
      setShowUnmuteHint(false);
    }
  }, [isMobile]);

  function handleUnmute(): void {
    if (videoRef.current) {
      videoRef.current.muted = false;
      setIsMuted(false);
      setShowUnmuteHint(false);
    }
  }

  function toggleMute(): void {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
      setShowUnmuteHint(false);
    }
  }

  function handleVolumeChange(e: React.ChangeEvent<HTMLInputElement>): void {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (videoRef.current) {
      videoRef.current.volume = newVolume;
      setIsMuted(newVolume === 0);
      videoRef.current.muted = newVolume === 0;
    }
  }

  function togglePlayPause(): void {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.volume = isMuted ? 0 : volume;
        fadeStartFired.current = false;
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  }

  function handleTimeUpdate(): void {
    if (videoRef.current) {
      const { currentTime, duration } = videoRef.current;
      if (duration > 0) {
        const fadeStart = duration * 0.8;
        if (currentTime >= fadeStart && !fadeStartFired.current) {
          fadeStartFired.current = true;
          onFadeStart?.();
        }
        if (currentTime >= fadeStart && !isMuted) {
          const fadeProgress = (currentTime - fadeStart) / (duration - fadeStart);
          const fadedVolume = Math.max(0, volume * (1 - fadeProgress));
          videoRef.current.volume = fadedVolume;
        }
      }
    }
  }

  function handleEnded(): void {
    setIsPlaying(false);
    onEnded?.();
  }

  return (
    <div className="relative rounded-lg overflow-hidden">
      <video
        ref={videoRef}
        src={src}
        autoPlay
        muted
        playsInline
        className={className}
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleEnded}
      />

      {/* Mobile: tap to unmute overlay */}
      {isMobile && showUnmuteHint && isPlaying && (
        <button
          onClick={handleUnmute}
          className="absolute inset-0 flex items-center justify-center bg-black/20 transition-opacity"
          aria-label="Tap to unmute"
        >
          <span className="flex items-center gap-2 bg-black/60 backdrop-blur-sm text-white text-xs px-4 py-2 rounded-full">
            <VolumeX size={14} />
            Tap to unmute
          </span>
        </button>
      )}

      {/* Controls */}
      <div className="absolute bottom-3 right-3 flex gap-2">
        <button
          onClick={togglePlayPause}
          className="p-2 rounded-full bg-black/50 hover:bg-black/70 text-white transition-colors"
          aria-label={isPlaying ? "Pause" : "Play"}
        >
          {isPlaying ? <Pause size={18} /> : <Play size={18} />}
        </button>
        {/* Desktop: volume slider + mute toggle */}
        <div className="hidden sm:flex items-center gap-1 rounded-full bg-black/50 hover:bg-black/70 transition-colors px-2">
          <button
            onClick={toggleMute}
            className="p-2 text-white"
            aria-label={isMuted ? "Unmute" : "Mute"}
          >
            {isMuted || volume === 0 ? <VolumeX size={18} /> : <Volume2 size={18} />}
          </button>
          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={isMuted ? 0 : volume}
            onChange={handleVolumeChange}
            className="w-16 h-1 accent-white cursor-pointer"
            aria-label="Volume"
          />
        </div>
        {/* Mobile: just mute toggle */}
        <button
          onClick={toggleMute}
          className="sm:hidden p-2 rounded-full bg-black/50 hover:bg-black/70 text-white transition-colors"
          aria-label={isMuted ? "Unmute" : "Mute"}
        >
          {isMuted || volume === 0 ? <VolumeX size={18} /> : <Volume2 size={18} />}
        </button>
      </div>
    </div>
  );
}
