import React, { useState, useCallback, useMemo } from 'react';
import { 
  Target, Microscope, TrendingUp, AlertTriangle, CheckCircle, 
  Eye, Brain, Layers, GitBranch, BarChart3, PieChart, LineChart,
  MessageSquare, User, Bot, Clock, Zap, Star, Heart, Award,
  Settings, Filter, Search, Download, Share2, Bookmark, Flag,
  ArrowRight, ArrowLeft, ChevronDown, ChevronUp, MoreHorizontal,
  FileText, Code, Database, Network, Gauge, Activity, Radar,
  Shield, Lock, Unlock, Lightbulb, Sparkles, Hash, Tag,
  Workflow, TreePine, Navigation, Map, Fingerprint, Monitor,
  RefreshCw, ExternalLink, Copy, Edit, Trash2, Plus, X,
  Calendar, Info, HelpCircle, Users, Globe, Camera, Headphones
} from 'lucide-react';
import { 
  LineChart as RechartsLineChart, Line, XAxis, YAxis, CartesianGrid, 
  Tooltip, Legend, ResponsiveContainer, BarChart, Bar, PieChart as RechartsPieChart, 
  Pie, Cell, Area, AreaChart, RadarChart, PolarGrid, PolarAngleAxis, 
  PolarRadiusAxis, Radar as RechartsRadar, ScatterChart, Scatter,
  ComposedChart, Treemap, Sankey, FunnelChart, Funnel
} from 'recharts';

const ConversationAnalysisPlatform = () => {
  const [activeAnalysisView, setActiveAnalysisView] = useState('overview');
  const [selectedConversationId, setSelectedConversationId] = useState('conv_react_advanced');
  const [selectedCritique, setSelectedCritique] = useState('methodological');
  const [analysisDepth, setAnalysisDepth] = useState('comprehensive');
  const [comparisonMode, setComparisonMode] = useState(false);
  const [selectedFramework, setSelectedFramework] = useState('socratic');
  const [realTimeAnalysis, setRealTimeAnalysis] = useState(true);
  const [expertiseLevel, setExpertiseLevel] = useState('advanced');
  const [showMethodology, setShowMethodology] = useState(true);
  const [activeMetrics, setActiveMetrics] = useState(['quality', 'coherence', 'depth', 'innovation']);
  const [filterCriteria, setFilterCriteria] = useState('all');
  const [selectedTimeframe, setSelectedTimeframe] = useState('conversation');

  // Enhanced conversation data with detailed analysis metadata
  const conversationAnalysisData = {
    'conv_react_advanced': {
      id: 'conv_react_advanced',
      title: 'React Architecture & Performance',
      totalScore: 94.2,
      analysisTimestamp: '2025-01-15T16:45:00Z',
      methodology: {
        framework: 'Multi-dimensional Conversation Quality Assessment (MCQA)',
        version: '3.2.1',
        baseline: 'Expert Human Benchmark',
        confidence: 0.96,
        validationMethod: 'Cross-platform comparison + Expert review'
      },
      criticalAnalysis: {
        strengths: [
          'Comprehensive architectural coverage with practical examples',
          'Progressive complexity building from basic to advanced concepts',
          'Strong integration of theory with implementation details',
          'Excellent use of code examples and visual formatting',
          'Demonstrates deep understanding of React ecosystem'
        ],
        weaknesses: [
          'Could benefit from more discussion of edge cases and failure modes',
          'Limited coverage of testing strategies for complex architectures',
          'Performance monitoring examples lack real-world scaling considerations',
          'Missing discussion of team adoption and migration strategies'
        ],
        recommendations: [
          'Expand on debugging methodologies for complex React applications',
          'Include more comparative analysis with alternative approaches',
          'Add discussion of long-term maintenance and technical debt',
          'Incorporate accessibility considerations in architectural decisions'
        ]
      },
      qualityMetrics: {
        technical_accuracy: 0.97,
        completeness: 0.91,
        clarity: 0.95,
        innovation: 0.89,
        practical_utility: 0.96,
        knowledge_depth: 0.93,
        pedagogical_effectiveness: 0.94,
        code_quality: 0.98,
        architectural_soundness: 0.95,
        scalability_consideration: 0.88
      },
      conversationFlow: {
        coherence: 0.96,
        progression_logic: 0.94,
        topic_transitions: 0.92,
        context_maintenance: 0.97,
        user_engagement: 0.93,
        response_relevance: 0.95,
        information_density: 0.89,
        cognitive_load: 0.86
      },
      linguisticAnalysis: {
        readability_score: 87.3,
        technical_vocabulary_appropriateness: 0.94,
        sentence_complexity: 'optimal',
        information_hierarchy: 'excellent',
        code_documentation_quality: 0.96,
        explanation_clarity: 0.95,
        example_relevance: 0.97
      },
      knowledgeGraph: {
        concepts_introduced: 23,
        concept_connections: 47,
        knowledge_density: 0.91,
        conceptual_depth: 'expert',
        interdisciplinary_links: 8,
        prerequisite_coverage: 0.89,
        advanced_topic_integration: 0.92
      },
      comparativeBenchmarks: {
        vs_documentation: { coverage: 1.34, depth: 1.67, practical_utility: 1.23 },
        vs_tutorials: { comprehensiveness: 1.89, technical_depth: 1.45, real_world_applicability: 1.78 },
        vs_expert_human: { knowledge_breadth: 0.94, explanation_quality: 0.97, innovation: 0.91 },
        vs_other_llms: { accuracy: 1.12, completeness: 1.08, pedagogical_approach: 1.15 }
      },
      riskAssessment: {
        outdated_information: 'low',
        technical_inaccuracies: 'very_low',
        oversimplification: 'low',
        missing_context: 'medium',
        bias_indicators: 'minimal',
        harmful_advice: 'none'
      },
      improvementSuggestions: {
        immediate: [
          'Add performance benchmarking examples with real metrics',
          'Include discussion of common anti-patterns and their solutions',
          'Expand on team collaboration aspects of architecture decisions'
        ],
        strategic: [
          'Develop framework for architecture decision documentation',
          'Create comprehensive testing strategy guidelines',
          'Build migration playbooks for legacy system modernization'
        ],
        experimental: [
          'Explore AI-assisted architecture optimization techniques',
          'Investigate emerging React patterns and their applicability',
          'Develop automated architecture quality assessment tools'
        ]
      }
    }
  };

  // Analysis frameworks and methodologies
  const analysisFrameworks = {
    socratic: {
      id: 'socratic',
      name: 'Socratic Questioning Framework',
      description: 'Deep inquiry-based analysis focusing on assumptions, evidence, and reasoning',
      dimensions: ['assumption_identification', 'evidence_evaluation', 'logical_consistency', 'alternative_perspectives'],
      methodology: 'Systematic questioning approach derived from classical Socratic method',
      strengths: 'Excellent for uncovering implicit assumptions and logical gaps',
      applications: ['Critical thinking assessment', 'Reasoning quality evaluation', 'Knowledge depth analysis']
    },
    bloom: {
      id: 'bloom',
      name: 'Bloom\'s Taxonomy Cognitive Assessment',
      description: 'Hierarchical evaluation of cognitive complexity and learning outcomes',
      dimensions: ['remember', 'understand', 'apply', 'analyze', 'evaluate', 'create'],
      methodology: 'Educational psychology framework for assessing cognitive engagement levels',
      strengths: 'Structured approach to evaluating learning progression and complexity',
      applications: ['Educational content evaluation', 'Cognitive load assessment', 'Learning outcome measurement']
    },
    expert_systems: {
      id: 'expert_systems',
      name: 'Expert Systems Validation',
      description: 'Comparison against domain expert knowledge and professional standards',
      dimensions: ['domain_expertise', 'professional_standards', 'industry_best_practices', 'cutting_edge_knowledge'],
      methodology: 'Benchmarking against established expert knowledge bases and current practices',
      strengths: 'High validity for technical accuracy and professional relevance',
      applications: ['Technical content validation', 'Professional advice assessment', 'Industry standard compliance']
    },
    multimodal: {
      id: 'multimodal',
      name: 'Multimodal Analysis Framework',
      description: 'Comprehensive analysis across content, structure, interaction, and outcome dimensions',
      dimensions: ['content_quality', 'structural_coherence', 'interaction_effectiveness', 'outcome_achievement'],
      methodology: 'Integrated approach combining multiple analytical perspectives',
      strengths: 'Holistic view capturing complex conversation dynamics',
      applications: ['Comprehensive conversation evaluation', 'Platform comparison', 'User experience optimization']
    }
  };

  // Detailed critique categories
  const critiqueCategories = {
    methodological: {
      title: 'Methodological Rigor',
      description: 'Analysis of approach, reasoning, and systematic thinking',
      metrics: ['logical_consistency', 'evidence_based_reasoning', 'systematic_approach', 'methodological_soundness'],
      weight: 0.25
    },
    technical: {
      title: 'Technical Accuracy & Depth',
      description: 'Evaluation of technical correctness and expertise demonstration',
      metrics: ['factual_accuracy', 'technical_depth', 'current_best_practices', 'implementation_feasibility'],
      weight: 0.30
    },
    pedagogical: {
      title: 'Educational Effectiveness',
      description: 'Assessment of teaching quality and knowledge transfer',
      metrics: ['explanation_clarity', 'example_quality', 'progressive_complexity', 'learner_engagement'],
      weight: 0.25
    },
    innovation: {
      title: 'Innovation & Creativity',
      description: 'Evaluation of novel insights and creative problem-solving',
      metrics: ['novel_perspectives', 'creative_solutions', 'synthesis_quality', 'forward_thinking'],
      weight: 0.20
    }
  };

  // Performance analytics data
  const performanceAnalytics = {
    qualityTrends: [
      { timestamp: '10:30', technical: 85, pedagogical: 90, innovation: 78, overall: 84 },
      { timestamp: '10:35', technical: 92, pedagogical: 94, innovation: 85, overall: 90 },
      { timestamp: '10:40', technical: 96, pedagogical: 95, innovation: 89, overall: 93 },
      { timestamp: '10:45', technical: 97, pedagogical: 96, innovation: 91, overall: 95 }
    ],
    dimensionalAnalysis: [
      { dimension: 'Technical Accuracy', score: 97, benchmark: 85, target: 95 },
      { dimension: 'Clarity', score: 95, benchmark: 80, target: 90 },
      { dimension: 'Completeness', score: 91, benchmark: 75, target: 88 },
      { dimension: 'Innovation', score: 89, benchmark: 70, target: 85 },
      { dimension: 'Practical Utility', score: 96, benchmark: 82, target: 92 }
    ],
    cognitiveComplexity: [
      { level: 'Remember', percentage: 15, color: '#e3f2fd' },
      { level: 'Understand', percentage: 25, color: '#bbdefb' },
      { level: 'Apply', percentage: 30, color: '#90caf9' },
      { level: 'Analyze', percentage: 20, color: '#64b5f6' },
      { level: 'Evaluate', percentage: 7, color: '#42a5f5' },
      { level: 'Create', percentage: 3, color: '#2196f3' }
    ],
    riskAssessment: [
      { category: 'Technical Risk', level: 15, threshold: 25, status: 'safe' },
      { category: 'Accuracy Risk', level: 8, threshold: 20, status: 'safe' },
      { category: 'Bias Risk', level: 12, threshold: 30, status: 'safe' },
      { category: 'Completeness Risk', level: 22, threshold: 35, status: 'moderate' }
    ]
  };

  const OverviewDashboard = () => (
    <div className="space-y-6">
      {/* Key Performance Indicators */}
      <div className="grid grid-cols-5 gap-4">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 border border-blue-200">
          <div className="flex items-center justify-between mb-2">
            <Target size={20} className="text-blue-600" />
            <span className="text-xs bg-blue-200 text-blue-800 px-2 py-1 rounded-full">Excellent</span>
          </div>
          <div className="text-2xl font-bold text-blue-700">94.2</div>
          <div className="text-sm text-blue-600">Overall Quality Score</div>
          <div className="text-xs text-blue-500 mt-1">↗ +3.2% vs benchmark</div>
        </div>

        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-4 border border-green-200">
          <div className="flex items-center justify-between mb-2">
            <Brain size={20} className="text-green-600" />
            <span className="text-xs bg-green-200 text-green-800 px-2 py-1 rounded-full">Expert</span>
          </div>
          <div className="text-2xl font-bold text-green-700">97%</div>
          <div className="text-sm text-green-600">Technical Accuracy</div>
          <div className="text-xs text-green-500 mt-1">Above expert level</div>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-4 border border-purple-200">
          <div className="flex items-center justify-between mb-2">
            <Lightbulb size={20} className="text-purple-600" />
            <span className="text-xs bg-purple-200 text-purple-800 px-2 py-1 rounded-full">High</span>
          </div>
          <div className="text-2xl font-bold text-purple-700">89%</div>
          <div className="text-sm text-purple-600">Innovation Index</div>
          <div className="text-xs text-purple-500 mt-1">Novel insights detected</div>
        </div>

        <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-4 border border-orange-200">
          <div className="flex items-center justify-between mb-2">
            <Shield size={20} className="text-orange-600" />
            <span className="text-xs bg-orange-200 text-orange-800 px-2 py-1 rounded-full">Low</span>
          </div>
          <div className="text-2xl font-bold text-orange-700">14%</div>
          <div className="text-sm text-orange-600">Risk Score</div>
          <div className="text-xs text-orange-500 mt-1">Well within safe limits</div>
        </div>

        <div className="bg-gradient-to-br from-pink-50 to-pink-100 rounded-xl p-4 border border-pink-200">
          <div className="flex items-center justify-between mb-2">
            <Activity size={20} className="text-pink-600" />
            <span className="text-xs bg-pink-200 text-pink-800 px-2 py-1 rounded-full">Active</span>
          </div>
          <div className="text-2xl font-bold text-pink-700">96%</div>
          <div className="text-sm text-pink-600">Confidence Level</div>
          <div className="text-xs text-pink-500 mt-1">High analytical certainty</div>
        </div>
      </div>

      {/* Quality Evolution and Dimensional Analysis */}
      <div className="grid grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
          <h3 className="font-semibold text-slate-900 mb-4 flex items-center">
            <TrendingUp size={18} className="mr-2 text-blue-600" />
            Quality Evolution Throughout Conversation
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <RechartsLineChart data={performanceAnalytics.qualityTrends}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="timestamp" stroke="#64748b" fontSize={12} />
              <YAxis stroke="#64748b" fontSize={12} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                }}
              />
              <Legend />
              <Line type="monotone" dataKey="technical" stroke="#3b82f6" strokeWidth={2} dot={{ fill: '#3b82f6', strokeWidth: 2 }} />
              <Line type="monotone" dataKey="pedagogical" stroke="#10b981" strokeWidth={2} dot={{ fill: '#10b981', strokeWidth: 2 }} />
              <Line type="monotone" dataKey="innovation" stroke="#8b5cf6" strokeWidth={2} dot={{ fill: '#8b5cf6', strokeWidth: 2 }} />
              <Line type="monotone" dataKey="overall" stroke="#f59e0b" strokeWidth={3} dot={{ fill: '#f59e0b', strokeWidth: 2 }} />
            </RechartsLineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
          <h3 className="font-semibold text-slate-900 mb-4 flex items-center">
            <Radar size={18} className="mr-2 text-purple-600" />
            Dimensional Performance Analysis
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <RadarChart data={performanceAnalytics.dimensionalAnalysis}>
              <PolarGrid stroke="#e2e8f0" />
              <PolarAngleAxis dataKey="dimension" tick={{ fontSize: 11, fill: '#64748b' }} />
              <PolarRadiusAxis 
                angle={90} 
                domain={[0, 100]} 
                tick={{ fontSize: 10, fill: '#64748b' }}
              />
              <RechartsRadar name="Score" dataKey="score" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.3} strokeWidth={2} />
              <RechartsRadar name="Benchmark" dataKey="benchmark" stroke="#64748b" strokeDasharray="5 5" strokeWidth={1} />
              <RechartsRadar name="Target" dataKey="target" stroke="#10b981" strokeDasharray="3 3" strokeWidth={1} />
              <Tooltip />
              <Legend />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Cognitive Complexity and Risk Assessment */}
      <div className="grid grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
          <h3 className="font-semibold text-slate-900 mb-4 flex items-center">
            <Layers size={18} className="mr-2 text-indigo-600" />
            Cognitive Complexity Distribution (Bloom's Taxonomy)
          </h3>
          <ResponsiveContainer width="100%" height={200}>
            <RechartsPieChart>
              <Pie
                data={performanceAnalytics.cognitiveComplexity}
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#8884d8"
                dataKey="percentage"
                label={({ level, percentage }) => `${level}: ${percentage}%`}
                labelLine={false}
              >
                {performanceAnalytics.cognitiveComplexity.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </RechartsPieChart>
          </ResponsiveContainer>
          <div className="mt-4 text-sm text-slate-600">
            <p>Balanced distribution across cognitive levels with strong emphasis on application and analysis.</p>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
          <h3 className="font-semibold text-slate-900 mb-4 flex items-center">
            <Shield size={18} className="mr-2 text-red-600" />
            Risk Assessment Matrix
          </h3>
          <div className="space-y-3">
            {performanceAnalytics.riskAssessment.map((risk, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${
                    risk.status === 'safe' ? 'bg-green-500' :
                    risk.status === 'moderate' ? 'bg-yellow-500' : 'bg-red-500'
                  }`}></div>
                  <span className="text-sm font-medium text-slate-700">{risk.category}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-24 bg-slate-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${
                        risk.status === 'safe' ? 'bg-green-500' :
                        risk.status === 'moderate' ? 'bg-yellow-500' : 'bg-red-500'
                      }`}
                      style={{ width: `${(risk.level / risk.threshold) * 100}%` }}
                    ></div>
                  </div>
                  <span className="text-xs text-slate-600 w-8">{risk.level}%</span>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 p-3 bg-green-50 rounded-lg">
            <div className="flex items-center space-x-2">
              <CheckCircle size={16} className="text-green-600" />
              <span className="text-sm font-medium text-green-800">Low Risk Profile</span>
            </div>
            <p className="text-xs text-green-700 mt-1">All risk indicators are within acceptable thresholds.</p>
          </div>
        </div>
      </div>
    </div>
  );

  const DetailedAnalysisView = () => {
    const analysis = conversationAnalysisData[selectedConversationId];
    
    return (
      <div className="space-y-6">
        {/* Analysis Header */}
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h2 className="text-xl font-bold text-slate-900">{analysis.title}</h2>
              <p className="text-slate-600 mt-1">Comprehensive Analytical Assessment</p>
            </div>
            <div className="flex items-center space-x-3">
              <span className="text-2xl font-bold text-blue-600">{analysis.totalScore}</span>
              <div className="text-right">
                <div className="text-sm font-medium text-slate-900">Overall Score</div>
                <div className="text-xs text-slate-500">Confidence: {Math.round(analysis.methodology.confidence * 100)}%</div>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-4 text-sm">
            <div>
              <span className="font-medium text-slate-700">Analysis Framework:</span>
              <div className="text-slate-600">{analysis.methodology.framework}</div>
            </div>
            <div>
              <span className="font-medium text-slate-700">Validation Method:</span>
              <div className="text-slate-600">{analysis.methodology.validationMethod}</div>
            </div>
            <div>
              <span className="font-medium text-slate-700">Baseline:</span>
              <div className="text-slate-600">{analysis.methodology.baseline}</div>
            </div>
          </div>
        </div>

        {/* Critical Analysis */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
            <h3 className="font-semibold text-slate-900 mb-4 flex items-center">
              <CheckCircle size={18} className="mr-2 text-green-600" />
              Identified Strengths
            </h3>
            <ul className="space-y-2">
              {analysis.criticalAnalysis.strengths.map((strength, index) => (
                <li key={index} className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-sm text-slate-700">{strength}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
            <h3 className="font-semibold text-slate-900 mb-4 flex items-center">
              <AlertTriangle size={18} className="mr-2 text-yellow-600" />
              Areas for Improvement
            </h3>
            <ul className="space-y-2">
              {analysis.criticalAnalysis.weaknesses.map((weakness, index) => (
                <li key={index} className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-sm text-slate-700">{weakness}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
            <h3 className="font-semibold text-slate-900 mb-4 flex items-center">
              <Lightbulb size={18} className="mr-2 text-blue-600" />
              Strategic Recommendations
            </h3>
            <ul className="space-y-2">
              {analysis.criticalAnalysis.recommendations.map((rec, index) => (
                <li key={index} className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-sm text-slate-700">{rec}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Quality Metrics Deep Dive */}
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
          <h3 className="font-semibold text-slate-900 mb-4 flex items-center">
            <Gauge size={18} className="mr-2 text-purple-600" />
            Detailed Quality Metrics Analysis
          </h3>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-slate-800 mb-3">Core Quality Dimensions</h4>
              <div className="space-y-3">
                {Object.entries(analysis.qualityMetrics).slice(0, 5).map(([metric, score]) => (
                  <div key={metric}>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm text-slate-600 capitalize">
                        {metric.replace(/_/g, ' ')}
                      </span>
                      <span className="text-sm font-medium">{Math.round(score * 100)}%</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full transition-all duration-500 ${
                          score >= 0.95 ? 'bg-gradient-to-r from-green-400 to-green-600' :
                          score >= 0.9 ? 'bg-gradient-to-r from-blue-400 to-blue-600' :
                          score >= 0.8 ? 'bg-gradient-to-r from-yellow-400 to-yellow-600' : 
                          'bg-gradient-to-r from-red-400 to-red-600'
                        }`}
                        style={{ width: `${score * 100}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-medium text-slate-800 mb-3">Key Metrics</h4>
              <div className="space-y-3">
                {Object.entries(analysis.qualityMetrics).slice(5).map(([metric, score]) => (
                  <div key={metric}>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm text-slate-600 capitalize">
                        {metric.replace(/_/g, ' ')}
                      </span>
                      <span className="text-sm font-medium">{Math.round(score * 100)}%</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full transition-all duration-500 ${
                          score >= 0.95 ? 'bg-gradient-to-r from-green-400 to-green-600' :
                          score >= 0.9 ? 'bg-gradient-to-r from-blue-400 to-blue-600' :
                          score >= 0.8 ? 'bg-gradient-to-r from-yellow-400 to-yellow-600' : 
                          'bg-gradient-to-r from-red-400 to-red-600'
                        }`}
                        style={{ width: `${score * 100}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Comparative Benchmarks */}
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
          <h3 className="font-semibold text-slate-900 mb-4 flex items-center">
            <BarChart3 size={18} className="mr-2 text-indigo-600" />
            Comparative Performance Benchmarks
          </h3>
          <div className="grid grid-cols-2 gap-6">
            {Object.entries(analysis.comparativeBenchmarks).map(([benchmark, metrics]) => (
              <div key={benchmark} className="border border-slate-200 rounded-lg p-4">
                <h4 className="font-medium text-slate-800 mb-3 capitalize">
                  {benchmark.replace(/_/g, ' ')}
                </h4>
                <div className="space-y-2">
                  {Object.entries(metrics).map(([metric, value]) => (
                    <div key={metric} className="flex justify-between items-center">
                      <span className="text-sm text-slate-600 capitalize">
                        {metric.replace(/_/g, ' ')}
                      </span>
                      <div className="flex items-center space-x-2">
                        <span className={`text-sm font-medium ${
                          value >= 1.2 ? 'text-green-600' :
                          value >= 1.0 ? 'text-blue-600' :
                          value >= 0.8 ? 'text-yellow-600' : 'text-red-600'
                        }`}>
                          {value.toFixed(2)}x
                        </span>
                        <div className={`w-2 h-2 rounded-full ${
                          value >= 1.2 ? 'bg-green-500' :
                          value >= 1.0 ? 'bg-blue-500' :
                          value >= 0.8 ? 'bg-yellow-500' : 'bg-red-500'
                        }`}></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const MethodologicalFrameworkView = () => (
    <div className="space-y-6">
      {/* Framework Selection */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
        <h3 className="font-semibold text-slate-900 mb-4 flex items-center">
          <Settings size={18} className="mr-2 text-blue-600" />
          Analysis Framework Configuration
        </h3>
        <div className="grid grid-cols-2 gap-4">
          {Object.entries(analysisFrameworks).map(([id, framework]) => (
            <div
              key={id}
              onClick={() => setSelectedFramework(id)}
              className={`p-4 rounded-lg border cursor-pointer transition-all ${
                selectedFramework === id 
                  ? 'border-blue-500 bg-blue-50 shadow-sm' 
                  : 'border-slate-200 hover:border-slate-300'
              }`}
            >
              <h4 className="font-medium text-slate-900 mb-2">{framework.name}</h4>
              <p className="text-sm text-slate-600 mb-3">{framework.description}</p>
              <div className="text-xs text-slate-500">
                <strong>Methodology:</strong> {framework.methodology}
              </div>
              <div className="text-xs text-slate-500 mt-1">
                <strong>Applications:</strong> {framework.applications.join(', ')}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Selected Framework Details */}
      {selectedFramework && (
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
          <h3 className="font-semibold text-slate-900 mb-4 flex items-center">
            <Microscope size={18} className="mr-2 text-purple-600" />
            {analysisFrameworks[selectedFramework].name} - Detailed Analysis
          </h3>
          
          <div className="grid grid-cols-3 gap-6 mb-6">
            <div>
              <h4 className="font-medium text-slate-800 mb-2">Analysis Dimensions</h4>
              <ul className="space-y-1">
                {analysisFrameworks[selectedFramework].dimensions.map((dimension, index) => (
                  <li key={index} className="text-sm text-slate-600 capitalize">
                    • {dimension.replace(/_/g, ' ')}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-slate-800 mb-2">Methodology</h4>
              <p className="text-sm text-slate-600">{analysisFrameworks[selectedFramework].methodology}</p>
            </div>
            <div>
              <h4 className="font-medium text-slate-800 mb-2">Key Strengths</h4>
              <p className="text-sm text-slate-600">{analysisFrameworks[selectedFramework].strengths}</p>
            </div>
          </div>

          {selectedFramework === 'socratic' && (
            <div className="bg-blue-50 rounded-lg p-4">
              <h4 className="font-medium text-blue-900 mb-3">Socratic Analysis Applied</h4>
              <div className="space-y-3 text-sm">
                <div>
                  <strong className="text-blue-800">What assumptions underlie the architectural recommendations?</strong>
                  <p className="text-blue-700 mt-1">The conversation assumes modern React development practices, team scaling needs, and performance-first architecture.</p>
                </div>
                <div>
                  <strong className="text-blue-800">What evidence supports the suggested patterns?</strong>
                  <p className="text-blue-700 mt-1">Code examples demonstrate practical implementation, industry best practices are cited, performance implications are discussed.</p>
                </div>
                <div>
                  <strong className="text-blue-800">Are there alternative perspectives not considered?</strong>
                  <p className="text-blue-700 mt-1">Could explore more micro-frontend approaches, different state management philosophies, or framework-agnostic patterns.</p>
                </div>
              </div>
            </div>
          )}

          {selectedFramework === 'bloom' && (
            <div className="bg-green-50 rounded-lg p-4">
              <h4 className="font-medium text-green-900 mb-3">Bloom's Taxonomy Assessment</h4>
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div>
                  <strong className="text-green-800">Lower-Order Thinking</strong>
                  <ul className="text-green-700 mt-1 space-y-1">
                    <li>• Remember: React concepts</li>
                    <li>• Understand: Pattern principles</li>
                    <li>• Apply: Code examples</li>
                  </ul>
                </div>
                <div>
                  <strong className="text-green-800">Higher-Order Thinking</strong>
                  <ul className="text-green-700 mt-1 space-y-1">
                    <li>• Analyze: Architecture trade-offs</li>
                    <li>• Evaluate: Pattern suitability</li>
                    <li>• Create: Custom solutions</li>
                  </ul>
                </div>
                <div>
                  <strong className="text-green-800">Cognitive Distribution</strong>
                  <p className="text-green-700 mt-1">Well-balanced across all levels with strong emphasis on application and analysis phases.</p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Methodology Validation */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
        <h3 className="font-semibold text-slate-900 mb-4 flex items-center">
          <Shield size={18} className="mr-2 text-green-600" />
          Methodology Validation & Reliability
        </h3>
        <div className="grid grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium text-slate-800 mb-3">Validation Metrics</h4>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-600">Inter-rater Reliability</span>
                <span className="text-sm font-medium text-green-600">κ = 0.89</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-600">Test-retest Reliability</span>
                <span className="text-sm font-medium text-green-600">r = 0.94</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-600">Content Validity</span>
                <span className="text-sm font-medium text-blue-600">CVR = 0.92</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-600">Construct Validity</span>
                <span className="text-sm font-medium text-blue-600">CFI = 0.96</span>
              </div>
            </div>
          </div>
          <div>
            <h4 className="font-medium text-slate-800 mb-3">Confidence Intervals</h4>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-slate-600">Overall Score (95% CI)</span>
                  <span className="text-sm font-medium">91.7 - 96.8</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2">
                  <div className="bg-blue-500 h-2 rounded-full" style={{ width: '94%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-slate-600">Technical Accuracy (95% CI)</span>
                  <span className="text-sm font-medium">94.2 - 99.1</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: '97%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const ImprovementRecommendationsView = () => {
    const analysis = conversationAnalysisData[selectedConversationId];
    
    return (
      <div className="space-y-6">
        {/* Improvement Strategy Overview */}
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
          <h3 className="font-semibold text-slate-900 mb-4 flex items-center">
            <Target size={18} className="mr-2 text-blue-600" />
            Strategic Improvement Roadmap
          </h3>
          <div className="grid grid-cols-3 gap-6">
            <div className="border-l-4 border-green-500 pl-4">
              <h4 className="font-medium text-green-800 mb-2">Immediate Actions (0-2 weeks)</h4>
              <ul className="space-y-2">
                {analysis.improvementSuggestions.immediate.map((suggestion, index) => (
                  <li key={index} className="text-sm text-slate-700 flex items-start space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span>{suggestion}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="border-l-4 border-blue-500 pl-4">
              <h4 className="font-medium text-blue-800 mb-2">Strategic Initiatives (1-3 months)</h4>
              <ul className="space-y-2">
                {analysis.improvementSuggestions.strategic.map((suggestion, index) => (
                  <li key={index} className="text-sm text-slate-700 flex items-start space-x-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span>{suggestion}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="border-l-4 border-purple-500 pl-4">
              <h4 className="font-medium text-purple-800 mb-2">Experimental Research (3+ months)</h4>
              <ul className="space-y-2">
                {analysis.improvementSuggestions.experimental.map((suggestion, index) => (
                  <li key={index} className="text-sm text-slate-700 flex items-start space-x-2">
                    <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span>{suggestion}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Gap Analysis */}
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
          <h3 className="font-semibold text-slate-900 mb-4 flex items-center">
            <AlertTriangle size={18} className="mr-2 text-yellow-600" />
            Knowledge Gap Analysis
          </h3>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-slate-800 mb-3">Identified Gaps</h4>
              <div className="space-y-3">
                <div className="bg-yellow-50 p-3 rounded-lg">
                  <div className="font-medium text-yellow-800">Testing Strategy Coverage</div>
                  <div className="text-sm text-yellow-700 mt-1">Limited discussion of testing approaches for complex architectures</div>
                  <div className="text-xs text-yellow-600 mt-1">Impact: Medium | Priority: High</div>
                </div>
                <div className="bg-orange-50 p-3 rounded-lg">
                  <div className="font-medium text-orange-800">Migration Methodologies</div>
                  <div className="text-sm text-orange-700 mt-1">Lacks detailed migration strategies for legacy systems</div>
                  <div className="text-xs text-orange-600 mt-1">Impact: High | Priority: Medium</div>
                </div>
                <div className="bg-red-50 p-3 rounded-lg">
                  <div className="font-medium text-red-800">Accessibility Integration</div>
                  <div className="text-sm text-red-700 mt-1">Missing accessibility considerations in architectural decisions</div>
                  <div className="text-xs text-red-600 mt-1">Impact: High | Priority: High</div>
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-medium text-slate-800 mb-3">Recommended Resources</h4>
              <div className="space-y-3">
                <div className="border border-slate-200 p-3 rounded-lg">
                  <div className="font-medium text-slate-800">Testing at Scale</div>
                  <div className="text-sm text-slate-600 mt-1">Kent C. Dodds testing principles, React Testing Library best practices</div>
                  <div className="text-xs text-blue-600 mt-1">📚 Resources available</div>
                </div>
                <div className="border border-slate-200 p-3 rounded-lg">
                  <div className="font-medium text-slate-800">Migration Patterns</div>
                  <div className="text-sm text-slate-600 mt-1">Strangler Fig pattern, Micro-frontend migration strategies</div>
                  <div className="text-xs text-blue-600 mt-1">🔗 Framework documentation</div>
                </div>
                <div className="border border-slate-200 p-3 rounded-lg">
                  <div className="font-medium text-slate-800">Accessible Architecture</div>
                  <div className="text-sm text-slate-600 mt-1">WCAG 2.1 AA compliance, inclusive design principles</div>
                  <div className="text-xs text-blue-600 mt-1">📋 Standards & guidelines</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Performance Optimization Opportunities */}
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
          <h3 className="font-semibold text-slate-900 mb-4 flex items-center">
            <Zap size={18} className="mr-2 text-purple-600" />
            Performance Optimization Opportunities
          </h3>
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-blue-800">Response Clarity</span>
                  <span className="text-sm bg-blue-200 text-blue-800 px-2 py-1 rounded">+3%</span>
                </div>
                <div className="text-sm text-blue-700">Enhanced code commenting and explanation flow</div>
                <div className="w-full bg-blue-200 rounded-full h-2 mt-2">
                  <div className="bg-blue-500 h-2 rounded-full" style={{ width: '85%' }}></div>
                </div>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-green-800">Practical Examples</span>
                  <span className="text-sm bg-green-200 text-green-800 px-2 py-1 rounded">+5%</span>
                </div>
                <div className="text-sm text-green-700">More real-world implementation scenarios</div>
                <div className="w-full bg-green-200 rounded-full h-2 mt-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: '78%' }}></div>
                </div>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-purple-800">Innovation Factor</span>
                  <span className="text-sm bg-purple-200 text-purple-800 px-2 py-1 rounded">+7%</span>
                </div>
                <div className="text-sm text-purple-700">Emerging patterns and cutting-edge techniques</div>
                <div className="w-full bg-purple-200 rounded-full h-2 mt-2">
                  <div className="bg-purple-500 h-2 rounded-full" style={{ width: '72%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Plan Template */}
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
          <h3 className="font-semibold text-slate-900 mb-4 flex items-center">
            <FileText size={18} className="mr-2 text-indigo-600" />
            Personalized Action Plan
          </h3>
          <div className="space-y-4">
            <div className="bg-indigo-50 p-4 rounded-lg">
              <h4 className="font-medium text-indigo-800 mb-2">Recommended Next Steps</h4>
              <ol className="list-decimal list-inside space-y-2 text-sm text-indigo-700">
                <li>Implement real-world performance benchmarking examples with actual metrics</li>
                <li>Develop comprehensive testing strategy guidelines for each architectural pattern</li>
                <li>Create accessibility checklist integrated with architectural decision process</li>
                <li>Establish migration playbooks for common legacy system scenarios</li>
                <li>Research and document emerging React patterns and their trade-offs</li>
              </ol>
            </div>
            <div className="flex space-x-3">
              <button className="flex-1 bg-indigo-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-indigo-700 transition-colors">
                Export Action Plan
              </button>
              <button className="flex-1 bg-slate-100 text-slate-700 py-2 px-4 rounded-lg font-medium hover:bg-slate-200 transition-colors">
                Schedule Follow-up
              </button>
              <button className="flex-1 bg-green-100 text-green-700 py-2 px-4 rounded-lg font-medium hover:bg-green-200 transition-colors">
                Track Progress
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="h-screen flex flex-col bg-slate-50">
      {/* Main Header */}
      <div className="h-14 bg-white border-b border-slate-200 flex items-center px-6 shadow-sm">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-br from-purple-500 via-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
            <Microscope size={20} className="text-white" />
          </div>
          <h1 className="text-lg font-bold text-slate-900">Conversation Analysis & Critique Platform</h1>
          <span className="text-xs bg-gradient-to-r from-purple-100 to-blue-100 text-indigo-700 px-2 py-1 rounded-full font-medium">
            Deep Analysis Engine
          </span>
        </div>
        
        <div className="flex-1"></div>
        
        <div className="flex items-center space-x-3">
          <select
            value={analysisDepth}
            onChange={(e) => setAnalysisDepth(e.target.value)}
            className="text-sm border border-slate-300 rounded px-3 py-1"
          >
            <option value="overview">Overview Analysis</option>
            <option value="comprehensive">Comprehensive Analysis</option>
            <option value="expert">Expert-Level Deep Dive</option>
          </select>
          
          <button
            onClick={() => setRealTimeAnalysis(!realTimeAnalysis)}
            className={`flex items-center space-x-2 px-3 py-1 rounded text-sm ${
              realTimeAnalysis 
                ? 'bg-green-100 text-green-700' 
                : 'bg-slate-100 text-slate-600'
            }`}
          >
            <Activity size={14} />
            <span>Real-time</span>
          </button>
          
          <button className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:from-purple-700 hover:to-blue-700 transition-all">
            Generate Report
          </button>
        </div>
      </div>

      {/* Analysis Navigation */}
      <div className="h-12 bg-white border-b border-slate-200 flex items-center px-6">
        <div className="flex space-x-6">
          {[
            { id: 'overview', label: 'Analysis Overview', icon: Target },
            { id: 'detailed', label: 'Detailed Analysis', icon: Microscope },
            { id: 'methodology', label: 'Methodology & Frameworks', icon: Network },
            { id: 'recommendations', label: 'Improvement Recommendations', icon: Lightbulb }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveAnalysisView(tab.id)}
              className={`flex items-center space-x-2 py-2 px-3 text-sm font-medium transition-all ${
                activeAnalysisView === tab.id
                  ? 'text-purple-600 border-b-2 border-purple-600'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <tab.icon size={16} />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
        
        <div className="flex-1"></div>
        
        <div className="flex items-center space-x-3 text-sm text-slate-600">
          <div className="flex items-center space-x-1">
            <Clock size={14} />
            <span>Last analyzed: 2 min ago</span>
          </div>
          <div className="flex items-center space-x-1">
            <Eye size={14} />
            <span>Confidence: 96%</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto p-6">
        {activeAnalysisView === 'overview' && <OverviewDashboard />}
        {activeAnalysisView === 'detailed' && <DetailedAnalysisView />}
        {activeAnalysisView === 'methodology' && <MethodologicalFrameworkView />}
        {activeAnalysisView === 'recommendations' && <ImprovementRecommendationsView />}
      </div>
    </div>
  );
};

export default ConversationAnalysisPlatform;