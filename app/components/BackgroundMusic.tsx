"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function BackgroundMusic({ src }: { src: string }) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const tryPlay = async () => {
      if (audioRef.current) {
        audioRef.current.volume = 0.4;
        try {
          await audioRef.current.play();
          setIsPlaying(true);
        } catch (err) {
          console.log(
            "Autoplay blocked by browser, waiting for user interaction"
          );
          setIsPlaying(false);
        }
      }
    };

    tryPlay();
  }, [src, pathname]);

  const toggleMusic = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().catch(console.error);
      setIsPlaying(true);
    }
  };

  return (
    <>
      {pathname === "/recipient" && (
        <>
          <audio
            id="xmas-audio-player"
            ref={audioRef}
            src={src}
            loop
            preload="auto"
          />

          <button
            onClick={toggleMusic}
            className="fixed bottom-12 right-4 z-50 p-3 bg-[#C53A3A] text-white rounded-full shadow-lg border-2 border-[#ffd700] hover:scale-110 transition-transform cursor-pointer flex items-center justify-center w-12 h-12"
            title={isPlaying ? "Вимкнути музику" : "Увімкнути музику"}
          >
            {isPlaying ? (
              <span>🔊</span>
            ) : (
              <span className="animate-pulse">🔇</span>
            )}
          </button>
        </>
      )}
    </>
  );
}
