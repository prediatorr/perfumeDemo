import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const scenes = [
  {
    id: 1,
    numeral: "01",
    text: "Selected by hand.",
    caption: "The beginning of a signature.",
    image: "/images/ritual-1.jpg",
  },
  {
    id: 2,
    numeral: "02",
    text: "Oils drawn slowly from living matter.",
    caption: "The essence of nature, captured.",
    image: "/images/ritual-2.jpg",
  },
  {
    id: 3,
    numeral: "03",
    text: "An accord composed like music.",
    caption: "Notes that harmonize.",
    image: "/images/ritual-3.jpg",
  },
  {
    id: 4,
    numeral: "04",
    text: "Vessels as precious as what they hold.",
    caption: "Crafted to perfection.",
    image: "/images/ritual-4.jpg",
  },
  {
    id: 5,
    numeral: "05",
    text: "A space transformed. A memory created.",
    caption: "The invisible signature.",
    image: "/images/ritual-5.jpg",
  },
];

export function FragranceRitual() {
  const sectionRef = useRef<HTMLElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const dotsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const getPanelWidth = () =>
      section.clientWidth || window.innerWidth;

    const getScrollDistance = () =>
      Math.max(0, (scenes.length - 1) * getPanelWidth());

    const syncPanelWidths = () => {
      const w = getPanelWidth();
      section.style.setProperty("--ritual-panel-width", `${w}px`);
      track.querySelectorAll<HTMLElement>(".scene-panel").forEach((panel) => {
        panel.style.width = `${w}px`;
        panel.style.minWidth = `${w}px`;
        panel.style.flexShrink = "0";
      });
    };

    syncPanelWidths();

    const updateDots = (progress: number) => {
      if (!dotsRef.current) return;
      const dots = dotsRef.current.querySelectorAll(".ritual-dot");
      const scaled = progress * scenes.length;
      dots.forEach((dot, i) => {
        const isActive =
          Math.floor(scaled) === i ||
          (scaled >= scenes.length - 0.5 && i === scenes.length - 1);
        (dot as HTMLElement).style.background = isActive
          ? "var(--amber-gold)"
          : "rgba(255,255,255,0.2)";
        (dot as HTMLElement).style.width = isActive ? "8px" : "6px";
        (dot as HTMLElement).style.height = isActive ? "8px" : "6px";
      });
    };

    const ctx = gsap.context(() => {
      const scrollTween = gsap.to(track, {
        x: () => -getScrollDistance(),
        ease: "none",
        scrollTrigger: {
          trigger: section,
          pin: true,
          pinType: "transform",
          scrub: 1.5,
          start: "top top",
          end: () => `+=${getScrollDistance()}`,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => updateDots(self.progress),
        },
      });

      const scenePanels = track.querySelectorAll(".scene-panel");
      scenePanels.forEach((panel) => {
        const text = panel.querySelector(".scene-text");
        if (text) {
          gsap.fromTo(
            text,
            { opacity: 0, y: 20 },
            {
              opacity: 1,
              y: 0,
              ease: "power2.out",
              scrollTrigger: {
                trigger: panel,
                containerAnimation: scrollTween,
                start: "left 80%",
                end: "left 20%",
                scrub: 1,
              },
            }
          );
        }
      });
    }, section);

    const refreshScroll = () => {
      syncPanelWidths();
      ScrollTrigger.refresh();
    };

    const resizeObserver = new ResizeObserver(refreshScroll);
    resizeObserver.observe(section);

    window.addEventListener("resize", refreshScroll);
    window.addEventListener("orientationchange", refreshScroll);

    track.querySelectorAll("img").forEach((img) => {
      if (img.complete) return;
      img.addEventListener("load", refreshScroll, { once: true });
    });

    requestAnimationFrame(refreshScroll);

    return () => {
      window.removeEventListener("resize", refreshScroll);
      window.removeEventListener("orientationchange", refreshScroll);
      resizeObserver.disconnect();
      ctx.revert();
    };
  }, []);

  return (
    <section
      id="fragrance-ritual"
      ref={sectionRef}
      style={{
        height: "100vh",
        position: "relative",
        backgroundColor: "var(--midnight)",
      }}
    >
      {/* Sticky container */}
      <div
        ref={stickyRef}
        style={{
          position: "sticky",
          top: 0,
          height: "100vh",
          overflow: "hidden",
          backgroundColor: "var(--midnight)",
        }}
      >
        {/* Section label */}
        <div
          style={{
            position: "absolute",
            top: "40px",
            left: "clamp(24px, 4vw, 80px)",
            zIndex: 10,
          }}
        >
          <span
            style={{
              fontFamily: "Inter",
              fontSize: "9px",
              fontWeight: 400,
              textTransform: "uppercase",
              letterSpacing: "0.18em",
              color: "rgba(245,235,220,0.3)",
            }}
          >
            THE FRAGRANCE RITUAL
          </span>
          <p
            style={{
              fontFamily: '"Cormorant Garamond", serif',
              fontSize: "10px",
              fontWeight: 300,
              fontStyle: "italic",
              color: "rgba(245,235,220,0.25)",
              margin: "4px 0 0",
            }}
          >
            A journey of patience, precision, and passion.
          </p>
        </div>

        {/* Horizontal track */}
        <div
          ref={trackRef}
          style={{
            display: "flex",
            width: "fit-content",
            height: "100%",
          }}
        >
          {scenes.map((scene) => (
            <div
              key={scene.id}
              className="scene-panel"
              style={{
                width: "var(--ritual-panel-width, 100vw)",
                minWidth: "var(--ritual-panel-width, 100vw)",
                height: "100vh",
                position: "relative",
                flexShrink: 0,
              }}
            >
              {/* Background image */}
              <img
                src={scene.image}
                alt={scene.text}
                style={{
                  position: "absolute",
                  inset: 0,
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  filter: "brightness(0.75)",
                }}
              />

              {/* Gradient overlay */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "linear-gradient(to right, rgba(7,7,7,0.4) 0%, transparent 30%, transparent 70%, rgba(7,7,7,0.4) 100%)",
                  zIndex: 1,
                }}
              />

              {/* Background numeral */}
              <div
                className="hidden md:block"
                style={{
                  position: "absolute",
                  right: "-40px",
                  top: "10%",
                  fontFamily: '"Cormorant Garamond", serif',
                  fontSize: "240px",
                  fontWeight: 200,
                  color: "rgba(245,235,220,0.04)",
                  lineHeight: 1,
                  zIndex: 2,
                  pointerEvents: "none",
                  userSelect: "none",
                }}
              >
                {scene.numeral}
              </div>

              {/* Text overlay */}
              <div
                className="scene-text"
                style={{
                  position: "absolute",
                  inset: 0,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  zIndex: 3,
                }}
              >
                <h3
                  style={{
                    fontFamily: '"Cormorant Garamond", serif',
                    fontSize: "clamp(24px, 3vw, 36px)",
                    fontWeight: 300,
                    fontStyle: "italic",
                    color: "var(--soft-cream)",
                    margin: 0,
                    textAlign: "center",
                    padding: "0 24px",
                    textShadow: "0 2px 20px rgba(0,0,0,0.5)",
                  }}
                >
                  {scene.text}
                </h3>
              </div>

              {/* Caption */}
              <div
                style={{
                  position: "absolute",
                  bottom: "60px",
                  left: "clamp(24px, 4vw, 80px)",
                  zIndex: 3,
                }}
              >
                <span
                  style={{
                    fontFamily: "Inter",
                    fontSize: "10px",
                    fontWeight: 400,
                    textTransform: "uppercase",
                    letterSpacing: "0.16em",
                    color: "rgba(245,235,220,0.4)",
                    textShadow: "0 1px 10px rgba(0,0,0,0.5)",
                  }}
                >
                  {scene.caption}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Step indicators */}
        <div
          ref={dotsRef}
          style={{
            position: "absolute",
            bottom: "40px",
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 10,
            display: "flex",
            gap: "12px",
          }}
        >
          {scenes.map((_, i) => (
            <div
              key={i}
              className="ritual-dot"
              style={{
                width: i === 0 ? "8px" : "6px",
                height: i === 0 ? "8px" : "6px",
                borderRadius: "50%",
                background:
                  i === 0 ? "var(--amber-gold)" : "rgba(255,255,255,0.2)",
                transition: "all 300ms ease",
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
