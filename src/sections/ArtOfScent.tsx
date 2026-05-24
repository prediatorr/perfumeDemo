import { useEffect, useRef, useState } from 'react';
import { useInView } from '../hooks/useInView';

const collageImages = [
  { src: '/images/collage-1.jpg', alt: 'Attar oil pour', width: '45%', top: '0%', left: '0%', rotate: -2, zIndex: 6 },
  { src: '/images/collage-2.jpg', alt: 'Oud wood', width: '40%', top: '8%', left: '35%', rotate: 3, zIndex: 5 },
  { src: '/images/collage-3.jpg', alt: 'Smoke trail', width: '42%', top: '30%', left: '15%', rotate: -2, zIndex: 4 },
  { src: '/images/collage-4.jpg', alt: 'Perfumer lab', width: '38%', top: '45%', left: '50%', rotate: 4, zIndex: 3 },
  { src: '/images/collage-5.jpg', alt: 'Oil vials', width: '35%', top: '55%', left: '5%', rotate: -3, zIndex: 2 },
  { src: '/images/collage-6.jpg', alt: 'Candlelight', width: '40%', top: '65%', left: '40%', rotate: 2, zIndex: 1 },
];

function KeyPhrase({ children }: { children: React.ReactNode }) {
  const [ref, isInView] = useInView<HTMLSpanElement>({ threshold: 0.5 });
  return (
    <span ref={ref} className={`key-phrase ${isInView ? 'is-visible' : ''}`}>
      {children}
    </span>
  );
}

function Collage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [collageRef, isInView] = useInView<HTMLDivElement>({ threshold: 0.15 });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
      setMousePos({ x, y });
    };

    container.addEventListener('mousemove', handleMouseMove);
    return () => container.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div
      ref={(el) => {
        collageRef.current = el;
        (containerRef as React.MutableRefObject<HTMLDivElement | null>).current = el;
      }}
      style={{
        position: 'relative',
        height: '500px',
        width: '100%',
      }}
    >
      {collageImages.map((img, index) => {
        const parallaxFactor = (img.zIndex - 3) * 2;
        return (
          <div
            key={index}
            style={{
              position: 'absolute',
              width: img.width,
              top: img.top,
              left: img.left,
              zIndex: img.zIndex,
              border: '1px solid rgba(255,255,255,0.15)',
              borderRadius: '4px',
              boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
              overflow: 'hidden',
              transform: `rotate(${img.rotate}deg) translate(${mousePos.x * parallaxFactor}px, ${mousePos.y * parallaxFactor}px)`,
              transition: `transform 0.3s ease-out, opacity 600ms cubic-bezier(0.16, 1, 0.3, 1) ${index * 150}ms`,
              opacity: isInView ? 1 : 0,
            }}
          >
            <img
              src={img.src}
              alt={img.alt}
              style={{
                width: '100%',
                aspectRatio: '4/5',
                objectFit: 'cover',
                display: 'block',
              }}
              loading="lazy"
            />
          </div>
        );
      })}
    </div>
  );
}

export function ArtOfScent() {
  const [sectionRef, isInView] = useInView<HTMLElement>({ threshold: 0.1 });

  return (
    <section
      id="art-of-scent"
      ref={sectionRef}
      style={{
        width: '100%',
        padding: '120px 0',
        backgroundColor: 'var(--midnight)',
      }}
    >
      {/* Section Header */}
      <div style={{ width: '100%' }}>
        <div style={{ height: '1px', background: 'rgba(255,255,255,0.12)', marginBottom: '24px' }} />
        <h2
          style={{
            fontFamily: '"Cormorant Garamond", serif',
            fontSize: 'clamp(36px, 5vw, 64px)',
            fontWeight: 300,
            letterSpacing: '0.04em',
            color: 'var(--soft-cream)',
            textAlign: 'center',
            margin: 0,
          }}
        >
          THE ART OF SCENT
        </h2>
        <div
          style={{
            textAlign: 'center',
            marginTop: '8px',
            fontFamily: 'Inter',
            fontSize: '10px',
            letterSpacing: '0.12em',
            color: 'rgba(245,235,220,0.3)',
          }}
        >
          02
        </div>
        <div style={{ height: '1px', background: 'rgba(255,255,255,0.12)', marginTop: '24px' }} />
      </div>

      {/* Two-column layout */}
      <div
        style={{
          maxWidth: '1400px',
          margin: '60px auto 0',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '60px',
          padding: '0 clamp(24px, 4vw, 80px)',
          alignItems: 'start',
        }}
        className="art-of-scent-grid"
      >
        {/* LEFT COLUMN — Text */}
        <div
          style={{
            opacity: isInView ? 1 : 0,
            transform: isInView ? 'translateY(0)' : 'translateY(30px)',
            transition: 'opacity 800ms cubic-bezier(0.16, 1, 0.3, 1), transform 800ms cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          <p
            style={{
              fontFamily: '"Cormorant Garamond", serif',
              fontSize: '15px',
              fontWeight: 300,
              lineHeight: 1.75,
              color: 'rgba(245,235,220,0.55)',
            }}
          >
            Fragrance is <KeyPhrase>invisible architecture</KeyPhrase>. It shapes{' '}
            <KeyPhrase>memory, emotion, intimacy</KeyPhrase>, and atmosphere.
          </p>
          <p
            style={{
              fontFamily: '"Cormorant Garamond", serif',
              fontSize: '15px',
              fontWeight: 300,
              lineHeight: 1.75,
              color: 'rgba(245,235,220,0.55)',
              marginTop: '20px',
            }}
          >
            At Fragrantor's Aroma, traditional <KeyPhrase>attar craftsmanship</KeyPhrase> meets modern olfactory
            engineering to create perfumes and aromatic environments designed not merely to be worn —{' '}
            <KeyPhrase>but remembered</KeyPhrase>.
          </p>
          <a
            href="#collections"
            style={{
              display: 'inline-block',
              marginTop: '32px',
              fontFamily: 'Inter',
              fontSize: '9px',
              fontWeight: 400,
              textTransform: 'uppercase',
              letterSpacing: '0.18em',
              color: 'var(--amber-gold)',
              textDecoration: 'none',
            }}
            className="nav-underline"
            data-cursor="hover"
          >
            OUR ESSENCE &rarr;
          </a>
        </div>

        {/* RIGHT COLUMN — Collage */}
        <Collage />
      </div>

      <style>{`
        @media (max-width: 768px) {
          .art-of-scent-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
