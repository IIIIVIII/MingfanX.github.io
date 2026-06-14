import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
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
          width: hover ? 64 : 30,
          height: hover ? 64 : 30,
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
        <span key={i} className="reveal-mask" aria-hidden>
          <motion.span
            style={{ display: 'inline-block' }}
            initial={{ y: '110%' }}
            animate={inView ? { y: 0 } : { y: '110%' }}
            transition={{
              duration: 0.9,
              ease: [0.22, 1, 0.36, 1],
              delay: delay + i * 0.06,
            }}
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
   Marquee strip
------------------------------------------------------------------ */
export function Marquee({ items, duration = 32, reverse = false, separator = '✦' }) {
  const content = (
    <>
      {items.map((it, i) => (
        <span key={i} className="inline-flex items-center">
          <span className="px-6">{it}</span>
          <span className="text-accent">{separator}</span>
        </span>
      ))}
    </>
  );
  return (
    <div className="overflow-hidden w-full">
      <div
        className={`marquee-track ${reverse ? 'reverse' : ''}`}
        style={{ '--marquee-duration': `${duration}s` }}
      >
        {content}
        {content}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------
   Scroll-velocity marquee — flows on its own, speeds up and reverses
   direction based on how fast you scroll (the monopo / awwwards move)
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
   Shared liquid SVG filter — continuously flows (SMIL) and intensifies
   with pointer speed. Applied to the hero name for a liquid feel.
------------------------------------------------------------------ */
export function LiquidDefs() {
  const dispRef = useRef(null);
  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return;
    let raf;
    let cur = 6;
    let target = 6;
    let lastX = 0;
    let lastY = 0;
    let lastT = performance.now();
    const onMove = (e) => {
      const now = performance.now();
      const dt = Math.max(now - lastT, 8);
      const speed = Math.hypot(e.clientX - lastX, e.clientY - lastY) / dt;
      target = Math.min(6 + speed * 22, 34);
      lastX = e.clientX;
      lastY = e.clientY;
      lastT = now;
    };
    const loop = () => {
      cur += (target - cur) * 0.08;
      target += (6 - target) * 0.05;
      if (dispRef.current) dispRef.current.setAttribute('scale', cur.toFixed(2));
      raf = requestAnimationFrame(loop);
    };
    window.addEventListener('pointermove', onMove);
    raf = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener('pointermove', onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden>
      <defs>
        <filter id="liquid" x="-30%" y="-30%" width="160%" height="160%">
          <feTurbulence type="fractalNoise" baseFrequency="0.009 0.014" numOctaves="2" seed="4" result="noise">
            <animate
              attributeName="baseFrequency"
              dur="20s"
              values="0.009 0.014; 0.018 0.009; 0.011 0.017; 0.009 0.014"
              repeatCount="indefinite"
            />
          </feTurbulence>
          <feDisplacementMap ref={dispRef} in="SourceGraphic" in2="noise" scale="6" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </defs>
    </svg>
  );
}

/* ------------------------------------------------------------------
   Liquid SVG headline — text that ripples like liquid. Auto-fits to
   container width via measured viewBox.
------------------------------------------------------------------ */
export function LiquidLine({ text, variant = 'fill', className = '' }) {
  const textRef = useRef(null);
  const [box, setBox] = useState(null);

  useLayoutEffect(() => {
    const measure = () => {
      if (!textRef.current) return;
      const b = textRef.current.getBBox();
      if (b.width > 0) setBox({ x: b.x, y: b.y, w: b.width, h: b.height });
    };
    measure();
    const id = setTimeout(measure, 400); // refit after webfont loads
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(measure);
    }
    window.addEventListener('resize', measure);
    return () => {
      clearTimeout(id);
      window.removeEventListener('resize', measure);
    };
  }, [text]);

  const pad = box ? box.h * 0.18 : 0;
  const viewBox = box ? `${box.x - pad} ${box.y - pad} ${box.w + pad * 2} ${box.h + pad * 2}` : '0 0 100 30';

  return (
    <svg
      className={className}
      width="100%"
      viewBox={viewBox}
      preserveAspectRatio="xMinYMid meet"
      style={{ display: 'block', overflow: 'visible' }}
      aria-label={text}
    >
      <text
        ref={textRef}
        x="0"
        y="0"
        dominantBaseline="text-before-edge"
        fontFamily="'Space Grotesk', sans-serif"
        fontWeight="700"
        fontSize="220"
        letterSpacing="-6"
        filter="url(#liquid)"
        fill={variant === 'stroke' ? 'transparent' : '#111110'}
        stroke={variant === 'stroke' ? '#111110' : 'none'}
        strokeWidth={variant === 'stroke' ? 2.5 : 0}
      >
        {text}
      </text>
    </svg>
  );
}

/* ------------------------------------------------------------------
   Flowing gradient background — drifting warm metaballs over paper,
   nudged by the cursor. Never stops moving.
------------------------------------------------------------------ */
export function FlowingBackground() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let raf;
    let w = 0;
    let h = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const mouse = { x: 0.5, y: 0.4, tx: 0.5, ty: 0.4 };

    const resize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = w + 'px';
      canvas.style.height = h + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    const blobs = [
      { c: [200, 71, 43], r: 0.42, ax: 0.16, ay: 0.10, sx: 0.00021, sy: 0.00017, px: 0.30, py: 0.40 },
      { c: [154, 91, 45], r: 0.40, ax: 0.14, ay: 0.13, sx: 0.00015, sy: 0.00024, px: 0.72, py: 0.30 },
      { c: [212, 178, 132], r: 0.46, ax: 0.18, ay: 0.12, sx: 0.00019, sy: 0.00013, px: 0.55, py: 0.72 },
      { c: [120, 110, 150], r: 0.34, ax: 0.12, ay: 0.16, sx: 0.00012, sy: 0.00020, px: 0.20, py: 0.78 },
    ];

    const onMove = (e) => {
      mouse.tx = e.clientX / window.innerWidth;
      mouse.ty = e.clientY / window.innerHeight;
    };

    const draw = (t) => {
      mouse.x += (mouse.tx - mouse.x) * 0.05;
      mouse.y += (mouse.ty - mouse.y) * 0.05;
      ctx.clearRect(0, 0, w, h);
      ctx.globalCompositeOperation = 'source-over';
      blobs.forEach((b, i) => {
        const mInfX = (mouse.x - 0.5) * (i % 2 ? -1 : 1) * 0.12;
        const mInfY = (mouse.y - 0.5) * (i % 2 ? 1 : -1) * 0.12;
        const cx = (b.px + Math.sin(t * b.sx + i) * b.ax + mInfX) * w;
        const cy = (b.py + Math.cos(t * b.sy + i) * b.ay + mInfY) * h;
        const rad = b.r * Math.max(w, h);
        const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, rad);
        const [r, gr, bl] = b.c;
        g.addColorStop(0, `rgba(${r},${gr},${bl},0.42)`);
        g.addColorStop(1, `rgba(${r},${gr},${bl},0)`);
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(cx, cy, rad, 0, Math.PI * 2);
        ctx.fill();
      });
      raf = requestAnimationFrame(draw);
    };

    window.addEventListener('resize', resize);
    window.addEventListener('pointermove', onMove);
    raf = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', onMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
        filter: 'blur(70px) saturate(1.1)',
        opacity: 0.55,
      }}
    />
  );
}

/* ------------------------------------------------------------------
   Flowing image reveal — clip-path wipe in + parallax drift on scroll
------------------------------------------------------------------ */
export function FlowImage({ src, alt, className = '', accent }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-12% 0px' });
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['-8%', '8%']);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.12, 1, 1.12]);

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
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
          className="w-full h-full object-cover"
        />
      </motion.div>
      {accent && (
        <motion.div
          initial={{ scaleY: 1 }}
          animate={inView ? { scaleY: 0 } : { scaleY: 1 }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1], delay: 0.1 }}
          style={{ background: accent, transformOrigin: 'bottom' }}
          className="absolute inset-0"
        />
      )}
    </div>
  );
}
