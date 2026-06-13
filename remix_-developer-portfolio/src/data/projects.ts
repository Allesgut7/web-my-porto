export interface ProjectCaseStudy {
  id: string;
  title: string;
  pillar: 'Data Science' | 'Data Analyst' | 'Backend Development' | 'IoT' | 'Electrical / Embedded';
  problem: string;
  solution: string;
  techStack: string[];
  metrics: { label: string; value: string }[];
  result: string;
  impact: string;
  widgetType: 'climate' | 'telemetry' | 'broker' | 'hydroponics' | 'analog';
  accentColor: string;
}

export const projectsData: ProjectCaseStudy[] = [
  {
    id: 'analog-frontend',
    title: 'Precision Low-Noise Bio-Potential Frontend',
    pillar: 'Electrical / Embedded',
    problem: 'Microvolt ECG/EMG bio-signals are easily submerged in high-frequency electromagnetic fields and ubiquitous 50Hz electrical hums.',
    solution: 'Designed and routed a custom analog amplifier circuit featuring a high-impedance instrumentation amplifier input layout, 50Hz notch filter, and battery-isolated ground planes.',
    techStack: ['Altium Designer', 'LTspice CAD', 'Operational Amplifier Topologies', 'Noise Guarding', 'PCB Prototyping'],
    metrics: [
      { label: 'CMRR Signal Attenuation', value: '120 dB' },
      { label: 'Input Noise Floor', value: '<5µV' },
      { label: 'Isolated Voltage Loop', value: '±5V' }
    ],
    result: 'Designed and manufactured a 4-layer PCB prototype characterized by low internal leakage currents, keeping sensor lines completely shielded from layout crosstalk.',
    impact: 'Supplied clinical-grade analog processing feeds directly into standard STM32/ESP32 ADCs without active DSP overhead.',
    widgetType: 'analog',
    accentColor: '#8B5CF6' // purple
  },
  {
    id: 'smart-hydroponics',
    title: 'BioGrid: Smart Hydroponics Control Unit',
    pillar: 'IoT',
    problem: 'Conventional commercial timers are fragile and lack failsafe execution loops when local WAN connections fail, jeopardizing sensitive pH/EC nutrient feeding profiles.',
    solution: 'Authored C++ firmware targeting dual ESP32 cores with a FreeRTOS runtime implementing Kalman signal smoothing and localized state backups within flash EEPROM.',
    techStack: ['ESP32', 'FreeRTOS', 'C++', 'MQTT', 'I2C', 'Hardware ADC calibration'],
    metrics: [
      { label: 'Continuous Uptime', value: '99.98%' },
      { label: 'Sensory Drift Reduction', value: '40%' },
      { label: 'Backup State Recoveries', value: 'Instant' }
    ],
    result: 'Designed a system that monitors pH sensors, dynamic water temperature, and schedules pump valves autonomously without cloud dependence.',
    impact: 'Created complete sensory and electrical isolation barriers, preventing crop ruins because of unexpected network drops.',
    widgetType: 'hydroponics',
    accentColor: '#059669' // emerald
  },
  {
    id: 'crop-yield',
    title: 'Predictive Crop-Yield & Climate Modeler',
    pillar: 'Data Science',
    problem: 'Smallholders struggle with micro-climate unpredictability, resulting in sub-optimal crop rotation and up to 40% yield loss in unmonitored regions.',
    solution: 'Designed and trained an ensemble model (Random Forest + LSTM) integrating satellite SAR spectral bands, soil moisture, and historical weather, deployed via a high-performance Python inference API.',
    techStack: ['Python', 'PyTorch', 'Scikit-Learn', 'FastAPI', 'Pandas', 'NumPy'],
    metrics: [
      { label: 'Prediction Accuracy', value: '89.4%' },
      { label: 'Inference Latency', value: '<45ms' },
      { label: 'Communities Impacted', value: '200+' }
    ],
    result: 'Successfully mapped crop suitability grids down to 10m x 10m agricultural resolutions, adjusting predicted soil matrices against transient rainfall forecasts.',
    impact: 'Optimized local water allocations by 15% and increased total seasonal harvests for pilot communities.',
    widgetType: 'climate',
    accentColor: '#1D4ED8' // blue
  },
  {
    id: 'smart-city',
    title: 'IoT Smart City Telemetry Analytics',
    pillar: 'Data Analyst',
    problem: 'Collecting particulate telemetry across high-density urban areas caused processing overflows, and municipal planners lacked clear visualization of air quality trends.',
    solution: 'Engineered an end-to-end telemetry pipeline utilizing Kafka to ingestion, PostgreSQL for cold storage, and designed high-fidelity interactive Recharts dashboards to track pollutant spatial trends.',
    techStack: ['React', 'Recharts', 'd3.js', 'Apache Kafka', 'PostgreSQL', 'Tailwind CSS'],
    metrics: [
      { label: 'Records Processed / Day', value: '12 Million' },
      { label: 'Latency from Sensor data', value: '1.2s' },
      { label: 'Identified Choke Points', value: '4 Districts' }
    ],
    result: 'Analyzed temporal PM2.5, PM10, and noise sensor datasets over a 6-month period, resolving massive spikes in the financial district and dense arterial intersections.',
    impact: 'Identified 4 distinct high-pollution congestion locations, delivering vital analytics that helped justify a green bypass zone project proposal.',
    widgetType: 'telemetry',
    accentColor: '#06B6D4' // cyan
  },
  {
    id: 'aethersync',
    title: 'AetherSync: High-Throughput IoT Broker',
    pillar: 'Backend Development',
    problem: 'Standard HTTP REST frameworks struggled to orchestrate thousands of concurrent micro-greenhouse valve operations under sub-100ms deadlines.',
    solution: 'Architected a lightweight event-driven TCP/gRPC gateway in Go representing custom telemetry buffers, leveraging Redis in-memory storage and dynamic JWT verification to secure valve commands.',
    techStack: ['Go (Golang)', 'gRPC', 'Redis', 'Docker', 'PostgreSQL', 'Prometheus'],
    metrics: [
      { label: 'Throughput', value: '50k req/s' },
      { label: 'Avg Latency', value: '4.2ms' },
      { label: 'Idle Memory Usage', value: '<24MB' }
    ],
    result: 'Replaced traditional polling bottlenecks with bidirectional streaming channels, allowing server units to push state updates instantly.',
    impact: 'Reduced overall micro-controller server bill footprints by 65% while ensuring guaranteed delivery of valve override signals.',
    widgetType: 'broker',
    accentColor: '#D97706' // amber dark/orange
  }
];
