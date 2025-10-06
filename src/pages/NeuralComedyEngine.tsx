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
  Atom,
  Smile,
  Laugh,
  Frown,
  Meh
} from 'lucide-react';

const NeuralComedyEngine = () => {
  const [selectedTracker, setSelectedTracker] = useState(null);
  const [activeTab, setActiveTab] = useState('agents');
  const [showAgentChat, setShowAgentChat] = useState(false);
  const [selectedAgent, setSelectedAgent] = useState(null);
  const [comedyMode, setComedyMode] = useState('collaborative');
  const [agentDiscussion, setAgentDiscussion] = useState([]);
  const [currentSuggestion, setCurrentSuggestion] = useState(null);
  const [comedyHealth, setComedyHealth] = useState(87);
  const [conflictAlert, setConflictAlert] = useState(null);
  const [isTyping, setIsTyping] = useState(false);
  const [typingAgent, setTypingAgent] = useState(null);
  const [showAnalytics, setShowAnalytics] = useState(false);
  const [showVersions, setShowVersions] = useState(false);
  const [timingSync, setTimingSync] = useState(94);
  const [comedyVelocity, setComedyVelocity] = useState(88);
  const [audienceLaughter, setAudienceLaughter] = useState(91);
  const [darkMode, setDarkMode] = useState(false);
  const [voiceMode, setVoiceMode] = useState(false);
  const [comedyGenre, setComedyGenre] = useState('observational');
  const [audienceTarget, setAudienceTarget] = useState('general');
  const [expandedSections, setExpandedSections] = useState(new Set(['agents']));
  const [autoSave, setAutoSave] = useState(true);
  const [lastSaved, setLastSaved] = useState(null);

  const chatInputRef = useRef(null);
  const editorRef = useRef(null);

  // Enhanced real-time comedy simulations
  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate comedy metrics fluctuations
      setTimingSync(prev => Math.max(85, Math.min(100, prev + (Math.random() - 0.5) * 4)));
      setComedyVelocity(prev => Math.max(70, Math.min(100, prev + (Math.random() - 0.5) * 5)));
      setAudienceLaughter(prev => Math.max(80, Math.min(100, prev + (Math.random() - 0.5) * 6)));
      
      // Simulate comedy health changes
      setComedyHealth(prev => Math.max(75, Math.min(100, prev + (Math.random() - 0.5) * 3)));

      // Simulate agent discussions with comedy focus
      if (Math.random() > 0.75) {
        const agents = ['Jester', 'Tempo', 'Crowd', 'Wit', 'Timing', 'Culture'];
        const randomAgent = agents[Math.floor(Math.random() * agents.length)];
        
        setTypingAgent(randomAgent);
        setIsTyping(true);
        
        setTimeout(() => {
          const discussions = [
            {
              agent: 'Jester',
              message: "This setup needs more specificity. Generic observations don't land as hard as personal details.",
              type: 'setup_analysis',
              timestamp: Date.now(),
              sentiment: 'constructive',
              comedyFocus: 'setup'
            },
            {
              agent: 'Tempo',
              message: "Perfect comedic timing here! The pause before the punchline creates maximum tension.",
              type: 'timing_analysis',
              timestamp: Date.now(),
              sentiment: 'positive',
              comedyFocus: 'timing'
            },
            {
              agent: 'Crowd',
              message: "This joke might not land with younger audiences. Consider updating the cultural reference.",
              type: 'audience_analysis',
              timestamp: Date.now(),
              sentiment: 'warning',
              comedyFocus: 'audience'
            },
            {
              agent: 'Wit',
              message: "Brilliant wordplay potential here! We could add a double entendre for extra layers.",
              type: 'wordplay_analysis',
              timestamp: Date.now(),
              sentiment: 'excited',
              comedyFocus: 'wordplay'
            },
            {
              agent: 'Timing',
              message: "The rhythm is off. Try shortening the setup and strengthening the punchline impact.",
              type: 'rhythm_analysis',
              timestamp: Date.now(),
              sentiment: 'critical',
              comedyFocus: 'rhythm'
            },
            {
              agent: 'Culture',
              message: "Cultural sensitivity check: This reference might not translate well globally.",
              type: 'sensitivity_analysis',
              timestamp: Date.now(),
              sentiment: 'cautious',
              comedyFocus: 'cultural'
            }
          ];
          
          const newDiscussion = discussions.find(d => d.agent === randomAgent) || discussions[0];
          setAgentDiscussion(prev => [newDiscussion, ...prev.slice(0, 9)]);
          setIsTyping(false);
          setTypingAgent(null);
        }, 1500 + Math.random() * 2500);
      }
    }, 3500);

    return () => clearInterval(interval);
  }, []);

  const comedyAgents = [
    { 
      id: 'setup_specialist', 
      name: 'Jester', 
      role: 'Setup Specialist',
      icon: Smile, 
      color: 'yellow',
      status: 'crafting',
      confidence: 92,
      personality: 'Creative and observational, builds perfect comedy foundations',
      currentFocus: 'Relationship joke setup optimization',
      suggestions: 4,
      concerns: 1,
      specialty: 'Setup construction & premise development',
      activeTracking: ['Setup strength', 'Premise clarity', 'Relatability factor'],
      mood: 'inspired',
      workload: 'optimal',
      accuracy: 94,
      collaborationStyle: 'foundational',
      lastActive: '30s ago'
    },
    { 
      id: 'timing_master', 
      name: 'Tempo', 
      role: 'Timing Master',
      icon: Timer, 
      color: 'red',
      status: 'synchronizing',
      confidence: 96,
      personality: 'Precise and rhythmic, perfects comedic beats and pacing',
      currentFocus: 'Punchline delivery optimization',
      suggestions: 3,
      concerns: 0,
      specialty: 'Comedic timing & rhythm',
      activeTracking: ['Beat timing', 'Pause placement', 'Delivery speed'],
      mood: 'focused',
      workload: 'high',
      accuracy: 98,
      collaborationStyle: 'meticulous',
      lastActive: 'active now'
    },
    { 
      id: 'audience_reader', 
      name: 'Crowd', 
      role: 'Audience Whisperer',
      icon: Users, 
      color: 'blue',
      status: 'analyzing',
      confidence: 89,
      personality: 'Intuitive and empathetic, reads the room perfectly',
      currentFocus: 'Demographic appeal assessment',
      suggestions: 5,
      concerns: 2,
      specialty: 'Audience psychology & engagement',
      activeTracking: ['Audience reaction', 'Cultural relevance', 'Age appropriateness'],
      mood: 'observant',
      workload: 'moderate',
      accuracy: 91,
      collaborationStyle: 'adaptive',
      lastActive: '1m ago'
    },
    { 
      id: 'wordplay_wizard', 
      name: 'Wit', 
      role: 'Wordplay Wizard',
      icon: Zap, 
      color: 'purple',
      status: 'weaving',
      confidence: 94,
      personality: 'Clever and linguistic, masters puns and double meanings',
      currentFocus: 'Double entendre integration',
      suggestions: 6,
      concerns: 0,
      specialty: 'Wordplay & linguistic humor',
      activeTracking: ['Pun quality', 'Word association', 'Language flow'],
      mood: 'playful',
      workload: 'high',
      accuracy: 93,
      collaborationStyle: 'clever',
      lastActive: '2m ago'
    },
    { 
      id: 'rhythm_conductor', 
      name: 'Timing', 
      role: 'Rhythm Conductor',
      icon: Volume2, 
      color: 'green',
      status: 'conducting',
      confidence: 97,
      personality: 'Musical and flowing, orchestrates comedic rhythm',
      currentFocus: 'Callback timing alignment',
      suggestions: 2,
      concerns: 1,
      specialty: 'Comedic rhythm & flow',
      activeTracking: ['Speech rhythm', 'Callback placement', 'Energy levels'],
      mood: 'harmonious',
      workload: 'optimal',
      accuracy: 96,
      collaborationStyle: 'rhythmic',
      lastActive: '45s ago'
    },
    { 
      id: 'culture_navigator', 
      name: 'Culture', 
      role: 'Cultural Navigator',
      icon: Globe, 
      color: 'orange',
      status: 'monitoring',
      confidence: 88,
      personality: 'Worldly and sensitive, ensures cultural appropriateness',
      currentFocus: 'Cross-cultural humor adaptation',
      suggestions: 3,
      concerns: 3,
      specialty: 'Cultural sensitivity & adaptation',
      activeTracking: ['Cultural references', 'Sensitivity levels', 'Global appeal'],
      mood: 'thoughtful',
      workload: 'moderate',
      accuracy: 90,
      collaborationStyle: 'considerate',
      lastActive: '3m ago'
    }
  ];

  const comedyAnalytics = {
    jokeCount: 15,
    laughsPerMinute: '8.3',
    complexity: 'Intermediate',
    pacing: 'Well-timed',
    audienceAppeal: 'Strong',
    culturalSafety: 'Excellent',
    wordplayDensity: 'Rich',
    callbackUsage: 'Effective',
    timingAccuracy: 'Precise',
    genreConsistency: 'Solid'
  };

  const comedyInsights = [
    {
      type: 'timing_prediction',
      title: 'Punchline Optimization',
      prediction: 'Adding a 0.5 second pause before the next punchline will increase impact by 23%.',
      confidence: 91,
      impact: 'medium',
      agent: 'Tempo',
      timeframe: 'Next line',
      category: 'timing'
    },
    {
      type: 'audience_prediction',
      title: 'Demographic Appeal',
      prediction: 'This material will particularly resonate with 25-40 age group based on cultural references.',
      confidence: 86,
      impact: 'high',
      agent: 'Crowd',
      timeframe: 'Overall set',
      category: 'audience'
    },
    {
      type: 'wordplay_prediction',
      title: 'Pun Opportunity',
      prediction: 'Strong potential for a callback pun in 3-4 jokes using the "connection" setup.',
      confidence: 94,
      impact: 'medium',
      agent: 'Wit',
      timeframe: 'Upcoming segment',
      category: 'wordplay'
    },
    {
      type: 'rhythm_prediction',
      title: 'Energy Flow',
      prediction: 'Consider lowering energy slightly before the big finish to create contrast.',
      confidence: 89,
      impact: 'high',
      agent: 'Timing',
      timeframe: 'Final third',
      category: 'rhythm'
    }
  ];

  const comedyConflicts = [
    {
      id: 'sophistication_conflict',
      type: 'creative_tension',
      agents: ['Wit', 'Crowd'],
      issue: 'Sophistication vs Accessibility',
      description: 'Wit wants to add complex wordplay while Crowd prefers simpler, more accessible humor.',
      severity: 'medium',
      impact: 'audience reach',
      suggestions: [
        'Layer humor: simple surface joke with deeper wordplay for those who get it',
        'Alternate between sophisticated and accessible jokes',
        'Use sophisticated setup with accessible punchline'
      ],
      resolution: 'pending',
      votes: { option1: 3, option2: 1, option3: 2 }
    }
  ];

  const generateComedyContent = useCallback(() => {
    setCurrentSuggestion({
      type: 'joke_generation',
      content: 'You know what\'s weird about modern dating? We spend more time analyzing their social media than they spent taking the photos.',
      collaborators: ['Jester', 'Crowd', 'Wit'],
      variations: 4,
      confidence: 88,
      reasoning: 'Combines relatable modern experience (Jester), broad audience appeal (Crowd), and subtle wordplay (Wit)',
      comedyMechanics: ['observational', 'exaggeration', 'modern_relevance'],
      alternatives: [
        'Dating apps are just shopping for humans with really unreliable product reviews.',
        'Modern dating: where "it\'s complicated" became an understatement.',
        'We\'ve turned romance into a user interface problem.'
      ],
      timingNotes: 'Pause after "analyzing" for emphasis, quicken pace on punchline',
      audienceNotes: 'Appeals to 20-45 demographics, tech-savvy audiences'
    });
  }, []);

  return (
    <div className={`h-screen flex transition-colors duration-300 ${
      darkMode 
        ? 'bg-gradient-to-br from-gray-900 via-purple-900 to-pink-900' 
        : 'bg-gradient-to-br from-yellow-50 via-orange-50 to-red-50'
    }`}>
      {/* Enhanced Comedy Control Center */}
      <div className={`w-96 border-r flex flex-col shadow-xl transition-colors duration-300 ${
        darkMode 
          ? 'bg-gray-800 border-gray-700' 
          : 'bg-white border-gray-200'
      }`}>
        {/* Comedy-Focused Header */}
        <div className={`p-4 border-b transition-colors duration-300 ${
          darkMode 
            ? 'border-gray-700 bg-gradient-to-r from-yellow-900 via-orange-900 to-red-900' 
            : 'border-gray-200 bg-gradient-to-r from-yellow-100 via-orange-100 to-red-100'
        }`}>
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-yellow-500 to-red-500 rounded-lg flex items-center justify-center">
                <Laugh className="w-4 h-4 text-white animate-bounce" />
              </div>
              <div>
                <h2 className={`font-bold text-lg ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  Neural Comedy
                </h2>
                <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  AI-Powered Humor Engine v2.0
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setVoiceMode(!voiceMode)}
                className={`p-2 rounded-lg transition-colors ${
                  voiceMode 
                    ? 'bg-orange-600 text-white' 
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
          
          {/* Comedy Mode & Genre Selector */}
          <div className="space-y-2 mb-3">
            <div className={`flex space-x-1 rounded-lg p-1 ${
              darkMode ? 'bg-gray-700' : 'bg-white'
            }`}>
              {[
                { id: 'collaborative', label: 'Collaborative', icon: Users },
                { id: 'ai_driven', label: 'AI-Driven', icon: Bot },
                { id: 'workshop', label: 'Workshop', icon: Theater }
              ].map((mode) => {
                const IconComponent = mode.icon;
                return (
                  <button
                    key={mode.id}
                    onClick={() => setComedyMode(mode.id)}
                    className={`flex-1 flex flex-col items-center justify-center px-2 py-2 text-xs font-medium rounded transition-all ${
                      comedyMode === mode.id 
                        ? 'bg-orange-500 text-white shadow-md transform scale-105' 
                        : darkMode
                          ? 'text-gray-400 hover:text-gray-200 hover:bg-gray-600'
                          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                    }`}
                  >
                    <IconComponent className="w-3 h-3 mb-1" />
                    <span>{mode.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Genre & Audience Selectors */}
            <div className="grid grid-cols-2 gap-2">
              <select 
                value={comedyGenre}
                onChange={(e) => setComedyGenre(e.target.value)}
                className={`text-xs p-2 rounded border ${
                  darkMode 
                    ? 'bg-gray-700 border-gray-600 text-gray-200' 
                    : 'bg-white border-gray-300 text-gray-700'
                }`}
              >
                <option value="observational">Observational</option>
                <option value="slapstick">Slapstick</option>
                <option value="satire">Satire</option>
                <option value="dark">Dark Humor</option>
                <option value="absurdist">Absurdist</option>
                <option value="wordplay">Wordplay</option>
                <option value="character">Character</option>
                <option value="situational">Situational</option>
              </select>
              
              <select 
                value={audienceTarget}
                onChange={(e) => setAudienceTarget(e.target.value)}
                className={`text-xs p-2 rounded border ${
                  darkMode 
                    ? 'bg-gray-700 border-gray-600 text-gray-200' 
                    : 'bg-white border-gray-300 text-gray-700'
                }`}
              >
                <option value="general">General</option>
                <option value="young_adult">Young Adult</option>
                <option value="family">Family</option>
                <option value="mature">Mature</option>
                <option value="niche">Niche</option>
                <option value="professional">Professional</option>
              </select>
            </div>
          </div>

          {/* Comedy Health Dashboard */}
          <div className={`rounded-lg p-3 border transition-colors duration-300 ${
            darkMode 
              ? 'bg-gray-800 border-gray-600' 
              : 'bg-white border-gray-200'
          }`}>
            <div className="flex items-center justify-between mb-2">
              <span className={`font-medium text-sm ${darkMode ? 'text-gray-200' : 'text-gray-900'}`}>
                Comedy Health
              </span>
              <div className="flex items-center space-x-2">
                <div className={`w-2 h-2 rounded-full ${
                  comedyHealth > 85 ? 'bg-green-500' : 
                  comedyHealth > 70 ? 'bg-yellow-500' : 'bg-red-500'
                } animate-pulse`}></div>
                <span className={`text-sm font-bold ${darkMode ? 'text-gray-200' : 'text-gray-900'}`}>
                  {comedyHealth}%
                </span>
                <Laugh className="w-3 h-3 text-yellow-500" />
              </div>
            </div>
            
            <div className={`w-full rounded-full h-2 ${darkMode ? 'bg-gray-600' : 'bg-gray-200'}`}>
              <div 
                className={`h-2 rounded-full transition-all duration-500 ${
                  comedyHealth > 85 ? 'bg-gradient-to-r from-green-400 to-yellow-500' :
                  comedyHealth > 70 ? 'bg-gradient-to-r from-yellow-400 to-orange-500' :
                  'bg-gradient-to-r from-red-400 to-red-600'
                }`}
                style={{width: `${comedyHealth}%`}}
              ></div>
            </div>
            
            <div className="grid grid-cols-3 gap-1 mt-2 text-xs">
              <div className="text-center">
                <div className="text-yellow-500 font-medium">Setup</div>
                <div className={darkMode ? 'text-gray-400' : 'text-gray-600'}>92%</div>
              </div>
              <div className="text-center">
                <div className="text-red-500 font-medium">Timing</div>
                <div className={darkMode ? 'text-gray-400' : 'text-gray-600'}>89%</div>
              </div>
              <div className="text-center">
                <div className="text-blue-500 font-medium">Landing</div>
                <div className={darkMode ? 'text-gray-400' : 'text-gray-600'}>84%</div>
              </div>
            </div>

            {/* Comedy-Specific Metrics */}
            <div className="mt-3 pt-3 border-t border-gray-300 dark:border-gray-600">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center space-x-1">
                  <Timer className="w-3 h-3 text-red-500" />
                  <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Timing Sync</span>
                </div>
                <span className={`font-medium ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                  {Math.round(timingSync)}%
                </span>
              </div>
              <div className="flex items-center justify-between text-xs mt-1">
                <div className="flex items-center space-x-1">
                  <Zap className="w-3 h-3 text-orange-500" />
                  <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Comedy Velocity</span>
                </div>
                <span className={`font-medium ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                  {Math.round(comedyVelocity)}%
                </span>
              </div>
              <div className="flex items-center justify-between text-xs mt-1">
                <div className="flex items-center space-x-1">
                  <Laugh className="w-3 h-3 text-green-500" />
                  <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Audience Laughter</span>
                </div>
                <span className={`font-medium ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                  {Math.round(audienceLaughter)}%
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
              { id: 'agents', label: 'Comedy Council', icon: Bot, count: 6 },
              { id: 'insights', label: 'Laugh Track', icon: Lightbulb, count: 4 },
              { id: 'conflicts', label: 'Creative Tension', icon: AlertTriangle, count: 1 },
              { id: 'analytics', label: 'Metrics', icon: BarChart3, count: 0 }
            ].map((tab) => {
              const IconComponent = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 flex items-center justify-center space-x-1 px-2 py-3 text-xs font-medium border-b-2 transition-colors ${
                    activeTab === tab.id 
                      ? darkMode
                        ? 'border-orange-400 text-orange-400 bg-gray-700'
                        : 'border-orange-500 text-orange-600 bg-white'
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
                        ? 'bg-orange-100 text-orange-600' 
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

        {/* Content Area with Comedy-Specific Features */}
        <div className="flex-1 overflow-y-auto">
          {activeTab === 'agents' && (
            <div className="p-4">
              {/* Real-time Comedy Agent Activity */}
              <div className="mb-4">
                <h3 className={`font-medium text-sm mb-3 flex items-center space-x-2 ${
                  darkMode ? 'text-gray-200' : 'text-gray-900'
                }`}>
                  <Activity className="w-4 h-4" />
                  <span>Live Comedy Workshop</span>
                  <div className={`w-2 h-2 rounded-full ${
                    isTyping ? 'bg-yellow-500 animate-bounce' : 'bg-gray-400'
                  }`}></div>
                </h3>
                
                {isTyping && typingAgent && (
                  <div className={`border rounded-lg p-3 mb-3 transition-colors duration-300 ${
                    darkMode 
                      ? 'bg-gray-700 border-gray-600' 
                      : 'bg-yellow-50 border-yellow-200'
                  }`}>
                    <div className="flex items-center space-x-2 mb-2">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-yellow-500 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-yellow-500 rounded-full animate-bounce delay-100"></div>
                        <div className="w-2 h-2 bg-yellow-500 rounded-full animate-bounce delay-200"></div>
                      </div>
                      <span className={`font-medium text-sm ${
                        darkMode ? 'text-yellow-400' : 'text-yellow-900'
                      }`}>
                        {typingAgent} is workshopping...
                      </span>
                    </div>
                  </div>
                )}
                
                {agentDiscussion.length > 0 && !isTyping && (
                  <div className={`border rounded-lg p-3 mb-3 transition-colors duration-300 ${
                    darkMode 
                      ? 'bg-gray-700 border-gray-600' 
                      : 'bg-orange-50 border-orange-200'
                  }`}>
                    <div className="flex items-center space-x-2 mb-2">
                      <MessageCircle className="w-4 h-4 text-orange-600" />
                      <span className={`font-medium text-sm ${
                        darkMode ? 'text-orange-400' : 'text-orange-900'
                      }`}>
                        Latest Workshop Note
                      </span>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        agentDiscussion[0]?.sentiment === 'positive' 
                          ? 'bg-green-100 text-green-700' :
                        agentDiscussion[0]?.sentiment === 'constructive'
                          ? 'bg-blue-100 text-blue-700' :
                        agentDiscussion[0]?.sentiment === 'warning'
                          ? 'bg-red-100 text-red-700' :
                        agentDiscussion[0]?.sentiment === 'excited'
                          ? 'bg-purple-100 text-purple-700' :
                          'bg-gray-100 text-gray-700'
                      }`}>
                        {agentDiscussion[0]?.comedyFocus}
                      </span>
                    </div>
                    <div className={`text-sm ${darkMode ? 'text-orange-300' : 'text-orange-800'}`}>
                      <strong>{agentDiscussion[0]?.agent}:</strong> {agentDiscussion[0]?.message}
                    </div>
                    <button 
                      onClick={() => setShowAgentChat(true)}
                      className={`text-xs mt-2 hover:underline ${
                        darkMode ? 'text-orange-400' : 'text-orange-600'
                      }`}
                    >
                      Join comedy workshop →
                    </button>
                  </div>
                )}
              </div>

              {/* Enhanced Comedy Agent Cards */}
              <div className="space-y-3">
                {comedyAgents.map((agent) => {
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
                            agent.status === 'crafting' ? 'bg-yellow-500 animate-pulse' :
                            agent.status === 'synchronizing' ? 'bg-red-500 animate-pulse' :
                            agent.status === 'analyzing' ? 'bg-blue-500 animate-pulse' :
                            agent.status === 'weaving' ? 'bg-purple-500 animate-pulse' :
                            agent.status === 'conducting' ? 'bg-green-500 animate-pulse' :
                            'bg-orange-500'
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
                                  'bg-green-500'
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
                              agent.status === 'crafting' ? 'bg-yellow-100 text-yellow-800' :
                              agent.status === 'synchronizing' ? 'bg-red-100 text-red-800' :
                              agent.status === 'analyzing' ? 'bg-blue-100 text-blue-800' :
                              agent.status === 'weaving' ? 'bg-purple-100 text-purple-800' :
                              agent.status === 'conducting' ? 'bg-green-100 text-green-800' :
                              'bg-orange-100 text-orange-800'
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

              {/* Comedy-Specific Collective Actions */}
              <div className={`mt-4 p-3 border rounded-lg transition-colors duration-300 ${
                darkMode 
                  ? 'bg-gradient-to-r from-yellow-900 to-red-900 border-yellow-700' 
                  : 'bg-gradient-to-r from-yellow-50 to-red-50 border-yellow-200'
              }`}>
                <h4 className={`font-medium text-sm mb-3 ${
                  darkMode ? 'text-yellow-300' : 'text-yellow-900'
                }`}>
                  Comedy Workshop Actions
                </h4>
                <div className="grid grid-cols-2 gap-2">
                  <button 
                    onClick={generateComedyContent}
                    className="bg-yellow-600 text-white px-3 py-2 rounded-lg text-sm font-medium hover:bg-yellow-700 flex items-center justify-center space-x-1 transition-colors"
                  >
                    <Wand2 className="w-3 h-3" />
                    <span>Generate Joke</span>
                  </button>
                  <button className="bg-red-600 text-white px-3 py-2 rounded-lg text-sm font-medium hover:bg-red-700 flex items-center justify-center space-x-1 transition-colors">
                    <Timer className="w-3 h-3" />
                    <span>Timing Check</span>
                  </button>
                  <button className="bg-blue-600 text-white px-3 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 flex items-center justify-center space-x-1 transition-colors">
                    <Users className="w-3 h-3" />
                    <span>Audience Test</span>
                  </button>
                  <button className="bg-purple-600 text-white px-3 py-2 rounded-lg text-sm font-medium hover:bg-purple-700 flex items-center justify-center space-x-1 transition-colors">
                    <Zap className="w-3 h-3" />
                    <span>Polish Material</span>
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
                <span>Comedy Insights & Predictions</span>
              </h3>
              
              <div className="space-y-3">
                {comedyInsights.map((insight, idx) => (
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
                          insight.category === 'timing' ? 'bg-red-100 text-red-700' :
                          insight.category === 'audience' ? 'bg-blue-100 text-blue-700' :
                          insight.category === 'wordplay' ? 'bg-purple-100 text-purple-700' :
                          'bg-green-100 text-green-700'
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
                          Apply
                        </button>
                        <button className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs hover:bg-blue-200 transition-colors">
                          Test
                        </button>
                        <button className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs hover:bg-gray-200 transition-colors">
                          Skip
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
                <span>Creative Tensions & Solutions</span>
              </h3>
              
              {comedyConflicts.map((conflict, idx) => (
                <div key={idx} className={`border rounded-lg p-3 mb-3 transition-colors duration-300 ${
                  darkMode 
                    ? 'bg-orange-900/20 border-orange-700' 
                    : 'bg-orange-50 border-orange-200'
                }`}>
                  <div className="flex items-center space-x-2 mb-2">
                    <Theater className="w-4 h-4 text-orange-500" />
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
                      Agents in Creative Tension:
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
                      Creative Solutions:
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
                            Try It
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
                <span>Comedy Analytics</span>
              </h3>
              
              {/* Comedy Metrics Grid */}
              <div className="grid grid-cols-2 gap-3 mb-4">
                {Object.entries(comedyAnalytics).map(([key, value]) => (
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
            </div>
          )}
        </div>
      </div>

      {/* Enhanced Comedy Editor */}
      <div className={`flex-1 flex flex-col transition-colors duration-300 ${
        darkMode ? 'bg-gray-800' : 'bg-white'
      }`}>
        {/* Comedy-Focused Command Bar */}
        <div className={`border-b p-4 transition-colors duration-300 ${
          darkMode 
            ? 'border-gray-700 bg-gradient-to-r from-yellow-900 via-orange-900 to-red-900' 
            : 'border-gray-200 bg-gradient-to-r from-yellow-50 via-orange-50 to-red-50'
        }`}>
          <div className="flex items-center space-x-4 mb-3">
            <div className="flex items-center space-x-2">
              <Laugh className="w-6 h-6 text-orange-600" />
              <span className={`font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                Neural Comedy Workshop
              </span>
              <span className={`text-xs px-2 py-1 rounded-full ${
                darkMode ? 'bg-green-900 text-green-300' : 'bg-green-100 text-green-700'
              }`}>
                Live
              </span>
            </div>
            
            {/* Enhanced Active Agents Indicator for Comedy */}
            <div className="flex items-center space-x-2">
              <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Workshop:
              </span>
              <div className="flex -space-x-1">
                {comedyAgents.slice(0, 4).map((agent, idx) => (
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
          
          {/* Enhanced Comedy Collaboration Input */}
          <div className="flex items-center space-x-3">
            <div className="flex-1 relative">
              <input 
                ref={chatInputRef}
                type="text" 
                placeholder="Workshop with AI: 'Make this funnier', 'Fix the timing', 'Add a callback', 'Test with different audience'..."
                className={`w-full border rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-colors ${
                  darkMode 
                    ? 'bg-gray-700 border-gray-600 text-gray-200 placeholder-gray-400' 
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                }`}
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex space-x-1">
                <button className={`p-1 transition-colors ${
                  voiceMode 
                    ? 'text-orange-600' 
                    : darkMode 
                      ? 'text-gray-400 hover:text-orange-400' 
                      : 'text-gray-400 hover:text-orange-600'
                }`}>
                  {voiceMode ? <Headphones className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                </button>
                <button className={`p-1 transition-colors ${
                  darkMode 
                    ? 'text-gray-400 hover:text-gray-200' 
                    : 'text-gray-400 hover:text-gray-600'
                }`}>
                  <Timer className="w-4 h-4" />
                </button>
              </div>
            </div>
            <button className="bg-orange-600 text-white px-6 py-3 rounded-lg text-sm font-medium hover:bg-orange-700 flex items-center space-x-2 transition-colors">
              <Theater className="w-4 h-4" />
              <span>Workshop</span>
            </button>
            <button 
              onClick={generateComedyContent}
              className="bg-gradient-to-r from-yellow-600 to-red-600 text-white px-6 py-3 rounded-lg text-sm font-medium hover:from-yellow-700 hover:to-red-700 flex items-center space-x-2 transition-colors"
            >
              <Wand2 className="w-4 h-4" />
              <span>Generate</span>
            </button>
          </div>

          {/* Comedy Shortcuts */}
          <div className={`mt-2 text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            <span>Quick Actions: Ctrl+G (Generate) • Ctrl+T (Timing) • Ctrl+A (Audience Test) • Ctrl+L (Laugh Track)</span>
          </div>
        </div>

        {/* Enhanced Comedy Suggestion Display */}
        {currentSuggestion && (
          <div className={`border-b p-4 transition-colors duration-300 ${
            darkMode 
              ? 'border-gray-700 bg-gradient-to-r from-yellow-900 to-orange-900' 
              : 'border-gray-200 bg-gradient-to-r from-yellow-50 to-orange-50'
          }`}>
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <Laugh className="w-4 h-4 text-orange-600" />
                  <span className={`font-medium ${
                    darkMode ? 'text-orange-300' : 'text-orange-900'
                  }`}>
                    AI Comedy Suggestion
                  </span>
                  <div className="flex -space-x-1">
                    {currentSuggestion.collaborators.map((agent, idx) => (
                      <div key={idx} className="w-4 h-4 bg-orange-500 rounded-full border border-white text-xs text-white flex items-center justify-center">
                        {agent[0]}
                      </div>
                    ))}
                  </div>
                  <span className={`text-sm ${darkMode ? 'text-orange-400' : 'text-orange-700'}`}>
                    {currentSuggestion.confidence}% confident
                  </span>
                </div>
                
                <p className={`border rounded p-3 mb-3 italic transition-colors ${
                  darkMode 
                    ? 'text-gray-200 bg-gray-800 border-orange-600' 
                    : 'text-gray-800 bg-white border-orange-200'
                }`}>
                  "{currentSuggestion.content}"
                </p>
                
                {/* Comedy-Specific Metadata */}
                <div className="grid grid-cols-2 gap-3 mb-3">
                  <div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    <strong>Comedy Mechanics:</strong> {currentSuggestion.comedyMechanics?.join(', ')}
                  </div>
                  <div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    <strong>Timing Notes:</strong> {currentSuggestion.timingNotes}
                  </div>
                </div>
                
                {currentSuggestion.reasoning && (
                  <p className={`text-xs mb-3 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    <strong>Reasoning:</strong> {currentSuggestion.reasoning}
                  </p>
                )}
                
                <div className="flex items-center space-x-2 text-sm mb-3">
                  <button className="bg-green-600 text-white px-3 py-1 rounded flex items-center space-x-1 hover:bg-green-700 transition-colors">
                    <ThumbsUp className="w-3 h-3" />
                    <span>Perfect!</span>
                  </button>
                  <button className="bg-yellow-600 text-white px-3 py-1 rounded flex items-center space-x-1 hover:bg-yellow-700 transition-colors">
                    <Edit className="w-3 h-3" />
                    <span>Tweak It</span>
                  </button>
                  <button className="bg-blue-600 text-white px-3 py-1 rounded flex items-center space-x-1 hover:bg-blue-700 transition-colors">
                    <Shuffle className="w-3 h-3" />
                    <span>More Options ({currentSuggestion.variations})</span>
                  </button>
                  <button className="bg-purple-600 text-white px-3 py-1 rounded flex items-center space-x-1 hover:bg-purple-700 transition-colors">
                    <Timer className="w-3 h-3" />
                    <span>Test Timing</span>
                  </button>
                  <button className={`px-3 py-1 rounded flex items-center space-x-1 transition-colors ${
                    darkMode 
                      ? 'bg-gray-600 text-gray-200 hover:bg-gray-500' 
                      : 'bg-gray-300 text-gray-700 hover:bg-gray-400'
                  }`}>
                    <ThumbsDown className="w-3 h-3" />
                    <span>Pass</span>
                  </button>
                </div>

                {/* Alternative Comedy Suggestions */}
                {currentSuggestion.alternatives && (
                  <div className="space-y-2">
                    <span className={`text-xs font-medium ${
                      darkMode ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      Alternative approaches:
                    </span>
                    {currentSuggestion.alternatives.map((alt, idx) => (
                      <div key={idx} className={`p-2 border rounded text-sm transition-colors ${
                        darkMode 
                          ? 'bg-gray-700 border-gray-600 text-gray-300' 
                          : 'bg-gray-50 border-gray-200 text-gray-700'
                      }`}>
                        <div className="flex items-center justify-between">
                          <span className="flex-1 italic">"{alt}"</span>
                          <button className="ml-2 px-2 py-1 bg-orange-500 text-white rounded text-xs hover:bg-orange-600 transition-colors">
                            Try This
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

        {/* Enhanced Comedy Content Editor */}
        <div className={`flex-1 overflow-y-auto p-6 transition-colors duration-300 ${
          darkMode 
            ? 'bg-gradient-to-br from-gray-900 to-gray-800' 
            : 'bg-gradient-to-br from-white to-gray-50'
        }`}>
          <div className="max-w-4xl mx-auto space-y-8">
            
            {/* Comedy Set with Enhanced Multi-Agent Analysis */}
            <div className={`relative rounded-lg shadow-sm border p-6 transition-colors duration-300 ${
              darkMode 
                ? 'bg-gray-800 border-gray-700' 
                : 'bg-white border-gray-200'
            }`}>
              {/* Enhanced Comedy Agent Activity Sidebar */}
              <div className="absolute -left-4 top-0 bottom-0 w-3 flex flex-col space-y-2 pt-6">
                <div className="w-3 h-3 bg-yellow-500 rounded-full animate-pulse cursor-pointer" title="Jester crafting setup"></div>
                <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse cursor-pointer" title="Tempo optimizing timing"></div>
                <div className="w-3 h-3 bg-blue-500 rounded-full cursor-pointer" title="Crowd analyzing audience appeal"></div>
                <div className="w-3 h-3 bg-purple-500 rounded-full animate-pulse cursor-pointer" title="Wit weaving wordplay"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full cursor-pointer" title="Timing conducting rhythm"></div>
                <div className="w-3 h-3 bg-orange-500 rounded-full cursor-pointer" title="Culture monitoring sensitivity"></div>
              </div>
              
              <h2 className={`text-3xl font-bold mb-6 relative transition-colors duration-300 ${
                darkMode ? 'text-gray-100' : 'text-gray-900'
              }`}>
                "Modern Life" - A Comedy Set
                <div className="absolute -top-2 -right-2 flex space-x-1">
                  <div className="w-4 h-4 bg-gradient-to-r from-yellow-500 to-red-500 rounded-full flex items-center justify-center">
                    <Laugh className="w-2 h-2 text-white" />
                  </div>
                </div>
              </h2>

              {/* Enhanced Comedy Content with Multi-Agent Analysis */}
              <div className="space-y-6" ref={editorRef}>
                <div className="relative group">
                  <p className={`leading-relaxed text-lg relative transition-colors duration-300 ${
                    darkMode ? 'text-gray-200' : 'text-gray-800'
                  }`}>
                    <span className="relative inline-block">
                      <mark className="bg-gradient-to-r from-yellow-200 to-orange-200 border-2 border-yellow-400 rounded px-1 dark:from-yellow-700 dark:to-orange-700 dark:border-yellow-500">
                        You know what's weird about modern technology?
                      </mark>
                      
                      {/* Enhanced Tooltip with Comedy Agent Insights */}
                      <div className={`absolute -top-48 left-1/2 transform -translate-x-1/2 border rounded-xl shadow-2xl p-4 text-sm w-96 z-20 opacity-0 group-hover:opacity-100 transition-all duration-300 ${
                        darkMode 
                          ? 'bg-gray-800 border-gray-600' 
                          : 'bg-white border-gray-300'
                      }`}>
                        <div className="flex items-center justify-between mb-3">
                          <span className={`font-bold ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
                            Comedy Workshop Analysis
                          </span>
                          <div className="flex -space-x-1">
                            <div className="w-5 h-5 bg-yellow-500 rounded-full border border-white flex items-center justify-center">
                              <Smile className="w-3 h-3 text-white" />
                            </div>
                            <div className="w-5 h-5 bg-blue-500 rounded-full border border-white flex items-center justify-center">
                              <Users className="w-3 h-3 text-white" />
                            </div>
                            <div className="w-5 h-5 bg-red-500 rounded-full border border-white flex items-center justify-center">
                              <Timer className="w-3 h-3 text-white" />
                            </div>
                          </div>
                        </div>
                        
                        <div className="space-y-3">
                          <div className="p-2 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-700 rounded-lg">
                            <div className="flex items-center space-x-1 mb-1">
                              <Smile className="w-3 h-3 text-yellow-600" />
                              <span className={`font-medium text-xs ${
                                darkMode ? 'text-yellow-400' : 'text-yellow-900'
                              }`}>
                                Jester (Setup Specialist)
                              </span>
                            </div>
                            <p className={`text-xs ${
                              darkMode ? 'text-yellow-300' : 'text-yellow-800'
                            }`}>
                              Strong observational opening. "You know what's weird" is proven formula.
                            </p>
                            <div className={`text-xs mt-1 ${
                              darkMode ? 'text-yellow-400' : 'text-yellow-700'
                            }`}>
                              ✓ Setup strength: 94%
                            </div>
                          </div>
                          
                          <div className="p-2 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-lg">
                            <div className="flex items-center space-x-1 mb-1">
                              <Users className="w-3 h-3 text-blue-600" />
                              <span className={`font-medium text-xs ${
                                darkMode ? 'text-blue-400' : 'text-blue-900'
                              }`}>
                                Crowd (Audience Whisperer)
                              </span>
                            </div>
                            <p className={`text-xs ${
                              darkMode ? 'text-blue-300' : 'text-blue-800'
                            }`}>
                              Universal appeal. Technology frustration spans all demographics.
                            </p>
                            <div className={`text-xs mt-1 ${
                              darkMode ? 'text-blue-400' : 'text-blue-700'
                            }`}>
                              📊 Audience reach: 85%
                            </div>
                          </div>
                          
                          <div className="p-2 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700 rounded-lg">
                            <div className="flex items-center space-x-1 mb-1">
                              <Timer className="w-3 h-3 text-red-600" />
                              <span className={`font-medium text-xs ${
                                darkMode ? 'text-red-400' : 'text-red-900'
                              }`}>
                                Tempo (Timing Master)
                              </span>
                            </div>
                            <p className={`text-xs ${
                              darkMode ? 'text-red-300' : 'text-red-800'
                            }`}>
                              Perfect pause point after "technology." Build tension here.
                            </p>
                            <div className={`text-xs mt-1 ${
                              darkMode ? 'text-red-400' : 'text-red-700'
                            }`}>
                              ⏱️ Timing grade: A+
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex space-x-1 mt-3">
                          <button className="flex-1 px-2 py-1 bg-green-600 text-white rounded text-xs hover:bg-green-700 transition-colors">
                            Perfect Setup
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
                    We spend more time trying to connect to WiFi than we do connecting with actual humans.
                  </p>
                </div>

                {/* Punchline with Enhanced Timing Analysis */}
                <div className={`ml-6 p-4 border-l-4 border-orange-400 rounded-r-lg transition-colors duration-300 ${
                  darkMode 
                    ? 'bg-gradient-to-r from-orange-900/50 to-red-900/50' 
                    : 'bg-gradient-to-r from-orange-50 to-red-50'
                }`}>
                  <p className={`mb-3 relative group transition-colors duration-300 ${
                    darkMode ? 'text-gray-200' : 'text-gray-800'
                  }`}>
                    <span className="relative inline-block">
                      <mark className="bg-red-200 dark:bg-red-700 border-2 border-red-400 dark:border-red-500 rounded px-1">
                        "And when we finally get connected, we immediately start looking for better connection!"
                      </mark>
                      
                      {/* Enhanced Timing Analysis Tooltip */}
                      <div className={`absolute -top-32 left-1/2 transform -translate-x-1/2 border rounded-xl shadow-xl p-3 text-xs w-80 z-20 opacity-0 group-hover:opacity-100 transition-opacity ${
                        darkMode 
                          ? 'bg-gray-800 border-gray-600' 
                          : 'bg-white border-gray-300'
                      }`}>
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center space-x-1">
                            <Timer className="w-3 h-3 text-red-600" />
                            <span className={`font-medium ${
                              darkMode ? 'text-red-400' : 'text-red-900'
                            }`}>
                              Tempo (Timing Master)
                            </span>
                          </div>
                          <span className={`text-xs ${
                            darkMode ? 'text-red-400' : 'text-red-700'
                          }`}>
                            Timing: Perfect
                          </span>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-2 mb-2">
                          <div className="p-2 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700 rounded">
                            <div className={`font-medium text-xs ${
                              darkMode ? 'text-red-400' : 'text-red-900'
                            }`}>
                              Delivery
                            </div>
                            <div className={`text-xs ${
                              darkMode ? 'text-red-300' : 'text-red-800'
                            }`}>
                              Quick pace
                            </div>
                          </div>
                          <div className="p-2 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700 rounded">
                            <div className={`font-medium text-xs ${
                              darkMode ? 'text-red-400' : 'text-red-900'
                            }`}>
                              Emphasis
                            </div>
                            <div className={`text-xs ${
                              darkMode ? 'text-red-300' : 'text-red-800'
                            }`}>
                              "Better connection"
                            </div>
                          </div>
                        </div>
                        
                        <div className={`text-xs mb-2 ${
                          darkMode ? 'text-red-300' : 'text-red-800'
                        }`}>
                          <strong>Callback opportunity:</strong> Reference this "connection" theme in 2-3 jokes.
                        </div>
                      </div>
                    </span>
                  </p>
                </div>

                {/* Real-time Comedy Workshop Visualization */}
                <div className={`border-2 border-dashed rounded-xl p-6 transition-colors duration-300 ${
                  darkMode 
                    ? 'border-orange-600 bg-gradient-to-br from-yellow-900/30 via-orange-900/30 to-red-900/30' 
                    : 'border-orange-300 bg-gradient-to-br from-yellow-50 via-orange-50 to-red-50'
                }`}>
                  <div className="text-center mb-4">
                    <div className="flex items-center justify-center space-x-3 mb-3">
                      <div className="relative">
                        <div className="flex items-center space-x-1">
                          <div className="w-4 h-4 bg-yellow-500 rounded-full animate-bounce"></div>
                          <div className="w-4 h-4 bg-red-500 rounded-full animate-bounce delay-150"></div>
                          <div className="w-4 h-4 bg-blue-500 rounded-full animate-bounce delay-300"></div>
                          <div className="w-4 h-4 bg-purple-500 rounded-full animate-bounce delay-450"></div>
                        </div>
                        <div className="absolute -inset-2 border-2 border-dashed border-orange-400 rounded-full animate-spin-slow"></div>
                      </div>
                      <span className={`font-bold text-lg ${
                        darkMode ? 'text-orange-300' : 'text-orange-700'
                      }`}>
                        Comedy Workshop In Progress
                      </span>
                    </div>
                    
                    <div className={`rounded-lg p-4 border mb-4 transition-colors duration-300 ${
                      darkMode 
                        ? 'bg-gray-800 border-orange-600' 
                        : 'bg-white border-orange-200'
                    }`}>
                      <div className={`font-medium mb-2 ${
                        darkMode ? 'text-orange-300' : 'text-orange-800'
                      }`}>
                        Live Comedy Development
                      </div>
                      <div className={`text-sm space-y-1 ${
                        darkMode ? 'text-gray-300' : 'text-gray-700'
                      }`}>
                        <div>😄 <strong>Jester:</strong> Polishing observational setup structure</div>
                        <div>⏱️ <strong>Tempo:</strong> Optimizing punchline delivery timing</div>
                        <div>👥 <strong>Crowd:</strong> Testing demographic appeal range</div>
                        <div>⚡ <strong>Wit:</strong> Adding subtle wordplay layers</div>
                        <div>🎵 <strong>Timing:</strong> Harmonizing comedic rhythm flow</div>
                        <div>🌍 <strong>Culture:</strong> Ensuring global accessibility</div>
                      </div>
                    </div>
                    
                    <div className="flex justify-center space-x-3">
                      <button className="bg-gradient-to-r from-yellow-600 to-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center space-x-2 hover:from-yellow-700 hover:to-red-700 transition-colors">
                        <Wand2 className="w-4 h-4" />
                        <span>Generate Next Joke</span>
                      </button>
                      <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center space-x-2 hover:bg-blue-700 transition-colors">
                        <Users className="w-4 h-4" />
                        <span>Test with Audience</span>
                      </button>
                      <button className="bg-purple-600 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center space-x-2 hover:bg-purple-700 transition-colors">
                        <Timer className="w-4 h-4" />
                        <span>Perfect Timing</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Status Bar with Comedy Metrics */}
        <div className={`border-t px-6 py-3 transition-colors duration-300 ${
          darkMode 
            ? 'border-gray-700 bg-gradient-to-r from-gray-800 to-orange-900' 
            : 'border-gray-200 bg-gradient-to-r from-gray-50 to-orange-50'
        }`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6 text-sm">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-gradient-to-r from-yellow-400 to-red-500 rounded-full animate-pulse"></div>
                <span className={darkMode ? 'text-gray-300' : 'text-gray-700'}>
                  Timing sync: {Math.round(timingSync)}%
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Laugh className="w-4 h-4 text-orange-600" />
                <span className={darkMode ? 'text-gray-300' : 'text-gray-700'}>
                  6 comedy agents active
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Zap className="w-4 h-4 text-yellow-600" />
                <span className={darkMode ? 'text-gray-300' : 'text-gray-700'}>
                  Comedy velocity: {Math.round(comedyVelocity)}%
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Users className="w-4 h-4 text-blue-600" />
                <span className={darkMode ? 'text-gray-300' : 'text-gray-700'}>
                  Audience laughter: {Math.round(audienceLaughter)}%
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Shield className="w-4 h-4 text-green-600" />
                <span className={darkMode ? 'text-gray-300' : 'text-gray-700'}>
                  Comedy quality: Excellent
                </span>
              </div>
            </div>
            
            <div className="flex items-center space-x-4 text-sm">
              <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
                Set: 5 min • {comedyAnalytics.jokeCount} jokes • {comedyAnalytics.laughsPerMinute} laughs/min
              </span>
              <div className="flex items-center space-x-2">
                <button className={`hover:underline font-medium ${
                  darkMode ? 'text-orange-400' : 'text-orange-600'
                }`}>
                  Comedy Analytics
                </button>
                <button className={`hover:underline font-medium ${
                  darkMode ? 'text-yellow-400' : 'text-yellow-600'
                }`}>
                  Export Set
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Comedy Agent Chat Sidebar */}
      {showAgentChat && (
        <div className={`w-80 border-l flex flex-col shadow-xl transition-colors duration-300 ${
          darkMode 
            ? 'bg-gray-800 border-gray-700' 
            : 'bg-white border-gray-200'
        }`}>
          <div className={`p-4 border-b transition-colors duration-300 ${
            darkMode 
              ? 'border-gray-700 bg-gradient-to-r from-orange-900 to-yellow-900' 
              : 'border-gray-200 bg-gradient-to-r from-orange-50 to-yellow-50'
          }`}>
            <div className="flex items-center justify-between">
              <h3 className={`font-bold ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
                Comedy Workshop Chat
              </h3>
              <div className="flex items-center space-x-2">
                <div className="flex items-center space-x-1">
                  <div className={`w-2 h-2 rounded-full ${
                    isTyping ? 'bg-yellow-500 animate-bounce' : 'bg-gray-400'
                  }`}></div>
                  <span className={`text-xs ${
                    darkMode ? 'text-gray-400' : 'text-gray-500'
                  }`}>
                    {isTyping ? 'Workshop Active' : 'Idle'}
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
                  : 'bg-yellow-50 border-yellow-200'
              }`}>
                <div className="flex items-center space-x-2 mb-1">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-yellow-500 rounded-full animate-bounce delay-100"></div>
                    <div className="w-2 h-2 bg-yellow-500 rounded-full animate-bounce delay-200"></div>
                  </div>
                  <span className={`font-medium text-sm ${
                    darkMode ? 'text-gray-200' : 'text-gray-900'
                  }`}>
                    {typingAgent}
                  </span>
                  <span className={`text-xs ${
                    darkMode ? 'text-gray-400' : 'text-gray-500'
                  }`}>
                    is workshopping...
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
                    msg.agent === 'Jester' ? 'bg-yellow-500' :
                    msg.agent === 'Tempo' ? 'bg-red-500' :
                    msg.agent === 'Crowd' ? 'bg-blue-500' :
                    msg.agent === 'Wit' ? 'bg-purple-500' :
                    msg.agent === 'Timing' ? 'bg-green-500' :
                    'bg-orange-500'
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
                      ? 'bg-blue-100 text-blue-700' :
                    msg.sentiment === 'warning'
                      ? 'bg-red-100 text-red-700' :
                    msg.sentiment === 'excited'
                      ? 'bg-purple-100 text-purple-700' :
                      'bg-gray-100 text-gray-700'
                  }`}>
                    {msg.comedyFocus}
                  </span>
                </div>
                <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  {msg.message}
                </p>
                <div className="flex items-center space-x-2 mt-2">
                  <button className={`text-xs hover:underline ${
                    darkMode ? 'text-orange-400' : 'text-orange-600'
                  }`}>
                    Try It
                  </button>
                  <button className={`text-xs hover:underline ${
                    darkMode ? 'text-green-400' : 'text-green-600'
                  }`}>
                    Love It
                  </button>
                  <button className={`text-xs hover:underline ${
                    darkMode ? 'text-blue-400' : 'text-blue-600'
                  }`}>
                    Tweak
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
                placeholder="Join the workshop..."
                className={`flex-1 px-3 py-2 border rounded-lg text-sm transition-colors ${
                  darkMode 
                    ? 'bg-gray-700 border-gray-600 text-gray-200 placeholder-gray-400' 
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                }`}
              />
              <button className="bg-orange-600 text-white px-3 py-2 rounded-lg hover:bg-orange-700 transition-colors">
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NeuralComedyEngine;