import React, { useEffect, useRef, useState } from 'react';
import {
  motion,
  useInView,
  useMotionValue,
  useSpring,
  useScroll,
  useVelocity,
  useTransform,
  useAnimationFrame,
  animate,
  wrap,
} from 'framer-motion';

/* ------------------------------------------------------------------
   Smooth-scroll provider (Lenis)
------------------------------------------------------------------ */
export function useSmoothScroll() {
  useEffect(() => {
    let lenis;
    let raf;
    let cancelled = false;

    import('lenis').then(({ default: Lenis }) => {
      if (cancelled) return;
      lenis = new Lenis({
        duration: 1.15,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
      });
      window.__lenis = lenis;
      const loop = (time) => {
        lenis.raf(time);
        raf = requestAnimationFrame(loop);
      };
      raf = requestAnimationFrame(loop);
    });

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
      if (lenis) lenis.destroy();
      window.__lenis = undefined;
    };
  }, []);
}

export function scrollToId(id) {
  const el = document.getElementById(id);
  if (!el) return;
  if (window.__lenis) {
    window.__lenis.scrollTo(el, { offset: 0, duration: 1.4 });
  } else {
    el.scrollIntoView({ behavior: 'smooth' });
  }
}

/* ------------------------------------------------------------------
   Custom cursor (desktop only)
------------------------------------------------------------------ */
export function Cursor() {
  const dotX = useMotionValue(-100);
  const dotY = useMotionValue(-100);
  const ringX = useSpring(dotX, { stiffness: 350, damping: 28, mass: 0.4 });
  const ringY = useSpring(dotY, { stiffness: 350, damping: 28, mass: 0.4 });
  const [hover, setHover] = useState(false);

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return;
    const move = (e) => {
      dotX.set(e.clientX);
      dotY.set(e.clientY);
    };
    const over = (e) => {
      const t = e.target;
      setHover(!!(t.closest && t.closest('a, button, [data-hover]')));
    };
    window.addEventListener('mousemove', move);
    window.addEventListener('mouseover', over);
    return () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseover', over);
    };
  }, [dotX, dotY]);

  return (
    <>
      <motion.div
        className="cursor-ring hidden md:block"
        style={{
          x: ringX,
          y: ringY,
          translateX: '-50%',
          translateY: '-50%',
          width: hover ? 60 : 28,
          height: hover ? 60 : 28,
          border: '1px solid rgba(255,255,255,0.9)',
        }}
      />
      <motion.div
        className="cursor-dot hidden md:block"
        style={{
          x: dotX,
          y: dotY,
          translateX: '-50%',
          translateY: '-50%',
          width: 6,
          height: 6,
          background: '#fff',
          opacity: hover ? 0 : 1,
        }}
      />
    </>
  );
}

/* ------------------------------------------------------------------
   Word-by-word reveal for headings
------------------------------------------------------------------ */
export function RevealWords({ text, className = '', delay = 0, as = 'div', style }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-10% 0px' });
  const words = text.split(' ');
  const MotionTag = motion[as] || motion.div;

  return (
    <MotionTag ref={ref} className={className} style={style} aria-label={text}>
      {words.map((w, i) => (
        <span key={i} style={{ display: 'inline-block', overflow: 'hidden', verticalAlign: 'top' }} aria-hidden>
          <motion.span
            style={{ display: 'inline-block' }}
            initial={{ y: '110%' }}
            animate={inView ? { y: 0 } : { y: '110%' }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: delay + i * 0.05 }}
          >
            {w}
          </motion.span>
          {i < words.length - 1 ? '\u00A0' : ''}
        </span>
      ))}
    </MotionTag>
  );
}

/* ------------------------------------------------------------------
   Line-by-line reveal (for multi-line headlines, clip from bottom)
------------------------------------------------------------------ */
export function RevealLines({ lines, className = '', delay = 0, lineClassName = '' }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-10% 0px' });
  return (
    <span ref={ref} className={className}>
      {lines.map((ln, i) => (
        <span key={i} className={`block overflow-hidden ${lineClassName}`}>
          <motion.span
            className="block"
            initial={{ y: '108%' }}
            animate={inView ? { y: 0 } : { y: '108%' }}
            transition={{ duration: 1, ease: [0.76, 0, 0.24, 1], delay: delay + i * 0.1 }}
          >
            {ln}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

/* ------------------------------------------------------------------
   Generic fade/slide reveal on scroll
------------------------------------------------------------------ */
export function Reveal({ children, className = '', delay = 0, y = 28 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-8% 0px' });
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </motion.div>
  );
}

/* ------------------------------------------------------------------
   Animated number counter
------------------------------------------------------------------ */
export function Counter({ value, prefix = '', suffix = '' }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-20% 0px' });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, value, {
      duration: 1.6,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, value]);

  return (
    <span ref={ref}>
      {prefix}
      {display}
      {suffix}
    </span>
  );
}

/* ------------------------------------------------------------------
   Magnetic wrapper
------------------------------------------------------------------ */
export function Magnetic({ children, strength = 0.35, className = '' }) {
  const ref = useRef(null);
  const x = useSpring(0, { stiffness: 200, damping: 15 });
  const y = useSpring(0, { stiffness: 200, damping: 15 });

  const onMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    x.set((e.clientX - (rect.left + rect.width / 2)) * strength);
    y.set((e.clientY - (rect.top + rect.height / 2)) * strength);
  };
  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ x, y, display: 'inline-block' }}
      onMouseMove={onMove}
      onMouseLeave={reset}
    >
      {children}
    </motion.div>
  );
}

/* ------------------------------------------------------------------
   Scroll-velocity marquee
------------------------------------------------------------------ */
export function VelocityMarquee({ children, baseVelocity = 4, className = '' }) {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, { damping: 50, stiffness: 400 });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 4], { clamp: false });
  const x = useTransform(baseX, (v) => `${wrap(-25, -50, v)}%`);
  const directionFactor = useRef(1);

  useAnimationFrame((t, delta) => {
    let moveBy = directionFactor.current * baseVelocity * (delta / 1000);
    if (velocityFactor.get() < 0) directionFactor.current = -1;
    else if (velocityFactor.get() > 0) directionFactor.current = 1;
    moveBy += directionFactor.current * moveBy * velocityFactor.get();
    baseX.set(baseX.get() + moveBy);
  });

  return (
    <div className={`overflow-hidden w-full ${className}`}>
      <motion.div className="flex whitespace-nowrap will-change-transform" style={{ x }}>
        {children}
        {children}
        {children}
        {children}
      </motion.div>
    </div>
  );
}

/* ------------------------------------------------------------------
   Fluid SVG filters — gooey metaball merge (#goo) + melting
   displacement (#melt). Render once near the root.
------------------------------------------------------------------ */
export function FluidDefs() {
  return (
    <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden>
      <defs>
        <filter id="goo">
          <feGaussianBlur in="SourceGraphic" stdDeviation="22" result="blur" />
          <feColorMatrix
            in="blur"
            mode="matrix"
            values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 26 -12"
            result="goo"
          />
          <feBlend in="SourceGraphic" in2="goo" />
        </filter>

        <filter id="melt" x="-20%" y="-20%" width="140%" height="140%">
          <feTurbulence type="fractalNoise" baseFrequency="0.008 0.02" numOctaves="2" seed="7" result="n">
            <animate attributeName="baseFrequency" dur="9s" values="0.008 0.02; 0.02 0.012; 0.008 0.02" repeatCount="indefinite" />
          </feTurbulence>
          <feDisplacementMap in="SourceGraphic" in2="n" scale="26" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </defs>
    </svg>
  );
}

/* ------------------------------------------------------------------
   Mercury flow — gooey green/orange/red metaballs that melt & merge.
   Atmosphere for dark immersive frames. Never stops moving.
------------------------------------------------------------------ */
export function MercuryFlow({ className = '' }) {
  return (
    <div className={`mercury-flow ${className}`} aria-hidden>
      <div className="mercury-goo">
        <span className="mb mb-1" />
        <span className="mb mb-2" />
        <span className="mb mb-3" />
        <span className="mb mb-4" />
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------
   Liquid divider — a melting/dripping edge between two frames.
   `from` is the top surface color, `to` is the wave (next frame).
------------------------------------------------------------------ */
export function LiquidDivider({ from = 'var(--paper)', to = 'var(--dark)' }) {
  return (
    <div className="liquid-divider" style={{ background: from }} aria-hidden>
      <svg viewBox="0 0 1440 90" preserveAspectRatio="none">
        <path fill={to}>
          <animate
            attributeName="d"
            dur="10s"
            repeatCount="indefinite"
            values="
              M0,40 C240,90 480,10 720,45 C960,80 1200,20 1440,45 L1440,90 L0,90 Z;
              M0,50 C240,15 480,85 720,40 C960,5 1200,75 1440,40 L1440,90 L0,90 Z;
              M0,40 C240,90 480,10 720,45 C960,80 1200,20 1440,45 L1440,90 L0,90 Z"
          />
        </path>
      </svg>
    </div>
  );
}

/* ------------------------------------------------------------------
   Flowing image reveal — clip-path wipe + parallax drift on scroll,
   plus a melting distortion on hover.
------------------------------------------------------------------ */
export function FlowImage({ src, alt, className = '', overlay = 'rgba(255,255,255,0.92)', melt = true }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-12% 0px' });
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['-8%', '8%']);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.12, 1, 1.12]);
  const [hovering, setHovering] = useState(false);

  return (
    <div
      ref={ref}
      className={`relative overflow-hidden ${className}`}
      onMouseEnter={() => melt && setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      data-hover
    >
      <motion.div
        initial={{ clipPath: 'inset(0 0 100% 0)' }}
        animate={inView ? { clipPath: 'inset(0 0 0% 0)' } : { clipPath: 'inset(0 0 100% 0)' }}
        transition={{ duration: 1.1, ease: [0.76, 0, 0.24, 1] }}
        className="w-full h-full"
      >
        <motion.img
          src={src}
          alt={alt}
          loading="lazy"
          style={{ y, scale }}
          className={`w-full h-full object-cover melt-target ${hovering ? 'melting' : ''}`}
        />
      </motion.div>
      {overlay && (
        <motion.div
          initial={{ scaleY: 1 }}
          animate={inView ? { scaleY: 0 } : { scaleY: 1 }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1], delay: 0.08 }}
          style={{ background: overlay, transformOrigin: 'bottom' }}
          className="absolute inset-0"
        />
      )}
    </div>
  );
}
