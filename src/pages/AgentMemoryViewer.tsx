import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { Brain, HardDrive, Eye, Grid, Target, Network, BarChart3, PieChart, Search, Filter, RefreshCw, Download, Settings, Zap, Clock, Database, MessageSquare, AlertTriangle, TrendingUp, Activity, Play, Pause, ArrowUp, ArrowDown, ChevronRight, X, MoreVertical, Maximize2, Minimize2, Copy, Share, BookOpen, Keyboard, Moon, Sun, Layers, FileText, Gauge, Users, Lock, Unlock, Menu, ChevronDown, ChevronUp, RotateCcw, Trash2, Star, Bell, BellOff, Info, ExternalLink, Code, Cpu, MemoryStick, Wifi, WifiOff, ZoomIn, ZoomOut } from 'lucide-react';

const AdvancedAgentMemoryViewer = () => {
  const [selectedAgent, setSelectedAgent] = useState('cognitive-analyst');
  const [viewMode, setViewMode] = useState('sunburst');
  const [selectedMemoryType, setSelectedMemoryType] = useState('all');
  const [memoryDetails, setMemoryDetails] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isRealTimeEnabled, setIsRealTimeEnabled] = useState(true);
  const [selectedTimeRange, setSelectedTimeRange] = useState('1h');
  const [expandedMemoryItem, setExpandedMemoryItem] = useState(null);
  const [currentTime, setCurrentTime] = useState(Date.now());
  const [theme, setTheme] = useState('light');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [detailsPanelCollapsed, setDetailsPanelCollapsed] = useState(false);
  const [showContextMenu, setShowContextMenu] = useState(null);
  const [selectedMemoryItems, setSelectedMemoryItems] = useState(new Set());
  const [comparisonMode, setComparisonMode] = useState(false);
  const [filterOptions, setFilterOptions] = useState({
    minSize: 0,
    maxSize: 5000,
    accessFrequency: 'all',
    status: 'all'
  });
  const [showFilters, setShowFilters] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [alertsEnabled, setAlertsEnabled] = useState(true);
  const [showHelp, setShowHelp] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [layoutMode, setLayoutMode] = useState('standard');
  const [pinnedItems, setPinnedItems] = useState(new Set());
  const [historyIndex, setHistoryIndex] = useState(0);
  const [viewHistory, setViewHistory] = useState([]);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [performanceMetrics, setPerformanceMetrics] = useState({
    frameRate: 60,
    memoryUsage: 245,
    networkLatency: 12
  });

  const contextMenuRef = useRef(null);
  const visualizationRef = useRef(null);

  // Enhanced agents data with more detailed metrics
  const agents = [
    { 
      id: 'cognitive-analyst', 
      name: 'Cognitive Analyst', 
      status: 'active',
      totalMemory: 4.2,
      workingMemory: 0.342,
      longTermMemory: 3.1,
      episodicMemory: 0.756,
      efficiency: 94.2,
      accessRate: 2300,
      consolidations: 23,
      alerts: 0,
      uptime: '7d 14h',
      version: '2.1.4',
      region: 'us-east-1',
      cores: 8,
      threads: 16
    },
    { 
      id: 'pattern-matcher', 
      name: 'Pattern Matcher', 
      status: 'active',
      totalMemory: 2.8,
      workingMemory: 0.198,
      longTermMemory: 2.3,
      episodicMemory: 0.312,
      efficiency: 87.6,
      accessRate: 1850,
      consolidations: 18,
      alerts: 1,
      uptime: '3d 8h',
      version: '1.9.2',
      region: 'eu-west-1',
      cores: 6,
      threads: 12
    },
    { 
      id: 'context-weaver', 
      name: 'Context Weaver', 
      status: 'idle',
      totalMemory: 1.9,
      workingMemory: 0.089,
      longTermMemory: 1.5,
      episodicMemory: 0.234,
      efficiency: 76.4,
      accessRate: 450,
      consolidations: 5,
      alerts: 2,
      uptime: '12h 23m',
      version: '2.0.1',
      region: 'ap-south-1',
      cores: 4,
      threads: 8
    }
  ];

  const memoryCategories = [
    { 
      type: 'working', 
      label: 'Working Memory', 
      color: '#3b82f6', 
      size: 342,
      items: 1247,
      accessFreq: 'Very High',
      retention: '5-15 min',
      description: 'Active information being processed',
      priority: 'high',
      lastOptimized: '2 hours ago',
      contentTypes: ['variables', 'buffers', 'cache'],
      avgResponseTime: '12ms'
    },
    { 
      type: 'semantic', 
      label: 'Semantic Knowledge', 
      color: '#10b981', 
      size: 1840,
      items: 45670,
      accessFreq: 'High',
      retention: 'Permanent',
      description: 'Factual knowledge and concepts',
      priority: 'medium',
      lastOptimized: '6 hours ago',
      contentTypes: ['facts', 'concepts', 'relations'],
      avgResponseTime: '8ms'
    },
    { 
      type: 'episodic', 
      label: 'Episodic Events', 
      color: '#f59e0b', 
      size: 756,
      items: 12847,
      accessFreq: 'Medium',
      retention: 'Variable',
      description: 'Personal experiences and events',
      priority: 'medium',
      lastOptimized: '1 day ago',
      contentTypes: ['events', 'sequences', 'contexts'],
      avgResponseTime: '15ms'
    },
    { 
      type: 'procedural', 
      label: 'Procedural Skills', 
      color: '#8b5cf6', 
      size: 923,
      items: 3421,
      accessFreq: 'Medium',
      retention: 'Long-term',
      description: 'Skills and procedures',
      priority: 'low',
      lastOptimized: '3 days ago',
      contentTypes: ['algorithms', 'workflows', 'patterns'],
      avgResponseTime: '20ms'
    },
    { 
      type: 'contextual', 
      label: 'Contextual Buffers', 
      color: '#ef4444', 
      size: 267,
      items: 892,
      accessFreq: 'High',
      retention: '1-2 hours',
      description: 'Current context and session data',
      priority: 'high',
      lastOptimized: '30 minutes ago',
      contentTypes: ['sessions', 'states', 'history'],
      avgResponseTime: '5ms'
    },
    { 
      type: 'meta', 
      label: 'Meta-Cognitive', 
      color: '#06b6d4', 
      size: 156,
      items: 234,
      accessFreq: 'Low',
      retention: 'Permanent',
      description: 'Self-awareness and monitoring',
      priority: 'low',
      lastOptimized: '1 week ago',
      contentTypes: ['monitoring', 'strategies', 'reflection'],
      avgResponseTime: '25ms'
    }
  ];

  // Real-time data simulation with performance tracking
  useEffect(() => {
    if (!isRealTimeEnabled) return;
    
    const interval = setInterval(() => {
      setCurrentTime(Date.now());
      setPerformanceMetrics(prev => ({
        frameRate: 58 + Math.random() * 4,
        memoryUsage: prev.memoryUsage + (Math.random() - 0.5) * 10,
        networkLatency: 10 + Math.random() * 8
      }));
    }, 2000);
    
    return () => clearInterval(interval);
  }, [isRealTimeEnabled]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.ctrlKey || e.metaKey) {
        switch (e.key) {
          case 'f':
            e.preventDefault();
            document.querySelector('input[placeholder="Search memory..."]')?.focus();
            break;
          case 'r':
            e.preventDefault();
            setIsRealTimeEnabled(!isRealTimeEnabled);
            break;
          case '1':
            e.preventDefault();
            setViewMode('sunburst');
            break;
          case '2':
            e.preventDefault();
            setViewMode('treemap');
            break;
          case '3':
            e.preventDefault();
            setViewMode('network');
            break;
          case 'Escape':
            setShowContextMenu(null);
            setMemoryDetails(null);
            break;
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isRealTimeEnabled]);

  // Click outside to close context menu
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (contextMenuRef.current && !contextMenuRef.current.contains(event.target)) {
        setShowContextMenu(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const generateMemoryData = useCallback((category) => {
    const currentAgent = agents.find(a => a.id === selectedAgent);
    const variance = (Math.sin(currentTime / 10000) * 0.1 + 1);
    
    return {
      ...category,
      size: Math.floor(category.size * variance),
      items: Math.floor(category.items * variance),
      lastAccess: Date.now() - Math.random() * 300000,
      compression: 45 + Math.random() * 40,
      fragmentation: 5 + Math.random() * 20,
      temperature: Math.random() * 100,
      id: `${selectedAgent}-${category.type}`,
      health: Math.random() > 0.8 ? 'warning' : 'healthy'
    };
  }, [selectedAgent, currentTime]);

  const memoryData = useMemo(() => 
    memoryCategories.map(generateMemoryData), 
    [generateMemoryData]
  );

  const filteredMemoryData = useMemo(() => {
    let filtered = selectedMemoryType === 'all' ? 
      memoryData : memoryData.filter(m => m.type === selectedMemoryType);

    if (searchTerm) {
      filtered = filtered.filter(m => 
        m.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
        m.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    filtered = filtered.filter(m => 
      m.size >= filterOptions.minSize && 
      m.size <= filterOptions.maxSize &&
      (filterOptions.accessFrequency === 'all' || m.accessFreq === filterOptions.accessFrequency) &&
      (filterOptions.status === 'all' || m.health === filterOptions.status)
    );

    return filtered;
  }, [memoryData, selectedMemoryType, searchTerm, filterOptions]);

  const handleMemorySelect = (memory, isMultiSelect = false) => {
    if (isMultiSelect) {
      const newSelection = new Set(selectedMemoryItems);
      if (newSelection.has(memory.id)) {
        newSelection.delete(memory.id);
      } else {
        newSelection.add(memory.id);
      }
      setSelectedMemoryItems(newSelection);
    } else {
      setMemoryDetails(memory);
      setSelectedMemoryItems(new Set([memory.id]));
    }
  };

  const handleContextMenu = (e, memory) => {
    e.preventDefault();
    setShowContextMenu({
      x: e.clientX,
      y: e.clientY,
      memory
    });
  };

  const ContextMenu = () => {
    if (!showContextMenu) return null;

    const { x, y, memory } = showContextMenu;

    return (
      <div
        ref={contextMenuRef}
        className="fixed bg-white border border-gray-200 rounded-lg shadow-xl z-50 py-2 min-w-48"
        style={{ left: x, top: y }}
      >
        <button 
          className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 flex items-center"
          onClick={() => {
            setMemoryDetails(memory);
            setShowContextMenu(null);
          }}
        >
          <Eye className="w-4 h-4 mr-2" />
          View Details
        </button>
        <button 
          className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 flex items-center"
          onClick={() => {
            const newPinned = new Set(pinnedItems);
            if (newPinned.has(memory.id)) {
              newPinned.delete(memory.id);
            } else {
              newPinned.add(memory.id);
            }
            setPinnedItems(newPinned);
            setShowContextMenu(null);
          }}
        >
          <Star className={`w-4 h-4 mr-2 ${pinnedItems.has(memory.id) ? 'text-yellow-500' : ''}`} />
          {pinnedItems.has(memory.id) ? 'Unpin' : 'Pin'} Memory
        </button>
        <button 
          className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 flex items-center"
          onClick={() => {
            navigator.clipboard.writeText(`Memory: ${memory.label}, Size: ${memory.size}MB`);
            setShowContextMenu(null);
          }}
        >
          <Copy className="w-4 h-4 mr-2" />
          Copy Info
        </button>
        <hr className="my-1" />
        <button 
          className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 flex items-center text-purple-600"
          onClick={() => {
            console.log('Optimizing memory:', memory.label);
            setShowContextMenu(null);
          }}
        >
          <Zap className="w-4 h-4 mr-2" />
          Optimize
        </button>
        <button 
          className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 flex items-center text-red-600"
          onClick={() => {
            console.log('Clearing memory:', memory.label);
            setShowContextMenu(null);
          }}
        >
          <Trash2 className="w-4 h-4 mr-2" />
          Clear Cache
        </button>
      </div>
    );
  };

  const EnhancedSunburstView = () => {
    const totalSize = filteredMemoryData.reduce((sum, cat) => sum + cat.size, 0);
    
    return (
      <div className="relative w-full h-full flex items-center justify-center">
        <div 
          className="transform transition-transform duration-300"
          style={{ transform: `scale(${zoomLevel})` }}
        >
          <svg width="500" height="500" viewBox="0 0 500 500">
            <defs>
              <radialGradient id="centerGradient" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor={theme === 'dark' ? '#374151' : '#f8fafc'} />
                <stop offset="100%" stopColor={theme === 'dark' ? '#1f2937' : '#e2e8f0'} />
              </radialGradient>
              <filter id="glow">
                <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                <feMerge> 
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>
            
            {/* Enhanced segments with interactions */}
            {filteredMemoryData.map((category, index) => {
              const percentage = category.size / totalSize;
              const startAngle = filteredMemoryData.slice(0, index).reduce((sum, cat) => sum + (cat.size / totalSize), 0) * 2 * Math.PI;
              const endAngle = startAngle + (percentage * 2 * Math.PI);
              
              const largeArcFlag = endAngle - startAngle > Math.PI ? 1 : 0;
              
              const x1 = 250 + 140 * Math.cos(startAngle);
              const y1 = 250 + 140 * Math.sin(startAngle);
              const x2 = 250 + 140 * Math.cos(endAngle);
              const y2 = 250 + 140 * Math.sin(endAngle);
              
              const x3 = 250 + 190 * Math.cos(endAngle);
              const y3 = 250 + 190 * Math.sin(endAngle);
              const x4 = 250 + 190 * Math.cos(startAngle);
              const y4 = 250 + 190 * Math.sin(startAngle);

              const isSelected = selectedMemoryItems.has(category.id);
              const isPinned = pinnedItems.has(category.id);

              return (
                <g key={category.type}>
                  <path
                    d={`M ${x1} ${y1} A 140 140 0 ${largeArcFlag} 1 ${x2} ${y2} L ${x3} ${y3} A 190 190 0 ${largeArcFlag} 0 ${x4} ${y4} Z`}
                    fill={category.color}
                    className="cursor-pointer transition-all duration-300"
                    style={{
                      filter: `brightness(${0.8 + (category.temperature / 100) * 0.4}) ${isSelected ? 'drop-shadow(0 0 10px rgba(59, 130, 246, 0.6))' : ''}`,
                      opacity: isSelected ? 1 : 0.9,
                      stroke: isSelected ? '#3b82f6' : 'transparent',
                      strokeWidth: isSelected ? 3 : 0
                    }}
                    onClick={(e) => handleMemorySelect(category, e.ctrlKey || e.metaKey)}
                    onContextMenu={(e) => handleContextMenu(e, category)}
                  />
                  
                  {/* Pin indicator */}
                  {isPinned && (
                    <circle
                      cx={250 + 165 * Math.cos((startAngle + endAngle) / 2)}
                      cy={250 + 165 * Math.sin((startAngle + endAngle) / 2)}
                      r="6"
                      fill="#fbbf24"
                      stroke="white"
                      strokeWidth="2"
                    />
                  )}
                  
                  {/* Health indicator */}
                  {category.health === 'warning' && (
                    <circle
                      cx={250 + 175 * Math.cos((startAngle + endAngle) / 2)}
                      cy={250 + 175 * Math.sin((startAngle + endAngle) / 2)}
                      r="4"
                      fill="#ef4444"
                      className="animate-pulse"
                    />
                  )}
                  
                  {/* Labels */}
                  {percentage > 0.05 && (
                    <text
                      x={250 + 165 * Math.cos((startAngle + endAngle) / 2)}
                      y={250 + 165 * Math.sin((startAngle + endAngle) / 2)}
                      textAnchor="middle"
                      className="text-xs font-medium fill-white pointer-events-none"
                    >
                      {category.label.split(' ')[0]}
                    </text>
                  )}
                </g>
              );
            })}
            
            {/* Center circle */}
            <circle cx="250" cy="250" r="95" fill="url(#centerGradient)" stroke="#e2e8f0" strokeWidth="2"/>
            <text x="250" y="235" textAnchor="middle" className={`text-xl font-bold ${theme === 'dark' ? 'fill-white' : 'fill-gray-900'}`}>
              {agents.find(a => a.id === selectedAgent)?.totalMemory}GB
            </text>
            <text x="250" y="255" textAnchor="middle" className={`text-sm ${theme === 'dark' ? 'fill-gray-300' : 'fill-gray-600'}`}>
              Total Memory
            </text>
            <text x="250" y="275" textAnchor="middle" className={`text-xs ${theme === 'dark' ? 'fill-gray-400' : 'fill-gray-500'}`}>
              {agents.find(a => a.id === selectedAgent)?.efficiency}% efficient
            </text>
          </svg>
        </div>
        
        {/* Zoom controls */}
        <div className="absolute bottom-4 right-4 flex space-x-2">
          <button
            onClick={() => setZoomLevel(Math.max(0.5, zoomLevel - 0.1))}
            className="p-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 shadow-sm"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
          <button
            onClick={() => setZoomLevel(1)}
            className="px-3 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 shadow-sm text-xs"
          >
            {Math.round(zoomLevel * 100)}%
          </button>
          <button
            onClick={() => setZoomLevel(Math.min(2, zoomLevel + 0.1))}
            className="p-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 shadow-sm"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  };

  const EnhancedTreemapView = () => {
    const totalSize = filteredMemoryData.reduce((sum, cat) => sum + cat.size, 0);
    
    return (
      <div className="w-full h-full relative bg-gray-50 p-4">
        <div className="grid grid-cols-3 grid-rows-2 gap-2 h-full">
          {filteredMemoryData.map((category) => {
            const percentage = category.size / totalSize;
            const itemsPerRow = Math.ceil(Math.sqrt(category.items / 100));
            const isSelected = selectedMemoryItems.has(category.id);
            const isPinned = pinnedItems.has(category.id);
            
            return (
              <div
                key={category.type}
                className={`relative border cursor-pointer transition-all duration-300 rounded-lg overflow-hidden ${
                  isSelected ? 'ring-2 ring-blue-500 shadow-lg scale-105' : 'border-white hover:scale-105'
                }`}
                style={{
                  backgroundColor: category.color,
                  gridRowSpan: percentage > 0.25 ? 2 : 1,
                  gridColumnSpan: percentage > 0.3 ? 2 : 1
                }}
                onClick={(e) => handleMemorySelect(category, e.ctrlKey || e.metaKey)}
                onContextMenu={(e) => handleContextMenu(e, category)}
              >
                <div className="p-4 text-white h-full flex flex-col relative">
                  {/* Header */}
                  <div className="mb-2 flex items-start justify-between">
                    <div>
                      <div className="text-lg font-bold">{category.label}</div>
                      <div className="text-sm opacity-90">{category.size}MB</div>
                      <div className="text-xs opacity-75">{category.items.toLocaleString()} items</div>
                    </div>
                    <div className="flex space-x-1">
                      {isPinned && <Star className="w-4 h-4 text-yellow-300" />}
                      {category.health === 'warning' && <AlertTriangle className="w-4 h-4 text-red-300" />}
                    </div>
                  </div>
                  
                  {/* Activity heatmap */}
                  <div className="flex-1 grid gap-px" style={{
                    gridTemplateColumns: `repeat(${Math.min(itemsPerRow, 8)}, 1fr)`,
                    gridTemplateRows: `repeat(${Math.min(Math.ceil(20 / itemsPerRow), 5)}, 1fr)`
                  }}>
                    {Array.from({length: Math.min(20, itemsPerRow * 5)}).map((_, subIndex) => (
                      <div
                        key={subIndex}
                        className="rounded-sm transition-all duration-200"
                        style={{
                          backgroundColor: `rgba(255,255,255,${0.1 + (Math.sin(currentTime / 1000 + subIndex) + 1) * 0.3})`,
                          animation: isRealTimeEnabled ? `flicker ${2 + (subIndex % 3)}s ease-in-out infinite` : 'none'
                        }}
                      />
                    ))}
                  </div>
                  
                  {/* Footer metrics */}
                  <div className="mt-2 space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span>Access: {category.accessFreq}</span>
                      <span>{category.avgResponseTime}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Activity className="w-3 h-3" />
                      <div className="flex-1 bg-black bg-opacity-20 rounded-full h-1">
                        <div 
                          className="bg-white rounded-full h-1 transition-all duration-500"
                          style={{ width: `${category.temperature}%` }}
                        />
                      </div>
                      <span className="text-xs">{Math.round(category.temperature)}°</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const EnhancedNetworkView = () => {
    const positions = [
      {x: 150, y: 120}, {x: 250, y: 100}, {x: 350, y: 130},
      {x: 120, y: 250}, {x: 380, y: 220}, {x: 280, y: 300}
    ];

    const connections = [
      {from: 0, to: 1, strength: 0.8, type: 'bidirectional'},
      {from: 1, to: 2, strength: 0.6, type: 'unidirectional'},
      {from: 1, to: 3, strength: 0.9, type: 'bidirectional'},
      {from: 1, to: 4, strength: 0.7, type: 'unidirectional'},
      {from: 3, to: 5, strength: 0.5, type: 'bidirectional'},
      {from: 4, to: 2, strength: 0.6, type: 'unidirectional'},
      {from: 5, to: 4, strength: 0.4, type: 'bidirectional'}
    ];
    
    return (
      <div className="w-full h-full relative bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center">
        <svg width="500" height="400" viewBox="0 0 500 400">
          <defs>
            <filter id="glow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
              <feMerge> 
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
            <marker id="arrowhead" markerWidth="10" markerHeight="7" 
              refX="9" refY="3.5" orient="auto">
              <polygon points="0 0, 10 3.5, 0 7" fill="#3b82f6" />
            </marker>
          </defs>
          
          {/* Enhanced connections */}
          {connections.map((conn, index) => {
            const from = positions[conn.from];
            const to = positions[conn.to];
            const strength = conn.strength;
            
            return (
              <g key={index}>
                <line 
                  x1={from.x} y1={from.y} 
                  x2={to.x} y2={to.y}
                  stroke="#e2e8f0" 
                  strokeWidth={strength * 4}
                  opacity={0.4}
                  markerEnd={conn.type === 'unidirectional' ? "url(#arrowhead)" : ""}
                />
                
                {/* Connection strength indicator */}
                <circle
                  cx={(from.x + to.x) / 2}
                  cy={(from.y + to.y) / 2}
                  r={strength * 3}
                  fill="#3b82f6"
                  opacity={0.3}
                  className="hover:opacity-60 cursor-pointer"
                  onClick={() => console.log(`Connection strength: ${strength}`)}
                />
                
                {/* Data flow animation */}
                {isRealTimeEnabled && (
                  <circle
                    r="3"
                    fill="#3b82f6"
                    opacity="0.8"
                    filter="url(#glow)"
                  >
                    <animateMotion
                      dur={`${3 / strength}s`}
                      repeatCount="indefinite"
                      path={`M${from.x},${from.y} L${to.x},${to.y}`}
                    />
                  </circle>
                )}
              </g>
            );
          })}
          
          {/* Enhanced memory nodes */}
          {filteredMemoryData.map((category, index) => {
            const pos = positions[index] || {x: 250, y: 200};
            const radius = Math.max(20, Math.sqrt(category.size) / 6);
            const isSelected = selectedMemoryItems.has(category.id);
            const isPinned = pinnedItems.has(category.id);
            
            return (
              <g key={category.type} className="cursor-pointer" 
                 onClick={(e) => handleMemorySelect(category, e.ctrlKey || e.metaKey)}
                 onContextMenu={(e) => handleContextMenu(e, category)}>
                
                {/* Selection ring */}
                {isSelected && (
                  <circle 
                    cx={pos.x} 
                    cy={pos.y} 
                    r={radius + 8} 
                    fill="none"
                    stroke="#3b82f6"
                    strokeWidth="3"
                    className="animate-pulse"
                  />
                )}
                
                {/* Background glow */}
                <circle 
                  cx={pos.x} 
                  cy={pos.y} 
                  r={radius + 5} 
                  fill={category.color}
                  opacity="0.2"
                  className="transition-all duration-300"
                  style={{
                    animation: isRealTimeEnabled ? `pulse ${2 + index * 0.3}s ease-in-out infinite alternate` : 'none'
                  }}
                />
                
                {/* Main node */}
                <circle 
                  cx={pos.x} 
                  cy={pos.y} 
                  r={radius} 
                  fill={category.color}
                  className="hover:opacity-80 transition-all duration-300"
                  filter="url(#glow)"
                />
                
                {/* Node content */}
                <text 
                  x={pos.x} 
                  y={pos.y - 2} 
                  textAnchor="middle" 
                  className="text-xs font-bold fill-white pointer-events-none"
                >
                  {category.label.split(' ')[0]}
                </text>
                <text 
                  x={pos.x} 
                  y={pos.y + 8} 
                  textAnchor="middle" 
                  className="text-xs fill-white opacity-80 pointer-events-none"
                >
                  {category.size}MB
                </text>
                
                {/* Status indicators */}
                <g transform={`translate(${pos.x + radius - 8}, ${pos.y - radius + 8})`}>
                  {isPinned && (
                    <circle r="3" fill="#fbbf24" />
                  )}
                  {category.health === 'warning' && (
                    <circle r="3" fill="#ef4444" transform="translate(0, 8)">
                      <animate attributeName="opacity" values="1;0.3;1" dur="1s" repeatCount="indefinite"/>
                    </circle>
                  )}
                  <circle
                    r="3"
                    fill={category.accessFreq === 'Very High' ? '#ef4444' : 
                          category.accessFreq === 'High' ? '#f59e0b' : '#10b981'}
                    transform="translate(8, 0)"
                  />
                </g>
                
                {/* Node labels */}
                <text 
                  x={pos.x} 
                  y={pos.y + radius + 20} 
                  textAnchor="middle" 
                  className="text-sm font-medium fill-gray-700 pointer-events-none"
                >
                  {category.label.split(' ')[0]}
                </text>
                <text 
                  x={pos.x} 
                  y={pos.y + radius + 35} 
                  textAnchor="middle" 
                  className="text-xs fill-gray-500 pointer-events-none"
                >
                  {category.avgResponseTime}
                </text>
              </g>
            );
          })}
        </svg>
        
        {/* Network legend */}
        <div className="absolute top-4 left-4 bg-white bg-opacity-90 rounded-lg p-3 text-xs">
          <div className="font-medium mb-2">Network Legend</div>
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span>Low frequency</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <span>High frequency</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
              <span>Very high frequency</span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const currentAgent = agents.find(a => a.id === selectedAgent);

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'} ${isFullscreen ? 'fixed inset-0 z-50' : ''}`}>
      {/* Ultra-Enhanced Header */}
      <header className={`${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-b px-6 py-4`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3">
              <Brain className="w-8 h-8 text-purple-600" />
              <div>
                <h1 className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Agent Memory Viewer</h1>
                <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>Visualization and management of agent memory systems</p>
              </div>
            </div>
            
            {/* Status indicators */}
            <div className="flex items-center space-x-4 text-sm">
              <div className="flex items-center space-x-2">
                <div className={`w-2 h-2 rounded-full ${isRealTimeEnabled ? 'bg-green-500 animate-pulse' : 'bg-gray-400'}`}></div>
                <span className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
                  {isRealTimeEnabled ? 'Live' : 'Paused'}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Gauge className="w-4 h-4 text-blue-500" />
                <span className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
                  {performanceMetrics.frameRate.toFixed(0)} FPS
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <MemoryStick className="w-4 h-4 text-green-500" />
                <span className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
                  {performanceMetrics.memoryUsage.toFixed(0)}MB
                </span>
              </div>
              <div className="flex items-center space-x-2">
                {performanceMetrics.networkLatency < 20 ? 
                  <Wifi className="w-4 h-4 text-green-500" /> : 
                  <WifiOff className="w-4 h-4 text-red-500" />
                }
                <span className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
                  {performanceMetrics.networkLatency.toFixed(0)}ms
                </span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            {/* Search */}
            <div className="relative flex items-center space-x-2">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search memory... (Ctrl+F)"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className={`pl-10 pr-4 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                    theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'border-gray-300'
                  }`}
                />
              </div>
              
            {/* Filters */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`p-2 rounded-lg text-sm flex items-center space-x-1 ${
                  showFilters ? 'bg-purple-100 text-purple-700' : 
                  theme === 'dark' ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <Filter className="w-4 h-4" />
                {Object.values(filterOptions).some(v => v !== 'all' && v !== 0 && v !== 5000) && (
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                )}
              </button>
            </div>
            
            {/* Control buttons */}
            <button
              onClick={() => setIsRealTimeEnabled(!isRealTimeEnabled)}
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm transition-all ${
                isRealTimeEnabled ? 'bg-green-100 text-green-700 hover:bg-green-200' : 
                theme === 'dark' ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
              title="Toggle real-time updates (Ctrl+R)"
            >
              {isRealTimeEnabled ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              <span>{isRealTimeEnabled ? 'Live' : 'Paused'}</span>
            </button>
            
            <button
              onClick={() => setComparisonMode(!comparisonMode)}
              className={`p-2 rounded-lg transition-all ${
                comparisonMode ? 'bg-blue-100 text-blue-700' : 
                theme === 'dark' ? 'text-gray-400 hover:text-gray-300 hover:bg-gray-700' : 'text-gray-400 hover:text-gray-600 hover:bg-gray-100'
              }`}
              title="Toggle comparison mode"
            >
              <Layers className="w-5 h-5" />
            </button>
            
            <button
              onClick={() => setAlertsEnabled(!alertsEnabled)}
              className={`p-2 rounded-lg transition-all ${
                alertsEnabled ? 'text-blue-600' : 
                theme === 'dark' ? 'text-gray-400 hover:text-gray-300 hover:bg-gray-700' : 'text-gray-400 hover:text-gray-600 hover:bg-gray-100'
              }`}
              title="Toggle notifications"
            >
              {alertsEnabled ? <Bell className="w-5 h-5" /> : <BellOff className="w-5 h-5" />}
            </button>
            
            <button
              onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
              className={`p-2 rounded-lg transition-all ${
                theme === 'dark' ? 'text-gray-400 hover:text-gray-300 hover:bg-gray-700' : 'text-gray-400 hover:text-gray-600 hover:bg-gray-100'
              }`}
              title="Toggle theme"
            >
              {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
            </button>
            
            <button
              onClick={() => setIsFullscreen(!isFullscreen)}
              className={`p-2 rounded-lg transition-all ${
                theme === 'dark' ? 'text-gray-400 hover:text-gray-300 hover:bg-gray-700' : 'text-gray-400 hover:text-gray-600 hover:bg-gray-100'
              }`}
              title="Toggle fullscreen"
            >
              {isFullscreen ? <Minimize2 className="w-5 h-5" /> : <Maximize2 className="w-5 h-5" />}
            </button>
            
            <button
              onClick={() => setShowHelp(!showHelp)}
              className={`p-2 rounded-lg transition-all ${
                theme === 'dark' ? 'text-gray-400 hover:text-gray-300 hover:bg-gray-700' : 'text-gray-400 hover:text-gray-600 hover:bg-gray-100'
              }`}
              title="Show help"
            >
              <BookOpen className="w-5 h-5" />
            </button>
            
            <div className="h-6 w-px bg-gray-300"></div>
            
            <button className={`p-2 rounded-lg transition-all ${
              theme === 'dark' ? 'text-gray-400 hover:text-gray-300 hover:bg-gray-700' : 'text-gray-400 hover:text-gray-600 hover:bg-gray-100'
            }`}>
              <RefreshCw className="w-5 h-5" />
            </button>
            <button className={`p-2 rounded-lg transition-all ${
              theme === 'dark' ? 'text-gray-400 hover:text-gray-300 hover:bg-gray-700' : 'text-gray-400 hover:text-gray-600 hover:bg-gray-100'
            }`}>
              <Download className="w-5 h-5" />
            </button>
            <button className={`p-2 rounded-lg transition-all ${
              theme === 'dark' ? 'text-gray-400 hover:text-gray-300 hover:bg-gray-700' : 'text-gray-400 hover:text-gray-600 hover:bg-gray-100'
            }`}>
              <Settings className="w-5 h-5" />
            </button>
          </div>
        </div>
        
        {/* Filters panel */}
        {showFilters && (
          <div className={`mt-4 p-4 rounded-lg border ${
            theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'
          }`}>
            <div className="grid grid-cols-4 gap-4">
              <div>
                <label className={`block text-sm font-medium mb-1 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                  Size Range (MB)
                </label>
                <div className="flex space-x-2">
                  <input
                    type="number"
                    placeholder="Min"
                    value={filterOptions.minSize}
                    onChange={(e) => setFilterOptions({...filterOptions, minSize: Number(e.target.value)})}
                    className={`w-full px-2 py-1 border rounded text-sm ${
                      theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white' : 'border-gray-300'
                    }`}
                  />
                  <input
                    type="number"
                    placeholder="Max"
                    value={filterOptions.maxSize}
                    onChange={(e) => setFilterOptions({...filterOptions, maxSize: Number(e.target.value)})}
                    className={`w-full px-2 py-1 border rounded text-sm ${
                      theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white' : 'border-gray-300'
                    }`}
                  />
                </div>
              </div>
              <div>
                <label className={`block text-sm font-medium mb-1 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                  Access Frequency
                </label>
                <select
                  value={filterOptions.accessFrequency}
                  onChange={(e) => setFilterOptions({...filterOptions, accessFrequency: e.target.value})}
                  className={`w-full px-2 py-1 border rounded text-sm ${
                    theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white' : 'border-gray-300'
                  }`}
                >
                  <option value="all">All Frequencies</option>
                  <option value="Very High">Very High</option>
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </select>
              </div>
              <div>
                <label className={`block text-sm font-medium mb-1 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                  Health Status
                </label>
                <select
                  value={filterOptions.status}
                  onChange={(e) => setFilterOptions({...filterOptions, status: e.target.value})}
                  className={`w-full px-2 py-1 border rounded text-sm ${
                    theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white' : 'border-gray-300'
                  }`}
                >
                  <option value="all">All Status</option>
                  <option value="healthy">Healthy</option>
                  <option value="warning">Warning</option>
                </select>
              </div>
              <div className="flex items-end">
                <button
                  onClick={() => setFilterOptions({
                    minSize: 0,
                    maxSize: 5000,
                    accessFrequency: 'all',
                    status: 'all'
                  })}
                  className={`px-3 py-1 text-sm rounded ${
                    theme === 'dark' ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  Clear Filters
                </button>
              </div>
            </div>
          </div>
        )}
      </header>

      <div className="flex h-[calc(100vh-80px)]">
        {/* Ultra-Enhanced Agent Selection Sidebar */}
        <aside className={`${sidebarCollapsed ? 'w-16' : 'w-80'} transition-all duration-300 ${
          theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
        } border-r p-6 overflow-y-auto`}>
          
          {/* Sidebar toggle */}
          <button
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className={`mb-4 p-2 rounded-lg ${
              theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
            }`}
          >
            <Menu className="w-5 h-5" />
          </button>
          
          {!sidebarCollapsed && (
            <div className="space-y-6">
              {/* Agent Selector */}
              <div>
                <h3 className={`text-sm font-medium mb-3 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  Select Agent
                </h3>
                <div className="space-y-3">
                  {agents.map((agent) => (
                    <div
                      key={agent.id}
                      onClick={() => setSelectedAgent(agent.id)}
                      className={`p-4 rounded-lg border cursor-pointer transition-all duration-200 ${
                        selectedAgent === agent.id
                          ? 'border-purple-500 bg-purple-50 shadow-md scale-105'
                          : theme === 'dark' 
                            ? 'border-gray-600 hover:border-gray-500 hover:bg-gray-700'
                            : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <span className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                          {agent.name}
                        </span>
                        <div className="flex items-center space-x-2">
                          {agent.alerts > 0 && (
                            <div className="flex items-center space-x-1 text-red-600">
                              <AlertTriangle className="w-3 h-3" />
                              <span className="text-xs">{agent.alerts}</span>
                            </div>
                          )}
                          <div className={`w-2 h-2 rounded-full ${
                            agent.status === 'active' ? 'bg-green-500' : 'bg-gray-400'
                          }`} />
                        </div>
                      </div>
                      
                      <div className={`space-y-2 text-xs ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                        <div className="grid grid-cols-2 gap-2">
                          <div className="flex justify-between">
                            <span>Memory:</span>
                            <span className="font-medium">{agent.totalMemory}GB</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Cores:</span>
                            <span className="font-medium">{agent.cores}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Efficiency:</span>
                            <span className={`font-medium ${
                              agent.efficiency > 90 ? 'text-green-600' : 
                              agent.efficiency > 80 ? 'text-yellow-600' : 'text-red-600'
                            }`}>
                              {agent.efficiency}%
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span>Version:</span>
                            <span className="font-medium">{agent.version}</span>
                          </div>
                        </div>
                        
                        <div className="flex justify-between">
                          <span>Uptime:</span>
                          <span>{agent.uptime}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Region:</span>
                          <span>{agent.region}</span>
                        </div>
                        
                        {/* Enhanced efficiency bar */}
                        <div className="mt-2">
                          <div className={`rounded-full h-1 ${theme === 'dark' ? 'bg-gray-600' : 'bg-gray-200'}`}>
                            <div 
                              className={`rounded-full h-1 transition-all duration-500 ${
                                agent.efficiency > 90 ? 'bg-green-500' : 
                                agent.efficiency > 80 ? 'bg-yellow-500' : 'bg-red-500'
                              }`}
                              style={{ width: `${agent.efficiency}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Enhanced Memory Type Filter */}
              <div>
                <h3 className={`text-sm font-medium mb-3 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  Memory Types
                </h3>
                <div className="space-y-2">
                  <button
                    onClick={() => setSelectedMemoryType('all')}
                    className={`w-full text-left p-3 rounded-lg text-sm transition-all ${
                      selectedMemoryType === 'all' ? 'bg-purple-100 text-purple-700 shadow-sm' : 
                      theme === 'dark' ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span>All Memory Types</span>
                      <span className="text-xs">{filteredMemoryData.reduce((sum, cat) => sum + cat.size, 0)}MB</span>
                    </div>
                  </button>
                  {memoryData.map((category) => (
                    <button
                      key={category.type}
                      onClick={() => setSelectedMemoryType(category.type)}
                      className={`w-full text-left p-3 rounded-lg text-sm transition-all ${
                        selectedMemoryType === category.type ? 'bg-purple-100 text-purple-700 shadow-sm' : 
                        theme === 'dark' ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <div 
                          className="w-3 h-3 rounded-full" 
                          style={{backgroundColor: category.color}}
                        />
                        <div className="flex-1">
                          <div className="flex justify-between items-center">
                            <span>{category.label}</span>
                            <span className="text-xs">{category.size}MB</span>
                          </div>
                          <div className="text-xs opacity-75 flex justify-between">
                            <span>{category.accessFreq} access</span>
                            <span>{category.avgResponseTime}</span>
                          </div>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Enhanced Memory Stats */}
              <div className={`rounded-lg p-4 ${
                theme === 'dark' ? 'bg-gray-700' : 'bg-gradient-to-br from-gray-50 to-blue-50'
              }`}>
                <h4 className={`text-sm font-medium mb-3 flex items-center ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  <BarChart3 className="w-4 h-4 mr-2" />
                  Performance Metrics
                </h4>
                <div className="space-y-3 text-xs">
                  <div className="flex justify-between">
                    <span className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>Active Memories:</span>
                    <span className={`font-medium ${theme === 'dark' ? 'text-white' : ''}`}>
                      {filteredMemoryData.reduce((sum, cat) => sum + cat.items, 0).toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>Consolidations:</span>
                    <span className={`font-medium ${theme === 'dark' ? 'text-white' : ''}`}>
                      {currentAgent?.consolidations} today
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>Access Rate:</span>
                    <span className={`font-medium ${theme === 'dark' ? 'text-white' : ''}`}>
                      {(currentAgent?.accessRate / 1000).toFixed(1)}k/hour
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>Efficiency:</span>
                    <span className={`font-medium ${
                      currentAgent?.efficiency > 90 ? 'text-green-600' : 
                      currentAgent?.efficiency > 80 ? 'text-yellow-600' : 'text-red-600'
                    }`}>
                      {currentAgent?.efficiency}%
                    </span>
                  </div>
                  
                  {/* Performance trend */}
                  <div className={`pt-2 border-t ${theme === 'dark' ? 'border-gray-600' : 'border-gray-200'}`}>
                    <div className="flex items-center text-green-600">
                      <TrendingUp className="w-3 h-3 mr-1" />
                      <span>+2.3% vs yesterday</span>
                    </div>
                  </div>
                  
                  {/* Quick actions */}
                  <div className="pt-2 space-y-2">
                    <button className="w-full bg-purple-600 text-white py-1 px-2 rounded text-xs hover:bg-purple-700 transition-colors">
                      Optimize All
                    </button>
                    <button className={`w-full py-1 px-2 rounded text-xs transition-colors ${
                      theme === 'dark' ? 'border-gray-500 text-gray-300 hover:bg-gray-600' : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                    } border`}>
                      Export Report
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </aside>

        {/* Ultra-Enhanced Main Visualization Area */}
        <main className="flex-1 flex flex-col">
          {/* Enhanced Visualization Controls */}
          <div className={`border-b p-4 ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <h2 className={`text-lg font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  {currentAgent?.name} Memory Map
                </h2>
                <div className={`flex items-center space-x-4 text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                  <div className="flex items-center space-x-2">
                    <HardDrive className="w-4 h-4" />
                    <span>{currentAgent?.totalMemory}GB total</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Activity className="w-4 h-4" />
                    <span>{currentAgent?.efficiency}% efficient</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Cpu className="w-4 h-4" />
                    <span>{currentAgent?.cores} cores</span>
                  </div>
                  {isRealTimeEnabled && (
                    <div className="flex items-center space-x-2 text-green-600">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                      <span>Live</span>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                {/* View mode selector */}
                <div className={`flex rounded-lg p-1 ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'}`}>
                  <button
                    onClick={() => setViewMode('sunburst')}
                    className={`p-2 rounded-md transition-all ${
                      viewMode === 'sunburst' ? 'bg-purple-600 text-white shadow-sm' : 
                      theme === 'dark' ? 'text-gray-400 hover:text-gray-300' : 'text-gray-600 hover:text-gray-800'
                    }`}
                    title="Sunburst View (Ctrl+1)"
                  >
                    <PieChart className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setViewMode('treemap')}
                    className={`p-2 rounded-md transition-all ${
                      viewMode === 'treemap' ? 'bg-purple-600 text-white shadow-sm' : 
                      theme === 'dark' ? 'text-gray-400 hover:text-gray-300' : 'text-gray-600 hover:text-gray-800'
                    }`}
                    title="Treemap View (Ctrl+2)"
                  >
                    <Grid className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setViewMode('network')}
                    className={`p-2 rounded-md transition-all ${
                      viewMode === 'network' ? 'bg-purple-600 text-white shadow-sm' : 
                      theme === 'dark' ? 'text-gray-400 hover:text-gray-300' : 'text-gray-600 hover:text-gray-800'
                    }`}
                    title="Network View (Ctrl+3)"
                  >
                    <Network className="w-5 h-5" />
                  </button>
                </div>
                
                {/* Selection info */}
                {selectedMemoryItems.size > 0 && (
                  <div className={`px-3 py-2 rounded-lg text-sm ${
                    theme === 'dark' ? 'bg-blue-900 text-blue-200' : 'bg-blue-100 text-blue-800'
                  }`}>
                    {selectedMemoryItems.size} selected
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Enhanced Visualization Display */}
          <div className="flex-1 p-6">
            <div 
              ref={visualizationRef}
              className={`h-full rounded-xl border shadow-sm overflow-hidden ${
                theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
              }`}
            >
              {viewMode === 'sunburst' && <EnhancedSunburstView />}
              {viewMode === 'treemap' && <EnhancedTreemapView />}
              {viewMode === 'network' && <EnhancedNetworkView />}
            </div>
          </div>
        </main>

        {/* Ultra-Enhanced Details Panel */}
        <aside className={`${detailsPanelCollapsed ? 'w-16' : 'w-96'} transition-all duration-300 ${
          theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
        } border-l p-6 overflow-y-auto`}>
          
          {/* Panel toggle */}
          <button
            onClick={() => setDetailsPanelCollapsed(!detailsPanelCollapsed)}
            className={`mb-4 p-2 rounded-lg ${
              theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
            }`}
          >
            {detailsPanelCollapsed ? <ChevronRight className="w-5 h-5" /> : <X className="w-5 h-5" />}
          </button>
          
          {!detailsPanelCollapsed && (
            <div className="space-y-6">
              <div>
                <h3 className={`text-lg font-semibold mb-4 flex items-center ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  <Eye className="w-5 h-5 mr-2" />
                  Memory Details
                </h3>
                
                {memoryDetails ? (
                  <div className="space-y-4">
                    <div className="p-4 rounded-xl" style={{backgroundColor: `${memoryDetails.color}10`}}>
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <div 
                            className="w-5 h-5 rounded-full" 
                            style={{backgroundColor: memoryDetails.color}}
                          />
                          <h4 className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                            {memoryDetails.label}
                          </h4>
                        </div>
                        
                        <div className="flex space-x-1">
                          <button
                            onClick={() => {
                              const newPinned = new Set(pinnedItems);
                              if (newPinned.has(memoryDetails.id)) {
                                newPinned.delete(memoryDetails.id);
                              } else {
                                newPinned.add(memoryDetails.id);
                              }
                              setPinnedItems(newPinned);
                            }}
                            className={`p-1 rounded ${
                              pinnedItems.has(memoryDetails.id) ? 'text-yellow-500' : 
                              theme === 'dark' ? 'text-gray-400 hover:text-gray-300' : 'text-gray-400 hover:text-gray-600'
                            }`}
                          >
                            <Star className="w-4 h-4" />
                          </button>
                          <button className={`p-1 rounded ${
                            theme === 'dark' ? 'text-gray-400 hover:text-gray-300' : 'text-gray-400 hover:text-gray-600'
                          }`}>
                            <MoreVertical className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-2xl font-bold" style={{color: memoryDetails.color}}>
                            {memoryDetails.size}MB
                          </p>
                          <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                            Storage Used
                          </p>
                        </div>
                        <div>
                          <p className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                            {memoryDetails.items?.toLocaleString()}
                          </p>
                          <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                            Total Items
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    {/* Enhanced metrics */}
                    <div className="space-y-3">
                      {[
                        { label: 'Access Frequency', value: memoryDetails.accessFreq },
                        { label: 'Retention Policy', value: memoryDetails.retention },
                        { label: 'Priority Level', value: memoryDetails.priority },
                        { label: 'Response Time', value: memoryDetails.avgResponseTime },
                        { label: 'Last Optimized', value: memoryDetails.lastOptimized },
                        { label: 'Content Types', value: memoryDetails.contentTypes?.join(', ') },
                        { label: 'Compression', value: `${memoryDetails.compression?.toFixed(1)}%` },
                        { label: 'Fragmentation', value: `${memoryDetails.fragmentation?.toFixed(1)}%` },
                        { label: 'Temperature', value: `${memoryDetails.temperature?.toFixed(0)}°C` },
                        { label: 'Health Status', value: memoryDetails.health }
                      ].map(({ label, value }) => (
                        <div key={label} className={`flex justify-between py-2 border-b ${
                          theme === 'dark' ? 'border-gray-700' : 'border-gray-100'
                        }`}>
                          <span className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                            {label}:
                          </span>
                          <span className={`text-sm font-medium ${
                            label === 'Health Status' && value === 'warning' ? 'text-red-600' :
                            label === 'Priority Level' && value === 'high' ? 'text-red-600' :
                            label === 'Priority Level' && value === 'medium' ? 'text-yellow-600' :
                            label === 'Priority Level' && value === 'low' ? 'text-green-600' :
                            theme === 'dark' ? 'text-white' : 'text-gray-900'
                          }`}>
                            {value}
                          </span>
                        </div>
                      ))}
                    </div>
                    
                    <div className={`rounded-lg p-3 ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'}`}>
                      <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                        {memoryDetails.description}
                      </p>
                    </div>
                    
                    {/* Enhanced action buttons */}
                    <div className="space-y-2">
                      <button className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 text-sm transition-colors flex items-center justify-center space-x-2">
                        <Zap className="w-4 h-4" />
                        <span>Optimize Memory</span>
                      </button>
                      <div className="grid grid-cols-2 gap-2">
                        <button className={`border py-2 px-4 rounded-lg text-sm transition-colors flex items-center justify-center space-x-1 ${
                          theme === 'dark' ? 'border-gray-600 text-gray-300 hover:bg-gray-700' : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                        }`}>
                          <Download className="w-3 h-3" />
                          <span>Export</span>
                        </button>
                        <button className={`border py-2 px-4 rounded-lg text-sm transition-colors flex items-center justify-center space-x-1 ${
                          theme === 'dark' ? 'border-gray-600 text-gray-300 hover:bg-gray-700' : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                        }`}>
                          <Share className="w-3 h-3" />
                          <span>Share</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className={`text-center py-12 ${theme === 'dark' ? 'text-gray-500' : 'text-gray-500'}`}>
                    <Brain className="w-16 h-16 mx-auto mb-4 opacity-50" />
                    <p className="text-sm">Click on a memory segment to view detailed analytics</p>
                    <p className="text-xs mt-2 opacity-75">Use Ctrl+Click for multi-select</p>
                  </div>
                )}
              </div>

              {/* Enhanced Recent Activity */}
              <div>
                <h3 className={`text-sm font-medium mb-3 flex items-center ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  <Clock className="w-4 h-4 mr-2" />
                  Real-time Activity
                </h3>
                <div className="space-y-3">
                  {[
                    { action: 'Memory Consolidation', type: 'Episodic', time: '2 min ago', icon: Zap, severity: 'info' },
                    { action: 'Cache Miss', type: 'Working', time: '5 min ago', icon: AlertTriangle, severity: 'warning' },
                    { action: 'Pattern Recognition', type: 'Semantic', time: '8 min ago', icon: Eye, severity: 'success' },
                    { action: 'Memory Allocation', type: 'Contextual', time: '12 min ago', icon: Database, severity: 'info' },
                    { action: 'Garbage Collection', type: 'All', time: '15 min ago', icon: RefreshCw, severity: 'info' }
                  ].map((activity, index) => (
                    <div key={index} className={`flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                      theme === 'dark' ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-50 hover:bg-gray-100'
                    }`}>
                      <div className={`p-1 rounded-full ${
                        activity.severity === 'warning' ? 'bg-yellow-100 text-yellow-600' :
                        activity.severity === 'success' ? 'bg-green-100 text-green-600' :
                        'bg-blue-100 text-blue-600'
                      }`}>
                        <activity.icon className="w-3 h-3" />
                      </div>
                      <div className="flex-1">
                        <p className={`text-sm font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                          {activity.action}
                        </p>
                        <p className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                          {activity.type} memory
                        </p>
                      </div>
                      <span className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                        {activity.time}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Performance Alerts */}
              {currentAgent?.alerts > 0 && (
                <div className={`border rounded-lg p-4 ${
                  theme === 'dark' ? 'bg-red-900 border-red-800' : 'bg-red-50 border-red-200'
                }`}>
                  <h4 className={`text-sm font-medium mb-2 flex items-center ${
                    theme === 'dark' ? 'text-red-200' : 'text-red-800'
                  }`}>
                    <AlertTriangle className="w-4 h-4 mr-2" />
                    Performance Alerts ({currentAgent.alerts})
                  </h4>
                  <div className="space-y-2">
                    <div className={`text-sm ${theme === 'dark' ? 'text-red-300' : 'text-red-700'}`}>
                      High fragmentation detected in working memory
                    </div>
                    <div className={`text-sm ${theme === 'dark' ? 'text-red-300' : 'text-red-700'}`}>
                      Cache miss rate above threshold (12.3%)
                    </div>
                    <button className={`text-xs underline ${
                      theme === 'dark' ? 'text-red-200 hover:text-red-100' : 'text-red-600 hover:text-red-800'
                    }`}>
                      View recommendations →
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </aside>
      </div>

      {/* Context Menu */}
      <ContextMenu />

      {/* Help Modal */}
      {showHelp && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className={`max-w-2xl w-full mx-4 rounded-lg p-6 ${
            theme === 'dark' ? 'bg-gray-800' : 'bg-white'
          }`}>
            <div className="flex items-center justify-between mb-4">
              <h3 className={`text-lg font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                Keyboard Shortcuts
              </h3>
              <button
                onClick={() => setShowHelp(false)}
                className={`p-2 rounded-lg ${
                  theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
                }`}
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              {[
                { key: 'Ctrl+F', action: 'Focus search' },
                { key: 'Ctrl+R', action: 'Toggle real-time' },
                { key: 'Ctrl+1', action: 'Sunburst view' },
                { key: 'Ctrl+2', action: 'Treemap view' },
                { key: 'Ctrl+3', action: 'Network view' },
                { key: 'Ctrl+Click', action: 'Multi-select' },
                { key: 'Right Click', action: 'Context menu' },
                { key: 'Escape', action: 'Close panels' }
              ].map(({ key, action }) => (
                <div key={key} className="flex justify-between">
                  <span className={`font-mono px-2 py-1 rounded text-xs ${
                    theme === 'dark' ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'
                  }`}>
                    {key}
                  </span>
                  <span className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
                    {action}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdvancedAgentMemoryViewer;