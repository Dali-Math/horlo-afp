'use client';

import { useEffect, useRef, useState } from 'react';

interface Video {
  id: string;
  title: string;
  duration: string;
  youtubeId: string;
  pdfUrl?: string;
}

const videos: Video[] = [
  {
    id: '1',
    title: 'Initiation au démontage',
    duration: '12:34',
    youtubeId: 'dQw4w9WgXcQ',
    pdfUrl: '/docs/demontage.pdf',
  },
  {
    id: '2',
    title: 'Chronographe – réglage',
    duration: '8:45',
    youtubeId: 'dQw4w9WgXcQ',
  },
  {
    id: '3',
    title: 'Histoire de l\'échappement',
    duration: '15:20',
    youtubeId: 'dQw4w9WgXcQ',
    pdfUrl: '/docs/echappement.pdf',
  },
  {
    id: '4',
    title: 'Restauration d\'une montre ancienne',
    duration: '18:12',
    youtubeId: 'dQw4w9WgXcQ',
  },
];

export default function VideosSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-screen py-20 px-6 bg-gradient-to-b from-dark-950 to-dark-970 overflow-hidden"
    >
      {/* Animated Title */}
      <div
        className={`max-w-7xl mx-auto text-center mb-6 transition-all duration-1000 ${
          isVisible
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 translate-y-8'
        }`}
      >
        <h2
          className="text-5xl md:text-7xl font-bebas tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-gold-400 via-gold-300 to-gold-400 mb-4"
          style={{
            textShadow: '0 0 30px rgba(212, 175, 55, 0.5)',
            animation: isVisible ? 'glow 3s ease-in-out infinite' : 'none',
          }}
        >
          🎥 Vidéos & documentaires
        </h2>
        <p className="text-lg md:text-xl text-gray-300 font-inter max-w-3xl mx-auto">
          Découvre les gestes et l'histoire de l'horlogerie à travers des vidéos
          sélectionnées.
        </p>
      </div>

      {/* Video Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 mt-16">
        {videos.map((video, index) => (
          <VideoCard
            key={video.id}
            video={video}
            index={index}
            isVisible={isVisible}
          />
        ))}
      </div>

      <style jsx global>{`
        @keyframes glow {
          0%,
          100% {
            text-shadow: 0 0 20px rgba(212, 175, 55, 0.4),
              0 0 40px rgba(212, 175, 55, 0.2);
          }
          50% {
            text-shadow: 0 0 30px rgba(212, 175, 55, 0.6),
              0 0 60px rgba(212, 175, 55, 0.3);
          }
        }
      `}</style>
    </section>
  );
}

function VideoCard({
  video,
  index,
  isVisible,
}: {
  video: Video;
  index: number;
  isVisible: boolean;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const [showPlayer, setShowPlayer] = useState(false);

  return (
    <div
      className={`relative bg-dark-800/50 backdrop-blur-sm rounded-lg border border-gold-500/20 overflow-hidden transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
      }`}
      style={{
        transitionDelay: `${index * 150}ms`,
        transform: isHovered ? 'translateY(-8px)' : 'translateY(0)',
        boxShadow: isHovered
          ? '0 20px 40px rgba(212, 175, 55, 0.3), 0 0 20px rgba(212, 175, 55, 0.2)'
          : '0 4px 6px rgba(0, 0, 0, 0.1)',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Video Thumbnail or Player */}
      <div className="relative aspect-video bg-dark-900">
        {showPlayer ? (
          <iframe
            className="absolute inset-0 w-full h-full"
            src={`https://www.youtube.com/embed/${video.youtubeId}?autoplay=1`}
            title={video.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <>
            <img
              src={`https://img.youtube.com/vi/${video.youtubeId}/maxresdefault.jpg`}
              alt={video.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-dark-950/80 to-transparent" />
            <button
              onClick={() => setShowPlayer(true)}
              className="absolute inset-0 flex items-center justify-center group"
            >
              <div className="w-20 h-20 rounded-full bg-gold-500/90 flex items-center justify-center transform transition-all duration-300 group-hover:scale-110 group-hover:bg-gold-400">
                <svg
                  className="w-10 h-10 text-dark-950 ml-1"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </button>
          </>
        )}
      </div>

      {/* Video Info */}
      <div className="p-6">
        <div className="flex items-center justify-between mb-3">
          <h3
            className={`text-2xl font-bebas tracking-wide text-gold-300 transition-all duration-300 ${
              isHovered ? 'text-gold-200' : ''
            }`}
            style={{
              textShadow: isHovered
                ? '0 0 15px rgba(212, 175, 55, 0.6)'
                : 'none',
            }}
          >
            {video.title}
          </h3>
          <span className="text-sm text-gray-400 font-inter">
            {video.duration}
          </span>
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => setShowPlayer(true)}
            className="flex-1 py-3 px-6 bg-gradient-to-r from-gold-600 to-gold-500 text-dark-950 font-inter font-semibold rounded-md transition-all duration-300 hover:from-gold-500 hover:to-gold-400 hover:shadow-lg hover:shadow-gold-500/50"
          >
            ▶ Regarder
          </button>
          {video.pdfUrl && (
            <a
              href={video.pdfUrl}
              download
              className="py-3 px-6 bg-dark-700/50 border border-gold-500/30 text-gold-300 font-inter font-semibold rounded-md transition-all duration-300 hover:bg-dark-700 hover:border-gold-500/50 hover:text-gold-200"
            >
              📄 PDF
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
