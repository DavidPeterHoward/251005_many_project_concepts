import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Play, Pause, RotateCw, Volume2, MapPin, Clock } from 'lucide-react';
import * as THREE from 'three';

// Enhanced speaker data with smooth movement paths
const SPEAKERS = [
  {
    id: 'primary',
    name: 'Primary Narrator',
    color: '#3b82f6',
    role: 'Main Content',
    path: [
      { time: 0, azimuth: 0, elevation: 0, distance: 4 },
      { time: 4, azimuth: -45, elevation: 15, distance: 3.5 },
      { time: 8, azimuth: 45, elevation: -10, distance: 5 },
      { time: 12, azimuth: 0, elevation: 20, distance: 4.5 },
      { time: 16, azimuth: 0, elevation: 0, distance: 4 }
    ]
  },
  {
    id: 'concepts',
    name: 'Key Concepts',
    color: '#ef4444', 
    role: 'Definitions',
    path: [
      { time: 0, azimuth: -90, elevation: 30, distance: 3 },
      { time: 4, azimuth: -120, elevation: 40, distance: 2.5 },
      { time: 8, azimuth: -60, elevation: 20, distance: 4 },
      { time: 12, azimuth: -90, elevation: 50, distance: 3.5 },
      { time: 16, azimuth: -90, elevation: 30, distance: 3 }
    ]
  },
  {
    id: 'examples',
    name: 'Examples',
    color: '#22c55e',
    role: 'Applications', 
    path: [
      { time: 0, azimuth: 90, elevation: -20, distance: 5 },
      { time: 4, azimuth: 120, elevation: -10, distance: 4 },
      { time: 8, azimuth: 60, elevation: -30, distance: 6 },
      { time: 12, azimuth: 90, elevation: 0, distance: 4.5 },
      { time: 16, azimuth: 90, elevation: -20, distance: 5 }
    ]
  },
  {
    id: 'context',
    name: 'Context Narrator',
    color: '#a855f7',
    role: 'Transitions',
    path: [
      { time: 0, azimuth: 180, elevation: 10, distance: 6 },
      { time: 4, azimuth: 150, elevation: 25, distance: 5 },
      { time: 8, azimuth: 210, elevation: -5, distance: 7 },
      { time: 12, azimuth: 180, elevation: 30, distance: 5.5 },
      { time: 16, azimuth: 180, elevation: 10, distance: 6 }
    ]
  }
];

// Enhanced content with overlapping speech and phoneme gaps
const LEARNING_CONTENT = {
  title: "Quantum Mechanics: Wave-Particle Duality",
  totalDuration: 16,
  timeline: [
    // Primary content stream
    { speakerId: 'primary', word: 'Quantum', startTime: 0.0, duration: 0.8, phonemeGap: 0.15, emphasis: true },
    { speakerId: 'primary', word: 'mechanics', startTime: 1.0, duration: 0.9, phonemeGap: 0.2, emphasis: true },
    { speakerId: 'primary', word: 'describes', startTime: 2.1, duration: 0.8, phonemeGap: 0.1 },
    { speakerId: 'primary', word: 'the', startTime: 3.0, duration: 0.3, phonemeGap: 0.1 },
    { speakerId: 'primary', word: 'behavior', startTime: 3.4, duration: 0.8, phonemeGap: 0.15 },
    { speakerId: 'primary', word: 'of', startTime: 4.35, duration: 0.25, phonemeGap: 0.1 },
    { speakerId: 'primary', word: 'matter', startTime: 4.7, duration: 0.7, phonemeGap: 0.2 },
    
    // Concepts stream (overlapping)
    { speakerId: 'concepts', word: 'Wave-particle', startTime: 1.5, duration: 1.2, phonemeGap: 0.2, emphasis: true },
    { speakerId: 'concepts', word: 'duality', startTime: 2.9, duration: 0.9, phonemeGap: 0.25, emphasis: true },
    { speakerId: 'concepts', word: 'fundamental', startTime: 4.0, duration: 1.0, phonemeGap: 0.2, emphasis: true },
    { speakerId: 'concepts', word: 'principle', startTime: 5.3, duration: 0.8, phonemeGap: 0.15, emphasis: true },
    
    // Examples stream (overlapping)
    { speakerId: 'examples', word: 'electrons', startTime: 2.5, duration: 0.9, phonemeGap: 0.15, emphasis: false },
    { speakerId: 'examples', word: 'photons', startTime: 3.6, duration: 0.8, phonemeGap: 0.15 },
    { speakerId: 'examples', word: 'double-slit', startTime: 4.8, duration: 1.0, phonemeGap: 0.2 },
    { speakerId: 'examples', word: 'experiment', startTime: 6.0, duration: 1.1, phonemeGap: 0.25 },
    
    // Context stream (transitions)
    { speakerId: 'context', word: 'This', startTime: 5.8, duration: 0.4, phonemeGap: 0.1 },
    { speakerId: 'context', word: 'means', startTime: 6.3, duration: 0.5, phonemeGap: 0.15 },
    { speakerId: 'context', word: 'particles', startTime: 6.9, duration: 0.8, phonemeGap: 0.2 },
    { speakerId: 'context', word: 'can', startTime: 7.9, duration: 0.4, phonemeGap: 0.1 },
    { speakerId: 'context', word: 'exhibit', startTime: 8.4, duration: 0.7, phonemeGap: 0.15 },
    
    // Second wave of content
    { speakerId: 'primary', word: 'When', startTime: 8.0, duration: 0.4, phonemeGap: 0.1 },
    { speakerId: 'primary', word: 'observed', startTime: 8.5, duration: 0.8, phonemeGap: 0.2, emphasis: true },
    { speakerId: 'primary', word: 'directly', startTime: 9.5, duration: 0.8, phonemeGap: 0.15 },
    { speakerId: 'primary', word: 'particles', startTime: 10.4, duration: 0.8, phonemeGap: 0.2 },
    { speakerId: 'primary', word: 'behave', startTime: 11.4, duration: 0.6, phonemeGap: 0.15 },
    { speakerId: 'primary', word: 'classically', startTime: 12.1, duration: 1.0, phonemeGap: 0.25 },
    
    // Overlapping concepts
    { speakerId: 'concepts', word: 'measurement', startTime: 9.0, duration: 1.0, phonemeGap: 0.2, emphasis: true },
    { speakerId: 'concepts', word: 'collapse', startTime: 10.2, duration: 0.8, phonemeGap: 0.2, emphasis: true },
    { speakerId: 'concepts', word: 'wavefunction', startTime: 11.2, duration: 1.1, phonemeGap: 0.25, emphasis: true },
    
    // Final examples
    { speakerId: 'examples', word: 'interference', startTime: 10.5, duration: 1.0, phonemeGap: 0.2 },
    { speakerId: 'examples', word: 'patterns', startTime: 11.7, duration: 0.8, phonemeGap: 0.15 },
    { speakerId: 'examples', word: 'disappear', startTime: 12.7, duration: 0.9, phonemeGap: 0.2 },
    
    // Context conclusion
    { speakerId: 'context', word: 'Therefore', startTime: 13.0, duration: 0.8, phonemeGap: 0.15 },
    { speakerId: 'context', word: 'reality', startTime: 14.0, duration: 0.8, phonemeGap: 0.2 },
    { speakerId: 'context', word: 'depends', startTime: 15.0, duration: 0.7, phonemeGap: 0.15 },
    { speakerId: 'context', word: 'on', startTime: 15.85, duration: 0.2, phonemeGap: 0.1 },
    { speakerId: 'context', word: 'observation', startTime: 16.05, duration: 1.0, phonemeGap: 0.25, emphasis: true }
  ]
};

const EnhancedSpatialDemo = () => {
  const mountRef = useRef(null);
  const sceneRef = useRef(null);
  const animationRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [activeSpeakers, setActiveSpeakers] = useState(new Map());
  const [currentWords, setCurrentWords] = useState(new Map());
  const [autoRotate, setAutoRotate] = useState(true);

  // Create enhanced 3D scene
  useEffect(() => {
    if (!mountRef.current) return;

    // Clear previous scene
    while (mountRef.current.firstChild) {
      mountRef.current.removeChild(mountRef.current.firstChild);
    }

    const scene = new THREE.Scene();
    
    // Dynamic gradient background
    const createGradientBackground = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 512;
      canvas.height = 512;
      const ctx = canvas.getContext('2d');
      
      const gradient = ctx.createRadialGradient(256, 256, 0, 256, 256, 256);
      gradient.addColorStop(0, '#001122');
      gradient.addColorStop(0.5, '#001133');
      gradient.addColorStop(1, '#000011');
      
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 512, 512);
      
      return new THREE.CanvasTexture(canvas);
    };
    
    scene.background = createGradientBackground();
    scene.fog = new THREE.Fog(0x000011, 15, 40);

    // Setup camera and renderer
    const width = mountRef.current.clientWidth;
    const height = mountRef.current.clientHeight;
    const camera = new THREE.PerspectiveCamera(65, width / height, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.outputEncoding = THREE.sRGBEncoding;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    mountRef.current.appendChild(renderer.domElement);

    // Enhanced lighting system
    const ambientLight = new THREE.AmbientLight(0x112244, 0.4);
    scene.add(ambientLight);
    
    const mainLight = new THREE.DirectionalLight(0x4488ff, 1.2);
    mainLight.position.set(15, 20, 10);
    mainLight.castShadow = true;
    mainLight.shadow.mapSize.width = 2048;
    mainLight.shadow.mapSize.height = 2048;
    scene.add(mainLight);

    const accentLight = new THREE.DirectionalLight(0xff6644, 0.3);
    accentLight.position.set(-10, 8, -8);
    scene.add(accentLight);

    // Volumetric spot light
    const volumetricLight = new THREE.SpotLight(0x6644ff, 2, 30, Math.PI / 4, 0.3, 1);
    volumetricLight.position.set(0, 25, 0);
    scene.add(volumetricLight);

    // Enhanced ground with animated grid
    const groundGeometry = new THREE.PlaneGeometry(40, 40, 64, 64);
    const groundMaterial = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        audioActivity: { value: 0 }
      },
      vertexShader: `
        uniform float time;
        uniform float audioActivity;
        varying vec2 vUv;
        varying float vWave;
        void main() {
          vUv = uv;
          vec3 pos = position;
          float wave = sin(pos.x * 0.1 + time) * sin(pos.y * 0.1 + time * 0.7) * audioActivity * 0.5;
          pos.z += wave;
          vWave = wave;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
        }
      `,
      fragmentShader: `
        uniform float time;
        varying vec2 vUv;
        varying float vWave;
        void main() {
          vec3 color1 = vec3(0.02, 0.05, 0.1);
          vec3 color2 = vec3(0.05, 0.1, 0.2);
          vec3 color = mix(color1, color2, vWave * 0.5 + 0.5);
          
          // Grid lines
          vec2 grid = abs(fract(vUv * 20.0) - 0.5) / fwidth(vUv * 20.0);
          float line = min(grid.x, grid.y);
          color += vec3(0.1, 0.2, 0.4) * (1.0 - min(line, 1.0)) * 0.3;
          
          gl_FragColor = vec4(color, 0.9);
        }
      `,
      transparent: true
    });
    
    const ground = new THREE.Mesh(groundGeometry, groundMaterial);
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = -10;
    ground.receiveShadow = true;
    scene.add(ground);

    // Distance reference rings with labels
    const ringGroup = new THREE.Group();
    for (let i = 1; i <= 6; i++) {
      const radius = i * 1.5;
      
      // Ring geometry
      const ringGeometry = new THREE.RingGeometry(radius - 0.02, radius + 0.02, 64);
      const ringMaterial = new THREE.MeshBasicMaterial({ 
        color: new THREE.Color().setHSL(0.6, 0.7, 0.3 + i * 0.1),
        transparent: true,
        opacity: 0.4
      });
      const ring = new THREE.Mesh(ringGeometry, ringMaterial);
      ring.rotation.x = -Math.PI / 2;
      ring.position.y = -9.8;
      ringGroup.add(ring);

      // Distance labels
      const labelCanvas = document.createElement('canvas');
      labelCanvas.width = 64;
      labelCanvas.height = 32;
      const ctx = labelCanvas.getContext('2d');
      ctx.fillStyle = '#88aaff';
      ctx.font = 'bold 16px Arial';
      ctx.textAlign = 'center';
      ctx.fillText(`${radius.toFixed(1)}m`, 32, 20);
      
      const labelTexture = new THREE.CanvasTexture(labelCanvas);
      const labelMaterial = new THREE.MeshBasicMaterial({ 
        map: labelTexture,
        transparent: true
      });
      const labelGeometry = new THREE.PlaneGeometry(0.8, 0.4);
      const label = new THREE.Mesh(labelGeometry, labelMaterial);
      label.position.set(radius, -9.5, 0);
      label.rotation.x = -Math.PI / 2;
      ringGroup.add(label);
    }
    scene.add(ringGroup);

    // Elevation reference arcs
    for (let elevation = -45; elevation <= 45; elevation += 30) {
      const arcRadius = 8;
      const arcGeometry = new THREE.RingGeometry(arcRadius - 0.05, arcRadius + 0.05, 32, 1, 0, Math.PI);
      const arcMaterial = new THREE.MeshBasicMaterial({ 
        color: 0x444488,
        transparent: true,
        opacity: 0.2
      });
      const arc = new THREE.Mesh(arcGeometry, arcMaterial);
      arc.rotation.x = -(Math.PI / 2 - elevation * Math.PI / 180);
      scene.add(arc);
    }

    // Enhanced central listener
    const listenerGroup = new THREE.Group();
    
    // Main head with glow effect
    const headGeometry = new THREE.SphereGeometry(0.6, 32, 32);
    const headMaterial = new THREE.MeshPhongMaterial({ 
      color: 0xffffff,
      emissive: 0x112244,
      shininess: 100,
      transparent: true,
      opacity: 0.95
    });
    const head = new THREE.Mesh(headGeometry, headMaterial);
    head.castShadow = true;
    listenerGroup.add(head);

    // Body indicator
    const bodyGeometry = new THREE.CylinderGeometry(0.4, 0.5, 1.5, 16);
    const bodyMaterial = new THREE.MeshPhongMaterial({ 
      color: 0xccddff,
      emissive: 0x001122,
      shininess: 50
    });
    const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
    body.position.y = -1.0;
    body.castShadow = true;
    listenerGroup.add(body);

    // Enhanced direction indicator
    const directionGeometry = new THREE.ConeGeometry(0.25, 1.0, 8);
    const directionMaterial = new THREE.MeshPhongMaterial({ 
      color: 0x4a9eff,
      emissive: 0x002244,
      shininess: 100
    });
    const direction = new THREE.Mesh(directionGeometry, directionMaterial);
    direction.position.z = 0.8;
    direction.rotation.x = -Math.PI / 2;
    direction.castShadow = true;
    listenerGroup.add(direction);

    // Listening field visualization
    const fieldGeometry = new THREE.SphereGeometry(4, 16, 8, 0, Math.PI * 2, 0, Math.PI / 2);
    const fieldMaterial = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        audioActivity: { value: 0 }
      },
      vertexShader: `
        uniform float time;
        uniform float audioActivity;
        varying vec3 vPosition;
        void main() {
          vPosition = position;
          vec3 pos = position;
          pos += normalize(position) * sin(time * 2.0 + length(position) * 3.0) * audioActivity * 0.1;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
        }
      `,
      fragmentShader: `
        uniform float time;
        uniform float audioActivity;
        varying vec3 vPosition;
        void main() {
          float dist = length(vPosition) / 4.0;
          float pulse = sin(time * 3.0 + dist * 10.0) * 0.3 + 0.7;
          float opacity = (0.1 + audioActivity * 0.2) * pulse * (1.0 - dist);
          gl_FragColor = vec4(0.3, 0.6, 1.0, opacity);
        }
      `,
      transparent: true,
      side: THREE.DoubleSide
    });
    const field = new THREE.Mesh(fieldGeometry, fieldMaterial);
    listenerGroup.add(field);

    scene.add(listenerGroup);

    // Create enhanced speaker nodes
    const speakerMeshes = new Map();
    
    SPEAKERS.forEach(speaker => {
      const speakerGroup = new THREE.Group();
      
      // Main speaker node with enhanced materials
      const nodeGeometry = new THREE.SphereGeometry(0.5, 32, 32);
      const nodeMaterial = new THREE.MeshPhongMaterial({ 
        color: speaker.color,
        emissive: speaker.color,
        emissiveIntensity: 0.3,
        shininess: 100,
        transparent: true,
        opacity: 0.9
      });
      const node = new THREE.Mesh(nodeGeometry, nodeMaterial);
      node.castShadow = true;
      speakerGroup.add(node);

      // Enhanced speaker label with role
      const createLabel = (text, subtext, color) => {
        const canvas = document.createElement('canvas');
        canvas.width = 400;
        canvas.height = 100;
        const ctx = canvas.getContext('2d');
        
        // Background
        ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
        ctx.roundRect(0, 0, 400, 100, 10);
        ctx.fill();
        
        // Main text
        ctx.fillStyle = color;
        ctx.font = 'bold 24px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(text, 200, 35);
        
        // Subtext
        ctx.fillStyle = '#aaaaaa';
        ctx.font = '16px Arial';
        ctx.fillText(subtext, 200, 60);
        
        const texture = new THREE.CanvasTexture(canvas);
        const material = new THREE.MeshBasicMaterial({ 
          map: texture,
          transparent: true
        });
        const geometry = new THREE.PlaneGeometry(2.5, 0.6);
        const mesh = new THREE.Mesh(geometry, material);
        return mesh;
      };

      const label = createLabel(speaker.name, speaker.role, speaker.color);
      label.position.y = 1.2;
      speakerGroup.add(label);

      // Enhanced connection line with flow effect
      const connectionGeometry = new THREE.BufferGeometry();
      const connectionMaterial = new THREE.ShaderMaterial({
        uniforms: {
          time: { value: 0 },
          color: { value: new THREE.Color(speaker.color) },
          activity: { value: 0 }
        },
        vertexShader: `
          uniform float time;
          attribute float lineDistance;
          varying float vLineDistance;
          varying vec3 vPosition;
          void main() {
            vLineDistance = lineDistance;
            vPosition = position;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,
        fragmentShader: `
          uniform vec3 color;
          uniform float time;
          uniform float activity;
          varying float vLineDistance;
          void main() {
            float flow = sin(vLineDistance * 15.0 - time * 10.0) * 0.5 + 0.5;
            float opacity = (0.3 + activity * 0.7) * flow;
            gl_FragColor = vec4(color, opacity);
          }
        `,
        transparent: true
      });
      const connection = new THREE.Line(connectionGeometry, connectionMaterial);
      speakerGroup.add(connection);

      // Activity pulse ring
      const pulseGeometry = new THREE.RingGeometry(0.6, 0.7, 32);
      const pulseMaterial = new THREE.MeshBasicMaterial({ 
        color: speaker.color,
        transparent: true,
        opacity: 0,
        side: THREE.DoubleSide
      });
      const pulse = new THREE.Mesh(pulseGeometry, pulseMaterial);
      pulse.rotation.x = -Math.PI / 2;
      speakerGroup.add(pulse);

      // Movement trail
      const trailGeometry = new THREE.BufferGeometry();
      const trailPositions = new Float32Array(300); // 100 points * 3 coordinates
      trailGeometry.setAttribute('position', new THREE.BufferAttribute(trailPositions, 3));
      const trailMaterial = new THREE.LineBasicMaterial({ 
        color: speaker.color,
        transparent: true,
        opacity: 0.4
      });
      const trail = new THREE.Line(trailGeometry, trailMaterial);
      speakerGroup.add(trail);

      // Distance/elevation indicators
      const createDistanceIndicator = () => {
        const canvas = document.createElement('canvas');
        canvas.width = 128;
        canvas.height = 64;
        const ctx = canvas.getContext('2d');
        
        ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
        ctx.fillRect(0, 0, 128, 64);
        ctx.fillStyle = speaker.color;
        ctx.font = 'bold 14px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('0.0m', 64, 20);
        ctx.fillText('0°', 64, 40);
        
        const texture = new THREE.CanvasTexture(canvas);
        const material = new THREE.MeshBasicMaterial({ 
          map: texture,
          transparent: true
        });
        const geometry = new THREE.PlaneGeometry(1, 0.5);
        return new THREE.Mesh(geometry, material);
      };

      const distanceIndicator = createDistanceIndicator();
      distanceIndicator.position.y = -0.8;
      speakerGroup.add(distanceIndicator);

      // Position and update functions
      const updatePosition = (position) => {
        const azimuth = position.azimuth * Math.PI / 180;
        const elevation = position.elevation * Math.PI / 180;
        const distance = position.distance;
        
        const x = distance * Math.sin(azimuth) * Math.cos(elevation);
        const y = distance * Math.sin(elevation);
        const z = distance * Math.cos(azimuth) * Math.cos(elevation);
        
        speakerGroup.position.set(x, y, z);
        
        // Update connection line
        const points = [new THREE.Vector3(0, 0, 0), new THREE.Vector3(-x, -y, -z)];
        connection.geometry.setFromPoints(points);
        
        // Update distance indicator
        const ctx = distanceIndicator.material.map.image.getContext('2d');
        ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
        ctx.fillRect(0, 0, 128, 64);
        ctx.fillStyle = speaker.color;
        ctx.font = 'bold 14px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(`${distance.toFixed(1)}m`, 64, 20);
        ctx.fillText(`${position.elevation.toFixed(0)}°`, 64, 40);
        distanceIndicator.material.map.needsUpdate = true;
        
        // Make label face camera
        label.lookAt(camera.position);
        distanceIndicator.lookAt(camera.position);
      };

      // Initialize position
      updatePosition(speaker.path[0]);

      speakerGroup.userData = { 
        speakerId: speaker.id,
        node,
        label, 
        connection,
        pulse,
        trail,
        distanceIndicator,
        updatePosition,
        trailPositions: [],
        activity: 0,
        currentWords: []
      };

      speakerMeshes.set(speaker.id, speakerGroup);
      scene.add(speakerGroup);
    });

    // Position camera
    camera.position.set(15, 10, 15);
    camera.lookAt(0, 0, 0);

    // Enhanced animation loop
    let time = 0;
    const animate = () => {
      animationRef.current = requestAnimationFrame(animate);
      time += 0.016; // ~60fps

      // Update ground shader
      ground.material.uniforms.time.value = time;
      ground.material.uniforms.audioActivity.value = activeSpeakers.size / SPEAKERS.length;

      // Update listener field
      field.material.uniforms.time.value = time;
      field.material.uniforms.audioActivity.value = activeSpeakers.size / SPEAKERS.length;

      // Auto-rotate scene
      if (autoRotate) {
        scene.rotation.y += 0.003;
      }

      // Update speakers with enhanced animations
      speakerMeshes.forEach((speakerGroup, speakerId) => {
        const userData = speakerGroup.userData;
        const speakerData = activeSpeakers.get(speakerId);
        const isActive = speakerData && speakerData.isActive;
        const intensity = speakerData ? speakerData.intensity : 0;
        
        // Smooth activity transition
        userData.activity += (intensity - userData.activity) * 0.15;
        
        // Update node scale and glow
        const targetScale = 1 + userData.activity * 0.5;
        const targetEmissive = 0.3 + userData.activity * 0.4;
        
        userData.node.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
        userData.node.material.emissiveIntensity = targetEmissive;
        
        // Pulse effect when active
        if (isActive) {
          const pulse = Math.sin(time * 6) * 0.15 + 1;
          userData.node.scale.multiplyScalar(pulse);
          
          // Animate pulse ring
          userData.pulse.material.opacity = userData.activity * 0.6;
          userData.pulse.scale.setScalar(1 + Math.sin(time * 4) * 0.3);
        } else {
          userData.pulse.material.opacity *= 0.95;
        }
        
        // Update connection shader
        if (userData.connection.material.uniforms) {
          userData.connection.material.uniforms.time.value = time;
          userData.connection.material.uniforms.activity.value = userData.activity;
        }
        
        // Update trail
        if (userData.trailPositions.length > 1) {
          const positions = userData.trail.geometry.attributes.position.array;
          userData.trailPositions.forEach((pos, index) => {
            if (index * 3 + 2 < positions.length) {
              positions[index * 3] = pos.x;
              positions[index * 3 + 1] = pos.y;
              positions[index * 3 + 2] = pos.z;
            }
          });
          userData.trail.geometry.attributes.position.needsUpdate = true;
        }
        
        // Make labels face camera
        userData.label.lookAt(camera.position);
        userData.distanceIndicator.lookAt(camera.position);
      });

      // Update lighting based on activity
      const totalActivity = Array.from(activeSpeakers.values()).reduce((sum, speaker) => sum + speaker.intensity, 0);
      volumetricLight.intensity = 2 + totalActivity * 0.5;
      mainLight.intensity = 1.2 + totalActivity * 0.3;

      renderer.render(scene, camera);
    };

    animate();

    // Store references
    sceneRef.current = { 
      scene, 
      camera, 
      renderer, 
      speakerMeshes,
      ground,
      field: listenerGroup.children.find(child => child.material && child.material.uniforms)
    };

    // Handle resize
    const handleResize = () => {
      const newWidth = mountRef.current.clientWidth;
      const newHeight = mountRef.current.clientHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
    };
  }, [autoRotate, activeSpeakers, currentWords]);

  // Enhanced timeline with concurrent speech and phoneme gaps
  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setCurrentTime(prev => {
        const newTime = prev + 0.1;
        
        // Calculate active speakers with intensity and current words
        const currentActive = new Map();
        const wordsNow = new Map();
        
        LEARNING_CONTENT.timeline.forEach(item => {
          const wordEndTime = item.startTime + item.duration + item.phonemeGap;
          
          if (newTime >= item.startTime && newTime <= wordEndTime) {
            // Calculate intensity based on position in word
            const progress = (newTime - item.startTime) / item.duration;
            const intensity = Math.sin(progress * Math.PI) * (item.emphasis ? 1.0 : 0.7);
            
            if (!currentActive.has(item.speakerId)) {
              currentActive.set(item.speakerId, { isActive: true, intensity: 0, words: [] });
            }
            
            const speakerData = currentActive.get(item.speakerId);
            speakerData.intensity = Math.max(speakerData.intensity, intensity);
            speakerData.words.push({
              word: item.word,
              progress: progress,
              emphasis: item.emphasis
            });
            
            if (!wordsNow.has(item.speakerId)) {
              wordsNow.set(item.speakerId, []);
            }
            wordsNow.get(item.speakerId).push(item.word);
          }
        });
        
        setActiveSpeakers(currentActive);
        setCurrentWords(wordsNow);
        
        // Update speaker positions with smooth interpolation
        if (sceneRef.current) {
          SPEAKERS.forEach(speaker => {
            const speakerMesh = sceneRef.current.speakerMeshes.get(speaker.id);
            if (speakerMesh) {
              const position = interpolatePosition(speaker.path, newTime);
              speakerMesh.userData.updatePosition(position);
              
              // Add to trail with activity-based opacity
              const currentPos = speakerMesh.position.clone();
              const isActive = currentActive.has(speaker.id);
              if (isActive || speakerMesh.userData.trailPositions.length % 3 === 0) {
                speakerMesh.userData.trailPositions.push(currentPos);
                if (speakerMesh.userData.trailPositions.length > 100) {
                  speakerMesh.userData.trailPositions.shift();
                }
              }
            }
          });
        }
        
        // Loop after duration
        if (newTime >= LEARNING_CONTENT.totalDuration) {
          return 0;
        }
        
        return newTime;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [isPlaying]);

  // Smooth interpolation with easing
  const interpolatePosition = (path, time) => {
    const loopTime = time % LEARNING_CONTENT.totalDuration;
    
    // Find surrounding keyframes
    let startFrame = path[0];
    let endFrame = path[path.length - 1];
    
    for (let i = 0; i < path.length - 1; i++) {
      if (loopTime >= path[i].time && loopTime <= path[i + 1].time) {
        startFrame = path[i];
        endFrame = path[i + 1];
        break;
      }
    }
    
    // Smooth easing interpolation
    const progress = (loopTime - startFrame.time) / (endFrame.time - startFrame.time);
    const t = Math.max(0, Math.min(1, progress));
    
    // Apply easing curve for smoother movement
    const eased = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    
    return {
      azimuth: startFrame.azimuth + (endFrame.azimuth - startFrame.azimuth) * eased,
      elevation: startFrame.elevation + (endFrame.elevation - startFrame.elevation) * eased,
      distance: startFrame.distance + (endFrame.distance - startFrame.distance) * eased
    };
  };

  const togglePlayback = () => {
    setIsPlaying(!isPlaying);
    if (!isPlaying) {
      setCurrentTime(0);
      setActiveSpeakers(new Map());
      setCurrentWords(new Map());
    }
  };

  const resetView = () => {
    if (sceneRef.current) {
      sceneRef.current.camera.position.set(15, 10, 15);
      sceneRef.current.camera.lookAt(0, 0, 0);
    }
  };

  const progress = (currentTime / LEARNING_CONTENT.totalDuration) * 100;

  return (
    <div className="w-full h-screen bg-black text-white relative overflow-hidden">
      {/* Full-screen 3D visualization */}
      <div 
        ref={mountRef}
        className="w-full h-full"
      />
      
      {/* Enhanced top overlay with content info */}
      <div className="absolute top-6 left-6 right-6">
        <div className="flex justify-between items-start">
          {/* Content title */}
          <div className="bg-black/70 backdrop-blur-lg rounded-xl p-4 border border-white/20 max-w-md">
            <h2 className="text-lg font-bold mb-2">{LEARNING_CONTENT.title}</h2>
            <div className="text-sm text-gray-300">
              Multiple speakers providing overlapping educational content with phoneme-gap timing
            </div>
          </div>
          
          {/* View controls */}
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setAutoRotate(!autoRotate)}
              className={`bg-black/50 backdrop-blur-lg border border-white/20 ${
                autoRotate ? 'text-blue-400' : 'text-white'
              }`}
            >
              <RotateCw className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={resetView}
              className="bg-black/50 backdrop-blur-lg border border-white/20"
            >
              <MapPin className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Speaker status panel */}
      <div className="absolute top-6 right-6">
        <div className="bg-black/70 backdrop-blur-lg rounded-xl p-4 border border-white/20 min-w-64">
          <div className="text-sm font-semibold mb-3 flex items-center gap-2">
            <Volume2 className="w-4 h-4" />
            Active Speakers
          </div>
          <div className="space-y-2">
            {SPEAKERS.map(speaker => {
              const speakerData = activeSpeakers.get(speaker.id);
              const words = currentWords.get(speaker.id) || [];
              const isActive = speakerData && speakerData.isActive;
              const intensity = speakerData ? speakerData.intensity : 0;
              
              return (
                <div 
                  key={speaker.id}
                  className={`flex flex-col gap-1 p-2 rounded-lg transition-all ${
                    isActive ? 'bg-white/10 scale-105' : 'bg-white/5'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div 
                        className={`w-3 h-3 rounded-full border ${
                          isActive ? 'animate-pulse shadow-lg' : ''
                        }`}
                        style={{ 
                          backgroundColor: speaker.color,
                          boxShadow: isActive ? `0 0 10px ${speaker.color}` : 'none'
                        }}
                      />
                      <span className="text-sm font-medium">{speaker.name}</span>
                    </div>
                    {isActive && (
                      <div className="text-xs text-gray-400">
                        {(intensity * 100).toFixed(0)}%
                      </div>
                    )}
                  </div>
                  {words.length > 0 && (
                    <div className="text-xs text-gray-300 ml-5">
                      Speaking: {words.join(', ')}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Enhanced bottom controls */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="flex items-center gap-6 bg-black/70 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
          <Button 
            onClick={togglePlayback} 
            size="lg" 
            className="rounded-full w-14 h-14 bg-blue-500 hover:bg-blue-600 shadow-lg"
          >
            {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 ml-0.5" />}
          </Button>
          
          <div className="flex flex-col items-center min-w-48">
            <div className="text-sm text-gray-300 mb-1">
              {currentTime.toFixed(1)}s / {LEARNING_CONTENT.totalDuration}s
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div 
                className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          <div className="flex items-center gap-2 text-sm">
            <Clock className="w-4 h-4" />
            <span>{activeSpeakers.size} / {SPEAKERS.length} active</span>
          </div>
        </div>
      </div>

      {/* Live content display */}
      {currentWords.size > 0 && (
        <div className="absolute bottom-32 left-6 right-6">
          <div className="bg-black/80 backdrop-blur-lg rounded-xl p-4 border border-white/20">
            <div className="text-sm font-semibold mb-2">Currently Speaking:</div>
            <div className="flex flex-wrap gap-2">
              {Array.from(currentWords.entries()).map(([speakerId, words]) => {
                const speaker = SPEAKERS.find(s => s.id === speakerId);
                return words.map((word, index) => (
                  <span 
                    key={`${speakerId}-${index}`}
                    className="px-3 py-1 rounded-full text-sm font-medium animate-pulse"
                    style={{ 
                      backgroundColor: speaker.color + '40',
                      color: speaker.color,
                      border: `1px solid ${speaker.color}`
                    }}
                  >
                    {word}
                  </span>
                ));
              })}
            </div>
          </div>
        </div>
      )}

      {/* Instructions overlay */}
      {!isPlaying && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="text-center max-w-lg">
            <div className="text-7xl mb-6">🎧</div>
            <h1 className="text-4xl font-bold mb-4">Enhanced Spatial Audio Learning</h1>
            <p className="text-gray-300 mb-8 text-lg leading-relaxed">
              Experience concurrent multi-speaker learning with moving audio sources, 
              phoneme-gap timing, and real-time 3D spatial visualization
            </p>
            <div className="grid grid-cols-2 gap-4 mb-8 text-sm">
              <div className="bg-white/10 rounded-lg p-3">
                <div className="font-semibold mb-1">🔵 Primary Narrator</div>
                <div className="text-gray-300">Main educational content</div>
              </div>
              <div className="bg-white/10 rounded-lg p-3">
                <div className="font-semibold mb-1">🔴 Key Concepts</div>
                <div className="text-gray-300">Important definitions</div>
              </div>
              <div className="bg-white/10 rounded-lg p-3">
                <div className="font-semibold mb-1">🟢 Examples</div>
                <div className="text-gray-300">Practical applications</div>
              </div>
              <div className="bg-white/10 rounded-lg p-3">
                <div className="font-semibold mb-1">🟣 Context</div>
                <div className="text-gray-300">Transitions & conclusions</div>
              </div>
            </div>
            <Button onClick={togglePlayback} size="lg" className="px-8 py-4 text-lg rounded-full">
              <Play className="w-6 h-6 mr-2" />
              Start Enhanced Demo
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EnhancedSpatialDemo;