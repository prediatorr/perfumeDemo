import { useEffect, useState } from 'react';

// function SmokeSVG({ opacity = 0.35 }: { opacity?: number }) {
//   return (
//     <svg
//       viewBox="0 0 100 100"
//       preserveAspectRatio="none"
//       style={{
//         position: 'absolute',
//         inset: 0,
//         width: '100%',
//         height: '100%',
//         pointerEvents: 'none',
//         zIndex: 5,
//       }}
//     >
//       <defs>
//         <filter id="hero-smoke" x="-20%" y="-20%" width="140%" height="140%">
//           <feTurbulence
//             type="fractalNoise"
//             baseFrequency="0.008 0.004"
//             numOctaves="5"
//             seed="7"
//             result="noise"
//           >
//             <animate attributeName="seed" values="7;12;7" dur="8s" repeatCount="indefinite" />
//           </feTurbulence>
//           <feDisplacementMap
//             in="SourceGraphic"
//             in2="noise"
//             scale="40"
//             xChannelSelector="R"
//             yChannelSelector="G"
//             result="displaced"
//           />
//           <feGaussianBlur stdDeviation="2" result="blurred" />
//         </filter>
//         <linearGradient id="hero-smoke-grad" x1="0" y1="1" x2="0" y2="0">
//           <stop offset="0%" stopColor="rgba(7,7,7,0.8)" />
//           <stop offset="50%" stopColor="rgba(26,18,14,0.3)" />
//           <stop offset="100%" stopColor="transparent" />
//         </linearGradient>
//       </defs>
//       <rect
//         width="100"
//         height="100"
//         fill="url(#hero-smoke-grad)"
//         filter="url(#hero-smoke)"
//         opacity={opacity}
//       />
//     </svg>
//   );
// }

// function GlassBottle() {
//   const particles = Array.from({ length: 20 }, (_, i) => ({
//     id: i,
//     duration: 8 + Math.random() * 12,
//     delay: Math.random() * 10,
//     radius: 60 + Math.random() * 80,
//     size: 1.5 + Math.random() * 1,
//   }));

//   return (
//     <div
//       style={{
//         position: 'absolute',
//         left: '55%',
//         top: '45%',
//         width: 'clamp(140px, 18vw, 240px)',
//         height: 'clamp(200px, 26vw, 360px)',
//         zIndex: 6,
//         animation: 'bottle-float 4s ease-in-out infinite',
//       }}
//     >
//       {/* Bottle cap */}
//       <div
//         style={{
//           width: '40%',
//           height: '10%',
//           margin: '0 auto',
//           background: 'linear-gradient(to right, rgba(26,18,14,0.9) 0%, rgba(60,45,35,0.95) 40%, rgba(26,18,14,0.9) 100%)',
//           border: '1px solid rgba(214,168,106,0.3)',
//           borderRadius: '2px 2px 0 0',
//         }}
//       />
//       {/* Bottle body */}
//       <div
//         style={{
//           width: '100%',
//           height: '85%',
//           background: 'linear-gradient(135deg, rgba(214,168,106,0.35) 0%, rgba(214,168,106,0.08) 25%, rgba(245,235,220,0.15) 40%, rgba(214,168,106,0.05) 55%, rgba(245,235,220,0.1) 70%, rgba(214,168,106,0.25) 100%)',
//           backdropFilter: 'blur(8px) saturate(1.4)',
//           WebkitBackdropFilter: 'blur(8px) saturate(1.4)',
//           border: '1px solid rgba(214,168,106,0.4)',
//           borderRadius: '4px',
//           position: 'relative',
//           overflow: 'hidden',
//         }}
//       >
//         {/* Liquid inside */}
//         <div
//           style={{
//             position: 'absolute',
//             bottom: 0,
//             left: 0,
//             right: 0,
//             height: '60%',
//             background: 'linear-gradient(to top, rgba(90,60,30,0.6) 0%, rgba(140,100,50,0.3) 50%, transparent 100%)',
//             borderRadius: '0 0 3px 3px',
//           }}
//         />
//         {/* Highlight edge */}
//         <div
//           style={{
//             position: 'absolute',
//             top: 0,
//             right: '8%',
//             width: '2px',
//             height: '100%',
//             background: 'linear-gradient(to bottom, rgba(245,235,220,0.4) 0%, rgba(214,168,106,0.3) 50%, rgba(245,235,220,0.2) 100%)',
//           }}
//         />
//         {/* Label */}
//         <div
//           style={{
//             position: 'absolute',
//             top: '50%',
//             left: '50%',
//             transform: 'translate(-50%, -50%)',
//             textAlign: 'center',
//             fontFamily: '"Cormorant Garamond", serif',
//             fontSize: 'clamp(10px, 1.2vw, 14px)',
//             fontWeight: 300,
//             letterSpacing: '0.08em',
//             lineHeight: 1.3,
//             color: 'rgba(245,235,220,0.85)',
//             zIndex: 2,
//           }}
//         >
//           FRAGRANTOR'S<br />AROMA<br /><span style={{ fontSize: '0.6em', opacity: 0.7 }}>1850</span>
//         </div>
//       </div>

//       {/* Orbiting particles */}
//       {particles.map((p) => (
//         <div
//           key={p.id}
//           style={{
//             position: 'absolute',
//             top: '50%',
//             left: '50%',
//             width: `${p.size}px`,
//             height: `${p.size}px`,
//             background: 'rgba(214,168,106,0.5)',
//             borderRadius: '50%',
//             animation: `orbit ${p.duration}s linear infinite`,
//             animationDelay: `${p.delay}s`,
//             marginLeft: '-1px',
//             marginTop: '-1px',
//             // @ts-ignore
//             '--radius': `${p.radius}px`,
//           }}
//         />
//       ))}
//     </div>
//   );
// }

function OrbitingParticleStyle() {
  return (
    <style>{`
      @keyframes orbit {
        from { transform: rotate(0deg) translateX(var(--radius, 80px)) rotate(0deg); }
        to { transform: rotate(360deg) translateX(var(--radius, 80px)) rotate(-360deg); }
      }
    `}</style>
  );
}

export function Hero() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      id="hero"
      style={{
        minHeight: '100vh',
        position: 'relative',
        overflow: 'hidden',
        backgroundColor: 'var(--midnight)',
      }}
    >
      <OrbitingParticleStyle />

      {/* BACKGROUND LAYER (z: 0) */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 0,
        }}
      >
        <img
          src="/images/hero-bg.jpg"
          alt="Dark luxury atelier"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            filter: 'brightness(0.85)',
          }}
        />
      </div>

      {/* FRAGRANTOR'S TYPE (z: 2) */}
      <div
        style={{
          position: 'absolute',
          top: '15%',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 2,
          whiteSpace: 'nowrap',
          fontFamily: '"Cormorant Garamond", serif',
          fontSize: 'clamp(60px, 10vw, 140px)',
          fontWeight: 200,
          letterSpacing: '0.04em',
          color: 'rgba(245,235,220,0.08)',
          pointerEvents: 'none',
          userSelect: 'none',
        }}
      >
        F R A G R A N T O R ' S
      </div>

      {/* SMOKE LAYER (z: 5) */}
      {/* <SmokeSVG opacity={0.35} /> */}

      {/* GLASS BOTTLE (z: 6) */}
      {/* <GlassBottle /> */}

      {/* HERO HEADLINE (z: 8) */}
      <div
        style={{
          position: 'absolute',
          left: 'clamp(24px, 4vw, 80px)',
          bottom: '18%',
          maxWidth: '520px',
          zIndex: 8,
        }}
      >
        {/* Eyebrow */}
        <div
          style={{
            fontFamily: 'Inter',
            fontSize: '7px',
            fontWeight: 400,
            textTransform: 'uppercase',
            letterSpacing: '0.22em',
            color: 'var(--amber-gold)',
            marginBottom: '16px',
            opacity: loaded ? 1 : 0,
            transition: 'opacity 800ms cubic-bezier(0.16, 1, 0.3, 1) 800ms',
          }}
        >
          THE FRAGRANCE OF PEOPLE SINCE 1850
        </div>

        {/* Headline */}
        <h1
          style={{
            fontFamily: '"Cormorant Garamond", serif',
            fontSize: 'clamp(28px, 4vw, 48px)',
            fontWeight: 200,
            fontStyle: 'italic',
            color: 'var(--soft-cream)',
            lineHeight: 1.15,
            margin: 0,
            opacity: loaded ? 1 : 0,
            transform: loaded ? 'translateY(0)' : 'translateY(30px)',
            transition: 'opacity 1000ms cubic-bezier(0.16, 1, 0.3, 1) 1200ms, transform 1000ms cubic-bezier(0.16, 1, 0.3, 1) 1200ms',
          }}
        >
          We Do Not Create Perfume.<br />We Create Atmospheres.
        </h1>

        {/* Subtext */}
        <p
          style={{
            fontFamily: 'Inter',
            fontSize: '13px',
            fontWeight: 400,
            color: 'rgba(245,235,220,0.5)',
            maxWidth: '420px',
            marginTop: '20px',
            lineHeight: 1.6,
            opacity: loaded ? 1 : 0,
            transform: loaded ? 'translateY(0)' : 'translateY(30px)',
            transition: 'opacity 1000ms cubic-bezier(0.16, 1, 0.3, 1) 1400ms, transform 1000ms cubic-bezier(0.16, 1, 0.3, 1) 1400ms',
          }}
        >
          An olfactory house crafting perfumes, attars, ambient fragrances, and sensory environments that linger long after the moment fades.
        </p>

        {/* CTA Group */}
        <div
          className="flex items-center gap-4"
          style={{
            marginTop: '28px',
            opacity: loaded ? 1 : 0,
            transform: loaded ? 'translateY(0)' : 'translateY(30px)',
            transition: 'opacity 1000ms cubic-bezier(0.16, 1, 0.3, 1) 1600ms, transform 1000ms cubic-bezier(0.16, 1, 0.3, 1) 1600ms',
          }}
        >
          <a
            href="#collections"
            className="btn-fill"
            style={{
              padding: '12px 28px',
              border: '1px solid rgba(245,235,220,0.35)',
              borderRadius: '40px',
              fontFamily: 'Inter',
              fontSize: '10px',
              fontWeight: 400,
              textTransform: 'uppercase',
              letterSpacing: '0.16em',
              color: 'var(--soft-cream)',
              textDecoration: 'none',
              transition: 'border-color 300ms ease',
            }}
            data-cursor="hover"
          >
            Discover Collections
          </a>
          <a
            href="#atmosphere-lab"
            className="group"
            style={{
              fontFamily: 'Inter',
              fontSize: '10px',
              fontWeight: 400,
              textTransform: 'uppercase',
              color: 'var(--amber-gold)',
              letterSpacing: '0.14em',
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
            data-cursor="hover"
          >
            Enter The Experience
            <span className="inline-block transition-transform duration-200 group-hover:translate-x-1">&rarr;</span>
          </a>
        </div>
      </div>
    </section>
  );
}
