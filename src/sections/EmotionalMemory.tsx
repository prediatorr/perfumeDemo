import { useInView } from '../hooks/useInView';

const quotes = [
  {
    text: 'It smelled like memory.',
    attribution: 'MARIAM R., DUBAI',
    opacity: 0.85,
  },
  {
    text: 'The room felt alive.',
    attribution: 'HOSPITALITY DIRECTOR, AMAN HOTELS',
    opacity: 0.6,
  },
  {
    text: 'We remembered the fragrance long after leaving.',
    attribution: 'CONCEPT STORE, RIYADH',
    opacity: 0.4,
  },
  {
    text: 'It became part of our identity.',
    attribution: 'A GUEST',
    opacity: 0.25,
  },
];

function FloatingParticles() {
  const particles = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    duration: 15 + Math.random() * 10,
    delay: Math.random() * 20,
    size: 1,
  }));

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        overflow: 'hidden',
      }}
    >
      {particles.map((p) => (
        <div
          key={p.id}
          style={{
            position: 'absolute',
            left: `${p.left}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            background: 'rgba(214,168,106,0.15)',
            borderRadius: '50%',
            animation: `particle-drift ${p.duration}s linear ${p.delay}s infinite`,
          }}
        />
      ))}
    </div>
  );
}

export function EmotionalMemory() {
  const [sectionRef, isInView] = useInView<HTMLElement>({ threshold: 0.2 });

  return (
    <section
      id="emotional-memory"
      ref={sectionRef}
      style={{
        width: '100%',
        minHeight: '100vh',
        padding: '120px 0',
        backgroundColor: 'var(--midnight)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <FloatingParticles />

      <div
        style={{
          maxWidth: '700px',
          margin: '0 auto',
          padding: '0 clamp(24px, 4vw, 80px)',
          position: 'relative',
          zIndex: 2,
        }}
      >
        {quotes.map((quote, index) => (
          <div
            key={index}
            style={{
              marginBottom: index < quotes.length - 1 ? '48px' : 0,
              textAlign: 'center',
              opacity: isInView ? quote.opacity : 0,
              transition: `opacity 800ms cubic-bezier(0.16, 1, 0.3, 1) ${index * 400}ms`,
            }}
          >
            <blockquote
              style={{
                fontFamily: '"Cormorant Garamond", serif',
                fontSize: 'clamp(22px, 3vw, 32px)',
                fontWeight: 300,
                fontStyle: 'italic',
                color: 'var(--soft-cream)',
                lineHeight: 1.5,
                margin: 0,
              }}
            >
              "{quote.text}"
            </blockquote>
            <cite
              style={{
                display: 'block',
                marginTop: '12px',
                fontFamily: 'Inter',
                fontSize: '8px',
                fontWeight: 400,
                textTransform: 'uppercase',
                letterSpacing: '0.12em',
                color: 'rgba(214,168,106,0.5)',
                fontStyle: 'normal',
              }}
            >
              — {quote.attribution}
            </cite>
          </div>
        ))}
      </div>
    </section>
  );
}
