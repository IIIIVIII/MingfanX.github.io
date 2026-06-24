import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight, ArrowDown } from 'lucide-react';
import { PROFILE, MARQUEE, STATS, EXPERIENCE, PROJECTS, EDUCATION, SKILLS } from './data';
import {
  useSmoothScroll,
  scrollToId,
  Cursor,
  RevealWords,
  RevealLines,
  Reveal,
  Counter,
  Magnetic,
  VelocityMarquee,
  MercuryFlow,
  FlowImage,
  FluidDefs,
  LiquidDivider,
} from './ui';

const NAV = [
  { id: 'about', label: 'About' },
  { id: 'work', label: 'Experience' },
  { id: 'projects', label: 'Work' },
  { id: 'skills', label: 'Skills' },
  { id: 'contact', label: 'Contact' },
];

const ease = [0.76, 0, 0.24, 1];

/* ============================================================ NAV (ghost, blends over any surface) */
function Nav() {
  return (
    <header
      className="fixed top-0 left-0 w-full z-50 mix-blend-difference text-white"
      style={{ paddingTop: 22, paddingBottom: 22 }}
    >
      <div className="mx-auto max-w-[1440px] px-6 md:px-10 flex items-center justify-between">
        <button onClick={() => scrollToId('top')} className="font-display text-lg tracking-tight" data-hover>
          Mingfan Xie
        </button>

        <nav className="hidden md:flex items-center gap-9">
          {NAV.map((n) => (
            <button key={n.id} onClick={() => scrollToId(n.id)} className="label link-underline" data-hover>
              {n.label}
            </button>
          ))}
        </nav>

        <a
          href={PROFILE.resume}
          target="_blank"
          rel="noreferrer"
          className="label border border-white/60 rounded-full px-5 py-2 hover:bg-white hover:text-black transition-colors duration-300"
          data-hover
        >
          Résumé
        </a>
      </div>
    </header>
  );
}

/* ============================================================ HERO — dark immersive frame */
function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const opacity = useTransform(scrollYProgress, [0, 0.85], [1, 0]);

  return (
    <section
      ref={ref}
      id="top"
      className="relative min-h-[100svh] flex flex-col justify-end overflow-hidden bg-[var(--dark)] text-[var(--on-dark)]"
    >
      <MercuryFlow />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(130% 100% at 50% 22%, transparent 0%, rgba(11,11,11,0.30) 50%, rgba(11,11,11,0.78) 100%), linear-gradient(to top, rgba(11,11,11,0.92) 0%, rgba(11,11,11,0.30) 48%, rgba(11,11,11,0.10) 100%)',
        }}
      />
      <div className="absolute inset-0 grain" style={{ position: 'absolute', mixBlendMode: 'overlay', opacity: 0.05 }} />

      <motion.div style={{ y, opacity }} className="relative z-10 mx-auto max-w-[1440px] w-full px-6 md:px-10 pb-16 md:pb-24 pt-32">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease, delay: 0.2 }}
          className="label text-[var(--on-dark-soft)] flex items-center gap-3 mb-8"
        >
          <span className="inline-block w-8 h-px mercury-line" />
          {PROFILE.roles.join('  /  ')} — Portfolio ’26
        </motion.div>

        <h1 className="font-display font-light leading-[0.92]" style={{ fontSize: 'clamp(3.2rem, 11vw, 11rem)' }}>
          <RevealLines lines={['Mingfan Xie']} delay={0.15} />
        </h1>

        <div className="mt-8 md:mt-12 grid md:grid-cols-12 gap-8 items-end">
          <Reveal delay={0.5} className="md:col-span-8 lg:col-span-7">
            <p className="font-display font-light leading-[1.18] text-[var(--on-dark)]" style={{ fontSize: 'clamp(1.4rem, 3.2vw, 2.6rem)' }}>
              I build <span className="mercury-text">AI systems</span> &amp; full-stack platforms
              that ship <span className="mercury-text">measurable impact</span> — from edge
              perception and MLOps to LLM agents.
            </p>
          </Reveal>

          <Reveal delay={0.65} className="md:col-span-4 lg:col-start-9 lg:col-span-4 md:justify-self-end">
            <div className="label text-[var(--on-dark-soft)] space-y-1.5 md:text-right leading-relaxed">
              <div>Based in {PROFILE.location}</div>
              <div>UCLA — MEng AI ’27</div>
              <div>Purdue — B.S. CS ’25</div>
            </div>
          </Reveal>
        </div>
      </motion.div>

      <button
        onClick={() => scrollToId('about')}
        className="absolute z-10 bottom-7 right-6 md:right-10 flex items-center gap-2 label text-[var(--on-dark-soft)] hover:text-[var(--on-dark)] transition-colors"
        data-hover
      >
        Scroll <ArrowDown className="w-4 h-4 animate-bounce" />
      </button>
    </section>
  );
}

/* ============================================================ section label */
function Index({ n, children }) {
  return (
    <div className="label text-[var(--ash)] flex items-center gap-3">
      <span>({n})</span>
      <span className="inline-block w-6 h-px bg-[var(--line)]" />
      {children}
    </div>
  );
}

/* ============================================================ ABOUT + STATS — white editorial */
function About() {
  return (
    <section id="about" className="relative bg-[var(--paper)] text-[var(--carbon)] px-6 md:px-10 py-24 md:py-36">
      <div className="mx-auto max-w-[1440px]">
        <Reveal>
          <Index n="01">Profile</Index>
        </Reveal>

        <div className="mt-12 max-w-[1100px]">
          <RevealWords
            text="I work at the seam between AI and systems — turning models and messy data into products that are fast, observable and genuinely useful."
            className="font-display font-light text-[var(--ink)]"
            style={{ fontSize: 'clamp(1.7rem, 4.4vw, 3.6rem)', lineHeight: 1.12 }}
            as="h2"
          />
        </div>

        <div className="mt-14 grid md:grid-cols-2 gap-10 max-w-4xl text-[var(--ash)] leading-relaxed" style={{ fontSize: 18 }}>
          <Reveal delay={0.1}>
            <p>
              Across robotics and large-scale recommendation, I’ve owned the full path: operator
              tooling, data and labeling pipelines, model training, and production serving with
              real observability.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <p>
              Now studying AI at UCLA after finishing CS at Purdue, I care about engineering that
              holds up under load — and about making the impact <span className="mercury-text">legible</span>.
            </p>
          </Reveal>
        </div>

        {/* Impact stats */}
        <div className="mt-20 md:mt-28 grid grid-cols-2 lg:grid-cols-4 border-t border-[var(--line)]">
          {STATS.map((s, i) => (
            <Reveal key={i} delay={i * 0.08} className="border-b border-[var(--line)] lg:border-b-0 lg:border-r border-[var(--line)] last:border-r-0 py-8 pr-6">
              <div className="font-display font-light text-[var(--ink)] leading-none" style={{ fontSize: 'clamp(2.8rem, 6vw, 5rem)' }}>
                <Counter value={s.value} prefix={s.prefix || ''} suffix={s.suffix || ''} />
              </div>
              <p className="mt-4 text-sm text-[var(--ash)] leading-snug max-w-[200px]">{s.label}</p>
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
    <section className="bg-[var(--paper)] border-y border-[var(--line)] overflow-hidden py-6 md:py-9">
      <VelocityMarquee baseVelocity={3}>
        <span className="font-display font-light flex items-center text-[var(--ink)]" style={{ fontSize: 'clamp(2rem, 6vw, 5rem)' }}>
          {MARQUEE.map((m, i) => (
            <span key={i} className="flex items-center">
              <span className="px-8">{m}</span>
              <span className="mercury-text">✦</span>
            </span>
          ))}
        </span>
      </VelocityMarquee>
    </section>
  );
}

/* ============================================================ EXPERIENCE — white editorial */
function Experience() {
  return (
    <section id="work" className="bg-[var(--paper)] text-[var(--carbon)] px-6 md:px-10 py-24 md:py-36">
      <div className="mx-auto max-w-[1440px]">
        <Reveal className="mb-12">
          <Index n="02">Experience</Index>
        </Reveal>

        <div className="border-t border-[var(--line)]">
          {EXPERIENCE.map((exp) => (
            <ExperienceRow key={exp.id} exp={exp} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ExperienceRow({ exp }) {
  const [open, setOpen] = useState(false);
  return (
    <Reveal className="border-b border-[var(--line)]">
      <button onClick={() => setOpen((o) => !o)} className="group w-full text-left py-9 md:py-12 grid md:grid-cols-12 gap-4 md:gap-8 items-start" data-hover>
        <div className="md:col-span-1 label text-[var(--ash)] pt-2">{exp.id}</div>
        <div className="md:col-span-6">
          <h3 className="font-display font-light leading-tight transition-transform duration-500 group-hover:translate-x-2" style={{ fontSize: 'clamp(1.7rem, 4vw, 3rem)' }}>
            {exp.company}
          </h3>
          <div className="mt-2 text-[var(--ash)]">{exp.role}</div>
        </div>
        <div className="md:col-span-4 label text-[var(--ash)] md:pt-3">{exp.period}</div>
        <div className="md:col-span-1 flex md:justify-end md:pt-2">
          <ArrowUpRight className={`w-6 h-6 transition-transform duration-500 ${open ? 'rotate-90' : 'group-hover:rotate-45'}`} />
        </div>
      </button>

      <motion.div initial={false} animate={{ height: open ? 'auto' : 0, opacity: open ? 1 : 0 }} transition={{ duration: 0.6, ease }} className="overflow-hidden">
        <div className="md:grid md:grid-cols-12 gap-8 pb-10 md:pb-14">
          <div className="md:col-start-2 md:col-span-6 text-[var(--ash)] leading-relaxed mb-6 md:mb-0" style={{ fontSize: 17 }}>
            {exp.summary}
          </div>
          <ul className="md:col-span-4 space-y-4">
            {exp.bullets.map((b, i) => (
              <li key={i} className="flex gap-3 text-sm leading-relaxed text-[var(--ash)]">
                <span className="mercury-text">—</span>
                <span>{b}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="md:col-start-2 flex flex-wrap gap-2 pb-12">
          {exp.tags.map((t) => (
            <span key={t} className="label !tracking-wider border border-[var(--line)] rounded-full px-3 py-1 text-[var(--ash)]">
              {t}
            </span>
          ))}
        </div>
      </motion.div>
    </Reveal>
  );
}

/* ============================================================ WORK — dark immersive gallery */
function Projects() {
  return (
    <section id="projects" className="relative bg-[var(--dark)] text-[var(--on-dark)] overflow-hidden px-6 md:px-10 py-24 md:py-36">
      <MercuryFlow className="opacity-40" />
      <div className="relative z-10 mx-auto max-w-[1440px]">
        <Reveal className="mb-14 md:mb-20">
          <div className="label text-[var(--on-dark-soft)] flex items-center gap-3">
            <span>(03)</span>
            <span className="inline-block w-6 h-px bg-[var(--line-dark)]" />
            Selected Work
          </div>
          <h2 className="font-display font-light mt-6 leading-[0.95]" style={{ fontSize: 'clamp(2.6rem, 8vw, 7rem)' }}>
            <RevealLines lines={['Selected Projects']} />
          </h2>
        </Reveal>

        <div className="space-y-24 md:space-y-40">
          {PROJECTS.map((p, i) => (
            <ProjectBlock key={p.id} project={p} index={i} flip={i % 2 === 1} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectBlock({ project, index, flip }) {
  return (
    <div className="grid lg:grid-cols-12 gap-8 lg:gap-14 items-center">
      <div className={`lg:col-span-7 ${flip ? 'lg:order-2' : ''}`}>
        <FlowImage
          src={project.image}
          alt={`${project.title} — ${project.subtitle}`}
          overlay="#0b0b0b"
          className="aspect-[16/10] rounded-[10px]"
        />
      </div>

      <div className={`lg:col-span-5 ${flip ? 'lg:order-1' : ''}`}>
        <div className="label text-[var(--on-dark-soft)] mb-4">
          0{index + 1} / 0{PROJECTS.length} · {project.year}
        </div>
        <h3 className="font-display font-light leading-[0.98]" style={{ fontSize: 'clamp(2.2rem, 5vw, 4rem)' }}>
          {project.title}
        </h3>
        <p className="mt-2 text-[var(--on-dark-soft)]" style={{ fontSize: 'clamp(1.1rem, 2vw, 1.5rem)' }}>
          {project.subtitle}
        </p>
        <p className="mt-6 text-[var(--on-dark-soft)] leading-relaxed max-w-md">{project.blurb}</p>

        <ul className="mt-6 space-y-4 max-w-md">
          {project.points.map((pt, i) => (
            <li key={i} className="flex gap-3 text-sm leading-relaxed text-[var(--on-dark-soft)] border-t border-[var(--line-dark)] pt-4">
              <span className="mercury-text font-mono">0{i + 1}</span>
              <span>{pt}</span>
            </li>
          ))}
        </ul>

        <div className="mt-6 flex flex-wrap gap-2">
          {project.stack.map((s) => (
            <span key={s} className="label !tracking-wider border border-[var(--line-dark)] rounded-full px-3 py-1 text-[var(--on-dark-soft)]">
              {s}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ============================================================ SKILLS + EDUCATION — white editorial */
function Skills() {
  return (
    <section id="skills" className="bg-[var(--paper)] text-[var(--carbon)] px-6 md:px-10 py-24 md:py-36">
      <div className="mx-auto max-w-[1440px]">
        <Reveal className="mb-12">
          <Index n="04">Capabilities &amp; Education</Index>
        </Reveal>

        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16">
          <div className="lg:col-span-5">
            <Reveal>
              <h2 className="font-display font-light leading-[1.05]" style={{ fontSize: 'clamp(2.2rem, 5vw, 4rem)' }}>
                The toolkit behind the work.
              </h2>
            </Reveal>

            <div className="mt-12 space-y-8">
              {EDUCATION.map((e) => (
                <Reveal key={e.short} className="border-t border-[var(--line)] pt-5">
                  <div className="flex items-baseline justify-between gap-4">
                    <h3 className="font-display text-xl">{e.short}</h3>
                    <span className="label text-[var(--ash)]">{e.period}</span>
                  </div>
                  <div className="text-[var(--carbon)] mt-1">{e.degree}</div>
                  <div className="label text-[var(--smoke)] mt-1">{e.place}</div>
                  <p className="text-sm text-[var(--ash)] mt-2 leading-relaxed">{e.note}</p>
                </Reveal>
              ))}
            </div>
          </div>

          <div className="lg:col-span-7">
            {SKILLS.map((group, i) => (
              <Reveal key={group.label} delay={i * 0.05} className="border-t border-[var(--line)] py-6 grid md:grid-cols-12 gap-4">
                <div className="md:col-span-4 label text-[var(--ash)] pt-1">{group.label}</div>
                <div className="md:col-span-8 flex flex-wrap gap-2">
                  {group.items.map((it) => (
                    <span key={it} className="text-sm border border-[var(--line)] rounded-full px-4 py-1.5 hover:bg-[var(--ink)] hover:text-[var(--paper)] transition-colors duration-300" data-hover>
                      {it}
                    </span>
                  ))}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================ CONTACT — dark immersive frame */
function Contact() {
  return (
    <section id="contact" className="relative bg-[var(--dark)] text-[var(--on-dark)] overflow-hidden px-6 md:px-10 py-24 md:py-40">
      <MercuryFlow className="opacity-45" />
      <div className="relative z-10 mx-auto max-w-[1440px]">
        <div className="label text-[var(--on-dark-soft)]">(05) — Contact</div>

        <h2 className="font-display font-light mt-8 leading-[0.92]" style={{ fontSize: 'clamp(3rem, 12vw, 12rem)' }}>
          <RevealLines lines={['Let’s build', 'something.']} />
        </h2>

        <div className="mt-12">
          <Magnetic strength={0.2}>
            <a href={`mailto:${PROFILE.email}`} className="inline-block font-display font-light link-underline" style={{ fontSize: 'clamp(1.6rem, 5vw, 3.6rem)' }} data-hover>
              {PROFILE.email}
            </a>
          </Magnetic>
        </div>

        <div className="mt-20 grid md:grid-cols-3 gap-10 border-t border-[var(--line-dark)] pt-10">
          <div>
            <div className="label text-[var(--on-dark-soft)] mb-3">Elsewhere</div>
            <div className="flex flex-col gap-2">
              <a href={PROFILE.linkedin} target="_blank" rel="noreferrer" className="link-underline w-fit" data-hover>LinkedIn ↗</a>
              <a href={PROFILE.github} target="_blank" rel="noreferrer" className="link-underline w-fit" data-hover>GitHub ↗</a>
              <a href={PROFILE.resume} target="_blank" rel="noreferrer" className="link-underline w-fit" data-hover>Résumé (PDF) ↗</a>
            </div>
          </div>
          <div>
            <div className="label text-[var(--on-dark-soft)] mb-3">Direct</div>
            <div>{PROFILE.phone}</div>
            <div>{PROFILE.location}</div>
          </div>
          <div className="md:text-right">
            <div className="label text-[var(--on-dark-soft)] mb-3">Status</div>
            <div className="mercury-text font-display" style={{ fontSize: 20 }}>Open to SWE / AI roles</div>
            <button onClick={() => scrollToId('top')} className="mt-6 label border border-[var(--line-dark)] rounded-full px-5 py-2 hover:bg-[var(--paper)] hover:text-[var(--ink)] transition-colors" data-hover>
              Back to top ↑
            </button>
          </div>
        </div>

        <div className="mt-16 label text-[var(--on-dark-soft)] opacity-70">
          © {new Date().getFullYear()} Mingfan (Issac) Xie — Designed &amp; built from scratch.
        </div>
      </div>
    </section>
  );
}

/* ============================================================ ROOT */
export default function Portfolio() {
  useSmoothScroll();
  return (
    <div className="relative bg-[var(--paper)] text-[var(--carbon)]">
      <FluidDefs />
      <div className="grain" />
      <Cursor />
      <Nav />
      <main>
        <Hero />
        <LiquidDivider from="var(--dark)" to="var(--paper)" />
        <About />
        <Band />
        <Experience />
        <LiquidDivider from="var(--paper)" to="var(--dark)" />
        <Projects />
        <LiquidDivider from="var(--dark)" to="var(--paper)" />
        <Skills />
        <LiquidDivider from="var(--paper)" to="var(--dark)" />
        <Contact />
      </main>
    </div>
  );
}
