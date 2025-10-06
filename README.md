Many Project Concepts – Interactive Prototypes Workspace
--------------------------------------------------------

This repository contains a set of interactive prototypes (React apps and standalone HTML visualizations) unified in a single Vite + React + TypeScript workspace with Tailwind.

Quick start
- Install: npm install
- Dev server: npm run dev
- Open the home page to browse all prototypes. React apps open in-app; HTML pages open in a new tab.

Prototype catalog (grouped by domain)

Neuroscience & Cognitive Systems
- NeuroWave Professional Desktop — route: `/apps/brainwave`
- Agent Memory Viewer — route: `/apps/agent-memory-viewer`
- Individual Psychology Visualization — page: `src/pages/IndividualPsychologyViz.tsx`
- Neural Narrative Engine — route: `/apps/neural-narrative`
- Living Story Interface — route: `/apps/living-story`

Design & Visualization
- Dreamcatcher Designer Pro — route: `/apps/dreamcatcher`
- 3D Component Explorer — route: `/apps/component-viewer`
- Spatial Audio Demo — page: `src/pages/SpatialAudioDemo.tsx`
- LifeHub Wireframe — page: `src/pages/LifeHubWireframe.tsx`

Imaging & Data Science
- Image Registration Interface — route: `/apps/image-regression`
- Test Output Analyzer — page: `src/pages/TestOutputAnalyzer.tsx`

AI Tooling & NLP
- Conversation Analysis Platform — route: `/apps/conversation-analysis`
- Conversation Branching Tool — page: `src/pages/ConversationBranchingTool.tsx`
- Neural Comedy Engine — page: `src/pages/NeuralComedyEngine.tsx`

Career & Knowledge
- Multidisciplinary Professional Paths — route: `/apps/knowledge-garden`

Space & Speculative Systems
- Interstellar Consciousness Transfer — route: `/apps/consciousness`

Health & Guidance
- NeuroPharma Guide — page: `src/pages/NeuroPharmaGuide.tsx`

HTML scientific visualizations (embedded in-app)
- Electromagnetic Analysis System (v2) — route: `/apps/em-advanced`
- Electromagnetic Analysis Dashboard (v1) — route: `/apps/em-dashboard`
- Dense Timeline Monitor — route: `/apps/timeline-monitor`
- Lunar Harmonics Analysis — route: `/apps/lunar-harmonics`
- Nasal Device Concepts — route: `/apps/nasal-device-concepts`

Routing/structure
- Registry: `src/apps/index.tsx` defines titles, descriptions, and routes for all entries. The home page lists from this registry.
- Router: `src/main.tsx` auto-generates routes for React entries; HTML entries are embedded via `?raw` wrappers.

Dependencies
- React 18, react-router-dom 6, Tailwind 3, mathjs, recharts, lucide-react, Vite 5, TypeScript 5

Notes
- HTML prototypes are embedded in-app via `src/apps/*` wrappers using Vite raw imports.
- To add a new prototype, add a wrapper and register an entry in `APPS` in `src/apps/index.tsx`.

License
-------
This project is licensed under the PolyForm Noncommercial License 1.0.0. See `LICENSE.md`.

