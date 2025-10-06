import React, { useState, useEffect } from 'react';
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
  Mic
} from 'lucide-react';

const EnhancedLivingStoryInterface = () => {
  const [selectedTracker, setSelectedTracker] = useState(null);
  const [activeTab, setActiveTab] = useState('agents');
  const [showAgentChat, setShowAgentChat] = useState(false);
  const [selectedAgent, setSelectedAgent] = useState(null);
  const [storyMode, setStoryMode] = useState('collaborative');
  const [agentDiscussion, setAgentDiscussion] = useState([]);
  const [currentSuggestion, setCurrentSuggestion] = useState(null);
  const [storyHealth, setStoryHealth] = useState(94);
  const [conflictAlert, setConflictAlert] = useState(null);

  // Simulated real-time agent activity
  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate agent discussion updates
      const discussions = [
        {
          agent: 'Character Guardian',
          message: "Elena's transformation feels rushed in this scene. Should we show more internal struggle?",
          type: 'concern',
          timestamp: Date.now() - 30000
        },
        {
          agent: 'Plot Weaver',
          message: "The pacing is excellent here. The revelation timing creates maximum impact.",
          type: 'approval',
          timestamp: Date.now() - 45000
        },
        {
          agent: 'Theme Keeper',
          message: "Justice theme could be stronger. Consider adding symbolic elements.",
          type: 'suggestion',
          timestamp: Date.now() - 60000
        }
      ];
      
      if (Math.random() > 0.7) {
        setAgentDiscussion(prev => {
          const newDiscussion = discussions[Math.floor(Math.random() * discussions.length)];
          return [newDiscussion, ...prev.slice(0, 4)];
        });
      }
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const narrativeAgents = [
    { 
      id: 'character_guardian', 
      name: 'Aria', 
      role: 'Character Guardian',
      icon: Users, 
      status: 'analyzing',
      confidence: 94,
      personality: 'Empathetic and detail-oriented, focuses on authentic character development',
      currentFocus: 'Elena\'s emotional arc in Chapter 5',
      suggestions: 3,
      concerns: 1,
      specialty: 'Character psychology & development',
      activeTracking: ['Elena Martinez', 'Inspector Blackwood', 'Character relationships']
    },
    { 
      id: 'plot_weaver', 
      name: 'Viktor', 
      role: 'Plot Architect',
      icon: GitBranch, 
      status: 'optimizing',
      confidence: 98,
      personality: 'Logical and strategic, ensures tight narrative structure',
      currentFocus: 'Revelation sequence optimization',
      suggestions: 2,
      concerns: 0,
      specialty: 'Narrative structure & pacing',
      activeTracking: ['Murder mystery thread', 'Clue placement', 'Chapter transitions']
    },
    { 
      id: 'theme_keeper', 
      name: 'Sage', 
      role: 'Theme Weaver',
      icon: Heart, 
      status: 'reinforcing',
      confidence: 91,
      personality: 'Philosophical and insightful, deepens story meaning',
      currentFocus: 'Justice vs revenge symbolism',
      suggestions: 4,
      concerns: 2,
      specialty: 'Thematic depth & symbolism',
      activeTracking: ['Justice theme', 'Moral complexity', 'Character motivations']
    },
    { 
      id: 'world_architect', 
      name: 'Atlas', 
      role: 'World Guardian',
      icon: Globe, 
      status: 'monitoring',
      confidence: 96,
      personality: 'Meticulous and immersive, creates believable worlds',
      currentFocus: 'Victorian London authenticity',
      suggestions: 1,
      concerns: 0,
      specialty: 'Historical accuracy & atmosphere',
      activeTracking: ['Time period consistency', 'Setting details', 'Cultural accuracy']
    },
    { 
      id: 'emotion_navigator', 
      name: 'Echo', 
      role: 'Emotion Conductor',
      icon: Flame, 
      status: 'orchestrating',
      confidence: 89,
      personality: 'Intuitive and passionate, guides emotional journey',
      currentFocus: 'Tension escalation curve',
      suggestions: 5,
      concerns: 1,
      specialty: 'Emotional pacing & reader engagement',
      activeTracking: ['Tension levels', 'Emotional beats', 'Reader investment']
    },
    { 
      id: 'style_harmonizer', 
      name: 'Melody', 
      role: 'Voice Conductor',
      icon: Volume2, 
      status: 'refining',
      confidence: 92,
      personality: 'Artistic and precise, maintains narrative voice',
      currentFocus: 'Dialogue authenticity',
      suggestions: 2,
      concerns: 0,
      specialty: 'Writing style & voice consistency',
      activeTracking: ['Character voices', 'Narrative tone', 'Style evolution']
    }
  ];

  const predictiveInsights = [
    {
      type: 'plot_prediction',
      title: 'Upcoming Plot Tension',
      prediction: 'Based on current pacing, Chapter 6 may feel rushed. Consider extending the confrontation scene.',
      confidence: 87,
      impact: 'high',
      agent: 'Viktor'
    },
    {
      type: 'character_growth',
      title: 'Character Arc Completion',
      prediction: 'Elena will reach character growth milestone in 2-3 scenes if current development continues.',
      confidence: 94,
      impact: 'medium',
      agent: 'Aria'
    },
    {
      type: 'reader_engagement',
      title: 'Emotional Investment Peak',
      prediction: 'Reader emotional investment will peak during the mentor betrayal reveal.',
      confidence: 91,
      impact: 'high',
      agent: 'Echo'
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
      suggestions: [
        'Compromise: Quick plot advancement with emotional depth in character moments',
        'Split focus: Fast external action, deep internal reflection',
        'Parallel development: Plot and emotion advance together'
      ]
    }
  ];

  const generateStoryContent = () => {
    setCurrentSuggestion({
      type: 'scene_generation',
      content: 'Elena\'s hands trembled as she realized the cipher\'s true meaning...',
      collaborators: ['Aria', 'Viktor', 'Echo'],
      variations: 3,
      confidence: 92
    });
  };

  return (
    <div className="h-screen bg-gray-50 flex">
      {/* Enhanced Control Center */}
      <div className="w-96 bg-white border-r border-gray-200 flex flex-col shadow-sm">
        {/* Refined Header */}
        <div className="p-4 border-b border-gray-200 bg-gray-50">
          <div className="flex items-center space-x-3 mb-3">
            <div className="w-8 h-8 bg-gray-900 rounded-lg flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <div>
              <h2 className="font-bold text-gray-900 text-lg">Neural Narrative</h2>
              <p className="text-xs text-gray-600">AI-Powered Story Collaboration</p>
            </div>
          </div>
          
          {/* Story Mode Selector */}
          <div className="flex space-x-1 bg-white rounded-lg p-1 mb-3 border border-gray-200">
            {[
              { id: 'collaborative', label: 'Collaborative', icon: Users },
              { id: 'autonomous', label: 'AI-Driven', icon: Bot },
              { id: 'guided', label: 'Guided', icon: Compass }
            ].map((mode) => {
              const IconComponent = mode.icon;
              return (
                <button
                  key={mode.id}
                  onClick={() => setStoryMode(mode.id)}
                  className={`flex-1 flex items-center justify-center space-x-1 px-2 py-2 text-xs font-medium rounded transition-all ${
                    storyMode === mode.id 
                      ? 'bg-blue-600 text-white shadow-sm' 
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  <IconComponent className="w-3 h-3" />
                  <span>{mode.label}</span>
                </button>
              );
            })}
          </div>

          {/* Story Health Dashboard */}
          <div className="bg-white rounded-lg p-3 border border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium text-gray-900 text-sm">Story Health</span>
              <div className="flex items-center space-x-1">
                <div className={`w-2 h-2 rounded-full ${storyHealth > 90 ? 'bg-emerald-500' : storyHealth > 70 ? 'bg-amber-500' : 'bg-red-500'}`}></div>
                <span className="text-sm font-bold text-gray-900">{storyHealth}%</span>
              </div>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className={`h-2 rounded-full transition-all duration-500 ${
                  storyHealth > 90 ? 'bg-emerald-500' :
                  storyHealth > 70 ? 'bg-amber-500' :
                  'bg-red-500'
                }`}
                style={{width: `${storyHealth}%`}}
              ></div>
            </div>
            <div className="grid grid-cols-3 gap-1 mt-2 text-xs">
              <div className="text-center">
                <div className="text-gray-700 font-medium">Plot</div>
                <div className="text-gray-600">98%</div>
              </div>
              <div className="text-center">
                <div className="text-gray-700 font-medium">Character</div>
                <div className="text-gray-600">94%</div>
              </div>
              <div className="text-center">
                <div className="text-gray-700 font-medium">Theme</div>
                <div className="text-gray-600">91%</div>
              </div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="border-b border-gray-200 bg-white">
          <div className="flex">
            {[
              { id: 'agents', label: 'AI Council', icon: Bot, count: 6 },
              { id: 'insights', label: 'Insights', icon: Lightbulb, count: 3 },
              { id: 'conflicts', label: 'Conflicts', icon: AlertTriangle, count: 1 }
            ].map((tab) => {
              const IconComponent = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 flex items-center justify-center space-x-2 px-3 py-3 text-sm font-medium border-b-2 transition-colors ${
                    activeTab === tab.id 
                      ? 'border-blue-600 text-blue-600 bg-blue-50' 
                      : 'border-transparent text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  <IconComponent className="w-4 h-4" />
                  <span>{tab.label}</span>
                  {tab.count > 0 && (
                    <span className={`px-1.5 py-0.5 rounded-full text-xs ${
                      activeTab === tab.id ? 'bg-blue-100 text-blue-700' : 'bg-gray-200 text-gray-600'
                    }`}>
                      {tab.count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto">
          {activeTab === 'agents' && (
            <div className="p-4">
              {/* Real-time Agent Activity */}
              <div className="mb-4">
                <h3 className="font-medium text-gray-900 text-sm mb-3 flex items-center space-x-2">
                  <Activity className="w-4 h-4" />
                  <span>Live Agent Activity</span>
                </h3>
                
                {agentDiscussion.length > 0 && (
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-3">
                    <div className="flex items-center space-x-2 mb-2">
                      <MessageCircle className="w-4 h-4 text-blue-600" />
                      <span className="font-medium text-blue-900 text-sm">Latest Discussion</span>
                    </div>
                    <div className="text-sm text-blue-800">
                      <strong>{agentDiscussion[0]?.agent}:</strong> {agentDiscussion[0]?.message}
                    </div>
                    <button 
                      onClick={() => setShowAgentChat(true)}
                      className="text-blue-600 text-xs mt-2 hover:underline"
                    >
                      Join conversation →
                    </button>
                  </div>
                )}
              </div>

              {/* Agent Cards */}
              <div className="space-y-3">
                {narrativeAgents.map((agent) => {
                  const IconComponent = agent.icon;
                  return (
                    <div 
                      key={agent.id} 
                      className="bg-white border border-gray-200 rounded-lg p-3 hover:shadow-md transition-all cursor-pointer"
                      onClick={() => setSelectedAgent(agent)}
                    >
                      <div className="flex items-start space-x-3">
                        <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center relative">
                          <IconComponent className="w-5 h-5 text-white" />
                          <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-white ${
                            agent.status === 'analyzing' ? 'bg-amber-500 animate-pulse' :
                            agent.status === 'optimizing' ? 'bg-blue-500 animate-pulse' :
                            agent.status === 'reinforcing' ? 'bg-violet-500 animate-pulse' :
                            agent.status === 'monitoring' ? 'bg-emerald-500' :
                            agent.status === 'orchestrating' ? 'bg-rose-500 animate-pulse' :
                            'bg-cyan-500 animate-pulse'
                          }`}></div>
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <div>
                              <span className="font-medium text-gray-900 text-sm">{agent.name}</span>
                              <span className="text-gray-500 text-xs ml-2">({agent.role})</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                              <span className="text-xs text-gray-500">{agent.confidence}%</span>
                            </div>
                          </div>
                          
                          <div className="text-xs text-gray-600 mb-2">{agent.currentFocus}</div>
                          
                          <div className="flex items-center justify-between">
                            <div className="flex space-x-3 text-xs">
                              <div className="flex items-center space-x-1">
                                <Lightbulb className="w-3 h-3 text-amber-500" />
                                <span className="text-gray-600">{agent.suggestions}</span>
                              </div>
                              {agent.concerns > 0 && (
                                <div className="flex items-center space-x-1">
                                  <AlertCircle className="w-3 h-3 text-orange-500" />
                                  <span className="text-gray-600">{agent.concerns}</span>
                                </div>
                              )}
                            </div>
                            <span className={`px-2 py-1 rounded-full text-xs border ${
                              agent.status === 'analyzing' ? 'bg-amber-50 text-amber-700 border-amber-200' :
                              agent.status === 'optimizing' ? 'bg-blue-50 text-blue-700 border-blue-200' :
                              agent.status === 'reinforcing' ? 'bg-violet-50 text-violet-700 border-violet-200' :
                              agent.status === 'monitoring' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                              agent.status === 'orchestrating' ? 'bg-rose-50 text-rose-700 border-rose-200' :
                              'bg-cyan-50 text-cyan-700 border-cyan-200'
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

              {/* Collective Actions */}
              <div className="mt-4 p-3 bg-gray-50 border border-gray-200 rounded-lg">
                <h4 className="font-medium text-gray-900 text-sm mb-3">Collective Actions</h4>
                <div className="grid grid-cols-2 gap-2">
                  <button 
                    onClick={generateStoryContent}
                    className="bg-blue-600 text-white px-3 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 flex items-center justify-center space-x-1"
                  >
                    <Wand2 className="w-3 h-3" />
                    <span>Generate Scene</span>
                  </button>
                  <button className="bg-gray-700 text-white px-3 py-2 rounded-lg text-sm font-medium hover:bg-gray-800 flex items-center justify-center space-x-1">
                    <Radar className="w-3 h-3" />
                    <span>Analyze All</span>
                  </button>
                  <button className="bg-emerald-600 text-white px-3 py-2 rounded-lg text-sm font-medium hover:bg-emerald-700 flex items-center justify-center space-x-1">
                    <CheckCircle className="w-3 h-3" />
                    <span>Health Check</span>
                  </button>
                  <button className="bg-violet-600 text-white px-3 py-2 rounded-lg text-sm font-medium hover:bg-violet-700 flex items-center justify-center space-x-1">
                    <Network className="w-3 h-3" />
                    <span>Sync Agents</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'insights' && (
            <div className="p-4">
              <h3 className="font-medium text-gray-900 text-sm mb-3 flex items-center space-x-2">
                <Lightbulb className="w-4 h-4" />
                <span>Predictive Insights</span>
              </h3>
              
              <div className="space-y-3">
                {predictiveInsights.map((insight, idx) => (
                  <div key={idx} className="bg-white border border-gray-200 rounded-lg p-3">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <div className={`w-3 h-3 rounded-full ${
                          insight.impact === 'high' ? 'bg-red-500' :
                          insight.impact === 'medium' ? 'bg-amber-500' :
                          'bg-emerald-500'
                        }`}></div>
                        <span className="font-medium text-gray-900 text-sm">{insight.title}</span>
                      </div>
                      <span className="text-xs text-gray-500">{insight.confidence}% confident</span>
                    </div>
                    
                    <p className="text-sm text-gray-700 mb-2">{insight.prediction}</p>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500">by {insight.agent}</span>
                      <div className="flex space-x-1">
                        <button className="px-2 py-1 bg-emerald-100 text-emerald-700 rounded text-xs">Accept</button>
                        <button className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">Modify</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'conflicts' && (
            <div className="p-4">
              <h3 className="font-medium text-gray-900 text-sm mb-3 flex items-center space-x-2">
                <AlertTriangle className="w-4 h-4" />
                <span>Agent Conflicts & Resolutions</span>
              </h3>
              
              {agentConflicts.map((conflict, idx) => (
                <div key={idx} className="bg-amber-50 border border-amber-200 rounded-lg p-3 mb-3">
                  <div className="flex items-center space-x-2 mb-2">
                    <AlertTriangle className="w-4 h-4 text-amber-600" />
                    <span className="font-medium text-amber-900 text-sm">{conflict.issue}</span>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      conflict.severity === 'high' ? 'bg-red-100 text-red-700' :
                      conflict.severity === 'medium' ? 'bg-amber-100 text-amber-700' :
                      'bg-emerald-100 text-emerald-700'
                    }`}>
                      {conflict.severity}
                    </span>
                  </div>
                  
                  <p className="text-sm text-amber-800 mb-3">{conflict.description}</p>
                  
                  <div className="mb-3">
                    <span className="text-xs font-medium text-amber-900 block mb-1">Conflicting Agents:</span>
                    <div className="flex space-x-2">
                      {conflict.agents.map(agent => (
                        <span key={agent} className="px-2 py-1 bg-white border border-amber-300 rounded text-xs text-amber-700">
                          {agent}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <span className="text-xs font-medium text-amber-900 block">Resolution Options:</span>
                    {conflict.suggestions.map((suggestion, sidx) => (
                      <div key={sidx} className="flex items-center justify-between bg-white border border-amber-200 rounded p-2">
                        <span className="text-xs text-gray-700">{suggestion}</span>
                        <button className="px-2 py-1 bg-amber-600 text-white rounded text-xs">Apply</button>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Enhanced Story Editor */}
      <div className="flex-1 flex flex-col bg-white">
        {/* Collaborative Command Bar */}
        <div className="border-b border-gray-200 bg-gray-50 p-4">
          <div className="flex items-center space-x-4 mb-3">
            <div className="flex items-center space-x-2">
              <Brain className="w-6 h-6 text-gray-700" />
              <span className="font-bold text-gray-900">Neural Narrative Engine</span>
            </div>
            
            {/* Active Agents Indicator */}
            <div className="flex items-center space-x-1">
              <span className="text-sm text-gray-600">Active:</span>
              <div className="flex -space-x-1">
                {narrativeAgents.slice(0, 4).map((agent, idx) => (
                  <div 
                    key={idx}
                    className="w-6 h-6 bg-gray-700 rounded-full border-2 border-white flex items-center justify-center"
                    title={agent.name}
                  >
                    <agent.icon className="w-3 h-3 text-white" />
                  </div>
                ))}
                <div className="w-6 h-6 bg-gray-300 rounded-full border-2 border-white flex items-center justify-center text-xs text-gray-600">
                  +2
                </div>
              </div>
            </div>
          </div>
          
          {/* AI Collaboration Input */}
          <div className="flex items-center space-x-3">
            <div className="flex-1 relative">
              <input 
                type="text" 
                placeholder="Collaborate with AI: 'Make Elena more conflicted', 'Add tension to this scene', 'Show don't tell'..."
                className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex space-x-1">
                <button className="p-1 text-gray-400 hover:text-blue-600">
                  <Mic className="w-4 h-4" />
                </button>
              </div>
            </div>
            <button className="bg-blue-600 text-white px-6 py-3 rounded-lg text-sm font-medium hover:bg-blue-700 flex items-center space-x-2">
              <Send className="w-4 h-4" />
              <span>Collaborate</span>
            </button>
            <button 
              onClick={generateStoryContent}
              className="bg-gray-800 text-white px-6 py-3 rounded-lg text-sm font-medium hover:bg-gray-900 flex items-center space-x-2"
            >
              <Wand2 className="w-4 h-4" />
              <span>Generate</span>
            </button>
          </div>
        </div>

        {/* Current AI Suggestion */}
        {currentSuggestion && (
          <div className="border-b border-gray-200 bg-blue-50 p-4">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <Sparkles className="w-4 h-4 text-blue-600" />
                  <span className="font-medium text-blue-900">AI Collaborative Suggestion</span>
                  <div className="flex -space-x-1">
                    {currentSuggestion.collaborators.map((agent, idx) => (
                      <div key={idx} className="w-4 h-4 bg-blue-500 rounded-full border border-white text-xs text-white flex items-center justify-center">
                        {agent[0]}
                      </div>
                    ))}
                  </div>
                  <span className="text-sm text-blue-700">{currentSuggestion.confidence}% confident</span>
                </div>
                <p className="text-gray-800 bg-white border border-blue-200 rounded p-3 mb-3 italic">
                  "{currentSuggestion.content}"
                </p>
                <div className="flex items-center space-x-2 text-sm">
                  <button className="bg-emerald-600 text-white px-3 py-1 rounded flex items-center space-x-1">
                    <ThumbsUp className="w-3 h-3" />
                    <span>Accept</span>
                  </button>
                  <button className="bg-amber-600 text-white px-3 py-1 rounded flex items-center space-x-1">
                    <Edit className="w-3 h-3" />
                    <span>Modify</span>
                  </button>
                  <button className="bg-blue-600 text-white px-3 py-1 rounded flex items-center space-x-1">
                    <Shuffle className="w-3 h-3" />
                    <span>Variations ({currentSuggestion.variations})</span>
                  </button>
                  <button className="bg-gray-300 text-gray-700 px-3 py-1 rounded flex items-center space-x-1">
                    <ThumbsDown className="w-3 h-3" />
                    <span>Decline</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Story Content with Enhanced AI Tracking */}
        <div className="flex-1 overflow-y-auto p-6 bg-white">
          <div className="max-w-4xl mx-auto space-y-8">
            
            {/* Chapter with Multi-Agent Analysis */}
            <div className="relative bg-white rounded-lg border border-gray-200 p-6">
              {/* Agent Activity Sidebar */}
              <div className="absolute -left-4 top-0 bottom-0 w-3 flex flex-col space-y-2 pt-6">
                <div className="w-3 h-3 bg-gray-600 rounded-full animate-pulse cursor-pointer" title="Aria analyzing character development"></div>
                <div className="w-3 h-3 bg-gray-600 rounded-full animate-pulse cursor-pointer" title="Viktor optimizing plot structure"></div>
                <div className="w-3 h-3 bg-gray-600 rounded-full cursor-pointer" title="Sage tracking theme development"></div>
                <div className="w-3 h-3 bg-gray-600 rounded-full cursor-pointer" title="Atlas monitoring setting consistency"></div>
                <div className="w-3 h-3 bg-gray-600 rounded-full animate-pulse cursor-pointer" title="Echo conducting emotional beats"></div>
              </div>
              
              <h2 className="text-3xl font-bold text-gray-900 mb-6 relative">
                Chapter 5: The Neural Revelation
                <div className="absolute -top-2 -right-2 flex space-x-1">
                  <div className="w-4 h-4 bg-gray-700 rounded-full flex items-center justify-center">
                    <Sparkles className="w-2 h-2 text-white" />
                  </div>
                </div>
              </h2>

              {/* Smart Content with Multi-Layer Analysis */}
              <div className="space-y-6">
                <div className="relative group">
                  <p className="text-gray-800 leading-relaxed text-lg relative">
                    <span className="relative inline-block">
                      <mark className="bg-yellow-200 border-2 border-yellow-400 rounded px-1">Elena's transformation was complete</mark>
                      
                      {/* Enhanced Tooltip with Multiple Agent Insights */}
                      <div className="absolute -top-48 left-1/2 transform -translate-x-1/2 bg-white border border-gray-300 rounded-xl shadow-2xl p-4 text-sm w-96 z-20 opacity-0 group-hover:opacity-100 transition-all duration-300">
                        <div className="flex items-center justify-between mb-3">
                          <span className="font-bold text-gray-900">Multi-Agent Analysis</span>
                          <div className="flex -space-x-1">
                            <div className="w-5 h-5 bg-gray-700 rounded-full border border-white flex items-center justify-center">
                              <Users className="w-3 h-3 text-white" />
                            </div>
                            <div className="w-5 h-5 bg-gray-700 rounded-full border border-white flex items-center justify-center">
                              <Flame className="w-3 h-3 text-white" />
                            </div>
                            <div className="w-5 h-5 bg-gray-700 rounded-full border border-white flex items-center justify-center">
                              <Heart className="w-3 h-3 text-white" />
                            </div>
                          </div>
                        </div>
                        
                        <div className="space-y-3">
                          <div className="p-2 bg-gray-50 border border-gray-200 rounded-lg">
                            <div className="flex items-center space-x-1 mb-1">
                              <Users className="w-3 h-3 text-gray-600" />
                              <span className="font-medium text-gray-900 text-xs">Aria (Character Guardian)</span>
                            </div>
                            <p className="text-gray-800 text-xs">Perfect character arc milestone. Shows growth from Chapter 1.</p>
                            <div className="text-emerald-600 text-xs mt-1">✓ Character consistency: 96%</div>
                          </div>
                          
                          <div className="p-2 bg-gray-50 border border-gray-200 rounded-lg">
                            <div className="flex items-center space-x-1 mb-1">
                              <Flame className="w-3 h-3 text-gray-600" />
                              <span className="font-medium text-gray-900 text-xs">Echo (Emotion Conductor)</span>
                            </div>
                            <p className="text-gray-800 text-xs">High emotional impact. Triggers reader satisfaction.</p>
                            <div className="text-blue-600 text-xs mt-1">📈 Emotional engagement: Peak</div>
                          </div>
                          
                          <div className="p-2 bg-gray-50 border border-gray-200 rounded-lg">
                            <div className="flex items-center space-x-1 mb-1">
                              <Heart className="w-3 h-3 text-gray-600" />
                              <span className="font-medium text-gray-900 text-xs">Sage (Theme Weaver)</span>
                            </div>
                            <p className="text-gray-800 text-xs">Reinforces redemption theme effectively.</p>
                            <div className="text-violet-600 text-xs mt-1">🎯 Theme strength: Strong</div>
                          </div>
                        </div>
                        
                        <div className="flex space-x-1 mt-3">
                          <button className="flex-1 px-2 py-1 bg-emerald-600 text-white rounded text-xs">Approve All</button>
                          <button className="flex-1 px-2 py-1 bg-blue-600 text-white rounded text-xs">Enhance</button>
                          <button className="flex-1 px-2 py-1 bg-gray-300 text-gray-700 rounded text-xs">Revise</button>
                        </div>
                      </div>
                    </span>
                    ; no longer the hesitant detective of mere weeks ago, but someone who could confront truth with unwavering resolve.
                  </p>
                </div>

                {/* Dialogue with Enhanced Voice Analysis */}
                <div className="ml-6 p-4 bg-gray-50 border-l-4 border-gray-400 rounded-r-lg">
                  <p className="text-gray-800 mb-3 relative group">
                    <span className="relative inline-block">
                      <mark className="bg-blue-200 border-2 border-blue-400 rounded px-1">"The cipher was never about hiding the murderer's identity,"</mark>
                      
                      {/* Voice Analysis Tooltip */}
                      <div className="absolute -top-32 left-1/2 transform -translate-x-1/2 bg-white border border-gray-300 rounded-xl shadow-xl p-3 text-xs w-80 z-20 opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center space-x-1">
                            <Volume2 className="w-3 h-3 text-gray-600" />
                            <span className="font-medium text-gray-900">Melody (Voice Conductor)</span>
                          </div>
                          <span className="text-gray-700 text-xs">Voice Match: 94%</span>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-2 mb-2">
                          <div className="p-2 bg-gray-50 border border-gray-200 rounded">
                            <div className="font-medium text-gray-900 text-xs">Tone</div>
                            <div className="text-gray-800 text-xs">Confident authority</div>
                          </div>
                          <div className="p-2 bg-gray-50 border border-gray-200 rounded">
                            <div className="font-medium text-gray-900 text-xs">Style</div>
                            <div className="text-gray-800 text-xs">Analytical clarity</div>
                          </div>
                        </div>
                        
                        <div className="text-gray-800 text-xs mb-2">
                          <strong>Character voice evolution:</strong> Shows intellectual growth while maintaining core personality.
                        </div>
                      </div>
                    </span>
                    she declared, her voice carrying the weight of revelation.
                    <span className="relative inline-block group ml-2">
                      <mark className="bg-blue-200 border-2 border-blue-400 rounded px-1">"It was designed to reveal the next victim."</mark>
                    </span>
                  </p>
                </div>

                {/* Real-time Agent Collaboration Visualization */}
                <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 bg-gray-50">
                  <div className="text-center mb-4">
                    <div className="flex items-center justify-center space-x-3 mb-3">
                      <div className="relative">
                        <div className="flex items-center space-x-1">
                          <div className="w-4 h-4 bg-gray-600 rounded-full animate-pulse"></div>
                          <div className="w-4 h-4 bg-gray-600 rounded-full animate-pulse delay-150"></div>
                          <div className="w-4 h-4 bg-gray-600 rounded-full animate-pulse delay-300"></div>
                          <div className="w-4 h-4 bg-gray-600 rounded-full animate-pulse delay-450"></div>
                        </div>
                        <div className="absolute -inset-2 border-2 border-dashed border-gray-400 rounded-full animate-spin-slow"></div>
                      </div>
                      <span className="text-gray-800 font-bold text-lg">Neural Collaboration Active</span>
                    </div>
                    
                    <div className="bg-white rounded-lg p-4 border border-gray-200 mb-4">
                      <div className="text-gray-800 font-medium mb-2">Collaborative Scene Generation</div>
                      <div className="text-sm text-gray-700 space-y-1">
                        <div>🧠 <strong>Aria:</strong> Developing Elena's confidence breakthrough</div>
                        <div>🎯 <strong>Viktor:</strong> Structuring revelation for maximum impact</div>
                        <div>❤️ <strong>Echo:</strong> Building emotional crescendo</div>
                        <div>🌍 <strong>Atlas:</strong> Maintaining Victorian atmosphere</div>
                      </div>
                    </div>
                    
                    <div className="flex justify-center space-x-3">
                      <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center space-x-2">
                        <Wand2 className="w-4 h-4" />
                        <span>Generate Next Scene</span>
                      </button>
                      <button className="bg-gray-700 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center space-x-2">
                        <Eye className="w-4 h-4" />
                        <span>Preview Outcomes</span>
                      </button>
                      <button className="bg-emerald-600 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center space-x-2">
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

        {/* Enhanced Status Bar with Neural Metrics */}
        <div className="border-t border-gray-200 bg-gray-50 px-6 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6 text-sm">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse"></div>
                <span className="text-gray-700">Neural sync: 98%</span>
              </div>
              <div className="flex items-center space-x-2">
                <Brain className="w-4 h-4 text-gray-600" />
                <span className="text-gray-700">6 agents active</span>
              </div>
              <div className="flex items-center space-x-2">
                <Gauge className="w-4 h-4 text-gray-600" />
                <span className="text-gray-700">Story velocity: Optimal</span>
              </div>
              <div className="flex items-center space-x-2">
                <Waves className="w-4 h-4 text-gray-600" />
                <span className="text-gray-700">Narrative flow: Excellent</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-4 text-sm">
              <span className="text-gray-600">Chapter 5 of 12 • 3,247 words</span>
              <button className="text-blue-600 hover:underline font-medium">Neural Analytics</button>
            </div>
          </div>
        </div>
      </div>

      {/* Agent Chat Sidebar */}
      {showAgentChat && (
        <div className="w-80 bg-white border-l border-gray-200 flex flex-col shadow-xl">
          <div className="p-4 border-b border-gray-200 bg-gray-50">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-gray-900">Agent Council Chat</h3>
              <button 
                onClick={() => setShowAgentChat(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <Minimize2 className="w-4 h-4" />
              </button>
            </div>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {agentDiscussion.map((msg, idx) => (
              <div key={idx} className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                <div className="flex items-center space-x-2 mb-1">
                  <div className="w-4 h-4 bg-gray-600 rounded-full"></div>
                  <span className="font-medium text-gray-900 text-sm">{msg.agent}</span>
                  <span className="text-xs text-gray-500">
                    {Math.floor((Date.now() - msg.timestamp) / 1000)}s ago
                  </span>
                </div>
                <p className="text-sm text-gray-700">{msg.message}</p>
              </div>
            ))}
          </div>
          
          <div className="p-4 border-t border-gray-200">
            <div className="flex space-x-2">
              <input 
                type="text" 
                placeholder="Join the discussion..."
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm"
              />
              <button className="bg-blue-600 text-white px-3 py-2 rounded-lg">
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EnhancedLivingStoryInterface;