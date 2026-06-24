// Central content source — résumé data for the portfolio.
import offerwiseImg from './assets/offerwise.jpg';
import communekitImg from './assets/communekit.jpg';
import diyplanImg from './assets/diyplan.jpg';

export const PROFILE = {
  name: 'Mingfan Xie',
  alias: 'Issac',
  roles: ['Software Engineer', 'AI Engineer'],
  tagline:
    'I build AI systems and full-stack platforms that ship measurable impact — from edge perception and MLOps to LLM agents.',
  location: 'Los Angeles, CA',
  email: 'issac.xieee@gmail.com',
  phone: '+1 (765) 746-9903',
  linkedin: 'https://linkedin.com/in/mingfan777',
  linkedinLabel: 'linkedin.com/in/mingfan777',
  github: 'https://github.com/IIIIVIII',
  githubLabel: 'github.com/IIIIVIII',
  resume: process.env.PUBLIC_URL + '/resume.pdf',
};

export const MARQUEE = [
  'AI Engineering',
  'Full-Stack Systems',
  'LLM Agents',
  'MLOps',
  'Edge Perception',
  'Distributed Backends',
  'Cloud Infrastructure',
];

export const STATS = [
  { value: 30, suffix: '%', label: 'Faster time-to-interactive on the robotics ops console' },
  { value: 20, suffix: '%', label: 'Recall lift on indoor navigation perception' },
  { value: 6, suffix: '%', prefix: '+', label: 'Offline AUC gain on CTR / CVR ranking models' },
  { value: 25, suffix: '%', label: 'p95 API latency cut via read-through caching' },
];

export const EXPERIENCE = [
  {
    id: '01',
    company: 'Juneng Robotics Co., Ltd.',
    role: 'Software Engineer Intern',
    period: "May 2023 — Aug 2023",
    summary:
      'Owned the operator-facing tooling for an on-device perception stack — from a tablet-first ops console to the calibration and labeling workflows that fed model training.',
    bullets: [
      'Built a React/TypeScript ops console with tablet-first PWA views; touch controls, WebSocket / Apollo GraphQL streams and OpenCV overlays cut TTI by 30% and lifted operator accuracy by 8 pts.',
      'Designed a camera–LiDAR calibration wizard with point-cloud viewers (pinch-zoom / rotate, ROI drawing via PCL); cut duplicates & mislabels by 25% and lifted recall by 20% on indoor nav scenes.',
      'Established a labeling→training workflow with CVAT and rater UIs, augmentation, stratified splits and HPO; logged runs in Weights & Biases with model cards and reproducible configs.',
      'Deployed perception services as ROS nodes on C++/TFLite with health probes, feature flags, shadow A/B, offline caches and QR pairing for staged, reliable field rollouts.',
    ],
    tags: ['React', 'TypeScript', 'PWA', 'GraphQL', 'OpenCV', 'C++', 'TFLite', 'ROS', 'W&B'],
  },
  {
    id: '02',
    company: 'Xiaomi Technology',
    role: 'Software Engineer Intern',
    period: 'Jun 2022 — Sep 2022',
    summary:
      'Worked across the ML lifecycle for content recommendation — training and tuning ranking models, building the data pipelines behind them, and productionizing serving with full observability.',
    bullets: [
      'Built and tuned CTR/CVR models with TensorFlow & scikit-learn (wide&deep, calibrated logistic, XGBoost); shipped a React UI for cohorts and calibration/lift plots, improving offline AUC by 4–6%.',
      'Authored multi-TB Apache Spark ETL with aggregations, partitioning and UDF pruning; orchestrated jobs in Airflow and cut shuffle/payloads to lower end-to-end latency by 30%.',
      'Productionized models with Docker/Kubernetes and TensorFlow Serving; integrated Kafka events and a Redis feature cache, and shipped drift/latency dashboards (PSI, KS, p50/p95) with Jenkins canary CI.',
    ],
    tags: ['TensorFlow', 'XGBoost', 'Spark', 'Airflow', 'Kubernetes', 'Kafka', 'Redis', 'Jenkins'],
  },
];

export const PROJECTS = [
  {
    id: 'diyplan',
    title: 'DIYPlan Agent',
    subtitle: 'Multimodal Agent for DIY Build Plans',
    year: '2026',
    stack: ['Multimodal Agents', 'Model Routing', 'MLX', 'RAG', 'OpenAI', 'Node.js', 'Python'],
    link: 'https://github.com/IIIIVIII/DIYPlan-Agent',
    blurb:
      'A local-first multimodal agent that turns a furniture inspiration photo into a verifiable, beginner-safe DIY build plan — and a sandbox for studying model routing, structured generation and inference cost.',
    points: [
      'Designed a multimodal agent workflow (observation → measurement → decomposition → routing → retrieval → manual generation → verification) that turns a reference image into structured parts, materials, tools, costs and safety checks.',
      'Built pluggable model routing — cost-optimized, quality-first, cascade, local-first and on-device Local MLX on Apple Silicon — so expensive vision-language calls run only where they add value, with cloud / local / mock fallbacks.',
      'Treated generation as a verifiable model contract: the model fills a strict assembly schema while a deterministic renderer draws LEGO-style instruction manuals, with an offline benchmark harness comparing quality, latency and cost units.',
    ],
    accent: '#a0e0ab',
    image: diyplanImg,
  },
  {
    id: 'offerwise',
    title: 'OfferWise AI',
    subtitle: 'Agentic Offer Decision Platform',
    year: '2025',
    stack: ['Python', 'FastAPI', 'React', 'LLM Agents', 'Monte Carlo'],
    blurb:
      'An agentic platform that turns messy job offers into auditable, explainable decisions — pairing LLM reasoning with a deterministic scoring engine so guidance stays trustworthy.',
    points: [
      'Architected multi-step LLM workflows that extract compensation, city preferences and work constraints, then compare offers on LifeScore, AffordabilityScore, FitScore and ConfidenceScore.',
      'Engineered a deterministic scoring engine — feasibility gates, diminishing income utility, geometric aggregation, proxy-aware validation — separated from LLM orchestration to reduce hallucination risk.',
      'Ran Monte Carlo simulations across rent, bonus realization, spending and preference weights to produce explainable reports with top drivers, confidence warnings and offer-reversal conditions.',
    ],
    accent: '#c8472b',
    image: offerwiseImg,
  },
  {
    id: 'communekit',
    title: 'CommuneKit',
    subtitle: 'Community Engagement Platform',
    year: '2023',
    stack: ['React', 'Spring Boot', 'MySQL', 'REST', 'Redis'],
    blurb:
      'A responsive full-stack platform engineered for high-cardinality search and hardened, auditable access — built to stay fast and reproducible across devices.',
    points: [
      'Built a React + Spring Boot app with server-side pagination, debounced multi-facet filters, URL-state sync and optimistic updates so high-cardinality searches stay reproducible across devices.',
      'Designed secure REST endpoints with Spring Security (JWT, CSRF), centralized exception handling, bean validation, audit logging and token rotation, plus end-to-end password-reset flows.',
      'Tuned MySQL with composite/covering indexes, read replicas and slow-query profiling, and added a key-scoped Redis read-through cache — cutting p95 API latency by ~25%.',
    ],
    accent: '#9a5b2d',
    image: communekitImg,
  },
];

export const EDUCATION = [
  {
    school: 'University of California, Los Angeles',
    short: 'UCLA',
    degree: 'Master of Engineering in AI (MEng AI)',
    period: 'Expected June 2027',
    place: 'Los Angeles, CA',
    note: 'Incoming graduate student specializing in Artificial Intelligence & Machine Learning.',
  },
  {
    school: 'Purdue University',
    short: 'Purdue',
    degree: 'B.S. in Computer Science (Software Engineering) · Minor in CIT',
    period: 'Dec 2025',
    place: 'West Lafayette, IN',
    note: 'Coursework: Data Structures & Algorithms (C++), Operating Systems, Computer Architecture, Software Engineering, Software Testing, OOP (Java).',
  },
];

export const SKILLS = [
  {
    label: 'Languages',
    items: ['Java', 'Go', 'Python', 'JavaScript / TypeScript', 'SQL', 'C / C++'],
  },
  {
    label: 'Cloud & DevOps',
    items: ['AWS (EC2, S3, RDS, Lambda, EKS)', 'GCP', 'Docker', 'Kubernetes', 'Terraform', 'CI/CD', 'Linux/Unix', 'OpenTelemetry', 'Prometheus / Grafana'],
  },
  {
    label: 'Databases & Middleware',
    items: ['PostgreSQL (pgvector)', 'MySQL', 'Redis', 'Elasticsearch', 'MongoDB', 'Kafka', 'SQS', 'REST', 'gRPC'],
  },
  {
    label: 'Frameworks & ML',
    items: ['Spring Boot', 'Node.js / Express', 'Flask', 'React / React Native', 'TensorFlow', 'scikit-learn', 'Pandas'],
  },
  {
    label: 'Certificates & Practices',
    items: ['IBM AI Engineering / ML', 'Google Data Analytics', 'SOLID', 'Automated Testing (JUnit, Jest, PyTest)'],
  },
];
