import { useEffect, useState } from 'react';

const navLinks = [
  { label: 'Essence', href: '#art-of-scent' },
  { label: 'Collections', href: '#collections' },
  { label: 'Atmosphere', href: '#atmosphere-lab' },
  { label: 'Hospitality', href: '#atmosphere-lab' },
  { label: 'Contact', href: '#contact' },
];

export function Navigation() {
  const [visible, setVisible] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 800);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const sections = document.querySelectorAll('section[id]');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.3 }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between"
      style={{
        padding: '24px clamp(24px, 4vw, 80px)',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(-10px)',
        transition: 'opacity 800ms cubic-bezier(0.16, 1, 0.3, 1) 800ms, transform 800ms cubic-bezier(0.16, 1, 0.3, 1) 800ms',
      }}
    >
      {/* Wordmark */}
      <div className="flex items-center">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="flex-shrink-0">
          <rect x="4" y="6" width="8" height="9" rx="1" stroke="currentColor" strokeWidth="1" fill="none" />
          <rect x="6" y="2" width="4" height="4" rx="0.5" stroke="currentColor" strokeWidth="1" fill="none" />
          <line x1="5" y1="1" x2="11" y2="1" stroke="currentColor" strokeWidth="1" />
        </svg>
        <div
          className="mx-3"
          style={{ width: '1px', height: '16px', background: 'rgba(245,235,220,0.25)' }}
        />
        <span className="text-soft-cream" style={{ fontFamily: 'Inter', fontSize: '9px', fontWeight: 400, textTransform: 'uppercase', letterSpacing: '0.22em' }}>
          FRAGRANTOR'S AROMA
        </span>
      </div>

      {/* Center Nav Links */}
      <div className="hidden lg:flex items-center" style={{ gap: '32px' }}>
        {navLinks.map((link) => (
          <a
            key={link.label}
            href={link.href}
            onClick={(e) => handleNavClick(e, link.href)}
            className={activeSection && link.href === `#${activeSection}` ? 'nav-underline-active' : 'nav-underline'}
            style={{
              fontFamily: 'Inter',
              fontSize: '8px',
              fontWeight: 400,
              textTransform: 'uppercase',
              letterSpacing: '0.18em',
              color: activeSection && link.href === `#${activeSection}` ? 'var(--soft-cream)' : 'rgba(245,235,220,0.55)',
              transition: 'color 200ms ease',
              textDecoration: 'none',
              paddingBottom: '2px',
            }}
            data-cursor="hover"
          >
            {link.label}
          </a>
        ))}
      </div>

      {/* CTA Pill */}
      <a
        href="#contact"
        onClick={(e) => handleNavClick(e, '#contact')}
        className="btn-fill hidden md:inline-block"
        style={{
          padding: '10px 24px',
          border: '1px solid rgba(245,235,220,0.3)',
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
        Experience Aroma
      </a>

      {/* Mobile menu button */}
      <button className="lg:hidden flex flex-col gap-1" data-cursor="hover">
        <span className="block" style={{ width: '20px', height: '1px', background: 'var(--soft-cream)' }} />
        <span className="block" style={{ width: '14px', height: '1px', background: 'var(--soft-cream)' }} />
      </button>
    </nav>
  );
}
