import React, { useState, useEffect, useRef } from 'react';
import { 
  Play, 
  Pause, 
  RefreshCw, 
  Cpu, 
  Database, 
  Activity, 
  AlertCircle, 
  TrendingUp, 
  Sliders, 
  Waves,
  Wifi,
  WifiOff,
  Radio,
  Layers,
  CheckCircle2,
  Filter
} from 'lucide-react';

interface WidgetProps {
  accentColor: string;
}

// 1. CLIMATE CROP-YIELD MODELER WIDGET
export const ClimateWidget: React.FC<WidgetProps> = ({ accentColor }) => {
  const [temperature, setTemperature] = useState<number>(24); // °C
  const [moisture, setMoisture] = useState<number>(55); // %
  const [nutrient, setNutrient] = useState<number>(70); // NPK index %
  const [activeCrop, setActiveCrop] = useState<string>('Maize');

  // Multipliers & yield calculation
  const getYieldIndex = () => {
    // Optimal values: Temp = 25, Moisture = 60, Nutrient = 80
    const tempFactor = 1 - Math.min(Math.abs(temperature - 25) / 30, 0.5);
    const moistFactor = 1 - Math.min(Math.abs(moisture - 60) / 70, 0.5);
    const nutrFactor = 0.5 + (nutrient / 200);
    
    const cropModifier = activeCrop === 'Maize' ? 1.0 : activeCrop === 'Rice' ? 1.15 : 0.9;
    const rawYield = 85 * tempFactor * moistFactor * nutrFactor * cropModifier;
    return Math.min(Math.round(rawYield), 100);
  };

  const yieldIndex = getYieldIndex();

  return (
    <div className="p-5 bg-brand-dark/95 text-white rounded-xl border border-white/10 shadow-2xl space-y-6">
      <div className="flex items-center justify-between border-b border-white/10 pb-3">
        <div className="flex items-center space-x-2">
          <Layers className="w-5 h-5 text-accent-tech animate-pulse" />
          <h4 className="font-display font-medium text-sm tracking-wider uppercase text-slate-300">Climate Model Simulator</h4>
        </div>
        <span className="text-[10px] font-mono bg-white/10 px-2 py-0.5 rounded text-slate-400">Model: RF-LSTM Ensemble</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Controls */}
        <div className="space-y-4">
          <h5 className="text-xs font-mono text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
            <Sliders className="w-3.5 h-3.5 text-accent-main" /> Live Parameter Matrices
          </h5>

          {/* Crop Selector */}
          <div className="flex gap-2">
            {['Maize', 'Rice', 'Wheat'].map((crop) => (
              <button
                key={crop}
                onClick={() => setActiveCrop(crop)}
                className={`flex-1 py-1 px-2 rounded font-display text-xs border transition-all ${
                  activeCrop === crop 
                    ? 'bg-primary text-white border-primary' 
                    : 'bg-white/5 text-slate-400 border-white/10 hover:border-white/25'
                }`}
              >
                {crop}
              </button>
            ))}
          </div>

          {/* Temperature Slider */}
          <div className="space-y-1">
            <div className="flex justify-between text-xs font-mono">
              <span className="text-slate-400">Ambient Temperature</span>
              <span className="text-accent-main font-medium">{temperature}°C</span>
            </div>
            <input
              type="range"
              min="10"
              max="40"
              value={temperature}
              onChange={(e) => setTemperature(parseInt(e.target.value))}
              className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-accent-main"
            />
          </div>

          {/* Humidity/Moisture Slider */}
          <div className="space-y-1">
            <div className="flex justify-between text-xs font-mono">
              <span className="text-slate-400">Soil Moisture (SAR Estimated)</span>
              <span className="text-accent-tech font-medium">{moisture}%</span>
            </div>
            <input
              type="range"
              min="20"
              max="90"
              value={moisture}
              onChange={(e) => setMoisture(parseInt(e.target.value))}
              className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-accent-tech"
            />
          </div>

          {/* NPK index Slider */}
          <div className="space-y-1">
            <div className="flex justify-between text-xs font-mono">
              <span className="text-slate-400">Nutrient Aggregation (NPK Index)</span>
              <span className="text-emerald-400 font-medium">{nutrient}%</span>
            </div>
            <input
              type="range"
              min="30"
              max="100"
              value={nutrient}
              onChange={(e) => setNutrient(parseInt(e.target.value))}
              className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-400"
            />
          </div>
        </div>

        {/* Prediction Output */}
        <div className="flex flex-col items-center justify-center bg-white/5 rounded-xl border border-white/10 p-4 relative overflow-hidden">
          {/* Subtle grid backing line */}
          <div className="absolute inset-0 bg-grid-pattern-dark opacity-10 pointer-events-none"></div>
          
          <span className="text-[11px] font-mono text-slate-400 uppercase tracking-widest mb-2 z-10">Forecast Yield Index</span>
          
          {/* Circular Progress Gauge */}
          <div className="relative w-36 h-36 flex items-center justify-center z-10">
            <svg className="absolute w-full h-full transform -rotate-95">
              <circle
                cx="72"
                cy="72"
                r="60"
                className="stroke-slate-800"
                strokeWidth="8"
                fill="none"
              />
              <circle
                cx="72"
                cy="72"
                r="60"
                stroke={accentColor}
                strokeWidth="8"
                fill="none"
                strokeDasharray={377}
                strokeDashoffset={377 - (377 * (yieldIndex / 100))}
                className="transition-all duration-500 ease-out"
                strokeLinecap="round"
              />
            </svg>
            <div className="text-center space-y-0.5">
              <span className="text-4xl font-display font-bold font-mono text-white tracking-tighter">{yieldIndex}%</span>
              <p className="text-[10px] font-mono text-slate-400 uppercase">Output Index</p>
            </div>
          </div>

          <div className="mt-4 flex items-center justify-between w-full text-xs font-mono border-t border-white/10 pt-3 z-10">
            <span className="text-slate-400">Confidence Score:</span>
            <span className="text-emerald-400 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> 92.4% Optimal
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};


// 2. METADATA TELEMETRY ANALYTICS WIDGET
interface DistrictData {
  name: string;
  pm25: number;
  pm10: number;
  noise: number;
  traffic: number;
  coordinates: string; // SVG path
}

export const TelemetryWidget: React.FC<WidgetProps> = () => {
  const districts: DistrictData[] = [
    { name: 'Central Commercial Area', pm25: 78, pm10: 92, noise: 85, traffic: 90, coordinates: 'M 10 10 L 110 10 L 90 70 L 10 70 Z' },
    { name: 'Industrial Hub Sector 4', pm25: 120, pm10: 145, noise: 75, traffic: 65, coordinates: 'M 115 10 L 210 10 L 210 90 L 95 70 Z' },
    { name: 'Arterial Interchange North', pm25: 95, pm10: 105, noise: 92, traffic: 95, coordinates: 'M 10 75 L 90 75 L 110 170 L 10 170 Z' },
    { name: 'Waterfront Residential Ring', pm25: 35, pm10: 45, noise: 40, traffic: 30, coordinates: 'M 95 75 L 210 95 L 210 170 L 115 170 Z' }
  ];

  const [selectedDistrict, setSelectedDistrict] = useState<number>(0);
  const district = districts[selectedDistrict];

  // Helper for progress bars
  const getAqiColor = (val: number) => {
    if (val <= 50) return 'rgba(16, 185, 129, 0.85)'; // Green
    if (val <= 100) return 'rgba(245, 158, 11, 0.85)'; // Amber
    return 'rgba(239, 68, 68, 0.85)'; // Red
  };

  return (
    <div className="p-5 bg-brand-dark/95 text-white rounded-xl border border-white/10 shadow-2xl space-y-6">
      <div className="flex items-center justify-between border-b border-white/10 pb-3">
        <div className="flex items-center space-x-2">
          <TrendingUp className="w-5 h-5 text-accent-tech animate-pulse" />
          <h4 className="font-display font-medium text-sm tracking-wider uppercase text-slate-300">Spatial Air Quality Tracker</h4>
        </div>
        <span className="text-[10px] font-mono bg-white/10 px-2 py-0.5 rounded text-slate-400">Data Stream: 60s Average</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        {/* District Map Interactive Graphic */}
        <div className="space-y-3">
          <span className="text-xs font-mono text-slate-400 uppercase tracking-widest block">Interactive Spatial Distribution Grid</span>
          
          <div className="bg-slate-900 border border-white/10 rounded-lg p-3 flex justify-center">
            <svg viewBox="0 0 220 180" className="w-full max-w-[280px] h-auto">
              {districts.map((dist, idx) => (
                <g 
                  key={idx} 
                  className="cursor-pointer transition-all duration-300 group"
                  onClick={() => setSelectedDistrict(idx)}
                >
                  <path
                    d={dist.coordinates}
                    stroke="rgba(255, 255, 255, 0.25)"
                    strokeWidth={selectedDistrict === idx ? "2.5" : "1"}
                    fill={selectedDistrict === idx ? 'rgba(6, 182, 212, 0.3)' : 'rgba(255, 255, 255, 0.04)'}
                    className="hover:fill-cyan-500/20 hover:stroke-cyan-400 transition-all"
                  />
                  {/* Glowing Node Marker */}
                  <circle
                    cx={idx === 0 ? "55" : idx === 1 ? "150" : idx === 2 ? "55" : "155"}
                    cy={idx === 0 ? "40" : idx === 1 ? "45" : idx === 2 ? "120" : "130"}
                    r="4"
                    fill={getAqiColor(dist.pm25)}
                    className="animate-pulse"
                  />
                  {/* Label tooltip */}
                  <text
                    x={idx === 0 ? "35" : idx === 1 ? "120" : idx === 2 ? "30" : "120"}
                    y={idx === 0 ? "25" : idx === 1 ? "30" : idx === 2 ? "155" : "155"}
                    fill="#94A3B8"
                    fontSize="7"
                    fontFamily="monospace"
                    className="pointer-events-none opacity-50 group-hover:opacity-100 transition-opacity"
                  >
                    D{idx + 1}
                  </text>
                </g>
              ))}
            </svg>
          </div>
          <p className="text-[10px] text-slate-400 italic text-center">Click sections in the interactive schematic map above to parse metrics</p>
        </div>

        {/* Breakdown Panel */}
        <div className="bg-white/5 rounded-xl border border-white/10 p-5 space-y-4">
          <div className="space-y-1">
            <span className="text-[10px] font-mono text-accent-tech block tracking-wider uppercase">Active Station Telemetry</span>
            <h5 className="font-display font-medium text-sm text-white truncate">{district.name}</h5>
          </div>

          <div className="grid grid-cols-2 gap-3 pb-3 border-b border-white/10">
            <div className="bg-slate-900/60 p-2.5 rounded border border-white/5 text-center">
              <span className="text-[10px] font-mono text-slate-400 block uppercase">PM2.5 Sensor</span>
              <span className="text-xl font-mono font-bold tracking-tight text-white mt-0.5 block">{district.pm25} µg/m³</span>
              <span className="text-[9px] font-sans px-1 rounded inline-block mt-1 font-medium" style={{ backgroundColor: getAqiColor(district.pm25) + '20', color: getAqiColor(district.pm25) }}>
                {district.pm25 <= 50 ? 'Healthy' : district.pm25 <= 100 ? 'Moderate' : 'Unhealthy'}
              </span>
            </div>

            <div className="bg-slate-900/60 p-2.5 rounded border border-white/5 text-center">
              <span className="text-[10px] font-mono text-slate-400 block uppercase">PM10 Sensor</span>
              <span className="text-xl font-mono font-bold tracking-tight text-white mt-0.5 block">{district.pm10} µg/m³</span>
              <span className="text-[9px] font-sans px-1 rounded inline-block mt-1 font-medium" style={{ backgroundColor: getAqiColor(district.pm10) + '20', color: getAqiColor(district.pm10) }}>
                {district.pm10 <= 50 ? 'Low' : district.pm10 <= 100 ? 'Normal' : 'Critical'}
              </span>
            </div>
          </div>

          {/* Line/Bar stats */}
          <div className="space-y-2.5">
            <div>
              <div className="flex justify-between text-xs font-mono mb-1">
                <span className="text-slate-400">Ambient Noise Level</span>
                <span className="text-slate-200">{district.noise} dBA</span>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                <div className="bg-amber-500 h-full transition-all duration-300" style={{ width: `${district.noise}%` }}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-mono mb-1">
                <span className="text-slate-400">Sustained Traffic Footprint</span>
                <span className="text-slate-200">{district.traffic}% Capacity</span>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                <div className="bg-sky-400 h-full transition-all duration-300" style={{ width: `${district.traffic}%` }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


// 3. EVENT-DRIVEN IoT BROKER LOG TERMINAL WIDGET
export const BrokerWidget: React.FC<WidgetProps> = () => {
  const [isConnected, setIsConnected] = useState<boolean>(true);
  const [trafficRate, setTrafficRate] = useState<number>(3); // 1 = Low, 5 = Overloaded
  const [logs, setLogs] = useState<string[]>([]);
  const [stats, setStats] = useState({ requests: 46102, bytes: 541092, cpu: 12.4 });
  
  const consoleEndRef = useRef<HTMLDivElement | null>(null);

  // Stream logs simulator
  useEffect(() => {
    if (!isConnected) return;

    const topics = ['valves/greenhouse_01/water', 'valves/greenhouse_02/vent', 'sensors/humidity', 'sensors/temperature', 'auth/gateway/handshake'];
    const codes = ['OK', 'COMMAND_DISPATCHED', 'BURST_METRIC_ACK', 'HEARTBEAT', 'PULL_REQUIRED'];
    
    const interval = setInterval(() => {
      const randomTopic = topics[Math.floor(Math.random() * topics.length)];
      const randomCode = codes[Math.floor(Math.random() * codes.length)];
      const randomId = Math.floor(1000 + Math.random() * 9000);
      const randomVal = (15 + Math.random() * 25).toFixed(1);
      
      const parts = [
        `[${new Date().toLocaleTimeString()}]`,
        `[gRPC-ID:${randomId}]`,
        `CONN: ESTABLISHED`,
        `TOPIC: "${randomTopic}"`,
        `STATUS: <${randomCode}>`,
        randomTopic.includes('sensor') ? `VAL: ${randomVal}` : 'EXEC: TRACE_SUCCESS'
      ];

      setLogs((prev) => {
        const slice = prev.length >= 12 ? prev.slice(1) : prev;
        return [...slice, parts.join(' | ')];
      });

      // Update statistics
      setStats((prev) => ({
        requests: prev.requests + Math.floor(Math.random() * 5 * trafficRate),
        bytes: prev.bytes + Math.floor(Math.random() * 124 * trafficRate),
        cpu: Math.min(Math.max(5 + trafficRate * 4 + (Math.random() * 3 - 1.5), 1.5), 98)
      }));

    }, 2000 / trafficRate);

    return () => clearInterval(interval);
  }, [isConnected, trafficRate]);

  // Autoscroll terminal
  useEffect(() => {
    consoleEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  const clearDebugger = () => {
    setLogs([]);
  };

  return (
    <div className="p-5 bg-brand-dark/95 text-white rounded-xl border border-white/10 shadow-2xl space-y-4">
      <div className="flex items-center justify-between border-b border-white/10 pb-3">
        <div className="flex items-center space-x-2">
          <Cpu className="w-5 h-5 text-accent-main animate-pulse" />
          <h4 className="font-display font-medium text-sm tracking-wider uppercase text-slate-300">gRPC TCP Event-Broker Controller</h4>
        </div>
        
        {/* Toggle Connection */}
        <button
          onClick={() => setIsConnected(!isConnected)}
          className={`flex items-center space-x-1 px-2.5 py-1 rounded text-xs font-mono border transition-all ${
            isConnected 
              ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' 
              : 'bg-red-500/10 text-red-500 border-red-500/30'
          }`}
        >
          {isConnected ? (
            <>
              <Wifi className="w-3.5 h-3.5" />
              <span>ACTIVE</span>
            </>
          ) : (
            <>
              <WifiOff className="w-3.5 h-3.5" />
              <span>SHUTDOWN</span>
            </>
          )}
        </button>
      </div>

      {/* Network Metrics Panels */}
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-white/5 border border-white/5 p-2 rounded text-center">
          <span className="text-[9px] font-mono text-slate-400 uppercase tracking-wider block">TCP Packets Recv</span>
          <span className="text-sm font-mono font-bold tracking-tight text-white mt-0.5 block">{stats.requests.toLocaleString()}</span>
        </div>
        <div className="bg-white/5 border border-white/5 p-2 rounded text-center">
          <span className="text-[9px] font-mono text-slate-400 uppercase tracking-wider block">Dynamic Heap</span>
          <span className="text-sm font-mono font-bold tracking-tight text-white mt-0.5 block">{(stats.bytes / 1024).toFixed(1)} KB</span>
        </div>
        <div className="bg-white/5 border border-white/5 p-2 rounded text-center">
          <span className="text-[9px] font-mono text-slate-400 uppercase tracking-wider block">Broker CPU Usage</span>
          <span className="text-sm font-mono font-bold tracking-tight text-white mt-0.5 block">{stats.cpu.toFixed(1)}%</span>
        </div>
      </div>

      {/* Speed dial controller */}
      <div className="flex items-center justify-between gap-4 py-1.5 border-y border-white/5 text-xs font-mono text-slate-400">
        <span className="flex items-center gap-1.5">
          <Radio className={`w-3.5 h-3.5 text-accent-main ${isConnected ? 'animate-bounce' : ''}`} />
          Broker Stress Level:
        </span>
        <div className="flex items-center gap-2 flex-grow max-w-[200px]">
          <input
            type="range"
            min="1"
            max="6"
            value={trafficRate}
            onChange={(e) => setTrafficRate(parseInt(e.target.value))}
            disabled={!isConnected}
            className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-accent-main disabled:opacity-30"
          />
          <span className="min-w-[24px] text-right font-bold text-white pr-1">x{trafficRate}</span>
        </div>
      </div>

      {/* Monospace Terminal Logs */}
      <div className="relative">
        <div className="bg-black/80 rounded-lg border border-white/10 p-4 h-48 overflow-y-auto font-mono text-[10px] text-emerald-400 space-y-1.5 scrollbar-thin">
          {logs.length === 0 ? (
            <div className="h-full flex items-center justify-center text-slate-500 italic">
              {isConnected ? 'Sinking streams... Listening on TCP port 3000...' : 'System offline. Connect broker to stream gRPC telemetry.'}
            </div>
          ) : (
            logs.map((log, index) => (
              <div key={index} className="leading-relaxed hover:bg-emerald-500/10 px-1 py-0.5 rounded transition-all">
                <span className="text-slate-500 mr-1">&gt;</span> {log}
              </div>
            ))
          )}
          <div ref={consoleEndRef} />
        </div>
        
        {/* Floating actions inside console */}
        <button
          onClick={clearDebugger}
          className="absolute right-3 top-3 bg-white/10 hover:bg-white/20 text-slate-300 border border-white/10 p-1 rounded transition-colors text-[9px] font-mono flex items-center gap-1 uppercase"
          title="Clear console buffer"
        >
          <RefreshCw className="w-2.5 h-2.5" /> Clear
        </button>
      </div>
    </div>
  );
};


// 4. MICROPROCESSOR SCHEMATIC CIRCUIT SIMULATOR
export const HydroponicsWidget: React.FC<WidgetProps> = () => {
  const [pumpOn, setPumpOn] = useState<boolean>(false);
  const [kalmanFilterOn, setKalmanFilterOn] = useState<boolean>(true);
  const [pHValue, setPHValue] = useState<number>(6.2);
  const [hoveredPin, setHoveredPin] = useState<string | null>(null);

  // Simulate pH sensor fluctuating
  useEffect(() => {
    const interval = setInterval(() => {
      const baseVal = 6.2;
      const noise = Math.sin(Date.now() / 800) * 0.4;
      const smoothedVal = baseVal + noise * (kalmanFilterOn ? 0.05 : 1);
      setPHValue(parseFloat(smoothedVal.toFixed(2)));
    }, 150);
    return () => clearInterval(interval);
  }, [kalmanFilterOn]);

  const pHPinsDetail: Record<string, string> = {
    'GPIO32': 'Analog Input (ADC1_CH4) connected to isolating industrial pH probe frontend. Direct ADC impedance matching applied.',
    'GPIO25': 'Digital Output (DAC1) trigger pin linked to solid-state electrical pump relay. Isolates high AC voltages.',
    'I2C_SDA': 'I2C Serial Data bus connected to environmental BME280 monitoring atmospheric pressure index.',
    'I2C_SCL': 'I2C Serial Clock bus synchronizing multiple sensor addresses across identical electrical pathways.',
    'VCC_5V': 'Protected 5V analog power rail decoupled with dual 10µF low-ESR ceramic capacitors to filter switching hum.'
  };

  return (
    <div className="p-5 bg-brand-dark/95 text-white rounded-xl border border-white/10 shadow-2xl space-y-4">
      <div className="flex items-center justify-between border-b border-white/10 pb-3">
        <div className="flex items-center space-x-2">
          <Activity className="w-5 h-5 text-emerald-500 animate-pulse" />
          <h4 className="font-display font-medium text-sm tracking-wider uppercase text-slate-300">BioGrid MCU Core Layout</h4>
        </div>
        <span className="text-[10px] font-mono bg-emerald-500/10 px-2 py-0.5 rounded text-emerald-400">Target: Low-Power ESP32-WROOM-32E</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        {/* SVG Circuit Schematic */}
        <div className="bg-slate-900 border border-white/10 rounded-lg p-4 relative overflow-hidden flex flex-col items-center">
          <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider mb-2 self-start">Breadboard Trace Schematics</span>
          
          <svg viewBox="0 0 240 180" className="w-full max-w-[280px] h-auto">
            {/* ESP32 Chip representation */}
            <rect x="70" y="40" width="100" height="100" fill="#1C1917" stroke="rgba(255,255,255,0.25)" strokeWidth="2" rx="4" />
            <text x="120" y="93" fill="rgba(255,255,255,0.7)" fontSize="10" fontFamily="monospace" fontWeight="bold" textAnchor="middle">ESP32-MCU</text>
            <text x="120" y="103" fill="rgba(255,255,255,0.3)" fontSize="6" fontFamily="monospace" textAnchor="middle">FreeRTOS Core</text>

            {/* Pins LEFT of ESP32 */}
            <g onMouseEnter={() => setHoveredPin('GPIO32')} onMouseLeave={() => setHoveredPin(null)} className="cursor-pointer group">
              <rect x="55" y="55" width="15" height="6" fill={hoveredPin === 'GPIO32' ? '#059669' : '#444'} rx="1" />
              <line x1="30" y1="58" x2="55" y2="58" stroke={hoveredPin === 'GPIO32' ? '#059669' : '#666'} strokeWidth="1.5" />
              <text x="50" y="52" fill="#94A3B8" fontSize="5" fontFamily="monospace" textAnchor="end">GPIO32 (pH)</text>
            </g>

            <g onMouseEnter={() => setHoveredPin('I2C_SDA')} onMouseLeave={() => setHoveredPin(null)} className="cursor-pointer">
              <rect x="55" y="75" width="15" height="6" fill={hoveredPin === 'I2C_SDA' ? '#06B6D4' : '#444'} rx="1" />
              <line x1="30" y1="78" x2="55" y2="78" stroke={hoveredPin === 'I2C_SDA' ? '#06B6D4' : '#666'} strokeWidth="1" />
              <text x="50" y="72" fill="#94A3B8" fontSize="5" fontFamily="monospace" textAnchor="end">SDA (I2C)</text>
            </g>

            <g onMouseEnter={() => setHoveredPin('I2C_SCL')} onMouseLeave={() => setHoveredPin(null)} className="cursor-pointer">
              <rect x="55" y="95" width="15" height="6" fill={hoveredPin === 'I2C_SCL' ? '#06B6D4' : '#444'} rx="1" />
              <line x1="30" y1="98" x2="55" y2="98" stroke={hoveredPin === 'I2C_SCL' ? '#06B6D4' : '#666'} strokeWidth="1" />
              <text x="50" y="92" fill="#94A3B8" fontSize="5" fontFamily="monospace" textAnchor="end">SCL (I2C)</text>
            </g>

            {/* Pins RIGHT of ESP32 */}
            <g onMouseEnter={() => setHoveredPin('GPIO25')} onMouseLeave={() => setHoveredPin(null)} className="cursor-pointer group">
              <rect x="170" y="65" width="15" height="6" fill={hoveredPin === 'GPIO25' ? '#D97706' : '#444'} rx="1" />
              <line x1="185" y1="68" x2="210" y2="68" stroke={hoveredPin === 'GPIO25' ? '#D97706' : '#666'} strokeWidth="1.5" />
              <text x="190" y="62" fill="#94A3B8" fontSize="5" fontFamily="monospace">GPIO25 (PUMP)</text>
            </g>

            <g onMouseEnter={() => setHoveredPin('VCC_5V')} onMouseLeave={() => setHoveredPin(null)} className="cursor-pointer group">
              <rect x="170" y="85" width="15" height="6" fill={hoveredPin === 'VCC_5V' ? '#EF4444' : '#444'} rx="1" />
              <line x1="185" y1="88" x2="210" y2="88" stroke={hoveredPin === 'VCC_5V' ? '#EF4444' : '#666'} strokeWidth="1" />
              <text x="190" y="82" fill="#94A3B8" fontSize="5" fontFamily="monospace">5V RAIL</text>
            </g>

            {/* External Sensor probes node representations */}
            <rect x="5" y="45" width="25" height="65" fill="#334155" rx="2" stroke="rgba(255,255,255,0.1)" />
            <text x="17" y="80" fill="white" fontSize="6" fontFamily="monospace" textAnchor="middle" transform="rotate(-90 17 80)">PH SENSOR</text>

            <rect x="210" y="55" width="25" height="45" fill="#1E293B" rx="2" stroke="rgba(255,255,255,0.1)" />
            <circle cx="222" cy="77" r="6" fill={pumpOn ? '#22C55E' : '#475569'} className={pumpOn ? 'animate-spin' : ''} />
            <text x="222" y="93" fill="white" fontSize="5" fontFamily="monospace" textAnchor="middle">PUMP</text>
            {pumpOn && (
              <path d="M 222 77 Q 212 90 222 105" stroke="#2563EB" strokeWidth="1" fill="none" className="animate-pulse" />
            )}
          </svg>
        </div>

        {/* Board Controls & Status */}
        <div className="space-y-4">
          <div className="p-3 bg-white/5 rounded-lg border border-white/5 space-y-1 text-center font-mono">
            <span className="text-[10px] text-slate-400 uppercase tracking-widest block">Operational Metrics telemetry</span>
            <div className="flex justify-around items-center pt-2">
              <div>
                <span className="text-slate-400 text-[10px] uppercase">Real-Time pH</span>
                <span className="font-bold text-lg block text-emerald-400 mt-0.5">{pHValue}</span>
              </div>
              <div className="border-l border-white/10 h-8"></div>
              <div>
                <span className="text-slate-400 text-[10px] uppercase">Filter Mode</span>
                <button 
                  onClick={() => setKalmanFilterOn(!kalmanFilterOn)}
                  className={`text-[10px] font-bold px-2 py-0.5 rounded cursor-pointer block mt-1 transition-all ${
                    kalmanFilterOn ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'
                  }`}
                >
                  {kalmanFilterOn ? 'KALMAN' : 'RAW NOISE'}
                </button>
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => setPumpOn(!pumpOn)}
              className={`flex-1 py-2 rounded-lg font-display text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
                pumpOn 
                  ? 'bg-amber-500 text-slate-950 border border-amber-500 shadow-lg' 
                  : 'bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10'
              }`}
            >
              {pumpOn ? (
                <>
                  <Pause className="w-4 h-4 fill-slate-950 text-slate-950" />
                  <span>DEACTIVATE RELAY</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 fill-slate-300" />
                  <span>RELAY OVERRIDE (ON)</span>
                </>
              )}
            </button>
          </div>

          {/* Pin detail description tooltip box */}
          <div className="bg-slate-950 border border-white/10 rounded p-3 text-[10px] font-mono text-slate-400 min-h-[64px]">
            {hoveredPin ? (
              <div>
                <span className="text-white block font-bold mb-1 uppercase text-emerald-400">{hoveredPin} Interface:</span>
                <p className="leading-relaxed">{pHPinsDetail[hoveredPin]}</p>
              </div>
            ) : (
              <p className="italic flex items-center justify-center h-full text-slate-500 text-center">
                Hover over specific GPIO connectors on the ESP32 diagram to analyze core pin configurations and hardware mapping.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};


// 5. HIGH-PRECISION OSCILLOSCOPE ANALOG FILTER WIDGET
export const AnalogWidget: React.FC<WidgetProps> = () => {
  const [filterActive, setFilterActive] = useState<boolean>(true);
  const [noiseHz, setNoiseHz] = useState<number>(50); // Powerline hum noise level scale (mV)
  const [time, setTime] = useState<number>(0);
  const [activeTab, setActiveTab] = useState<'time' | 'frequency'>('time');
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Animate oscilloscope waveform
  useEffect(() => {
    if (activeTab !== 'time') return;
    let animationFrameId: number;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let localTime = 0;

    const render = () => {
      localTime += 0.05;
      setTime(localTime);

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw Scope Grid background lines
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
      ctx.lineWidth = 1;
      
      // Vertical grid lines
      for (let x = 0; x < canvas.width; x += 30) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      // Horizontal grid lines
      for (let y = 0; y < canvas.height; y += 30) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      // Draw baseline axis
      ctx.strokeStyle = 'rgba(148, 163, 184, 0.2)';
      ctx.beginPath();
      ctx.moveTo(0, canvas.height / 2);
      ctx.lineTo(canvas.width, canvas.height / 2);
      ctx.stroke();

      // Begin plotting waveform
      ctx.lineWidth = 2.5;
      ctx.beginPath();

      for (let x = 0; x < canvas.width; x++) {
        const t = localTime + x * 0.035;
        
        // Biological Heartbeat Signal (ECG core waveform shape)
        // Simulated as occasional high-amplitude sharp peak pulses
        const heartRatePeriod = Math.PI * 1.5;
        const normalizedAngle = t % heartRatePeriod;
        let heartPulse = 0;
        
        // P-Q-R-S-T wave sequence simulation
        if (normalizedAngle > 0.5 && normalizedAngle < 1.1) {
          const relativePos = normalizedAngle - 0.5;
          if (relativePos < 0.1) heartPulse = -10; // Q negative drop
          else if (relativePos < 0.25) heartPulse = 70; // R positive spike
          else if (relativePos < 0.4) heartPulse = -25; // S negative drop
          else heartPulse = 18; // T wave bump
        } else {
          // Flatten baseline slight fluctuation
          heartPulse = Math.sin(t * 3.14) * 1.5;
        }

        // Noise overlay (ambient powerline interference)
        const powerlineNoiseLevel = (noiseHz / 2.3);
        const noiseSin = Math.sin(t * 18.5) * powerlineNoiseLevel;
        
        // Net analog signal
        let amplitude = heartPulse;
        if (!filterActive) {
          // If filtering is disabled, load raw magnetic electrical crosstalk
          amplitude = heartPulse + noiseSin;
        } else {
          // Kalman/RC high-frequency notch isolation reduces 95% of noise wave
          amplitude = heartPulse + noiseSin * 0.04;
        }

        const y = canvas.height / 2 - amplitude;
        
        if (x === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }

      // Style waveform
      ctx.strokeStyle = filterActive ? '#8B5CF6' : '#EF4444'; // Purple (Clean) or Red (Noisy)
      ctx.shadowBlur = 10;
      ctx.shadowColor = filterActive ? 'rgba(139, 92, 246, 0.4)' : 'rgba(239, 68, 68, 0.4)';
      ctx.stroke();
      ctx.shadowBlur = 0; // reset shadow for next draws

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => cancelAnimationFrame(animationFrameId);
  }, [filterActive, noiseHz, activeTab]);

  // Generate Bode Plot points mathematically
  const bodePoints: string[] = [];
  const startF = 10;
  const endF = 110;
  const notchF = 50; // power grid standard hum frequency

  for (let f = startF; f <= endF; f += 1) {
    const x = ((f - startF) / (endF - startF)) * 240 + 30; // X from 30 to 270 px
    // H(s) notch formula
    const diff = Math.abs(f * f - notchF * notchF);
    const denom = Math.sqrt(Math.pow(f * f - notchF * notchF, 2) + Math.pow(f * 15, 2)) || 1;
    const gain = diff / denom;
    const gainDb = Math.max(20 * Math.log10(gain || 0.001), -60);
    const y = 15 + ((gainDb / -60) * 85); // Y from 15 (0dB) to 100 (-60dB)
    bodePoints.push(`${x.toFixed(1)},${y.toFixed(1)}`);
  }
  const bodePath = `M ${bodePoints.join(' L ')}`;

  return (
    <div className="p-5 bg-brand-dark/95 text-white rounded-xl border border-white/10 shadow-2xl space-y-4">
      <div className="flex items-center justify-between border-b border-white/10 pb-3">
        <div className="flex items-center space-x-2">
          <Waves className="w-5 h-5 text-[#8B5CF6] animate-pulse" />
          <h4 className="font-display font-medium text-sm tracking-wider uppercase text-slate-300">Biopotential Analog Scope</h4>
        </div>
        <span className="text-[10px] font-mono bg-purple-500/10 px-2 py-0.5 rounded text-purple-400 font-bold">120dB notch shield active</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        {/* Oscilloscope View & Tab Selectors */}
        <div className="space-y-3">
          <div className="flex justify-between items-center text-[10px] font-mono text-slate-400">
            {/* Domain display tabs */}
            <div className="flex bg-slate-900 border border-white/10 p-0.5 rounded">
              <button
                onClick={() => setActiveTab('time')}
                className={`px-2 py-0.5 rounded text-[9px] font-bold ${
                  activeTab === 'time' ? 'bg-purple-600 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                TIME DOMAIN
              </button>
              <button
                onClick={() => setActiveTab('frequency')}
                className={`px-2 py-0.5 rounded text-[9px] font-bold ${
                  activeTab === 'frequency' ? 'bg-purple-600 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                BODE RESPONSE
              </button>
            </div>
            
            <span className={filterActive ? 'text-purple-400 font-bold' : 'text-red-400 font-bold'}>
              {activeTab === 'time' 
                ? (filterActive ? '● SHIELDED' : '▲ COUPLING_ERROR')
                : 'SPECTRUM_LOG'
              }
            </span>
          </div>

          <div className="bg-slate-950 border-2 border-slate-800 rounded-lg p-2.5 overflow-hidden flex items-center justify-center min-h-[160px]">
            {activeTab === 'time' ? (
              /* Real HTML Canvas oscilloscope */
              <canvas 
                ref={canvasRef} 
                width="300" 
                height="150" 
                className="w-full h-auto bg-slate-950 rounded-md"
              />
            ) : (
              /* SVG Bode frequency magnitude plot */
              <div className="w-full h-full relative flex flex-col justify-between">
                <svg viewBox="0 0 300 130" className="w-full h-auto">
                  {/* Grid background */}
                  {[0, -20, -40, -60].map((db) => {
                    const y = 15 + ((db / -60) * 85);
                    return (
                      <g key={db}>
                        <line x1="30" y1={y} x2="270" y2={y} stroke="rgba(255, 255, 255, 0.05)" strokeWidth="1" />
                        <text x="5" y={y + 3} fill="#475569" fontSize="6.5" fontFamily="monospace">{db}dB</text>
                      </g>
                    );
                  })}
                  {[20, 50, 80, 110].map((freq) => {
                    const x = ((freq - startF) / (endF - startF)) * 240 + 30;
                    return (
                      <g key={freq}>
                        <line x1={x} y1="15" x2={x} y2="100" stroke="rgba(255, 255, 255, 0.05)" strokeWidth="1" />
                        <text x={x} y="112" fill="#475569" fontSize="6.5" fontFamily="monospace" textAnchor="middle">{freq}Hz</text>
                      </g>
                    );
                  })}

                  {/* Twin-T Notch Curve Path */}
                  <path d={bodePath} fill="none" stroke="rgba(255, 255, 255, 0.2)" strokeWidth="1.5" strokeDasharray="2" />
                  <path d={bodePath} fill="none" stroke="#8B5CF6" strokeWidth="2.5" className="transition-all" />

                  {/* Noise Coupling spike at 50Hz */}
                  {/* If filter active: tiny suppressed dot, if bypass: huge active ripple */}
                  <g>
                    <line 
                      x1="126" 
                      y1="15" 
                      x2="126" 
                      y2="100" 
                      stroke={filterActive ? "rgba(34, 197, 94, 0.25)" : "rgba(239, 68, 68, 0.5)"} 
                      strokeWidth={filterActive ? "1" : "2"} 
                    />
                    
                    {/* Spike value dot representing the powerline hum noise */}
                    <circle 
                      cx="126" 
                      cy={filterActive ? "95" : "15"} 
                      r={filterActive ? "4" : "6"} 
                      fill={filterActive ? "#22C55E" : "#EF4444"} 
                      className="animate-pulse" 
                    />

                    {/* Annotation callout text box based on state */}
                    <rect 
                      x={filterActive ? "135" : "135"} 
                      y={filterActive ? "80" : "20"} 
                      width="100" 
                      height="18" 
                      fill="rgba(15, 23, 42, 0.85)" 
                      stroke={filterActive ? "#22C55E" : "#EF4444"} 
                      strokeWidth="0.5" 
                      rx="2"
                    />
                    <text 
                      x={filterActive ? "185" : "185"} 
                      y={filterActive ? "91" : "31"} 
                      fill={filterActive ? "#A7F3D0" : "#FCA5A5"} 
                      fontSize="5" 
                      fontFamily="monospace" 
                      textAnchor="middle"
                    >
                      {filterActive ? "Attenuated: -60dB (99.9%)" : "Crosstalk Coupled: 0dB (100%)"}
                    </text>
                  </g>
                </svg>
              </div>
            )}
          </div>
          <p className="text-[9px] text-slate-500 italic text-center font-mono">
            {activeTab === 'time' 
              ? "Displaying low-frequency biological voltage potentials over time."
              : "Bode Magnitude curve of the active Twin-T feedback topology shielding."
            }
          </p>
        </div>

        {/* Controllers panel */}
        <div className="space-y-4">
          <h5 className="text-xs font-mono text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
            <Filter className="w-3.5 h-3.5 text-purple-400" /> Active Isolation Filters
          </h5>

          {/* Notch Filter Toggle Button */}
          <div className="space-y-2">
            <span className="text-[11px] font-sans text-slate-400 block leading-snug">
              Toggle the dynamic 50Hz notch filter state to simulate structural electromagnetic decoupling.
            </span>
            <button
              onClick={() => setFilterActive(!filterActive)}
              className={`w-full py-2.5 rounded-lg px-4 font-display text-xs font-bold transition-all border cursor-pointer ${
                filterActive 
                  ? 'bg-purple-600 border-purple-600 hover:bg-purple-700 text-white shadow-lg' 
                  : 'bg-red-500/10 border-red-500/20 hover:bg-red-500/20 text-red-400'
              }`}
            >
              SIGNAL FILTER STATUS: {filterActive ? 'NOTCH_FILTER_ON (SHIELDED)' : 'NOTCH_FILTER_BYPASS (UNSHIELDED)'}
            </button>
          </div>

          {/* Noise frequency amplitude level */}
          <div className="space-y-1 bg-white/5 border border-white/5 rounded-lg p-3">
            <div className="flex justify-between text-[11px] font-mono">
              <span className="text-slate-400">Interference (50Hz Ripple)</span>
              <span className="text-red-400 font-bold">{noiseHz} mV<sub>pp</sub></span>
            </div>
            <input
              type="range"
              min="5"
              max="110"
              value={noiseHz}
              onChange={(e) => setNoiseHz(parseInt(e.target.value))}
              className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-purple-400"
            />
            <p className="text-[9px] text-slate-500 font-mono italic mt-1 leading-snug">
              Simulates powerline magnetic radiation leaking into the biological signal frontend wires.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
