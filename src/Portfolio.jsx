import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight, ArrowDown, Download } from 'lucide-react';
import { PROFILE, MARQUEE, STATS, EXPERIENCE, PROJECTS, EDUCATION, SKILLS } from './data';
import {
  useSmoothScroll,
  scrollToId,
  Cursor,
  RevealWords,
  Reveal,
  Counter,
  Magnetic,
  VelocityMarquee,
  LiquidDefs,
  LiquidLine,
  FlowingBackground,
  FlowImage,
} from './ui';

const NAV = [
  { id: 'about', label: 'About' },
  { id: 'work', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'contact', label: 'Contact' },
];

/* ============================================================ NAV */
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        scrolled ? 'py-3 backdrop-blur-md bg-[#ece8e0]/70 border-b border-[var(--line)]' : 'py-6'
      }`}
    >
      <div className="mx-auto max-w-[1500px] px-6 md:px-10 flex items-center justify-between">
        <button
          onClick={() => scrollToId('top')}
          className="font-display text-xl font-bold tracking-tight"
          data-hover
        >
          MX<span className="text-accent">.</span>
        </button>

        <nav className="hidden md:flex items-center gap-8">
          {NAV.map((n) => (
            <button
              key={n.id}
              onClick={() => scrollToId(n.id)}
              className="font-mono text-[11px] uppercase tracking-[0.18em] link-underline"
              data-hover
            >
              {n.label}
            </button>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <Magnetic>
            <a
              href={PROFILE.resume}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--ink-soft)] hover:text-[var(--accent)] transition-colors duration-300"
              data-hover
            >
              <Download className="w-3.5 h-3.5" /> Résumé
            </a>
          </Magnetic>
          <Magnetic>
            <a
              href={`mailto:${PROFILE.email}`}
              className="inline-flex font-mono text-[11px] uppercase tracking-[0.18em] border border-[var(--ink)] rounded-full px-5 py-2 hover:bg-[var(--ink)] hover:text-[var(--paper)] transition-colors duration-300"
              data-hover
            >
              Let’s talk
            </a>
          </Magnetic>
        </div>

        <a
          href={PROFILE.resume}
          target="_blank"
          rel="noreferrer"
          className="md:hidden inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] border border-[var(--ink)] rounded-full px-4 py-1.5"
        >
          <Download className="w-3.5 h-3.5" /> CV
        </a>
      </div>
    </header>
  );
}

/* ============================================================ HERO */
function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const ease = [0.76, 0, 0.24, 1];

  return (
    <section ref={ref} id="top" className="relative min-h-[100svh] flex flex-col justify-between px-6 md:px-10 pt-28 pb-10 overflow-hidden">
      {/* top meta row */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease, delay: 0.2 }}
        className="mx-auto max-w-[1600px] w-full flex items-start justify-between font-mono text-[10px] md:text-[11px] uppercase tracking-[0.25em] text-[var(--ink-soft)]"
      >
        <div className="flex items-center gap-3">
          <span className="inline-block w-2 h-2 rounded-full bg-accent animate-pulse" />
          {PROFILE.roles.join(' / ')}
        </div>
        <div className="hidden md:block text-right leading-relaxed">
          Based in {PROFILE.location}
          <br />
          UCLA MEng AI ’27 · Purdue CS ’25
        </div>
      </motion.div>

      {/* Liquid name — the centerpiece */}
      <motion.div style={{ y, opacity }} className="mx-auto max-w-[1600px] w-full select-none">
        <motion.div
          initial={{ clipPath: 'inset(0 0 100% 0)' }}
          animate={{ clipPath: 'inset(0 0 0% 0)' }}
          transition={{ duration: 1.2, ease, delay: 0.15 }}
        >
          <LiquidLine text="MINGFAN" variant="fill" className="w-full" />
        </motion.div>
        <motion.div
          initial={{ clipPath: 'inset(0 0 100% 0)' }}
          animate={{ clipPath: 'inset(0 0 0% 0)' }}
          transition={{ duration: 1.2, ease, delay: 0.3 }}
          className="-mt-[2vw] flex items-end gap-[3vw]"
        >
          <div className="flex-1">
            <LiquidLine text="XIE" variant="stroke" />
          </div>
          <span className="font-serif-it text-[var(--ink-soft)] pb-[2vw]" style={{ fontSize: 'clamp(1.4rem, 5vw, 4rem)' }}>
            ({PROFILE.alias})
          </span>
        </motion.div>
      </motion.div>

      {/* bottom row: tagline + CTA */}
      <div className="mx-auto max-w-[1600px] w-full grid md:grid-cols-12 gap-8 items-end">
        <Reveal delay={0.5} className="md:col-span-6 lg:col-span-5">
          <p className="text-lg md:text-2xl leading-relaxed text-[var(--ink-soft)] max-w-xl">
            I build <span className="text-[var(--ink)]">AI systems</span> and{' '}
            <span className="text-[var(--ink)]">full-stack platforms</span> that ship{' '}
            <span className="font-serif-it text-accent">measurable impact</span>.
          </p>
        </Reveal>

        <div className="md:col-span-6 lg:col-span-7 flex md:justify-end items-center gap-4">
          <Magnetic>
            <a
              href={PROFILE.resume}
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] border border-[var(--ink)] rounded-full px-6 py-3 hover:bg-[var(--ink)] hover:text-[var(--paper)] transition-colors duration-300"
              data-hover
            >
              <Download className="w-3.5 h-3.5 group-hover:translate-y-0.5 transition-transform" /> Résumé
            </a>
          </Magnetic>
          <button
            onClick={() => scrollToId('about')}
            className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.25em] text-[var(--ink-soft)] hover:text-[var(--ink)] transition-colors"
            data-hover
          >
            Scroll <ArrowDown className="w-4 h-4 animate-bounce" />
          </button>
        </div>
      </div>
    </section>
  );
}

/* ============================================================ ABOUT + STATS */
function About() {
  return (
    <section id="about" className="relative py-24 md:py-40 px-6 md:px-10">
      <div className="mx-auto max-w-[1500px]">
        <Reveal>
          <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-[var(--ink-soft)]">
            (01) — Profile
          </span>
        </Reveal>

        <div className="mt-10 max-w-5xl">
          <RevealWords
            text="I work at the seam between AI and systems — turning models and messy data into products that are fast, observable and genuinely useful."
            className="font-display font-medium leading-[1.05]"
            style={{ fontSize: 'clamp(1.6rem, 4.2vw, 3.4rem)' }}
            as="h2"
          />
        </div>

        <div className="mt-10 grid md:grid-cols-2 gap-8 max-w-4xl text-[var(--ink-soft)] text-lg leading-relaxed">
          <Reveal delay={0.1}>
            <p>
              Across robotics and large-scale recommendation, I’ve owned the full path: operator tooling,
              data and labeling pipelines, model training, and production serving with real observability.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <p>
              Now studying AI at UCLA after finishing CS at Purdue, I care about engineering that holds up
              under load — and about <span className="font-serif-it text-accent">making the impact legible</span>.
            </p>
          </Reveal>
        </div>

        {/* Impact stats */}
        <div className="mt-20 md:mt-28 grid grid-cols-2 lg:grid-cols-4 gap-px bg-[var(--line)] border border-[var(--line)]">
          {STATS.map((s, i) => (
            <Reveal key={i} delay={i * 0.08} className="bg-[var(--paper)] p-6 md:p-8">
              <div className="font-display font-bold text-[var(--ink)]" style={{ fontSize: 'clamp(2.8rem, 7vw, 5.5rem)' }}>
                <Counter value={s.value} prefix={s.prefix || ''} suffix={s.suffix || ''} />
              </div>
              <p className="mt-3 text-sm text-[var(--ink-soft)] leading-snug">{s.label}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================ MARQUEE BAND */
function Band() {
  return (
    <section className="py-8 md:py-14 border-y border-[var(--line)] overflow-hidden bg-[var(--paper-deep)]">
      <VelocityMarquee baseVelocity={3}>
        <span className="font-display font-bold uppercase tracking-tight flex items-center" style={{ fontSize: 'clamp(2.5rem, 8vw, 7rem)' }}>
          {MARQUEE.map((m, i) => (
            <span key={i} className="flex items-center">
              <span className="px-8">{m}</span>
              <span className="text-accent">✦</span>
            </span>
          ))}
        </span>
      </VelocityMarquee>
    </section>
  );
}

/* ============================================================ EXPERIENCE */
function Experience() {
  return (
    <section id="work" className="py-24 md:py-40 px-6 md:px-10">
      <div className="mx-auto max-w-[1500px]">
        <Reveal className="flex items-end justify-between border-b border-[var(--line)] pb-6 mb-4">
          <h2 className="font-display font-bold" style={{ fontSize: 'clamp(2.5rem, 7vw, 6rem)' }}>
            Experience
          </h2>
          <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-[var(--ink-soft)] mb-2">
            (02)
          </span>
        </Reveal>

        {EXPERIENCE.map((exp) => (
          <ExperienceRow key={exp.id} exp={exp} />
        ))}
      </div>
    </section>
  );
}

function ExperienceRow({ exp }) {
  const [open, setOpen] = useState(false);
  return (
    <Reveal className="border-b border-[var(--line)]">
      <button
        onClick={() => setOpen((o) => !o)}
        className="group w-full text-left py-8 md:py-12 grid md:grid-cols-12 gap-4 md:gap-8 items-start"
        data-hover
      >
        <div className="md:col-span-1 font-mono text-sm text-accent">{exp.id}</div>
        <div className="md:col-span-6">
          <h3
            className="font-display font-semibold leading-tight transition-transform duration-500 group-hover:translate-x-2"
            style={{ fontSize: 'clamp(1.8rem, 4vw, 3.2rem)' }}
          >
            {exp.company}
          </h3>
          <div className="mt-2 text-[var(--ink-soft)]">{exp.role}</div>
        </div>
        <div className="md:col-span-4 font-mono text-xs uppercase tracking-[0.15em] text-[var(--ink-soft)] md:pt-3">
          {exp.period}
        </div>
        <div className="md:col-span-1 flex md:justify-end md:pt-2">
          <ArrowUpRight
            className={`w-6 h-6 transition-transform duration-500 ${open ? 'rotate-90' : 'group-hover:rotate-45'}`}
          />
        </div>
      </button>

      <motion.div
        initial={false}
        animate={{ height: open ? 'auto' : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="overflow-hidden"
      >
        <div className="md:grid md:grid-cols-12 gap-8 pb-10 md:pb-14">
          <div className="md:col-start-2 md:col-span-6 text-[var(--ink-soft)] leading-relaxed mb-6 md:mb-0">
            {exp.summary}
          </div>
          <ul className="md:col-span-4 space-y-4">
            {exp.bullets.map((b, i) => (
              <li key={i} className="flex gap-3 text-sm leading-relaxed text-[var(--ink-soft)]">
                <span className="text-accent mt-1">—</span>
                <span>{b}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="md:col-start-2 flex flex-wrap gap-2 pb-12">
          {exp.tags.map((t) => (
            <span
              key={t}
              className="font-mono text-[10px] uppercase tracking-wider border border-[var(--line)] rounded-full px-3 py-1 text-[var(--ink-soft)]"
            >
              {t}
            </span>
          ))}
        </div>
      </motion.div>
    </Reveal>
  );
}

/* ============================================================ PROJECTS (horizontal scroll) */
function Projects() {
  const [isDesktop, setIsDesktop] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)');
    const update = () => setIsDesktop(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  return isDesktop ? <ProjectsHorizontal /> : <ProjectsStacked />;
}

function ProjectsHorizontal() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref });
  const panels = PROJECTS.length + 1; // intro + projects
  const x = useTransform(scrollYProgress, [0, 1], ['0vw', `-${(panels - 1) * 100}vw`]);

  return (
    <section id="projects" ref={ref} style={{ height: `${panels * 100}vh` }} className="relative">
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        <motion.div style={{ x }} className="flex h-full" >
          {/* intro panel */}
          <div className="w-screen h-full shrink-0 flex flex-col justify-center px-10 lg:px-20">
            <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-[var(--ink-soft)]">(03) — Selected Work</span>
            <h2 className="font-display font-bold mt-6" style={{ fontSize: 'clamp(3rem, 9vw, 9rem)' }}>
              Selected<br />
              <span className="text-stroke">Projects</span>
            </h2>
            <p className="mt-8 max-w-md text-[var(--ink-soft)] text-lg flex items-center gap-3">
              <ArrowUpRight className="w-5 h-5 rotate-45" /> Scroll to slide through the work
            </p>
          </div>

          {PROJECTS.map((p, i) => (
            <ProjectPanel key={p.id} project={p} index={i} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function ProjectPanel({ project, index }) {
  return (
    <div className="w-screen h-full shrink-0 flex items-center px-10 lg:px-20 border-l border-[var(--line)]">
      <div className="grid lg:grid-cols-12 gap-10 w-full max-w-[1300px] mx-auto items-center">
        <div className="lg:col-span-5 flex flex-col justify-center">
          <span className="font-mono text-xs text-[var(--ink-soft)]">
            0{index + 1} / 0{PROJECTS.length} · {project.year}
          </span>
          <h3 className="font-display font-bold mt-4" style={{ fontSize: 'clamp(2.6rem, 6vw, 5.5rem)', color: project.accent }}>
            {project.title}
          </h3>
          <p className="font-serif-it text-2xl mt-2 text-[var(--ink-soft)]">{project.subtitle}</p>
          <p className="mt-6 text-[var(--ink-soft)] leading-relaxed max-w-md">{project.blurb}</p>
          <div className="mt-6 flex flex-wrap gap-2">
            {project.stack.map((s) => (
              <span key={s} className="font-mono text-[10px] uppercase tracking-wider border border-[var(--line)] rounded-full px-3 py-1">
                {s}
              </span>
            ))}
          </div>
        </div>
        <div className="lg:col-span-7 flex flex-col justify-center">
          <div className="relative mb-8">
            <FlowImage
              src={project.image}
              alt={`${project.title} — ${project.subtitle}`}
              accent={project.accent}
              className="rounded-sm border border-[var(--line)] aspect-[3/2]"
            />
            <span
              className="absolute top-3 left-3 z-10 font-mono text-[10px] uppercase tracking-wider px-2 py-1 rounded-full text-[var(--paper)]"
              style={{ background: project.accent }}
            >
              {project.subtitle}
            </span>
          </div>
          <ul className="space-y-5">
            {project.points.map((pt, i) => (
              <li key={i} className="flex gap-4 border-t border-[var(--line)] pt-4">
                <span className="font-mono text-sm" style={{ color: project.accent }}>
                  0{i + 1}
                </span>
                <span className="text-[var(--ink-soft)] leading-relaxed text-sm">{pt}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

function ProjectsStacked() {
  return (
    <section id="projects" className="py-24 px-6">
      <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-[var(--ink-soft)]">(03) — Selected Work</span>
      <h2 className="font-display font-bold mt-4 mb-10" style={{ fontSize: 'clamp(2.8rem, 12vw, 5rem)' }}>
        Selected Projects
      </h2>
      <div className="space-y-16">
        {PROJECTS.map((p, i) => (
          <Reveal key={p.id} className="border-t border-[var(--line)] pt-8">
            <span className="font-mono text-xs text-[var(--ink-soft)]">0{i + 1} · {p.year}</span>
            <h3 className="font-display font-bold mt-2" style={{ fontSize: 'clamp(2.2rem, 10vw, 3.5rem)', color: p.accent }}>
              {p.title}
            </h3>
            <p className="font-serif-it text-xl text-[var(--ink-soft)]">{p.subtitle}</p>
            <FlowImage
              src={p.image}
              alt={`${p.title} — ${p.subtitle}`}
              accent={p.accent}
              className="rounded-sm border border-[var(--line)] aspect-[3/2] mt-5"
            />
            <p className="mt-4 text-[var(--ink-soft)] leading-relaxed">{p.blurb}</p>
            <ul className="mt-5 space-y-4">
              {p.points.map((pt, j) => (
                <li key={j} className="flex gap-3 text-sm leading-relaxed text-[var(--ink-soft)]">
                  <span className="font-mono" style={{ color: p.accent }}>0{j + 1}</span>
                  <span>{pt}</span>
                </li>
              ))}
            </ul>
            <div className="mt-5 flex flex-wrap gap-2">
              {p.stack.map((s) => (
                <span key={s} className="font-mono text-[10px] uppercase tracking-wider border border-[var(--line)] rounded-full px-3 py-1">
                  {s}
                </span>
              ))}
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ============================================================ SKILLS + EDUCATION */
function Skills() {
  return (
    <section id="skills" className="py-24 md:py-40 px-6 md:px-10">
      <div className="mx-auto max-w-[1500px] grid lg:grid-cols-12 gap-12">
        <div className="lg:col-span-5">
          <Reveal>
            <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-[var(--ink-soft)]">(04) — Capabilities</span>
            <h2 className="font-display font-bold mt-6" style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)' }}>
              The toolkit<br />behind the work.
            </h2>
          </Reveal>

          <div className="mt-12 space-y-8">
            {EDUCATION.map((e) => (
              <Reveal key={e.short} className="border-t border-[var(--line)] pt-5">
                <div className="flex items-baseline justify-between gap-4">
                  <h3 className="font-display font-semibold text-xl">{e.short}</h3>
                  <span className="font-mono text-xs text-[var(--ink-soft)]">{e.period}</span>
                </div>
                <div className="text-[var(--ink-soft)] mt-1">{e.degree}</div>
                <div className="font-mono text-[11px] uppercase tracking-wider text-[var(--ink-faint)] mt-1">{e.place}</div>
                <p className="text-sm text-[var(--ink-soft)] mt-2 leading-relaxed">{e.note}</p>
              </Reveal>
            ))}
          </div>
        </div>

        <div className="lg:col-span-7">
          {SKILLS.map((group, i) => (
            <Reveal key={group.label} delay={i * 0.05} className="border-t border-[var(--line)] py-6 grid md:grid-cols-12 gap-4">
              <div className="md:col-span-4 font-mono text-xs uppercase tracking-[0.15em] text-[var(--ink-soft)] pt-1">
                {group.label}
              </div>
              <div className="md:col-span-8 flex flex-wrap gap-2">
                {group.items.map((it) => (
                  <span
                    key={it}
                    className="text-sm border border-[var(--line)] rounded-full px-4 py-1.5 hover:bg-[var(--ink)] hover:text-[var(--paper)] transition-colors duration-300"
                    data-hover
                  >
                    {it}
                  </span>
                ))}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================ CONTACT / FOOTER */
function Contact() {
  return (
    <section id="contact" className="relative bg-[var(--ink)] text-[var(--paper)] px-6 md:px-10 py-24 md:py-40">
      <div className="mx-auto max-w-[1500px]">
        <span className="font-mono text-[11px] uppercase tracking-[0.25em] opacity-60">(05) — Contact</span>

        <RevealWords
          text="Let’s build something."
          className="font-display font-bold mt-8 leading-[0.92]"
          style={{ fontSize: 'clamp(3rem, 13vw, 13rem)' }}
          as="h2"
        />

        <div className="mt-12">
          <Magnetic strength={0.25}>
            <a
              href={`mailto:${PROFILE.email}`}
              className="inline-block font-display font-medium link-underline"
              style={{ fontSize: 'clamp(1.8rem, 6vw, 4.5rem)' }}
              data-hover
            >
              {PROFILE.email}
            </a>
          </Magnetic>
        </div>

        <div className="mt-20 grid md:grid-cols-3 gap-10 border-t border-white/15 pt-10">
          <div>
            <div className="font-mono text-[11px] uppercase tracking-[0.18em] opacity-50 mb-3">Elsewhere</div>
            <div className="flex flex-col gap-2">
              <a href={PROFILE.linkedin} target="_blank" rel="noreferrer" className="link-underline w-fit" data-hover>
                LinkedIn ↗
              </a>
              <a href={PROFILE.github} target="_blank" rel="noreferrer" className="link-underline w-fit" data-hover>
                GitHub ↗
              </a>
              <a href={PROFILE.resume} target="_blank" rel="noreferrer" className="link-underline w-fit" data-hover>
                Résumé (PDF) ↗
              </a>
            </div>
          </div>
          <div>
            <div className="font-mono text-[11px] uppercase tracking-[0.18em] opacity-50 mb-3">Direct</div>
            <div className="opacity-90">{PROFILE.phone}</div>
            <div className="opacity-90">{PROFILE.location}</div>
          </div>
          <div className="md:text-right">
            <div className="font-mono text-[11px] uppercase tracking-[0.18em] opacity-50 mb-3">Status</div>
            <div style={{ color: '#e8916f' }}>Open to SWE / AI roles</div>
            <button
              onClick={() => scrollToId('top')}
              className="mt-6 font-mono text-[11px] uppercase tracking-[0.18em] border border-white/30 rounded-full px-5 py-2 hover:bg-[var(--paper)] hover:text-[var(--ink)] transition-colors"
              data-hover
            >
              Back to top ↑
            </button>
          </div>
        </div>

        <div className="mt-16 font-mono text-[10px] uppercase tracking-[0.2em] opacity-40">
          © {new Date().getFullYear()} Mingfan (Issac) Xie — Designed & built from scratch.
        </div>
      </div>
    </section>
  );
}

/* ============================================================ ROOT */
export default function Portfolio() {
  useSmoothScroll();
  return (
    <div className="relative bg-[var(--paper)] text-[var(--ink)]">
      <FlowingBackground />
      <LiquidDefs />
      <div className="grain" />
      <Cursor />
      <Nav />
      <main className="relative z-10">
        <Hero />
        <About />
        <Band />
        <Experience />
        <Projects />
        <Skills />
        <Contact />
      </main>
    </div>
  );
}
