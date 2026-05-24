import { useEffect, useRef, useState } from 'react';
import { useInView } from '../hooks/useInView';

const cards = [
  { id: 1, name: 'Oud', descriptor: 'Deep \u00b7 Ritualistic', image: '/images/card-oud.jpg', video: '/videos/video-oud.mp4' },
  { id: 2, name: 'Amber', descriptor: 'Warm \u00b7 Eternal', image: '/images/card-amber.jpg', video: '/videos/video-amber.mp4' },
  { id: 3, name: 'Rose', descriptor: 'Velvet \u00b7 Intimate', image: '/images/card-rose.jpg', video: '/videos/video-rose.mp4' },
  { id: 4, name: 'Sandalwood', descriptor: 'Sacred \u00b7 Calm', image: '/images/card-sandalwood.jpg', video: '/videos/video-sandalwood.mp4' },
  { id: 5, name: 'Musk', descriptor: 'Skin \u00b7 Memory', image: '/images/card-musk.jpg', video: '/videos/video-musk.mp4' },
];

function ScentCard({ card }: { card: typeof cards[0] }) {
  const [cardRef, isInView] = useInView<HTMLDivElement>({ threshold: 0.6 });
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (isInView) {
      video.play().catch(() => {});
    } else {
      video.pause();
    }
  }, [isInView]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.playbackRate = isHovered ? 1.5 : 0.7;
  }, [isHovered]);

  return (
    <div
      ref={cardRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      data-cursor="hover"
      style={{
        width: '200px',
        height: '280px',
        flexShrink: 0,
        background: 'rgba(255,255,255,0.03)',
        border: '1px solid rgba(255,255,255,0.1)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        borderRadius: '16px',
        overflow: 'hidden',
        position: 'relative',
        cursor: 'pointer',
        transition: 'transform 300ms cubic-bezier(0.16, 1, 0.3, 1), border-color 300ms ease, box-shadow 300ms ease',
        transform: isHovered ? 'translateY(-5px)' : 'translateY(0)',
        borderColor: isHovered ? 'rgba(214,168,106,0.4)' : 'rgba(255,255,255,0.1)',
        boxShadow: isHovered ? '0 12px 40px rgba(214,168,106,0.15)' : 'none',
      }}
    >
      {/* Video/Image layer */}
      <div style={{ position: 'absolute', inset: 0 }}>
        <video
          ref={videoRef}
          src={card.video}
          muted
          loop
          playsInline
          preload="auto"
          poster={card.image}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />
        {/* Dark overlay gradient */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to top, rgba(7,7,7,0.85) 0%, rgba(7,7,7,0.2) 40%, transparent 60%)',
          }}
        />
      </div>

      {/* Content */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          padding: '16px',
          zIndex: 2,
        }}
      >
        <span
          style={{
            position: 'absolute',
            top: '12px',
            left: '16px',
            fontFamily: 'Inter',
            fontSize: '7px',
            letterSpacing: '0.12em',
            color: 'rgba(245,235,220,0.3)',
          }}
        >
          {String(card.id).padStart(2, '0')}
        </span>
        <h3
          style={{
            fontFamily: 'Inter',
            fontSize: '9px',
            fontWeight: 400,
            textTransform: 'uppercase',
            letterSpacing: '0.18em',
            color: 'var(--soft-cream)',
            margin: 0,
          }}
        >
          {card.name}
        </h3>
        <p
          style={{
            fontFamily: '"Cormorant Garamond", serif',
            fontSize: '8px',
            fontWeight: 300,
            fontStyle: 'italic',
            color: 'var(--amber-gold)',
            margin: '4px 0 0',
          }}
        >
          {card.descriptor}
        </p>
      </div>
    </div>
  );
}

export function ScentCardStrip() {
  const [sectionRef, isInView] = useInView<HTMLDivElement>({ threshold: 0.1 });

  return (
    <div
      ref={sectionRef}
      style={{
        width: '100%',
        padding: '40px 0 80px',
        backgroundColor: 'var(--midnight)',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          display: 'flex',
          gap: '16px',
          padding: '0 clamp(24px, 4vw, 80px)',
          overflowX: 'auto',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        }}
      >
        <style>{`
          div::-webkit-scrollbar { display: none; }
        `}</style>
        {cards.map((card, index) => (
          <div
            key={card.id}
            style={{
              opacity: isInView ? 1 : 0,
              transform: isInView ? 'translateY(0)' : 'translateY(20px)',
              transition: `opacity 600ms cubic-bezier(0.16, 1, 0.3, 1) ${index * 100}ms, transform 600ms cubic-bezier(0.16, 1, 0.3, 1) ${index * 100}ms`,
            }}
          >
            <ScentCard card={card} />
          </div>
        ))}
      </div>
    </div>
  );
}
