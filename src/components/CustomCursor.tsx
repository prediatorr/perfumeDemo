import { useEffect, useRef } from 'react';

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: 0, y: 0 });
  const target = useRef({ x: 0, y: 0 });
  const isHovering = useRef(false);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    const onMouseMove = (e: MouseEvent) => {
      target.current.x = e.clientX;
      target.current.y = e.clientY;
    };

    const onMouseEnterInteractive = () => {
      isHovering.current = true;
      cursor.classList.add('cursor-expanded');
    };

    const onMouseLeaveInteractive = () => {
      isHovering.current = false;
      cursor.classList.remove('cursor-expanded');
    };

    const addInteractiveListeners = () => {
      const interactives = document.querySelectorAll('a, button, [data-cursor="hover"], input, textarea');
      interactives.forEach((el) => {
        el.addEventListener('mouseenter', onMouseEnterInteractive);
        el.addEventListener('mouseleave', onMouseLeaveInteractive);
      });
      return interactives;
    };

    let interactives = addInteractiveListeners();
    const observer = new MutationObserver(() => {
      interactives.forEach((el) => {
        el.removeEventListener('mouseenter', onMouseEnterInteractive);
        el.removeEventListener('mouseleave', onMouseLeaveInteractive);
      });
      interactives = addInteractiveListeners();
    });
    observer.observe(document.body, { childList: true, subtree: true });

    let rafId: number;
    const update = () => {
      pos.current.x += (target.current.x - pos.current.x) * 0.08;
      pos.current.y += (target.current.y - pos.current.y) * 0.08;
      cursor.style.transform = `translate(${pos.current.x}px, ${pos.current.y}px)`;
      rafId = requestAnimationFrame(update);
    };
    rafId = requestAnimationFrame(update);

    window.addEventListener('mousemove', onMouseMove);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(rafId);
      observer.disconnect();
      interactives.forEach((el) => {
        el.removeEventListener('mouseenter', onMouseEnterInteractive);
        el.removeEventListener('mouseleave', onMouseLeaveInteractive);
      });
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '6px',
        height: '6px',
        marginLeft: '-3px',
        marginTop: '-3px',
        backgroundColor: 'var(--soft-cream)',
        borderRadius: '50%',
        pointerEvents: 'none',
        zIndex: 9999,
        mixBlendMode: 'difference',
        transition: 'width 300ms, height 300ms, margin 300ms, background-color 300ms, border 300ms',
      }}
      className="custom-cursor hidden md:block"
    />
  );
}
