import { useState } from 'react';
import { useInView } from '../hooks/useInView';

const moods = [
  { id: 'warm-amber', label: 'WARM AMBBER' },
  { id: 'sacred-oud', label: 'SACRED OUD' },
  { id: 'fresh-linen', label: 'FRESH LINEN' },
  { id: 'velvet-rose', label: 'VELVET ROSE' },
  { id: 'sandal-serenity', label: 'SANDAL SERENITY' },
];

const hospitalityCards = [
  { title: 'Hotel Scenting', image: '/images/collection-hospitality.jpg' },
  { title: 'Spa Environments', image: '/images/collection-home.jpg' },
  { title: 'Retail Scent Branding', image: '/images/collection-aroma.jpg' },
];

function SmokeSVG({ opacity }: { opacity: number }) {
  return (
    <svg
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 2,
      }}
    >
      <defs>
        <filter id="lab-smoke" x="-20%" y="-20%" width="140%" height="140%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.008 0.004"
            numOctaves="5"
            seed="7"
            result="noise"
          >
            <animate attributeName="seed" values="7;12;7" dur="8s" repeatCount="indefinite" />
          </feTurbulence>
          <feDisplacementMap
            in="SourceGraphic"
            in2="noise"
            scale="40"
            xChannelSelector="R"
            yChannelSelector="G"
            result="displaced"
          />
          <feGaussianBlur stdDeviation="2" result="blurred" />
        </filter>
        <linearGradient id="lab-smoke-grad" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0%" stopColor="rgba(7,7,7,0.6)" />
          <stop offset="50%" stopColor="rgba(26,18,14,0.2)" />
          <stop offset="100%" stopColor="transparent" />
        </linearGradient>
      </defs>
      <rect
        width="100"
        height="100"
        fill="url(#lab-smoke-grad)"
        filter="url(#lab-smoke)"
        opacity={opacity}
      />
    </svg>
  );
}

export function AtmosphereLab() {
  const [activeMood, setActiveMood] = useState('warm-amber');
  const [sectionRef, isInView] = useInView<HTMLElement>({ threshold: 0.1 });

  const moodMap: Record<string, { color: string; opacity: number }> = {
    'warm-amber': { color: '#D6A86A', opacity: 0.4 },
    'sacred-oud': { color: '#5B3A32', opacity: 0.6 },
    'fresh-linen': { color: '#E8EAF0', opacity: 0.15 },
    'velvet-rose': { color: '#B06070', opacity: 0.35 },
    'sandal-serenity': { color: '#9E8060', opacity: 0.25 },
  };

  const currentMood = moodMap[activeMood];

  return (
    <section
      id="atmosphere-lab"
      ref={sectionRef}
      style={{
        width: '100%',
        padding: '120px 0',
        backgroundColor: 'var(--midnight)',
        position: 'relative',
      }}
    >
      {/* Top smoke gradient */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '120px',
          background: 'linear-gradient(to bottom, rgba(26,18,14,0.3), transparent)',
          pointerEvents: 'none',
        }}
      />

      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 clamp(24px, 4vw, 80px)' }}>
        {/* Section Header */}
        <div
          style={{
            opacity: isInView ? 1 : 0,
            transform: isInView ? 'translateY(0)' : 'translateY(30px)',
            transition: 'opacity 800ms cubic-bezier(0.16, 1, 0.3, 1), transform 800ms cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          <div className="flex items-center gap-3" style={{ marginBottom: '12px' }}>
            <span
              style={{
                fontFamily: 'Inter',
                fontSize: '10px',
                letterSpacing: '0.12em',
                color: 'rgba(245,235,220,0.3)',
              }}
            >
              04
            </span>
            <div style={{ width: '40px', height: '1px', background: 'rgba(255,255,255,0.12)' }} />
          </div>
          <h2
            style={{
              fontFamily: '"Cormorant Garamond", serif',
              fontSize: 'clamp(36px, 5vw, 64px)',
              fontWeight: 300,
              letterSpacing: '0.04em',
              color: 'var(--soft-cream)',
              margin: 0,
            }}
          >
            Designing Emotional Atmospheres
          </h2>
          <p
            style={{
              fontFamily: 'Inter',
              fontSize: '14px',
              fontWeight: 400,
              color: 'rgba(245,235,220,0.55)',
              maxWidth: '560px',
              marginTop: '16px',
              lineHeight: 1.75,
            }}
          >
            We craft signature olfactory experiences that transform spaces, elevate brand identity, and create unforgettable memories.
          </p>
        </div>

        {/* Mood Pills */}
        <div
          className="flex flex-wrap justify-center gap-3"
          style={{
            marginTop: '48px',
            opacity: isInView ? 1 : 0,
            transition: 'opacity 800ms cubic-bezier(0.16, 1, 0.3, 1) 200ms',
          }}
        >
          {moods.map((mood, index) => {
            const isActive = activeMood === mood.id;
            return (
              <button
                key={mood.id}
                onClick={() => setActiveMood(mood.id)}
                data-cursor="hover"
                style={{
                  padding: '10px 24px',
                  borderRadius: '40px',
                  border: `1px solid ${isActive ? 'var(--amber-gold)' : 'rgba(255,255,255,0.2)'}`,
                  background: isActive ? 'rgba(214,168,106,0.15)' : 'transparent',
                  color: isActive ? 'var(--soft-cream)' : 'rgba(245,235,220,0.4)',
                  fontFamily: 'Inter',
                  fontSize: '9px',
                  fontWeight: 400,
                  textTransform: 'uppercase',
                  letterSpacing: '0.14em',
                  cursor: 'pointer',
                  transition: 'all 300ms cubic-bezier(0.16, 1, 0.3, 1)',
                  boxShadow: isActive ? '0 0 20px rgba(214,168,106,0.15)' : 'none',
                  opacity: isInView ? 1 : 0,
                  transform: isInView ? 'translateY(0)' : 'translateY(10px)',
                  transitionDelay: `${200 + index * 80}ms`,
                }}
              >
                {mood.label}
              </button>
            );
          })}
        </div>

        {/* Room Preview */}
        <div
          className="mood-lab"
          data-mood={activeMood}
          style={{
            margin: '48px auto 0',
            maxWidth: '850px',
            height: '420px',
            borderRadius: '16px',
            overflow: 'hidden',
            position: 'relative',
            boxShadow: `0 0 60px ${currentMood.color}33`,
            transition: 'box-shadow 800ms linear',
            opacity: isInView ? 1 : 0,
            transform: isInView ? 'scale(1)' : 'scale(0.98)',
            transitionProperty: 'opacity, transform, box-shadow',
            transitionDuration: '800ms',
            transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          {/* Base image */}
          <img
            src="/images/room-base.jpg"
            alt="Luxury room"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />

          {/* Light overlay */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: `radial-gradient(circle at 60% 40%, ${currentMood.color} 0%, transparent 70%)`,
              opacity: 0.35,
              mixBlendMode: 'soft-light',
              transition: 'background 800ms linear',
              zIndex: 1,
            }}
          />

          {/* Smoke overlay */}
          <SmokeSVG opacity={currentMood.opacity} />

          {/* Label */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 3,
            }}
          >
            <span
              style={{
                fontFamily: 'Inter',
                fontSize: '9px',
                fontWeight: 400,
                textTransform: 'uppercase',
                letterSpacing: '0.18em',
                color: 'rgba(245,235,220,0.6)',
              }}
            >
              {moods.find((m) => m.id === activeMood)?.label} — ACTIVE
            </span>
          </div>
        </div>

        {/* Hospitality Showcase */}
        <div
          className="flex gap-4 hospitality-showcase"
          style={{
            marginTop: '64px',
            opacity: isInView ? 1 : 0,
            transition: 'opacity 800ms cubic-bezier(0.16, 1, 0.3, 1) 400ms',
          }}
        >
          {hospitalityCards.map((card, index) => (
            <div
              key={card.title}
              style={{
                flex: 1,
                height: '200px',
                borderRadius: '16px',
                overflow: 'hidden',
                position: 'relative',
                opacity: isInView ? 1 : 0,
                transform: isInView ? 'translateY(0)' : 'translateY(20px)',
                transition: `opacity 600ms cubic-bezier(0.16, 1, 0.3, 1) ${400 + index * 120}ms, transform 600ms cubic-bezier(0.16, 1, 0.3, 1) ${400 + index * 120}ms`,
              }}
            >
              <img
                src={card.image}
                alt={card.title}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  filter: 'brightness(0.65)',
                }}
                loading="lazy"
              />
              <div
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  background: 'linear-gradient(to top, rgba(7,7,7,0.85), transparent)',
                  padding: '20px',
                }}
              >
                <h4
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
                  {card.title}
                </h4>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .hospitality-showcase {
            flex-direction: column !important;
          }
          .hospitality-showcase > div {
            height: 160px !important;
          }
        }
      `}</style>
    </section>
  );
}
