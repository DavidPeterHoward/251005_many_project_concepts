import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { Send, RotateCcw, GitBranch, Copy, Edit3, Trash2, Plus, ChevronDown, ChevronRight, Eye, EyeOff, Zap, Sparkles, ArrowRight, MoreHorizontal, Shuffle, Target, TrendingUp, RefreshCw, Split, Merge, BookOpen, Lightbulb, Info, HelpCircle, Settings, TreePine, Network, Layers, Move3D, GitMerge, Archive, Star, Clock, Activity, MessageSquare, Database, Lock, Unlock, AlertTriangle, CheckCircle, XCircle, Circle, Search, Filter, BarChart3, Navigation } from 'lucide-react';

// Enhanced Types
interface MessageAction {
  id: string;
  type: 'retry' | 'branch' | 'edit' | 'copy' | 'delete' | 'variant' | 'expand' | 'summarize' | 'favorite';
  label: string;
  icon: React.ReactNode;
  hotkey?: string;
  description: string;
  category: 'generation' | 'navigation' | 'utility';
}

interface ConversationBranch {
  id: string;
  parentMessageId?: string;
  title: string;
  description: string;
  messages: Message[];
  created: Date;
  lastActive: Date;
  temperature: number;
  model: string;
  isActive: boolean;
  depth: number;
  confidence: number;
  explorationPath: string[];
  stats: {
    totalTokens: number;
    averageResponseTime: number;
    userSatisfaction: number;
    branchDivergence: number;
  };
  tags: string[];
  color: string;
  isFavorite: boolean;
}

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  branchId: string;
  parentId?: string;
  alternatives: MessageAlternative[];
  metadata: {
    temperature: number;
    tokens: number;
    confidence: number;
    modelUsed: string;
    retryCount: number;
    variations: number;
    processingTime: number;
    satisfaction?: number;
  };
  actions?: MessageAction[];
  predictions?: PredictionSet;
  thinking?: string;
  isFavorite: boolean;
  tags: string[];
}

interface MessageAlternative {
  id: string;
  content: string;
  confidence: number;
  reasoning: string;
  selected: boolean;
  temperature: number;
  timestamp: Date;
  votes: number;
}

interface PredictionCandidate {
  text: string;
  confidence: number;
  type: 'completion' | 'expansion' | 'alternative' | 'refinement' | 'exploration';
  reasoning: string;
  context: string;
  variations: string[];
  nextPredictions?: PredictionCandidate[];
  category: 'immediate' | 'contextual' | 'creative' | 'analytical';
}

interface PredictionSet {
  immediate: PredictionCandidate[];
  contextual: PredictionCandidate[];
  exploratory: PredictionCandidate[];
  continuations: PredictionCandidate[];
}

interface ConversationIteration {
  id: string;
  title: string;
  description: string;
  branches: ConversationBranch[];
  activeBranchId: string;
  created: Date;
  updated: Date;
  iterationCount: number;
  parentIterationId?: string;
  explorationGoal?: string;
  mergeOpportunities: MergeOpportunity[];
  visualLayout: TreeLayout;
}

interface MergeOpportunity {
  id: string;
  sourceBranchIds: string[];
  targetBranchId?: string;
  mergeType: 'combine' | 'cherry-pick' | 'synthesize' | 'parallel';
  confidence: number;
  reasoning: string;
  suggestedActions: string[];
  benefits: string[];
  risks: string[];
}

interface TreeLayout {
  nodes: TreeNode[];
  edges: TreeEdge[];
  width: number;
  height: number;
}

interface TreeNode {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  branchId: string;
  messageCount: number;
  isActive: boolean;
  confidence: number;
  temperature: number;
}

interface TreeEdge {
  from: string;
  to: string;
  type: 'parent' | 'branch' | 'merge';
  strength: number;
}

// Enhanced Prediction Engine
class AdvancedPredictionEngine {
  private contextMemory: Map<string, string[]> = new Map();
  private patternFrequency: Map<string, number> = new Map();
  private conversationContext: string[] = [];
  private semanticPatterns: Map<string, string[]> = new Map();
  private userPreferences: Map<string, number> = new Map();

  updateContext(message: string, branchContext: string[]) {
    this.conversationContext = [...branchContext, message];
    this.learnPatterns(message);
    this.updatePreferences(message);
  }

  private learnPatterns(text: string) {
    const words = text.toLowerCase().split(/\s+/);
    for (let i = 0; i < words.length - 2; i++) {
      const trigram = `${words[i]} ${words[i + 1]} ${words[i + 2]}`;
      this.patternFrequency.set(trigram, (this.patternFrequency.get(trigram) || 0) + 1);
    }
  }

  private updatePreferences(text: string) {
    // Simple preference learning based on common patterns
    const preferenceIndicators = [
      { pattern: /please|could you|would you/i, type: 'polite' },
      { pattern: /explain|detail|elaborate/i, type: 'detailed' },
      { pattern: /quick|brief|short/i, type: 'concise' },
      { pattern: /example|instance|case/i, type: 'examples' }
    ];

    preferenceIndicators.forEach(({ pattern, type }) => {
      if (pattern.test(text)) {
        this.userPreferences.set(type, (this.userPreferences.get(type) || 0) + 1);
      }
    });
  }

  generatePredictions(input: string, branchContext: string[]): PredictionSet {
    const immediate = this.generateImmediatePredictions(input);
    const contextual = this.generateContextualPredictions(input, branchContext);
    const exploratory = this.generateExploratoryPredictions(input, branchContext);
    const continuations = this.generateContinuationPredictions(input, branchContext);

    return { immediate, contextual, exploratory, continuations };
  }

  private generateImmediatePredictions(input: string): PredictionCandidate[] {
    const predictions: PredictionCandidate[] = [];
    const words = input.split(' ');
    const lastWord = words[words.length - 1]?.toLowerCase() || '';

    // Enhanced completions with categories
    const completions = [
      { word: 'understand', trigger: 'und', category: 'analytical' as const, reasoning: 'Comprehension-focused completion' },
      { word: 'explain', trigger: 'exp', category: 'analytical' as const, reasoning: 'Explanation-seeking completion' },
      { word: 'analyze', trigger: 'ana', category: 'analytical' as const, reasoning: 'Analysis-oriented completion' },
      { word: 'consider', trigger: 'con', category: 'contextual' as const, reasoning: 'Thoughtful consideration prompt' },
      { word: 'demonstrate', trigger: 'dem', category: 'immediate' as const, reasoning: 'Action-oriented completion' },
      { word: 'elaborate', trigger: 'ela', category: 'contextual' as const, reasoning: 'Detail expansion request' },
      { word: 'creative', trigger: 'cre', category: 'creative' as const, reasoning: 'Creative thinking prompt' },
      { word: 'imagine', trigger: 'ima', category: 'creative' as const, reasoning: 'Imaginative exploration' }
    ];

    completions.forEach(comp => {
      if (comp.trigger.startsWith(lastWord) && lastWord.length > 1) {
        const baseText = input.slice(0, -lastWord.length);
        predictions.push({
          text: baseText + comp.word,
          confidence: 0.85,
          type: 'completion',
          reasoning: comp.reasoning,
          context: 'smart_completion',
          category: comp.category,
          variations: [
            baseText + comp.word,
            baseText + comp.word + ' in detail',
            baseText + comp.word + ' thoroughly',
            baseText + comp.word + ' step by step'
          ]
        });
      }
    });

    // Enhanced sentence completions with user preferences
    if (input.length > 10) {
      const detailPreference = this.userPreferences.get('detailed') || 0;
      const concisePreference = this.userPreferences.get('concise') || 0;
      
      const completionOptions = detailPreference > concisePreference 
        ? [' in comprehensive detail', ' with thorough analysis', ' including all nuances']
        : [' briefly', ' in summary', ' concisely'];

      completionOptions.forEach((completion, index) => {
        predictions.push({
          text: input + completion,
          confidence: 0.7 - (index * 0.1),
          type: 'expansion',
          reasoning: `Preference-based expansion (${detailPreference > concisePreference ? 'detailed' : 'concise'})`,
          context: 'user_preference',
          category: 'contextual',
          variations: [
            input + completion,
            input + completion + '?',
            input + ', specifically' + completion
          ]
        });
      });
    }

    return predictions.slice(0, 6);
  }

  private generateContextualPredictions(input: string, branchContext: string[]): PredictionCandidate[] {
    const predictions: PredictionCandidate[] = [];
    const contextKeywords = branchContext.join(' ').toLowerCase().split(/\s+/);
    const inputKeywords = input.toLowerCase().split(/\s+/);

    // Advanced context analysis
    const contextPatterns = [
      {
        keywords: ['explain', 'what', 'how', 'why'],
        category: 'analytical' as const,
        suggestions: [
          { text: 'Can you provide a concrete example of this?', reasoning: 'Example request follows explanation' },
          { text: 'What are the practical implications?', reasoning: 'Application-focused follow-up' },
          { text: 'How does this compare to other approaches?', reasoning: 'Comparative analysis prompt' },
          { text: 'What are the potential limitations or drawbacks?', reasoning: 'Critical evaluation request' }
        ]
      },
      {
        keywords: ['problem', 'issue', 'challenge', 'difficulty'],
        category: 'analytical' as const,
        suggestions: [
          { text: 'What are the root causes of this problem?', reasoning: 'Root cause analysis prompt' },
          { text: 'What solutions have been tried before?', reasoning: 'Historical solution exploration' },
          { text: 'What would be the ideal outcome?', reasoning: 'Goal clarification question' },
          { text: 'What constraints are we working within?', reasoning: 'Constraint identification' }
        ]
      },
      {
        keywords: ['idea', 'concept', 'thought', 'suggestion'],
        category: 'creative' as const,
        suggestions: [
          { text: 'How could we expand on this idea?', reasoning: 'Idea development prompt' },
          { text: 'What would happen if we took this further?', reasoning: 'Extrapolation question' },
          { text: 'Are there any similar concepts we should consider?', reasoning: 'Related concept exploration' },
          { text: 'What would be the counterargument to this?', reasoning: 'Devil\'s advocate perspective' }
        ]
      }
    ];

    contextPatterns.forEach(pattern => {
      const hasKeywords = pattern.keywords.some(keyword =>
        inputKeywords.includes(keyword) || contextKeywords.includes(keyword)
      );

      if (hasKeywords) {
        pattern.suggestions.forEach((suggestion, index) => {
          predictions.push({
            text: suggestion.text,
            confidence: 0.8 - (index * 0.1),
            type: 'exploration',
            reasoning: suggestion.reasoning,
            context: 'contextual_analysis',
            category: pattern.category,
            variations: [
              suggestion.text,
              suggestion.text.replace('?', ' specifically?'),
              suggestion.text.replace('?', ' in this context?'),
              'Building on that, ' + suggestion.text.toLowerCase()
            ]
          });
        });
      }
    });

    return predictions.slice(0, 5);
  }

  private generateExploratoryPredictions(input: string, branchContext: string[]): PredictionCandidate[] {
    const predictions: PredictionCandidate[] = [];

    const explorationTemplates = [
      {
        text: 'Let\'s explore this from a completely different perspective',
        type: 'alternative' as const,
        category: 'creative' as const,
        reasoning: 'Encourage perspective shift for creative insights'
      },
      {
        text: 'What if we questioned our basic assumptions here?',
        type: 'refinement' as const,
        category: 'analytical' as const,
        reasoning: 'Challenge foundational assumptions'
      },
      {
        text: 'How might someone with opposite views approach this?',
        type: 'alternative' as const,
        category: 'contextual' as const,
        reasoning: 'Explore contrarian perspectives'
      },
      {
        text: 'What patterns or connections am I missing?',
        type: 'exploration' as const,
        category: 'analytical' as const,
        reasoning: 'Identify hidden relationships'
      },
      {
        text: 'If I had unlimited resources, how would this change?',
        type: 'exploration' as const,
        category: 'creative' as const,
        reasoning: 'Remove constraint-based thinking'
      }
    ];

    explorationTemplates.forEach((template, index) => {
      if (input.length > 5) {
        predictions.push({
          text: template.text,
          confidence: 0.7 - (index * 0.05),
          type: template.type,
          reasoning: template.reasoning,
          context: 'exploratory_thinking',
          category: template.category,
          variations: [
            template.text,
            template.text.replace('we', 'I'),
            'Actually, ' + template.text.toLowerCase(),
            'Wait, ' + template.text.toLowerCase()
          ]
        });
      }
    });

    return predictions.slice(0, 4);
  }

  private generateContinuationPredictions(input: string, branchContext: string[]): PredictionCandidate[] {
    const predictions: PredictionCandidate[] = [];

    if (input.length > 20) {
      const continuationPatterns = [
        {
          suffix: ', and building on this',
          type: 'expansion' as const,
          category: 'contextual' as const,
          reasoning: 'Continue developing the current thought'
        },
        {
          suffix: ', but there\'s another angle to consider',
          type: 'exploration' as const,
          category: 'analytical' as const,
          reasoning: 'Introduce alternative perspective'
        },
        {
          suffix: '. However, the implications are',
          type: 'refinement' as const,
          category: 'analytical' as const,
          reasoning: 'Explore consequences and implications'
        },
        {
          suffix: '. What\'s fascinating is how this connects to',
          type: 'exploration' as const,
          category: 'creative' as const,
          reasoning: 'Draw unexpected connections'
        }
      ];

      continuationPatterns.forEach((pattern, index) => {
        predictions.push({
          text: input + pattern.suffix,
          confidence: 0.6 - (index * 0.05),
          type: pattern.type,
          reasoning: pattern.reasoning,
          context: 'continuation_flow',
          category: pattern.category,
          variations: [
            input + pattern.suffix,
            input + pattern.suffix + '...',
            input + pattern.suffix + ' the fact that'
          ]
        });
      });
    }

    return predictions.slice(0, 3);
  }
}

// Tree visualization utilities
const generateTreeLayout = (branches: ConversationBranch[]): TreeLayout => {
  const nodes: TreeNode[] = [];
  const edges: TreeEdge[] = [];
  
  // Simple layout algorithm - can be enhanced
  branches.forEach((branch, index) => {
    const x = 50 + (index % 3) * 120;
    const y = 50 + Math.floor(index / 3) * 80;
    
    nodes.push({
      id: branch.id,
      x,
      y,
      width: 100,
      height: 60,
      branchId: branch.id,
      messageCount: branch.messages.length,
      isActive: branch.isActive,
      confidence: branch.confidence,
      temperature: branch.temperature
    });

    if (branch.parentMessageId && index > 0) {
      edges.push({
        from: branches[0].id, // Simplified - should find actual parent
        to: branch.id,
        type: 'branch',
        strength: branch.confidence
      });
    }
  });

  return {
    nodes,
    edges,
    width: 400,
    height: 300
  };
};

const App = () => {
  const [iterations, setIterations] = useState<ConversationIteration[]>([]);
  const [activeIterationId, setActiveIterationId] = useState<string | null>(null);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPredictions, setShowPredictions] = useState(true);
  const [showVisualTree, setShowVisualTree] = useState(true);
  const [expandedMessages, setExpandedMessages] = useState<Set<string>>(new Set());
  const [selectedPredictionType, setSelectedPredictionType] = useState<'immediate' | 'contextual' | 'exploratory' | 'continuations'>('immediate');
  const [selectedMergeOpportunity, setSelectedMergeOpportunity] = useState<string | null>(null);
  const [rightPanelTab, setRightPanelTab] = useState<'tree' | 'merge' | 'stats' | 'help'>('tree');
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const predictionEngine = useRef(new AdvancedPredictionEngine());

  const activeIteration = iterations.find(i => i.id === activeIterationId);
  const activeBranch = activeIteration?.branches.find(b => b.id === activeIteration.activeBranchId);

  const predictions = useMemo(() => {
    if (!activeBranch || input.length < 2) return null;
    const branchContext = activeBranch.messages.map(m => m.content);
    return predictionEngine.current.generatePredictions(input, branchContext);
  }, [input, activeBranch?.messages]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [activeBranch?.messages]);

  // Generate colors for branches
  const branchColors = [
    'bg-blue-500', 'bg-green-500', 'bg-purple-500', 'bg-orange-500', 
    'bg-pink-500', 'bg-indigo-500', 'bg-teal-500', 'bg-red-500'
  ];

  const createNewIteration = (title: string = 'New Conversation Tree') => {
    const newIteration: ConversationIteration = {
      id: Date.now().toString(),
      title,
      description: 'Explore multiple conversation paths and merge insights',
      branches: [{
        id: 'main',
        title: 'Main Branch',
        description: 'Primary conversation thread',
        messages: [],
        created: new Date(),
        lastActive: new Date(),
        temperature: 0.7,
        model: 'claude-sonnet-4',
        isActive: true,
        depth: 0,
        confidence: 1.0,
        explorationPath: [],
        stats: {
          totalTokens: 0,
          averageResponseTime: 0,
          userSatisfaction: 0,
          branchDivergence: 0
        },
        tags: ['main', 'primary'],
        color: branchColors[0],
        isFavorite: false
      }],
      activeBranchId: 'main',
      created: new Date(),
      updated: new Date(),
      iterationCount: 1,
      explorationGoal: 'Open exploration and discovery',
      mergeOpportunities: [],
      visualLayout: generateTreeLayout([])
    };

    setIterations(prev => [newIteration, ...prev]);
    setActiveIterationId(newIteration.id);
  };

  const createBranch = (fromMessageId: string, title: string = 'New Branch') => {
    if (!activeIteration || !activeBranch) return;

    const newBranch: ConversationBranch = {
      id: Date.now().toString(),
      parentMessageId: fromMessageId,
      title,
      description: `Branched from ${activeBranch.title} at ${new Date().toLocaleTimeString()}`,
      messages: [],
      created: new Date(),
      lastActive: new Date(),
      temperature: 0.7 + Math.random() * 0.2,
      model: 'claude-sonnet-4',
      isActive: true,
      depth: activeBranch.depth + 1,
      confidence: 0.8,
      explorationPath: [...activeBranch.explorationPath, fromMessageId],
      stats: {
        totalTokens: 0,
        averageResponseTime: 0,
        userSatisfaction: 0,
        branchDivergence: 0.5
      },
      tags: ['branch', 'exploration'],
      color: branchColors[activeIteration.branches.length % branchColors.length],
      isFavorite: false
    };

    setIterations(prev => prev.map(iter => 
      iter.id === activeIterationId 
        ? { 
            ...iter, 
            branches: [...iter.branches, newBranch],
            activeBranchId: newBranch.id,
            visualLayout: generateTreeLayout([...iter.branches, newBranch])
          }
        : iter
    ));
  };

  const messageActions: MessageAction[] = [
    {
      id: 'retry',
      type: 'retry',
      label: 'Retry',
      icon: <RotateCcw className="w-4 h-4" />,
      hotkey: 'R',
      description: 'Generate a new response with different parameters',
      category: 'generation'
    },
    {
      id: 'branch',
      type: 'branch',
      label: 'Branch',
      icon: <GitBranch className="w-4 h-4" />,
      hotkey: 'B',
      description: 'Create a new conversation branch from this point',
      category: 'navigation'
    },
    {
      id: 'variant',
      type: 'variant',
      label: 'Variant',
      icon: <Shuffle className="w-4 h-4" />,
      hotkey: 'V',
      description: 'Generate alternative versions of this message',
      category: 'generation'
    },
    {
      id: 'copy',
      type: 'copy',
      label: 'Copy',
      icon: <Copy className="w-4 h-4" />,
      hotkey: 'C',
      description: 'Copy message content to clipboard',
      category: 'utility'
    },
    {
      id: 'expand',
      type: 'expand',
      label: 'Details',
      icon: <Eye className="w-4 h-4" />,
      hotkey: 'E',
      description: 'Show/hide detailed information and thinking process',
      category: 'utility'
    },
    {
      id: 'favorite',
      type: 'favorite',
      label: 'Favorite',
      icon: <Star className="w-4 h-4" />,
      hotkey: 'F',
      description: 'Mark this message as a favorite',
      category: 'utility'
    }
  ];

  const handleMessageAction = async (action: MessageAction, messageId: string) => {
    if (!activeBranch) return;

    switch (action.type) {
      case 'retry':
        await retryMessage(messageId);
        break;
      case 'branch':
        createBranch(messageId, `Branch from ${messageId.slice(-6)}`);
        break;
      case 'variant':
        await createMessageAlternative(messageId);
        break;
      case 'copy':
        const message = activeBranch.messages.find(m => m.id === messageId);
        if (message) {
          await navigator.clipboard.writeText(message.content);
          // Show toast notification (simplified)
        }
        break;
      case 'expand':
        setExpandedMessages(prev => 
          prev.has(messageId) 
            ? new Set([...prev].filter(id => id !== messageId))
            : new Set([...prev, messageId])
        );
        break;
      case 'favorite':
        toggleMessageFavorite(messageId);
        break;
    }
  };

  const retryMessage = async (messageId: string) => {
    if (!activeBranch) return;
    
    const messageIndex = activeBranch.messages.findIndex(m => m.id === messageId);
    if (messageIndex === -1) return;

    createBranch(messageId, `Retry - ${new Date().toLocaleTimeString()}`);
    
    const message = activeBranch.messages[messageIndex];
    if (message.role === 'assistant') {
      await generateResponse(activeBranch.messages[messageIndex - 1].content, 0.9);
    }
  };

  const createMessageAlternative = async (messageId: string) => {
    if (!activeBranch) return;
    
    const message = activeBranch.messages.find(m => m.id === messageId);
    if (!message) return;

    const alternative: MessageAlternative = {
      id: Date.now().toString(),
      content: `Alternative perspective: ${message.content}`,
      confidence: 0.75,
      reasoning: 'Generated alternative with different approach',
      selected: false,
      temperature: message.metadata.temperature + 0.3,
      timestamp: new Date(),
      votes: 0
    };

    setIterations(prev => prev.map(iter => 
      iter.id === activeIterationId 
        ? {
            ...iter,
            branches: iter.branches.map(branch =>
              branch.id === activeBranch.id
                ? {
                    ...branch,
                    messages: branch.messages.map(msg =>
                      msg.id === messageId
                        ? { ...msg, alternatives: [...msg.alternatives, alternative] }
                        : msg
                    )
                  }
                : branch
            )
          }
        : iter
    ));
  };

  const toggleMessageFavorite = (messageId: string) => {
    if (!activeBranch) return;

    setIterations(prev => prev.map(iter => 
      iter.id === activeIterationId 
        ? {
            ...iter,
            branches: iter.branches.map(branch =>
              branch.id === activeBranch.id
                ? {
                    ...branch,
                    messages: branch.messages.map(msg =>
                      msg.id === messageId
                        ? { ...msg, isFavorite: !msg.isFavorite }
                        : msg
                    )
                  }
                : branch
            )
          }
        : iter
    ));
  };

  const switchBranch = (branchId: string) => {
    setIterations(prev => prev.map(iter => 
      iter.id === activeIterationId 
        ? { ...iter, activeBranchId: branchId }
        : iter
    ));
  };

  const generateResponse = async (userInput: string, temperature: number = 0.7) => {
    if (!activeBranch) return;

    try {
      const branchContext = activeBranch.messages.map(m => `${m.role}: ${m.content}`).join('\n');
      
      const enhancedPrompt = `Context from current conversation branch (${activeBranch.title}):
${branchContext}

Current message: ${userInput}

Please respond thoughtfully and consider multiple perspectives. Temperature: ${temperature}`;

      const startTime = Date.now();
      
      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          messages: [
            { role: "user", content: enhancedPrompt }
          ]
        })
      });

      const data = await response.json();
      const responseText = data.content[0].text;
      const processingTime = Date.now() - startTime;

      const assistantMessage: Message = {
        id: Date.now().toString(),
        role: 'assistant',
        content: responseText,
        timestamp: new Date(),
        branchId: activeBranch.id,
        alternatives: [],
        metadata: {
          temperature,
          tokens: responseText.length,
          confidence: 0.8 + Math.random() * 0.15,
          modelUsed: 'claude-sonnet-4',
          retryCount: 0,
          variations: 1,
          processingTime
        },
        thinking: `Generated response using temperature ${temperature} in branch "${activeBranch.title}". Processing time: ${processingTime}ms`,
        isFavorite: false,
        tags: []
      };

      setIterations(prev => prev.map(iter => 
        iter.id === activeIterationId 
          ? {
              ...iter,
              branches: iter.branches.map(branch =>
                branch.id === activeBranch.id
                  ? { 
                      ...branch, 
                      messages: [...branch.messages, assistantMessage],
                      stats: {
                        ...branch.stats,
                        totalTokens: branch.stats.totalTokens + responseText.length,
                        averageResponseTime: (branch.stats.averageResponseTime + processingTime) / 2
                      }
                    }
                  : branch
              )
            }
          : iter
      ));

    } catch (error) {
      console.error('Error generating response:', error);
    }
  };

  const sendMessage = async () => {
    if (!input.trim() || isLoading || !activeBranch) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input.trim(),
      timestamp: new Date(),
      branchId: activeBranch.id,
      alternatives: [],
      metadata: {
        temperature: 0,
        tokens: input.length,
        confidence: 1.0,
        modelUsed: 'user',
        retryCount: 0,
        variations: 1,
        processingTime: 0
      },
      isFavorite: false,
      tags: []
    };

    predictionEngine.current.updateContext(input, activeBranch.messages.map(m => m.content));

    setIterations(prev => prev.map(iter => 
      iter.id === activeIterationId 
        ? {
            ...iter,
            branches: iter.branches.map(branch =>
              branch.id === activeBranch.id
                ? { ...branch, messages: [...branch.messages, userMessage] }
                : branch
            )
          }
        : iter
    ));

    setInput('');
    setIsLoading(true);

    await generateResponse(userMessage.content);
    setIsLoading(false);
  };

  const applyPrediction = (prediction: PredictionCandidate) => {
    setInput(prediction.text);
    textareaRef.current?.focus();
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const renderTreeVisualization = () => {
    if (!activeIteration) return null;

    const layout = activeIteration.visualLayout;

    return (
      <div className="relative w-full h-64 bg-gray-50 rounded-lg border-2 border-gray-200 overflow-hidden">
        <svg width="100%" height="100%" viewBox={`0 0 ${layout.width} ${layout.height}`}>
          {/* Render edges */}
          {layout.edges.map((edge, index) => {
            const fromNode = layout.nodes.find(n => n.id === edge.from);
            const toNode = layout.nodes.find(n => n.id === edge.to);
            if (!fromNode || !toNode) return null;

            return (
              <line
                key={index}
                x1={fromNode.x + fromNode.width / 2}
                y1={fromNode.y + fromNode.height / 2}
                x2={toNode.x + toNode.width / 2}
                y2={toNode.y + toNode.height / 2}
                stroke={edge.type === 'branch' ? '#3B82F6' : '#10B981'}
                strokeWidth={2 * edge.strength}
                strokeDasharray={edge.type === 'merge' ? '5,5' : 'none'}
              />
            );
          })}

          {/* Render nodes */}
          {layout.nodes.map(node => {
            const branch = activeIteration.branches.find(b => b.id === node.branchId);
            if (!branch) return null;

            return (
              <g key={node.id}>
                <rect
                  x={node.x}
                  y={node.y}
                  width={node.width}
                  height={node.height}
                  fill={node.isActive ? '#3B82F6' : '#E5E7EB'}
                  stroke={node.isActive ? '#1D4ED8' : '#9CA3AF'}
                  strokeWidth="2"
                  rx="8"
                  className="cursor-pointer"
                  onClick={() => switchBranch(node.branchId)}
                />
                <text
                  x={node.x + node.width / 2}
                  y={node.y + node.height / 2 - 8}
                  textAnchor="middle"
                  className="text-xs fill-current"
                  fill={node.isActive ? 'white' : '#374151'}
                >
                  {branch.title.slice(0, 12)}
                </text>
                <text
                  x={node.x + node.width / 2}
                  y={node.y + node.height / 2 + 6}
                  textAnchor="middle"
                  className="text-xs fill-current"
                  fill={node.isActive ? 'white' : '#6B7280'}
                >
                  {node.messageCount} msgs
                </text>
              </g>
            );
          })}
        </svg>
      </div>
    );
  };

  if (iterations.length === 0) {
    return (
      <div className="h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-3xl mx-auto p-8">
          <div className="flex items-center justify-center mb-6">
            <TreePine className="w-16 h-16 text-blue-500 mr-4" />
            <GitBranch className="w-20 h-20 text-green-500" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Advanced Conversation Branching System
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Create non-linear conversations with intelligent branching, visual tree navigation, 
            smart predictions, and advanced merge capabilities
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <GitBranch className="w-8 h-8 text-blue-500 mb-3" />
              <h3 className="font-semibold mb-2">Smart Branching</h3>
              <p className="text-sm text-gray-600">Create multiple conversation paths and explore different directions</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <Network className="w-8 h-8 text-green-500 mb-3" />
              <h3 className="font-semibold mb-2">Visual Tree</h3>
              <p className="text-sm text-gray-600">See your conversation structure with interactive tree visualization</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <GitMerge className="w-8 h-8 text-purple-500 mb-3" />
              <h3 className="font-semibold mb-2">Merge Insights</h3>
              <p className="text-sm text-gray-600">Combine insights from different branches with intelligent merge tools</p>
            </div>
          </div>
          <button
            onClick={() => createNewIteration()}
            className="bg-blue-500 text-white px-8 py-4 rounded-lg hover:bg-blue-600 transition-colors text-lg font-medium"
          >
            Start Conversation Tree
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen bg-gray-50 flex">
      {/* Left Sidebar - Branches */}
      <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
              <GitBranch className="w-5 h-5" />
              Conversation Branches
            </h2>
            <button
              onClick={() => createNewIteration()}
              className="p-2 text-gray-500 hover:text-gray-700 rounded-lg hover:bg-gray-100"
              title="Create new conversation iteration"
            >
              <Plus className="w-5 h-5" />
            </button>
          </div>

          {activeIteration && (
            <div className="mb-4 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200">
              <div className="text-sm font-medium text-blue-800 mb-1">
                {activeIteration.title}
              </div>
              <div className="text-xs text-blue-600 mb-2">
                {activeIteration.description}
              </div>
              <div className="flex items-center gap-4 text-xs text-blue-700">
                <span className="flex items-center gap-1">
                  <GitBranch className="w-3 h-3" />
                  {activeIteration.branches.length} branches
                </span>
                <span className="flex items-center gap-1">
                  <Activity className="w-3 h-3" />
                  Iteration {activeIteration.iterationCount}
                </span>
              </div>
            </div>
          )}
        </div>

        <div className="flex-1 overflow-y-auto">
          {activeIteration?.branches.map((branch, index) => (
            <div
              key={branch.id}
              className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors ${
                branch.id === activeIteration.activeBranchId ? 'bg-blue-50 border-l-4 border-l-blue-500' : ''
              }`}
              onClick={() => switchBranch(branch.id)}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${branch.color} opacity-80`} />
                  <span className="font-medium text-sm text-gray-800">{branch.title}</span>
                  {branch.isFavorite && <Star className="w-3 h-3 text-yellow-500 fill-current" />}
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                    T:{branch.temperature.toFixed(1)}
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      createBranch(branch.messages[branch.messages.length - 1]?.id || 'root', 'Sub-branch');
                    }}
                    className="p-1 text-gray-400 hover:text-blue-500 rounded"
                    title="Create sub-branch"
                  >
                    <GitBranch className="w-3 h-3" />
                  </button>
                </div>
              </div>
              
              <div className="text-xs text-gray-600 mb-2">{branch.description}</div>
              
              <div className="flex items-center justify-between text-xs text-gray-500">
                <span className="flex items-center gap-1">
                  <MessageSquare className="w-3 h-3" />
                  {branch.messages.length} messages
                </span>
                <span>Depth: {branch.depth}</span>
              </div>
              
              <div className="flex items-center justify-between mt-2 text-xs">
                <span className="text-gray-500">
                  Confidence: {Math.round(branch.confidence * 100)}%
                </span>
                <span className="text-gray-400">
                  {branch.lastActive.toLocaleTimeString()}
                </span>
              </div>

              {branch.tags.length > 0 && (
                <div className="flex gap-1 mt-2">
                  {branch.tags.slice(0, 3).map(tag => (
                    <span key={tag} className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Main Conversation Area */}
      <div className="flex-1 flex flex-col">
        {activeIteration && activeBranch && (
          <>
            {/* Enhanced Header */}
            <div className="bg-white border-b border-gray-200 p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-4 h-4 rounded-full ${activeBranch.color}`} />
                  <div>
                    <h1 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                      {activeBranch.title}
                      {activeBranch.isFavorite && <Star className="w-4 h-4 text-yellow-500 fill-current" />}
                    </h1>
                    <div className="text-sm text-gray-600 flex items-center gap-4">
                      <span>{activeBranch.description}</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {activeBranch.messages.length} messages
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setShowPredictions(!showPredictions)}
                    className={`px-3 py-2 rounded-lg text-sm flex items-center gap-2 transition-colors ${
                      showPredictions ? 'bg-purple-100 text-purple-700' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                    title="Toggle smart predictions (enhances typing with AI suggestions)"
                  >
                    <Sparkles className="w-4 h-4" />
                    Predictions
                  </button>
                  <button
                    onClick={() => createBranch(activeBranch.messages[activeBranch.messages.length - 1]?.id || 'root')}
                    className="px-3 py-2 bg-blue-100 text-blue-700 rounded-lg text-sm flex items-center gap-2 hover:bg-blue-200 transition-colors"
                    title="Create new branch from current conversation point"
                  >
                    <GitBranch className="w-4 h-4" />
                    New Branch
                  </button>
                </div>
              </div>
            </div>

            {/* Messages with Enhanced Actions */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {activeBranch.messages.map(message => (
                <div key={message.id} className={`group flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-4xl ${message.role === 'user' ? 'bg-blue-500 text-white' : 'bg-white border border-gray-200'} rounded-2xl p-5 shadow-sm relative`}>
                    
                    {/* Enhanced Message Actions */}
                    <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      <div className="flex items-center gap-1 bg-black bg-opacity-10 backdrop-blur-sm rounded-lg p-1">
                        {messageActions.map(action => (
                          <button
                            key={action.id}
                            onClick={() => handleMessageAction(action, message.id)}
                            className={`p-2 hover:bg-black hover:bg-opacity-20 rounded-lg text-sm transition-colors ${
                              message.isFavorite && action.type === 'favorite' ? 'text-yellow-500' : ''
                            }`}
                            title={`${action.label} - ${action.description} (${action.hotkey})`}
                          >
                            {action.icon}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Message Status Indicators */}
                    <div className="flex items-center gap-2 mb-3">
                      {message.isFavorite && (
                        <span className="flex items-center gap-1 text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full">
                          <Star className="w-3 h-3 fill-current" />
                          Favorite
                        </span>
                      )}
                      {message.alternatives.length > 0 && (
                        <span className="flex items-center gap-1 text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full">
                          <Shuffle className="w-3 h-3" />
                          {message.alternatives.length} alternative{message.alternatives.length !== 1 ? 's' : ''}
                        </span>
                      )}
                      {message.metadata.retryCount > 0 && (
                        <span className="flex items-center gap-1 text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded-full">
                          <RotateCcw className="w-3 h-3" />
                          Retry {message.metadata.retryCount}
                        </span>
                      )}
                    </div>

                    {/* Message Alternatives */}
                    {message.alternatives.length > 0 && (
                      <div className="mb-4 p-3 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border border-purple-200">
                        <div className="text-sm font-medium text-purple-800 mb-3 flex items-center gap-2">
                          <Shuffle className="w-4 h-4" />
                          Alternative Responses
                        </div>
                        <div className="space-y-2">
                          {message.alternatives.map(alt => (
                            <div key={alt.id} className="bg-white p-3 rounded-lg border cursor-pointer hover:bg-purple-50 transition-colors">
                              <div className="text-sm text-gray-800 mb-2">{alt.content}</div>
                              <div className="flex items-center justify-between text-xs">
                                <span className="text-purple-600">{alt.reasoning}</span>
                                <div className="flex items-center gap-3">
                                  <span className="text-gray-500">Confidence: {Math.round(alt.confidence * 100)}%</span>
                                  <span className="text-gray-500">T:{alt.temperature}</span>
                                  <div className="flex items-center gap-1">
                                    <button className="text-green-600 hover:text-green-700" title="Vote up">👍</button>
                                    <span className="text-gray-500">{alt.votes}</span>
                                    <button className="text-red-600 hover:text-red-700" title="Vote down">👎</button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Expanded Details */}
                    {expandedMessages.has(message.id) && (
                      <div className="mb-4 space-y-3">
                        {message.thinking && (
                          <div className="p-3 bg-amber-50 rounded-lg border-l-4 border-amber-400">
                            <div className="flex items-center gap-2 mb-2">
                              <Brain className="w-4 h-4 text-amber-600" />
                              <span className="text-sm font-medium text-amber-700">Thinking Process</span>
                            </div>
                            <div className="text-sm text-gray-700 font-mono whitespace-pre-wrap">{message.thinking}</div>
                          </div>
                        )}
                        
                        <div className="grid grid-cols-2 gap-3 text-sm">
                          <div className="p-3 bg-gray-50 rounded-lg">
                            <div className="font-medium text-gray-700 mb-1">Generation Details</div>
                            <div className="text-xs text-gray-600 space-y-1">
                              <div>Model: {message.metadata.modelUsed}</div>
                              <div>Temperature: {message.metadata.temperature}</div>
                              <div>Tokens: {message.metadata.tokens}</div>
                              <div>Processing: {message.metadata.processingTime}ms</div>
                            </div>
                          </div>
                          <div className="p-3 bg-gray-50 rounded-lg">
                            <div className="font-medium text-gray-700 mb-1">Quality Metrics</div>
                            <div className="text-xs text-gray-600 space-y-1">
                              <div>Confidence: {Math.round(message.metadata.confidence * 100)}%</div>
                              <div>Variations: {message.metadata.variations}</div>
                              <div>Retry Count: {message.metadata.retryCount}</div>
                              {message.metadata.satisfaction && (
                                <div>Satisfaction: {Math.round(message.metadata.satisfaction * 100)}%</div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Main Message Content */}
                    <div className="whitespace-pre-wrap text-base leading-relaxed">{message.content}</div>

                    {/* Enhanced Message Footer */}
                    <div className="flex items-center justify-between mt-4 pt-3 border-t border-opacity-20">
                      <div className="flex items-center gap-3 text-xs opacity-75">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {message.timestamp.toLocaleTimeString()}
                        </span>
                        <span className="flex items-center gap-1">
                          <Zap className="w-3 h-3" />
                          {message.metadata.confidence > 0.8 ? 'High' : message.metadata.confidence > 0.6 ? 'Medium' : 'Low'} confidence
                        </span>
                        <span className="flex items-center gap-1">
                          <Settings className="w-3 h-3" />
                          T:{message.metadata.temperature}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        {message.tags.map(tag => (
                          <span key={tag} className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full opacity-75">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="flex justify-start">
                  <div className="max-w-3xl bg-white rounded-2xl p-5 shadow-sm border border-gray-200">
                    <div className="flex items-center gap-3">
                      <div className="flex gap-1">
                        <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" />
                        <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                        <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                      </div>
                      <span className="text-sm text-gray-600">
                        Generating response in <span className="font-medium text-blue-600">{activeBranch.title}</span>...
                      </span>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Enhanced Prediction Panel */}
            {showPredictions && predictions && (
              <div className="bg-gradient-to-r from-purple-50 via-pink-50 to-blue-50 border-t border-purple-200 p-4">
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <Sparkles className="w-5 h-5 text-purple-600" />
                      <span className="text-base font-medium text-purple-800">AI-Powered Predictions & Suggestions</span>
                      <div className="flex items-center gap-1 text-xs text-purple-600 bg-purple-100 px-2 py-1 rounded-full">
                        <Info className="w-3 h-3" />
                        Smart typing assistance
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      {(['immediate', 'contextual', 'exploratory', 'continuations'] as const).map(type => (
                        <button
                          key={type}
                          onClick={() => setSelectedPredictionType(type)}
                          className={`px-3 py-2 rounded-lg text-sm capitalize transition-colors ${
                            selectedPredictionType === type
                              ? 'bg-purple-200 text-purple-800 font-medium'
                              : 'bg-white text-purple-600 hover:bg-purple-100'
                          }`}
                          title={`Show ${type} predictions - ${type === 'immediate' ? 'word completions and quick suggestions' : 
                                  type === 'contextual' ? 'context-aware conversation continuations' :
                                  type === 'exploratory' ? 'creative and alternative thinking prompts' :
                                  'logical flow extensions and developments'}`}
                        >
                          {type}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 max-h-48 overflow-y-auto">
                    {predictions[selectedPredictionType].map((prediction, index) => (
                      <div key={index} className="bg-white rounded-lg border border-purple-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                        <button
                          onClick={() => applyPrediction(prediction)}
                          className="w-full text-left p-4 hover:bg-purple-50 transition-colors"
                        >
                          <div className="text-sm text-gray-800 mb-3 line-clamp-2 leading-relaxed">{prediction.text}</div>
                          <div className="flex items-center justify-between text-xs mb-2">
                            <span className="text-purple-700 font-medium capitalize flex items-center gap-1">
                              <div className={`w-2 h-2 rounded-full ${
                                prediction.category === 'immediate' ? 'bg-green-500' :
                                prediction.category === 'contextual' ? 'bg-blue-500' :
                                prediction.category === 'creative' ? 'bg-purple-500' : 'bg-orange-500'
                              }`} />
                              {prediction.type}
                            </span>
                            <span className="text-gray-600 flex items-center gap-1">
                              <Target className="w-3 h-3" />
                              {Math.round(prediction.confidence * 100)}%
                            </span>
                          </div>
                          <div className="text-xs text-gray-500 italic">{prediction.reasoning}</div>
                        </button>
                        
                        {prediction.variations.length > 1 && (
                          <div className="border-t border-purple-100 p-3 bg-purple-25">
                            <div className="text-xs text-purple-700 mb-2 font-medium flex items-center gap-1">
                              <Shuffle className="w-3 h-3" />
                              Variations ({prediction.variations.length - 1} more):
                            </div>
                            <div className="space-y-1">
                              {prediction.variations.slice(1, 3).map((variation, vIndex) => (
                                <button
                                  key={vIndex}
                                  onClick={() => applyPrediction({ ...prediction, text: variation })}
                                  className="block w-full text-left text-xs text-gray-600 hover:text-purple-700 hover:bg-purple-50 p-1 rounded transition-colors"
                                >
                                  {variation}
                                </button>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Enhanced Input Area */}
            <div className="bg-white border-t border-gray-200 p-4">
              <div className="mb-3 flex items-center justify-between text-sm">
                <div className="text-gray-600 flex items-center gap-2">
                  <Info className="w-4 h-4" />
                  <span>Enhanced typing with AI predictions, smart completions, and conversation branching</span>
                </div>
                <div className="flex items-center gap-3 text-xs text-gray-500">
                  <span>Hotkeys: R(retry) • B(branch) • V(variant) • C(copy) • E(expand) • F(favorite)</span>
                </div>
              </div>
              
              <div className="flex items-end gap-3">
                <div className="flex-1 relative">
                  <textarea
                    ref={textareaRef}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder={`Message in ${activeBranch.title}... (Use predictions above or type naturally)`}
                    className="w-full p-4 border border-gray-300 rounded-xl resize-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-base leading-relaxed"
                    rows={2}
                    disabled={isLoading}
                  />
                  {input.length > 0 && (
                    <div className="absolute bottom-3 right-3 text-xs text-gray-400 bg-white px-2 py-1 rounded">
                      {input.length} chars
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => createBranch(activeBranch.messages[activeBranch.messages.length - 1]?.id || 'root', 'Quick Branch')}
                    className="p-3 bg-gray-100 text-gray-600 rounded-xl hover:bg-gray-200 transition-colors"
                    title="Create new branch from current point"
                  >
                    <GitBranch className="w-5 h-5" />
                  </button>
                  
                  <button
                    onClick={sendMessage}
                    disabled={!input.trim() || isLoading}
                    className="p-3 bg-blue-500 text-white rounded-xl hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
                    title="Send message (Enter)"
                  >
                    <Send className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between mt-3 text-xs text-gray-500">
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-1">
                    <GitBranch className="w-3 h-3" />
                    Branch: {activeBranch.title}
                  </span>
                  <span className="flex items-center gap-1">
                    <Settings className="w-3 h-3" />
                    Temperature: {activeBranch.temperature}
                  </span>
                  <span className="flex items-center gap-1">
                    <Layers className="w-3 h-3" />
                    Depth: {activeBranch.depth}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <span>Press Enter to send • Shift+Enter for new line</span>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Right Panel - Visual Tree & Tools */}
      {activeIteration && (
        <div className="w-96 bg-white border-l border-gray-200 flex flex-col">
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center gap-2 mb-4">
              <TreePine className="w-5 h-5 text-green-600" />
              <h3 className="text-lg font-semibold text-gray-800">Conversation Tree</h3>
            </div>
            
            <div className="flex items-center gap-1 mb-4">
              {(['tree', 'merge', 'stats', 'help'] as const).map(tab => (
                <button
                  key={tab}
                  onClick={() => setRightPanelTab(tab)}
                  className={`px-3 py-2 rounded-lg text-sm capitalize flex items-center gap-1 ${
                    rightPanelTab === tab
                      ? 'bg-blue-100 text-blue-700 font-medium'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                  title={`View ${tab} panel`}
                >
                  {tab === 'tree' && <Network className="w-3 h-3" />}
                  {tab === 'merge' && <GitMerge className="w-3 h-3" />}
                  {tab === 'stats' && <Activity className="w-3 h-3" />}
                  {tab === 'help' && <HelpCircle className="w-3 h-3" />}
                  {tab}
                </button>
              ))}
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4">
            {rightPanelTab === 'tree' && (
              <div className="space-y-4">
                <div className="text-sm font-medium text-gray-700 mb-3 flex items-center gap-2">
                  <Network className="w-4 h-4" />
                  Visual Tree Structure
                </div>
                {renderTreeVisualization()}
                
                <div className="space-y-2">
                  <div className="text-sm font-medium text-gray-700">Branch Overview</div>
                  {activeIteration.branches.map(branch => (
                    <div
                      key={branch.id}
                      className={`p-3 rounded-lg border cursor-pointer hover:bg-gray-50 ${
                        branch.id === activeIteration.activeBranchId ? 'border-blue-300 bg-blue-50' : 'border-gray-200'
                      }`}
                      onClick={() => switchBranch(branch.id)}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium">{branch.title}</span>
                        <div className={`w-2 h-2 rounded-full ${branch.color}`} />
                      </div>
                      <div className="text-xs text-gray-600 flex items-center gap-3">
                        <span>{branch.messages.length} messages</span>
                        <span>Depth {branch.depth}</span>
                        <span>{Math.round(branch.confidence * 100)}% conf</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {rightPanelTab === 'merge' && (
              <div className="space-y-4">
                <div className="text-sm font-medium text-gray-700 mb-3 flex items-center gap-2">
                  <GitMerge className="w-4 h-4" />
                  Merge Opportunities
                </div>
                <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                  <div className="text-sm text-green-800 mb-2">🚧 Coming Soon</div>
                  <div className="text-xs text-green-700">
                    Intelligent merge suggestions will appear here when compatible branches are detected.
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="text-sm font-medium text-gray-700">Manual Merge Tools</div>
                  <button className="w-full p-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm">
                    Compare Selected Branches
                  </button>
                  <button className="w-full p-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm">
                    Synthesize Insights
                  </button>
                  <button className="w-full p-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm">
                    Create Summary Branch
                  </button>
                </div>
              </div>
            )}

            {rightPanelTab === 'stats' && (
              <div className="space-y-4">
                <div className="text-sm font-medium text-gray-700 mb-3 flex items-center gap-2">
                  <Activity className="w-4 h-4" />
                  Conversation Statistics
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <div className="text-xs text-blue-600 mb-1">Total Branches</div>
                    <div className="text-lg font-bold text-blue-800">{activeIteration.branches.length}</div>
                  </div>
                  <div className="p-3 bg-green-50 rounded-lg">
                    <div className="text-xs text-green-600 mb-1">Total Messages</div>
                    <div className="text-lg font-bold text-green-800">
                      {activeIteration.branches.reduce((sum, b) => sum + b.messages.length, 0)}
                    </div>
                  </div>
                  <div className="p-3 bg-purple-50 rounded-lg">
                    <div className="text-xs text-purple-600 mb-1">Avg Confidence</div>
                    <div className="text-lg font-bold text-purple-800">
                      {Math.round(activeIteration.branches.reduce((sum, b) => sum + b.confidence, 0) / activeIteration.branches.length * 100)}%
                    </div>
                  </div>
                  <div className="p-3 bg-orange-50 rounded-lg">
                    <div className="text-xs text-orange-600 mb-1">Max Depth</div>
                    <div className="text-lg font-bold text-orange-800">
                      {Math.max(...activeIteration.branches.map(b => b.depth))}
                    </div>
                  </div>
                </div>

                {activeBranch && (
                  <div className="space-y-3">
                    <div className="text-sm font-medium text-gray-700">Current Branch Stats</div>
                    <div className="p-3 bg-gray-50 rounded-lg space-y-2">
                      <div className="flex justify-between text-xs">
                        <span className="text-gray-600">Total Tokens:</span>
                        <span className="font-medium">{activeBranch.stats.totalTokens}</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-gray-600">Avg Response Time:</span>
                        <span className="font-medium">{Math.round(activeBranch.stats.averageResponseTime)}ms</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-gray-600">Branch Divergence:</span>
                        <span className="font-medium">{Math.round(activeBranch.stats.branchDivergence * 100)}%</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {rightPanelTab === 'help' && (
              <div className="space-y-4">
                <div className="text-sm font-medium text-gray-700 mb-3 flex items-center gap-2">
                  <HelpCircle className="w-4 h-4" />
                  Help & Guide
                </div>
                
                <div className="space-y-3 text-sm">
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <div className="font-medium text-blue-800 mb-2">🌿 Branching</div>
                    <div className="text-blue-700 text-xs">
                      Create branches to explore different conversation paths. Click the branch button on any message or use hotkey 'B'.
                    </div>
                  </div>
                  
                  <div className="p-3 bg-purple-50 rounded-lg">
                    <div className="font-medium text-purple-800 mb-2">✨ Predictions</div>
                    <div className="text-purple-700 text-xs">
                      AI suggestions appear as you type. Use immediate for completions, contextual for flow, exploratory for creativity.
                    </div>
                  </div>
                  
                  <div className="p-3 bg-green-50 rounded-lg">
                    <div className="font-medium text-green-800 mb-2">🔄 Alternatives</div>
                    <div className="text-green-700 text-xs">
                      Generate alternative responses with the variant button (V) to explore different AI perspectives.
                    </div>
                  </div>
                  
                  <div className="p-3 bg-orange-50 rounded-lg">
                    <div className="font-medium text-orange-800 mb-2">⌨️ Hotkeys</div>
                    <div className="text-orange-700 text-xs space-y-1">
                      <div>R - Retry message</div>
                      <div>B - Create branch</div>
                      <div>V - Generate variant</div>
                      <div>C - Copy content</div>
                      <div>E - Expand details</div>
                      <div>F - Mark favorite</div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default App;