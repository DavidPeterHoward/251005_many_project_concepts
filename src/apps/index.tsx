import React from 'react'

// Import existing TSX modules
import BrainwaveApp from './BrainwaveDesktop'
import DreamcatcherDesigner from './DreamcatcherDesignerPro'
import ComponentViewer from './ComponentExplorer'
import InterstellarConsciousnessApp from './InterstellarConsciousness'
import AdvancedImageRegressionInterface from './ImageRegistrationLab'
import KnowledgeGarden from './KnowledgeGardenPaths'
import AdvancedEMAnalysis from './AdvancedEMAnalysis'
import EMDashboard from './EMDashboard'
import DenseTimelineMonitor from './DenseTimelineMonitor'
import LunarHarmonics from './LunarHarmonics'
import NasalDeviceConcepts from './NasalDeviceConcepts'
import ConversationAnalysis from './ConversationAnalysisPlatform'
import AgentMemoryViewer from './AgentMemoryViewer'
import NeuralNarrativeEngine from './NeuralNarrativeEngine'
import LivingStoryInterface from './LivingStoryInterface'

// HTML apps are served as static files; provide hrefs

export type AppEntry = {
  id: string
  title: string
  description: string
  type: 'react' | 'html'
  path: string // route path or href
  component?: React.FC
}

export const APPS: AppEntry[] = [
  {
    id: 'brainwave',
    title: 'NeuroWave Professional Desktop',
    description: 'Advanced brainwave analysis & music entrainment platform.',
    type: 'react',
    path: '/apps/brainwave',
    component: BrainwaveApp,
  },
  {
    id: 'dreamcatcher',
    title: 'Dreamcatcher Designer Pro',
    description: 'Parametric pattern generator with physics analysis.',
    type: 'react',
    path: '/apps/dreamcatcher',
    component: DreamcatcherDesigner,
  },
  {
    id: 'component-viewer',
    title: '3D Component Explorer',
    description: 'Model library and component hierarchy exploration UI.',
    type: 'react',
    path: '/apps/component-viewer',
    component: ComponentViewer,
  },
  {
    id: 'consciousness',
    title: 'Interstellar Consciousness Transfer',
    description: 'Mission control and technical database UI.',
    type: 'react',
    path: '/apps/consciousness',
    component: InterstellarConsciousnessApp,
  },
  {
    id: 'image-regression',
    title: 'Image Registration Interface',
    description: 'Multi-modal overlays and expert/research UIs.',
    type: 'react',
    path: '/apps/image-regression',
    component: AdvancedImageRegressionInterface,
  },
  {
    id: 'knowledge-garden',
    title: 'Multidisciplinary Professional Paths',
    description: 'Interactive pathways across sectors and roles.',
    type: 'react',
    path: '/apps/knowledge-garden',
    component: KnowledgeGarden,
  },
  {
    id: 'neural-narrative',
    title: 'Neural Narrative Engine',
    description: 'AI-powered multi-agent story collaboration environment.',
    type: 'react',
    path: '/apps/neural-narrative',
    component: NeuralNarrativeEngine,
  },
  {
    id: 'living-story',
    title: 'Living Story Interface',
    description: 'Streamlined variant of neural narrative with live agents.',
    type: 'react',
    path: '/apps/living-story',
    component: LivingStoryInterface,
  },
  // HTML prototypes now wrapped as React pages
  {
    id: 'em-radiation-advanced',
    title: 'Bra Underwire Electromagnetic Analysis (v2)',
    description: '3D patterns, SAR, Smith chart—focused on bra underwire behavior.',
    type: 'react',
    path: '/apps/em-advanced',
    component: AdvancedEMAnalysis,
  },
  {
    id: 'em-radiation-dashboard',
    title: 'Bra Underwire EM Dashboard (v1)',
    description: 'Radiation animation, SAR, material stats for bra underwire designs.',
    type: 'react',
    path: '/apps/em-dashboard',
    component: EMDashboard,
  },
  {
    id: 'dense-timeline-monitor',
    title: 'Dense Timeline Monitor',
    description: 'Live timeline visualization for services and alerts.',
    type: 'react',
    path: '/apps/timeline-monitor',
    component: DenseTimelineMonitor,
  },
  {
    id: 'lunar-harmonics',
    title: 'Lunar Harmonics Analysis',
    description: 'Static prototype (HTML file present).',
    type: 'react',
    path: '/apps/lunar-harmonics',
    component: LunarHarmonics,
  },
  {
    id: 'nasal-device-concepts',
    title: 'Nasal Device Concepts',
    description: 'Static prototype (HTML file present).',
    type: 'react',
    path: '/apps/nasal-device-concepts',
    component: NasalDeviceConcepts,
  },
  {
    id: 'conversation-analysis',
    title: 'Conversation Analysis Platform',
    description: 'Advanced conversation critique and analysis dashboard.',
    type: 'react',
    path: '/apps/conversation-analysis',
    component: ConversationAnalysis,
  },
  {
    id: 'agent-memory-viewer',
    title: 'Agent Memory Viewer',
    description: 'Visualization and management of agent memory systems.',
    type: 'react',
    path: '/apps/agent-memory-viewer',
    component: AgentMemoryViewer,
  },
]


