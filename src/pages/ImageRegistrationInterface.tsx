import React, { useState, useRef, useEffect, useCallback } from 'react';
import { 
  MousePointer, Layers, Grid, Eye, EyeOff, RotateCw, Move, ZoomIn, ZoomOut,
  Settings, Users, Brain, Target, TrendingUp, Play, Pause, SkipForward,
  Crosshair, Hand, Square, Circle, ArrowRight, RefreshCw, Save, Upload,
  Sliders, BarChart3, Zap, AlertTriangle, Info, Check, X
} from 'lucide-react';

const AdvancedImageRegressionInterface = () => {
  const [interfaceMode, setInterfaceMode] = useState('expert');
  const [activeOverlay, setActiveOverlay] = useState('difference');
  const [interactionTool, setInteractionTool] = useState('pan');
  const [isProcessing, setIsProcessing] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [panOffset, setPanOffset] = useState({ x: 0, y: 0 });
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [manualPoints, setManualPoints] = useState([]);
  const [overlayOpacity, setOverlayOpacity] = useState(0.7);
  const [showControls, setShowControls] = useState(true);
  const [activeUserSession, setActiveUserSession] = useState('expert_user_1');
  const [collaborativeMode, setCollaborativeMode] = useState(false);

  const canvasRef = useRef(null);
  const overlayCanvasRef = useRef(null);
  const interactionCanvasRef = useRef(null);

  const interfaceModes = {
    'beginner': {
      name: 'Guided Interface',
      description: 'Step-by-step workflow with helpful hints',
      complexity: 'Low',
      features: ['Auto-alignment', 'Simple overlays', 'Guided tutorials']
    },
    'expert': {
      name: 'Expert Interface',
      description: 'Full control with advanced parameters',
      complexity: 'High', 
      features: ['Manual control', 'All overlays', 'Parameter tuning']
    },
    'research': {
      name: 'Research Interface',
      description: 'Experimental features and detailed analytics',
      complexity: 'Maximum',
      features: ['Experimental algorithms', 'Data export', 'Performance metrics']
    },
    'collaborative': {
      name: 'Collaborative Interface',
      description: 'Multi-user annotation and review',
      complexity: 'Medium',
      features: ['Multi-user cursors', 'Annotation sharing', 'Consensus building']
    }
  };

  const overlayTypes = {
    'difference': {
      name: 'Difference Map',
      description: 'Pixel-wise intensity differences',
      equation: '|I₁(x,y) - I₂(x,y)|',
      colorMap: 'hot',
      realTime: true
    },
    'displacement': {
      name: 'Displacement Field',
      description: 'Vector field showing pixel movements',
      equation: 'T(x,y) - (x,y)',
      colorMap: 'hsv',
      realTime: true
    },
    'confidence': {
      name: 'Confidence Map',
      description: 'Registration confidence per pixel',
      equation: 'σ⁻¹(T(x,y))',
      colorMap: 'viridis',
      realTime: false
    },
    'gradient': {
      name: 'Gradient Overlay',
      description: 'Image gradients and feature directions',
      equation: '∇I(x,y)',
      colorMap: 'edge',
      realTime: true
    },
    'optical_flow': {
      name: 'Optical Flow',
      description: 'Motion vectors between images',
      equation: 'Lucas-Kanade flow field',
      colorMap: 'flow',
      realTime: true
    },
    'saliency': {
      name: 'Saliency Map',
      description: 'Important regions for registration',
      equation: 'Attention weights A(x,y)',
      colorMap: 'attention',
      realTime: false
    },
    'error_propagation': {
      name: 'Error Propagation',
      description: 'How errors accumulate spatially',
      equation: 'σ²(T(x,y))',
      colorMap: 'uncertainty',
      realTime: false
    },
    'temporal': {
      name: 'Temporal Consistency',
      description: 'Consistency across time series',
      equation: '||T_{t} - T_{t-1}||',
      colorMap: 'temporal',
      realTime: true
    }
  };

  const interactionTools = {
    'pan': { name: 'Pan', icon: Hand, cursor: 'grab' },
    'zoom': { name: 'Zoom', icon: ZoomIn, cursor: 'zoom-in' },
    'point': { name: 'Point Selection', icon: Crosshair, cursor: 'crosshair' },
    'region': { name: 'Region Selection', icon: Square, cursor: 'crosshair' },
    'measure': { name: 'Measurement', icon: Target, cursor: 'crosshair' },
    'annotate': { name: 'Annotation', icon: MousePointer, cursor: 'text' }
  };

  const handleCanvasClick = useCallback((event) => {
    if (!canvasRef.current) return;
    
    const rect = canvasRef.current.getBoundingClientRect();
    const x = (event.clientX - rect.left) / zoomLevel - panOffset.x;
    const y = (event.clientY - rect.top) / zoomLevel - panOffset.y;
    
    if (interactionTool === 'point') {
      setManualPoints(prev => [...prev, { x, y, id: Date.now(), type: 'control' }]);
    } else if (interactionTool === 'region') {
      // Handle region selection
      setSelectedRegion({ x, y, width: 50, height: 50 });
    }
  }, [interactionTool, zoomLevel, panOffset]);

  const renderInterface = () => {
    switch (interfaceMode) {
      case 'beginner':
        return renderBeginnerInterface();
      case 'expert':
        return renderExpertInterface();
      case 'research':
        return renderResearchInterface();
      case 'collaborative':
        return renderCollaborativeInterface();
      default:
        return renderExpertInterface();
    }
  };

  const renderBeginnerInterface = () => (
    <div className="space-y-4">
      {/* Step-by-step guide */}
      <div className="bg-blue-900/30 border border-blue-600 rounded-lg p-4">
        <h3 className="text-blue-300 font-semibold mb-2">Step 1: Upload Images</h3>
        <p className="text-sm text-gray-300 mb-3">Upload your source and target images to begin automatic alignment.</p>
        <div className="grid grid-cols-2 gap-3">
          <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded flex items-center gap-2">
            <Upload className="w-4 h-4" />
            Source Image
          </button>
          <button className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded flex items-center gap-2">
            <Upload className="w-4 h-4" />
            Target Image
          </button>
        </div>
      </div>

      {/* Simple overlay controls */}
      <div className="bg-gray-800 rounded-lg p-4">
        <h3 className="font-semibold mb-3">Visualization</h3>
        <div className="grid grid-cols-2 gap-2">
          {['difference', 'displacement'].map(overlay => (
            <button
              key={overlay}
              onClick={() => setActiveOverlay(overlay)}
              className={`p-2 rounded text-sm ${
                activeOverlay === overlay ? 'bg-purple-600' : 'bg-gray-700 hover:bg-gray-600'
              }`}
            >
              {overlayTypes[overlay].name}
            </button>
          ))}
        </div>
      </div>

      {/* Auto-align button */}
      <button
        onClick={() => setIsProcessing(true)}
        disabled={isProcessing}
        className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-600 px-4 py-3 rounded-lg flex items-center justify-center gap-2 font-semibold"
      >
        {isProcessing ? <RefreshCw className="w-5 h-5 animate-spin" /> : <Play className="w-5 h-5" />}
        {isProcessing ? 'Processing...' : 'Auto-Align Images'}
      </button>
    </div>
  );

  const renderExpertInterface = () => (
    <div className="space-y-4">
      {/* Overlay Selection */}
      <div className="bg-gray-800 rounded-lg p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold">Overlay Visualization</h3>
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-400">Opacity</span>
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={overlayOpacity}
              onChange={(e) => setOverlayOpacity(parseFloat(e.target.value))}
              className="w-20"
            />
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-2 mb-3">
          {Object.entries(overlayTypes).map(([key, overlay]) => (
            <button
              key={key}
              onClick={() => setActiveOverlay(key)}
              className={`p-2 rounded text-xs text-left ${
                activeOverlay === key ? 'bg-purple-600' : 'bg-gray-700 hover:bg-gray-600'
              }`}
            >
              <div className="font-medium">{overlay.name}</div>
              <div className="text-gray-300 text-xs">{overlay.description}</div>
            </button>
          ))}
        </div>

        {/* Real-time equation display */}
        <div className="bg-gray-900 rounded p-2">
          <code className="text-green-400 text-xs">
            {overlayTypes[activeOverlay]?.equation}
          </code>
        </div>
      </div>

      {/* Interaction Tools */}
      <div className="bg-gray-800 rounded-lg p-4">
        <h3 className="font-semibold mb-3">Interaction Tools</h3>
        <div className="grid grid-cols-3 gap-2">
          {Object.entries(interactionTools).map(([key, tool]) => {
            const IconComponent = tool.icon;
            return (
              <button
                key={key}
                onClick={() => setInteractionTool(key)}
                className={`p-2 rounded flex flex-col items-center gap-1 text-xs ${
                  interactionTool === key ? 'bg-blue-600' : 'bg-gray-700 hover:bg-gray-600'
                }`}
              >
                <IconComponent className="w-4 h-4" />
                {tool.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* Manual Control Points */}
      {manualPoints.length > 0 && (
        <div className="bg-gray-800 rounded-lg p-4">
          <h3 className="font-semibold mb-3">Control Points ({manualPoints.length})</h3>
          <div className="max-h-32 overflow-y-auto space-y-1">
            {manualPoints.map((point, index) => (
              <div key={point.id} className="flex items-center justify-between bg-gray-700 p-2 rounded text-xs">
                <span>Point {index + 1}: ({point.x.toFixed(1)}, {point.y.toFixed(1)})</span>
                <button
                  onClick={() => setManualPoints(prev => prev.filter(p => p.id !== point.id))}
                  className="text-red-400 hover:text-red-300"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Advanced Parameters */}
      <div className="bg-gray-800 rounded-lg p-4">
        <h3 className="font-semibold mb-3">Advanced Parameters</h3>
        <div className="space-y-3">
          <div>
            <label className="block text-xs font-medium text-gray-300 mb-1">Registration Method</label>
            <select className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-sm">
              <option value="affine">Affine Transformation</option>
              <option value="deformable">Deformable Registration</option>
              <option value="optical_flow">Optical Flow</option>
              <option value="feature_based">Feature-Based</option>
            </select>
          </div>
          
          <div>
            <label className="block text-xs font-medium text-gray-300 mb-1">Optimization Algorithm</label>
            <select className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-sm">
              <option value="lm">Levenberg-Marquardt</option>
              <option value="gd">Gradient Descent</option>
              <option value="adam">Adam Optimizer</option>
              <option value="bfgs">L-BFGS</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );

  const renderResearchInterface = () => (
    <div className="space-y-4">
      {/* Experimental Features */}
      <div className="bg-amber-900/20 border border-amber-600 rounded-lg p-4">
        <h3 className="text-amber-300 font-semibold mb-3">🧪 Experimental Features</h3>
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm cursor-pointer">
            <input type="checkbox" className="rounded" />
            <span>Neural-Enhanced Registration</span>
          </label>
          <label className="flex items-center gap-2 text-sm cursor-pointer">
            <input type="checkbox" className="rounded" />
            <span>Quantum-Inspired Optimization</span>
          </label>
          <label className="flex items-center gap-2 text-sm cursor-pointer">
            <input type="checkbox" className="rounded" />
            <span>Uncertainty Quantification</span>
          </label>
        </div>
      </div>

      {/* Performance Metrics */}
      <div className="bg-gray-800 rounded-lg p-4">
        <h3 className="font-semibold mb-3">Performance Analytics</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gray-900 rounded p-3">
            <div className="text-xs text-gray-400">Registration Time</div>
            <div className="text-lg font-mono text-green-400">2.34s</div>
          </div>
          <div className="bg-gray-900 rounded p-3">
            <div className="text-xs text-gray-400">Peak Memory</div>
            <div className="text-lg font-mono text-blue-400">1.2GB</div>
          </div>
          <div className="bg-gray-900 rounded p-3">
            <div className="text-xs text-gray-400">RMSE</div>
            <div className="text-lg font-mono text-purple-400">0.85px</div>
          </div>
          <div className="bg-gray-900 rounded p-3">
            <div className="text-xs text-gray-400">Mutual Info</div>
            <div className="text-lg font-mono text-yellow-400">1.42</div>
          </div>
        </div>
      </div>

      {/* Algorithm Comparison */}
      <div className="bg-gray-800 rounded-lg p-4">
        <h3 className="font-semibold mb-3">Algorithm Benchmarking</h3>
        <div className="space-y-2">
          {['Affine', 'B-Spline', 'Demons', 'ANTs', 'Neural'].map((algo, index) => (
            <div key={algo} className="flex items-center justify-between bg-gray-700 p-2 rounded">
              <span className="text-sm">{algo}</span>
              <div className="flex items-center gap-2">
                <div className="w-20 bg-gray-600 rounded-full h-2">
                  <div 
                    className="bg-green-400 h-2 rounded-full" 
                    style={{ width: `${Math.random() * 100}%` }}
                  />
                </div>
                <span className="text-xs text-gray-400">{(Math.random() * 2 + 0.5).toFixed(2)}s</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Data Export */}
      <div className="bg-gray-800 rounded-lg p-4">
        <h3 className="font-semibold mb-3">Data Export</h3>
        <div className="grid grid-cols-2 gap-2">
          <button className="bg-blue-600 hover:bg-blue-700 px-3 py-2 rounded text-sm">
            Export Parameters
          </button>
          <button className="bg-green-600 hover:bg-green-700 px-3 py-2 rounded text-sm">
            Export Metrics
          </button>
          <button className="bg-purple-600 hover:bg-purple-700 px-3 py-2 rounded text-sm">
            Export Overlays
          </button>
          <button className="bg-orange-600 hover:bg-orange-700 px-3 py-2 rounded text-sm">
            Export Report
          </button>
        </div>
      </div>
    </div>
  );

  const renderCollaborativeInterface = () => (
    <div className="space-y-4">
      {/* Active Users */}
      <div className="bg-gray-800 rounded-lg p-4">
        <h3 className="font-semibold mb-3 flex items-center gap-2">
          <Users className="w-4 h-4" />
          Active Collaborators
        </h3>
        <div className="space-y-2">
          {[
            { name: 'Dr. Smith', role: 'Radiologist', color: 'bg-blue-500' },
            { name: 'Alice Chen', role: 'ML Engineer', color: 'bg-green-500' },
            { name: 'Bob Wilson', role: 'Researcher', color: 'bg-purple-500' }
          ].map((user, index) => (
            <div key={index} className="flex items-center gap-3 bg-gray-700 p-2 rounded">
              <div className={`w-3 h-3 rounded-full ${user.color}`} />
              <div>
                <div className="text-sm font-medium">{user.name}</div>
                <div className="text-xs text-gray-400">{user.role}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Annotation Tools */}
      <div className="bg-gray-800 rounded-lg p-4">
        <h3 className="font-semibold mb-3">Collaborative Annotations</h3>
        <div className="grid grid-cols-2 gap-2 mb-3">
          <button className="bg-red-600 hover:bg-red-700 px-3 py-2 rounded text-sm">
            Mark Issue
          </button>
          <button className="bg-green-600 hover:bg-green-700 px-3 py-2 rounded text-sm">
            Approve Region
          </button>
          <button className="bg-yellow-600 hover:bg-yellow-700 px-3 py-2 rounded text-sm">
            Suggest Change
          </button>
          <button className="bg-blue-600 hover:bg-blue-700 px-3 py-2 rounded text-sm">
            Add Comment
          </button>
        </div>
      </div>

      {/* Consensus Building */}
      <div className="bg-gray-800 rounded-lg p-4">
        <h3 className="font-semibold mb-3">Consensus Status</h3>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm">Registration Quality</span>
            <div className="flex items-center gap-1">
              <Check className="w-4 h-4 text-green-400" />
              <Check className="w-4 h-4 text-green-400" />
              <AlertTriangle className="w-4 h-4 text-yellow-400" />
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm">Parameter Settings</span>
            <div className="flex items-center gap-1">
              <Check className="w-4 h-4 text-green-400" />
              <Check className="w-4 h-4 text-green-400" />
              <Check className="w-4 h-4 text-green-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Version Control */}
      <div className="bg-gray-800 rounded-lg p-4">
        <h3 className="font-semibold mb-3">Version History</h3>
        <div className="space-y-2 max-h-32 overflow-y-auto">
          {[
            { version: 'v1.3', author: 'Dr. Smith', action: 'Manual refinement' },
            { version: 'v1.2', author: 'Alice Chen', action: 'Parameter update' },
            { version: 'v1.1', author: 'Bob Wilson', action: 'Initial registration' }
          ].map((entry, index) => (
            <div key={index} className="bg-gray-700 p-2 rounded text-xs">
              <div className="flex items-center justify-between">
                <span className="font-medium">{entry.version}</span>
                <span className="text-gray-400">{entry.author}</span>
              </div>
              <div className="text-gray-300">{entry.action}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <div className="border-b border-gray-700 bg-gray-800">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-blue-400">Advanced Image Registration Interface</h1>
              <p className="text-gray-400 mt-1">Multi-modal user interface with advanced visualization overlays</p>
            </div>
            
            {/* Interface Mode Selector */}
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-400">Interface:</span>
              <select
                value={interfaceMode}
                onChange={(e) => setInterfaceMode(e.target.value)}
                className="bg-gray-700 border border-gray-600 rounded px-3 py-2 text-sm"
              >
                {Object.entries(interfaceModes).map(([key, mode]) => (
                  <option key={key} value={key}>{mode.name}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="flex h-screen">
        {/* Left Sidebar - Controls */}
        <div className="w-80 bg-gray-800 border-r border-gray-700 p-4 overflow-y-auto">
          <div className="mb-4">
            <h2 className="text-lg font-semibold mb-2 text-blue-300">
              {interfaceModes[interfaceMode].name}
            </h2>
            <p className="text-xs text-gray-400 mb-2">{interfaceModes[interfaceMode].description}</p>
            <div className="flex flex-wrap gap-1">
              {interfaceModes[interfaceMode].features.map((feature, index) => (
                <span key={index} className="px-2 py-1 bg-gray-700 rounded text-xs">
                  {feature}
                </span>
              ))}
            </div>
          </div>

          {renderInterface()}
        </div>

        {/* Main Canvas Area */}
        <div className="flex-1 flex flex-col">
          {/* Toolbar */}
          <div className="bg-gray-800 border-b border-gray-700 p-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setZoomLevel(prev => Math.max(0.1, prev - 0.1))}
                  className="p-1 hover:bg-gray-700 rounded"
                >
                  <ZoomOut className="w-4 h-4" />
                </button>
                <span className="text-sm px-2">{(zoomLevel * 100).toFixed(0)}%</span>
                <button
                  onClick={() => setZoomLevel(prev => Math.min(5, prev + 0.1))}
                  className="p-1 hover:bg-gray-700 rounded"
                >
                  <ZoomIn className="w-4 h-4" />
                </button>
              </div>

              <div className="h-4 w-px bg-gray-600" />

              <div className="flex items-center gap-1">
                <span className="text-xs text-gray-400">Tool:</span>
                <span className="text-xs text-blue-400">{interactionTools[interactionTool]?.name}</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                <span className="text-xs text-gray-400">Overlay:</span>
                <span className="text-xs text-purple-400">{overlayTypes[activeOverlay]?.name}</span>
              </div>
              
              <button
                onClick={() => setShowControls(!showControls)}
                className={`p-1 rounded ${showControls ? 'bg-blue-600' : 'hover:bg-gray-700'}`}
              >
                {showControls ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Canvas Container */}
          <div className="flex-1 relative overflow-hidden bg-gray-900">
            <canvas
              ref={canvasRef}
              onClick={handleCanvasClick}
              className={`absolute inset-0 w-full h-full cursor-${interactionTools[interactionTool]?.cursor}`}
              style={{ transform: `scale(${zoomLevel}) translate(${panOffset.x}px, ${panOffset.y}px)` }}
            />
            
            {/* Overlay Canvas */}
            <canvas
              ref={overlayCanvasRef}
              className="absolute inset-0 w-full h-full pointer-events-none"
              style={{ 
                opacity: overlayOpacity,
                transform: `scale(${zoomLevel}) translate(${panOffset.x}px, ${panOffset.y}px)`
              }}
            />

            {/* Interaction Canvas */}
            <canvas
              ref={interactionCanvasRef}
              className="absolute inset-0 w-full h-full pointer-events-none"
              style={{ transform: `scale(${zoomLevel}) translate(${panOffset.x}px, ${panOffset.y}px)` }}
            />

            {/* Control Points Overlay */}
            {manualPoints.map((point, index) => (
              <div
                key={point.id}
                className="absolute w-3 h-3 bg-red-500 border-2 border-white rounded-full pointer-events-none"
                style={{
                  left: `${point.x * zoomLevel + panOffset.x}px`,
                  top: `${point.y * zoomLevel + panOffset.y}px`,
                  transform: 'translate(-50%, -50%)'
                }}
              >
                <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-75 px-1 rounded text-xs whitespace-nowrap">
                  {index + 1}
                </div>
              </div>
            ))}

            {/* Collaborative Cursors */}
            {collaborativeMode && (
              <>
                <div className="absolute top-20 left-20 pointer-events-none">
                  <div className="w-4 h-4 bg-blue-500 rounded-full border-2 border-white" />
                  <div className="absolute top-5 left-0 bg-blue-500 text-white px-2 py-1 rounded text-xs whitespace-nowrap">
                    Dr. Smith
                  </div>
                </div>
                <div className="absolute top-40 left-60 pointer-events-none">
                  <div className="w-4 h-4 bg-green-500 rounded-full border-2 border-white" />
                  <div className="absolute top-5 left-0 bg-green-500 text-white px-2 py-1 rounded text-xs whitespace-nowrap">
                    Alice Chen
                  </div>
                </div>
              </>
            )}

            {/* Processing Overlay */}
            {isProcessing && (
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                <div className="bg-gray-800 rounded-lg p-6 flex flex-col items-center gap-3">
                  <RefreshCw className="w-8 h-8 animate-spin text-blue-400" />
                  <span className="text-lg font-semibold">Processing Registration...</span>
                  <div className="w-64 bg-gray-700 rounded-full h-2">
                    <div className="bg-blue-400 h-2 rounded-full animate-pulse" style={{ width: '60%' }} />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Status Bar */}
          <div className="bg-gray-800 border-t border-gray-700 p-3 text-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <span className="text-gray-400">
                  Cursor: <span className="text-blue-400">({Math.round(Math.random() * 800)}, {Math.round(Math.random() * 600)})</span>
                </span>
                <span className="text-gray-400">
                  Points: <span className="text-green-400">{manualPoints.length}</span>
                </span>
                {selectedRegion && (
                  <span className="text-gray-400">
                    Region: <span className="text-purple-400">{selectedRegion.width}×{selectedRegion.height}</span>
                  </span>
                )}
              </div>
              <div className="flex items-center gap-4">
                <span className="text-gray-400">
                  Quality: <span className="text-green-400">98.5%</span>
                </span>
                <span className="text-gray-400">
                  RMSE: <span className="text-yellow-400">0.74px</span>
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Sidebar - Overlay Information */}
        {showControls && (
          <div className="w-64 bg-gray-800 border-l border-gray-700 p-4">
            <h3 className="font-semibold mb-3 text-purple-300">Active Overlay</h3>
            
            <div className="bg-gray-900 rounded p-3 mb-4">
              <h4 className="text-sm font-medium text-purple-400 mb-2">
                {overlayTypes[activeOverlay]?.name}
              </h4>
              <p className="text-xs text-gray-300 mb-2">
                {overlayTypes[activeOverlay]?.description}
              </p>
              <code className="text-xs text-green-400">
                {overlayTypes[activeOverlay]?.equation}
              </code>
            </div>

            {/* Color Scale */}
            <div className="mb-4">
              <h4 className="text-sm font-medium mb-2">Color Scale</h4>
              <div className="h-4 rounded" style={{
                background: 'linear-gradient(to right, #000, #f00, #ff0, #fff)'
              }} />
              <div className="flex justify-between text-xs text-gray-400 mt-1">
                <span>Min</span>
                <span>Max</span>
              </div>
            </div>

            {/* Statistics */}
            <div className="space-y-2">
              <h4 className="text-sm font-medium mb-2">Statistics</h4>
              <div className="bg-gray-900 rounded p-2 text-xs">
                <div className="flex justify-between">
                  <span>Mean:</span>
                  <span className="text-blue-400">0.245</span>
                </div>
                <div className="flex justify-between">
                  <span>Std:</span>
                  <span className="text-green-400">0.089</span>
                </div>
                <div className="flex justify-between">
                  <span>Max:</span>
                  <span className="text-red-400">0.892</span>
                </div>
                <div className="flex justify-between">
                  <span>Min:</span>
                  <span className="text-purple-400">0.001</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdvancedImageRegressionInterface;