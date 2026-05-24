import { useState } from 'react';
import { useInView } from '../hooks/useInView';

function FormField({ label, type = 'text', textarea = false }: { label: string; type?: string; textarea?: boolean }) {
  const [focused, setFocused] = useState(false);
  const [value, setValue] = useState('');
  const isActive = focused || value.length > 0;

  return (
    <div
      style={{
        position: 'relative',
        borderBottom: `1px solid ${focused ? 'var(--amber-gold)' : 'rgba(255,255,255,0.1)'}`,
        paddingBottom: '12px',
        transition: 'border-color 300ms ease',
      }}
    >
      <label
        style={{
          position: 'absolute',
          left: 0,
          fontFamily: 'Inter',
          fontSize: isActive ? '8px' : '9px',
          fontWeight: 400,
          textTransform: 'uppercase',
          letterSpacing: '0.12em',
          color: isActive ? 'var(--amber-gold)' : 'rgba(245,235,220,0.3)',
          top: isActive ? '-12px' : '0',
          transition: 'all 300ms cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        {label}
      </label>
      {textarea ? (
        <textarea
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          rows={3}
          style={{
            background: 'transparent',
            border: 'none',
            outline: 'none',
            fontFamily: 'Inter',
            fontSize: '13px',
            color: 'var(--soft-cream)',
            width: '100%',
            paddingTop: '16px',
            resize: 'none',
          }}
        />
      ) : (
        <input
          type={type}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={{
            background: 'transparent',
            border: 'none',
            outline: 'none',
            fontFamily: 'Inter',
            fontSize: '13px',
            color: 'var(--soft-cream)',
            width: '100%',
            paddingTop: '16px',
          }}
        />
      )}
    </div>
  );
}

export function Contact() {
  const [sectionRef, isInView] = useInView<HTMLElement>({ threshold: 0.2 });

  return (
    <section
      id="contact"
      ref={sectionRef}
      style={{
        width: '100%',
        minHeight: '100vh',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      {/* Background image */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 0,
        }}
      >
        <img
          src="/images/contact-bg.jpg"
          alt="Dark luxury consultation room"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />
        {/* Left gradient overlay */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to right, rgba(7,7,7,0.7) 0%, transparent 60%)',
          }}
        />
      </div>

      {/* Glassmorphism Contact Panel */}
      <div
        style={{
          position: 'relative',
          zIndex: 2,
          maxWidth: '420px',
          marginLeft: 'clamp(24px, 8vw, 160px)',
          marginRight: '24px',
          background: 'rgba(20,15,10,0.72)',
          border: '1px solid rgba(255,255,255,0.1)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          borderRadius: '16px',
          padding: '40px',
          opacity: isInView ? 1 : 0,
          transform: isInView ? 'translateX(0)' : 'translateX(-30px)',
          transition: 'opacity 800ms cubic-bezier(0.16, 1, 0.3, 1), transform 800ms cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        <h2
          style={{
            fontFamily: '"Cormorant Garamond", serif',
            fontSize: '26px',
            fontWeight: 300,
            fontStyle: 'italic',
            color: 'var(--soft-cream)',
            lineHeight: 1.3,
            margin: 0,
          }}
        >
          Let Us Craft Your<br />Signature Atmosphere
        </h2>
        <span
          style={{
            display: 'block',
            marginTop: '16px',
            fontFamily: 'Inter',
            fontSize: '8px',
            fontWeight: 400,
            textTransform: 'uppercase',
            letterSpacing: '0.18em',
            color: 'var(--amber-gold)',
          }}
        >
          LEAVE A REQUEST
        </span>

        {/* Form */}
        <form
          style={{
            marginTop: '32px',
            display: 'flex',
            flexDirection: 'column',
            gap: '24px',
          }}
          onSubmit={(e) => e.preventDefault()}
        >
          <FormField label="YOUR NAME" />
          <FormField label="BRAND / SPACE" />
          <FormField label="CONTACT NUMBER" type="tel" />
          <FormField label="FRAGRANCE VISION" textarea />

          <button
            type="submit"
            className="btn-fill"
            data-cursor="hover"
            style={{
              width: '100%',
              marginTop: '16px',
              padding: '14px',
              background: 'rgba(245,235,220,0.08)',
              border: '1px solid rgba(245,235,220,0.25)',
              borderRadius: '40px',
              fontFamily: 'Inter',
              fontSize: '11px',
              fontWeight: 400,
              textTransform: 'uppercase',
              letterSpacing: '0.16em',
              color: 'var(--soft-cream)',
              cursor: 'pointer',
              transition: 'border-color 300ms ease',
            }}
          >
            SEND REQUEST
          </button>
        </form>
      </div>

      {/* Atmospheric text on right */}
      <div
        className="hidden lg:block"
        style={{
          position: 'absolute',
          right: '5%',
          top: '50%',
          transform: 'translateY(-50%)',
          fontFamily: '"Cormorant Garamond", serif',
          fontSize: 'clamp(80px, 12vw, 160px)',
          fontWeight: 200,
          color: 'rgba(245,235,220,0.04)',
          writingMode: 'vertical-rl',
          lineHeight: 1,
          zIndex: 1,
          pointerEvents: 'none',
          userSelect: 'none',
          opacity: isInView ? 1 : 0,
          transition: 'opacity 1000ms cubic-bezier(0.16, 1, 0.3, 1) 400ms',
        }}
      >
        FRAGRANTOR'S
      </div>

      <style>{`
        @media (max-width: 768px) {
          #contact {
            padding: 80px 0 !important;
          }
          #contact > div:nth-child(2) {
            margin: 0 24px !important;
            max-width: none !important;
            width: 100% !important;
          }
        }
      `}</style>
    </section>
  );
}
