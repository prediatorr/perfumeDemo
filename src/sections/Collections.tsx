import { useState } from 'react';
import { useInView } from '../hooks/useInView';
import { Droplet, FlaskConical, Home, Building2, Droplets, Wind } from 'lucide-react';

const collections = [
  {
    id: 'attars',
    title: 'ATTARS',
    descriptor: 'dark woods, sacred smoke, midnight warmth',
    image: '/images/collection-attars.jpg',
    icon: Droplet,
    tall: true,
    wide: false,
  },
  {
    id: 'perfumes',
    title: 'SIGNATURE PERFUMES',
    descriptor: 'Eau de parfum that tells your story.',
    image: '/images/collection-perfumes.jpg',
    icon: FlaskConical,
    tall: false,
    wide: true,
  },
  {
    id: 'home',
    title: 'HOME FRAGRANCES',
    descriptor: 'Elevate your home with luxurious aromas.',
    image: '/images/collection-home.jpg',
    icon: Home,
    tall: false,
    wide: false,
  },
  {
    id: 'hospitality',
    title: 'HOSPITALITY',
    descriptor: 'Signature scenting for hotels and spas.',
    image: '/images/collection-hospitality.jpg',
    icon: Building2,
    tall: false,
    wide: false,
  },
  {
    id: 'aroma',
    title: 'AROMA OILS',
    descriptor: 'Pure aromatic oils for wellness.',
    image: '/images/collection-aroma.jpg',
    icon: Droplets,
    tall: false,
    wide: false,
  },
  {
    id: 'laundry',
    title: 'LAUNDRY',
    descriptor: 'Long-lasting freshness for every fabric.',
    image: '/images/collection-laundry.jpg',
    icon: Wind,
    tall: false,
    wide: false,
  },
];

function CollectionCard({
  collection,
  index,
  isVisible,
}: {
  collection: typeof collections[0];
  index: number;
  isVisible: boolean;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const Icon = collection.icon;

  const gridStyles = {
    gridRow: collection.tall ? 'span 2' : 'span 1',
    gridColumn: collection.wide ? 'span 2' : 'span 1',
  };

  return (
    <div
      style={{
        ...gridStyles,
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
        transition: `opacity 600ms cubic-bezier(0.16, 1, 0.3, 1) ${index * 100}ms, transform 600ms cubic-bezier(0.16, 1, 0.3, 1) ${index * 100}ms`,
      }}
    >
      <div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        data-cursor="hover"
        style={{
          width: '100%',
          height: '100%',
          minHeight: collection.tall ? '576px' : '280px',
          background: 'rgba(255,255,255,0.025)',
          border: `1px solid ${isHovered ? 'rgba(214,168,106,0.4)' : 'rgba(255,255,255,0.08)'}`,
          borderRadius: '16px',
          overflow: 'hidden',
          position: 'relative',
          cursor: 'pointer',
          transition: 'transform 300ms cubic-bezier(0.16, 1, 0.3, 1), border-color 300ms ease, box-shadow 300ms ease',
          transform: isHovered ? 'translateY(-4px)' : 'translateY(0)',
          boxShadow: isHovered ? '0 12px 40px rgba(214,168,106,0.1)' : 'none',
        }}
      >
        {/* Background image */}
        <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
          <img
            src={collection.image}
            alt={collection.title}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              filter: 'brightness(0.6)',
              transform: isHovered ? 'scale(1.05)' : 'scale(1)',
              transition: 'transform 500ms cubic-bezier(0.16, 1, 0.3, 1)',
            }}
            loading="lazy"
          />
        </div>

        {/* Glassmorphism overlay */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            background: 'linear-gradient(to top, rgba(7,7,7,0.9) 0%, transparent 60%)',
            padding: '24px',
            zIndex: 2,
          }}
        >
          <div
            style={{
              transform: isHovered ? 'scale(1.15)' : 'scale(1)',
              transition: 'transform 300ms ease',
              transformOrigin: 'left top',
              marginBottom: '12px',
            }}
          >
            <Icon size={16} color="#D6A86A" strokeWidth={1} />
          </div>
          <h3
            style={{
              fontFamily: 'Inter',
              fontSize: '10px',
              fontWeight: 400,
              textTransform: 'uppercase',
              letterSpacing: '0.18em',
              color: 'var(--soft-cream)',
              margin: 0,
            }}
          >
            {collection.title}
          </h3>
          <p
            style={{
              fontFamily: '"Cormorant Garamond", serif',
              fontSize: '10px',
              fontWeight: 300,
              fontStyle: 'italic',
              color: 'var(--amber-gold)',
              margin: '8px 0 0',
            }}
          >
            {collection.descriptor}
          </p>
          <a
            href={`#${collection.id}`}
            style={{
              display: 'inline-block',
              marginTop: '12px',
              fontFamily: 'Inter',
              fontSize: '8px',
              fontWeight: 400,
              textTransform: 'uppercase',
              letterSpacing: '0.14em',
              color: isHovered ? 'var(--amber-gold)' : 'rgba(245,235,220,0.5)',
              textDecoration: 'none',
              transition: 'color 200ms ease',
            }}
          >
            DISCOVER &rarr;
          </a>
        </div>
      </div>
    </div>
  );
}

export function Collections() {
  const [sectionRef, isInView] = useInView<HTMLElement>({ threshold: 0.1 });

  return (
    <section
      id="collections"
      ref={sectionRef}
      style={{
        width: '100%',
        padding: '120px 0',
        backgroundColor: 'var(--midnight)',
      }}
    >
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
              03
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
            COLLECTIONS
          </h2>
          <p
            style={{
              fontFamily: '"Cormorant Garamond", serif',
              fontSize: '16px',
              fontWeight: 300,
              fontStyle: 'italic',
              color: 'rgba(245,235,220,0.5)',
              marginTop: '12px',
            }}
          >
            Crafted for skin, space, and memory.
          </p>
        </div>

        {/* Bento Grid */}
        <div
          className="bento-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gridTemplateRows: 'repeat(2, 280px)',
            gap: '16px',
            marginTop: '48px',
          }}
        >
          {collections.map((collection, index) => (
            <CollectionCard
              key={collection.id}
              collection={collection}
              index={index}
              isVisible={isInView}
            />
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .bento-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 640px) {
          .bento-grid {
            grid-template-columns: 1fr !important;
            grid-template-rows: auto !important;
          }
          .bento-grid > div {
            grid-column: span 1 !important;
            grid-row: span 1 !important;
          }
          .bento-grid > div > div {
            min-height: 240px !important;
          }
        }
      `}</style>
    </section>
  );
}
