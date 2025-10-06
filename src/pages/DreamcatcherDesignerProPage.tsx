import React, { useState, useEffect, useMemo, useCallback, memo, useRef } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer, AreaChart, Area, ScatterChart, Scatter, BarChart, Bar } from 'recharts';
import { Settings, Download, Upload, Zap, Activity, Target, Layers, Info, RotateCcw, Play, Pause, Save, FolderOpen } from 'lucide-react';
import * as math from 'mathjs';

// Enhanced Constants with Desktop Optimizations
const PHYSICS_CONSTANTS = {
  LIGHT_SPEED: 299792458,
  FREE_SPACE_IMPEDANCE: 377,
  PI: Math.PI,
  MU0: 4 * Math.PI * 1e-7,
  PLANCK: 6.626e-34,
  BOLTZMANN: 1.381e-23
};

// Material Library with Extended Properties
const MaterialFactory = {
  materials: {
    sinew: { 
      name: 'Traditional Sinew', er: 3.2, conductivity: 1e-10, density: 1100, 
      tensileStrength: 150e6, lossTangent: 0.02, color: '#8B4513',
      thermalConductivity: 0.25, specificHeat: 1400, meltingPoint: 573,
      category: 'Traditional', cost: 5, availability: 'High'
    },
    copper: { 
      name: 'Copper Wire', er: 1.0, conductivity: 5.96e7, density: 8960, 
      tensileStrength: 220e6, lossTangent: 0.0001, color: '#B87333',
      thermalConductivity: 401, specificHeat: 385, meltingPoint: 1358,
      category: 'Conductor', cost: 25, availability: 'High'
    },
    carbonFiber: { 
      name: 'Carbon Fiber', er: 3.5, conductivity: 1e4, density: 1600, 
      tensileStrength: 3500e6, lossTangent: 0.01, color: '#36454F',
      thermalConductivity: 150, specificHeat: 710, meltingPoint: 3773,
      category: 'High-Performance', cost: 200, availability: 'Medium'
    },
    silver: { 
      name: 'Silver Wire', er: 1.0, conductivity: 6.14e7, density: 10490, 
      tensileStrength: 170e6, lossTangent: 0.00005, color: '#C0C0C0',
      thermalConductivity: 429, specificHeat: 235, meltingPoint: 1235,
      category: 'Precious', cost: 800, availability: 'Low'
    },
    silk: { 
      name: 'Spider Silk', er: 2.8, conductivity: 1e-12, density: 1300, 
      tensileStrength: 1000e6, lossTangent: 0.005, color: '#FFF8DC',
      thermalConductivity: 0.045, specificHeat: 1340, meltingPoint: 533,
      category: 'Biomaterial', cost: 1000, availability: 'Very Low'
    },
    graphene: {
      name: 'Graphene Sheet', er: 2.5, conductivity: 1e8, density: 2267,
      tensileStrength: 130e9, lossTangent: 0.0001, color: '#2C2C2C',
      thermalConductivity: 5300, specificHeat: 790, meltingPoint: 4273,
      category: 'Experimental', cost: 10000, availability: 'Research'
    },
    nitinol: {
      name: 'Nitinol (Memory Alloy)', er: 1.2, conductivity: 8.3e5, density: 6450,
      tensileStrength: 800e6, lossTangent: 0.001, color: '#778899',
      thermalConductivity: 8.6, specificHeat: 320, meltingPoint: 1583,
      category: 'Smart Material', cost: 500, availability: 'Low'
    }
  },
  defaultMaterial: { name: 'Default', er: 1.0, conductivity: 1e-10, density: 1000, tensileStrength: 100e6, lossTangent: 0.01, color: '#808080' },
  create: (type) => MaterialFactory.materials[type] || MaterialFactory.defaultMaterial,
  getAll: () => MaterialFactory.materials,
  getByCategory: (category) => Object.entries(MaterialFactory.materials).filter(([_, mat]) => mat.category === category)
};

// Pattern Strategy with Animation Support
class PatternRenderer {
  static strategies = {
    traditional: (ctx, params) => PatternRenderer.drawTraditional(ctx, params),
    spiral: (ctx, params) => PatternRenderer.drawSpiral(ctx, params),
    fractal: (ctx, params) => PatternRenderer.drawFractal(ctx, params),
    concentric: (ctx, params) => PatternRenderer.drawConcentric(ctx, params),
    hexagonal: (ctx, params) => PatternRenderer.drawHexagonal(ctx, params),
    mandala: (ctx, params) => PatternRenderer.drawMandala(ctx, params),
    fibonacci: (ctx, params) => PatternRenderer.drawFibonacci(ctx, params),
    penrose: (ctx, params) => PatternRenderer.drawPenrose(ctx, params),
    voronoi: (ctx, params) => PatternRenderer.drawVoronoi(ctx, params),
    neural: (ctx, params) => PatternRenderer.drawNeural(ctx, params)
  };

  static render(pattern, ctx, params) {
    return PatternRenderer.strategies[pattern]?.(ctx, params);
  }

  static drawTraditional(ctx, { cx, cy, r, anchors, time = 0, animation }) {
    const points = Array.from({ length: anchors }, (_, i) => {
      const baseAngle = i * 2 * PHYSICS_CONSTANTS.PI / anchors;
      const animAngle = animation ? baseAngle + time * 0.001 : baseAngle;
      return {
        x: cx + r * Math.cos(animAngle),
        y: cy + r * Math.sin(animAngle)
      };
    });
    
    ctx.beginPath();
    points.forEach(p => { ctx.moveTo(cx, cy); ctx.lineTo(p.x, p.y); });
    
    for (let rad = r * 0.15; rad < r; rad += r * 0.15) {
      for (let i = 0; i <= anchors; i++) {
        const angle = i * 2 * PHYSICS_CONSTANTS.PI / anchors;
        const x = cx + rad * Math.cos(angle), y = cy + rad * Math.sin(angle);
        i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      }
    }
    ctx.stroke();
  }

  static drawFibonacci(ctx, { cx, cy, r }) {
    ctx.beginPath();
    const phi = (1 + Math.sqrt(5)) / 2;
    const turns = 5;
    const steps = 300;
    
    for (let i = 0; i <= steps; i++) {
      const theta = i * phi * 0.2;
      const radius = r * Math.sqrt(i / steps) * 0.9;
      const x = cx + radius * Math.cos(theta);
      const y = cy + radius * Math.sin(theta);
      i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
    }
    ctx.stroke();
  }

  static drawPenrose(ctx, { cx, cy, r }) {
    ctx.beginPath();
    const drawPenroseTriangle = (x, y, size, rotation = 0) => {
      for (let i = 0; i < 3; i++) {
        const angle1 = (i * 2 * PHYSICS_CONSTANTS.PI / 3) + rotation;
        const angle2 = ((i + 1) * 2 * PHYSICS_CONSTANTS.PI / 3) + rotation;
        const x1 = x + size * Math.cos(angle1);
        const y1 = y + size * Math.sin(angle1);
        const x2 = x + size * Math.cos(angle2);
        const y2 = y + size * Math.sin(angle2);
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
      }
    };
    
    for (let layer = 1; layer <= 3; layer++) {
      const layerRadius = r * layer / 4;
      for (let i = 0; i < 6; i++) {
        const angle = i * PHYSICS_CONSTANTS.PI / 3;
        const x = cx + layerRadius * Math.cos(angle);
        const y = cy + layerRadius * Math.sin(angle);
        drawPenroseTriangle(x, y, layerRadius * 0.3, angle);
      }
    }
    ctx.stroke();
  }

  static drawVoronoi(ctx, { cx, cy, r, anchors = 20 }) {
    ctx.beginPath();
    const sites = Array.from({ length: anchors }, () => ({
      x: cx + (Math.random() - 0.5) * r * 1.6,
      y: cy + (Math.random() - 0.5) * r * 1.6
    }));
    
    // Simplified Voronoi cell outlines
    const resolution = 100;
    for (let x = cx - r; x <= cx + r; x += r * 2 / resolution) {
      for (let y = cy - r; y <= cy + r; y += r * 2 / resolution) {
        let minDist = Infinity;
        let closest = 0;
        sites.forEach((site, i) => {
          const dist = Math.sqrt((x - site.x) ** 2 + (y - site.y) ** 2);
          if (dist < minDist) {
            minDist = dist;
            closest = i;
          }
        });
        
        // Draw cell boundaries
        sites.forEach((site, i) => {
          if (i !== closest) {
            const dist = Math.sqrt((x - site.x) ** 2 + (y - site.y) ** 2);
            if (Math.abs(dist - minDist) < r * 0.02) {
              ctx.moveTo(x - 1, y);
              ctx.lineTo(x + 1, y);
            }
          }
        });
      }
    }
    ctx.stroke();
  }

  static drawNeural(ctx, { cx, cy, r, anchors = 12 }) {
    ctx.beginPath();
    const neurons = Array.from({ length: anchors }, (_, i) => {
      const angle = i * 2 * PHYSICS_CONSTANTS.PI / anchors;
      return {
        x: cx + r * 0.7 * Math.cos(angle),
        y: cy + r * 0.7 * Math.sin(angle)
      };
    });
    
    // Neural connections
    neurons.forEach((neuron1, i) => {
      neurons.forEach((neuron2, j) => {
        if (i < j) {
          const distance = Math.sqrt((neuron1.x - neuron2.x) ** 2 + (neuron1.y - neuron2.y) ** 2);
          const connection_strength = 1 / (1 + distance / (r * 0.3));
          if (connection_strength > 0.3) {
            ctx.globalAlpha = connection_strength * 0.8;
            ctx.moveTo(neuron1.x, neuron1.y);
            ctx.lineTo(neuron2.x, neuron2.y);
          }
        }
      });
    });
    
    ctx.globalAlpha = 1;
    ctx.stroke();
    
    // Draw neurons as circles
    neurons.forEach(neuron => {
      ctx.beginPath();
      ctx.arc(neuron.x, neuron.y, 3, 0, 2 * PHYSICS_CONSTANTS.PI);
      ctx.fill();
    });
  }

  // Existing patterns simplified for space...
  static drawSpiral(ctx, { cx, cy, r, anchors }) {
    ctx.beginPath();
    for (let i = 0; i <= 200; i++) {
      const t = (i / 200) * 3 * 2 * PHYSICS_CONSTANTS.PI;
      const rad = r * (1 - i / 200) * 0.8;
      const x = cx + rad * Math.cos(t), y = cy + rad * Math.sin(t);
      i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
    }
    for (let i = 0; i < anchors; i++) {
      const angle = i * 2 * PHYSICS_CONSTANTS.PI / anchors;
      ctx.moveTo(cx, cy);
      ctx.lineTo(cx + r * Math.cos(angle), cy + r * Math.sin(angle));
    }
    ctx.stroke();
  }

  static drawFractal(ctx, { cx, cy, r, depth = 2 }) {
    const drawSierpinski = (x1, y1, x2, y2, x3, y3, d) => {
      if (d === 0) {
        ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.lineTo(x3, y3); ctx.closePath();
        return;
      }
      const [mx1, my1] = [(x1 + x2) / 2, (y1 + y2) / 2];
      const [mx2, my2] = [(x2 + x3) / 2, (y2 + y3) / 2];
      const [mx3, my3] = [(x3 + x1) / 2, (y3 + y1) / 2];
      drawSierpinski(x1, y1, mx1, my1, mx3, my3, d - 1);
      drawSierpinski(mx1, my1, x2, y2, mx2, my2, d - 1);
      drawSierpinski(mx3, my3, mx2, my2, x3, y3, d - 1);
    };
    
    ctx.beginPath();
    drawSierpinski(cx, cy - r * 0.8, cx - r * 0.7, cy + r * 0.6, cx + r * 0.7, cy + r * 0.6, depth);
    ctx.stroke();
  }

  static drawConcentric(ctx, { cx, cy, r, anchors }) {
    ctx.beginPath();
    for (let rad = r * 0.15; rad < r; rad += r * 0.12) {
      ctx.moveTo(cx + rad, cy);
      ctx.arc(cx, cy, rad, 0, 2 * PHYSICS_CONSTANTS.PI);
    }
    for (let i = 0; i < anchors; i++) {
      const angle = i * 2 * PHYSICS_CONSTANTS.PI / anchors;
      ctx.moveTo(cx, cy);
      ctx.lineTo(cx + r * Math.cos(angle), cy + r * Math.sin(angle));
    }
    ctx.stroke();
  }

  static drawHexagonal(ctx, { cx, cy, r }) {
    ctx.beginPath();
    const hexSize = r / 5;
    for (let layer = 1; layer <= 4; layer++) {
      for (let i = 0; i < 6; i++) {
        const angle = i * PHYSICS_CONSTANTS.PI / 3;
        const x = cx + layer * hexSize * Math.cos(angle);
        const y = cy + layer * hexSize * Math.sin(angle);
        for (let j = 0; j <= 6; j++) {
          const hexAngle = j * PHYSICS_CONSTANTS.PI / 3;
          const hx = x + hexSize * 0.25 * Math.cos(hexAngle);
          const hy = y + hexSize * 0.25 * Math.sin(hexAngle);
          j === 0 ? ctx.moveTo(hx, hy) : ctx.lineTo(hx, hy);
        }
      }
    }
    ctx.stroke();
  }

  static drawMandala(ctx, { cx, cy, r, anchors }) {
    ctx.beginPath();
    for (let layer = 1; layer <= 4; layer++) {
      const layerRadius = (r * layer) / 4;
      for (let i = 0; i < anchors; i++) {
        const angle = i * 2 * PHYSICS_CONSTANTS.PI / anchors;
        const petalRadius = layerRadius * 0.25;
        for (let t = 0; t <= 2 * PHYSICS_CONSTANTS.PI; t += 0.15) {
          const rad = petalRadius * (1 + 0.5 * Math.cos(3 * t));
          const x = cx + layerRadius * Math.cos(angle) + rad * Math.cos(t + angle);
          const y = cy + layerRadius * Math.sin(angle) + rad * Math.sin(t + angle);
          t === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
        }
      }
    }
    ctx.stroke();
  }
}

// Physics Calculator with Extended Analysis
class PhysicsCalculator {
  static calculate(config) {
    if (!config || typeof config !== 'object') {
      return PhysicsCalculator.getDefaultPhysics();
    }
    
    const { diameter = 100, materialType = 'sinew', webSpacing = 10, temperature = 293 } = config;
    const m = MaterialFactory.create(materialType);
    
    if (!m) return PhysicsCalculator.getDefaultPhysics();
    
    const D = diameter / 1000;
    const k = 2 * PHYSICS_CONSTANTS.PI / (PHYSICS_CONSTANTS.LIGHT_SPEED / (1e9)); // Wave number at 1 GHz
    
    // Temperature-dependent properties
    const tempFactor = 1 + 0.004 * (temperature - 293); // Linear approximation
    const effectiveEr = m.er * tempFactor;
    const effectiveConductivity = m.conductivity / tempFactor;
    
    const basicFreq = PHYSICS_CONSTANTS.LIGHT_SPEED / (PHYSICS_CONSTANTS.PI * D);
    const effectiveFreq = basicFreq / Math.sqrt(effectiveEr);
    const wavelength = PHYSICS_CONSTANTS.LIGHT_SPEED / effectiveFreq;
    const qFactor = 1 / (m.lossTangent || 0.01);
    const radiationResistance = 197 * Math.pow(D / wavelength, 4);
    const inductance = Math.max(0, 0.001 * D * (Math.log(8 * D / (webSpacing / 1000)) - 2) * 1e9);
    
    // Additional calculations
    const skinDepth = 1 / Math.sqrt(PHYSICS_CONSTANTS.PI * effectiveFreq * PHYSICS_CONSTANTS.MU0 * effectiveConductivity);
    const nearFieldDistance = Math.pow(wavelength, 2) / (2 * PHYSICS_CONSTANTS.PI * D);
    const reactiveNearField = wavelength / (2 * PHYSICS_CONSTANTS.PI);
    const directivity = 1.5; // Typical for loop antenna
    const gain = directivity * (radiationResistance / (radiationResistance + 10));
    
    // Bioelectric compatibility
    const alphaWaveAttenuation = PhysicsCalculator.calculateBioelectricResponse(10, effectiveFreq * 1e6, qFactor);
    const betaWaveAttenuation = PhysicsCalculator.calculateBioelectricResponse(20, effectiveFreq * 1e6, qFactor);
    const gammaWaveAttenuation = PhysicsCalculator.calculateBioelectricResponse(40, effectiveFreq * 1e6, qFactor);
    
    return {
      basicFreq: basicFreq / 1e6, effectiveFreq: effectiveFreq / 1e6, wavelength, qFactor,
      radiationResistance, inductance, bandwidth: effectiveFreq / qFactor / 1e6,
      efficiency: radiationResistance / (radiationResistance + 10),
      electricField: PHYSICS_CONSTANTS.FREE_SPACE_IMPEDANCE * PHYSICS_CONSTANTS.PI * Math.pow(D / wavelength, 2),
      skinDepth: skinDepth * 1e6, nearFieldDistance, reactiveNearField, directivity, gain,
      alphaWaveAttenuation, betaWaveAttenuation, gammaWaveAttenuation,
      thermalNoise: 4 * PHYSICS_CONSTANTS.BOLTZMANN * temperature * (effectiveFreq / qFactor),
      cost: m.cost || 0, materialCategory: m.category
    };
  }

  static calculateBioelectricResponse(bioFreq, resonantFreq, qFactor) {
    const ratio = bioFreq / resonantFreq;
    if (ratio < 1e-6) return 0; // Pass through
    return -20 * Math.log10(1 / Math.sqrt(1 + Math.pow(ratio * qFactor, 2)));
  }

  static getDefaultPhysics() {
    return {
      basicFreq: 955, effectiveFreq: 955, wavelength: 0.314, qFactor: 100,
      radiationResistance: 0.001, inductance: 100, bandwidth: 9.55,
      efficiency: 0.0001, electricField: 0.1, skinDepth: 100,
      nearFieldDistance: 0.01, reactiveNearField: 0.05, directivity: 1.5,
      gain: 0.0001, alphaWaveAttenuation: 0, betaWaveAttenuation: -20,
      gammaWaveAttenuation: -40, thermalNoise: 1e-15, cost: 0
    };
  }

  static generateFrequencyResponse(physics, points = 100) {
    if (!physics || typeof physics.effectiveFreq === 'undefined') return [];
    
    const { effectiveFreq, bandwidth, qFactor } = physics;
    return Array.from({ length: points }, (_, i) => {
      const f = effectiveFreq * (0.01 + i * 5 / points);
      const x = (f - effectiveFreq) / (bandwidth || 1);
      const magnitude = 1 / Math.sqrt(1 + x * x);
      const phase = Math.atan(x) * 180 / PHYSICS_CONSTANTS.PI;
      const groupDelay = qFactor / (2 * PHYSICS_CONSTANTS.PI * effectiveFreq * (1 + x * x));
      
      return {
        frequency: f.toFixed(2),
        magnitude: magnitude.toFixed(4),
        phase: phase.toFixed(2),
        dB: (20 * Math.log10(magnitude)).toFixed(2),
        groupDelay: groupDelay.toFixed(6),
        vswr: ((1 + Math.abs(magnitude)) / (1 - Math.abs(magnitude))).toFixed(2)
      };
    });
  }

  static generateRadiationPattern(config, points = 72) {
    if (!config) return [];
    
    return Array.from({ length: points }, (_, i) => {
      const angle = i * 5;
      const theta = angle * PHYSICS_CONSTANTS.PI / 180;
      const phi = 0; // E-plane pattern
      
      let pattern = Math.abs(Math.sin(theta));
      
      // Pattern modifications based on web structure
      if (config.webPattern === 'spiral') {
        pattern *= (1 + 0.3 * Math.cos(4 * theta));
      } else if (config.webPattern === 'fractal') {
        pattern *= (1 + 0.2 * Math.sin(8 * theta));
      } else if (config.webPattern === 'fibonacci') {
        const phi_ratio = (1 + Math.sqrt(5)) / 2;
        pattern *= (1 + 0.15 * Math.cos(phi_ratio * theta));
      } else if (config.webPattern !== 'traditional') {
        pattern *= (1 + 0.2 * Math.cos((config.anchorPoints || 8) * theta));
      }
      
      const dBValue = 20 * Math.log10(pattern + 0.001);
      
      return {
        angle, pattern: pattern.toFixed(4), dB: dBValue.toFixed(2),
        eTheta: (pattern * Math.cos(phi)).toFixed(4),
        ePhi: (pattern * Math.sin(phi)).toFixed(4),
        polarization: 'Vertical'
      };
    });
  }

  static generateBioelectricAnalysis(physics) {
    const bioFrequencies = [
      { name: 'Delta (0.5-4 Hz)', minFreq: 0.5, maxFreq: 4, type: 'brainwave', desired: 'pass' },
      { name: 'Theta (4-8 Hz)', minFreq: 4, maxFreq: 8, type: 'brainwave', desired: 'pass' },
      { name: 'Alpha (8-13 Hz)', minFreq: 8, maxFreq: 13, type: 'brainwave', desired: 'pass' },
      { name: 'Beta (13-30 Hz)', minFreq: 13, maxFreq: 30, type: 'brainwave', desired: 'moderate' },
      { name: 'Gamma (30-100 Hz)', minFreq: 30, maxFreq: 100, type: 'brainwave', desired: 'filter' },
      { name: '60Hz Power Line', minFreq: 60, maxFreq: 60, type: 'interference', desired: 'filter' },
      { name: 'FM Radio (88-108 MHz)', minFreq: 88e6, maxFreq: 108e6, type: 'interference', desired: 'filter' },
      { name: 'WiFi 2.4GHz', minFreq: 2.4e9, maxFreq: 2.485e9, type: 'interference', desired: 'filter' },
      { name: 'Cell 850MHz', minFreq: 824e6, maxFreq: 894e6, type: 'interference', desired: 'filter' },
      { name: '5G mmWave', minFreq: 24e9, maxFreq: 40e9, type: 'interference', desired: 'filter' }
    ];
    
    return bioFrequencies.map(bio => {
      const centerFreq = (bio.minFreq + bio.maxFreq) / 2;
      const attenuation = PhysicsCalculator.calculateBioelectricResponse(
        centerFreq, physics.effectiveFreq * 1e6, physics.qFactor
      );
      
      let effectiveness = 'Poor';
      if (bio.desired === 'pass' && attenuation > -3) effectiveness = 'Excellent';
      else if (bio.desired === 'moderate' && attenuation < -6 && attenuation > -20) effectiveness = 'Good';
      else if (bio.desired === 'filter' && attenuation < -20) effectiveness = 'Excellent';
      else if (bio.desired === 'filter' && attenuation < -10) effectiveness = 'Good';
      
      return { ...bio, centerFreq, attenuation: attenuation.toFixed(1), effectiveness };
    });
  }
}

// Enhanced Custom Hooks
const usePhysics = (config, temperature = 293) => {
  return useMemo(() => {
    if (!config) return PhysicsCalculator.getDefaultPhysics();
    return PhysicsCalculator.calculate({ ...config, temperature });
  }, [config?.diameter, config?.materialType, config?.webSpacing, temperature]);
};

const useCanvasRenderer = (canvasRef, config, animation = false) => {
  const animationRef = useRef();
  const [animationTime, setAnimationTime] = useState(0);

  const render = useCallback((time = animationTime) => {
    const canvas = canvasRef.current;
    if (!canvas || !config) return;
    
    const ctx = canvas.getContext('2d');
    const { width, height } = canvas;
    const centerX = width / 2, centerY = height / 2;
    const radius = Math.min(centerX, centerY) * 0.75;
    const material = MaterialFactory.create(config.materialType || 'sinew');
    
    // High-DPI support
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);
    canvas.style.width = rect.width + 'px';
    canvas.style.height = rect.height + 'px';
    
    // Clear with gradient background
    const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, radius * 1.5);
    gradient.addColorStop(0, '#1a1a2e');
    gradient.addColorStop(0.7, '#16213e');
    gradient.addColorStop(1, '#0f0f0f');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width / dpr, canvas.height / dpr);
    
    // Enhanced outer hoop with shadow
    ctx.shadowColor = material.color;
    ctx.shadowBlur = 10;
    ctx.strokeStyle = material.color;
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, 2 * PHYSICS_CONSTANTS.PI);
    ctx.stroke();
    
    // Reset shadow
    ctx.shadowBlur = 0;
    
    // Web pattern with enhanced rendering
    ctx.lineWidth = 2;
    ctx.globalAlpha = 0.8;
    PatternRenderer.render(config.webPattern || 'traditional', ctx, {
      cx: centerX, cy: centerY, r: radius,
      anchors: config.anchorPoints || 8,
      depth: config.fractalDepth || 2,
      time: time,
      animation: animation
    });
    
    // Center hole with glow effect
    ctx.globalAlpha = 1;
    const holeRadius = radius * (config.centerHoleRatio || 0.3);
    const holeGradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, holeRadius);
    holeGradient.addColorStop(0, '#000000');
    holeGradient.addColorStop(0.8, '#1a1a2e');
    holeGradient.addColorStop(1, material.color + '40');
    ctx.fillStyle = holeGradient;
    ctx.beginPath();
    ctx.arc(centerX, centerY, holeRadius, 0, 2 * PHYSICS_CONSTANTS.PI);
    ctx.fill();
    
    // Enhanced feathers with physics simulation
    const featherCount = config.featherCount || 3;
    const featherSpacing = Math.min(60, (radius * 2) / (featherCount + 1));
    
    for (let i = 0; i < featherCount; i++) {
      const x = centerX + (i - (featherCount - 1) / 2) * featherSpacing;
      const baseY = centerY + radius + 10;
      const featherLength = 50 + Math.sin(time * 0.001 + i) * 10;
      const sway = Math.sin(time * 0.002 + i * 0.5) * 5;
      
      // Feather gradient
      const featherGrad = ctx.createLinearGradient(x, baseY, x + sway, baseY + featherLength);
      featherGrad.addColorStop(0, '#87CEEB');
      featherGrad.addColorStop(0.5, '#4682B4');
      featherGrad.addColorStop(1, '#2F4F4F');
      
      ctx.strokeStyle = featherGrad;
      ctx.lineWidth = 3;
      
      // Main feather stem
      ctx.beginPath();
      ctx.moveTo(x, baseY);
      ctx.quadraticCurveTo(x + sway * 0.5, baseY + featherLength * 0.5, x + sway, baseY + featherLength);
      ctx.stroke();
      
      // Feather barbs with physics
      ctx.lineWidth = 1;
      for (let j = 5; j < featherLength; j += 8) {
        const barbLength = (featherLength - j) / featherLength * 15;
        const barbSway = sway * (j / featherLength);
        const barbY = baseY + j;
        const barbX = x + barbSway;
        
        ctx.beginPath();
        ctx.moveTo(barbX - barbLength, barbY);
        ctx.lineTo(barbX + barbLength, barbY);
        ctx.stroke();
      }
    }
    
    // Add electromagnetic field visualization
    if (config.showFieldLines) {
      ctx.globalAlpha = 0.3;
      ctx.strokeStyle = '#00FFFF';
      ctx.lineWidth = 1;
      
      for (let r = radius * 1.2; r < radius * 2; r += 20) {
        ctx.beginPath();
        ctx.arc(centerX, centerY, r, 0, 2 * PHYSICS_CONSTANTS.PI);
        ctx.stroke();
      }
    }
    
    ctx.globalAlpha = 1;
  }, [config, animationTime, animation]);

  // Animation loop
  useEffect(() => {
    if (animation) {
      const animate = (timestamp) => {
        setAnimationTime(timestamp);
        render(timestamp);
        animationRef.current = requestAnimationFrame(animate);
      };
      animationRef.current = requestAnimationFrame(animate);
      return () => {
        if (animationRef.current) {
          cancelAnimationFrame(animationRef.current);
        }
      };
    } else {
      render();
    }
  }, [render, animation]);

  return render;
};

// Desktop-Optimized Components
const DesktopToolbar = memo(({ onSave, onLoad, onExport, onReset, animation, onToggleAnimation, onToggleFieldLines, showFieldLines }) => (
  <div className="bg-gray-800 border-b border-gray-700 p-3 flex items-center justify-between">
    <div className="flex items-center space-x-4">
      <h1 className="text-xl font-bold text-white flex items-center">
        <Target className="w-6 h-6 mr-2 text-blue-400" />
        Dreamcatcher Designer Pro
      </h1>
      <div className="flex items-center space-x-2 text-sm text-gray-400">
        <Zap className="w-4 h-4" />
          <span>Electromagnetic Analysis Suite</span>
      </div>
    </div>
    
    <div className="flex items-center space-x-2">
      <button onClick={onLoad} className="p-2 hover:bg-gray-700 rounded-lg transition-colors" title="Load Configuration">
        <FolderOpen className="w-5 h-5 text-gray-300" />
      </button>
      <button onClick={onSave} className="p-2 hover:bg-gray-700 rounded-lg transition-colors" title="Save Configuration">
        <Save className="w-5 h-5 text-gray-300" />
      </button>
      <button onClick={onExport} className="p-2 hover:bg-gray-700 rounded-lg transition-colors" title="Export Design">
        <Download className="w-5 h-5 text-gray-300" />
      </button>
      <div className="w-px h-6 bg-gray-600"></div>
      <button 
        onClick={onToggleAnimation} 
        className={`p-2 hover:bg-gray-700 rounded-lg transition-colors ${animation ? 'text-green-400' : 'text-gray-300'}`}
        title="Toggle Animation"
      >
        {animation ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
      </button>
      <button 
        onClick={onToggleFieldLines} 
        className={`p-2 hover:bg-gray-700 rounded-lg transition-colors ${showFieldLines ? 'text-blue-400' : 'text-gray-300'}`}
        title="Toggle Field Lines"
      >
        <Activity className="w-5 h-5" />
      </button>
      <button onClick={onReset} className="p-2 hover:bg-gray-700 rounded-lg transition-colors" title="Reset to Default">
        <RotateCcw className="w-5 h-5 text-gray-300" />
      </button>
    </div>
  </div>
));

const EnhancedControlPanel = memo(({ config, onConfigChange, temperature, onTemperatureChange }) => {
  const materials = MaterialFactory.getAll();
  const patterns = {
    traditional: 'Traditional 8-spoke', spiral: 'Fibonacci Spiral', fractal: 'Sierpinski Web',
    concentric: 'Concentric Circles', hexagonal: 'Hexagonal Mesh', mandala: 'Mandala Pattern',
    fibonacci: 'Golden Ratio Spiral', penrose: 'Penrose Tiling', voronoi: 'Voronoi Diagram',
    neural: 'Neural Network'
  };

  const materialCategories = ['Traditional', 'Conductor', 'High-Performance', 'Precious', 'Biomaterial', 'Experimental', 'Smart Material'];
  
  return (
    <div className="bg-gray-800 rounded-xl p-6 h-full overflow-y-auto">
      <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
        <Settings className="w-6 h-6 mr-2 text-blue-400" />
        Design Parameters
      </h2>
      
      {/* Material Selection with Categories */}
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-3">Material Selection</label>
          <div className="grid grid-cols-2 gap-2 mb-4">
            {materialCategories.map(category => {
              const categoryMaterials = MaterialFactory.getByCategory(category);
              return (
                <div key={category} className="bg-gray-700 rounded-lg p-3">
                  <div className="text-xs text-gray-400 mb-2">{category}</div>
                  <select
                    value={config.materialType}
                    onChange={(e) => onConfigChange({ ...config, materialType: e.target.value })}
                    className="w-full bg-gray-600 text-white rounded px-2 py-1 text-sm"
                  >
                    {categoryMaterials.map(([key, material]) => (
                      <option key={key} value={key}>{material.name}</option>
                    ))}
                  </select>
                </div>
              );
            })}
          </div>
        </div>

        {/* Pattern Selection with Previews */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-3">Web Pattern</label>
          <div className="grid grid-cols-2 gap-2">
            {Object.entries(patterns).map(([key, value]) => (
              <button
                key={key}
                onClick={() => onConfigChange({ ...config, webPattern: key })}
                className={`p-3 rounded-lg text-left transition-all ${
                  config.webPattern === key 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                <div className="font-medium text-sm">{value.split(' ')[0]}</div>
                <div className="text-xs opacity-75">{value.split(' ').slice(1).join(' ')}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Parameter Sliders */}
        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Diameter: {config.diameter}mm
              </label>
              <input
                type="range" min="30" max="500" step="5"
                value={config.diameter}
                onChange={(e) => onConfigChange({ ...config, diameter: parseInt(e.target.value) })}
                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider-thumb"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>30mm</span><span>500mm</span>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Anchor Points: {config.anchorPoints}
              </label>
              <input
                type="range" min="3" max="24" step="1"
                value={config.anchorPoints}
                onChange={(e) => onConfigChange({ ...config, anchorPoints: parseInt(e.target.value) })}
                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Web Spacing: {config.webSpacing}mm
              </label>
              <input
                type="range" min="2" max="50" step="1"
                value={config.webSpacing}
                onChange={(e) => onConfigChange({ ...config, webSpacing: parseInt(e.target.value) })}
                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
              />
            </div>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Center Hole: {(config.centerHoleRatio * 100).toFixed(0)}%
              </label>
              <input
                type="range" min="0.05" max="0.8" step="0.05"
                value={config.centerHoleRatio}
                onChange={(e) => onConfigChange({ ...config, centerHoleRatio: parseFloat(e.target.value) })}
                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Feathers: {config.featherCount}
              </label>
              <input
                type="range" min="0" max="12" step="1"
                value={config.featherCount}
                onChange={(e) => onConfigChange({ ...config, featherCount: parseInt(e.target.value) })}
                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Temperature: {temperature}K ({(temperature - 273).toFixed(0)}°C)
              </label>
              <input
                type="range" min="173" max="473" step="5"
                value={temperature}
                onChange={(e) => onTemperatureChange(parseFloat(e.target.value))}
                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* Pattern Parameters */}
        {config.webPattern === 'fractal' && (
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Fractal Depth: {config.fractalDepth}
            </label>
            <input
              type="range" min="1" max="6" step="1"
              value={config.fractalDepth}
              onChange={(e) => onConfigChange({ ...config, fractalDepth: parseInt(e.target.value) })}
              className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
            />
          </div>
        )}
      </div>
    </div>
  );
});

const DesktopVisualization = memo(({ config, canvasRef, animation, showFieldLines }) => {
  useCanvasRenderer(canvasRef, { ...config, showFieldLines }, animation);
  
  return (
    <div className="bg-gray-800 rounded-xl p-6 h-full flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-white flex items-center">
          <Layers className="w-6 h-6 mr-2 text-green-400" />
          3D Visualization
        </h2>
        <div className="flex items-center space-x-2 text-sm text-gray-400">
          <div className="w-3 h-3 rounded-full bg-green-400"></div>
          <span>Real-time Rendering</span>
        </div>
      </div>
      
      <div className="flex-1 flex items-center justify-center">
        <canvas
          ref={canvasRef}
          className="border border-gray-600 rounded-lg bg-gray-900 shadow-2xl max-w-full max-h-full"
          style={{ width: '100%', height: '100%', maxWidth: '600px', maxHeight: '600px' }}
        />
      </div>
      
      <div className="mt-4 grid grid-cols-3 gap-4 text-center">
        <div className="bg-gray-700 rounded-lg p-3">
          <div className="text-sm text-gray-400">Pattern</div>
          <div className="text-lg font-semibold text-white capitalize">{config.webPattern}</div>
        </div>
        <div className="bg-gray-700 rounded-lg p-3">
          <div className="text-sm text-gray-400">Material</div>
          <div className="text-lg font-semibold text-white">{MaterialFactory.create(config.materialType).name}</div>
        </div>
        <div className="bg-gray-700 rounded-lg p-3">
          <div className="text-sm text-gray-400">Diameter</div>
          <div className="text-lg font-semibold text-white">{config.diameter}mm</div>
        </div>
      </div>
    </div>
  );
});

const PhysicsPanel = memo(({ physics, material, bioelectricData }) => (
  <div className="bg-gray-800 rounded-xl p-6 h-full overflow-y-auto">
    <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
      <Zap className="w-6 h-6 mr-2 text-yellow-400" />
      Physics Analysis
    </h2>
    
    {/* Key Metrics Grid */}
    <div className="grid grid-cols-3 lg:grid-cols-6 gap-3 mb-8">
      {[
        ['Resonance', `${physics.effectiveFreq.toFixed(2)} MHz`, 'text-blue-400'],
        ['Q Factor', physics.qFactor.toFixed(1), 'text-green-400'],
        ['Efficiency', `${(physics.efficiency * 100).toFixed(1)}%`, 'text-purple-400'],
        ['Gain', `${(10 * Math.log10(physics.gain)).toFixed(1)} dB`, 'text-orange-400'],
        ['Skin Depth', `${physics.skinDepth.toFixed(1)} μm`, 'text-red-400'],
        ['Cost', `$${physics.cost.toFixed(0)}`, 'text-yellow-400']
      ].map(([label, value, colorClass]) => (
        <div key={label} className="bg-gray-700 rounded-lg p-4 text-center">
          <div className="text-xs text-gray-400 mb-1">{label}</div>
          <div className={`text-lg font-bold ${colorClass}`}>{value}</div>
        </div>
      ))}
    </div>

    {/* Detailed Analysis Sections */}
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Electromagnetic Properties */}
      <div className="bg-gray-700 rounded-lg p-5">
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
          <Activity className="w-5 h-5 mr-2 text-blue-400" />
          EM Properties
        </h3>
        <div className="space-y-3 text-sm">
          {[
            ['Wavelength', `${physics.wavelength.toFixed(3)} m`],
            ['Radiation Resistance', `${physics.radiationResistance.toFixed(3)} Ω`],
            ['Inductance', `${physics.inductance.toFixed(1)} nH`],
            ['Bandwidth', `${physics.bandwidth.toFixed(2)} MHz`],
            ['Near Field Distance', `${physics.nearFieldDistance.toFixed(3)} m`],
            ['Directivity', `${(10 * Math.log10(physics.directivity)).toFixed(1)} dB`]
          ].map(([prop, val]) => (
            <div key={prop} className="flex justify-between items-center">
              <span className="text-gray-300">{prop}:</span>
              <span className="font-mono text-white">{val}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Material Analysis */}
      <div className="bg-gray-700 rounded-lg p-5">
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
          <Info className="w-5 h-5 mr-2 text-green-400" />
          Material Analysis
        </h3>
        <div className="space-y-3 text-sm">
          {[
            ['Category', material.category],
            ['Dielectric Constant', material.er.toFixed(2)],
            ['Loss Tangent', material.lossTangent.toFixed(6)],
            ['Conductivity', `${material.conductivity.toExponential(2)} S/m`],
            ['Thermal K', `${material.thermalConductivity} W/m·K`],
            ['Availability', material.availability]
          ].map(([prop, val]) => (
            <div key={prop} className="flex justify-between items-center">
              <span className="text-gray-300">{prop}:</span>
              <span className="font-mono text-white">{val}</span>
            </div>
          ))}
        </div>
      </div>
    </div>

    {/* Bioelectric Compatibility */}
    <div className="mt-6 bg-gray-700 rounded-lg p-5">
      <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
        <Target className="w-5 h-5 mr-2 text-purple-400" />
        Bioelectric Filtering Analysis
      </h3>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left border-b border-gray-600">
              <th className="pb-2 text-gray-300">Signal Type</th>
              <th className="pb-2 text-gray-300">Frequency</th>
              <th className="pb-2 text-gray-300">Attenuation</th>
              <th className="pb-2 text-gray-300">Effectiveness</th>
            </tr>
          </thead>
          <tbody className="space-y-2">
            {bioelectricData.slice(0, 6).map((data, i) => (
              <tr key={i} className="border-b border-gray-700">
                <td className="py-2 text-white">{data.name}</td>
                <td className="py-2 font-mono text-gray-300">
                  {data.centerFreq >= 1e9 ? `${(data.centerFreq/1e9).toFixed(1)}G` :
                   data.centerFreq >= 1e6 ? `${(data.centerFreq/1e6).toFixed(1)}M` :
                   data.centerFreq >= 1e3 ? `${(data.centerFreq/1e3).toFixed(1)}k` :
                   `${data.centerFreq.toFixed(1)}`}Hz
                </td>
                <td className="py-2 font-mono text-gray-300">{data.attenuation} dB</td>
                <td className="py-2">
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    data.effectiveness === 'Excellent' ? 'bg-green-600 text-white' :
                    data.effectiveness === 'Good' ? 'bg-blue-600 text-white' :
                    'bg-yellow-600 text-black'
                  }`}>
                    {data.effectiveness}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
));

const ChartsPanel = memo(({ frequencyData, radiationData, bioelectricData }) => {
  const hasData = frequencyData?.length > 0 && radiationData?.length > 0;
  
  if (!hasData) {
    return (
      <div className="bg-gray-800 rounded-xl p-6 h-full flex items-center justify-center">
        <div className="text-center text-gray-400">
          <Activity className="w-12 h-12 mx-auto mb-4 opacity-50" />
          <div>Loading analysis...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-800 rounded-xl p-6 h-full overflow-y-auto">
      <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
        <Activity className="w-6 h-6 mr-2 text-blue-400" />
        Analysis Dashboard
      </h2>
      
      <div className="space-y-8">
        {/* Frequency Response */}
        <div className="bg-gray-700 rounded-lg p-6">
          <h3 className="text-xl font-semibold text-white mb-4">Frequency Response Analysis</h3>
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            <div>
              <h4 className="text-sm font-medium text-gray-300 mb-3">Magnitude & Phase</h4>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={frequencyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="frequency" stroke="#9CA3AF" fontSize={12} />
                  <YAxis yAxisId="mag" stroke="#60A5FA" fontSize={12} />
                  <YAxis yAxisId="phase" orientation="right" stroke="#F59E0B" fontSize={12} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1F2937', border: '1px solid #374151', borderRadius: '8px' }}
                    labelStyle={{ color: '#F3F4F6' }}
                  />
                  <Legend />
                  <Line yAxisId="mag" type="monotone" dataKey="magnitude" stroke="#60A5FA" strokeWidth={2} dot={false} name="Magnitude" />
                  <Line yAxisId="phase" type="monotone" dataKey="phase" stroke="#F59E0B" strokeWidth={2} dot={false} name="Phase (°)" />
                </LineChart>
              </ResponsiveContainer>
            </div>
            
            <div>
              <h4 className="text-sm font-medium text-gray-300 mb-3">VSWR & Group Delay</h4>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={frequencyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="frequency" stroke="#9CA3AF" fontSize={12} />
                  <YAxis stroke="#10B981" fontSize={12} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1F2937', border: '1px solid #374151', borderRadius: '8px' }}
                    labelStyle={{ color: '#F3F4F6' }}
                  />
                  <Legend />
                  <Line type="monotone" dataKey="vswr" stroke="#10B981" strokeWidth={2} dot={false} name="VSWR" />
                  <Line type="monotone" dataKey="groupDelay" stroke="#8B5CF6" strokeWidth={2} dot={false} name="Group Delay (μs)" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* 3D Radiation Pattern */}
        <div className="bg-gray-700 rounded-lg p-6">
          <h3 className="text-xl font-semibold text-white mb-4">3D Radiation Pattern</h3>
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            <div>
              <h4 className="text-sm font-medium text-gray-300 mb-3">Polar Diagram (dB)</h4>
              <ResponsiveContainer width="100%" height={400}>
                <RadarChart data={radiationData.filter((_, i) => i % 2 === 0)}>
                  <PolarGrid stroke="#374151" />
                  <PolarAngleAxis dataKey="angle" tick={{ fontSize: 11, fill: '#9CA3AF' }} />
                  <PolarRadiusAxis 
                    angle={90} 
                    domain={[-40, 0]} 
                    tick={{ fontSize: 10, fill: '#9CA3AF' }}
                  />
                  <Radar
                    name="E-Plane (dB)"
                    dataKey="dB"
                    stroke="#EF4444"
                    fill="#EF4444"
                    fillOpacity={0.2}
                    strokeWidth={2}
                  />
                  <Radar
                    name="H-Plane (dB)"
                    dataKey="dB"
                    stroke="#3B82F6"
                    fill="#3B82F6"
                    fillOpacity={0.1}
                    strokeWidth={2}
                  />
                  <Legend />
                </RadarChart>
              </ResponsiveContainer>
            </div>
            
            <div>
              <h4 className="text-sm font-medium text-gray-300 mb-3">Cartesian View</h4>
              <ResponsiveContainer width="100%" height={400}>
                <AreaChart data={radiationData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="angle" stroke="#9CA3AF" fontSize={12} />
                  <YAxis stroke="#9CA3AF" fontSize={12} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1F2937', border: '1px solid #374151', borderRadius: '8px' }}
                    labelStyle={{ color: '#F3F4F6' }}
                  />
                  <Legend />
                  <Area
                    type="monotone"
                    dataKey="dB"
                    stroke="#10B981"
                    fill="#10B981"
                    fillOpacity={0.3}
                    strokeWidth={2}
                    name="Radiation Pattern (dB)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Bioelectric Filtering Chart */}
        <div className="bg-gray-700 rounded-lg p-6">
          <h3 className="text-xl font-semibold text-white mb-4">Bioelectric Frequency Response</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={bioelectricData.slice(0, 8)} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="name" stroke="#9CA3AF" fontSize={10} angle={-45} textAnchor="end" height={80} />
              <YAxis stroke="#9CA3AF" fontSize={12} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#1F2937', border: '1px solid #374151', borderRadius: '8px' }}
                labelStyle={{ color: '#F3F4F6' }}
              />
              <Bar dataKey="attenuation" name="Attenuation (dB)">
                {bioelectricData.slice(0, 8).map((entry, index) => (
                  <Bar key={`cell-${index}`} fill={
                    entry.effectiveness === 'Excellent' ? '#10B981' :
                    entry.effectiveness === 'Good' ? '#3B82F6' : '#F59E0B'
                  } />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
});

// Main Desktop Application
const DreamcatcherDesigner = () => {
  const [config, setConfig] = useState({
    diameter: 150, materialType: 'sinew', webPattern: 'traditional',
    anchorPoints: 8, webSpacing: 15, centerHoleRatio: 0.3,
    fractalDepth: 2, featherCount: 3
  });
  
  const [temperature, setTemperature] = useState(293); // Kelvin
  const [animation, setAnimation] = useState(false);
  const [showFieldLines, setShowFieldLines] = useState(false);

  const canvasRef = useRef(null);
  const physics = usePhysics(config, temperature);
  const material = useMemo(() => MaterialFactory.create(config.materialType), [config.materialType]);
  
  const frequencyData = useMemo(() => {
    if (!physics) return [];
    return PhysicsCalculator.generateFrequencyResponse(physics);
  }, [physics]);
  
  const radiationData = useMemo(() => {
    if (!config) return [];
    return PhysicsCalculator.generateRadiationPattern(config);
  }, [config]);

  const bioelectricData = useMemo(() => {
    if (!physics) return [];
    return PhysicsCalculator.generateBioelectricAnalysis(physics);
  }, [physics]);

  // Desktop-specific handlers
  const handleSave = () => {
    const configData = JSON.stringify({ config, temperature }, null, 2);
    const blob = new Blob([configData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `dreamcatcher-config-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
  };

  const handleLoad = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          try {
            const data = JSON.parse(e.target.result);
            if (data.config) setConfig(data.config);
            if (data.temperature) setTemperature(data.temperature);
          } catch (err) {
            console.error('Failed to load configuration:', err);
          }
        };
        reader.readAsText(file);
      }
    };
    input.click();
  };

  const handleExport = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const url = canvas.toDataURL('image/png');
      const a = document.createElement('a');
      a.href = url;
      a.download = `dreamcatcher-design-${new Date().toISOString().split('T')[0]}.png`;
      a.click();
    }
  };

  const handleReset = () => {
    setConfig({
      diameter: 150, materialType: 'sinew', webPattern: 'traditional',
      anchorPoints: 8, webSpacing: 15, centerHoleRatio: 0.3,
      fractalDepth: 2, featherCount: 3
    });
    setTemperature(293);
  };

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyboard = (e) => {
      if (e.ctrlKey || e.metaKey) {
        switch (e.key) {
          case 's': e.preventDefault(); handleSave(); break;
          case 'o': e.preventDefault(); handleLoad(); break;
          case 'e': e.preventDefault(); handleExport(); break;
          case 'r': e.preventDefault(); handleReset(); break;
          case ' ': e.preventDefault(); setAnimation(!animation); break;
        }
      }
    };
    
    window.addEventListener('keydown', handleKeyboard);
    return () => window.removeEventListener('keydown', handleKeyboard);
  }, [animation]);

  return (
    <div className="h-screen bg-gray-900 text-white flex flex-col overflow-hidden">
      {/* Desktop Toolbar */}
      <DesktopToolbar 
        onSave={handleSave}
        onLoad={handleLoad}
        onExport={handleExport}
        onReset={handleReset}
        animation={animation}
        onToggleAnimation={() => setAnimation(!animation)}
        onToggleFieldLines={() => setShowFieldLines(!showFieldLines)}
        showFieldLines={showFieldLines}
      />
      
      {/* Main Desktop Layout */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar - Controls */}
        <div className="w-96 border-r border-gray-700 flex flex-col">
          <EnhancedControlPanel 
            config={config} 
            onConfigChange={setConfig}
            temperature={temperature}
            onTemperatureChange={setTemperature}
          />
        </div>
        
        {/* Center - Main Content Area */}
        <div className="flex-1 flex flex-col">
          {/* Top Half - Visualization and Physics */}
          <div className="flex-1 flex">
            {/* Visualization */}
            <div className="flex-1 p-4">
              <DesktopVisualization 
                config={config}
                canvasRef={canvasRef}
                animation={animation}
                showFieldLines={showFieldLines}
              />
            </div>
            
            {/* Physics Panel */}
            <div className="w-80 p-4">
              <PhysicsPanel 
                physics={physics}
                material={material}
                bioelectricData={bioelectricData}
              />
            </div>
          </div>
        </div>
        
        {/* Right Sidebar - Charts */}
        <div className="w-96 border-l border-gray-700 p-4">
          <ChartsPanel 
            frequencyData={frequencyData}
            radiationData={radiationData}
            bioelectricData={bioelectricData}
          />
        </div>
      </div>
      
      {/* Status Bar */}
      <div className="bg-gray-800 border-t border-gray-700 px-4 py-2 flex items-center justify-between text-sm text-gray-400">
        <div className="flex items-center space-x-4">
          <span>Resonance: {physics.effectiveFreq.toFixed(2)} MHz</span>
          <span>•</span>
          <span>Q: {physics.qFactor.toFixed(1)}</span>
          <span>•</span>
          <span>Efficiency: {(physics.efficiency * 100).toFixed(1)}%</span>
        </div>
        <div className="flex items-center space-x-4">
          <span>Temperature: {(temperature - 273).toFixed(0)}°C</span>
          <span>•</span>
          <span>Material: {material.name}</span>
          <span>•</span>
          <span>Ready</span>
        </div>
      </div>
    </div>
  );
};

export default DreamcatcherDesigner;