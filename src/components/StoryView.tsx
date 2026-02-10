"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { X, ChevronUp, ChevronDown } from "lucide-react";
import { useRouter } from "next/navigation";

interface StoryViewProps {
  title: string;
  date: string;
  totalSlides: number;
  children: React.ReactNode;
}

export default function StoryView({
  title,
  date,
  totalSlides,
  children,
}: StoryViewProps) {
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeSlide, setActiveSlide] = useState(0);

  const goToSlide = useCallback(
    (index: number) => {
      if (index < 0 || index >= totalSlides) return;
      const container = containerRef.current;
      if (!container) return;
      const slides = container.querySelectorAll<HTMLElement>("[data-slide]");
      slides[index]?.scrollIntoView({ behavior: "smooth" });
    },
    [totalSlides]
  );

  // Track which slide is in view via IntersectionObserver
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const slides = container.querySelectorAll<HTMLElement>("[data-slide]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = Number(
              (entry.target as HTMLElement).dataset.slide
            );
            setActiveSlide(idx);
          }
        });
      },
      { root: container, threshold: 0.55 }
    );

    slides.forEach((slide) => observer.observe(slide));
    return () => observer.disconnect();
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown" || e.key === "ArrowRight" || e.key === " ") {
        e.preventDefault();
        goToSlide(activeSlide + 1);
      } else if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
        e.preventDefault();
        goToSlide(activeSlide - 1);
      } else if (e.key === "Escape") {
        router.back();
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [activeSlide, goToSlide, router]);

  return (
    <div className="story-overlay">
      {/* Progress bar */}
      <div className="story-progress-bar">
        {Array.from({ length: totalSlides }).map((_, i) => (
          <button
            key={i}
            onClick={() => goToSlide(i)}
            className="story-progress-segment"
            aria-label={`Go to slide ${i + 1}`}
          >
            <div
              className="story-progress-fill"
              style={{
                transform: `scaleX(${i < activeSlide ? 1 : i === activeSlide ? 1 : 0})`,
                opacity: i <= activeSlide ? 1 : 0.3,
              }}
            />
          </button>
        ))}
      </div>

      {/* Header */}
      <div className="story-header">
        <div className="story-header-info">
          <span className="story-header-title">{title}</span>
          <span className="story-header-date">{date}</span>
        </div>
        <button
          onClick={() => router.back()}
          className="story-close-btn"
          aria-label="Close stories"
        >
          <X size={20} />
        </button>
      </div>

      {/* Slides container */}
      <div ref={containerRef} className="story-slides-container">
        {children}
      </div>

      {/* Navigation arrows */}
      {activeSlide > 0 && (
        <button
          onClick={() => goToSlide(activeSlide - 1)}
          className="story-nav-btn story-nav-up"
          aria-label="Previous slide"
        >
          <ChevronUp size={24} />
        </button>
      )}
      {activeSlide < totalSlides - 1 && (
        <button
          onClick={() => goToSlide(activeSlide + 1)}
          className="story-nav-btn story-nav-down"
          aria-label="Next slide"
        >
          <ChevronDown size={24} />
        </button>
      )}

      {/* Slide counter */}
      <div className="story-counter">
        {activeSlide + 1} / {totalSlides}
      </div>
    </div>
  );
}

export function StorySlide({
  index,
  gradient,
  children,
}: {
  index: number;
  gradient: string;
  children: React.ReactNode;
}) {
  return (
    <div data-slide={index} className="story-slide" style={{ background: gradient }}>
      <div className="story-slide-content">
        {children}
      </div>
    </div>
  );
}
