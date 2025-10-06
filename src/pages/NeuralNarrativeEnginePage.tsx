import React, { useState, useEffect, useRef, useCallback } from 'react';
import { 
  Bot, 
  Edit3, 
  BookOpen, 
  Target, 
  TrendingUp, 
  Brain, 
  Cpu,
  CheckCircle, 
  AlertTriangle, 
  Wand2, 
  MessageSquare, 
  Clock, 
  Eye, 
  RefreshCw,
  Zap,
  Shield,
  Activity,
  Database,
  ChevronDown,
  ChevronRight,
  MoreVertical,
  Play,
  Pause,
  Settings,
  Plus,
  Tag,
  Filter,
  Search,
  Link,
  BarChart3,
  Calendar,
  Globe,
  Layers,
  FileText,
  Bell,
  Star,
  Pin,
  Trash2,
  Edit,
  Copy,
  Download,
  Upload,
  GitBranch,
  Workflow,
  Radar,
  Crosshair,
  Microscope,
  Compass,
  Map,
  Navigation,
  Users,
  Heart,
  Flame,
  MapPin,
  Timer,
  Volume2,
  Palette,
  Theater,
  Sparkles,
  Scroll,
  Crown,
  Sword,
  Home,
  Lightbulb,
  AlertCircle,
  ArrowRight,
  MessageCircle,
  Gauge,
  Network,
  Waves,
  Minimize2,
  Maximize2,
  Send,
  ThumbsUp,
  ThumbsDown,
  RotateCcw,
  Shuffle,
  Mic,
  Save,
  History,
  Share2,
  Monitor,
  Headphones,
  Fingerprint,
  TreePine,
  Sunrise,
  Moon,
  Coffee,
  Bookmark,
  Archive,
  FileSearch,
  Sliders,
  PieChart,
  LineChart,
  BarChart,
  TrendingDown,

  Lock,
  Unlock,
  Key,
  Layers3,
  GitCommit,
  GitMerge,
  GitPullRequest,
  Code,
  Terminal,
  Keyboard,
  MousePointer,
  Gamepad2,
  Wifi,
  WifiOff,
  Signal,
  Bluetooth,
  Cast,
  Airplay,
  Radio,
  Tv,
  Smartphone,
  Tablet,
  Laptop,
  HardDrive,
  ScanLine,
  Atom
} from 'lucide-react';

const AdvancedNeuralNarrativeEngine = () => {
  const [selectedTracker, setSelectedTracker] = useState(null);
  const [activeTab, setActiveTab] = useState('agents');
  const [showAgentChat, setShowAgentChat] = useState(false);
  const [selectedAgent, setSelectedAgent] = useState(null);
  const [storyMode, setStoryMode] = useState('collaborative');
  const [agentDiscussion, setAgentDiscussion] = useState([]);
  const [currentSuggestion, setCurrentSuggestion] = useState(null);
  const [storyHealth, setStoryHealth] = useState(94);
  const [conflictAlert, setConflictAlert] = useState(null);
  const [isTyping, setIsTyping] = useState(false);
  const [typingAgent, setTypingAgent] = useState(null);
  const [showAnalytics, setShowAnalytics] = useState(false);
  const [showVersions, setShowVersions] = useState(false);
  const [neuralSync, setNeuralSync] = useState(98);
  const [storyVelocity, setStoryVelocity] = useState(85);
  const [readerEngagement, setReaderEngagement] = useState(92);
  const [darkMode, setDarkMode] = useState(false);
  const [voiceMode, setVoiceMode] = useState(false);
  const [agentPersonalities, setAgentPersonalities] = useState({});
  const [storyMap, setStoryMap] = useState([]);
  const [characterRelations, setCharacterRelations] = useState([]);
  const [plotThreads, setPlotThreads] = useState([]);
  const [sentimentAnalysis, setSentimentAnalysis] = useState({});
  const [collaborationHistory, setCollaborationHistory] = useState([]);
  const [aiTypingIndicator, setAiTypingIndicator] = useState('');
  const [expandedSections, setExpandedSections] = useState(new Set(['agents']));
  const [autoSave, setAutoSave] = useState(true);
  const [lastSaved, setLastSaved] = useState(null);

  const chatInputRef = useRef(null);
  const editorRef = useRef(null);

  // Enhanced real-time simulations
  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate neural network fluctuations
      setNeuralSync(prev => Math.max(85, Math.min(100, prev + (Math.random() - 0.5) * 5)));
      setStoryVelocity(prev => Math.max(70, Math.min(100, prev + (Math.random() - 0.5) * 3)));
      setReaderEngagement(prev => Math.max(80, Math.min(100, prev + (Math.random() - 0.5) * 4)));
      
      // Simulate story health changes
      setStoryHealth(prev => Math.max(85, Math.min(100, prev + (Math.random() - 0.5) * 2)));

      // Simulate agent discussions with typing indicators
      if (Math.random() > 0.8) {
        const agents = ['Aria', 'Viktor', 'Sage', 'Atlas', 'Echo', 'Melody'];
        const randomAgent = agents[Math.floor(Math.random() * agents.length)];
        
        // Show typing indicator
        setTypingAgent(randomAgent);
        setIsTyping(true);
        
        setTimeout(() => {
          const discussions = [
            {
              agent: 'Aria',
              message: "Elena's character arc is reaching a critical turning point. I'm detecting increased emotional complexity.",
              type: 'analysis',
              timestamp: Date.now(),
              sentiment: 'positive'
            },
            {
              agent: 'Viktor',
              message: "Plot threads are converging beautifully. The mystery elements are aligned for maximum impact.",
              type: 'optimization',
              timestamp: Date.now(),
              sentiment: 'positive'
            },
            {
              agent: 'Sage',
              message: "The justice theme could be strengthened here. Consider adding symbolic elements or moral dilemmas.",
              type: 'enhancement',
              timestamp: Date.now(),
              sentiment: 'constructive'
            },
            {
              agent: 'Atlas',
              message: "Victorian London atmosphere is consistent. Weather patterns match the emotional tone perfectly.",
              type: 'validation',
              timestamp: Date.now(),
              sentiment: 'positive'
            },
            {
              agent: 'Echo',
              message: "Emotional tension is building well, but we might want to add a moment of vulnerability.",
              type: 'suggestion',
              timestamp: Date.now(),
              sentiment: 'thoughtful'
            },
            {
              agent: 'Melody',
              message: "Dialogue rhythm is excellent. Each character's voice remains distinct and authentic.",
              type: 'approval',
              timestamp: Date.now(),
              sentiment: 'positive'
            }
          ];
          
          const newDiscussion = discussions.find(d => d.agent === randomAgent) || discussions[0];
          setAgentDiscussion(prev => [newDiscussion, ...prev.slice(0, 9)]);
          setIsTyping(false);
          setTypingAgent(null);
        }, 2000 + Math.random() * 3000);
      }
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  // Auto-save functionality
  useEffect(() => {
    if (autoSave) {
      const saveInterval = setInterval(() => {
        setLastSaved(new Date());
      }, 30000);
      return () => clearInterval(saveInterval);
    }
  }, [autoSave]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.ctrlKey || e.metaKey) {
        switch (e.key) {
          case 's':
            e.preventDefault();
            setLastSaved(new Date());
            break;
          case 'g':
            e.preventDefault();
            generateStoryContent();
            break;
          case '/':
            e.preventDefault();
            chatInputRef.current?.focus();
            break;
          case 'j':
            e.preventDefault();
            setShowAgentChat(!showAgentChat);
            break;
        }
      }
      
      if (e.key === 'Escape') {
        setCurrentSuggestion(null);
        setSelectedAgent(null);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [showAgentChat]);

  const narrativeAgents = [
    { 
      id: 'character_guardian', 
      name: 'Aria', 
      role: 'Character Guardian',
      icon: Users, 
      color: 'pink',
      status: 'analyzing',
      confidence: 94,
      personality: 'Empathetic and detail-oriented, focuses on authentic character development',
      currentFocus: 'Elena\'s emotional arc in Chapter 5',
      suggestions: 3,
      concerns: 1,
      specialty: 'Character psychology & development',
      activeTracking: ['Elena Martinez', 'Inspector Blackwood', 'Character relationships'],
      mood: 'thoughtful',
      workload: 'optimal',
      accuracy: 96,
      collaborationStyle: 'supportive',
      lastActive: '2m ago'
    },
    { 
      id: 'plot_weaver', 
      name: 'Viktor', 
      role: 'Plot Architect',
      icon: GitBranch, 
      color: 'blue',
      status: 'optimizing',
      confidence: 98,
      personality: 'Logical and strategic, ensures tight narrative structure',
      currentFocus: 'Revelation sequence optimization',
      suggestions: 2,
      concerns: 0,
      specialty: 'Narrative structure & pacing',
      activeTracking: ['Murder mystery thread', 'Clue placement', 'Chapter transitions'],
      mood: 'focused',
      workload: 'high',
      accuracy: 99,
      collaborationStyle: 'analytical',
      lastActive: 'active now'
    },
    { 
      id: 'theme_keeper', 
      name: 'Sage', 
      role: 'Theme Weaver',
      icon: Heart, 
      color: 'purple',
      status: 'reinforcing',
      confidence: 91,
      personality: 'Philosophical and insightful, deepens story meaning',
      currentFocus: 'Justice vs revenge symbolism',
      suggestions: 4,
      concerns: 2,
      specialty: 'Thematic depth & symbolism',
      activeTracking: ['Justice theme', 'Moral complexity', 'Character motivations'],
      mood: 'contemplative',
      workload: 'moderate',
      accuracy: 93,
      collaborationStyle: 'reflective',
      lastActive: '1m ago'
    },
    { 
      id: 'world_architect', 
      name: 'Atlas', 
      role: 'World Guardian',
      icon: Globe, 
      color: 'green',
      status: 'monitoring',
      confidence: 96,
      personality: 'Meticulous and immersive, creates believable worlds',
      currentFocus: 'Victorian London authenticity',
      suggestions: 1,
      concerns: 0,
      specialty: 'Historical accuracy & atmosphere',
      activeTracking: ['Time period consistency', 'Setting details', 'Cultural accuracy'],
      mood: 'steady',
      workload: 'low',
      accuracy: 98,
      collaborationStyle: 'methodical',
      lastActive: '3m ago'
    },
    { 
      id: 'emotion_navigator', 
      name: 'Echo', 
      role: 'Emotion Conductor',
      icon: Flame, 
      color: 'red',
      status: 'orchestrating',
      confidence: 89,
      personality: 'Intuitive and passionate, guides emotional journey',
      currentFocus: 'Tension escalation curve',
      suggestions: 5,
      concerns: 1,
      specialty: 'Emotional pacing & reader engagement',
      activeTracking: ['Tension levels', 'Emotional beats', 'Reader investment'],
      mood: 'energetic',
      workload: 'high',
      accuracy: 91,
      collaborationStyle: 'passionate',
      lastActive: 'active now'
    },
    { 
      id: 'style_harmonizer', 
      name: 'Melody', 
      role: 'Voice Conductor',
      icon: Volume2, 
      color: 'cyan',
      status: 'refining',
      confidence: 92,
      personality: 'Artistic and precise, maintains narrative voice',
      currentFocus: 'Dialogue authenticity',
      suggestions: 2,
      concerns: 0,
      specialty: 'Writing style & voice consistency',
      activeTracking: ['Character voices', 'Narrative tone', 'Style evolution'],
      mood: 'creative',
      workload: 'moderate',
      accuracy: 95,
      collaborationStyle: 'harmonious',
      lastActive: '30s ago'
    }
  ];

  const storyAnalytics = {
    wordCount: 3247,
    readingTime: '12 min',
    complexity: 'Advanced',
    pacing: 'Optimal',
    emotionalArc: 'Strong',
    characterDevelopment: 'Excellent',
    thematicDepth: 'Rich',
    plotCoherence: 'Tight',
    dialogueQuality: 'Natural',
    settingImmersion: 'Vivid'
  };

  const versionHistory = [
    { 
      id: 'v1.0', 
      timestamp: '2 hours ago', 
      author: 'AI Collaboration', 
      changes: 'Initial draft with character introduction',
      wordCount: 2850,
      agentsInvolved: ['Aria', 'Atlas']
    },
    { 
      id: 'v1.1', 
      timestamp: '1 hour ago', 
      author: 'Viktor + Echo', 
      changes: 'Enhanced plot tension and emotional beats',
      wordCount: 3100,
      agentsInvolved: ['Viktor', 'Echo']
    },
    { 
      id: 'v1.2', 
      timestamp: '30 min ago', 
      author: 'Sage + Melody', 
      changes: 'Deepened themes and refined dialogue',
      wordCount: 3247,
      agentsInvolved: ['Sage', 'Melody']
    }
  ];

  const predictiveInsights = [
    {
      type: 'plot_prediction',
      title: 'Upcoming Plot Tension',
      prediction: 'Chapter 6 may benefit from a slower pace to allow character reflection after this revelation.',
      confidence: 87,
      impact: 'high',
      agent: 'Viktor',
      timeframe: 'Next 2-3 scenes',
      category: 'pacing'
    },
    {
      type: 'character_growth',
      title: 'Character Arc Milestone',
      prediction: 'Elena will achieve her primary character growth objective within 2 scenes if current trajectory continues.',
      confidence: 94,
      impact: 'medium',
      agent: 'Aria',
      timeframe: 'This chapter',
      category: 'character'
    },
    {
      type: 'reader_engagement',
      title: 'Emotional Investment Peak',
      prediction: 'Reader emotional investment will peak during the mentor betrayal reveal in Chapter 7.',
      confidence: 91,
      impact: 'high',
      agent: 'Echo',
      timeframe: 'Next chapter',
      category: 'emotion'
    },
    {
      type: 'theme_development',
      title: 'Thematic Resolution',
      prediction: 'Justice theme will reach satisfying conclusion if moral complexity is maintained.',
      confidence: 88,
      impact: 'medium',
      agent: 'Sage',
      timeframe: 'Story climax',
      category: 'theme'
    }
  ];

  const agentConflicts = [
    {
      id: 'pacing_conflict',
      type: 'disagreement',
      agents: ['Viktor', 'Echo'],
      issue: 'Pacing vs Emotional Development',
      description: 'Viktor suggests faster pacing for plot tension, while Echo wants slower development for emotional depth.',
      severity: 'medium',
      impact: 'story flow',
      suggestions: [
        'Compromise: Quick plot advancement with emotional depth in character moments',
        'Split focus: Fast external action, deep internal reflection',
        'Parallel development: Plot and emotion advance together'
      ],
      resolution: 'pending',
      votes: { option1: 2, option2: 1, option3: 3 }
    }
  ];

  const generateStoryContent = useCallback(() => {
    setCurrentSuggestion({
      type: 'scene_generation',
      content: 'Elena\'s hands trembled as she realized the cipher\'s true meaning. The pattern wasn\'t random—it was a countdown.',
      collaborators: ['Aria', 'Viktor', 'Echo'],
      variations: 3,
      confidence: 92,
      reasoning: 'Combines character emotion (Aria), plot advancement (Viktor), and tension building (Echo)',
      alternatives: [
        'Elena stared at the cipher, her detective instincts finally piecing together the horrifying truth.',
        'The cipher\'s meaning hit Elena like a physical blow—this wasn\'t just a puzzle, it was a prediction.',
        'Elena\'s breath caught as the cipher\'s pattern revealed itself: not a code to crack, but a timeline to prevent.'
      ]
    });
  }, []);

  const toggleSection = (section) => {
    setExpandedSections(prev => {
      const newSet = new Set(prev);
      if (newSet.has(section)) {
        newSet.delete(section);
      } else {
        newSet.add(section);
      }
      return newSet;
    });
  };

  const handleAgentInteraction = (agent, action) => {
    setCollaborationHistory(prev => [
      {
        timestamp: new Date(),
        agent: agent.name,
        action,
        result: `${action} completed successfully`
      },
      ...prev.slice(0, 19)
    ]);
  };

  return (
    <div className={`h-screen flex transition-colors duration-300 ${
      darkMode 
        ? 'bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900' 
        : 'bg-gradient-to-br from-gray-50 to-blue-50'
    }`}>
      {/* Enhanced Control Center */}
      <div className={`w-96 border-r flex flex-col shadow-xl transition-colors duration-300 ${
        darkMode 
          ? 'bg-gray-800 border-gray-700' 
          : 'bg-white border-gray-200'
      }`}>
        {/* Advanced Header */}
        <div className={`p-4 border-b transition-colors duration-300 ${
          darkMode 
            ? 'border-gray-700 bg-gradient-to-r from-purple-900 via-blue-900 to-indigo-900' 
            : 'border-gray-200 bg-gradient-to-r from-purple-50 via-pink-50 to-blue-50'
        }`}>
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
                <Atom className="w-4 h-4 text-white animate-spin-slow" />
              </div>
              <div>
                <h2 className={`font-bold text-lg ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  Neural Narrative
                </h2>
                <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  AI-Powered Story Collaboration v2.0
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setVoiceMode(!voiceMode)}
                className={`p-2 rounded-lg transition-colors ${
                  voiceMode 
                    ? 'bg-purple-600 text-white' 
                    : darkMode 
                      ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' 
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
                title="Voice Mode"
              >
                {voiceMode ? <Headphones className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
              </button>
              <button
                onClick={() => setDarkMode(!darkMode)}
                className={`p-2 rounded-lg transition-colors ${
                  darkMode 
                    ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
                title="Toggle Dark Mode"
              >
                {darkMode ? <Sunrise className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </button>
            </div>
          </div>
          
          {/* Enhanced Story Mode Selector */}
          <div className={`flex space-x-1 rounded-lg p-1 mb-3 ${
            darkMode ? 'bg-gray-700' : 'bg-white'
          }`}>
            {[
              { id: 'collaborative', label: 'Collaborative', icon: Users, desc: 'Human + AI partnership' },
              { id: 'autonomous', label: 'AI-Driven', icon: Bot, desc: 'AI takes the lead' },
              { id: 'guided', label: 'Guided', icon: Compass, desc: 'AI provides suggestions' }
            ].map((mode) => {
              const IconComponent = mode.icon;
              return (
                <button
                  key={mode.id}
                  onClick={() => setStoryMode(mode.id)}
                  className={`flex-1 flex flex-col items-center justify-center px-2 py-2 text-xs font-medium rounded transition-all ${
                    storyMode === mode.id 
                      ? 'bg-purple-500 text-white shadow-md transform scale-105' 
                      : darkMode
                        ? 'text-gray-400 hover:text-gray-200 hover:bg-gray-600'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                  title={mode.desc}
                >
                  <IconComponent className="w-3 h-3 mb-1" />
                  <span>{mode.label}</span>
                </button>
              );
            })}
          </div>

          {/* Advanced Story Health Dashboard */}
          <div className={`rounded-lg p-3 border transition-colors duration-300 ${
            darkMode 
              ? 'bg-gray-800 border-gray-600' 
              : 'bg-white border-gray-200'
          }`}>
            <div className="flex items-center justify-between mb-2">
              <span className={`font-medium text-sm ${darkMode ? 'text-gray-200' : 'text-gray-900'}`}>
                Story Health
              </span>
              <div className="flex items-center space-x-2">
                <div className={`w-2 h-2 rounded-full ${
                  storyHealth > 90 ? 'bg-green-500' : 
                  storyHealth > 70 ? 'bg-yellow-500' : 'bg-red-500'
                } animate-pulse`}></div>
                <span className={`text-sm font-bold ${darkMode ? 'text-gray-200' : 'text-gray-900'}`}>
                  {storyHealth}%
                </span>
                <button 
                  onClick={() => setShowAnalytics(!showAnalytics)}
                  className={`p-1 rounded transition-colors ${
                    darkMode 
                      ? 'text-gray-400 hover:text-gray-200' 
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <BarChart3 className="w-3 h-3" />
                </button>
              </div>
            </div>
            
            <div className={`w-full rounded-full h-2 ${darkMode ? 'bg-gray-600' : 'bg-gray-200'}`}>
              <div 
                className={`h-2 rounded-full transition-all duration-500 ${
                  storyHealth > 90 ? 'bg-gradient-to-r from-green-400 to-green-600' :
                  storyHealth > 70 ? 'bg-gradient-to-r from-yellow-400 to-yellow-600' :
                  'bg-gradient-to-r from-red-400 to-red-600'
                }`}
                style={{width: `${storyHealth}%`}}
              ></div>
            </div>
            
            <div className="grid grid-cols-3 gap-1 mt-2 text-xs">
              <div className="text-center">
                <div className="text-green-500 font-medium">Plot</div>
                <div className={darkMode ? 'text-gray-400' : 'text-gray-600'}>98%</div>
              </div>
              <div className="text-center">
                <div className="text-blue-500 font-medium">Character</div>
                <div className={darkMode ? 'text-gray-400' : 'text-gray-600'}>94%</div>
              </div>
              <div className="text-center">
                <div className="text-purple-500 font-medium">Theme</div>
                <div className={darkMode ? 'text-gray-400' : 'text-gray-600'}>91%</div>
              </div>
            </div>

            {/* Neural Network Status */}
            <div className="mt-3 pt-3 border-t border-gray-300 dark:border-gray-600">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center space-x-1">
                  <Network className="w-3 h-3 text-purple-500" />
                  <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Neural Sync</span>
                </div>
                <span className={`font-medium ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                  {Math.round(neuralSync)}%
                </span>
              </div>
              <div className="flex items-center justify-between text-xs mt-1">
                <div className="flex items-center space-x-1">
                  <Gauge className="w-3 h-3 text-blue-500" />
                  <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Story Velocity</span>
                </div>
                <span className={`font-medium ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                  {Math.round(storyVelocity)}%
                </span>
              </div>
              <div className="flex items-center justify-between text-xs mt-1">
                <div className="flex items-center space-x-1">
                  <Heart className="w-3 h-3 text-red-500" />
                  <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Reader Engagement</span>
                </div>
                <span className={`font-medium ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                  {Math.round(readerEngagement)}%
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Tab Navigation */}
        <div className={`border-b transition-colors duration-300 ${
          darkMode 
            ? 'border-gray-700 bg-gray-800' 
            : 'border-gray-200 bg-gray-50'
        }`}>
          <div className="flex">
            {[
              { id: 'agents', label: 'AI Council', icon: Bot, count: 6 },
              { id: 'insights', label: 'Insights', icon: Lightbulb, count: 4 },
              { id: 'conflicts', label: 'Conflicts', icon: AlertTriangle, count: 1 },
              { id: 'analytics', label: 'Analytics', icon: BarChart3, count: 0 }
            ].map((tab) => {
              const IconComponent = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 flex items-center justify-center space-x-1 px-2 py-3 text-xs font-medium border-b-2 transition-colors ${
                    activeTab === tab.id 
                      ? darkMode
                        ? 'border-purple-400 text-purple-400 bg-gray-700'
                        : 'border-purple-500 text-purple-600 bg-white'
                      : darkMode
                        ? 'border-transparent text-gray-400 hover:text-gray-200 hover:bg-gray-700'
                        : 'border-transparent text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  <IconComponent className="w-3 h-3" />
                  <span>{tab.label}</span>
                  {tab.count > 0 && (
                    <span className={`px-1.5 py-0.5 rounded-full text-xs ${
                      activeTab === tab.id 
                        ? 'bg-purple-100 text-purple-600' 
                        : darkMode
                          ? 'bg-gray-600 text-gray-300'
                          : 'bg-gray-200 text-gray-600'
                    }`}>
                      {tab.count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Content Area with Enhanced Features */}
        <div className="flex-1 overflow-y-auto">
          {activeTab === 'agents' && (
            <div className="p-4">
              {/* Real-time Agent Activity with Typing Indicators */}
              <div className="mb-4">
                <h3 className={`font-medium text-sm mb-3 flex items-center space-x-2 ${
                  darkMode ? 'text-gray-200' : 'text-gray-900'
                }`}>
                  <Activity className="w-4 h-4" />
                  <span>Live Agent Activity</span>
                  <div className={`w-2 h-2 rounded-full ${
                    isTyping ? 'bg-green-500 animate-pulse' : 'bg-gray-400'
                  }`}></div>
                </h3>
                
                {isTyping && typingAgent && (
                  <div className={`border rounded-lg p-3 mb-3 transition-colors duration-300 ${
                    darkMode 
                      ? 'bg-gray-700 border-gray-600' 
                      : 'bg-blue-50 border-blue-200'
                  }`}>
                    <div className="flex items-center space-x-2 mb-2">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce delay-100"></div>
                        <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce delay-200"></div>
                      </div>
                      <span className={`font-medium text-sm ${
                        darkMode ? 'text-blue-400' : 'text-blue-900'
                      }`}>
                        {typingAgent} is thinking...
                      </span>
                    </div>
                  </div>
                )}
                
                {agentDiscussion.length > 0 && !isTyping && (
                  <div className={`border rounded-lg p-3 mb-3 transition-colors duration-300 ${
                    darkMode 
                      ? 'bg-gray-700 border-gray-600' 
                      : 'bg-blue-50 border-blue-200'
                  }`}>
                    <div className="flex items-center space-x-2 mb-2">
                      <MessageCircle className="w-4 h-4 text-blue-600" />
                      <span className={`font-medium text-sm ${
                        darkMode ? 'text-blue-400' : 'text-blue-900'
                      }`}>
                        Latest Discussion
                      </span>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        agentDiscussion[0]?.sentiment === 'positive' 
                          ? 'bg-green-100 text-green-700' :
                        agentDiscussion[0]?.sentiment === 'constructive'
                          ? 'bg-yellow-100 text-yellow-700' :
                          'bg-blue-100 text-blue-700'
                      }`}>
                        {agentDiscussion[0]?.sentiment}
                      </span>
                    </div>
                    <div className={`text-sm ${darkMode ? 'text-blue-300' : 'text-blue-800'}`}>
                      <strong>{agentDiscussion[0]?.agent}:</strong> {agentDiscussion[0]?.message}
                    </div>
                    <button 
                      onClick={() => setShowAgentChat(true)}
                      className={`text-xs mt-2 hover:underline ${
                        darkMode ? 'text-blue-400' : 'text-blue-600'
                      }`}
                    >
                      Join conversation →
                    </button>
                  </div>
                )}
              </div>

              {/* Enhanced Agent Cards */}
              <div className="space-y-3">
                {narrativeAgents.map((agent) => {
                  const IconComponent = agent.icon;
                  return (
                    <div 
                      key={agent.id} 
                      className={`border rounded-lg p-3 hover:shadow-lg transition-all cursor-pointer transform hover:scale-102 ${
                        darkMode 
                          ? 'bg-gray-700 border-gray-600 hover:bg-gray-600' 
                          : 'bg-white border-gray-200 hover:shadow-md'
                      }`}
                      onClick={() => setSelectedAgent(agent)}
                    >
                      <div className="flex items-start space-x-3">
                        <div className={`w-10 h-10 bg-${agent.color}-500 rounded-lg flex items-center justify-center relative`}>
                          <IconComponent className="w-5 h-5 text-white" />
                          <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 ${
                            darkMode ? 'border-gray-700' : 'border-white'
                          } ${
                            agent.status === 'analyzing' ? 'bg-yellow-500 animate-pulse' :
                            agent.status === 'optimizing' ? 'bg-blue-500 animate-pulse' :
                            agent.status === 'reinforcing' ? 'bg-purple-500 animate-pulse' :
                            agent.status === 'monitoring' ? 'bg-green-500' :
                            agent.status === 'orchestrating' ? 'bg-red-500 animate-pulse' :
                            'bg-cyan-500 animate-pulse'
                          }`}></div>
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <div>
                              <span className={`font-medium text-sm ${
                                darkMode ? 'text-gray-200' : 'text-gray-900'
                              }`}>
                                {agent.name}
                              </span>
                              <span className={`text-xs ml-2 ${
                                darkMode ? 'text-gray-400' : 'text-gray-500'
                              }`}>
                                ({agent.role})
                              </span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <div className="flex items-center space-x-1">
                                <div className={`w-2 h-2 rounded-full ${
                                  agent.workload === 'high' ? 'bg-red-500' :
                                  agent.workload === 'moderate' ? 'bg-yellow-500' :
                                  agent.workload === 'optimal' ? 'bg-green-500' :
                                  'bg-blue-500'
                                }`}></div>
                                <span className={`text-xs ${
                                  darkMode ? 'text-gray-400' : 'text-gray-500'
                                }`}>
                                  {agent.confidence}%
                                </span>
                              </div>
                            </div>
                          </div>
                          
                          <div className={`text-xs mb-2 ${
                            darkMode ? 'text-gray-400' : 'text-gray-600'
                          }`}>
                            {agent.currentFocus}
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <div className="flex space-x-3 text-xs">
                              <div className="flex items-center space-x-1">
                                <Lightbulb className="w-3 h-3 text-yellow-500" />
                                <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
                                  {agent.suggestions}
                                </span>
                              </div>
                              {agent.concerns > 0 && (
                                <div className="flex items-center space-x-1">
                                  <AlertCircle className="w-3 h-3 text-orange-500" />
                                  <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
                                    {agent.concerns}
                                  </span>
                                </div>
                              )}
                              <div className="flex items-center space-x-1">
                                <Clock className="w-3 h-3 text-blue-500" />
                                <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
                                  {agent.lastActive}
                                </span>
                              </div>
                            </div>
                            <span className={`px-2 py-1 rounded-full text-xs ${
                              agent.status === 'analyzing' ? 'bg-yellow-100 text-yellow-800' :
                              agent.status === 'optimizing' ? 'bg-blue-100 text-blue-800' :
                              agent.status === 'reinforcing' ? 'bg-purple-100 text-purple-800' :
                              agent.status === 'monitoring' ? 'bg-green-100 text-green-800' :
                              agent.status === 'orchestrating' ? 'bg-red-100 text-red-800' :
                              'bg-cyan-100 text-cyan-800'
                            }`}>
                              {agent.status}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Enhanced Collective Actions */}
              <div className={`mt-4 p-3 border rounded-lg transition-colors duration-300 ${
                darkMode 
                  ? 'bg-gradient-to-r from-purple-900 to-blue-900 border-purple-700' 
                  : 'bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200'
              }`}>
                <h4 className={`font-medium text-sm mb-3 ${
                  darkMode ? 'text-purple-300' : 'text-purple-900'
                }`}>
                  Collective Actions
                </h4>
                <div className="grid grid-cols-2 gap-2">
                  <button 
                    onClick={generateStoryContent}
                    className="bg-purple-600 text-white px-3 py-2 rounded-lg text-sm font-medium hover:bg-purple-700 flex items-center justify-center space-x-1 transition-colors"
                  >
                    <Wand2 className="w-3 h-3" />
                    <span>Generate Scene</span>
                  </button>
                  <button className="bg-blue-600 text-white px-3 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 flex items-center justify-center space-x-1 transition-colors">
                    <Radar className="w-3 h-3" />
                    <span>Analyze All</span>
                  </button>
                  <button className="bg-green-600 text-white px-3 py-2 rounded-lg text-sm font-medium hover:bg-green-700 flex items-center justify-center space-x-1 transition-colors">
                    <CheckCircle className="w-3 h-3" />
                    <span>Health Check</span>
                  </button>
                  <button className="bg-orange-600 text-white px-3 py-2 rounded-lg text-sm font-medium hover:bg-orange-700 flex items-center justify-center space-x-1 transition-colors">
                    <Network className="w-3 h-3" />
                    <span>Sync Agents</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'insights' && (
            <div className="p-4">
              <h3 className={`font-medium text-sm mb-3 flex items-center space-x-2 ${
                darkMode ? 'text-gray-200' : 'text-gray-900'
              }`}>
                <Lightbulb className="w-4 h-4" />
                <span>Predictive Insights</span>
              </h3>
              
              <div className="space-y-3">
                {predictiveInsights.map((insight, idx) => (
                  <div key={idx} className={`border rounded-lg p-3 transition-colors duration-300 ${
                    darkMode 
                      ? 'bg-gray-700 border-gray-600' 
                      : 'bg-white border-gray-200'
                  }`}>
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <div className={`w-3 h-3 rounded-full ${
                          insight.impact === 'high' ? 'bg-red-500' :
                          insight.impact === 'medium' ? 'bg-yellow-500' :
                          'bg-green-500'
                        }`}></div>
                        <span className={`font-medium text-sm ${
                          darkMode ? 'text-gray-200' : 'text-gray-900'
                        }`}>
                          {insight.title}
                        </span>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          insight.category === 'pacing' ? 'bg-blue-100 text-blue-700' :
                          insight.category === 'character' ? 'bg-pink-100 text-pink-700' :
                          insight.category === 'emotion' ? 'bg-red-100 text-red-700' :
                          'bg-purple-100 text-purple-700'
                        }`}>
                          {insight.category}
                        </span>
                      </div>
                      <div className="text-right">
                        <span className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                          {insight.confidence}% confident
                        </span>
                        <div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                          {insight.timeframe}
                        </div>
                      </div>
                    </div>
                    
                    <p className={`text-sm mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      {insight.prediction}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <span className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        by {insight.agent}
                      </span>
                      <div className="flex space-x-1">
                        <button className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs hover:bg-green-200 transition-colors">
                          Accept
                        </button>
                        <button className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs hover:bg-blue-200 transition-colors">
                          Modify
                        </button>
                        <button className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs hover:bg-gray-200 transition-colors">
                          Dismiss
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'conflicts' && (
            <div className="p-4">
              <h3 className={`font-medium text-sm mb-3 flex items-center space-x-2 ${
                darkMode ? 'text-gray-200' : 'text-gray-900'
              }`}>
                <AlertTriangle className="w-4 h-4" />
                <span>Agent Conflicts & Resolutions</span>
              </h3>
              
              {agentConflicts.map((conflict, idx) => (
                <div key={idx} className={`border rounded-lg p-3 mb-3 transition-colors duration-300 ${
                  darkMode 
                    ? 'bg-orange-900/20 border-orange-700' 
                    : 'bg-orange-50 border-orange-200'
                }`}>
                  <div className="flex items-center space-x-2 mb-2">
                    <AlertTriangle className="w-4 h-4 text-orange-500" />
                    <span className={`font-medium text-sm ${
                      darkMode ? 'text-orange-300' : 'text-orange-900'
                    }`}>
                      {conflict.issue}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      conflict.severity === 'high' ? 'bg-red-100 text-red-700' :
                      conflict.severity === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-green-100 text-green-700'
                    }`}>
                      {conflict.severity}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700'
                    }`}>
                      {conflict.impact}
                    </span>
                  </div>
                  
                  <p className={`text-sm mb-3 ${
                    darkMode ? 'text-orange-200' : 'text-orange-800'
                  }`}>
                    {conflict.description}
                  </p>
                  
                  <div className="mb-3">
                    <span className={`text-xs font-medium block mb-1 ${
                      darkMode ? 'text-orange-300' : 'text-orange-900'
                    }`}>
                      Conflicting Agents:
                    </span>
                    <div className="flex space-x-2">
                      {conflict.agents.map(agent => (
                        <span key={agent} className={`px-2 py-1 border rounded text-xs ${
                          darkMode 
                            ? 'bg-gray-700 border-orange-600 text-orange-300' 
                            : 'bg-white border-orange-300 text-orange-700'
                        }`}>
                          {agent}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <span className={`text-xs font-medium block ${
                      darkMode ? 'text-orange-300' : 'text-orange-900'
                    }`}>
                      Resolution Options:
                    </span>
                    {conflict.suggestions.map((suggestion, sidx) => (
                      <div key={sidx} className={`flex items-center justify-between border rounded p-2 ${
                        darkMode 
                          ? 'bg-gray-800 border-orange-600' 
                          : 'bg-white border-orange-200'
                      }`}>
                        <span className={`text-xs flex-1 ${
                          darkMode ? 'text-gray-300' : 'text-gray-700'
                        }`}>
                          {suggestion}
                        </span>
                        <div className="flex items-center space-x-2 ml-2">
                          <span className={`text-xs ${
                            darkMode ? 'text-gray-400' : 'text-gray-500'
                          }`}>
                            {Object.values(conflict.votes)[sidx] || 0} votes
                          </span>
                          <button className="px-2 py-1 bg-orange-600 text-white rounded text-xs hover:bg-orange-700 transition-colors">
                            Vote
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'analytics' && (
            <div className="p-4">
              <h3 className={`font-medium text-sm mb-3 flex items-center space-x-2 ${
                darkMode ? 'text-gray-200' : 'text-gray-900'
              }`}>
                <BarChart3 className="w-4 h-4" />
                <span>Story Analytics</span>
              </h3>
              
              {/* Story Metrics Grid */}
              <div className="grid grid-cols-2 gap-3 mb-4">
                {Object.entries(storyAnalytics).map(([key, value]) => (
                  <div key={key} className={`border rounded-lg p-3 transition-colors duration-300 ${
                    darkMode 
                      ? 'bg-gray-700 border-gray-600' 
                      : 'bg-white border-gray-200'
                  }`}>
                    <div className={`font-medium text-xs mb-1 ${
                      darkMode ? 'text-gray-300' : 'text-gray-600'
                    }`}>
                      {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                    </div>
                    <div className={`text-sm font-bold ${
                      darkMode ? 'text-gray-100' : 'text-gray-900'
                    }`}>
                      {value}
                    </div>
                  </div>
                ))}
              </div>

              {/* Version History */}
              <div className="mb-4">
                <button
                  onClick={() => setShowVersions(!showVersions)}
                  className={`flex items-center space-x-2 text-sm font-medium mb-2 ${
                    darkMode ? 'text-gray-200' : 'text-gray-900'
                  }`}
                >
                  <History className="w-4 h-4" />
                  <span>Version History</span>
                  {showVersions ? <ChevronDown className="w-3 h-3" /> : <ChevronRight className="w-3 h-3" />}
                </button>
                
                {showVersions && (
                  <div className="space-y-2">
                    {versionHistory.map((version) => (
                      <div key={version.id} className={`border rounded-lg p-3 transition-colors duration-300 ${
                        darkMode 
                          ? 'bg-gray-700 border-gray-600' 
                          : 'bg-white border-gray-200'
                      }`}>
                        <div className="flex items-center justify-between mb-1">
                          <span className={`font-medium text-sm ${
                            darkMode ? 'text-gray-200' : 'text-gray-900'
                          }`}>
                            {version.id}
                          </span>
                          <span className={`text-xs ${
                            darkMode ? 'text-gray-400' : 'text-gray-500'
                          }`}>
                            {version.timestamp}
                          </span>
                        </div>
                        <p className={`text-xs mb-2 ${
                          darkMode ? 'text-gray-300' : 'text-gray-600'
                        }`}>
                          {version.changes}
                        </p>
                        <div className="flex items-center justify-between">
                          <div className="flex -space-x-1">
                            {version.agentsInvolved.map((agent, idx) => (
                              <div key={idx} className="w-4 h-4 bg-blue-500 rounded-full border border-white text-xs text-white flex items-center justify-center">
                                {agent[0]}
                              </div>
                            ))}
                          </div>
                          <span className={`text-xs ${
                            darkMode ? 'text-gray-400' : 'text-gray-500'
                          }`}>
                            {version.wordCount} words
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Enhanced Story Editor */}
      <div className={`flex-1 flex flex-col transition-colors duration-300 ${
        darkMode ? 'bg-gray-800' : 'bg-white'
      }`}>
        {/* Advanced Collaborative Command Bar */}
        <div className={`border-b p-4 transition-colors duration-300 ${
          darkMode 
            ? 'border-gray-700 bg-gradient-to-r from-purple-900 via-blue-900 to-indigo-900' 
            : 'border-gray-200 bg-gradient-to-r from-purple-50 via-blue-50 to-indigo-50'
        }`}>
          <div className="flex items-center space-x-4 mb-3">
            <div className="flex items-center space-x-2">
              <Brain className="w-6 h-6 text-purple-600" />
              <span className={`font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                Neural Narrative Engine
              </span>
              <span className={`text-xs px-2 py-1 rounded-full ${
                darkMode ? 'bg-green-900 text-green-300' : 'bg-green-100 text-green-700'
              }`}>
                Online
              </span>
            </div>
            
            {/* Enhanced Active Agents Indicator */}
            <div className="flex items-center space-x-2">
              <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Active:
              </span>
              <div className="flex -space-x-1">
                {narrativeAgents.slice(0, 4).map((agent, idx) => (
                  <div 
                    key={idx}
                    className={`w-6 h-6 bg-${agent.color}-500 rounded-full border-2 ${
                      darkMode ? 'border-gray-800' : 'border-white'
                    } flex items-center justify-center cursor-pointer hover:z-10 hover:scale-110 transition-transform`}
                    title={`${agent.name} - ${agent.status}`}
                  >
                    <agent.icon className="w-3 h-3 text-white" />
                  </div>
                ))}
                <div className={`w-6 h-6 rounded-full border-2 ${
                  darkMode 
                    ? 'bg-gray-600 border-gray-800 text-gray-300' 
                    : 'bg-gray-300 border-white text-gray-600'
                } flex items-center justify-center text-xs`}>
                  +2
                </div>
              </div>
            </div>

            {/* Save Status */}
            <div className="flex items-center space-x-2 ml-auto">
              {autoSave && (
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    Auto-save {lastSaved ? `• Last saved ${lastSaved.toLocaleTimeString()}` : ''}
                  </span>
                </div>
              )}
              <button className={`p-2 rounded-lg transition-colors ${
                darkMode 
                  ? 'text-gray-400 hover:text-gray-200 hover:bg-gray-700' 
                  : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
              }`}>
                <Save className="w-4 h-4" />
              </button>
            </div>
          </div>
          
          {/* Enhanced AI Collaboration Input */}
          <div className="flex items-center space-x-3">
            <div className="flex-1 relative">
              <input 
                ref={chatInputRef}
                type="text" 
                placeholder="Collaborate with AI: 'Make Elena more conflicted', 'Add tension to this scene', 'Show don't tell'... (Ctrl+/ to focus)"
                className={`w-full border rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors ${
                  darkMode 
                    ? 'bg-gray-700 border-gray-600 text-gray-200 placeholder-gray-400' 
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                }`}
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex space-x-1">
                <button className={`p-1 transition-colors ${
                  voiceMode 
                    ? 'text-purple-600' 
                    : darkMode 
                      ? 'text-gray-400 hover:text-purple-400' 
                      : 'text-gray-400 hover:text-purple-600'
                }`}>
                  {voiceMode ? <Headphones className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                </button>
                <button className={`p-1 transition-colors ${
                  darkMode 
                    ? 'text-gray-400 hover:text-gray-200' 
                    : 'text-gray-400 hover:text-gray-600'
                }`}>
                  <Keyboard className="w-4 h-4" />
                </button>
              </div>
            </div>
            <button className="bg-purple-600 text-white px-6 py-3 rounded-lg text-sm font-medium hover:bg-purple-700 flex items-center space-x-2 transition-colors">
              <Send className="w-4 h-4" />
              <span>Collaborate</span>
            </button>
            <button 
              onClick={generateStoryContent}
              className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-lg text-sm font-medium hover:from-purple-700 hover:to-pink-700 flex items-center space-x-2 transition-colors"
            >
              <Wand2 className="w-4 h-4" />
              <span>Generate</span>
            </button>
          </div>

          {/* Keyboard Shortcuts Helper */}
          <div className={`mt-2 text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            <span>Shortcuts: Ctrl+S (Save) • Ctrl+G (Generate) • Ctrl+/ (Focus Input) • Ctrl+J (Toggle Chat) • Esc (Close)</span>
          </div>
        </div>

        {/* Enhanced Current AI Suggestion */}
        {currentSuggestion && (
          <div className={`border-b p-4 transition-colors duration-300 ${
            darkMode 
              ? 'border-gray-700 bg-gradient-to-r from-blue-900 to-green-900' 
              : 'border-gray-200 bg-gradient-to-r from-blue-50 to-green-50'
          }`}>
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <Sparkles className="w-4 h-4 text-blue-600" />
                  <span className={`font-medium ${
                    darkMode ? 'text-blue-300' : 'text-blue-900'
                  }`}>
                    AI Collaborative Suggestion
                  </span>
                  <div className="flex -space-x-1">
                    {currentSuggestion.collaborators.map((agent, idx) => (
                      <div key={idx} className="w-4 h-4 bg-blue-500 rounded-full border border-white text-xs text-white flex items-center justify-center">
                        {agent[0]}
                      </div>
                    ))}
                  </div>
                  <span className={`text-sm ${darkMode ? 'text-blue-400' : 'text-blue-700'}`}>
                    {currentSuggestion.confidence}% confident
                  </span>
                </div>
                
                <p className={`border rounded p-3 mb-3 italic transition-colors ${
                  darkMode 
                    ? 'text-gray-200 bg-gray-800 border-blue-600' 
                    : 'text-gray-800 bg-white border-blue-200'
                }`}>
                  "{currentSuggestion.content}"
                </p>
                
                {currentSuggestion.reasoning && (
                  <p className={`text-xs mb-3 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    <strong>Reasoning:</strong> {currentSuggestion.reasoning}
                  </p>
                )}
                
                <div className="flex items-center space-x-2 text-sm mb-3">
                  <button className="bg-green-600 text-white px-3 py-1 rounded flex items-center space-x-1 hover:bg-green-700 transition-colors">
                    <ThumbsUp className="w-3 h-3" />
                    <span>Accept</span>
                  </button>
                  <button className="bg-yellow-600 text-white px-3 py-1 rounded flex items-center space-x-1 hover:bg-yellow-700 transition-colors">
                    <Edit className="w-3 h-3" />
                    <span>Modify</span>
                  </button>
                  <button className="bg-blue-600 text-white px-3 py-1 rounded flex items-center space-x-1 hover:bg-blue-700 transition-colors">
                    <Shuffle className="w-3 h-3" />
                    <span>Variations ({currentSuggestion.variations})</span>
                  </button>
                  <button className={`px-3 py-1 rounded flex items-center space-x-1 transition-colors ${
                    darkMode 
                      ? 'bg-gray-600 text-gray-200 hover:bg-gray-500' 
                      : 'bg-gray-300 text-gray-700 hover:bg-gray-400'
                  }`}>
                    <ThumbsDown className="w-3 h-3" />
                    <span>Decline</span>
                  </button>
                </div>

                {/* Alternative Suggestions */}
                {currentSuggestion.alternatives && (
                  <div className="space-y-2">
                    <span className={`text-xs font-medium ${
                      darkMode ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      Alternative suggestions:
                    </span>
                    {currentSuggestion.alternatives.map((alt, idx) => (
                      <div key={idx} className={`p-2 border rounded text-sm transition-colors ${
                        darkMode 
                          ? 'bg-gray-700 border-gray-600 text-gray-300' 
                          : 'bg-gray-50 border-gray-200 text-gray-700'
                      }`}>
                        <div className="flex items-center justify-between">
                          <span className="flex-1 italic">"{alt}"</span>
                          <button className="ml-2 px-2 py-1 bg-blue-500 text-white rounded text-xs hover:bg-blue-600 transition-colors">
                            Use This
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Enhanced Story Content with Multi-Agent Analysis */}
        <div className={`flex-1 overflow-y-auto p-6 transition-colors duration-300 ${
          darkMode 
            ? 'bg-gradient-to-br from-gray-900 to-gray-800' 
            : 'bg-gradient-to-br from-white to-gray-50'
        }`}>
          <div className="max-w-4xl mx-auto space-y-8">
            
            {/* Chapter with Enhanced Multi-Agent Analysis */}
            <div className={`relative rounded-lg shadow-sm border p-6 transition-colors duration-300 ${
              darkMode 
                ? 'bg-gray-800 border-gray-700' 
                : 'bg-white border-gray-200'
            }`}>
              {/* Enhanced Agent Activity Sidebar */}
              <div className="absolute -left-4 top-0 bottom-0 w-3 flex flex-col space-y-2 pt-6">
                <div className="w-3 h-3 bg-pink-500 rounded-full animate-pulse cursor-pointer" title="Aria analyzing character development"></div>
                <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse cursor-pointer" title="Viktor optimizing plot structure"></div>
                <div className="w-3 h-3 bg-purple-500 rounded-full cursor-pointer" title="Sage tracking theme development"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full cursor-pointer" title="Atlas monitoring setting consistency"></div>
                <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse cursor-pointer" title="Echo conducting emotional beats"></div>
                <div className="w-3 h-3 bg-cyan-500 rounded-full animate-pulse cursor-pointer" title="Melody refining voice consistency"></div>
              </div>
              
              <h2 className={`text-3xl font-bold mb-6 relative transition-colors duration-300 ${
                darkMode ? 'text-gray-100' : 'text-gray-900'
              }`}>
                Chapter 5: The Neural Revelation
                <div className="absolute -top-2 -right-2 flex space-x-1">
                  <div className="w-4 h-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                    <Sparkles className="w-2 h-2 text-white" />
                  </div>
                </div>
              </h2>

              {/* Enhanced Smart Content with Multi-Layer Analysis */}
              <div className="space-y-6" ref={editorRef}>
                <div className="relative group">
                  <p className={`leading-relaxed text-lg relative transition-colors duration-300 ${
                    darkMode ? 'text-gray-200' : 'text-gray-800'
                  }`}>
                    <span className="relative inline-block">
                      <mark className="bg-gradient-to-r from-pink-200 to-purple-200 border-2 border-pink-400 rounded px-1 dark:from-pink-700 dark:to-purple-700 dark:border-pink-500">
                        Elena's transformation was complete
                      </mark>
                      
                      {/* Enhanced Tooltip with Multiple Agent Insights */}
                      <div className={`absolute -top-48 left-1/2 transform -translate-x-1/2 border rounded-xl shadow-2xl p-4 text-sm w-96 z-20 opacity-0 group-hover:opacity-100 transition-all duration-300 ${
                        darkMode 
                          ? 'bg-gray-800 border-gray-600' 
                          : 'bg-white border-gray-300'
                      }`}>
                        <div className="flex items-center justify-between mb-3">
                          <span className={`font-bold ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
                            Multi-Agent Analysis
                          </span>
                          <div className="flex -space-x-1">
                            <div className="w-5 h-5 bg-pink-500 rounded-full border border-white flex items-center justify-center">
                              <Users className="w-3 h-3 text-white" />
                            </div>
                            <div className="w-5 h-5 bg-red-500 rounded-full border border-white flex items-center justify-center">
                              <Flame className="w-3 h-3 text-white" />
                            </div>
                            <div className="w-5 h-5 bg-purple-500 rounded-full border border-white flex items-center justify-center">
                              <Heart className="w-3 h-3 text-white" />
                            </div>
                          </div>
                        </div>
                        
                        <div className="space-y-3">
                          <div className="p-2 bg-pink-50 dark:bg-pink-900/20 border border-pink-200 dark:border-pink-700 rounded-lg">
                            <div className="flex items-center space-x-1 mb-1">
                              <Users className="w-3 h-3 text-pink-600" />
                              <span className={`font-medium text-xs ${
                                darkMode ? 'text-pink-400' : 'text-pink-900'
                              }`}>
                                Aria (Character Guardian)
                              </span>
                            </div>
                            <p className={`text-xs ${
                              darkMode ? 'text-pink-300' : 'text-pink-800'
                            }`}>
                              Perfect character arc milestone. Shows growth from Chapter 1.
                            </p>
                            <div className={`text-xs mt-1 ${
                              darkMode ? 'text-pink-400' : 'text-pink-700'
                            }`}>
                              ✓ Character consistency: 96%
                            </div>
                          </div>
                          
                          <div className="p-2 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700 rounded-lg">
                            <div className="flex items-center space-x-1 mb-1">
                              <Flame className="w-3 h-3 text-red-600" />
                              <span className={`font-medium text-xs ${
                                darkMode ? 'text-red-400' : 'text-red-900'
                              }`}>
                                Echo (Emotion Conductor)
                              </span>
                            </div>
                            <p className={`text-xs ${
                              darkMode ? 'text-red-300' : 'text-red-800'
                            }`}>
                              High emotional impact. Triggers reader satisfaction.
                            </p>
                            <div className={`text-xs mt-1 ${
                              darkMode ? 'text-red-400' : 'text-red-700'
                            }`}>
                              📈 Emotional engagement: Peak
                            </div>
                          </div>
                          
                          <div className="p-2 bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-700 rounded-lg">
                            <div className="flex items-center space-x-1 mb-1">
                              <Heart className="w-3 h-3 text-purple-600" />
                              <span className={`font-medium text-xs ${
                                darkMode ? 'text-purple-400' : 'text-purple-900'
                              }`}>
                                Sage (Theme Weaver)
                              </span>
                            </div>
                            <p className={`text-xs ${
                              darkMode ? 'text-purple-300' : 'text-purple-800'
                            }`}>
                              Reinforces redemption theme effectively.
                            </p>
                            <div className={`text-xs mt-1 ${
                              darkMode ? 'text-purple-400' : 'text-purple-700'
                            }`}>
                              🎯 Theme strength: Strong
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex space-x-1 mt-3">
                          <button className="flex-1 px-2 py-1 bg-green-600 text-white rounded text-xs hover:bg-green-700 transition-colors">
                            Approve All
                          </button>
                          <button className="flex-1 px-2 py-1 bg-blue-600 text-white rounded text-xs hover:bg-blue-700 transition-colors">
                            Enhance
                          </button>
                          <button className={`flex-1 px-2 py-1 rounded text-xs transition-colors ${
                            darkMode 
                              ? 'bg-gray-600 text-gray-200 hover:bg-gray-500' 
                              : 'bg-gray-300 text-gray-700 hover:bg-gray-400'
                          }`}>
                            Revise
                          </button>
                        </div>
                      </div>
                    </span>
                    ; no longer the hesitant detective of mere weeks ago, but someone who could confront truth with unwavering resolve.
                  </p>
                </div>

                {/* Enhanced Dialogue with Voice Analysis */}
                <div className={`ml-6 p-4 border-l-4 border-blue-400 rounded-r-lg transition-colors duration-300 ${
                  darkMode 
                    ? 'bg-gradient-to-r from-blue-900/50 to-cyan-900/50' 
                    : 'bg-gradient-to-r from-blue-50 to-cyan-50'
                }`}>
                  <p className={`mb-3 relative group transition-colors duration-300 ${
                    darkMode ? 'text-gray-200' : 'text-gray-800'
                  }`}>
                    <span className="relative inline-block">
                      <mark className="bg-cyan-200 dark:bg-cyan-700 border-2 border-cyan-400 dark:border-cyan-500 rounded px-1">
                        "The cipher was never about hiding the murderer's identity,"
                      </mark>
                      
                      {/* Enhanced Voice Analysis Tooltip */}
                      <div className={`absolute -top-32 left-1/2 transform -translate-x-1/2 border rounded-xl shadow-xl p-3 text-xs w-80 z-20 opacity-0 group-hover:opacity-100 transition-opacity ${
                        darkMode 
                          ? 'bg-gray-800 border-gray-600' 
                          : 'bg-white border-gray-300'
                      }`}>
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center space-x-1">
                            <Volume2 className="w-3 h-3 text-cyan-600" />
                            <span className={`font-medium ${
                              darkMode ? 'text-cyan-400' : 'text-cyan-900'
                            }`}>
                              Melody (Voice Conductor)
                            </span>
                          </div>
                          <span className={`text-xs ${
                            darkMode ? 'text-cyan-400' : 'text-cyan-700'
                          }`}>
                            Voice Match: 94%
                          </span>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-2 mb-2">
                          <div className="p-2 bg-cyan-50 dark:bg-cyan-900/20 border border-cyan-200 dark:border-cyan-700 rounded">
                            <div className={`font-medium text-xs ${
                              darkMode ? 'text-cyan-400' : 'text-cyan-900'
                            }`}>
                              Tone
                            </div>
                            <div className={`text-xs ${
                              darkMode ? 'text-cyan-300' : 'text-cyan-800'
                            }`}>
                              Confident authority
                            </div>
                          </div>
                          <div className="p-2 bg-cyan-50 dark:bg-cyan-900/20 border border-cyan-200 dark:border-cyan-700 rounded">
                            <div className={`font-medium text-xs ${
                              darkMode ? 'text-cyan-400' : 'text-cyan-900'
                            }`}>
                              Style
                            </div>
                            <div className={`text-xs ${
                              darkMode ? 'text-cyan-300' : 'text-cyan-800'
                            }`}>
                              Analytical clarity
                            </div>
                          </div>
                        </div>
                        
                        <div className={`text-xs mb-2 ${
                          darkMode ? 'text-cyan-300' : 'text-cyan-800'
                        }`}>
                          <strong>Character voice evolution:</strong> Shows intellectual growth while maintaining core personality.
                        </div>
                      </div>
                    </span>
                    she declared, her voice carrying the weight of revelation.
                    <span className="relative inline-block group ml-2">
                      <mark className="bg-cyan-200 dark:bg-cyan-700 border-2 border-cyan-400 dark:border-cyan-500 rounded px-1">
                        "It was designed to reveal the next victim."
                      </mark>
                    </span>
                  </p>
                </div>

                {/* Enhanced Real-time Agent Collaboration Visualization */}
                <div className={`border-2 border-dashed rounded-xl p-6 transition-colors duration-300 ${
                  darkMode 
                    ? 'border-purple-600 bg-gradient-to-br from-purple-900/30 via-pink-900/30 to-blue-900/30' 
                    : 'border-purple-300 bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50'
                }`}>
                  <div className="text-center mb-4">
                    <div className="flex items-center justify-center space-x-3 mb-3">
                      <div className="relative">
                        <div className="flex items-center space-x-1">
                          <div className="w-4 h-4 bg-pink-500 rounded-full animate-pulse"></div>
                          <div className="w-4 h-4 bg-blue-500 rounded-full animate-pulse delay-150"></div>
                          <div className="w-4 h-4 bg-purple-500 rounded-full animate-pulse delay-300"></div>
                          <div className="w-4 h-4 bg-red-500 rounded-full animate-pulse delay-450"></div>
                        </div>
                        <div className="absolute -inset-2 border-2 border-dashed border-purple-400 rounded-full animate-spin-slow"></div>
                      </div>
                      <span className={`font-bold text-lg ${
                        darkMode ? 'text-purple-300' : 'text-purple-700'
                      }`}>
                        Neural Collaboration Active
                      </span>
                    </div>
                    
                    <div className={`rounded-lg p-4 border mb-4 transition-colors duration-300 ${
                      darkMode 
                        ? 'bg-gray-800 border-purple-600' 
                        : 'bg-white border-purple-200'
                    }`}>
                      <div className={`font-medium mb-2 ${
                        darkMode ? 'text-purple-300' : 'text-purple-800'
                      }`}>
                        Collaborative Scene Generation
                      </div>
                      <div className={`text-sm space-y-1 ${
                        darkMode ? 'text-gray-300' : 'text-gray-700'
                      }`}>
                        <div>🧠 <strong>Aria:</strong> Developing Elena's confidence breakthrough</div>
                        <div>🎯 <strong>Viktor:</strong> Structuring revelation for maximum impact</div>
                        <div>❤️ <strong>Echo:</strong> Building emotional crescendo</div>
                        <div>🌍 <strong>Atlas:</strong> Maintaining Victorian atmosphere</div>
                        <div>🎵 <strong>Melody:</strong> Crafting authentic dialogue rhythm</div>
                        <div>🔮 <strong>Sage:</strong> Weaving deeper thematic meaning</div>
                      </div>
                    </div>
                    
                    <div className="flex justify-center space-x-3">
                      <button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center space-x-2 hover:from-purple-700 hover:to-pink-700 transition-colors">
                        <Wand2 className="w-4 h-4" />
                        <span>Generate Next Scene</span>
                      </button>
                      <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center space-x-2 hover:bg-blue-700 transition-colors">
                        <Eye className="w-4 h-4" />
                        <span>Preview Outcomes</span>
                      </button>
                      <button className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center space-x-2 hover:bg-green-700 transition-colors">
                        <Network className="w-4 h-4" />
                        <span>Sync All Agents</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Status Bar with Advanced Neural Metrics */}
        <div className={`border-t px-6 py-3 transition-colors duration-300 ${
          darkMode 
            ? 'border-gray-700 bg-gradient-to-r from-gray-800 to-blue-900' 
            : 'border-gray-200 bg-gradient-to-r from-gray-50 to-blue-50'
        }`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6 text-sm">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-gradient-to-r from-green-400 to-blue-500 rounded-full animate-pulse"></div>
                <span className={darkMode ? 'text-gray-300' : 'text-gray-700'}>
                  Neural sync: {Math.round(neuralSync)}%
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Brain className="w-4 h-4 text-purple-600" />
                <span className={darkMode ? 'text-gray-300' : 'text-gray-700'}>
                  6 agents active
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Gauge className="w-4 h-4 text-blue-600" />
                <span className={darkMode ? 'text-gray-300' : 'text-gray-700'}>
                  Story velocity: {Math.round(storyVelocity)}%
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Waves className="w-4 h-4 text-cyan-600" />
                <span className={darkMode ? 'text-gray-300' : 'text-gray-700'}>
                  Narrative flow: {Math.round(readerEngagement)}%
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Shield className="w-4 h-4 text-green-600" />
                <span className={darkMode ? 'text-gray-300' : 'text-gray-700'}>
                  Quality: Excellent
                </span>
              </div>
            </div>
            
            <div className="flex items-center space-x-4 text-sm">
              <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
                Chapter 5 of 12 • {storyAnalytics.wordCount} words • {storyAnalytics.readingTime}
              </span>
              <div className="flex items-center space-x-2">
                <button className={`hover:underline font-medium ${
                  darkMode ? 'text-purple-400' : 'text-purple-600'
                }`}>
                  Neural Analytics
                </button>
                <button className={`hover:underline font-medium ${
                  darkMode ? 'text-blue-400' : 'text-blue-600'
                }`}>
                  Export Story
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Agent Chat Sidebar */}
      {showAgentChat && (
        <div className={`w-80 border-l flex flex-col shadow-xl transition-colors duration-300 ${
          darkMode 
            ? 'bg-gray-800 border-gray-700' 
            : 'bg-white border-gray-200'
        }`}>
          <div className={`p-4 border-b transition-colors duration-300 ${
            darkMode 
              ? 'border-gray-700 bg-gradient-to-r from-blue-900 to-purple-900' 
              : 'border-gray-200 bg-gradient-to-r from-blue-50 to-purple-50'
          }`}>
            <div className="flex items-center justify-between">
              <h3 className={`font-bold ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
                Agent Council Chat
              </h3>
              <div className="flex items-center space-x-2">
                <div className="flex items-center space-x-1">
                  <div className={`w-2 h-2 rounded-full ${
                    isTyping ? 'bg-green-500 animate-pulse' : 'bg-gray-400'
                  }`}></div>
                  <span className={`text-xs ${
                    darkMode ? 'text-gray-400' : 'text-gray-500'
                  }`}>
                    {isTyping ? 'Active' : 'Idle'}
                  </span>
                </div>
                <button 
                  onClick={() => setShowAgentChat(false)}
                  className={`transition-colors ${
                    darkMode 
                      ? 'text-gray-400 hover:text-gray-200' 
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <Minimize2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {isTyping && typingAgent && (
              <div className={`rounded-lg p-3 border transition-colors duration-300 ${
                darkMode 
                  ? 'bg-gray-700 border-gray-600' 
                  : 'bg-gray-50 border-gray-200'
              }`}>
                <div className="flex items-center space-x-2 mb-1">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce delay-100"></div>
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce delay-200"></div>
                  </div>
                  <span className={`font-medium text-sm ${
                    darkMode ? 'text-gray-200' : 'text-gray-900'
                  }`}>
                    {typingAgent}
                  </span>
                  <span className={`text-xs ${
                    darkMode ? 'text-gray-400' : 'text-gray-500'
                  }`}>
                    is thinking...
                  </span>
                </div>
              </div>
            )}
            
            {agentDiscussion.map((msg, idx) => (
              <div key={idx} className={`rounded-lg p-3 transition-colors duration-300 ${
                darkMode ? 'bg-gray-700' : 'bg-gray-50'
              }`}>
                <div className="flex items-center space-x-2 mb-1">
                  <div className={`w-4 h-4 rounded-full ${
                    msg.agent === 'Aria' ? 'bg-pink-500' :
                    msg.agent === 'Viktor' ? 'bg-blue-500' :
                    msg.agent === 'Sage' ? 'bg-purple-500' :
                    msg.agent === 'Atlas' ? 'bg-green-500' :
                    msg.agent === 'Echo' ? 'bg-red-500' :
                    'bg-cyan-500'
                  }`}></div>
                  <span className={`font-medium text-sm ${
                    darkMode ? 'text-gray-200' : 'text-gray-900'
                  }`}>
                    {msg.agent}
                  </span>
                  <span className={`text-xs ${
                    darkMode ? 'text-gray-400' : 'text-gray-500'
                  }`}>
                    {Math.floor((Date.now() - msg.timestamp) / 1000)}s ago
                  </span>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    msg.sentiment === 'positive' 
                      ? 'bg-green-100 text-green-700' :
                    msg.sentiment === 'constructive'
                      ? 'bg-yellow-100 text-yellow-700' :
                      'bg-blue-100 text-blue-700'
                  }`}>
                    {msg.sentiment}
                  </span>
                </div>
                <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  {msg.message}
                </p>
                <div className="flex items-center space-x-2 mt-2">
                  <button className={`text-xs hover:underline ${
                    darkMode ? 'text-blue-400' : 'text-blue-600'
                  }`}>
                    Reply
                  </button>
                  <button className={`text-xs hover:underline ${
                    darkMode ? 'text-green-400' : 'text-green-600'
                  }`}>
                    Agree
                  </button>
                  <button className={`text-xs hover:underline ${
                    darkMode ? 'text-gray-400' : 'text-gray-500'
                  }`}>
                    More
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          <div className={`p-4 border-t transition-colors duration-300 ${
            darkMode ? 'border-gray-700' : 'border-gray-200'
          }`}>
            <div className="flex space-x-2">
              <input 
                type="text" 
                placeholder="Join the discussion..."
                className={`flex-1 px-3 py-2 border rounded-lg text-sm transition-colors ${
                  darkMode 
                    ? 'bg-gray-700 border-gray-600 text-gray-200 placeholder-gray-400' 
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                }`}
              />
              <button className="bg-purple-600 text-white px-3 py-2 rounded-lg hover:bg-purple-700 transition-colors">
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdvancedNeuralNarrativeEngine;