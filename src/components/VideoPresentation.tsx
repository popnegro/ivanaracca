/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useRef } from 'react';
import { motion } from 'motion/react';
import { Play, Pause, Volume2, VolumeX, RefreshCw } from 'lucide-react';

export default function VideoPresentation() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [videoProgress, setVideoProgress] = useState(0);
  
  const videoRef = useRef<HTMLVideoElement>(null);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play().catch(err => console.log("Auto-play blocked by browser:", err));
    }
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    const currentProgress = (videoRef.current.currentTime / videoRef.current.duration) * 100;
    setVideoProgress(currentProgress || 0);
  };

  const handleRestart = () => {
    if (!videoRef.current) return;
    videoRef.current.currentTime = 0;
    videoRef.current.play();
    setIsPlaying(true);
  };

  return (
    <section id="video-studio" className="relative w-full py-16 md:py-24 bg-sand-100 flex flex-col items-center">
      <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-20 w-full text-center space-y-4 mb-10">
        <span className="font-mono text-[10px] tracking-widest text-luxury-gold uppercase block">
          Documento Audiovisual
        </span>
        <h2 className="font-serif text-3xl md:text-4xl font-medium tracking-tight text-luxury-charcoal max-w-xl mx-auto">
          Atelier en Movimiento — El Oficio de Hilar el Tiempo
        </h2>
        <div className="h-[1px] w-12 bg-luxury-gold mx-auto" />
      </div>

      {/* Styled Cinematic Box container */}
      <div className="max-w-5xl w-full px-6 relative group">
        <div className="aspect-video w-full bg-sand-900 overflow-hidden shadow-2xl relative border border-sand-300">
          
          {/* Mock or elegant abstract high-fashion visual video loop */}
          <video
            ref={videoRef}
            src="https://assets.mixkit.co/videos/preview/mixkit-fashion-woman-with-hat-posing-4813-large.mp4"
            loop
            muted={isMuted}
            playsInline
            onTimeUpdate={handleTimeUpdate}
            className="w-full h-full object-cover grayscale opacity-90 transition-all duration-700"
            onClick={togglePlay}
          />

          {/* Absolute Dark overlay on standby */}
          {!isPlaying && (
            <div className="absolute inset-0 bg-black/40 flex flex-col justify-between p-6 md:p-10 transition-opacity duration-500">
              <span className="font-mono text-[9px] uppercase tracking-widest text-white/50">
                Studio Tape #44
              </span>
              
              {/* Centered big play button */}
              <button
                onClick={togglePlay}
                className="self-center w-16 h-16 rounded-full bg-white/95 text-luxury-charcoal hover:bg-luxury-gold hover:text-white flex items-center justify-center shadow-2xl scale-100 hover:scale-105 transition-all duration-300 interactive-hover"
                aria-label="Reproducir video de colección"
              >
                <Play className="w-5 h-5 fill-current ml-1" />
              </button>

              <div className="flex justify-between items-end">
                <p className="font-serif text-white text-xs md:text-sm italic leading-relaxed max-w-xs">
                  "El movimiento revela la verdadera estructura de la silueta..."
                </p>
                <span className="font-mono text-[9px] text-white/50">
                  01:45 MIN
                </span>
              </div>
            </div>
          )}

          {/* Mini elegant HUD bar for active playback controls */}
          <div className="absolute bottom-4 left-4 right-4 bg-black/50 backdrop-blur-xs p-3 flex items-center justify-between opacity-0 group-hover:opacity-100 focus-within:opacity-100 transition-opacity duration-300">
            <div className="flex items-center space-x-3">
              <button
                onClick={togglePlay}
                className="text-white hover:text-luxury-gold transition-colors p-1"
                aria-label={isPlaying ? "Pausar video" : "Reproducir video"}
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              </button>
              
              <button
                onClick={handleRestart}
                className="text-white/70 hover:text-white transition-colors p-1"
                aria-label="Reiniciar video"
              >
                <RefreshCw className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={toggleMute}
                className="text-white hover:text-luxury-gold transition-colors p-1"
                aria-label={isMuted ? "Activar sonido" : "Silenciar sonido"}
              >
                {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              </button>
            </div>

            {/* Custom Micro Progress timeline slider */}
            <div className="flex-1 mx-4 h-[2px] bg-white/20 rounded-full overflow-hidden relative">
              <div 
                className="h-full bg-luxury-gold rounded-full"
                style={{ width: `${videoProgress}%` }}
              />
            </div>

            <div className="font-mono text-[9px] text-white/70">
              HD FILM
            </div>
          </div>

        </div>

        {/* Outer label credit notes */}
        <div className="flex justify-between items-center text-[10px] font-mono text-luxury-charcoal/40 px-1 mt-4">
          <span>Colección: Viento & Estructura (Campofuera)</span>
          <span>Banda sonora: Silencios sutiles de telar</span>
        </div>
      </div>
    </section>
  );
}
