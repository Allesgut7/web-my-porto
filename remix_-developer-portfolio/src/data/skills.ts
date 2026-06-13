export interface SkillItem {
  name: string;
  level: number; // 1-100%
  category: string;
}

export interface SkillCategory {
  id: string;
  title: string;
  iconName: string; // Map to lucide-react name
  description: string;
  focusKeywords: string[];
  skills: SkillItem[];
}

export const skillsCategories: SkillCategory[] = [
  {
    id: 'datascience',
    title: 'Data Science',
    iconName: 'BrainCircuit',
    description: 'Developing mathematical and statistical classifiers to estimate real-world phenomena. Translating dense spectral sensor feeds into predictive inference layers.',
    focusKeywords: ['Predictive Modeling', 'Machine Learning', 'Time-series Forecasting', 'Pipelining'],
    skills: [
      { name: 'PyTorch / Neural Networks', level: 88, category: 'datascience' },
      { name: 'Scikit-Learn Ensemble Models', level: 92, category: 'datascience' },
      { name: 'Pandas & ML Data Ingestion', level: 95, category: 'datascience' },
      { name: 'LSTM Forecasting Arrays', level: 84, category: 'datascience' }
    ]
  },
  {
    id: 'dataanalyst',
    title: 'Data Analyst & BI',
    iconName: 'BarChart3',
    description: 'De-segregating high-frequency database entries into unified dimensional models. Rendering analytical queries into real-time visual streams.',
    focusKeywords: ['Telemetry Dashboarding', 'Spatial Analysis', 'SQL Wrangling', 'd3.js Rendering'],
    skills: [
      { name: 'd3.js / SVG Data Interfaces', level: 85, category: 'dataanalyst' },
      { name: 'SQL Query Optimization', level: 90, category: 'dataanalyst' },
      { name: 'Grafana & Prometheus Metrics', level: 88, category: 'dataanalyst' },
      { name: 'Dimensional Schema Modeling', level: 82, category: 'dataanalyst' }
    ]
  },
  {
    id: 'backend',
    title: 'Backend Development',
    iconName: 'Cpu',
    description: 'Architecting network logic prioritizing sub-10ms transactional boundaries. Developing memory-efficient, concurrent handlers capable of sustained event ingestion.',
    focusKeywords: ['gRPC & WebSockets', 'Event-Driven Systems', 'Distributed Cache', 'Concurrency'],
    skills: [
      { name: 'Go / Goroutine Concurrency', level: 91, category: 'backend' },
      { name: 'FastAPI / Caching Architectures', level: 94, category: 'backend' },
      { name: 'Redis / PostgreSQL Systems', level: 89, category: 'backend' },
      { name: 'Kafka Messengers & Docker', level: 86, category: 'backend' }
    ]
  },
  {
    id: 'iot',
    title: 'IoT & Firmware Systems',
    iconName: 'Network',
    description: 'Writing deterministic multi-threaded C++ firmware for microprocessor hardware. Coordinating dynamic peripheral interfaces and communication channels.',
    focusKeywords: ['C++ Microcontrollers', 'FreeRTOS Tasks', 'Serial Communication', 'Kalman Filtering'],
    skills: [
      { name: 'ESP32 / STM32 Baremetal C++', level: 90, category: 'iot' },
      { name: 'FreeRTOS Task Synchronization', level: 85, category: 'iot' },
      { name: 'MQTT / I2C / SPI Communication', level: 92, category: 'iot' },
      { name: 'Low-Power Sleep Optimization', level: 80, category: 'iot' }
    ]
  },
  {
    id: 'electrical',
    title: 'Electrical & Embedded Hardware',
    iconName: 'Zap',
    description: 'Routing high-speed multi-layer component topologies, suppressing EMI/RFI ambient coupling, and designing analog filter pathways to capture raw microvolt biological waves.',
    focusKeywords: ['Multilayer PCB Layout', 'LTspice CAD Modeling', 'Signal Integrity (SI)', 'Instrumentation Amps', '120dB Common Mode Rejection'],
    skills: [
      { name: 'Altium Designer & KiCad Multi-layer PCB Layout', level: 96, category: 'electrical' },
      { name: 'LTspice circuit simulation & SPICE modeling', level: 92, category: 'electrical' },
      { name: 'Analog Active Filters (Twin-T Notch, ButterWorth)', level: 94, category: 'electrical' },
      { name: 'Differential Guarding & Ground Plane Isolation', level: 91, category: 'electrical' }
    ]
  }
];
