import React, { useState, useEffect } from 'react';

const IndividualPsychologyVisualization = () => {
  const [viewMode, setViewMode] = useState('both');
  const [selectedCategory, setSelectedCategory] = useState('emotions');
  const [selectedPersona, setSelectedPersona] = useState('creative-artist');
  const [hoveredElement, setHoveredElement] = useState(null);
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });
  const [expandedDepth, setExpandedDepth] = useState(3);
  const [showMethodology, setShowMethodology] = useState(false);

  // Individual personas with distinct psychological profiles
  const personas = {
    'creative-artist': {
      name: 'Maya Chen',
      title: 'Creative Artist & Designer',
      age: 28,
      background: 'Freelance graphic designer and painter living in Portland. Works from home studio, exhibits at local galleries.',
      story: 'Maya thrives on creative expression and aesthetic experiences. She experiences intense emotions that fuel her art, has high openness to experience, and strong aesthetic sensitivity. Her work requires deep focus states and emotional authenticity.',
      keyTraits: ['High creativity', 'Emotional intensity', 'Aesthetic sensitivity', 'Intrinsic motivation'],
      challenges: ['Income instability', 'Perfectionism', 'Social isolation during creative work'],
      methodology: 'Profile emphasizes heightened aesthetic emotions, creative flow states, high openness, and variable emotional regulation reflecting the artistic temperament.',
      avatar: '🎨',
      color: '#FF6B9D'
    },
    'executive-leader': {
      name: 'David Rodriguez',
      title: 'Corporate Executive',
      age: 42,
      background: 'VP of Operations at a Fortune 500 company. MBA from Wharton. Manages teams of 200+ employees across multiple regions.',
      story: 'David excels in high-pressure environments, making strategic decisions that affect thousands. His profile shows strong executive functions, leadership drive, and emotional regulation under stress, but lower openness to unconventional ideas.',
      keyTraits: ['Strategic thinking', 'Leadership skills', 'Stress resilience', 'Goal achievement'],
      challenges: ['Work-life balance', 'Delegation', 'Openness to change'],
      methodology: 'Enhanced cognitive control, achievement motivation, leadership traits, with measured emotional expression typical of executive roles.',
      avatar: '💼',
      color: '#4ECDC4'
    },
    'healthcare-worker': {
      name: 'Dr. Sarah Williams',
      title: 'Emergency Room Physician',
      age: 35,
      background: 'ER doctor at a major metropolitan hospital. Works 12-hour shifts, handles life-or-death decisions daily.',
      story: 'Sarah demonstrates exceptional empathy and compassion while maintaining clinical objectivity. Her profile shows high emotional intelligence, stress resilience, and the ability to compartmentalize emotions during critical situations.',
      keyTraits: ['Empathy', 'Stress tolerance', 'Decision-making under pressure', 'Helping motivation'],
      challenges: ['Burnout risk', 'Emotional exhaustion', 'Secondary trauma'],
      methodology: 'Elevated empathy and care emotions, strong stress regulation, high conscientiousness, with protective emotional barriers.',
      avatar: '⚕️',
      color: '#2ECC71'
    },
    'tech-entrepreneur': {
      name: 'Alex Kim',
      title: 'Tech Startup Founder',
      age: 31,
      background: 'Founded three startups, two successful exits. Currently building an AI company. Known for rapid prototyping and disruptive thinking.',
      story: 'Alex embodies the entrepreneurial mindset with high risk tolerance, innovative thinking, and intense drive. Shows elevated curiosity, low anxiety about uncertainty, and strong persistence despite frequent failures.',
      keyTraits: ['Innovation', 'Risk tolerance', 'Rapid learning', 'Persistence'],
      challenges: ['Perfectionism', 'Impatience', 'Work addiction'],
      methodology: 'High openness and curiosity, elevated achievement drive, strong cognitive flexibility, with moderated anxiety responses.',
      avatar: '💻',
      color: '#E67E22'
    },
    'social-activist': {
      name: 'Maria Santos',
      title: 'Social Justice Advocate',
      age: 26,
      background: 'Community organizer and nonprofit director. Coordinates grassroots movements, advocates for marginalized communities.',
      story: 'Maria is driven by deep moral convictions and empathy for others. Her profile shows intense social emotions, strong justice-oriented values, and high emotional reactivity to social issues, balanced by practical organizing skills.',
      keyTraits: ['Social empathy', 'Moral conviction', 'Community building', 'Justice orientation'],
      challenges: ['Emotional burnout', 'Cynicism', 'Financial stress'],
      methodology: 'Heightened social emotions and empathy, strong moral foundations, elevated stress from injustice, with community-focused identity.',
      avatar: '✊',
      color: '#9B59B6'
    },
    'academic-researcher': {
      name: 'Dr. James Thompson',
      title: 'University Professor & Researcher',
      age: 45,
      background: 'Tenured professor of cognitive psychology. Published 50+ papers, leads a research lab with graduate students.',
      story: 'James embodies intellectual curiosity and systematic thinking. His profile shows high analytical reasoning, love of learning, and preference for abstract concepts, with measured emotional expression and high attention to detail.',
      keyTraits: ['Analytical thinking', 'Intellectual curiosity', 'Systematic approach', 'Knowledge seeking'],
      challenges: ['Overthinking', 'Social awkwardness', 'Perfectionism'],
      methodology: 'Enhanced cognitive processes, high openness to ideas, strong analytical reasoning, with reduced emotional volatility.',
      avatar: '🔬',
      color: '#34495E'
    }
  };

  // Generate individual-specific psychology data
  const generatePersonalizedData = (personaKey) => {
    const persona = personas[personaKey];
    const baseMultipliers = {
      'creative-artist': {
        emotions: { primary: 1.3, complex: 1.4, regulation: 0.8, social: 1.1, motivational: 1.2, flow: 1.5 },
        cognition: { executive: 1.0, memory: 1.1, perceptual: 1.3, language: 1.2, reasoning: 1.1, consciousness: 1.3 },
        personality: { bigfive: [1.5, 0.9, 0.8, 1.2, 1.1, 1.0], strengths: 1.2, temperament: 1.2, cognitive: 1.1, values: 1.3, identity: 1.1 }
      },
      'executive-leader': {
        emotions: { primary: 0.9, complex: 1.0, regulation: 1.4, social: 1.2, motivational: 1.4, flow: 1.1 },
        cognition: { executive: 1.4, memory: 1.2, perceptual: 1.0, language: 1.1, reasoning: 1.3, consciousness: 1.0 },
        personality: { bigfive: [0.8, 1.4, 1.3, 1.0, 0.7, 1.1], strengths: 1.3, temperament: 1.0, cognitive: 1.2, values: 1.1, identity: 1.2 }
      },
      'healthcare-worker': {
        emotions: { primary: 1.1, complex: 1.3, regulation: 1.3, social: 1.4, motivational: 1.2, flow: 1.0 },
        cognition: { executive: 1.2, memory: 1.1, perceptual: 1.1, language: 1.0, reasoning: 1.2, consciousness: 1.1 },
        personality: { bigfive: [1.0, 1.3, 1.0, 1.4, 0.8, 1.2], strengths: 1.4, temperament: 1.1, cognitive: 1.0, values: 1.3, identity: 1.1 }
      },
      'tech-entrepreneur': {
        emotions: { primary: 1.0, complex: 1.1, regulation: 1.2, social: 0.9, motivational: 1.4, flow: 1.3 },
        cognition: { executive: 1.3, memory: 1.1, perceptual: 1.0, language: 1.0, reasoning: 1.4, consciousness: 1.2 },
        personality: { bigfive: [1.4, 1.2, 1.1, 0.9, 0.8, 1.0], strengths: 1.2, temperament: 1.3, cognitive: 1.3, values: 1.1, identity: 1.0 }
      },
      'social-activist': {
        emotions: { primary: 1.2, complex: 1.3, regulation: 0.9, social: 1.5, motivational: 1.3, flow: 1.0 },
        cognition: { executive: 1.1, memory: 1.0, perceptual: 1.1, language: 1.2, reasoning: 1.1, consciousness: 1.2 },
        personality: { bigfive: [1.2, 1.0, 1.2, 1.4, 1.1, 1.3], strengths: 1.3, temperament: 1.2, cognitive: 1.0, values: 1.5, identity: 1.4 }
      },
      'academic-researcher': {
        emotions: { primary: 0.8, complex: 1.0, regulation: 1.2, social: 0.9, motivational: 1.1, flow: 1.2 },
        cognition: { executive: 1.3, memory: 1.4, perceptual: 1.0, language: 1.3, reasoning: 1.5, consciousness: 1.3 },
        personality: { bigfive: [1.5, 1.3, 0.7, 1.0, 0.9, 1.1], strengths: 1.2, temperament: 0.9, cognitive: 1.4, values: 1.2, identity: 1.0 }
      }
    };

    const multipliers = baseMultipliers[personaKey];

    return {
      emotions: {
        name: 'Emotional Systems',
        baseColor: '#FF6B6B',
        totalIntensity: Math.round(2840 * ((multipliers.emotions.primary + multipliers.emotions.complex + multipliers.emotions.regulation + multipliers.emotions.social + multipliers.emotions.motivational + multipliers.emotions.flow) / 6)),
        children: [
          {
            name: 'Primary Emotions',
            intensity: Math.round(720 * multipliers.emotions.primary),
            color: '#FF4757',
            depth: 1,
            children: [
              { name: 'Joy', intensity: Math.round(95 * multipliers.emotions.primary), color: '#FFD93D', depth: 2, children: [
                { name: 'Euphoria', intensity: Math.round(25 * multipliers.emotions.primary), color: '#FFED4E', depth: 3 },
                { name: 'Contentment', intensity: Math.round(35 * multipliers.emotions.primary), color: '#FFF06C', depth: 3 },
                { name: 'Delight', intensity: Math.round(35 * multipliers.emotions.primary), color: '#FFF380', depth: 3 }
              ]},
              { name: 'Sadness', intensity: Math.round(78 * multipliers.emotions.primary), color: '#4A90E2', depth: 2, children: [
                { name: 'Grief', intensity: Math.round(28 * multipliers.emotions.primary), color: '#2D7DD2', depth: 3 },
                { name: 'Melancholy', intensity: Math.round(25 * multipliers.emotions.primary), color: '#5BA0F2', depth: 3 },
                { name: 'Despair', intensity: Math.round(25 * multipliers.emotions.primary), color: '#74B3FF', depth: 3 }
              ]},
              { name: 'Fear', intensity: Math.round(85 * multipliers.emotions.primary), color: '#9B59B6', depth: 2, children: [
                { name: 'Anxiety', intensity: Math.round(35 * multipliers.emotions.primary), color: '#B370CF', depth: 3 },
                { name: 'Terror', intensity: Math.round(25 * multipliers.emotions.primary), color: '#AF7AC5', depth: 3 },
                { name: 'Apprehension', intensity: Math.round(25 * multipliers.emotions.primary), color: '#C69BD3', depth: 3 }
              ]},
              { name: 'Anger', intensity: Math.round(72 * multipliers.emotions.primary), color: '#E74C3C', depth: 2, children: [
                { name: 'Rage', intensity: Math.round(28 * multipliers.emotions.primary), color: '#F56565', depth: 3 },
                { name: 'Irritation', intensity: Math.round(22 * multipliers.emotions.primary), color: '#FC8181', depth: 3 },
                { name: 'Resentment', intensity: Math.round(22 * multipliers.emotions.primary), color: '#FEB2B2', depth: 3 }
              ]},
              { name: 'Trust', intensity: Math.round(88 * multipliers.emotions.primary), color: '#2ECC71', depth: 2, children: [
                { name: 'Admiration', intensity: Math.round(32 * multipliers.emotions.primary), color: '#58D68D', depth: 3 },
                { name: 'Acceptance', intensity: Math.round(28 * multipliers.emotions.primary), color: '#7DCEA0', depth: 3 },
                { name: 'Faith', intensity: Math.round(28 * multipliers.emotions.primary), color: '#A9DFBF', depth: 3 }
              ]}
            ]
          },
          {
            name: 'Complex Emotions',
            intensity: Math.round(480 * multipliers.emotions.complex),
            color: '#E55039',
            depth: 1,
            children: [
              { name: 'Love', intensity: Math.round(92 * multipliers.emotions.complex), color: '#FF6B9D', depth: 2 },
              { name: 'Guilt', intensity: Math.round(65 * multipliers.emotions.complex), color: '#786FA6', depth: 2 },
              { name: 'Pride', intensity: Math.round(78 * multipliers.emotions.complex), color: '#F8C471', depth: 2 },
              { name: 'Empathy', intensity: Math.round(88 * multipliers.emotions.complex), color: '#3DC1D3', depth: 2 },
              { name: 'Curiosity', intensity: Math.round(85 * multipliers.emotions.complex), color: '#40407A', depth: 2 },
              { name: 'Gratitude', intensity: Math.round(75 * multipliers.emotions.complex), color: '#26A69A', depth: 2 }
            ]
          },
          {
            name: 'Emotional Regulation',
            intensity: Math.round(420 * multipliers.emotions.regulation),
            color: '#C44569',
            depth: 1,
            children: [
              { name: 'Mindfulness', intensity: Math.round(85 * multipliers.emotions.regulation), color: '#F8B500', depth: 2 },
              { name: 'Self-Control', intensity: Math.round(78 * multipliers.emotions.regulation), color: '#6C5CE7', depth: 2 },
              { name: 'Resilience', intensity: Math.round(82 * multipliers.emotions.regulation), color: '#00B894', depth: 2 },
              { name: 'Stress Response', intensity: Math.round(65 * multipliers.emotions.regulation), color: '#E17055', depth: 2 },
              { name: 'Emotional Intelligence', intensity: Math.round(88 * multipliers.emotions.regulation), color: '#A8E6CF', depth: 2 }
            ]
          },
          {
            name: 'Social Emotions',
            intensity: Math.round(380 * multipliers.emotions.social),
            color: '#FF3838',
            depth: 1,
            children: [
              { name: 'Attachment', intensity: Math.round(85 * multipliers.emotions.social), color: '#FF6B9D', depth: 2 },
              { name: 'Social Anxiety', intensity: Math.round(68 * multipliers.emotions.social), color: '#786FA6', depth: 2 },
              { name: 'Belongingness', intensity: Math.round(78 * multipliers.emotions.social), color: '#2ECC71', depth: 2 },
              { name: 'Leadership', intensity: Math.round(72 * multipliers.emotions.social), color: '#F39C12', depth: 2 },
              { name: 'Cooperation', intensity: Math.round(77 * multipliers.emotions.social), color: '#3498DB', depth: 2 }
            ]
          },
          {
            name: 'Motivational States',
            intensity: Math.round(450 * multipliers.emotions.motivational),
            color: '#FD79A8',
            depth: 1,
            children: [
              { name: 'Achievement Drive', intensity: Math.round(88 * multipliers.emotions.motivational), color: '#FDCB6E', depth: 2 },
              { name: 'Power Motivation', intensity: Math.round(65 * multipliers.emotions.motivational), color: '#A29BFE', depth: 2 },
              { name: 'Affiliation Need', intensity: Math.round(82 * multipliers.emotions.motivational), color: '#74B9FF', depth: 2 },
              { name: 'Autonomy Drive', intensity: Math.round(78 * multipliers.emotions.motivational), color: '#55A3FF', depth: 2 },
              { name: 'Growth Motivation', intensity: Math.round(85 * multipliers.emotions.motivational), color: '#FF7675', depth: 2 }
            ]
          },
          {
            name: 'Flow States',
            intensity: Math.round(390 * multipliers.emotions.flow),
            color: '#00CEC9',
            depth: 1,
            children: [
              { name: 'Deep Focus', intensity: Math.round(88 * multipliers.emotions.flow), color: '#74B9FF', depth: 2 },
              { name: 'Optimal Experience', intensity: Math.round(85 * multipliers.emotions.flow), color: '#00B894', depth: 2 },
              { name: 'Transcendence', intensity: Math.round(72 * multipliers.emotions.flow), color: '#E17055', depth: 2 },
              { name: 'Creative Flow', intensity: Math.round(78 * multipliers.emotions.flow), color: '#6C5CE7', depth: 2 },
              { name: 'Physical Flow', intensity: Math.round(67 * multipliers.emotions.flow), color: '#55EFC4', depth: 2 }
            ]
          }
        ]
      },
      cognition: {
        name: 'Cognitive Architecture',
        baseColor: '#4ECDC4',
        totalIntensity: Math.round(2650 * ((multipliers.cognition.executive + multipliers.cognition.memory + multipliers.cognition.perceptual + multipliers.cognition.language + multipliers.cognition.reasoning + multipliers.cognition.consciousness) / 6)),
        children: [
          {
            name: 'Executive Functions',
            intensity: Math.round(520 * multipliers.cognition.executive),
            color: '#1ABC9C',
            depth: 1,
            children: [
              { name: 'Working Memory', intensity: Math.round(92 * multipliers.cognition.executive), color: '#16A085', depth: 2 },
              { name: 'Cognitive Control', intensity: Math.round(88 * multipliers.cognition.executive), color: '#2ECC71', depth: 2 },
              { name: 'Attention Control', intensity: Math.round(85 * multipliers.cognition.executive), color: '#3498DB', depth: 2 },
              { name: 'Planning', intensity: Math.round(78 * multipliers.cognition.executive), color: '#9B59B6', depth: 2 },
              { name: 'Decision Making', intensity: Math.round(82 * multipliers.cognition.executive), color: '#E74C3C', depth: 2 },
              { name: 'Cognitive Flexibility', intensity: Math.round(75 * multipliers.cognition.executive), color: '#F39C12', depth: 2 }
            ]
          },
          {
            name: 'Memory Systems',
            intensity: Math.round(480 * multipliers.cognition.memory),
            color: '#3498DB',
            depth: 1,
            children: [
              { name: 'Long-term Memory', intensity: Math.round(95 * multipliers.cognition.memory), color: '#2980B9', depth: 2 },
              { name: 'Short-term Memory', intensity: Math.round(75 * multipliers.cognition.memory), color: '#1F618D', depth: 2 },
              { name: 'Encoding Processes', intensity: Math.round(82 * multipliers.cognition.memory), color: '#8E44AD', depth: 2 },
              { name: 'Retrieval Processes', intensity: Math.round(78 * multipliers.cognition.memory), color: '#27AE60', depth: 2 },
              { name: 'Memory Consolidation', intensity: Math.round(72 * multipliers.cognition.memory), color: '#E67E22', depth: 2 }
            ]
          },
          {
            name: 'Reasoning & Problem Solving',
            intensity: Math.round(450 * multipliers.cognition.reasoning),
            color: '#9B59B6',
            depth: 1,
            children: [
              { name: 'Logical Reasoning', intensity: Math.round(88 * multipliers.cognition.reasoning), color: '#8E44AD', depth: 2 },
              { name: 'Mathematical Cognition', intensity: Math.round(82 * multipliers.cognition.reasoning), color: '#7D3C98', depth: 2 },
              { name: 'Creative Problem Solving', intensity: Math.round(85 * multipliers.cognition.reasoning), color: '#6C3483', depth: 2 },
              { name: 'Analytical Thinking', intensity: Math.round(78 * multipliers.cognition.reasoning), color: '#5B2C6F', depth: 2 },
              { name: 'Metacognition', intensity: Math.round(75 * multipliers.cognition.reasoning), color: '#512E5F', depth: 2 }
            ]
          }
        ]
      },
      personality: {
        name: 'Personality Architecture',
        baseColor: '#A569BD',
        totalIntensity: Math.round(2420 * ((multipliers.personality.bigfive.reduce((a,b) => a+b, 0)/6 + multipliers.personality.strengths + multipliers.personality.temperament + multipliers.personality.cognitive + multipliers.personality.values + multipliers.personality.identity) / 6)),
        children: [
          {
            name: 'Big Five Dimensions',
            intensity: Math.round(485 * (multipliers.personality.bigfive.reduce((a,b) => a+b, 0)/6)),
            color: '#8E44AD',
            depth: 1,
            children: [
              { name: 'Openness to Experience', intensity: Math.round(88 * multipliers.personality.bigfive[0]), color: '#7D3C98', depth: 2 },
              { name: 'Conscientiousness', intensity: Math.round(82 * multipliers.personality.bigfive[1]), color: '#6C3483', depth: 2 },
              { name: 'Extraversion', intensity: Math.round(78 * multipliers.personality.bigfive[2]), color: '#5B2C6F', depth: 2 },
              { name: 'Agreeableness', intensity: Math.round(85 * multipliers.personality.bigfive[3]), color: '#512E5F', depth: 2 },
              { name: 'Neuroticism', intensity: Math.round(65 * multipliers.personality.bigfive[4]), color: '#4A235A', depth: 2 },
              { name: 'Honesty-Humility', intensity: Math.round(87 * multipliers.personality.bigfive[5]), color: '#3D1A4A', depth: 2 }
            ]
          },
          {
            name: 'Character Strengths',
            intensity: Math.round(420 * multipliers.personality.strengths),
            color: '#BB8FCE',
            depth: 1,
            children: [
              { name: 'Wisdom & Knowledge', intensity: Math.round(85 * multipliers.personality.strengths), color: '#AF7AC5', depth: 2 },
              { name: 'Courage', intensity: Math.round(78 * multipliers.personality.strengths), color: '#A569BD', depth: 2 },
              { name: 'Humanity', intensity: Math.round(82 * multipliers.personality.strengths), color: '#9B59B6', depth: 2 },
              { name: 'Justice', intensity: Math.round(75 * multipliers.personality.strengths), color: '#9149AE', depth: 2 },
              { name: 'Temperance', intensity: Math.round(68 * multipliers.personality.strengths), color: '#8739A6', depth: 2 },
              { name: 'Transcendence', intensity: Math.round(72 * multipliers.personality.strengths), color: '#7D299E', depth: 2 }
            ]
          },
          {
            name: 'Values & Beliefs',
            intensity: Math.round(425 * multipliers.personality.values),
            color: '#F4ECF7',
            depth: 1,
            children: [
              { name: 'Core Values', intensity: Math.round(88 * multipliers.personality.values), color: '#F0E4F3', depth: 2 },
              { name: 'Moral Foundations', intensity: Math.round(85 * multipliers.personality.values), color: '#ECDCEF', depth: 2 },
              { name: 'Life Philosophy', intensity: Math.round(78 * multipliers.personality.values), color: '#E8D4EB', depth: 2 },
              { name: 'Spiritual Beliefs', intensity: Math.round(72 * multipliers.personality.values), color: '#E0C4E3', depth: 2 }
            ]
          }
        ]
      }
    };
  };

  const currentPersona = personas[selectedPersona];
  const currentData = generatePersonalizedData(selectedPersona)[selectedCategory];

  // Flatten data for visualization
  const flattenData = (data, depth = 0) => {
    const result = [];
    
    const traverse = (items, currentDepth, parentId = '') => {
      items.forEach((item, index) => {
        const id = parentId ? `${parentId}-${index}` : `${index}`;
        
        if (currentDepth <= expandedDepth) {
          result.push({
            ...item,
            id,
            depth: currentDepth,
            hasChildren: item.children && item.children.length > 0
          });
          
          if (item.children && currentDepth < expandedDepth) {
            traverse(item.children, currentDepth + 1, id);
          }
        }
      });
    };
    
    traverse(data.children, 1);
    return result;
  };

  const flatData = flattenData(currentData);

  // Create sunburst segments with hierarchical structure
  const createHierarchicalSunburst = () => {
    const segments = [];
    let currentAngle = -Math.PI / 2;
    
    currentData.children.forEach((mainCategory, mainIndex) => {
      const mainPercentage = mainCategory.intensity / currentData.totalIntensity;
      const mainAngleSpan = mainPercentage * 2 * Math.PI;
      const mainEndAngle = currentAngle + mainAngleSpan;
      
      // Main category segment
      segments.push({
        ...mainCategory,
        startAngle: currentAngle,
        endAngle: mainEndAngle,
        percentage: mainPercentage * 100,
        radius: { inner: 60, outer: 100 },
        level: 1
      });
      
      // Sub-categories
      if (mainCategory.children) {
        let subAngle = currentAngle;
        const subTotal = mainCategory.children.reduce((sum, child) => sum + child.intensity, 0);
        
        mainCategory.children.forEach((subCategory, subIndex) => {
          const subPercentage = (subCategory.intensity / subTotal) * mainPercentage;
          const subAngleSpan = subPercentage * 2 * Math.PI;
          const subEndAngle = subAngle + subAngleSpan;
          
          segments.push({
            ...subCategory,
            startAngle: subAngle,
            endAngle: subEndAngle,
            percentage: subPercentage * 100,
            radius: { inner: 100, outer: 140 },
            level: 2,
            parent: mainCategory.name
          });
          
          // Third level
          if (subCategory.children && expandedDepth >= 3) {
            let thirdAngle = subAngle;
            const thirdTotal = subCategory.children.reduce((sum, child) => sum + child.intensity, 0);
            
            subCategory.children.forEach((thirdCategory) => {
              const thirdPercentage = (thirdCategory.intensity / thirdTotal) * subPercentage;
              const thirdAngleSpan = thirdPercentage * 2 * Math.PI;
              const thirdEndAngle = thirdAngle + thirdAngleSpan;
              
              segments.push({
                ...thirdCategory,
                startAngle: thirdAngle,
                endAngle: thirdEndAngle,
                percentage: thirdPercentage * 100,
                radius: { inner: 140, outer: 170 },
                level: 3,
                parent: subCategory.name
              });
              
              thirdAngle = thirdEndAngle;
            });
          }
          
          subAngle = subEndAngle;
        });
      }
      
      currentAngle = mainEndAngle;
    });
    
    return segments;
  };

  // Generate advanced treemap with hierarchical nesting
  const generateHierarchicalTreemap = () => {
    const container = { width: 500, height: 380 };
    const rectangles = [];
    let y = 0;
    
    currentData.children.forEach((mainCategory, mainIndex) => {
      const mainHeight = (mainCategory.intensity / currentData.totalIntensity) * container.height;
      
      // Main category rectangle
      rectangles.push({
        ...mainCategory,
        x: 0,
        y: y,
        width: container.width,
        height: mainHeight,
        level: 1,
        isParent: true
      });
      
      // Sub-categories within main category
      if (mainCategory.children) {
        let x = 0;
        const subTotal = mainCategory.children.reduce((sum, child) => sum + child.intensity, 0);
        
        mainCategory.children.forEach((subCategory, subIndex) => {
          const subWidth = (subCategory.intensity / subTotal) * container.width;
          
          rectangles.push({
            ...subCategory,
            x: x,
            y: y,
            width: subWidth,
            height: mainHeight,
            level: 2,
            parent: mainCategory.name,
            opacity: 0.8
          });
          
          // Third level nested rectangles
          if (subCategory.children && expandedDepth >= 3) {
            let subY = y;
            const thirdTotal = subCategory.children.reduce((sum, child) => sum + child.intensity, 0);
            
            subCategory.children.forEach((thirdCategory) => {
              const thirdHeight = (thirdCategory.intensity / thirdTotal) * mainHeight;
              
              rectangles.push({
                ...thirdCategory,
                x: x + 2,
                y: subY + 2,
                width: Math.max(subWidth - 4, 10),
                height: Math.max(thirdHeight - 4, 8),
                level: 3,
                parent: subCategory.name,
                opacity: 0.9
              });
              
              subY += thirdHeight;
            });
          }
          
          x += subWidth;
        });
      }
      
      y += mainHeight;
    });
    
    return rectangles;
  };

  const sunburstSegments = createHierarchicalSunburst();
  const treemapRects = generateHierarchicalTreemap();

  const PersonaProfile = () => (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
      <div className="flex items-start space-x-4">
        <div className="text-4xl" role="img">{currentPersona.avatar}</div>
        <div className="flex-1">
          <div className="flex items-center space-x-3 mb-2">
            <h2 className="text-2xl font-bold text-gray-800">{currentPersona.name}</h2>
            <span className="text-sm bg-gray-100 px-2 py-1 rounded text-gray-600">{currentPersona.title}</span>
            <span className="text-sm text-gray-500">Age {currentPersona.age}</span>
          </div>
          <p className="text-gray-600 mb-3">{currentPersona.background}</p>
          <div className="bg-blue-50 border-l-4 border-blue-400 p-3 mb-4">
            <p className="text-sm text-blue-800 italic">"{currentPersona.story}"</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-semibold text-gray-700 mb-2">Key Traits:</h4>
              <div className="flex flex-wrap gap-2">
                {currentPersona.keyTraits.map((trait, index) => (
                  <span key={index} className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                    {trait}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-gray-700 mb-2">Challenges:</h4>
              <div className="flex flex-wrap gap-2">
                {currentPersona.challenges.map((challenge, index) => (
                  <span key={index} className="text-xs bg-orange-100 text-orange-800 px-2 py-1 rounded">
                    {challenge}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const MethodologyPanel = () => (
    showMethodology && (
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200 p-6 mb-6">
        <h3 className="text-lg font-bold text-gray-800 mb-4">🔬 Methodology & Individual Differences</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold text-gray-700 mb-2">Profile Generation Method:</h4>
            <p className="text-sm text-gray-600 mb-3">{currentPersona.methodology}</p>
            
            <h4 className="font-semibold text-gray-700 mb-2">Theoretical Foundation:</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Big Five personality model</li>
              <li>• Trait-activation theory</li>
              <li>• Individual differences in emotion regulation</li>
              <li>• Cognitive-behavioral frameworks</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-gray-700 mb-2">Personalization Factors:</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Occupational demands and training</li>
              <li>• Life experiences and challenges</li>
              <li>• Cultural and social contexts</li>
              <li>• Developmental and biological factors</li>
              <li>• Personal values and motivations</li>
            </ul>
            
            <div className="mt-3 p-3 bg-yellow-50 border border-yellow-200 rounded">
              <p className="text-xs text-yellow-800">
                <strong>Note:</strong> These profiles are educational demonstrations based on psychological research, 
                not clinical assessments. Real individuals show much greater complexity and uniqueness.
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  );

  const HierarchicalSunburstView = () => {
    const centerX = 200;
    const centerY = 200;

    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          <div className="text-sm text-gray-600 font-medium">{currentData.name}</div>
        </div>

        <svg width="400" height="400" className="mx-auto">
          <defs>
            <filter id="glow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
            <filter id="shadow">
              <feDropShadow dx="2" dy="2" stdDeviation="2" floodOpacity="0.4"/>
            </filter>
          </defs>

          {/* Hierarchical sunburst segments */}
          {sunburstSegments.map((segment, index) => (
            <g key={`${segment.name}-${segment.level}-${index}`}>
              <path
                d={createArcPath(
                  centerX, 
                  centerY, 
                  segment.radius.inner, 
                  segment.radius.outer, 
                  segment.startAngle, 
                  segment.endAngle
                )}
                fill={segment.color}
                stroke="white"
                strokeWidth={segment.level === 1 ? "3" : segment.level === 2 ? "2" : "1"}
                className="cursor-pointer transition-all duration-300 hover:brightness-110"
                filter={hoveredElement === segment.name ? "url(#shadow)" : "none"}
                opacity={segment.level === 1 ? 1 : segment.level === 2 ? 0.9 : 0.8}
                onMouseEnter={(e) => {
                  setHoveredElement(segment.name);
                  setTooltipPos({ x: e.clientX, y: e.clientY });
                  setShowTooltip(true);
                }}
                onMouseLeave={() => {
                  setHoveredElement(null);
                  setShowTooltip(false);
                }}
              />

              {/* Labels for significant segments */}
              {segment.percentage > 3 && segment.level <= 2 && (
                <text
                  x={centerX + Math.cos((segment.startAngle + segment.endAngle) / 2) * (segment.radius.outer + 15)}
                  y={centerY + Math.sin((segment.startAngle + segment.endAngle) / 2) * (segment.radius.outer + 15)}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  className={`${segment.level === 1 ? 'text-xs font-semibold' : 'text-xs'} fill-gray-700 pointer-events-none`}
                  style={{ fontSize: segment.level === 1 ? '11px' : '9px' }}
                >
                  {segment.name.length > 15 ? segment.name.substring(0, 12) + '...' : segment.name}
                </text>
              )}
            </g>
          ))}

          {/* Center circle with total */}
          <circle
            cx={centerX}
            cy={centerY}
            r="50"
            fill="white"
            stroke="#e5e7eb"
            strokeWidth="3"
          />
          
          <text
            x={centerX}
            y={centerY - 8}
            textAnchor="middle"
            className="text-xl font-bold fill-gray-800"
          >
            {currentData.totalIntensity}
          </text>
          <text
            x={centerX}
            y={centerY + 8}
            textAnchor="middle"
            className="text-xs fill-gray-500 font-medium"
          >
            TOTAL UNITS
          </text>
        </svg>
      </div>
    );
  };

  const HierarchicalTreemapView = () => {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          <div className="text-sm text-gray-600 font-medium">{currentData.name}</div>
        </div>

        <div className="relative w-full h-96 bg-gray-50 rounded border overflow-hidden">
          <svg width="100%" height="100%" viewBox="0 0 500 380">
            {treemapRects.map((rect, index) => (
              <g key={`${rect.name}-${rect.level}-${index}`}>
                <rect
                  x={rect.x}
                  y={rect.y}
                  width={rect.width}
                  height={rect.height}
                  fill={rect.color}
                  stroke="white"
                  strokeWidth={rect.level === 1 ? "3" : rect.level === 2 ? "2" : "1"}
                  opacity={rect.opacity || (rect.level === 1 ? 0.7 : rect.level === 2 ? 0.8 : 0.9)}
                  className="cursor-pointer transition-all duration-300 hover:brightness-110"
                  onMouseEnter={(e) => {
                    setHoveredElement(rect.name);
                    setTooltipPos({ x: e.clientX, y: e.clientY });
                    setShowTooltip(true);
                  }}
                  onMouseLeave={() => {
                    setHoveredElement(null);
                    setShowTooltip(false);
                  }}
                />

                {/* Labels for significant rectangles */}
                {rect.width > 40 && rect.height > 25 && rect.level <= 2 && (
                  <>
                    <text
                      x={rect.x + rect.width / 2}
                      y={rect.y + rect.height / 2 - (rect.level === 1 ? 5 : 3)}
                      textAnchor="middle"
                      dominantBaseline="middle"
                      className={`${rect.level === 1 ? 'text-sm font-bold' : 'text-xs font-semibold'} fill-white pointer-events-none`}
                      style={{ fontSize: rect.level === 1 ? '12px' : '10px' }}
                    >
                      {rect.name.length > 20 ? rect.name.substring(0, 17) + '...' : rect.name}
                    </text>
                    <text
                      x={rect.x + rect.width / 2}
                      y={rect.y + rect.height / 2 + (rect.level === 1 ? 8 : 6)}
                      textAnchor="middle"
                      dominantBaseline="middle"
                      className="text-xs fill-white opacity-90 pointer-events-none"
                      style={{ fontSize: '9px' }}
                    >
                      {rect.intensity} units
                    </text>
                  </>
                )}

                {/* Small intensity indicators for tiny rectangles */}
                {rect.width <= 40 && rect.width > 15 && rect.height > 15 && rect.level === 3 && (
                  <text
                    x={rect.x + rect.width / 2}
                    y={rect.y + rect.height / 2}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    className="text-xs fill-white font-bold pointer-events-none"
                    style={{ fontSize: '8px' }}
                  >
                    {rect.intensity}
                  </text>
                )}
              </g>
            ))}
          </svg>
        </div>
      </div>
    );
  };

  // Create arc path helper function
  const createArcPath = (centerX, centerY, innerRadius, outerRadius, startAngle, endAngle) => {
    const x1 = centerX + innerRadius * Math.cos(startAngle);
    const y1 = centerY + innerRadius * Math.sin(startAngle);
    const x2 = centerX + outerRadius * Math.cos(startAngle);
    const y2 = centerY + outerRadius * Math.sin(startAngle);
    const x3 = centerX + outerRadius * Math.cos(endAngle);
    const y3 = centerY + outerRadius * Math.sin(endAngle);
    const x4 = centerX + innerRadius * Math.cos(endAngle);
    const y4 = centerY + innerRadius * Math.sin(endAngle);

    const largeArc = endAngle - startAngle > Math.PI ? 1 : 0;

    return `M ${x1} ${y1} L ${x2} ${y2} A ${outerRadius} ${outerRadius} 0 ${largeArc} 1 ${x3} ${y3} L ${x4} ${y4} A ${innerRadius} ${innerRadius} 0 ${largeArc} 0 ${x1} ${y1}`;
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Individual Psychology Profiles Visualization
          </h1>
          <p className="text-gray-600">
            Explore how psychological systems manifest differently across diverse personas and life contexts
          </p>
        </div>

        {/* Controls */}
        <div className="flex justify-center mb-6">
          <div className="flex items-center space-x-6 bg-white rounded-lg shadow-sm border border-gray-200 px-6 py-3">
            <select
              value={selectedPersona}
              onChange={(e) => setSelectedPersona(e.target.value)}
              className="border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {Object.entries(personas).map(([key, persona]) => (
                <option key={key} value={key}>
                  {persona.avatar} {persona.name} - {persona.title}
                </option>
              ))}
            </select>

            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="emotions">Emotional Systems</option>
              <option value="cognition">Cognitive Architecture</option>
              <option value="personality">Personality Architecture</option>
            </select>

            <div className="flex items-center space-x-2">
              <label className="text-sm text-gray-700">Depth:</label>
              <select
                value={expandedDepth}
                onChange={(e) => setExpandedDepth(parseInt(e.target.value))}
                className="border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value={1}>Level 1</option>
                <option value={2}>Level 2</option>
                <option value={3}>Level 3</option>
              </select>
            </div>

            <div className="flex space-x-2">
              <button
                onClick={() => setViewMode('radial')}
                className={`px-3 py-1 rounded text-sm transition-colors ${
                  viewMode === 'radial' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Radial
              </button>
              <button
                onClick={() => setViewMode('treemap')}
                className={`px-3 py-1 rounded text-sm transition-colors ${
                  viewMode === 'treemap' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Treemap
              </button>
              <button
                onClick={() => setViewMode('both')}
                className={`px-3 py-1 rounded text-sm transition-colors ${
                  viewMode === 'both' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Both
              </button>
            </div>

            <button
              onClick={() => setShowMethodology(!showMethodology)}
              className={`px-3 py-1 rounded text-sm transition-colors ${
                showMethodology ? 'bg-purple-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              🔬 Methodology
            </button>
          </div>
        </div>

        {/* Persona Profile */}
        <PersonaProfile />

        {/* Methodology Panel */}
        <MethodologyPanel />

        {/* Main Content */}
        <div className="flex justify-center">
          {viewMode === 'radial' && (
            <div className="w-fit">
              <HierarchicalSunburstView />
            </div>
          )}
          
          {viewMode === 'treemap' && (
            <div className="w-fit">
              <HierarchicalTreemapView />
            </div>
          )}
          
          {viewMode === 'both' && (
            <div className="grid grid-cols-2 gap-6 max-w-6xl">
              <HierarchicalSunburstView />
              <HierarchicalTreemapView />
            </div>
          )}
        </div>

        {/* Information Panel */}
        {hoveredElement && (
          <div className="mt-6 max-w-2xl mx-auto bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-bold text-lg text-gray-800 mb-2">{hoveredElement}</h3>
                <p className="text-sm text-gray-600 mb-4">
                  {(() => {
                    // Find the element in the hierarchy
                    let foundElement = null;
                    const searchInLevel = (items) => {
                      for (let item of items) {
                        if (item.name === hoveredElement) {
                          foundElement = item;
                          break;
                        }
                        if (item.children) {
                          searchInLevel(item.children);
                        }
                      }
                    };
                    searchInLevel(currentData.children);
                    
                    // Provide persona-specific descriptions
                    const descriptions = {
                      'creative-artist': {
                        'Joy': 'Intense aesthetic euphoria when creating or experiencing beauty',
                        'Creative Flow': 'Extended periods of artistic immersion and inspiration',
                        'Openness to Experience': 'Extremely high aesthetic sensitivity and creative imagination'
                      },
                      'executive-leader': {
                        'Achievement Drive': 'Strong goal orientation and competitive success motivation',
                        'Executive Functions': 'Highly developed planning, decision-making, and cognitive control',
                        'Leadership': 'Natural ability to influence and guide teams toward objectives'
                      },
                      'healthcare-worker': {
                        'Empathy': 'Deep emotional resonance with patient suffering and healing',
                        'Stress Response': 'Adaptive stress management for high-pressure medical situations',
                        'Compassion': 'Professional caring balanced with emotional protection'
                      }
                    };
                    
                    return descriptions[selectedPersona]?.[hoveredElement] || 
                           'Detailed psychological component with complex interactions and manifestations.';
                  })()}
                </p>
              </div>
              
              <div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-700">Intensity Level for {currentPersona.name}</span>
                    <span className="text-sm text-gray-600 font-semibold">
                      {(() => {
                        let foundElement = null;
                        const searchInLevel = (items) => {
                          for (let item of items) {
                            if (item.name === hoveredElement) {
                              foundElement = item;
                              break;
                            }
                            if (item.children) {
                              searchInLevel(item.children);
                            }
                          }
                        };
                        searchInLevel(currentData.children);
                        return foundElement?.intensity || 0;
                      })()} units
                    </span>
                  </div>
                  
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div 
                      className="h-3 rounded-full transition-all duration-300"
                      style={{ 
                        width: `${Math.min((((() => {
                          let foundElement = null;
                          const searchInLevel = (items) => {
                            for (let item of items) {
                              if (item.name === hoveredElement) {
                                foundElement = item;
                                break;
                              }
                              if (item.children) {
                                searchInLevel(item.children);
                              }
                            }
                          };
                          searchInLevel(currentData.children);
                          return foundElement?.intensity || 0;
                        })()) / 100) * 100, 100)}%`,
                        backgroundColor: (() => {
                          let foundElement = null;
                          const searchInLevel = (items) => {
                            for (let item of items) {
                              if (item.name === hoveredElement) {
                                foundElement = item;
                                break;
                              }
                              if (item.children) {
                                searchInLevel(item.children);
                              }
                            }
                          };
                          searchInLevel(currentData.children);
                          return foundElement?.color || '#6B7280';
                        })()
                      }}
                    />
                  </div>
                  
                  <div className="text-xs text-gray-500">
                    Individual variation from baseline reflects {currentPersona.name}'s unique profile
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Comparative Statistics Footer */}
        <div className="mt-8 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="font-bold text-lg text-gray-800 mb-4">{currentPersona.name}'s Profile Summary</h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-gray-800">
                {currentData.children.length}
              </div>
              <div className="text-sm text-gray-600">Main Categories</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-800">
                {currentData.children.reduce((sum, cat) => sum + (cat.children?.length || 0), 0)}
              </div>
              <div className="text-sm text-gray-600">Sub-Categories</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-800">
                {Math.round(currentData.totalIntensity / currentData.children.length)}
              </div>
              <div className="text-sm text-gray-600">Avg Intensity</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-800" style={{ color: currentPersona.color }}>
                {currentData.totalIntensity}
              </div>
              <div className="text-sm text-gray-600">Total Units</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-800">
                {Math.max(...currentData.children.map(c => c.intensity))}
              </div>
              <div className="text-sm text-gray-600">Peak Domain</div>
            </div>
          </div>
          
          <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded">
            <p className="text-sm text-blue-800">
              <strong>Individual Insight:</strong> {currentPersona.name}'s {selectedCategory} profile shows distinctive patterns 
              reflecting their {currentPersona.title.toLowerCase()} background and personal characteristics.
            </p>
          </div>
        </div>

        {/* Tooltip */}
        {showTooltip && hoveredElement && (
          <div
            className="fixed bg-gray-900 text-white text-xs rounded-lg px-3 py-2 pointer-events-none z-50 shadow-lg"
            style={{
              left: tooltipPos.x + 10,
              top: tooltipPos.y - 40,
            }}
          >
            <div className="font-semibold">{hoveredElement}</div>
            <div className="opacity-90">
              {(() => {
                let foundElement = null;
                const searchInLevel = (items) => {
                  for (let item of items) {
                    if (item.name === hoveredElement) {
                      foundElement = item;
                      break;
                    }
                    if (item.children) {
                      searchInLevel(item.children);
                    }
                  }
                };
                searchInLevel(currentData.children);
                return foundElement?.intensity || 0;
              })()} units • {currentPersona.name}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default IndividualPsychologyVisualization;