// src/components/ShahiQilaExperience.tsx
import React, { useEffect, useRef } from 'react';
import nexusVideo from '../assets/nexusvideo.mp4';
import nexusAudio from '../assets/nexusaudio.mp3';

export const ShahiQilaExperience: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    const container = containerRef.current;
    const audio = audioRef.current;

    if (!video || !container || !audio) return;

    const syncAudio = () => {
      audio.muted = false;
      audio.volume = 0.45;
      audio.currentTime = 0;
      audio.play().catch(() => {});
    };

    const stopAudio = () => {
      audio.pause();
      audio.currentTime = 0;
    };

    const attemptPlay = async () => {
      video.muted = true;
      video.volume = 0;

      try {
        await video.play();
      } catch {
        try {
          await video.play();
        } catch {
          // Playback blocked until user interaction.
        }
      }

      syncAudio();
    };

    const handleVideoInteraction = () => {
      video.muted = true;
      video.volume = 0;
      video.play().catch(() => {});
      syncAudio();
    };

    video.addEventListener('click', handleVideoInteraction, { passive: true });
    video.addEventListener('touchstart', handleVideoInteraction, { passive: true });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            attemptPlay();
          } else {
            video.pause();
            stopAudio();
          }
        });
      },
      { threshold: 0.1, rootMargin: '100px' }
    );

    observer.observe(container);

    return () => {
      observer.disconnect();
      video.removeEventListener('click', handleVideoInteraction);
      video.removeEventListener('touchstart', handleVideoInteraction);
      stopAudio();
    };
  }, []);

  // Continuous infinite loop restart handler
  const handleEnded = () => {
    const video = videoRef.current;
    if (video) {
      video.currentTime = 0;
      video.play().catch(() => {});
    }
  };

  return (
    <section
      id="shahi-qila"
      ref={containerRef}
      className="relative flex w-full items-center justify-center bg-black px-2 py-3 overflow-visible border-y border-white/10 sm:px-4 md:px-6"
      aria-label="Nexus Video Experience"
    >
      <div className="mx-auto flex w-[80vw] max-w-[1200px] items-center justify-center overflow-visible md:w-[84vw] lg:w-[88vw] lg:max-w-[1300px]">
        <audio ref={audioRef} src={nexusAudio} loop preload="auto" />
        <video
          ref={videoRef}
          src={nexusVideo}
          autoPlay
          loop
          muted={true}
          playsInline
          preload="auto"
          controls={false}
          disablePictureInPicture
          onEnded={handleEnded}
          className="block h-auto max-h-[72vh] w-full object-contain object-center md:max-h-[76vh] lg:max-h-[80vh]"
          style={{ aspectRatio: '16 / 9' }}
        />
      </div>
    </section>
  );
};
