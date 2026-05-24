import { Instagram, PinIcon } from 'lucide-react';

const navLinks = ['Essence', 'Collections', 'Atmosphere', 'Hospitality', 'Contact'];

function BehanceIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8 12h4M10 12v0M3 3h7a4 4 0 014 4 4 4 0 01-4 4H3V3zM3 11h8a4 4 0 014 4 4 4 0 01-4 4H3v-8zM15 8h7M17 16h5" />
    </svg>
  );
}

export function Footer() {
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, label: string) => {
    e.preventDefault();
    const sectionMap: Record<string, string> = {
      Essence: '#art-of-scent',
      Collections: '#collections',
      Atmosphere: '#atmosphere-lab',
      Hospitality: '#atmosphere-lab',
      Contact: '#contact',
    };
    const target = document.querySelector(sectionMap[label] || `#${label.toLowerCase()}`);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer
      style={{
        width: '100%',
        padding: '48px 0 24px',
        backgroundColor: 'var(--midnight)',
      }}
    >
      {/* Hairline */}
      <div
        style={{
          height: '1px',
          background: 'rgba(255,255,255,0.08)',
          marginBottom: '48px',
        }}
      />

      <div
        style={{
          maxWidth: '1400px',
          margin: '0 auto',
          padding: '0 clamp(24px, 4vw, 80px)',
        }}
      >
        {/* Three-column layout */}
        <div
          className="flex flex-col md:flex-row justify-between items-start gap-8 footer-columns"
        >
          {/* Left - Wordmark */}
          <div>
            <div className="flex items-center">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="flex-shrink-0">
                <rect x="4" y="6" width="8" height="9" rx="1" stroke="currentColor" strokeWidth="1" fill="none" />
                <rect x="6" y="2" width="4" height="4" rx="0.5" stroke="currentColor" strokeWidth="1" fill="none" />
                <line x1="5" y1="1" x2="11" y2="1" stroke="currentColor" strokeWidth="1" />
              </svg>
              <span
                className="ml-3"
                style={{
                  fontFamily: 'Inter',
                  fontSize: '9px',
                  fontWeight: 400,
                  textTransform: 'uppercase',
                  letterSpacing: '0.22em',
                  color: 'var(--soft-cream)',
                }}
              >
                FRAGRANTOR'S AROMA
              </span>
            </div>
            <p
              style={{
                fontFamily: 'Inter',
                fontSize: '8px',
                fontWeight: 400,
                textTransform: 'uppercase',
                letterSpacing: '0.12em',
                color: 'rgba(245,235,220,0.3)',
                marginTop: '8px',
              }}
            >
              The Fragrance of People Since 1850
            </p>
          </div>

          {/* Center - Nav */}
          <div className="flex flex-wrap gap-6">
            {navLinks.map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                onClick={(e) => handleNavClick(e, link)}
                style={{
                  fontFamily: 'Inter',
                  fontSize: '8px',
                  fontWeight: 400,
                  textTransform: 'uppercase',
                  letterSpacing: '0.18em',
                  color: 'rgba(245,235,220,0.4)',
                  textDecoration: 'none',
                  transition: 'color 200ms ease',
                }}
                className="nav-underline"
                data-cursor="hover"
              >
                {link}
              </a>
            ))}
          </div>

          {/* Right - Social */}
          <div className="flex gap-3">
            {[
              { Icon: Instagram, label: 'Instagram' },
              { Icon: PinIcon, label: 'Pinterest' },
              { Icon: BehanceIcon, label: 'Behance' },
            ].map(({ Icon, label }) => (
              <a
                key={label}
                href="#"
                aria-label={label}
                data-cursor="hover"
                style={{
                  width: '28px',
                  height: '28px',
                  borderRadius: '50%',
                  border: '1px solid rgba(255,255,255,0.25)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'rgba(245,235,220,0.4)',
                  transition: 'color 200ms ease, border-color 200ms ease',
                  textDecoration: 'none',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = 'var(--amber-gold)';
                  e.currentTarget.style.borderColor = 'var(--amber-gold)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = 'rgba(245,235,220,0.4)';
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.25)';
                }}
              >
                <Icon size={12} />
              </a>
            ))}
          </div>
        </div>

        {/* Bottom micro-row */}
        <div
          className="flex flex-col sm:flex-row justify-between items-center gap-2"
          style={{ marginTop: '32px' }}
        >
          <span
            style={{
              fontFamily: 'Inter',
              fontSize: '8px',
              fontWeight: 400,
              color: 'rgba(245,235,220,0.2)',
            }}
          >
            &copy; 2025 Fragrantor's Aroma &middot; All rights reserved
          </span>
          <span
            style={{
              fontFamily: 'Inter',
              fontSize: '8px',
              fontWeight: 400,
              color: 'rgba(245,235,220,0.2)',
            }}
          >
            Crafted with intention
          </span>
        </div>
      </div>
    </footer>
  );
}
