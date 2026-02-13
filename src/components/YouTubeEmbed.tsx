"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { Play, Loader2, AlertCircle } from "lucide-react";

interface YouTubeEmbedProps {
  url: string;
  title?: string;
  className?: string;
  autoplay?: boolean;
  start?: number;
  end?: number;
}

interface YouTubeVideoData {
  id: string;
  title: string;
  thumbnail: string;
  duration?: string;
}

export default function YouTubeEmbed({
  url,
  title,
  className = "",
  autoplay = false,
  start,
  end,
}: YouTubeEmbedProps) {
  const [videoData, setVideoData] = useState<YouTubeVideoData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [loadIframe, setLoadIframe] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Extract video ID from various YouTube URL formats
  const extractVideoId = useCallback((videoUrl: string): string | null => {
    const patterns = [
      /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
      /youtube\.com\/v\/([^&\n?#]+)/,
      /youtube\.com\/shorts\/([^&\n?#]+)/,
    ];

    for (const pattern of patterns) {
      const match = videoUrl.match(pattern);
      if (match) return match[1];
    }

    // If it's already just an ID
    if (/^[a-zA-Z0-9_-]{11}$/.test(videoUrl)) {
      return videoUrl;
    }

    return null;
  }, []);

  // Initialize video data
  useEffect(() => {
    const videoId = extractVideoId(url);
    if (!videoId) {
      setHasError(true);
      setIsLoading(false);
      return;
    }

    // Set basic video data immediately
    const basicData: YouTubeVideoData = {
      id: videoId,
      title: title || "YouTube Video",
      thumbnail: `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`,
    };

    setVideoData(basicData);
    setIsLoading(false);

    // Try to get high-resolution thumbnail, fall back to standard if needed
    const img = new Image();
    img.onload = () => {
      // High-res thumbnail loaded successfully
    };
    img.onerror = () => {
      // Fall back to standard resolution thumbnail
      setVideoData(prev => prev ? {
        ...prev,
        thumbnail: `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`
      } : null);
    };
    img.src = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;

    // Auto-play if specified
    if (autoplay) {
      setLoadIframe(true);
      setIsPlaying(true);
    }
  }, [url, title, autoplay, extractVideoId]);

  const handlePlay = useCallback(() => {
    setLoadIframe(true);
    setIsPlaying(true);
  }, []);

  const buildEmbedUrl = useCallback((videoId: string): string => {
    const params = new URLSearchParams();
    params.set("autoplay", "1");
    params.set("rel", "0");
    params.set("modestbranding", "1");
    params.set("color", "white");
    params.set("playsinline", "1");

    if (start) params.set("start", start.toString());
    if (end) params.set("end", end.toString());

    return `https://www.youtube-nocookie.com/embed/${videoId}?${params.toString()}`;
  }, [start, end]);

  // Handle loading states and errors
  if (isLoading) {
    return (
      <div className={`youtube-embed youtube-embed--loading ${className}`}>
        <div className="youtube-embed__content">
          <Loader2 className="youtube-embed__spinner" size={40} />
          <span className="youtube-embed__loading-text">Loading video...</span>
        </div>
      </div>
    );
  }

  if (hasError || !videoData) {
    return (
      <div className={`youtube-embed youtube-embed--error ${className}`}>
        <div className="youtube-embed__content">
          <AlertCircle className="youtube-embed__error-icon" size={40} />
          <span className="youtube-embed__error-text">
            Unable to load video. Please check the URL.
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className={`youtube-embed ${className}`}>
      <div className="youtube-embed__container">
        {!loadIframe ? (
          // Preview/thumbnail mode
          <div className="youtube-embed__preview" onClick={handlePlay}>
            <img
              src={videoData.thumbnail}
              alt={videoData.title}
              className="youtube-embed__thumbnail"
              loading="lazy"
            />
            <button
              className="youtube-embed__play-button"
              aria-label={`Play video: ${videoData.title}`}
            >
              <Play size={24} fill="currentColor" />
            </button>
            <div className="youtube-embed__overlay">
              <h3 className="youtube-embed__title">{videoData.title}</h3>
            </div>
          </div>
        ) : (
          // Iframe mode
          <iframe
            ref={iframeRef}
            src={buildEmbedUrl(videoData.id)}
            title={videoData.title}
            className="youtube-embed__iframe"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            loading="lazy"
          />
        )}
      </div>

      {/* Caption/metadata */}
      {isPlaying && (
        <div className="youtube-embed__caption">
          <span className="youtube-embed__caption-text">{videoData.title}</span>
        </div>
      )}
    </div>
  );
}

// Helper component for MDX usage
export function YouTube({
  id,
  url,
  title,
  start,
  end,
  autoplay = false
}: {
  id?: string;
  url?: string;
  title?: string;
  start?: number;
  end?: number;
  autoplay?: boolean;
}) {
  const videoUrl = id ? `https://youtu.be/${id}` : url;

  if (!videoUrl) {
    return (
      <div className="youtube-embed youtube-embed--error">
        <div className="youtube-embed__content">
          <AlertCircle className="youtube-embed__error-icon" size={40} />
          <span className="youtube-embed__error-text">
            Please provide either an 'id' or 'url' prop
          </span>
        </div>
      </div>
    );
  }

  return (
    <YouTubeEmbed
      url={videoUrl}
      title={title}
      start={start}
      end={end}
      autoplay={autoplay}
    />
  );
}