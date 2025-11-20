import React, { useState, useEffect, useRef } from 'react';
import { 
  Github, 
  Linkedin, 
  ArrowRight, 
  Menu,
  X,
  Cpu,
  Globe,
  Zap,
  ExternalLink,
  Code2
} from 'lucide-react';

// --- 1. Enhanced Animation & Styles Helpers ---

// Smooth mouse position with easing
const useMousePosition = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const mouseRef = useRef({ x: 0, y: 0 });
  
  useEffect(() => {
    const updateMousePosition = (ev) => {
      mouseRef.current = { x: ev.clientX, y: ev.clientY };
    };
    
    const smoothUpdate = () => {
      setMousePosition(prev => ({
        x: prev.x + (mouseRef.current.x - prev.x) * 0.1,
        y: prev.y + (mouseRef.current.y - prev.y) * 0.1
      }));
      requestAnimationFrame(smoothUpdate);
    };
    
    window.addEventListener('mousemove', updateMousePosition);
    smoothUpdate();
    return () => window.removeEventListener('mousemove', updateMousePosition);
  }, []);
  return mousePosition;
};

// Particle background component
const ParticleBackground = () => {
  const canvasRef = useRef(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const particles = [];
    const particleCount = 50;
    
    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 0.5;
        this.speedX = Math.random() * 0.5 - 0.25;
        this.speedY = Math.random() * 0.5 - 0.25;
        this.opacity = Math.random() * 0.5 + 0.2;
      }
      
      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        
        if (this.x > canvas.width) this.x = 0;
        if (this.x < 0) this.x = canvas.width;
        if (this.y > canvas.height) this.y = 0;
        if (this.y < 0) this.y = canvas.height;
      }
      
      draw() {
        ctx.fillStyle = `rgba(6, 182, 212, ${this.opacity})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }
    
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(particle => {
        particle.update();
        particle.draw();
      });
      requestAnimationFrame(animate);
    };
    
    animate();
    
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  return <canvas ref={canvasRef} className="fixed inset-0 z-0 pointer-events-none opacity-30" />;
};

// Enhanced Fluid Background with more layers
const FluidBackground = () => (
  <div className="fixed inset-0 z-0 overflow-hidden bg-[#050505] pointer-events-none">
    {/* Animated Gradient Blobs */}
    <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-purple-600/20 rounded-full blur-[120px] opacity-40 animate-blob mix-blend-screen" />
    <div className="absolute top-[20%] right-[-10%] w-[40vw] h-[40vw] bg-cyan-500/20 rounded-full blur-[100px] opacity-40 animate-blob animation-delay-2000 mix-blend-screen" />
    <div className="absolute bottom-[-20%] left-[20%] w-[60vw] h-[60vw] bg-blue-600/20 rounded-full blur-[140px] opacity-40 animate-blob animation-delay-4000 mix-blend-screen" />
    <div className="absolute top-[50%] left-[50%] w-[35vw] h-[35vw] bg-pink-500/15 rounded-full blur-[90px] opacity-30 animate-blob animation-delay-6000 mix-blend-screen" />
    
    {/* Noise Texture Overlay */}
    <div 
      className="absolute inset-0 opacity-[0.07] mix-blend-overlay"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
      }}
    />
    
    {/* Grid overlay */}
    <div 
      className="absolute inset-0 opacity-[0.03]"
      style={{
        backgroundImage: 'linear-gradient(rgba(6, 182, 212, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(6, 182, 212, 0.1) 1px, transparent 1px)',
        backgroundSize: '50px 50px'
      }}
    />
  </div>
);

// Enhanced Custom Cursor with magnetic effect
const CustomCursor = () => {
  const { x, y } = useMousePosition();
  const [isHovering, setIsHovering] = useState(false);
  
  useEffect(() => {
    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => setIsHovering(false);
    
    const interactiveElements = document.querySelectorAll('button, a, [data-cursor="hover"]');
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', handleMouseEnter);
      el.addEventListener('mouseleave', handleMouseLeave);
    });
    
    return () => {
      interactiveElements.forEach(el => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, []);
  
  return (
    <>
      <div 
        className={`fixed top-0 left-0 border border-white/30 rounded-full pointer-events-none z-50 transition-all duration-300 ease-out mix-blend-difference hidden md:block ${
          isHovering ? 'w-16 h-16' : 'w-12 h-12'
        }`}
        style={{ 
          transform: `translate(${x - (isHovering ? 32 : 24)}px, ${y - (isHovering ? 32 : 24)}px)`,
          borderColor: isHovering ? 'rgba(6, 182, 212, 0.6)' : 'rgba(255, 255, 255, 0.3)'
        }}
      />
      <div 
        className="fixed top-0 left-0 w-2 h-2 bg-cyan-400 rounded-full pointer-events-none z-50 transition-transform duration-75 ease-out hidden md:block"
        style={{ transform: `translate(${x - 4}px, ${y - 4}px)` }}
      />
    </>
  );
};

// Enhanced Magnetic Button with real magnetic effect
const MagneticButton = ({ children, onClick, className = "" }) => {
  const buttonRef = useRef(null);
  const [transform, setTransform] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    const button = buttonRef.current;
    if (!button) return;
    
    const handleMouseMove = (e) => {
      const rect = button.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const distanceX = e.clientX - centerX;
      const distanceY = e.clientY - centerY;
      const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
      const maxDistance = 100;
      
      if (distance < maxDistance) {
        const force = (maxDistance - distance) / maxDistance;
        setTransform({
          x: distanceX * force * 0.2,
          y: distanceY * force * 0.2
        });
      } else {
        setTransform({ x: 0, y: 0 });
      }
    };
    
    const handleMouseLeave = () => {
      setTransform({ x: 0, y: 0 });
    };
    
    button.addEventListener('mousemove', handleMouseMove);
    button.addEventListener('mouseleave', handleMouseLeave);
    
    return () => {
      button.removeEventListener('mousemove', handleMouseMove);
      button.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);
  
  return (
    <button 
      ref={buttonRef}
      onClick={onClick} 
      className={`transition-all duration-300 ${className}`}
      style={{
        transform: `translate(${transform.x}px, ${transform.y}px) scale(${transform.x || transform.y ? 1.05 : 1})`
      }}
      data-cursor="hover"
    >
      {children}
    </button>
  );
};


// Scroll reveal component wrapper
const ScrollReveal = ({ children, delay = 0, className = "" }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);
  
  useEffect(() => {
    const currentRef = ref.current;
    if (!currentRef) return;
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );
    
    observer.observe(currentRef);
    
    return () => {
      observer.unobserve(currentRef);
    };
  }, []);
  
  return (
    <div
      ref={ref}
      className={`${className} ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      } transition-all duration-700`}
      style={{ transitionDelay: `${delay}s` }}
    >
      {children}
    </div>
  );
};

// --- 3. Enhanced Page Components ---

const HomePage = ({ setPage }) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);
  
  return (
    <div className="h-full flex flex-col justify-center relative px-6 md:px-12 overflow-hidden">
      {/* Parallax background elements */}
      <div 
        className="absolute right-0 top-0 w-[40vw] h-[40vw] bg-cyan-500/5 rounded-full blur-3xl"
        style={{
          transform: `translate(${mousePos.x * 50}px, ${mousePos.y * 50}px)`
        }}
      />
      
      {/* Huge Typography */}
      <div className="relative z-10">
        <div className="overflow-hidden mb-2">
          <p className="font-mono text-cyan-400 text-sm md:text-base tracking-[0.2em] animate-fade-in-up">
            SOFTWARE ENGINEER & AI PRACTITIONER
          </p>
        </div>
        
        <h1 
          className="text-[12vw] leading-[0.85] font-bold text-white tracking-tighter mix-blend-difference animate-reveal"
          style={{
            transform: `perspective(1000px) rotateY(${(mousePos.x - 0.5) * 5}deg) rotateX(${(mousePos.y - 0.5) * -5}deg)`
          }}
        >
          MINGFAN
          <br />
          <span className="outline-text text-transparent stroke-white stroke-2 opacity-50">XIE</span>
        </h1>

        <div className="mt-12 flex flex-col md:flex-row gap-8 md:items-end">
          <p className="text-slate-400 max-w-md text-lg leading-relaxed animate-fade-in-up delay-100">
            I craft <span className="text-white">high-performance systems</span>. 
            Currently bridging <span className="text-cyan-400">AI Theory</span> with <span className="text-cyan-400">Real-World Infrastructure</span> at Purdue.
          </p>

          <div className="flex gap-6 animate-fade-in-up delay-200">
            <MagneticButton 
              onClick={() => setPage('projects')}
              className="group flex items-center gap-3 px-8 py-4 bg-white text-black font-bold font-mono hover:bg-cyan-400 transition-all duration-300 hover:shadow-[0_0_30px_rgba(6,182,212,0.5)] relative overflow-hidden"
            >
              <span className="relative z-10">VIEW PROJECTS</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform relative z-10" />
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </MagneticButton>
          </div>
        </div>
      </div>

      {/* Enhanced Decorative Code Snippet with animation */}
      <div className="absolute right-12 bottom-12 font-mono text-[10px] text-slate-600 hidden md:block opacity-50 text-right animate-fade-in-up delay-300">
        <div className="relative">
          <div className="absolute -inset-1 bg-cyan-500/20 blur-sm opacity-0 hover:opacity-100 transition-opacity" />
          <div className="relative">
            <div>const profile = {'{'}</div>
            <div className="pl-4">gre: <span className="text-cyan-400">336</span>,</div>
            <div className="pl-4">gpa: <span className="text-cyan-400">3.45</span>,</div>
            <div className="pl-4">focus: <span className="text-purple-400">["Systems", "MLOps"]</span></div>
            <div>{'}'};</div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ExperiencePage = () => {
  const experiences = [
    {
      id: "01",
      role: "ML Systems Intern",
      company: "Juneng Robotics",
      period: "May '23 — Aug '23",
      location: "Shenzhen",
      desc: "Optimized perception stack for indoor navigation robots. Bridged the gap between academic model theory and embedded hardware constraints.",
      tags: ["C++", "TFLite", "ROS", "Edge AI"],
      highlight: "30% Latency Drop via INT8 Quantization"
    },
    {
      id: "02",
      role: "Backend Intern",
      company: "Xiaomi Technology",
      period: "May '22 — Aug '22",
      location: "Beijing",
      desc: "Re-engineered recommendation flows to break filter bubbles. Built high-concurrency pipelines processing multi-TB datasets.",
      tags: ["Java", "Spark", "Kafka", "K8s"],
      highlight: "+8% User Session Duration"
    }
  ];

  return (
    <div className="w-full max-w-6xl mx-auto pt-20">
      <h2 className="text-[8vw] font-bold text-white/10 leading-none mb-12 select-none">EXPERIENCE</h2>
      
      <div className="space-y-0">
        {experiences.map((exp, idx) => (
          <ScrollReveal key={exp.id} delay={idx * 0.1}>
            <div 
              className="group relative border-t border-white/10 py-12 md:py-16 hover:bg-white/5 transition-all duration-500 px-4 md:px-8"
            >
              {/* Glassmorphism effect on hover */}
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 backdrop-blur-sm" />
              
              <div className="md:grid md:grid-cols-12 gap-8 items-start relative z-10">
                
                {/* ID & Period */}
                <div className="md:col-span-2 font-mono text-slate-500 text-sm mb-2 md:mb-0">
                  <span className="text-cyan-500 block text-xl mb-2 group-hover:scale-110 transition-transform duration-300">{exp.id}</span>
                  {exp.period}
                </div>

                {/* Main Info */}
                <div className="md:col-span-5">
                  <h3 className="text-3xl md:text-4xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors group-hover:translate-x-2 transition-transform duration-300">
                    {exp.company}
                  </h3>
                  <div className="text-xl text-slate-400 font-light flex items-center gap-2">
                    {exp.role}
                  </div>
                </div>

                {/* Details */}
                <div className="md:col-span-5 mt-6 md:mt-0">
                  <p className="text-slate-400 leading-relaxed mb-6">{exp.desc}</p>
                  
                  {/* Highlight Metric with glow effect */}
                  <div className="flex items-center gap-3 bg-cyan-500/10 border border-cyan-500/20 p-3 rounded mb-6 group-hover:bg-cyan-500/20 group-hover:shadow-[0_0_20px_rgba(6,182,212,0.3)] transition-all duration-300">
                    <Zap className="w-4 h-4 text-cyan-400 group-hover:rotate-12 transition-transform" />
                    <span className="text-cyan-100 text-sm font-mono">{exp.highlight}</span>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {exp.tags.map(t => (
                      <span 
                        key={t} 
                        className="px-2 py-1 border border-white/10 rounded-full text-[10px] font-mono text-slate-500 uppercase tracking-wider hover:border-cyan-500/50 hover:text-cyan-400 hover:bg-cyan-500/10 transition-all duration-300 cursor-default"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </div>
  );
};

const ProjectsPage = () => {
  const projects = [
    {
      title: "TripSplit",
      category: "Distributed System",
      year: "2024",
      desc: "Full-stack group travel platform solving fragmentation in planning. Features graph-based friend suggestions and scalable notifications.",
      tech: ["Spring Boot", "Flutter", "MySQL", "Redis"],
      stat: "Full Microservice Arch"
    },
    {
      title: "CommuneKit",
      category: "High-Perf Web",
      year: "2023",
      desc: "Community sharing platform engineered for high-cardinality search. Optimized for p95 latency using multi-layer caching.",
      tech: ["React", "Spring Boot", "Redis"],
      stat: "25% Latency Reduction"
    },
    {
      title: "BitCase Store",
      category: "E-Commerce AI",
      year: "2023",
      desc: "DTC storefront with hybrid semantic search (Elasticsearch + Vectors) and automated inventory management.",
      tech: ["Node.js", "Postgres", "Vector Search"],
      stat: "+9% CTR via AI"
    }
  ];

  return (
    <div className="w-full max-w-7xl mx-auto pt-20 px-4">
      <div className="flex justify-between items-end mb-16 border-b border-white/10 pb-6">
        <h2 className="text-6xl md:text-8xl font-bold text-white tracking-tighter">WORK</h2>
        <span className="font-mono text-cyan-500 mb-2">SELECTED PROJECTS</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((p, i) => (
          <ScrollReveal key={i} delay={i * 0.1}>
            <div 
              className="group relative bg-[#0a0a0a] border border-white/10 p-8 h-[400px] flex flex-col justify-between hover:border-cyan-500/50 transition-all duration-500 overflow-hidden"
              style={{ 
                transformStyle: 'preserve-3d'
              }}
              data-cursor="hover"
            >
              {/* 3D Hover Effect */}
              <div 
                className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-purple-500/5 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  transform: 'translateZ(20px)'
                }}
              />
              
              {/* Glow effect */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-purple-500 opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500" />
              
              <div className="relative z-10">
                <div className="flex justify-between items-start mb-4">
                  <span className="font-mono text-xs text-cyan-500 tracking-widest uppercase">{p.category}</span>
                  <span className="font-mono text-xs text-slate-600">{p.year}</span>
                </div>
                <h3 className="text-3xl font-bold text-white mb-4 group-hover:translate-x-2 group-hover:text-cyan-400 transition-all duration-300">
                  {p.title}
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed">{p.desc}</p>
              </div>

              <div className="relative z-10">
                 <div className="mb-6 pt-4 border-t border-white/5">
                   <div className="text-2xl font-bold text-white/20 group-hover:text-white group-hover:scale-110 transition-all duration-300">
                     {p.stat}
                   </div>
                 </div>
                 <div className="flex flex-wrap gap-2">
                   {p.tech.map(t => (
                     <span 
                       key={t} 
                       className="text-[10px] font-mono border border-white/10 px-2 py-1 text-slate-500 rounded hover:border-cyan-500/30 hover:text-cyan-400 hover:bg-cyan-500/10 transition-all duration-300 cursor-default"
                     >
                       {t}
                     </span>
                   ))}
                 </div>
              </div>

              {/* Enhanced Decorative Icon */}
              <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-500 transform group-hover:-translate-y-2 group-hover:rotate-12">
                <ExternalLink className="w-6 h-6 text-cyan-500" />
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </div>
  );
};

const AboutPage = () => {
  return (
    <ScrollReveal className="max-w-5xl mx-auto pt-20 px-6">
       <div className="grid md:grid-cols-2 gap-16 items-center">
         <div>
           <h2 className="text-6xl font-bold text-white mb-8 leading-tight">
             ENGINEERING <br/>
             <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500 animate-gradient">
               AS AN ART FORM.
             </span>
           </h2>
           <div className="space-y-6 text-lg text-slate-400 font-light leading-relaxed">
             <p>
               <strong className="text-white">It started with sneakers.</strong> In high school, I spent hours balancing neon greens with metallic silvers on custom Air Jordans. I realized that engineering isn't just calculation—it's a creative medium.
             </p>
             <p>
               Today, I replace colors with <span className="text-cyan-400">algorithms</span> and canvas with <span className="text-cyan-400">infrastructure</span>. 
             </p>
             <p>
               My work sits at the intersection of Systems and AI. I don't just train models; I build the engines that make them run efficiently in the messy, constrained real world.
             </p>
           </div>
         </div>

         <div className="bg-[#0a0a0a] border border-white/10 p-8 md:p-12 relative overflow-hidden group hover:border-cyan-500/50 transition-all duration-500">
           {/* Enhanced glow effect */}
           <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 blur-3xl rounded-full group-hover:bg-cyan-500/20 transition-all duration-500" />
           <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500" />
           
           <h3 className="font-mono text-sm text-cyan-500 mb-8 tracking-widest relative z-10">TECHNICAL ARSENAL</h3>
           
           <div className="space-y-8 relative z-10">
              <div className="group/item">
                <div className="text-white font-bold mb-2 flex items-center gap-2 group-hover/item:text-cyan-400 transition-colors">
                  <Cpu className="w-4 h-4 group-hover/item:rotate-12 transition-transform" /> Core
                </div>
                <div className="text-slate-400 text-sm">System Optimization, Backend Architecture, Quantization, Edge AI</div>
              </div>
              <div className="group/item">
                <div className="text-white font-bold mb-2 flex items-center gap-2 group-hover/item:text-cyan-400 transition-colors">
                  <Code2 className="w-4 h-4 group-hover/item:rotate-12 transition-transform" /> Languages
                </div>
                <div className="text-slate-400 text-sm">Java, C++, Go, Python, TypeScript, SQL</div>
              </div>
              <div className="group/item">
                <div className="text-white font-bold mb-2 flex items-center gap-2 group-hover/item:text-cyan-400 transition-colors">
                  <Globe className="w-4 h-4 group-hover/item:rotate-12 transition-transform" /> Infrastructure
                </div>
                <div className="text-slate-400 text-sm">AWS, Docker, Kubernetes, Kafka, Redis, Terraform</div>
              </div>
           </div>
         </div>
       </div>
    </ScrollReveal>
  );
};

const ContactPage = () => (
  <div className="h-full flex flex-col justify-center items-center text-center px-6">
    <p className="font-mono text-cyan-400 mb-6 tracking-widest animate-fade-in">OPEN FOR OPPORTUNITIES</p>
    <h2 className="text-6xl md:text-9xl font-bold text-white mb-8 tracking-tighter animate-scale-in">
      LET'S <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-600">BUILD.</span>
    </h2>
    
    <a 
      href="mailto:issac.xieee@gmail.com" 
      className="text-2xl md:text-4xl text-slate-400 hover:text-cyan-400 transition-all duration-300 border-b-2 border-transparent hover:border-cyan-400 pb-2 mb-12 animate-fade-in-up hover:scale-110 inline-block"
      data-cursor="hover"
    >
      issac.xieee@gmail.com
    </a>

    <div className="flex gap-8 animate-fade-in-up delay-100">
      <a 
        href="https://linkedin.com/in/mingfan777" 
        target="_blank" 
        rel="noopener noreferrer"
        className="text-white hover:text-cyan-400 transition-all duration-300 flex items-center gap-2 font-mono text-sm uppercase tracking-widest hover:scale-110 group"
        data-cursor="hover"
      >
        <Linkedin className="w-5 h-5 group-hover:rotate-12 transition-transform" /> LinkedIn
      </a>
      <a 
        href="https://github.com/IIIIVIII" 
        target="_blank" 
        rel="noopener noreferrer"
        className="text-white hover:text-cyan-400 transition-all duration-300 flex items-center gap-2 font-mono text-sm uppercase tracking-widest hover:scale-110 group"
        data-cursor="hover"
      >
        <Github className="w-5 h-5 group-hover:rotate-12 transition-transform" /> GitHub
      </a>
    </div>
  </div>
);

// --- 4. Main Layout with Enhanced Transitions ---

const PortfolioV4 = () => {
  const [page, setPage] = useState('home');
  const [menuOpen, setMenuOpen] = useState(false);
  const [transitioning, setTransitioning] = useState(false);

  const handlePageChange = (newPage) => {
    if (page === newPage) return;
    setMenuOpen(false);
    setTransitioning(true);
    setTimeout(() => {
      setPage(newPage);
      setTransitioning(false);
      window.scrollTo(0, 0);
    }, 600);
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-cyan-500/40 overflow-x-hidden">
      <style jsx global>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        .animation-delay-6000 {
          animation-delay: 6s;
        }
        .outline-text {
          -webkit-text-stroke: 1px rgba(255,255,255,0.3);
          color: transparent;
        }
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }
      `}</style>

      <FluidBackground />
      <ParticleBackground />
      <CustomCursor />

      {/* Enhanced Header with glassmorphism */}
      <nav className="fixed top-0 w-full z-40 px-6 py-8 flex justify-between items-center backdrop-blur-md bg-black/20 border-b border-white/5">
        <button 
          onClick={() => handlePageChange('home')}
          className="text-xl font-bold tracking-tighter hover:text-cyan-400 transition-all duration-300 z-50 hover:scale-110"
          data-cursor="hover"
        >
          MX<span className="text-cyan-500">.</span>
        </button>

        <div className="hidden md:flex gap-8">
          {['experience', 'projects', 'about', 'contact'].map((item) => (
            <button
              key={item}
              onClick={() => handlePageChange(item)}
              className={`text-xs font-mono font-bold uppercase tracking-widest hover:text-cyan-400 transition-all duration-300 relative group ${page === item ? 'text-cyan-400' : 'text-slate-400'}`}
              data-cursor="hover"
            >
              {item}
              <span className={`absolute -bottom-2 left-0 h-[1px] bg-cyan-400 transition-all duration-300 ${page === item ? 'w-full' : 'w-0 group-hover:w-full'}`} />
            </button>
          ))}
        </div>

        <button 
          className="md:hidden z-50 text-white hover:text-cyan-400 transition-colors"
          onClick={() => setMenuOpen(!menuOpen)}
          data-cursor="hover"
        >
          {menuOpen ? <X /> : <Menu />}
        </button>
      </nav>

      {/* Enhanced Mobile Menu Overlay */}
      <div className={`fixed inset-0 bg-black/95 backdrop-blur-xl z-30 flex flex-col items-center justify-center gap-8 transition-all duration-500 ${menuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
        {['home', 'experience', 'projects', 'about', 'contact'].map((item, idx) => (
          <button
            key={item}
            onClick={() => handlePageChange(item)}
            className="text-4xl font-bold uppercase text-transparent bg-clip-text bg-gradient-to-b from-white to-slate-600 hover:to-cyan-400 transition-all duration-300 hover:scale-110"
          >
            0{idx + 1} {item}
          </button>
        ))}
      </div>

      {/* Enhanced Page Content with Fade/Slide Transition */}
      <main 
        className={`relative min-h-screen flex flex-col justify-center pt-24 pb-12 transition-all duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] ${
          transitioning ? 'opacity-0 translate-y-12 blur-md scale-95' : 'opacity-100 translate-y-0 blur-0 scale-100'
        }`}
      >
        {page === 'home' && <HomePage setPage={handlePageChange} />}
        {page === 'experience' && <ExperiencePage />}
        {page === 'projects' && <ProjectsPage />}
        {page === 'about' && <AboutPage />}
        {page === 'contact' && <ContactPage />}
      </main>

    </div>
  );
};

export default PortfolioV4;
