import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  BrainCircuit, 
  BarChart3, 
  Cpu, 
  Network, 
  Zap, 
  ArrowRight, 
  Github, 
  Linkedin, 
  Mail, 
  FileText, 
  Code2, 
  Users, 
  Calendar, 
  AlertCircle, 
  Sparkles, 
  Send, 
  CheckCircle,
  Menu,
  X,
  ExternalLink,
  ChevronRight,
  MapPin,
  Clock,
  Download
} from 'lucide-react';

import { projectsData, ProjectCaseStudy } from './data/projects';
import { skillsCategories, SkillCategory } from './data/skills';
import { 
  ClimateWidget, 
  TelemetryWidget, 
  BrokerWidget, 
  HydroponicsWidget, 
  AnalogWidget 
} from './components/ProjectWidgets';

const ApiCodeCard = () => (
  <div className="absolute -bottom-6 -left-8 bg-slate-900/95 p-3.5 rounded-xl border border-cyan-500/30 shadow-xl font-mono text-[9px] text-slate-300 space-y-1 z-20 pointer-events-none hidden sm:block max-w-[200px]">
    <div className="text-cyan-400 font-bold flex items-center gap-1.5 border-b border-white/10 pb-1 mb-1">
      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping"></span>
      <span>GET /api/system/status</span>
    </div>
    <p><span className="text-amber-400">node:</span> "ITB_EDGE_01"</p>
    <p><span className="text-purple-400">uplink:</span> "READY_SECURE"</p>
    <p><span className="text-emerald-400">latency:</span> "4.2ms"</p>
  </div>
);

const renderCardThumbnail = (project: ProjectCaseStudy) => {
  let svgContent;
  switch (project.widgetType) {
    case 'analog':
      svgContent = (
        <svg viewBox="0 0 160 100" className="w-full h-full text-purple-400">
          <path d="M 10 50 Q 25 30, 40 50 T 70 50 T 100 50 T 130 50 T 150 50" fill="none" stroke="currentColor" strokeWidth="2" className="opacity-90" />
          <path d="M 10 50 Q 25 15, 40 50 T 70 50 T 100 50 T 130 50 T 150 50" stroke="rgba(255,255,255,0.15)" strokeWidth="1" strokeDasharray="2" fill="none" />
          <circle cx="40" cy="50" r="2.5" fill="#EF4444" />
          <circle cx="100" cy="50" r="2.5" fill="#10B981" />
          <line x1="40" y1="50" x2="100" y2="50" stroke="rgba(255,255,255,0.2)" strokeDasharray="3" />
          <text x="15" y="20" fill="rgba(255,255,255,0.4)" fontSize="7" fontFamily="monospace">A_IN: V_BIO</text>
          <text x="110" y="85" fill="rgba(255,255,255,0.4)" fontSize="7" fontFamily="monospace">Notch: 50Hz</text>
        </svg>
      );
      break;
    case 'hydroponics':
      svgContent = (
        <svg viewBox="0 0 160 100" className="w-full h-full text-emerald-400">
          <rect x="25" y="30" width="30" height="25" fill="none" stroke="currentColor" strokeWidth="1.5" rx="3" />
          <path d="M 55 42 L 105 42" fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3" />
          <circle cx="105" cy="42" r="3" fill="#F59E0B" />
          <rect x="105" y="30" width="30" height="25" fill="none" stroke="currentColor" strokeWidth="1.5" rx="3" />
          <path d="M 75 38 L 81 42 L 75 46 Z" fill="currentColor" />
          <text x="15" y="20" fill="rgba(255,255,255,0.4)" fontSize="7" fontFamily="monospace">pH/EC SENSOR LOOP</text>
          <text x="100" y="85" fill="rgba(255,255,255,0.4)" fontSize="7" fontFamily="monospace">FreeRTOS CORE</text>
        </svg>
      );
      break;
    case 'climate':
      svgContent = (
        <svg viewBox="0 0 160 100" className="w-full h-full text-blue-400">
          <g className="opacity-25">
            {[0, 1, 2].map((r) => 
              [0, 1, 2, 3].map((c) => (
                <rect 
                  key={`${r}-${c}`} 
                  x={25 + c * 28} y={20 + r * 20} 
                  width="20" height="12" 
                  fill="none" stroke="white" strokeWidth="0.5" 
                />
              ))
            )}
          </g>
          <path d="M 20 80 Q 55 40, 90 60 T 140 30" fill="none" stroke="currentColor" strokeWidth="2.5" />
          <circle cx="90" cy="60" r="3" fill="#EF4444" />
          <text x="15" y="10" fill="rgba(255,255,255,0.4)" fontSize="7" fontFamily="monospace">SPATIAL GRID: 10m</text>
          <text x="98" y="90" fill="rgba(255,255,255,0.4)" fontSize="7" fontFamily="monospace">RandomForest + LSTM</text>
        </svg>
      );
      break;
    case 'telemetry':
      svgContent = (
        <svg viewBox="0 0 160 100" className="w-full h-full text-cyan-400">
          <g className="opacity-30">
            <circle cx="30" cy="40" r="4" fill="white" />
            <circle cx="80" cy="30" r="4" fill="white" />
            <circle cx="130" cy="50" r="4" fill="white" />
            <circle cx="60" cy="70" r="4" fill="white" />
            <circle cx="110" cy="75" r="4" fill="white" />
            <line x1="30" y1="40" x2="80" y2="30" stroke="white" strokeWidth="0.5" />
            <line x1="80" y1="30" x2="130" y2="50" stroke="white" strokeWidth="0.5" />
            <line x1="30" y1="40" x2="60" y2="70" stroke="white" strokeWidth="0.5" />
            <line x1="60" y1="70" x2="110" y2="75" stroke="white" strokeWidth="0.5" />
            <line x1="110" y1="75" x2="130" y2="50" stroke="white" strokeWidth="0.5" />
          </g>
          <rect x="50" y="45" width="6" height="25" fill="currentColor" rx="1" />
          <rect x="75" y="35" width="6" height="35" fill="currentColor" rx="1" />
          <rect x="100" y="50" width="6" height="20" fill="currentColor" rx="1" />
          <text x="15" y="15" fill="rgba(255,255,255,0.4)" fontSize="7" fontFamily="monospace">KAFKA_INGESTION_V1</text>
          <text x="98" y="90" fill="rgba(255,255,255,0.4)" fontSize="7" fontFamily="monospace">PM2.5 / PM10 Mesh</text>
        </svg>
      );
      break;
    case 'broker':
      svgContent = (
        <svg viewBox="0 0 160 100" className="w-full h-full text-amber-500">
          <path d="M 20 50 Q 80 15, 140 50 T 20 50" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="3" />
          <path d="M 140 50 T 20 50 T 140 50" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <circle cx="80" cy="50" r="7" fill="#1e293b" stroke="currentColor" strokeWidth="2" />
          <circle cx="115" cy="50" r="3" fill="#06B6D4" />
          <circle cx="45" cy="50" r="3" fill="#EF4444" />
          <text x="15" y="15" fill="rgba(255,255,255,0.4)" fontSize="7" fontFamily="monospace">gRPC GATEWAY (Go)</text>
          <text x="98" y="90" fill="rgba(255,255,255,0.4)" fontSize="7" fontFamily="monospace">Redis/JWT 50k req/s</text>
        </svg>
      );
      break;
    default:
      svgContent = (
        <svg viewBox="0 0 160 100" className="w-full h-full text-slate-400">
          <circle cx="80" cy="50" r="10" fill="none" stroke="currentColor" strokeWidth="1" />
          <text x="80" y="53" fill="currentColor" fontSize="8" fontFamily="monospace" textAnchor="middle">PRJ</text>
        </svg>
      );
  }

  return (
    <div className="relative aspect-[16/10] bg-[#070D1A] overflow-hidden flex items-center justify-center p-4 border-b border-brand-border/40 group-hover/card:bg-[#091224] transition-colors duration-300">
      <div className="absolute inset-0 bg-grid-pattern-dark opacity-10 bg-grid-animate"></div>
      <div className="relative w-full h-full max-h-[110px] transform group-hover/card:scale-105 transition-all duration-300">
        {svgContent}
      </div>
      <div className="absolute top-2 right-2 flex bg-black/50 backdrop-blur rounded px-2 py-0.5 border border-white/10">
        <span className="text-[7.5px] font-mono text-slate-300 tracking-wider">EDA_MOCK_GRID v1.0</span>
      </div>
    </div>
  );
};

export default function App() {
  const [activeCategory, setActiveCategory] = useState<string>('electrical');
  const [selectedProjectId, setSelectedProjectId] = useState<string>('analog-frontend');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  
  // Interactive Hero View toggles (Highlights CAD/PCB skills)
  const [heroView, setHeroView] = useState<'system' | 'pcb'>('pcb');
  const [pcbLayer, setPcbLayer] = useState<'copper' | 'silkscreen' | 'all'>('all');
  const [activePcbPart, setActivePcbPart] = useState<string | null>(null);

  const pcbParts: Record<string, { name: string; desc: string }> = {
    'U1': { name: 'ESP32-S3 Dual-Core MCU', desc: 'Main digital core running FreeRTOS tasks to parse biopotential data arrays.' },
    'FL1': { name: 'Twin-T Op-Amp Notch Filter', desc: 'Hardware 50Hz attenuation circuit suppressing localized electrical radiation.' },
    'C1': { name: '10µF Bypass Decoupling Capacitor', desc: 'Low-ESR safety filter dampening switching ripple from power rails.' },
    'R1': { name: '10kΩ Pull-Up Resistor (0603 size)', desc: 'Keeps ADC trigger inputs locked in high impedance to secure boot states.' }
  };
  
  // Contact state
  const [formName, setFormName] = useState<string>('');
  const [formEmail, setFormEmail] = useState<string>('');
  const [formSubject, setFormSubject] = useState<string>('');
  const [formMessage, setFormMessage] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [formSuccess, setFormSuccess] = useState<boolean>(false);
  const [savedMessages, setSavedMessages] = useState<any[]>([]);

  // Selected project object
  const activeProject = projectsData.find(p => p.id === selectedProjectId) || projectsData[0];

  // Load message logs on mount
  useEffect(() => {
    const saved = localStorage.getItem('developer_portfolio_messages');
    if (saved) {
      setSavedMessages(JSON.parse(saved));
    }
  }, []);

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName || !formEmail || !formMessage) return;

    setIsSubmitting(true);

    setTimeout(() => {
      const newMessage = {
        id: Date.now().toString(),
        name: formName,
        email: formEmail,
        subject: formSubject || 'Direct Ingestion request',
        message: formMessage,
        timestamp: new Date().toISOString()
      };

      const updated = [newMessage, ...savedMessages];
      setSavedMessages(updated);
      localStorage.setItem('developer_portfolio_messages', JSON.stringify(updated));

      // Clear input fields
      setFormName('');
      setFormEmail('');
      setFormSubject('');
      setFormMessage('');
      
      setIsSubmitting(false);
      setFormSuccess(true);

      // Dismiss success prompt after duration
      setTimeout(() => setFormSuccess(false), 5000);
    }, 1200);
  };

  const deleteMessage = (id: string) => {
    const filtered = savedMessages.filter(m => m.id !== id);
    setSavedMessages(filtered);
    localStorage.setItem('developer_portfolio_messages', JSON.stringify(filtered));
  };

  // Helper mapping category ID to icons
  const renderCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'BrainCircuit': return <BrainCircuit className="w-5 h-5 text-primary" />;
      case 'BarChart3': return <BarChart3 className="w-5 h-5 text-accent-tech" />;
      case 'Cpu': return <Cpu className="w-5 h-5 text-accent-main" />;
      case 'Network': return <Network className="w-5 h-5 text-emerald-500" />;
      case 'Zap': return <Zap className="w-5 h-5 text-purple-500" />;
      default: return <Code2 className="w-5 h-5" />;
    }
  };

  // Helper mapping case-study widget
  const renderInteractiveWidgetBySlug = (slug: string, accent: string) => {
    switch (slug) {
      case 'climate': return <ClimateWidget accentColor={accent} />;
      case 'telemetry': return <TelemetryWidget accentColor={accent} />;
      case 'broker': return <BrokerWidget accentColor={accent} />;
      case 'hydroponics': return <HydroponicsWidget accentColor={accent} />;
      case 'analog': return <AnalogWidget accentColor={accent} />;
      default: return null;
    }
  };

  const currentCategoryObj = skillsCategories.find(c => c.id === activeCategory) || skillsCategories[0];

  return (
    <div className="min-h-screen bg-brand-bg text-brand-text font-sans flex flex-col selection:bg-primary/20 selection:text-primary">
      
      {/* 1. NAVBAR SECTION */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-brand-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            
            {/* Logo initials + Brand Title */}
            <div className="flex items-center space-x-3">
              <div className="h-9 w-9 bg-brand-dark rounded flex items-center justify-center font-display font-bold text-sm tracking-tight text-white border border-white/20">
                GW
              </div>
              <div className="flex flex-col">
                <span className="font-display font-bold text-sm tracking-tight text-brand-text">GADWISAN WIRA</span>
                <span className="text-[10px] font-mono text-brand-muted uppercase tracking-widest leading-none">Informatics Engineer</span>
              </div>
            </div>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#about" className="text-xs font-mono font-medium text-brand-muted hover:text-primary transition-all uppercase tracking-wider">About</a>
              <a href="#skills" className="text-xs font-mono font-medium text-brand-muted hover:text-primary transition-all uppercase tracking-wider">Skills</a>
              <a href="#projects" className="text-xs font-mono font-medium text-brand-muted hover:text-primary transition-all uppercase tracking-wider">Projects</a>
              <a href="#experience" className="text-xs font-mono font-medium text-brand-muted hover:text-primary transition-all uppercase tracking-wider">Timeline</a>
              <a href="#contact" className="text-xs font-mono font-medium text-brand-muted hover:text-primary transition-all uppercase tracking-wider">Contact</a>
            </div>

            {/* Desktop CTA */}
            <div className="hidden md:flex items-center">
              <a 
                href="#contact" 
                className="inline-flex items-center px-4 py-2 text-xs font-mono font-semibold bg-primary hover:bg-primary/95 text-white rounded transition-all shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
              >
                <span>INGEST PROJECT</span>
                <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
              </a>
            </div>

            {/* Mobile Hamburger Trigger */}
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-brand-muted hover:text-brand-text transition-colors"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

          </div>
        </div>

        {/* Mobile Navigation Dropdown Panels */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white border-b border-brand-border"
            >
              <div className="px-4 pt-2 pb-6 space-y-3 font-mono text-xs">
                <a 
                  href="#about" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-3 py-2 text-brand-muted hover:text-primary hover:bg-brand-bg rounded font-medium"
                >
                  ABOUT PROFILE
                </a>
                <a 
                  href="#skills" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-3 py-2 text-brand-muted hover:text-primary hover:bg-brand-bg rounded font-medium"
                >
                  CORE SKILLS
                </a>
                <a 
                  href="#projects" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-3 py-2 text-brand-muted hover:text-primary hover:bg-brand-bg rounded font-medium"
                >
                  FEATURED WORK
                </a>
                <a 
                  href="#experience" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-3 py-2 text-brand-muted hover:text-primary hover:bg-brand-bg rounded font-medium"
                >
                  MILESTONES
                </a>
                <a 
                  href="#contact" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-3 py-2 text-brand-muted hover:text-primary hover:bg-brand-bg rounded font-medium inline-flex items-center w-full justify-between"
                >
                  <span>GET IN TOUCH</span>
                  <ChevronRight className="w-4 h-4 text-primary" />
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* 2. HERO SECTION */}
      <header id="home" className="relative overflow-hidden bg-white border-b border-brand-border py-16 lg:py-24 bg-grid-pattern bg-grid-animate">
        
        {/* Abstract side graphics representing digital grids and flow parameters */}
        <div className="absolute right-0 top-1/4 w-96 h-96 bg-primary-soft/40 filter blur-3xl opacity-70 pointer-events-none rounded-full animate-float-glow"></div>
        <div className="absolute left-10 bottom-10 w-72 h-72 bg-accent-tech/10 filter blur-2xl opacity-60 pointer-events-none rounded-full animate-float-glow" style={{ animationDelay: '4s' }}></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left side text and headlines */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Specialized tag */}
              <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-primary-soft to-primary/10 border border-primary/20 px-3 py-1 rounded-full text-[10px] font-mono text-primary uppercase tracking-widest font-bold">
                <Sparkles className="w-3.5 h-3.5 mr-1" />
                <span>CYBER-PHYSICAL SYSTEMS SPECIALIST</span>
              </div>

              {/* Title Header */}
              <h1 className="font-display font-medium text-4xl sm:text-5xl lg:text-5xl text-brand-text tracking-tight leading-tight">
                Bridging the Gap Between <br className="hidden sm:inline" />
                <span className="text-primary font-bold">Intelligent Code</span> & <span className="text-accent-tech font-bold">Physical Hardware</span>
              </h1>

              {/* Pitch Context */}
              <p className="text-sm sm:text-base text-brand-muted leading-relaxed max-w-2xl font-sans">
                Informatics engineer specializing in full-cycle analytical systems—spanning precision analogue biopotential frontend design, deterministic RTOS IoT firmware, resilient backend microservices, and neural model forecasting.
              </p>

              {/* Metric stats pill */}
              <div className="grid grid-cols-3 gap-4 border-y border-brand-border py-4 font-mono text-center sm:text-left">
                <div>
                  <span className="block text-2xl font-bold tracking-tight text-neutral-800">5+</span>
                  <span className="text-[10px] uppercase text-brand-muted tracking-wider">Engineering Disciplines</span>
                </div>
                <div>
                  <span className="block text-2xl font-bold tracking-tight text-neutral-800">12M+</span>
                  <span className="text-[10px] uppercase text-brand-muted tracking-wider">Daily Data Ingested</span>
                </div>
                <div>
                  <span className="block text-2xl font-bold tracking-tight text-neutral-800">120dB</span>
                  <span className="text-[10px] uppercase text-brand-muted tracking-wider">Biopotential CMRR</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-wrap gap-4 pt-1">
                <a 
                  href="#projects" 
                  className="flex-1 sm:flex-initial inline-flex items-center justify-center px-5 py-3 text-xs font-mono font-bold bg-brand-dark text-white rounded hover:bg-slate-900 transition-all text-center tracking-wider gap-2 shadow-md hover:shadow-lg"
                >
                  <span>PARS CASE STUDIES</span>
                  <ArrowRight className="w-3.5 h-3.5 text-accent-main" />
                </a>
                
                <a 
                  href="#contact" 
                  className="flex-1 sm:flex-initial inline-flex items-center justify-center px-5 py-3 text-xs font-mono font-bold bg-white text-brand-text border border-brand-border rounded hover:border-brand-muted transition-all text-center tracking-wider"
                >
                  <span>ACQUIRE RESUME</span>
                  <Download className="w-3.5 h-3.5 ml-1.5 text-primary" />
                </a>
              </div>

            </div>

            {/* Right side technical geometric block / CAD PCB WORKBENCH */}
            <div className="lg:col-span-12 xl:col-span-5 flex justify-center mt-8 xl:mt-0">
              <div className="relative w-full max-w-[360px] aspect-square bg-[#040810] rounded-2xl border border-white/10 shadow-2xl overflow-hidden p-5 flex flex-col justify-between">
                
                {/* Board ground grid backing */}
                <div className="absolute inset-0 bg-grid-pattern-dark opacity-20 bg-grid-animate pointer-events-none"></div>
                <div className="absolute top-0 right-0 p-2 text-[7px] font-mono text-slate-600 select-none">GW_EDA_V1.4</div>
                <ApiCodeCard />

                {/* Top Interactive Tabs: Switcher */}
                <div className="border-b border-white/10 pb-3 flex items-center justify-between z-10">
                  <div className="flex bg-slate-900/80 border border-white/10 p-0.5 rounded">
                    <button
                      onClick={() => setHeroView('pcb')}
                      className={`px-2 py-1 rounded text-[9px] font-mono font-bold transition-all cursor-pointer ${
                        heroView === 'pcb' ? 'bg-amber-500 text-slate-950 font-extrabold' : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      PCB DESIGN (CAD)
                    </button>
                    <button
                      onClick={() => setHeroView('system')}
                      className={`px-2 py-1 rounded text-[9px] font-mono font-bold transition-all cursor-pointer ${
                        heroView === 'system' ? 'bg-cyan-600 text-white' : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      TOPOLOGY GRID
                    </button>
                  </div>
                  <span className="text-[8px] font-mono bg-white/5 px-2 py-0.5 rounded text-slate-400 tracking-wider">
                    {heroView === 'pcb' ? 'ALTIUM SUITE' : 'ACTIVE_LOGIC'}
                  </span>
                </div>

                {/* Card Main Area Panel */}
                <div className="my-auto py-2 relative flex flex-col items-center justify-center min-h-[190px]">
                  {heroView === 'system' ? (
                    /* 1. Classic Animated Core & Radial Node network */
                    <div className="w-full h-full relative flex items-center justify-center py-6">
                      <div className="absolute w-44 h-44 rounded-full border border-dashed border-cyan-500/20 animate-[spin_24s_linear_infinite]"></div>
                      <div className="absolute w-32 h-32 rounded-full border border-dashed border-amber-500/10 animate-[spin_12s_linear_infinite_reverse]"></div>

                      <div className="relative w-20 h-20 bg-gradient-to-br from-indigo-950 to-slate-950 border border-cyan-500/40 rounded-xl flex flex-col items-center justify-center shadow-lg shadow-cyan-500/5">
                        <Cpu className="w-8 h-8 text-cyan-400" />
                        <span className="text-[7.5px] font-mono text-cyan-300 mt-1 uppercase tracking-widest">MCU_CORE</span>
                      </div>

                      {[
                        { angle: 0, label: 'DS / ML', color: 'border-primary' },
                        { angle: 72, label: 'ANALYST', color: 'border-accent-tech' },
                        { angle: 144, label: 'BACKEND', color: 'border-accent-main' },
                        { angle: 216, label: 'FIRMWARE', color: 'border-emerald-500' },
                        { angle: 288, label: 'HARDWARE', color: 'border-purple-500' }
                      ].map((node, i) => {
                        const radius = 64;
                        const x = Math.cos((node.angle * Math.PI) / 180) * radius;
                        const y = Math.sin((node.angle * Math.PI) / 180) * radius;
                        
                        return (
                          <div 
                            key={i}
                            className="absolute flex flex-col items-center"
                            style={{ transform: `translate(${x}px, ${y}px)` }}
                          >
                            <div className={`w-3.5 h-3.5 bg-slate-950 border-2 rounded-full flex items-center justify-center cursor-pointer hover:scale-125 transition-all ${node.color}`}>
                              <span className="w-1 h-1 bg-white rounded-full"></span>
                            </div>
                            <span className="text-[7.5px] font-mono text-slate-400 mt-1 uppercase tracking-tight whitespace-nowrap bg-black/40 px-1 py-0.5 rounded">
                              {node.label}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    /* 2. Interactive PCB Design Viewport */
                    <div className="w-full flex items-center gap-4 py-2">
                      
                      {/* Left Side: Layer Selector Menu (EDA style) */}
                      <div className="flex flex-col gap-1.5 bg-slate-950 p-1 rounded border border-white/10 z-10 shrink-0">
                        <span className="text-[7px] font-bold text-slate-500 tracking-wider text-center uppercase border-b border-white/10 pb-0.5 mb-0.5">LAYERS</span>
                        <button
                          onClick={() => setPcbLayer('all')}
                          className={`px-1 text-[8.5px] font-mono font-bold rounded block text-center min-w-[28px] transition-colors cursor-pointer ${
                            pcbLayer === 'all' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/30' : 'text-slate-500 hover:text-slate-300'
                          }`}
                        >
                          ALL
                        </button>
                        <button
                          onClick={() => setPcbLayer('copper')}
                          className={`px-1 text-[8.5px] font-mono font-bold rounded block text-center min-w-[28px] transition-colors cursor-pointer ${
                            pcbLayer === 'copper' ? 'bg-cyan-500/15 text-cyan-400 border border-cyan-500/30' : 'text-slate-500 hover:text-slate-300'
                          }`}
                        >
                          CuFt
                        </button>
                        <button
                          onClick={() => setPcbLayer('silkscreen')}
                          className={`px-1 text-[8.5px] font-mono font-bold rounded block text-center min-w-[28px] transition-colors cursor-pointer ${
                            pcbLayer === 'silkscreen' ? 'bg-white/15 text-white border border-white/30' : 'text-slate-500 hover:text-slate-300'
                          }`}
                        >
                          Silk
                        </button>
                      </div>

                      {/* Right Side: Interactive CAD Map */}
                      <div className="relative flex-grow aspect-[4/3] bg-slate-950/60 rounded-xl border border-white/5 p-2 flex items-center justify-center overflow-hidden">
                        
                        {/* Real SVG Interactive PCB Schematics Layout */}
                        <svg viewBox="0 0 160 120" className="w-full h-auto select-none">
                          {/* Solder Mask pads backing and Ground loops */}
                          <g className="opacity-40">
                            <circle cx="15" cy="15" r="3" fill="#1e293b" stroke="#475569" strokeWidth="0.5" />
                            <circle cx="145" cy="15" r="3" fill="#1e293b" stroke="#475569" strokeWidth="0.5" />
                            <circle cx="15" cy="105" r="3" fill="#1e293b" stroke="#475569" strokeWidth="0.5" />
                            <circle cx="145" cy="105" r="3" fill="#1e293b" stroke="#475569" strokeWidth="0.5" />
                            {/* Ground hatch ring */}
                            <rect x="5" y="5" width="150" height="110" fill="none" stroke="rgba(255, 255, 255, 0.05)" strokeDasharray="3" strokeWidth="1" />
                          </g>

                          {/* 1. COPPER TRACES (F.Cu) */}
                          <g 
                            className={`transition-opacity duration-300 ${
                              pcbLayer === 'silkscreen' ? 'opacity-10' : 'opacity-100'
                            }`}
                          >
                            {/* High-speed differential pair route paths */}
                            <path d="M 30,30 L 45,30 Q 55,30 55,42 L 55,50" fill="none" stroke="#F59E0B" strokeWidth="1.2" strokeLinecap="round" />
                            <path d="M 30,33 L 44,33 Q 52,33 52,42 L 52,50" fill="none" stroke="#06B6D4" strokeWidth="1.2" strokeLinecap="round" />
                            
                            {/* Filter signal coupling route */}
                            <path d="M 125,95 L 125,75 Q 125,60 108,60 L 98,60" fill="none" stroke="#F59E0B" strokeWidth="1.5" strokeLinecap="round" />
                            <path d="M 130,50 L 130,32 Q 130,22 108,22 L 98,22" fill="none" stroke="#06B6D4" strokeWidth="1" strokeLinecap="round" />
                            
                            {/* Vias (connecting layers) */}
                            <circle cx="45" cy="30" r="1.5" fill="#FBF7F0" stroke="#F59E0B" strokeWidth="0.8" />
                            <circle cx="125" cy="75" r="1.5" fill="#FBF7F0" stroke="#F59E0B" strokeWidth="0.8" />
                          </g>

                          {/* 2. WHITE SILKSCREEN LAYER (Silk_Top) */}
                          <g 
                            className={`transition-opacity duration-300 ${
                              pcbLayer === 'copper' ? 'opacity-15' : 'opacity-100'
                            }`}
                          >
                            <text x="75" y="15" fill="rgba(255, 255, 255, 0.4)" fontSize="5.5" fontFamily="monospace" textAnchor="middle">120dB_CMRR_AMP</text>
                            
                            {/* ESD caution symbol */}
                            <path d="M 10,95 L 15,100 L 20,95 Z" fill="none" stroke="rgba(255, 255, 255, 0.3)" strokeWidth="0.5" />
                          </g>

                          {/* 3. INTERACTIVE HARDWARE COMPONENTS */}
                          {/* Centered Microcontroller ESP32 (U1) */}
                          <g 
                            className="cursor-pointer group animate-fade-in"
                            onMouseEnter={() => setActivePcbPart('U1')}
                            onMouseLeave={() => setActivePcbPart(null)}
                          >
                            <rect 
                              x="62" y="38" width="36" height="44" 
                              fill="#111827" 
                              stroke={activePcbPart === 'U1' ? '#F59E0B' : 'rgba(255, 255, 255, 0.2)'} 
                              strokeWidth="1.5" 
                              rx="2"
                              className="transition-all"
                            />
                            {/* Solder Pins surrounding U1 */}
                            {Array.from({ length: 6 }).map((_, idx) => (
                              <g key={idx}>
                                {/* Left pads */}
                                <rect x="58" y={42 + idx * 6} width="4" height="2" fill="#D1D5DB" />
                                {/* Right pads */}
                                <rect x="98" y={42 + idx * 6} width="4" height="2" fill="#D1D5DB" />
                              </g>
                            ))}
                            {/* Text labels */}
                            <text x="80" y="58" fill="white" fontSize="6.5" fontFamily="monospace" textAnchor="middle" fontWeight="bold">U1</text>
                            <text x="80" y="66" fill="rgba(255, 255, 255, 0.4)" fontSize="4.5" fontFamily="monospace" textAnchor="middle" className="group-hover:fill-amber-400">ESP32</text>
                          </g>

                          {/* Twin-T Active Notch Filter Assembly (FL1) */}
                          <g 
                            className="cursor-pointer group animate-fade-in"
                            onMouseEnter={() => setActivePcbPart('FL1')}
                            onMouseLeave={() => setActivePcbPart(null)}
                          >
                            <rect 
                              x="114" y="24" width="22" height="22" 
                              fill="#1E293B" 
                              stroke={activePcbPart === 'FL1' ? '#8B5CF6' : 'rgba(255,255,255,0.15)'} 
                              strokeWidth="1.2" 
                              rx="1.5"
                            />
                            {/* Circular internal filter path and label */}
                            <circle cx="125" cy="35" r="4" fill="none" stroke="rgba(255, 255, 255, 0.15)" strokeWidth="0.8" />
                            <text x="125" y="37" fill="#E2E8F0" fontSize="5.5" fontFamily="monospace" textAnchor="middle" fontWeight="bold">FL1</text>
                            <text x="125" y="43" fill="rgba(255, 255, 255, 0.4)" fontSize="3.5" fontFamily="monospace" textAnchor="middle" className="group-hover:fill-purple-400">NOTCH</text>
                          </g>

                          {/* 10uF Decoupling Capacitor (C1) */}
                          <g 
                            className="cursor-pointer group"
                            onMouseEnter={() => setActivePcbPart('C1')}
                            onMouseLeave={() => setActivePcbPart(null)}
                          >
                            {/* Component footprint outline */}
                            <rect x="22" y="78" width="16" height="10" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="0.5" />
                            {/* Metal terminal plates */}
                            <rect x="24" y="80" width="4" height="6" fill={activePcbPart === 'C1' ? '#EF4444' : '#64748B'} className="transition-colors" />
                            <rect x="32" y="80" width="4" height="6" fill={activePcbPart === 'C1' ? '#22C55E' : '#64748B'} className="transition-colors" />
                            <text x="30" y="74" fill="white" fontSize="5" fontFamily="monospace" textAnchor="middle">C1</text>
                          </g>

                          {/* 10k Bias Pull up resistor (R1) */}
                          <g 
                            className="cursor-pointer group"
                            onMouseEnter={() => setActivePcbPart('R1')}
                            onMouseLeave={() => setActivePcbPart(null)}
                          >
                            <rect x="116" y="82" width="18" height="8" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="0.5" />
                            {/* SMT body */}
                            <rect x="119" y="83" width="12" height="6" fill={activePcbPart === 'R1' ? '#D97706' : '#334155'} rx="0.5" className="transition-colors" />
                            <text x="125" y="77" fill="white" fontSize="5" fontFamily="monospace" textAnchor="middle">R1</text>
                          </g>

                          {/* Blinking Live LED core signal indicator */}
                          <circle cx="20" cy="52" r="2.5" fill="#3B82F6" className="animate-ping" />
                          <circle cx="20" cy="52" r="2" fill="#3949AB" />
                          <text x="28" y="54" fill="rgba(255, 255, 255, 0.4)" fontSize="4.5" fontFamily="monospace">TX_OK</text>
                        </svg>

                      </div>

                    </div>
                  )}
                </div>

                {/* Bottom descriptor drawer context */}
                <div className="border-t border-white/10 pt-3 flex flex-col justify-between text-[10px] font-mono leading-normal min-h-[58px]">
                  {heroView === 'pcb' ? (
                    activePcbPart ? (
                      <div className="space-y-0.5">
                        <span className="text-amber-400 font-extrabold uppercase">CAD COMPONENT: {activePcbPart}</span>
                        <p className="text-slate-300 text-[10.5px] leading-tight">{pcbParts[activePcbPart].name} - {pcbParts[activePcbPart].desc}</p>
                      </div>
                    ) : (
                      <p className="text-slate-500 italic text-[10.5px]">Hover over localized footprints on the circuit layout board to inspect actual CAD routing & hardware specs.</p>
                    )
                  ) : (
                    <div className="flex items-center justify-between text-slate-400 w-full">
                      <div className="flex items-center space-x-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                        <span>INTERCONNECTED CORES</span>
                      </div>
                      <span>CLOCK: 240MHz</span>
                    </div>
                  )}
                </div>

              </div>
            </div>

          </div>
        </div>
      </header>

      {/* 3. ABOUT / PROFILE SECTION */}
      <section id="about" className="py-16 bg-white border-b border-brand-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Visual avatar mockup displaying code and hardware credentials */}
            <div className="lg:col-span-5 flex justify-center order-2 lg:order-1">
              <div className="bg-brand-bg rounded-2xl border border-brand-border p-6 w-full max-w-[360px] space-y-4 shadow-sm relative">
                
                {/* Decorative border tags */}
                <div className="absolute top-2 right-2 text-[8px] font-mono text-brand-muted uppercase">Loc: Bandg, IDN</div>
                
                <div className="flex items-center space-x-3.5 pb-3 border-b border-brand-border">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center border border-primary/20">
                    <Code2 className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-sm tracking-tight">Gadwisan Wira S.</h4>
                    <span className="text-[10px] font-mono text-brand-muted uppercase">Informatics Undergraduate</span>
                  </div>
                </div>

                {/* Profile short detail boxes */}
                <p className="text-xs text-brand-muted leading-relaxed font-sans">
                  "I find immense interest in looking at computers not just as software boxes, but as integrated systems that negotiate signals directly with our environments."
                </p>

                <div className="space-y-2 text-xs font-mono">
                  <div className="flex justify-between py-1.5 border-b border-dashed border-brand-border">
                    <span className="text-brand-muted">Specialization</span>
                    <span className="text-brand-text font-medium">IoT & Intelligent Data</span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-dashed border-brand-border">
                    <span className="text-brand-muted">Core Language</span>
                    <span className="text-brand-text font-medium">Go / Py / C++</span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-dashed border-brand-border">
                    <span className="text-brand-muted">CAD Suite</span>
                    <span className="text-brand-text font-medium">Altium / LTspice</span>
                  </div>
                  <div className="flex justify-between py-1.5">
                    <span className="text-brand-muted">Operational Model</span>
                    <span className="text-emerald-500 font-bold">Ready for Ingestion</span>
                  </div>
                </div>

              </div>
            </div>

            {/* About Narrative Text */}
            <div className="lg:col-span-7 space-y-6 order-1 lg:order-2">
              <span className="text-xs font-mono font-bold text-primary uppercase tracking-widest block">BACKGROUND MATRIX</span>
              
              <h2 className="font-display font-medium text-3xl text-brand-text tracking-tight">
                Architecting at the interface of software analytics and physical execution.
              </h2>
              
              <div className="space-y-4 text-sm text-brand-muted leading-relaxed font-sans">
                <p>
                  As an Informatics student, my journey has been atypical. While traditional computer science curricula focuses extensively on purely abstract virtual models, I sought out the hardware layer beneath: understanding how physics manifests as data inside memory arrays.
                </p>
                <p>
                  This curiosity guided me deeper. Over the past three years, I have engineered multi-tiered solutions bridging five key pillars: from soldering precision analog frontends to capture raw microvolt biological waves, coordinating micro-seconds on ESP32 microcontrollers using FreeRTOS, optimizing Go pipelines handling concurrent payloads, up to constructing predictive deep-learning models.
                </p>
              </div>

            </div>

          </div>

          {/* New Capability Specialty Matrices Section */}
          <div className="mt-16 pt-12 border-t border-brand-border">
            <div className="text-center max-w-2xl mx-auto space-y-2 mb-10">
              <span className="text-xs font-mono font-bold text-primary uppercase tracking-widest block">PILLAR MATRICES</span>
              <h3 className="font-display font-medium text-2xl text-brand-text tracking-tight">Technical Capability Specialties</h3>
              <p className="text-xs text-brand-muted font-sans">
                Core operational capacities demonstrating specialized hardware, signal, firmware, and cloud system engineering.
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  title: "Backend & Systems",
                  desc: "Orchestrating resilient microservices prioritizing low latency and high scalability constraints.",
                  points: ["Go & gRPC Pipelines", "High-Throughput Ingestion", "Redis & PostgreSQL Clustering"],
                  icon: <Cpu className="w-5 h-5 text-primary" />,
                  bg: "from-blue-500/5 to-cyan-500/5 hover:border-blue-300"
                },
                {
                  title: "Embedded Firmware",
                  desc: "Coordinating multi-threaded real-time operations on resource-constrained hardware grids.",
                  points: ["Baremetal C++ / ESP32 & STM32", "Deterministic FreeRTOS schedulers", "Local Kalman sensor smoothing"],
                  icon: <Network className="w-5 h-5 text-accent-tech" />,
                  bg: "from-cyan-500/5 to-emerald-500/5 hover:border-cyan-300"
                },
                {
                  title: "Analytical AI & ML",
                  desc: "Translating hyper-dimensional environment datasets into high-fidelity regression models.",
                  points: ["Deep Neural Networks (PyTorch)", "Temporal Suitability Regressions", "Ensemble Random Forest Modeling"],
                  icon: <BrainCircuit className="w-5 h-5 text-accent-main" />,
                  bg: "from-amber-500/5 to-indigo-500/5 hover:border-amber-300"
                },
                {
                  title: "Electrical & PCB Design",
                  desc: "Routing custom high-density electronics minimizing electromagnetic coupling parameters.",
                  points: ["Altium & KiCad Multi-layer layout", "Active Twin-T Notch systems", "Differential guarding shields"],
                  icon: <Zap className="w-5 h-5 text-purple-500" />,
                  bg: "from-purple-500/5 to-pink-500/5 hover:border-purple-300"
                }
              ].map((card, idx) => (
                <div 
                  key={idx} 
                  className={`bg-white border border-brand-border rounded-xl p-5 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between bg-gradient-to-br ${card.bg}`}
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="font-display font-bold text-sm text-brand-text">{card.title}</h4>
                      <div className="p-2 bg-white rounded-lg border border-brand-border shadow-sm">
                        {card.icon}
                      </div>
                    </div>
                    <p className="text-xs text-brand-muted leading-relaxed font-sans">{card.desc}</p>
                  </div>
                  <ul className="mt-5 pt-4 border-t border-dashed border-brand-border/60 space-y-2">
                    {card.points.map((pt, i) => (
                      <li key={i} className="flex items-center gap-2 text-[10px] font-mono text-slate-600">
                        <span className="w-1.5 h-1.5 bg-brand-muted/40 rounded-full"></span>
                        <span className="truncate">{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* 4. SKILL HIGHLIGHT SECTION */}
      <section id="skills" className="py-16 bg-brand-bg border-b border-brand-border bg-grid-pattern bg-grid-animate">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
            <span className="text-xs font-mono font-bold text-primary uppercase tracking-widest block">COMPETENCY METRIC</span>
            <h2 className="font-display font-medium text-3xl text-brand-text tracking-tight">
              Deep Engineering Capabilities
            </h2>
            <p className="text-xs sm:text-sm text-brand-muted">
              Select one of the five core engineering tracks below to inspect specific languages, metrics, and core focus profiles.
            </p>
          </div>

          {/* Interactive Skill Pillar Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left selector menu pillar tabs */}
            <div className="lg:col-span-5 space-y-2.5">
              {skillsCategories.map((cat) => {
                const isActive = activeCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`w-full text-left p-4 rounded-xl border transition-all flex items-center justify-between group ${
                      isActive 
                        ? 'bg-white border-primary shadow-md' 
                        : 'bg-white/60 hover:bg-white border-brand-border'
                    }`}
                  >
                    <div className="flex items-center space-x-3.5">
                      <div className={`p-2 rounded-lg transition-all ${isActive ? 'bg-primary/10' : 'bg-brand-bg'}`}>
                        {renderCategoryIcon(cat.iconName)}
                      </div>
                      <div>
                        <h4 className="font-display font-medium text-sm text-brand-text transition-colors group-hover:text-primary">
                          {cat.title}
                        </h4>
                        <span className="text-[10px] font-mono text-brand-muted tracking-wide block uppercase mt-0.5">
                          {cat.skills[0].name} & others
                        </span>
                      </div>
                    </div>
                    <ChevronRight className={`w-4 h-4 transition-transform ${isActive ? 'text-primary transform translate-x-1' : 'text-brand-muted'}`} />
                  </button>
                );
              })}
            </div>

            {/* Right categorical detail pane */}
            <div className="lg:col-span-7">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeCategory}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.25 }}
                  className="bg-white rounded-2xl border border-brand-border p-6 sm:p-8 shadow-sm space-y-6 h-full flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    {/* Header */}
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <span className="text-[10px] font-mono text-primary font-bold tracking-widest uppercase">TRACK DE-ANALYSIS</span>
                        <h3 className="font-display font-medium text-xl text-neutral-800">{currentCategoryObj.title}</h3>
                      </div>
                      <div className="p-2 sm:p-3 bg-brand-bg rounded-xl border border-brand-border">
                        {renderCategoryIcon(currentCategoryObj.iconName)}
                      </div>
                    </div>

                    {/* Paragraph */}
                    <p className="text-xs sm:text-sm text-brand-muted leading-relaxed font-sans">
                      {currentCategoryObj.description}
                    </p>

                    {/* Keywords tags */}
                    <div className="flex flex-wrap gap-2 pt-1">
                      {currentCategoryObj.focusKeywords.map((kw, i) => (
                        <span key={i} className="text-[9.5px] font-mono bg-brand-bg px-2.5 py-1 rounded border border-brand-border text-slate-600 uppercase">
                          {kw}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Skills lists stats */}
                  <div className="space-y-4 pt-4 border-t border-brand-border">
                    <span className="text-[10px] font-mono text-brand-muted tracking-widest block uppercase">ESTIMATED COMPILING PROFICIENCY</span>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
                      {currentCategoryObj.skills.map((skill, index) => (
                        <div key={index} className="space-y-1.5">
                          <div className="flex justify-between text-xs font-mono">
                            <span className="text-slate-700 truncate max-w-[200px]">{skill.name}</span>
                            <span className="text-primary font-bold">{skill.level}%</span>
                          </div>
                          <div className="w-full bg-brand-bg rounded-full h-1 overflow-hidden border border-brand-border/40">
                            <motion.div 
                              initial={{ width: 0 }}
                              animate={{ width: `${skill.level}%` }}
                              transition={{ duration: 0.8, delay: index * 0.1 }}
                              className="bg-primary h-full rounded-full"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                </motion.div>
              </AnimatePresence>
            </div>

          </div>
        </div>
      </section>

      {/* 5 & 6. FEATURED PROJECTS SECTION & CASE STUDY ACTIVE PREVIEW */}
      <section id="projects" className="py-16 bg-white border-b border-brand-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section title */}
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
            <span className="text-xs font-mono font-bold text-primary uppercase tracking-widest block">CASE ARCHIVES</span>
            <h2 className="font-display font-medium text-3xl text-brand-text tracking-tight">
              Featured Case Studies
            </h2>
            <p className="text-xs sm:text-sm text-brand-muted">
              Durable engineering prototypes modeled as complete project portfolios. Select one to parse its architectural breakdown and interact with a live hardware/data simulation on-the-spot.
            </p>
          </div>

          {/* Grid of case studies card */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 font-sans">
            {projectsData.map((project) => {
              const isSelected = selectedProjectId === project.id;
              const isFeatured = project.id === 'analog-frontend' || project.id === 'aethersync';
              
              return (
                <div 
                  key={project.id}
                  onClick={() => setSelectedProjectId(project.id)}
                  className={`cursor-pointer rounded-2xl border transition-all flex flex-col justify-between overflow-hidden relative group/card hover:-translate-y-1 hover:shadow-md ${
                    isSelected 
                      ? 'bg-gradient-to-b from-brand-bg to-white border-primary shadow-lg ring-1 ring-primary/30' 
                      : 'bg-white hover:bg-brand-bg/10 border-brand-border shadow-sm'
                  }`}
                >
                  <div 
                    className="h-1.5 w-full" 
                    style={{ backgroundColor: project.accentColor }}
                  />

                  {renderCardThumbnail(project)}

                  <div className="p-5 flex-grow flex flex-col justify-between space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-[10px] font-mono">
                        <span className="text-brand-muted uppercase font-bold tracking-wider">{project.pillar}</span>
                        <div className="flex gap-1">
                          {isFeatured && (
                            <span className="bg-amber-500/10 text-amber-600 border border-amber-500/20 px-1.5 py-0.5 rounded text-[8px] font-bold">
                              FEATURED
                            </span>
                          )}
                          <span className="bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded text-[8px]">PROTOTYPE</span>
                        </div>
                      </div>
                      
                      <h3 className="font-display font-bold text-sm tracking-tight text-brand-text leading-snug group-hover/card:text-primary transition-colors font-bold block mt-1.5">
                        {project.title}
                      </h3>

                      <p className="text-xs text-brand-muted line-clamp-3 leading-relaxed">
                        {project.problem}
                      </p>
                    </div>

                    <div className="space-y-3">
                      <div className="flex flex-wrap gap-1">
                        {project.techStack.slice(0, 3).map((tech, idx) => (
                          <span key={idx} className="text-[9px] font-mono bg-brand-bg px-2 py-0.5 rounded border border-brand-border">
                            {tech}
                          </span>
                        ))}
                        {project.techStack.length > 3 && (
                          <span className="text-[9px] font-mono text-brand-muted px-1.5 py-0.5">
                            +{project.techStack.length - 3}
                          </span>
                        )}
                      </div>

                      <div className="border-t border-brand-border/60 pt-3 flex justify-between items-center">
                        <span className="text-[9px] font-mono text-brand-muted uppercase">Key Benchmark</span>
                        <span className="text-[11px] font-mono font-bold text-neutral-800" style={{ color: project.accentColor }}>
                          {project.metrics[0].value}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="px-5 py-3 border-t border-brand-border bg-brand-bg/50 flex items-center justify-between text-[11px] font-mono text-primary font-bold group-hover/card:bg-primary-soft/30 transition-colors">
                    <span>ANALYZE CASE STUDY</span>
                    <ChevronRight className="w-3.5 h-3.5 group-hover/card:translate-x-1 transition-transform" />
                  </div>
                </div>
              );
            })}
          </div>

          {/* 6. BIG DEEP ANALYSIS PANEL: Interactive Simulator Panel */}
          <div className="mt-12 bg-brand-dark text-white rounded-2xl border border-white/10 overflow-hidden shadow-2xl relative">
            
            {/* Top Bar Terminal Header */}
            <div className="bg-slate-900 px-5 py-3.5 border-b border-white/10 flex flex-wrap items-center justify-between gap-3 font-mono text-xs">
              <div className="flex items-center space-x-2">
                <div className="flex space-x-1">
                  <span className="w-2.5 h-2.5 bg-red-400 rounded-full"></span>
                  <span className="w-2.5 h-2.5 bg-yellow-400 rounded-full"></span>
                  <span className="w-2.5 h-2.5 bg-green-400 rounded-full"></span>
                </div>
                <span className="text-slate-400">|</span>
                <span className="text-accent-tech text-[11px] uppercase tracking-wider font-bold">DEEP_STUDY_SIMULATOR://{activeProject.id}</span>
              </div>
              <div className="flex items-center space-x-3 text-[10px] text-slate-400">
                <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> 2026-06-12</span>
                <span className="bg-white/10 px-2 py-0.5 rounded text-white font-bold">{activeProject.pillar}</span>
              </div>
            </div>

            {/* Content Core splitting */}
            <div className="grid grid-cols-1 lg:grid-cols-12">
              
              {/* Left Column: Narrative Details */}
              <div className="lg:col-span-6 p-6 sm:p-8 space-y-6 border-b lg:border-b-0 lg:border-r border-white/10">
                
                <div className="space-y-1.5">
                  <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block">Structural Breakdown</span>
                  <h3 className="font-display font-medium text-xl sm:text-2xl text-white tracking-tight">{activeProject.title}</h3>
                </div>

                {/* Sub-structures */}
                <div className="space-y-4 text-xs font-sans text-slate-300">
                  <div className="space-y-1">
                    <span className="font-mono text-[10px] text-accent-main uppercase tracking-wider block">1. The Problem Statement</span>
                    <p className="leading-relaxed bg-white/5 p-3 rounded-lg border border-white/5">{activeProject.problem}</p>
                  </div>

                  <div className="space-y-1">
                    <span className="font-mono text-[10px] text-accent-tech uppercase tracking-wider block">2. Deengineered Solution</span>
                    <p className="leading-relaxed">{activeProject.solution}</p>
                  </div>

                  <div className="space-y-1">
                    <span className="font-mono text-[10px] text-emerald-400 uppercase tracking-wider block">3. Operational Result & Impact</span>
                    <p className="leading-relaxed">{activeProject.result} <strong className="text-white">{activeProject.impact}</strong></p>
                  </div>
                </div>

                {/* Metrics Box */}
                <div className="grid grid-cols-3 gap-2.5 pt-3 font-mono border-t border-white/5">
                  {activeProject.metrics.map((metric, i) => (
                    <div key={i} className="bg-slate-900 border border-white/5 p-2 rounded text-center">
                      <span className="text-[8.5px] uppercase text-slate-400 block tracking-tight truncate" title={metric.label}>
                        {metric.label}
                      </span>
                      <span className="text-sm font-bold block mt-1 tracking-tight" style={{ color: activeProject.accentColor }}>
                        {metric.value}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Tech specifications tag list */}
                <div className="space-y-2">
                  <span className="text-[9.5px] font-mono text-slate-400 uppercase tracking-widest block">Target Tool-chain Profile</span>
                  <div className="flex flex-wrap gap-1.5">
                    {activeProject.techStack.map((tech, i) => (
                      <span key={i} className="text-[9px] font-mono bg-white/5 px-2.5 py-1 rounded border border-white/10 text-slate-300">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

              </div>

              {/* Right Column: Dynamic Interactive Playground */}
              <div className="lg:col-span-6 p-6 sm:p-8 bg-[#040912] flex flex-col justify-center">
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                    <span className="flex items-center gap-1"><Code2 className="w-3.5 h-3.5" /> Interactive Sandbox</span>
                    <span className="animate-pulse text-emerald-400 block font-bold text-[9px]">● SIMULATOR LIVE</span>
                  </div>
                  
                  {/* Real visual widget rendered! */}
                  <div className="rounded-xl overflow-hidden relative">
                    {renderInteractiveWidgetBySlug(activeProject.widgetType, activeProject.accentColor)}
                  </div>

                  <p className="text-[10px] font-mono text-slate-400 text-center leading-normal italic">
                    Adjust parameters on the simulation panel to analyze firmware response and sensor algorithms in real-time.
                  </p>
                </div>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* 7. TECH STACK GENERAL DIRECTORY SECTION */}
      <section className="py-16 bg-brand-bg border-b border-brand-border bg-grid-pattern bg-grid-animate">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto space-y-3 mb-10">
            <span className="text-xs font-mono font-bold text-primary uppercase tracking-widest block">STACK_MANIFEST</span>
            <h2 className="font-display font-medium text-3xl text-brand-text tracking-tight">Full System Toolchain</h2>
            <p className="text-xs sm:text-sm text-brand-muted">
              Standardized libraries, languages, and hardware cad platforms I operate across different pipeline boundaries.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {[
              { cat: 'Languages', items: ['Golang', 'Python', 'C / C++', 'TypeScript', 'SQL (Postgres)'] },
              { cat: 'Backend Frameworks', items: ['gRPC Streams', 'FastAPI', 'Express', 'Redis Cache', 'Docker Compose'] },
              { cat: 'Data Stack', items: ['PyTorch ML', 'Scikit-Learn', 'Pandas Ingestion', 'd3.js Visuals', 'Kafka Brokers'] },
              { cat: 'IoT & Firmware', items: ['FreeRTOS Core', 'STM32 Hardware', 'ESP32 Pins', 'MQTT Protocols', 'I2C / SPI Sensors'] },
              { cat: 'PCB & Analog', items: ['Altium layout', 'KiCad Route', 'LTspice CAD', 'Noise Guarding', 'Analog Notch Filter'] }
            ].map((col, idx) => (
              <div key={idx} className="bg-white p-4.5 rounded-xl border border-brand-border space-y-3 shadow-sm hover:shadow-md transition-shadow">
                <span className="text-[10px] font-mono text-primary font-bold uppercase tracking-wider block border-b border-brand-border pb-1.5">
                  {col.cat}
                </span>
                <ul className="space-y-1.5 text-xs font-mono text-brand-muted">
                  {col.items.map((item, id) => (
                    <li key={id} className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 bg-accent-tech rounded-full shrink-0"></span>
                      <span className="truncate">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 8. EXPERIENCE / ACTIVITY TIMELINE SECTION */}
      <section id="experience" className="py-16 bg-white border-b border-brand-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto space-y-3 mb-12">
            <span className="text-xs font-mono font-bold text-primary uppercase tracking-widest block">RUNNING LOG</span>
            <h2 className="font-display font-medium text-3xl text-brand-text tracking-tight">Milestones & Activities</h2>
            <p className="text-xs sm:text-sm text-brand-muted">
              Chronological log of academic studies, enterprise testing cycles, and physical deployments.
            </p>
          </div>

          <div className="max-w-3xl mx-auto relative border-l border-brand-border pl-6 sm:pl-8 space-y-10">
            
            {/* Timeline element 1 */}
            <div className="relative">
              {/* Pulsing indicator node */}
              <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 h-4 w-4 bg-white border-4 border-primary rounded-full z-10"></div>
              
              <div className="bg-brand-bg rounded-xl p-5 border border-brand-border space-y-3 shadow-sm relative overflow-hidden">
                <div className="absolute top-4 right-4 bg-primary/10 border border-primary/20 text-primary font-mono text-[9px] px-2 py-0.5 rounded uppercase font-bold">
                  Active Focus
                </div>

                <div className="space-y-1">
                  <span className="text-xs font-mono text-brand-muted">2023 - Present</span>
                  <h4 className="font-display font-bold text-base text-neutral-800">Informatics Eng. Undergraduate</h4>
                  <p className="text-xs text-slate-500">Institut Teknologi Bandung / High-Performance IoT Stream</p>
                </div>

                <p className="text-xs text-brand-muted leading-relaxed font-sans">
                  Deepening core expertise across Distributed Systems, Signal processing, and Machine Learning. Acting as laboratory researcher on low-power sensory networking architectures and edge inference optimizations.
                </p>
              </div>
            </div>

            {/* Timeline element 2 */}
            <div className="relative">
              <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 h-4 w-4 bg-white border-4 border-accent-tech rounded-full z-10"></div>
              
              <div className="bg-brand-bg rounded-xl p-5 border border-brand-border space-y-3 shadow-sm relative overflow-hidden">
                <div className="absolute top-4 right-4 bg-cyan-100 border border-cyan-200 text-cyan-600 font-mono text-[9px] px-2 py-0.5 rounded uppercase">
                  Deployment
                </div>

                <div className="space-y-1">
                  <span className="text-xs font-mono text-brand-muted">June - Nov 2025</span>
                  <h4 className="font-display font-bold text-base text-neutral-800">Firmware Developer Intern</h4>
                  <p className="text-xs text-slate-500">AeroSystems Telemetry Solutions Indonesia</p>
                </div>

                <p className="text-xs text-brand-muted leading-relaxed font-sans">
                  Developed customized ESP32 / STM32 firmwares based on FreeRTOS schedulers to track aerodynamic ambient anomalies. Implemented dynamic memory pools reducing sensor data dropouts by 40% under poor WAN channel conditions.
                </p>
              </div>
            </div>

            {/* Timeline element 3 */}
            <div className="relative">
              <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 h-4 w-4 bg-white border-4 border-emerald-500 rounded-full z-10"></div>
              
              <div className="bg-brand-bg rounded-xl p-5 border border-brand-border space-y-3 shadow-sm relative overflow-hidden">
                <div className="absolute top-4 right-4 bg-emerald-50 border border-emerald-200 text-emerald-600 font-mono text-[9px] px-2 py-0.5 rounded uppercase">
                  Research
                </div>

                <div className="space-y-1">
                  <span className="text-xs font-mono text-brand-muted">Jan - May 2025</span>
                  <h4 className="font-display font-bold text-base text-neutral-800 font-sans">Applied AI Research Assistant</h4>
                  <p className="text-xs text-slate-500">Agro-Climate Analytics Consortium</p>
                </div>

                <p className="text-xs text-brand-muted leading-relaxed font-sans">
                  Aggregated multi-spectral weather grid matrices. Designed mathematical classifiers predicting localized soil moisture indexes from optical reflectance signatures, improving local smallholders crop rotation success.
                </p>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 9. CONTACT CTA SECTION */}
      <section id="contact" className="py-20 bg-brand-dark text-white relative overflow-hidden border-t border-white/10 bg-grid-pattern-dark bg-grid-animate">
        
        {/* Abstract background graphics */}
        <div className="absolute top-1/4 left-1/3 w-80 h-80 bg-accent-tech/5 filter blur-3xl rounded-full pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Left side text details */}
            <div className="lg:col-span-5 space-y-6">
              
              <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full text-[10px] font-mono text-emerald-400 font-bold tracking-widest uppercase">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>AVAILABLE FOR COLLABORATION // SECURE HANDSHAKE</span>
              </div>
              
              <h2 className="font-display font-medium text-3xl text-white tracking-tight">
                Synchronize on a Project.
              </h2>
              
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-sans">
                I am actively seeking professional collaboration invitations, embedded/full-stack developer opportunities, and research partnerships. Send a dynamic message down our portal or coordinate via email:
              </p>

              {/* Direct connectors indicators */}
              <div className="space-y-3 text-xs font-mono">
                
                <div className="flex items-center gap-3 bg-slate-900 border border-white/5 p-3 rounded-xl">
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center border border-primary/30">
                    <Mail className="w-4 h-4 text-cyan-400" />
                  </div>
                  <div>
                    <span className="text-[9px] text-slate-500 uppercase block leading-none">Primary Mail</span>
                    <a href="mailto:gadwisan07@gmail.com" className="text-slate-200 hover:text-cyan-400 font-bold mt-0.5 inline-block transition-colors">
                      gadwisan07@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3 bg-slate-900 border border-white/5 p-3 rounded-xl">
                  <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center border border-emerald-500/30">
                    <MapPin className="w-4 h-4 text-emerald-400" />
                  </div>
                  <div>
                    <span className="text-[9px] text-slate-500 uppercase block leading-none">Geographic Node</span>
                    <span className="text-slate-200 font-bold mt-0.5 inline-block">Bandung, West Java, Indonesia IND</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 bg-slate-900 border border-white/5 p-3 rounded-xl">
                  <div className="w-8 h-8 rounded-full bg-indigo-500/20 flex items-center justify-center border border-indigo-500/30">
                    <Linkedin className="w-4 h-4 text-indigo-400" />
                  </div>
                  <div>
                    <span className="text-[9px] text-slate-500 uppercase block leading-none">Professional Registry</span>
                    <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-slate-200 hover:text-cyan-400 font-bold mt-0.5 inline-block flex items-center gap-1 transition-colors">
                      <span>linkedin.com/in/gadwisan-wira</span>
                      <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
                    </a>
                  </div>
                </div>

              </div>
            </div>

            {/* Right side contact form with real-time success logger */}
            <div className="lg:col-span-7">
              <div className="bg-[#040914]/90 rounded-2xl border border-white/10 p-5 sm:p-6 shadow-2xl space-y-6">
                
                <div className="border-b border-white/10 pb-3 flex items-center justify-between">
                  <h4 className="font-display font-medium text-base text-slate-200">Dynamic Ingestion Console</h4>
                  <span className="text-[9.5px] font-mono bg-white/5 px-2 py-0.5 rounded border border-white/5 text-slate-400">MODE: REAL-TIME SECURE</span>
                </div>

                {/* Real interactive message submission form */}
                <form onSubmit={handleContactSubmit} className="space-y-4">
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">1. Origin Ident (Your Name) <span className="text-primary">*</span></label>
                      <input 
                        type="text" 
                        required
                        value={formName}
                        onChange={(e) => setFormName(e.target.value)}
                        placeholder="e.g. Dr. Howard, PhD"
                        className="w-full text-xs font-mono bg-slate-900 border border-white/10 rounded-lg p-2.5 text-slate-200 focus:outline-none focus:ring-1 focus:ring-accent-tech focus:bg-slate-950 focus:border-cyan-500/50"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">2. Return Route (Your Email) <span className="text-primary">*</span></label>
                      <input 
                        type="email" 
                        required
                        value={formEmail}
                        onChange={(e) => setFormEmail(e.target.value)}
                        placeholder="e.g. client@research.org"
                        className="w-full text-xs font-mono bg-slate-900 border border-white/10 rounded-lg p-2.5 text-slate-200 focus:outline-none focus:ring-1 focus:ring-accent-tech focus:bg-slate-950 focus:border-cyan-500/50"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block font-sans">3. Transaction Subject / Topic Header</label>
                    <input 
                      type="text" 
                      value={formSubject}
                      onChange={(e) => setFormSubject(e.target.value)}
                      placeholder="e.g. Fast-transiting IoT valve architecture collaboration proposal"
                      className="w-full text-xs font-mono bg-slate-900 border border-white/10 rounded-lg p-2.5 text-slate-200 focus:outline-none focus:ring-1 focus:ring-accent-tech focus:bg-slate-950 focus:border-cyan-500/50"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">4. Payload Message Block <span className="text-primary">*</span></label>
                    <textarea 
                      required
                      value={formMessage}
                      onChange={(e) => setFormMessage(e.target.value)}
                      rows={4}
                      placeholder="Input complete textual metrics, schedules, or architectural requirements you have..."
                      className="w-full text-xs font-mono bg-slate-900 border border-white/10 rounded-lg p-2.5 text-slate-200 focus:outline-none focus:ring-1 focus:ring-accent-tech focus:bg-slate-950 focus:border-cyan-500/50"
                    />
                  </div>

                  {/* Submission success popup in form */}
                  <AnimatePresence>
                    {formSuccess && (
                      <motion.div 
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -5 }}
                        className="bg-emerald-950/45 text-emerald-300 border border-emerald-500/20 text-xs p-3.5 rounded-lg flex items-start gap-2.5 leading-snug"
                      >
                        <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                        <div>
                          <strong className="block text-emerald-200 font-bold">Trace Handshake Successful!</strong>
                          <span>Your payload is compiled and synchronized inside our Local Storage cache board. Scroll below to view your logs.</span>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <button 
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 px-4 rounded-lg bg-primary hover:bg-opacity-95 text-white font-mono text-xs font-bold transition-all flex items-center justify-center gap-2 shadow hover:shadow-md cursor-pointer disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <>
                        <Clock className="w-4 h-4 animate-spin" />
                        <span>INGESTING PAYLOAD...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4 text-accent-tech" />
                        <span>DISPATCH DIRECT MESSAGES</span>
                      </>
                    )}
                  </button>

                </form>

                {/* Local Messages Logger Desk (Interactive Proof of Local Persistence) */}
                <div className="border-t border-white/5 pt-5 space-y-3.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block font-bold">Compiled Local Logs</span>
                    <span className="text-[9.5px] font-mono bg-white/5 px-2 rounded border border-white/5 text-slate-400">Total: {savedMessages.length}</span>
                  </div>

                  {savedMessages.length === 0 ? (
                    <div className="p-4 rounded-lg border border-dashed border-white/5 bg-slate-900/40 text-center text-xs text-slate-500 italic">
                      No dry-run messages logged. Dispatch a dynamic message above to see local persistent storage arrays update.
                    </div>
                  ) : (
                    <div className="space-y-2.5 max-h-48 overflow-y-auto pr-1">
                      {savedMessages.map((msg: any) => (
                        <div key={msg.id} className="p-3 bg-slate-900/60 border border-white/5 rounded-lg text-xs space-y-1.5 relative">
                          <button
                            onClick={() => deleteMessage(msg.id)}
                            className="absolute top-2.5 right-2.5 text-[10px] font-mono text-red-400 hover:text-red-300 hover:underline cursor-pointer font-bold"
                            title="Purge message record"
                          >
                            PURGE
                          </button>
                          
                          <div className="flex flex-wrap items-center gap-2 font-mono text-[10px] text-slate-500">
                            <span className="font-bold text-slate-300">{msg.name}</span>
                            <span>&lt;{msg.email}&gt;</span>
                            <span>| {new Date(msg.timestamp).toLocaleTimeString()}</span>
                          </div>

                          <p className="text-slate-300 leading-normal font-sans"><strong className="text-white block text-xs font-display">{msg.subject}</strong>{msg.message}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 10. FOOTER SECTION */}
      <footer className="bg-brand-dark text-white py-12 px-4 border-t border-white/10 mt-auto bg-grid-pattern-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 border-b border-white/5 pb-8">
            <div className="text-center md:text-left space-y-1.5">
              <div className="flex items-center justify-center md:justify-start space-x-2">
                <span className="font-display font-bold text-base tracking-tight text-white">GADWISAN WIRA</span>
                <span className="text-[10px] font-mono text-accent-tech px-2 py-0.5 rounded bg-white/10 uppercase">Cyber-Physical</span>
              </div>
              <p className="text-xs text-slate-400 font-sans max-w-sm">
                Engineering intelligent hardware, RTOS core firmwares, metrics parsing, and cloud-scale infrastructure.
              </p>
            </div>

            {/* Social credentials links */}
            <div className="flex gap-4">
              <a 
                href="https://github.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-10 h-10 bg-white/5 hover:bg-white/15 border border-white/10 rounded-full flex items-center justify-center text-slate-300 hover:text-white transition-colors"
                title="GitHub Source Repositories"
              >
                <Github className="w-4 h-4" />
              </a>

              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-10 h-10 bg-white/5 hover:bg-white/15 border border-white/10 rounded-full flex items-center justify-center text-slate-300 hover:text-white transition-colors"
                title="LinkedIn Business Profile"
              >
                <Linkedin className="w-4 h-4" />
              </a>

              <a 
                href="mailto:gadwisan07@gmail.com" 
                className="w-10 h-10 bg-white/5 hover:bg-white/15 border border-white/10 rounded-full flex items-center justify-center text-slate-300 hover:text-white transition-colors"
                title="Direct Ingestion Mail Gateway"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-[11px] font-mono text-slate-500">
            <div>
              <span>&copy; {new Date().getFullYear()} GADWISAN WIRA. ALL RIGHTS RESERVED.</span>
            </div>
            <div className="flex gap-4">
              <span>DESIGN PROTOCOL: V2.1.2</span>
              <span>INDEX: UTC-07:00</span>
            </div>
          </div>

        </div>
      </footer>

    </div>
  );
}
