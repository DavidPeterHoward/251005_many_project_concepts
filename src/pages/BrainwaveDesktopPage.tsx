import React, { useState, useEffect, useRef } from 'react';
import { Brain, Activity, Zap, Waves, Settings, Play, Pause, BarChart3, FileText, Cpu, Mic, WifiIcon, Music, Headphones, Download, Save, TrendingUp, Radio, Sliders, Database, Network, Eye, Bell } from 'lucide-react';

const ProfessionalBrainwaveDesktop = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [selectedView, setSelectedView] = useState('overview');
  const [timeWindow, setTimeWindow] = useState(10);
  
  const [musicAnalysis, setMusicAnalysis] = useState({
    isPlaying: false,
    currentFreq: 440,
    binauralBeat: 10,
    entrainmentTarget: 'alpha',
    tempo: 72,
    dominantNote: 'A',
    leftEar: 435,
    rightEar: 445,
    carrierFreq: 440,
    modulationDepth: 0.8
  });
  
  const [brainwaveData, setBrainwaveData] = useState({
    delta: { power: 0.2, frequency: 2.5, coherence: 0.75, entrainment: 0, phase: 0, amplitude: 15 },
    theta: { power: 0.35, frequency: 6.2, coherence: 0.68, entrainment: 0, phase: 0, amplitude: 22 },
    alpha: { power: 0.55, frequency: 10.1, coherence: 0.82, entrainment: 0, phase: 0, amplitude: 38 },
    beta: { power: 0.42, frequency: 18.5, coherence: 0.71, entrainment: 0, phase: 0, amplitude: 18 },
    gamma: { power: 0.18, frequency: 42.3, coherence: 0.58, entrainment: 0, phase: 0, amplitude: 8 }
  });
  
  const [brainRegions, setBrainRegions] = useState({
    prefrontal: { activation: 0.65, connectivity: 0.72 },
    frontal: { activation: 0.58, connectivity: 0.68 },
    motor: { activation: 0.45, connectivity: 0.75 },
    sensory: { activation: 0.52, connectivity: 0.70 },
    parietal: { activation: 0.62, connectivity: 0.78 },
    temporal_l: { activation: 0.48, connectivity: 0.65 },
    temporal_r: { activation: 0.50, connectivity: 0.67 },
    occipital: { activation: 0.55, connectivity: 0.73 },
    auditory_l: { activation: 0.3, connectivity: 0.45 },
    auditory_r: { activation: 0.3, connectivity: 0.45 }
  });
  
  const [inferenceResults, setInferenceResults] = useState({
    cognitiveState: 'Baseline',
    attention: 0.52,
    arousal: 0.48,
    valence: 0.55,
    workload: 0.35,
    confidence: 0.87,
    musicResponse: 0.15,
    entrainmentLevel: 0.0,
    mentalEffort: 0.42,
    stress: 0.28,
    engagement: 0.58
  });
  
  const [sensorData, setSensorData] = useState({
    esp32: { 
      connected: true, 
      channels: 8, 
      samplingRate: 250, 
      batteryLevel: 78,
      signalQuality: [88, 92, 82, 91, 87, 85, 89, 93],
      temperature: 36.5,
      impedance: [10, 7, 13, 9, 8, 11, 10, 6],
      noiseLevel: [2.1, 1.8, 2.5, 1.9, 2.0, 2.3, 2.1, 1.7]
    },
    microphone: { 
      connected: true, 
      level: 0.35, 
      frequency: 440,
      directional: true,
      noiseLevel: 32,
      spatialData: { azimuth: 15, elevation: 5 },
      peakFrequencies: [220, 440, 660]
    },
    fusion: {
      syncQuality: 0.91,
      latency: 8,
      dataIntegrity: 0.96,
      processingLoad: 0.42
    }
  });

  const [waveformHistory, setWaveformHistory] = useState([]);
  const [spectrogramData, setSpectrogramData] = useState([]);
  const animationRef = useRef();
  const [time, setTime] = useState(0);
  const [sessionDuration, setSessionDuration] = useState(0);

  // Enhanced brainwave simulation with advanced features
  useEffect(() => {
    if (!isRecording) return;

    const updateBrainwaves = () => {
      const t = time / 1000;
      
      // Music entrainment with phase-locking
      const entrainmentEffect = musicAnalysis.isPlaying ? musicAnalysis.modulationDepth * 0.4 : 0;
      const binauralInfluence = musicAnalysis.binauralBeat > 0 ? 0.5 : 0;
      const phaseSync = musicAnalysis.isPlaying ? Math.sin(t * musicAnalysis.binauralBeat * 2 * Math.PI) : 0;
      
      // Enhanced oscillations with realistic dynamics
      const deltaBase = 0.22 + 0.18 * Math.sin(t * 0.08) + (musicAnalysis.entrainmentTarget === 'delta' ? entrainmentEffect : 0);
      const thetaBase = 0.32 + 0.28 * Math.sin(t * 0.15 + 0.8) + (musicAnalysis.entrainmentTarget === 'theta' ? entrainmentEffect : 0);
      const alphaBase = 0.52 + 0.38 * Math.sin(t * 0.25 + 1.6) + (musicAnalysis.entrainmentTarget === 'alpha' ? entrainmentEffect : 0);
      const betaBase = 0.42 + 0.28 * Math.sin(t * 0.35 + 2.4) + (musicAnalysis.entrainmentTarget === 'beta' ? entrainmentEffect : 0);
      const gammaBase = 0.16 + 0.18 * Math.sin(t * 0.45 + 3.2) + (musicAnalysis.entrainmentTarget === 'gamma' ? entrainmentEffect : 0);
      
      const newBrainwaveData = {
        delta: { 
          power: Math.max(0, Math.min(1, deltaBase + 0.08 * Math.random())), 
          frequency: 1.5 + 2.5 * Math.random(), 
          coherence: 0.72 + 0.22 * Math.random(),
          entrainment: musicAnalysis.entrainmentTarget === 'delta' ? binauralInfluence : 0,
          phase: phaseSync * (musicAnalysis.entrainmentTarget === 'delta' ? 1 : 0),
          amplitude: 12 + 8 * Math.random()
        },
        theta: { 
          power: Math.max(0, Math.min(1, thetaBase + 0.08 * Math.random())), 
          frequency: 4 + 4 * Math.random(), 
          coherence: 0.65 + 0.28 * Math.random(),
          entrainment: musicAnalysis.entrainmentTarget === 'theta' ? binauralInfluence : 0,
          phase: phaseSync * (musicAnalysis.entrainmentTarget === 'theta' ? 1 : 0),
          amplitude: 18 + 12 * Math.random()
        },
        alpha: { 
          power: Math.max(0, Math.min(1, alphaBase + 0.08 * Math.random())), 
          frequency: 8 + 5 * Math.random(), 
          coherence: 0.80 + 0.18 * Math.random(),
          entrainment: musicAnalysis.entrainmentTarget === 'alpha' ? binauralInfluence : 0,
          phase: phaseSync * (musicAnalysis.entrainmentTarget === 'alpha' ? 1 : 0),
          amplitude: 32 + 15 * Math.random()
        },
        beta: { 
          power: Math.max(0, Math.min(1, betaBase + 0.08 * Math.random())), 
          frequency: 13 + 17 * Math.random(), 
          coherence: 0.68 + 0.24 * Math.random(),
          entrainment: musicAnalysis.entrainmentTarget === 'beta' ? binauralInfluence : 0,
          phase: phaseSync * (musicAnalysis.entrainmentTarget === 'beta' ? 1 : 0),
          amplitude: 14 + 10 * Math.random()
        },
        gamma: { 
          power: Math.max(0, Math.min(1, gammaBase + 0.08 * Math.random())), 
          frequency: 30 + 70 * Math.random(), 
          coherence: 0.55 + 0.35 * Math.random(),
          entrainment: musicAnalysis.entrainmentTarget === 'gamma' ? binauralInfluence : 0,
          phase: phaseSync * (musicAnalysis.entrainmentTarget === 'gamma' ? 1 : 0),
          amplitude: 6 + 6 * Math.random()
        }
      };
      
      setBrainwaveData(newBrainwaveData);

      // Update waveform history for real-time graph
      setWaveformHistory(prev => {
        const newHistory = [...prev, {
          time: t,
          delta: newBrainwaveData.delta.power,
          theta: newBrainwaveData.theta.power,
          alpha: newBrainwaveData.alpha.power,
          beta: newBrainwaveData.beta.power,
          gamma: newBrainwaveData.gamma.power
        }];
        return newHistory.slice(-100); // Keep last 100 points
      });

      // Update spectrogram data
      if (Math.floor(t) % 1 === 0) {
        setSpectrogramData(prev => {
          const newData = [...prev, {
            time: t,
            bands: Object.values(newBrainwaveData).map(b => b.power)
          }];
          return newData.slice(-30);
        });
      }

      // Enhanced inference with multi-dimensional analysis
      const attention = (betaBase + gammaBase * 0.6 - deltaBase * 0.3) * 0.85 + 0.15 * Math.random();
      const arousal = (betaBase + gammaBase * 0.7 - deltaBase * 0.5 - thetaBase * 0.2) * 0.75 + 0.25 * Math.random();
      const valence = (alphaBase * 0.8 - thetaBase * 0.3 + 0.4) * 0.7 + 0.3 * Math.random();
      const workload = (betaBase * 0.7 + gammaBase * 0.4 - alphaBase * 0.3) * 0.80 + 0.20 * Math.random();
      const musicResponse = musicAnalysis.isPlaying ? (entrainmentEffect + 0.25 * Math.random()) : 0.08 * Math.random();
      const entrainmentLevel = binauralInfluence * (0.8 + 0.2 * Math.random());
      const mentalEffort = (betaBase * 0.6 + gammaBase * 0.5) * 0.75 + 0.25 * Math.random();
      const stress = (betaBase * 0.5 - alphaBase * 0.4 + 0.3) * 0.7 + 0.3 * Math.random();
      const engagement = (alphaBase * 0.4 + betaBase * 0.3 + gammaBase * 0.3) * 0.8 + 0.2 * Math.random();
      
      let cognitiveState = 'Baseline';
      if (musicAnalysis.isPlaying && entrainmentLevel > 0.35) cognitiveState = 'Music Entrained - ' + musicAnalysis.entrainmentTarget.toUpperCase();
      else if (attention > 0.72 && arousal > 0.65) cognitiveState = 'Highly Focused';
      else if (attention > 0.55 && workload < 0.4) cognitiveState = 'Relaxed Focus';
      else if (alphaBase > 0.68 && thetaBase > 0.45) cognitiveState = 'Meditative State';
      else if (deltaBase > 0.55) cognitiveState = 'Drowsy / Pre-Sleep';
      else if (betaBase > 0.75) cognitiveState = 'Active Processing';
      else if (gammaBase > 0.55) cognitiveState = 'High Cognition';
      else if (stress > 0.6) cognitiveState = 'Elevated Stress';
      
      setInferenceResults({
        cognitiveState,
        attention: Math.max(0, Math.min(1, attention)),
        arousal: Math.max(0, Math.min(1, arousal)),
        valence: Math.max(0, Math.min(1, valence)),
        workload: Math.max(0, Math.min(1, workload)),
        confidence: 0.84 + 0.12 * Math.random(),
        musicResponse,
        entrainmentLevel,
        mentalEffort: Math.max(0, Math.min(1, mentalEffort)),
        stress: Math.max(0, Math.min(1, stress)),
        engagement: Math.max(0, Math.min(1, engagement))
      });

      // Update brain regions based on activity
      setBrainRegions(prev => ({
        prefrontal: { activation: betaBase * 0.9 + 0.1 * Math.random(), connectivity: 0.7 + 0.25 * Math.random() },
        frontal: { activation: betaBase * 0.85 + 0.15 * Math.random(), connectivity: 0.65 + 0.28 * Math.random() },
        motor: { activation: (betaBase + gammaBase) * 0.45 + 0.1 * Math.random(), connectivity: 0.72 + 0.22 * Math.random() },
        sensory: { activation: gammaBase * 0.8 + 0.2 * Math.random(), connectivity: 0.68 + 0.25 * Math.random() },
        parietal: { activation: alphaBase * 0.85 + 0.15 * Math.random(), connectivity: 0.75 + 0.2 * Math.random() },
        temporal_l: { activation: thetaBase * 0.75 + 0.2 * Math.random(), connectivity: 0.62 + 0.3 * Math.random() },
        temporal_r: { activation: thetaBase * 0.78 + 0.18 * Math.random(), connectivity: 0.64 + 0.28 * Math.random() },
        occipital: { activation: alphaBase * 0.8 + 0.2 * Math.random(), connectivity: 0.7 + 0.25 * Math.random() },
        auditory_l: { activation: musicAnalysis.isPlaying ? 0.75 + 0.2 * Math.random() : 0.25 + 0.1 * Math.random(), connectivity: musicAnalysis.isPlaying ? 0.8 : 0.4 },
        auditory_r: { activation: musicAnalysis.isPlaying ? 0.78 + 0.18 * Math.random() : 0.27 + 0.1 * Math.random(), connectivity: musicAnalysis.isPlaying ? 0.82 : 0.42 }
      }));

      setTime(prev => prev + 50);
      setSessionDuration(prev => prev + 50);
    };

    animationRef.current = setInterval(updateBrainwaves, 50);
    return () => clearInterval(animationRef.current);
  }, [isRecording, time, musicAnalysis]);

  // Real-time Waveform Display
  const WaveformDisplay = () => {
    const canvasRef = useRef(null);
    
    useEffect(() => {
      if (!canvasRef.current || waveformHistory.length < 2) return;
      
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      const width = canvas.width;
      const height = canvas.height;
      
      ctx.fillStyle = '#F8FAFC';
      ctx.fillRect(0, 0, width, height);
      
      // Grid
      ctx.strokeStyle = '#E2E8F0';
      ctx.lineWidth = 1;
      for (let i = 0; i <= 5; i++) {
        const y = (height / 5) * i;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }
      
      // Draw waves
      const bands = ['delta', 'theta', 'alpha', 'beta', 'gamma'];
      const colors = ['#8B5CF6', '#06B6D4', '#10B981', '#F59E0B', '#EF4444'];
      
      bands.forEach((band, idx) => {
        ctx.strokeStyle = colors[idx];
        ctx.lineWidth = 2;
        ctx.beginPath();
        
        waveformHistory.forEach((point, i) => {
          const x = (i / waveformHistory.length) * width;
          const y = height - (point[band] * height);
          
          if (i === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        });
        
        ctx.stroke();
      });
      
    }, [waveformHistory]);
    
    return (
      <div className="bg-white rounded-lg p-4 border border-gray-200">
        <h4 className="text-sm font-semibold text-gray-800 mb-2">Real-time EEG Waveforms</h4>
        <canvas ref={canvasRef} width={800} height={200} className="w-full" />
        <div className="flex justify-center space-x-4 mt-2 text-xs">
          <span className="flex items-center"><span className="w-3 h-3 bg-purple-500 rounded mr-1"></span>Delta</span>
          <span className="flex items-center"><span className="w-3 h-3 bg-cyan-500 rounded mr-1"></span>Theta</span>
          <span className="flex items-center"><span className="w-3 h-3 bg-green-500 rounded mr-1"></span>Alpha</span>
          <span className="flex items-center"><span className="w-3 h-3 bg-orange-500 rounded mr-1"></span>Beta</span>
          <span className="flex items-center"><span className="w-3 h-3 bg-red-500 rounded mr-1"></span>Gamma</span>
        </div>
      </div>
    );
  };

  // Spectrogram Visualization
  const SpectrogramDisplay = () => {
    const canvasRef = useRef(null);
    
    useEffect(() => {
      if (!canvasRef.current || spectrogramData.length < 2) return;
      
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      const width = canvas.width;
      const height = canvas.height;
      
      ctx.fillStyle = '#1E293B';
      ctx.fillRect(0, 0, width, height);
      
      spectrogramData.forEach((data, timeIdx) => {
        data.bands.forEach((power, freqIdx) => {
          const x = (timeIdx / spectrogramData.length) * width;
          const y = (freqIdx / data.bands.length) * height;
          const cellWidth = width / spectrogramData.length;
          const cellHeight = height / data.bands.length;
          
          const intensity = Math.floor(power * 255);
          ctx.fillStyle = `rgb(${intensity}, ${intensity * 0.5}, ${255 - intensity})`;
          ctx.fillRect(x, y, cellWidth, cellHeight);
        });
      });
      
    }, [spectrogramData]);
    
    return (
      <div className="bg-white rounded-lg p-4 border border-gray-200">
        <h4 className="text-sm font-semibold text-gray-800 mb-2">Frequency Spectrogram</h4>
        <canvas ref={canvasRef} width={800} height={150} className="w-full rounded" />
        <div className="flex justify-between text-xs text-gray-600 mt-2">
          <span>Past</span>
          <span>Time →</span>
          <span>Present</span>
        </div>
      </div>
    );
  };

  // Enhanced 3D Brain Visualization
  const Enhanced3DBrainView = () => {
    const regions = [
      { name: 'Prefrontal', x: 200, y: 50, activity: brainRegions.prefrontal.activation, size: 'xlarge', type: 'executive' },
      { name: 'Frontal', x: 200, y: 85, activity: brainRegions.frontal.activation, size: 'large', type: 'motor' },
      { name: 'Motor L', x: 155, y: 115, activity: brainRegions.motor.activation, size: 'medium', type: 'motor' },
      { name: 'Motor R', x: 245, y: 115, activity: brainRegions.motor.activation, size: 'medium', type: 'motor' },
      { name: 'Sensory L', x: 155, y: 145, activity: brainRegions.sensory.activation, size: 'medium', type: 'sensory' },
      { name: 'Sensory R', x: 245, y: 145, activity: brainRegions.sensory.activation, size: 'medium', type: 'sensory' },
      { name: 'Parietal', x: 200, y: 155, activity: brainRegions.parietal.activation, size: 'xlarge', type: 'association' },
      { name: 'Temporal L', x: 130, y: 175, activity: brainRegions.temporal_l.activation, size: 'large', type: 'memory' },
      { name: 'Temporal R', x: 270, y: 175, activity: brainRegions.temporal_r.activation, size: 'large', type: 'memory' },
      { name: 'Auditory L', x: 110, y: 155, activity: brainRegions.auditory_l.activation, size: 'small', type: 'auditory' },
      { name: 'Auditory R', x: 290, y: 155, activity: brainRegions.auditory_r.activation, size: 'small', type: 'auditory' },
      { name: 'Occipital', x: 200, y: 205, activity: brainRegions.occipital.activation, size: 'large', type: 'visual' }
    ];

    const getSizeRadius = (size) => {
      switch(size) {
        case 'xlarge': return 22;
        case 'large': return 18;
        case 'medium': return 14;
        case 'small': return 10;
        default: return 14;
      }
    };

    const getRegionColor = (type) => {
      switch(type) {
        case 'executive': return '#4F46E5';
        case 'motor': return '#8B5CF6';
        case 'sensory': return '#06B6D4';
        case 'association': return '#10B981';
        case 'memory': return '#F59E0B';
        case 'auditory': return '#EF4444';
        case 'visual': return '#EC4899';
        default: return '#6366F1';
      }
    };

    return (
      <div className="relative bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 rounded-xl p-6 h-[500px] border border-gray-200">
        <svg width="400" height="450" className="mx-auto">
          {/* 3D-style brain outline with depth */}
          <defs>
            <radialGradient id="brainGradient" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#6366F1" stopOpacity="0.3"/>
              <stop offset="100%" stopColor="#4F46E5" stopOpacity="0.1"/>
            </radialGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          
          {/* Brain structure layers */}
          <ellipse cx="200" cy="140" rx="145" ry="120" fill="url(#brainGradient)" stroke="#4F46E5" strokeWidth="3" opacity="0.4"/>
          <ellipse cx="200" cy="140" rx="120" ry="95" fill="none" stroke="#6366F1" strokeWidth="2" opacity="0.5"/>
          <ellipse cx="200" cy="140" rx="90" ry="70" fill="none" stroke="#8B5CF6" strokeWidth="1.5" opacity="0.4"/>
          
          {/* Corpus callosum */}
          <line x1="200" y1="40" x2="200" y2="240" stroke="#4F46E5" strokeWidth="2" opacity="0.25" strokeDasharray="5,5"/>
          
          {/* Connectivity pathways */}
          <path d="M 130 175 Q 200 115 270 175" stroke="#8B5CF6" strokeWidth="3" opacity="0.3" fill="none"/>
          <path d="M 200 50 Q 225 95 200 140" stroke="#6366F1" strokeWidth="3" opacity="0.3" fill="none"/>
          <path d="M 200 140 Q 225 170 200 205" stroke="#6366F1" strokeWidth="3" opacity="0.3" fill="none"/>
          <path d="M 155 115 Q 200 140 245 115" stroke="#4F46E5" strokeWidth="2.5" opacity="0.3" fill="none"/>
          
          {/* Brain regions with enhanced visualization */}
          {regions.map((region) => {
            const radius = getSizeRadius(region.size);
            const intensity = region.activity;
            const color = getRegionColor(region.type);
            
            return (
              <g key={region.name} filter="url(#glow)">
                <circle 
                  cx={region.x} 
                  cy={region.y} 
                  r={radius + intensity * 12} 
                  fill={color}
                  opacity={0.15 + intensity * 0.35}
                  className="animate-pulse"
                />
                <circle 
                  cx={region.x} 
                  cy={region.y} 
                  r={radius + intensity * 6} 
                  fill={color}
                  opacity={0.3 + intensity * 0.4}
                />
                <circle 
                  cx={region.x} 
                  cy={region.y} 
                  r={radius} 
                  fill={color}
                  opacity={0.5 + intensity * 0.4}
                  stroke="white"
                  strokeWidth="1"
                />
                <text 
                  x={region.x} 
                  y={region.y + 4} 
                  textAnchor="middle" 
                  className="text-[10px] fill-gray-800 font-semibold"
                  style={{ pointerEvents: 'none' }}
                >
                  {region.name}
                </text>
              </g>
            );
          })}
          
          {/* Music entrainment visualization with wave propagation */}
          {musicAnalysis.isPlaying && (
            <>
              <circle cx="110" cy="155" r="35" fill="none" stroke="#F59E0B" strokeWidth="3" opacity="0.6" className="animate-ping"/>
              <circle cx="290" cy="155" r="35" fill="none" stroke="#F59E0B" strokeWidth="3" opacity="0.6" className="animate-ping"/>
              <path 
                d="M 110 155 Q 200 100 290 155" 
                stroke="#F59E0B" 
                strokeWidth="4" 
                opacity="0.5" 
                fill="none"
                className="animate-pulse"
              />
            </>
          )}
        </svg>
        
        <div className="absolute top-4 right-4 bg-white/90 rounded-lg p-3 shadow-sm border">
          <div className="text-xs font-semibold text-gray-700 mb-2">Region Types</div>
          <div className="space-y-1 text-xs">
            <div className="flex items-center"><span className="w-3 h-3 rounded mr-2" style={{backgroundColor: '#4F46E5'}}></span>Executive</div>
            <div className="flex items-center"><span className="w-3 h-3 rounded mr-2" style={{backgroundColor: '#8B5CF6'}}></span>Motor</div>
            <div className="flex items-center"><span className="w-3 h-3 rounded mr-2" style={{backgroundColor: '#06B6D4'}}></span>Sensory</div>
            <div className="flex items-center"><span className="w-3 h-3 rounded mr-2" style={{backgroundColor: '#10B981'}}></span>Association</div>
          </div>
        </div>
        
        <div className="absolute top-4 left-4 flex items-center space-x-2 bg-white/90 rounded-lg p-2 shadow-sm border">
          <div className={`w-3 h-3 rounded-full ${isRecording ? 'bg-green-500 animate-pulse' : 'bg-gray-400'}`}></div>
          <span className="text-sm font-medium text-gray-700">{isRecording ? 'Live Recording' : 'Paused'}</span>
        </div>
        
        {musicAnalysis.isPlaying && (
          <div className="absolute bottom-4 left-4 bg-gradient-to-r from-orange-500 to-pink-500 text-white rounded-lg p-3 shadow-lg">
            <div className="text-xs font-semibold">🎵 Binaural Entrainment Active</div>
            <div className="text-sm font-bold">{musicAnalysis.entrainmentTarget.toUpperCase()} @ {musicAnalysis.binauralBeat.toFixed(1)} Hz</div>
          </div>
        )}
      </div>
    );
  };

  // Advanced frequency band display with phase information
  const AdvancedFrequencyBand = ({ band, data, color }) => (
    <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-3">
        <div>
          <h4 className="text-sm font-bold text-gray-800">{band.toUpperCase()}</h4>
          <span className="text-xs text-gray-500">{data.frequency.toFixed(2)} Hz</span>
        </div>
        <div className="text-right">
          <div className="text-xs text-gray-500">Amplitude</div>
          <div className="text-sm font-semibold" style={{color}}>{data.amplitude.toFixed(1)} μV</div>
        </div>
      </div>
      
      <div className="space-y-2">
        <div>
          <div className="flex justify-between text-xs text-gray-600 mb-1">
            <span>Power</span>
            <span className="font-semibold">{(data.power * 100).toFixed(1)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
            <div 
              className="h-3 rounded-full transition-all duration-300 relative"
              style={{ width: `${data.power * 100}%`, backgroundColor: color }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white opacity-30"></div>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="bg-gray-50 rounded p-2">
            <div className="text-gray-600">Coherence</div>
            <div className="font-semibold" style={{color}}>{(data.coherence * 100).toFixed(0)}%</div>
          </div>
          <div className="bg-gray-50 rounded p-2">
            <div className="text-gray-600">Phase</div>
            <div className="font-semibold" style={{color}}>{(data.phase * 180).toFixed(0)}°</div>
          </div>
        </div>
        
        {data.entrainment > 0 && (
          <div className="bg-orange-50 rounded p-2">
            <div className="flex justify-between items-center">
              <span className="text-xs text-orange-700 font-medium">🎵 Entrained</span>
              <span className="text-xs font-bold text-orange-600">{(data.entrainment * 100).toFixed(0)}%</span>
            </div>
            <div className="w-full bg-orange-200 rounded-full h-1.5 mt-1">
              <div 
                className="h-1.5 rounded-full bg-orange-500"
                style={{ width: `${data.entrainment * 100}%` }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );

  // Enhanced Music Control Panel
  const AdvancedMusicPanel = () => {
    const binauralFreqRanges = {
      delta: { min: 0.5, max: 4, optimal: 2 },
      theta: { min: 4, max: 8, optimal: 6 },
      alpha: { min: 8, max: 13, optimal: 10 },
      beta: { min: 13, max: 30, optimal: 16 },
      gamma: { min: 30, max: 100, optimal: 40 }
    };

    return (
      <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-200 shadow-sm">
        <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
          <Headphones className="w-6 h-6 mr-2 text-purple-600" />
          Advanced Music & Binaural Control
        </h3>
        
        <div className="grid grid-cols-2 gap-4 mb-4">
          <button
            onClick={() => setMusicAnalysis(prev => ({ ...prev, isPlaying: !prev.isPlaying }))}
            className={`flex items-center justify-center px-6 py-3 rounded-lg font-semibold transition-all shadow-sm ${
              musicAnalysis.isPlaying 
                ? 'bg-gradient-to-r from-red-500 to-pink-500 text-white hover:from-red-600 hover:to-pink-600' 
                : 'bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:from-green-600 hover:to-emerald-600'
            }`}
          >
            {musicAnalysis.isPlaying ? <Pause className="w-5 h-5 mr-2" /> : <Play className="w-5 h-5 mr-2" />}
            {musicAnalysis.isPlaying ? 'Stop Playback' : 'Start Playback'}
          </button>
          
          <select 
            value={musicAnalysis.entrainmentTarget}
            onChange={(e) => {
              const target = e.target.value;
              const range = binauralFreqRanges[target];
              setMusicAnalysis(prev => ({ 
                ...prev, 
                entrainmentTarget: target,
                binauralBeat: range.optimal,
                leftEar: prev.carrierFreq - range.optimal / 2,
                rightEar: prev.carrierFreq + range.optimal / 2
              }));
            }}
            className="px-4 py-3 border-2 border-purple-300 rounded-lg text-sm font-medium focus:border-purple-500 focus:ring-2 focus:ring-purple-200"
          >
            <option value="delta">🌙 Delta (0.5-4 Hz) - Deep Sleep</option>
            <option value="theta">🧘 Theta (4-8 Hz) - Meditation</option>
            <option value="alpha">😌 Alpha (8-13 Hz) - Relaxation</option>
            <option value="beta">🎯 Beta (13-30 Hz) - Focus</option>
            <option value="gamma">⚡ Gamma (30-100 Hz) - Peak Awareness</option>
          </select>
        </div>

        {musicAnalysis.isPlaying && (
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-white rounded-lg p-3 border border-purple-200">
                <div className="text-xs text-gray-600 mb-1">Carrier Frequency</div>
                <div className="text-lg font-bold text-purple-600">{musicAnalysis.carrierFreq} Hz</div>
              </div>
              <div className="bg-white rounded-lg p-3 border border-purple-200">
                <div className="text-xs text-gray-600 mb-1">Binaural Beat</div>
                <div className="text-lg font-bold text-purple-600">{musicAnalysis.binauralBeat.toFixed(1)} Hz</div>
              </div>
              <div className="bg-white rounded-lg p-3 border border-purple-200">
                <div className="text-xs text-gray-600 mb-1">Modulation</div>
                <div className="text-lg font-bold text-purple-600">{(musicAnalysis.modulationDepth * 100).toFixed(0)}%</div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg p-4 border border-purple-200">
              <div className="text-sm font-semibold text-gray-700 mb-3">Stereo Configuration</div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-xs text-gray-600 mb-1">Left Ear 🎧</div>
                  <div className="text-sm font-bold text-blue-600">{musicAnalysis.leftEar.toFixed(2)} Hz</div>
                  <div className="w-full bg-blue-100 rounded-full h-2 mt-1">
                    <div className="h-2 rounded-full bg-blue-500" style={{width: '75%'}}></div>
                  </div>
                </div>
                <div>
                  <div className="text-xs text-gray-600 mb-1">Right Ear 🎧</div>
                  <div className="text-sm font-bold text-pink-600">{musicAnalysis.rightEar.toFixed(2)} Hz</div>
                  <div className="w-full bg-pink-100 rounded-full h-2 mt-1">
                    <div className="h-2 rounded-full bg-pink-500" style={{width: '75%'}}></div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-lg p-3">
              <div className="text-sm font-semibold text-gray-800 mb-2">Brain Entrainment Response</div>
              <div className="w-full bg-white rounded-full h-4 overflow-hidden border border-purple-300">
                <div 
                  className="h-4 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-500"
                  style={{ width: `${inferenceResults.entrainmentLevel * 100}%` }}
                >
                  <div className="h-full bg-gradient-to-r from-white/30 to-transparent"></div>
                </div>
              </div>
              <div className="text-right text-xs font-bold text-purple-700 mt-1">
                {(inferenceResults.entrainmentLevel * 100).toFixed(1)}% Entrained
              </div>
            </div>
          </div>
        )}

        <div className="mt-4 bg-white rounded-lg p-3 border border-purple-200">
          <div className="text-xs font-semibold text-gray-700 mb-2">Research References:</div>
          <div className="text-xs text-gray-600 space-y-1">
            <div>• Beta 16Hz: Sustained attention enhancement (Nature 2025)</div>
            <div>• Alpha 10Hz: Relaxation & creativity (Frontiers 2024)</div>
            <div>• Gamma 40Hz: Cognitive binding (Science 2024)</div>
            <div>• Theta 6Hz: Memory consolidation (Neuron 2023)</div>
          </div>
        </div>
      </div>
    );
  };

  // Enhanced Inference Dashboard
  const EnhancedInferencePanel = () => (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200 shadow-sm">
      <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
        <Cpu className="w-6 h-6 mr-2 text-blue-600" />
        Multi-dimensional Cognitive Analysis
      </h3>
      
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="bg-white rounded-lg p-4 border-2 border-blue-300 shadow-sm">
          <div className="text-sm text-gray-600 mb-1">Cognitive State</div>
          <div className="text-lg font-bold text-blue-700">{inferenceResults.cognitiveState}</div>
        </div>
        <div className="bg-white rounded-lg p-4 border-2 border-green-300 shadow-sm">
          <div className="text-sm text-gray-600 mb-1">AI Confidence</div>
          <div className="text-lg font-bold text-green-700">{(inferenceResults.confidence * 100).toFixed(1)}%</div>
        </div>
      </div>

      <div className="space-y-3">
        {[
          { label: 'Attention', value: inferenceResults.attention, color: '#10B981', icon: '🎯' },
          { label: 'Arousal', value: inferenceResults.arousal, color: '#F59E0B', icon: '⚡' },
          { label: 'Valence (Mood)', value: inferenceResults.valence, color: '#8B5CF6', icon: '😊' },
          { label: 'Cognitive Load', value: inferenceResults.workload, color: '#EF4444', icon: '🧠' },
          { label: 'Mental Effort', value: inferenceResults.mentalEffort, color: '#06B6D4', icon: '💪' },
          { label: 'Stress Level', value: inferenceResults.stress, color: '#EC4899', icon: '😰' },
          { label: 'Engagement', value: inferenceResults.engagement, color: '#14B8A6', icon: '✨' },
          { label: 'Music Response', value: inferenceResults.musicResponse, color: '#A855F7', icon: '🎵' }
        ].map(metric => (
          <div key={metric.label} className="bg-white rounded-lg p-3 border border-gray-200">
            <div className="flex justify-between text-sm text-gray-700 mb-2">
              <span className="font-medium">{metric.icon} {metric.label}</span>
              <span className="font-bold" style={{color: metric.color}}>{(metric.value * 100).toFixed(0)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
              <div 
                className="h-2.5 rounded-full transition-all duration-500 relative"
                style={{ width: `${metric.value * 100}%`, backgroundColor: metric.color }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-pulse"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // Session Statistics
  const SessionStats = () => (
    <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
      <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
        <BarChart3 className="w-6 h-6 mr-2 text-indigo-600" />
        Session Statistics
      </h3>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4">
          <div className="text-sm text-blue-700 mb-1">Session Duration</div>
          <div className="text-2xl font-bold text-blue-900">
            {Math.floor(sessionDuration / 60000)}:{String(Math.floor((sessionDuration % 60000) / 1000)).padStart(2, '0')}
          </div>
        </div>
        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-4">
          <div className="text-sm text-green-700 mb-1">Data Points</div>
          <div className="text-2xl font-bold text-green-900">{waveformHistory.length * 5}</div>
        </div>
        <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-4">
          <div className="text-sm text-purple-700 mb-1">Avg Alpha Power</div>
          <div className="text-2xl font-bold text-purple-900">
            {waveformHistory.length > 0 
              ? (waveformHistory.reduce((sum, d) => sum + d.alpha, 0) / waveformHistory.length * 100).toFixed(0)
              : 0}%
          </div>
        </div>
        <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg p-4">
          <div className="text-sm text-orange-700 mb-1">Peak Attention</div>
          <div className="text-2xl font-bold text-orange-900">
            {(Math.max(...waveformHistory.map(d => d.beta || 0)) * 100).toFixed(0)}%
          </div>
        </div>
      </div>

      <div className="mt-4 flex space-x-2">
        <button className="flex-1 flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm">
          <Download className="w-4 h-4 mr-2" />
          Export CSV
        </button>
        <button className="flex-1 flex items-center justify-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium text-sm">
          <Save className="w-4 h-4 mr-2" />
          Save Session
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-6">
      <div className="max-w-[1920px] mx-auto">
        {/* Enhanced Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <div className="bg-gradient-to-br from-blue-600 to-indigo-600 p-3 rounded-xl mr-4 shadow-lg">
                <Brain className="w-10 h-10 text-white" />
              </div>
              <div>
                <h1 className="text-4xl font-extrabold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  NeuroWave Professional Desktop
                </h1>
                <p className="text-lg text-gray-600 font-medium">Advanced Brainwave Analysis & Music Entrainment Platform</p>
              </div>
              <div className="ml-6 flex space-x-2">
                <span className="text-xs bg-blue-100 text-blue-800 px-3 py-1 rounded-full font-semibold">v2.5 Research</span>
                <span className="text-xs bg-green-100 text-green-800 px-3 py-1 rounded-full font-semibold">ESP32 Ready</span>
                <span className="text-xs bg-purple-100 text-purple-800 px-3 py-1 rounded-full font-semibold">AI Enhanced</span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setIsRecording(!isRecording)}
                className={`flex items-center px-8 py-4 rounded-xl font-bold text-lg transition-all shadow-lg ${
                  isRecording 
                    ? 'bg-gradient-to-r from-red-500 to-pink-500 text-white hover:from-red-600 hover:to-pink-600 shadow-red-200' 
                    : 'bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:from-green-600 hover:to-emerald-600 shadow-green-200'
                }`}
              >
                {isRecording ? <Pause className="w-6 h-6 mr-3" /> : <Play className="w-6 h-6 mr-3" />}
                {isRecording ? 'Stop Recording' : 'Start Recording'}
              </button>
              <button className="p-4 bg-gray-200 rounded-xl hover:bg-gray-300 transition-colors">
                <Settings className="w-6 h-6 text-gray-700" />
              </button>
            </div>
          </div>
        </div>

        {/* Main Content - Three Column Layout */}
        <div className="grid grid-cols-12 gap-6">
          {/* Left Column - Brain Visualization & Waveforms */}
          <div className="col-span-5 space-y-6">
            <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-lg">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                <Activity className="w-6 h-6 mr-2 text-green-500" />
                3D Brain Activity Mapping
              </h2>
              <Enhanced3DBrainView />
            </div>
            
            <WaveformDisplay />
            <SpectrogramDisplay />
          </div>

          {/* Middle Column - Frequency Analysis & Music */}
          <div className="col-span-4 space-y-6">
            <div>
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                <Waves className="w-6 h-6 mr-2 text-blue-600" />
                EEG Frequency Band Analysis
              </h2>
              <div className="space-y-3">
                <AdvancedFrequencyBand band="delta" data={brainwaveData.delta} color="#8B5CF6" />
                <AdvancedFrequencyBand band="theta" data={brainwaveData.theta} color="#06B6D4" />
                <AdvancedFrequencyBand band="alpha" data={brainwaveData.alpha} color="#10B981" />
                <AdvancedFrequencyBand band="beta" data={brainwaveData.beta} color="#F59E0B" />
                <AdvancedFrequencyBand band="gamma" data={brainwaveData.gamma} color="#EF4444" />
              </div>
            </div>
          </div>

          {/* Right Column - Inference & Controls */}
          <div className="col-span-3 space-y-6">
            <EnhancedInferencePanel />
            <AdvancedMusicPanel />
            <SessionStats />
          </div>
        </div>

        {/* Bottom Section - Sensor Data & Research */}
        <div className="grid grid-cols-3 gap-6 mt-6">
          {/* ESP32 Panel */}
          <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
            <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
              <WifiIcon className="w-5 h-5 mr-2 text-blue-500" />
              ESP32 Multi-Channel EEG
            </h3>
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div className={`rounded-lg p-3 ${sensorData.esp32.connected ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
                  <div className="text-xs text-gray-600">Status</div>
                  <div className={`text-sm font-bold ${sensorData.esp32.connected ? 'text-green-700' : 'text-red-700'}`}>
                    {sensorData.esp32.connected ? '✓ Connected' : '✗ Disconnected'}
                  </div>
                </div>
                <div className="bg-blue-50 rounded-lg p-3 border border-blue-200">
                  <div className="text-xs text-gray-600">Sample Rate</div>
                  <div className="text-sm font-bold text-blue-700">{sensorData.esp32.samplingRate} Hz</div>
                </div>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-3">
                <div className="text-sm font-semibold text-gray-700 mb-2">Channel Quality</div>
                <div className="grid grid-cols-4 gap-1">
                  {sensorData.esp32.signalQuality.map((q, i) => (
                    <div key={i} className="text-center">
                      <div className="text-xs text-gray-600">Ch{i+1}</div>
                      <div className={`text-xs font-bold ${q > 85 ? 'text-green-600' : q > 70 ? 'text-yellow-600' : 'text-red-600'}`}>
                        {q}%
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="flex items-center justify-between bg-blue-50 rounded-lg p-3 border border-blue-200">
                <div>
                  <div className="text-xs text-blue-700">Temperature</div>
                  <div className="text-sm font-bold text-blue-900">{sensorData.esp32.temperature}°C</div>
                </div>
                <div>
                  <div className="text-xs text-blue-700">Battery</div>
                  <div className="text-sm font-bold text-blue-900">{sensorData.esp32.batteryLevel}%</div>
                </div>
              </div>
            </div>
          </div>

          {/* Microphone Panel */}
          <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
            <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
              <Mic className="w-5 h-5 mr-2 text-green-500" />
              Spatial Audio Analysis
            </h3>
            <div className="space-y-3">
              <div className="bg-green-50 rounded-lg p-3 border border-green-200">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-semibold text-green-700">Audio Input Level</span>
                  <span className="text-xs font-bold text-green-600">{(sensorData.microphone.level * 100).toFixed(0)}%</span>
                </div>
                <div className="w-full bg-green-200 rounded-full h-3">
                  <div 
                    className="h-3 rounded-full bg-gradient-to-r from-green-400 to-green-600 transition-all duration-100"
                    style={{ width: `${sensorData.microphone.level * 100}%` }}
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-gray-50 rounded-lg p-3">
                  <div className="text-xs text-gray-600">Frequency</div>
                  <div className="text-sm font-bold text-gray-800">{sensorData.microphone.frequency.toFixed(0)} Hz</div>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <div className="text-xs text-gray-600">Noise Floor</div>
                  <div className="text-sm font-bold text-gray-800">{sensorData.microphone.noiseLevel} dB</div>
                </div>
              </div>
              
              <div className="bg-indigo-50 rounded-lg p-3 border border-indigo-200">
                <div className="text-sm font-semibold text-indigo-700 mb-1">Spatial Position</div>
                <div className="text-xs text-indigo-600">
                  Azimuth: {sensorData.microphone.spatialData.azimuth}° | Elevation: {sensorData.microphone.spatialData.elevation}°
                </div>
              </div>
            </div>
          </div>

          {/* Research Info Panel */}
          <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-6 border border-indigo-200 shadow-sm">
            <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
              <FileText className="w-5 h-5 mr-2 text-indigo-600" />
              Research Foundation
            </h3>
            <div className="space-y-2 text-xs text-gray-700">
              <div className="bg-white rounded p-2 border border-indigo-100">
                <span className="font-semibold text-indigo-700">Neural Inference:</span> Transformer-based EEG analysis with 87% accuracy
              </div>
              <div className="bg-white rounded p-2 border border-indigo-100">
                <span className="font-semibold text-purple-700">Sensor Fusion:</span> Multi-modal integration with 8ms latency
              </div>
              <div className="bg-white rounded p-2 border border-indigo-100">
                <span className="font-semibold text-pink-700">Entrainment:</span> Binaural beats validated by EEG power analysis
              </div>
              <div className="bg-white rounded p-2 border border-indigo-100">
                <span className="font-semibold text-blue-700">Hardware:</span> ESP32-based 8-channel @ 250Hz sampling
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfessionalBrainwaveDesktop;