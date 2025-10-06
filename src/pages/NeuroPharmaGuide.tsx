import React, { useState, useEffect } from 'react';
import { 
  Search, 
  ArrowRight, 
  ChevronLeft, 
  Sparkles,
  AlertTriangle,
  Clock,
  Brain,
  Pill,
  Droplet,
  Heart,
  Activity,
  HeartPulse,
  Shield,
  X,
  Check,
  Info,
  Lightbulb,
  User,
  Timer,
  BarChart,
  FileText,
  Hourglass,
  Compass
} from 'lucide-react';

const NeuroPharmaGuide = () => {
  // State management
  const [selectedSubstance, setSelectedSubstance] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showSubstanceModal, setShowSubstanceModal] = useState(false);
  const [currentView, setCurrentView] = useState('categories'); // 'categories', 'substances', 'session'
  const [showSafetyTip, setShowSafetyTip] = useState(false);
  const [safetyTipMessage, setShowSafetyTipMessage] = useState('');
  
  // Active session tracking
  const [sessionActive, setSessionActive] = useState(false);
  const [sessionTime, setSessionTime] = useState(0);
  const [sessionPhase, setSessionPhase] = useState(''); // onset, peak, comedown, after
  
  // Timer effect for active sessions
  useEffect(() => {
    let interval;
    if (sessionActive) {
      interval = setInterval(() => {
        setSessionTime(prev => {
          const newTime = prev + 1;
          
          // Update phase based on time (this would be substance-specific in a real app)
          if (selectedSubstance) {
            if (newTime <= 60) setSessionPhase('onset');
            else if (newTime <= 180) setSessionPhase('peak');
            else if (newTime <= 300) setSessionPhase('comedown');
            else setSessionPhase('after');
          }
          
          return newTime;
        });
      }, 60000); // Update every minute
    }
    return () => clearInterval(interval);
  }, [sessionActive, selectedSubstance]);
  
  // Format time as hours and minutes
  const formatTime = (timeInMinutes) => {
    const hours = Math.floor(timeInMinutes / 60);
    const minutes = timeInMinutes % 60;
    return `${hours}h ${minutes}m`;
  };
  
  // Safety tips by substance category
  const safetyTips = {
    psychedelics: [
      "Set and setting are crucial factors in determining experience quality - ensure both are positive and supportive.",
      "Hydration is important, but sip water regularly rather than consuming large amounts at once.",
      "Have a trusted, sober support person present, especially if this is your first experience."
    ],
    stimulants: [
      "Regular heart rate monitoring helps prevent overexertion - stay within safe cardiovascular ranges.",
      "Maintaining electrolyte balance with appropriate supplements supports physiological stability.",
      "Scheduling adequate recovery time between uses allows neurochemical systems to rebalance."
    ],
    depressants: [
      "Combining with other depressants significantly increases respiratory depression risks - avoid combinations.",
      "Having a support person monitor breathing during deep relaxation provides important safety oversight.",
      "Tracking your dose precisely helps maintain consistent effects without unintended intensity increases."
    ],
    entactogens: [
      "Body temperature regulation is essential - take breaks from physical activity and avoid overheating.",
      "Pre-loading with antioxidants may help reduce oxidative stress on neurological systems.",
      "Appropriate post-session supplements support neurochemical recovery and minimize after-effects."
    ],
    nootropics: [
      "Cycling usage patterns prevents tolerance development and maintains effectiveness.",
      "Pairing cognitive enhancers with appropriate tasks maximizes their beneficial effects.",
      "Monitoring effects systematically helps identify optimal personal dosages and combinations."
    ]
  };
  
  // Substance categories
  const categories = [
    {
      id: 'psychedelics',
      name: 'Psychedelics',
      color: 'bg-purple-600',
      textColor: 'text-purple-600',
      gradient: 'from-purple-600 to-purple-700',
      icon: '🧠',
      description: 'Substances that alter perception, cognition, and mood by primarily affecting serotonergic systems',
      safetyProfile: 'Low physiological toxicity, but may present psychological challenges',
      substances: [
        { 
          id: 'psilocybin',
          name: 'Psilocybin', 
          common: true, 
          riskProfile: 'Low physiological risk',
          onset: '30-60 minutes',
          peak: '2-3 hours',
          duration: '4-6 hours',
          afterEffects: '2-12 hours',
          supportiveTasks: ['Nature immersion', 'Art exploration', 'Musical engagement', 'Meditation', 'Journaling'],
          avoidTasks: ['Driving or operating machinery', 'Important decision-making', 'Public spaces with strangers', 'Potentially triggering environments'],
          preDosing: [
            { name: 'Magnesium Glycinate', timing: '2 hours before', purpose: 'Muscle relaxation', dosage: '200-400mg' },
            { name: 'Vitamin C', timing: '1-2 hours before', purpose: 'Antioxidant support', dosage: '500-1000mg' }
          ],
          duringDosing: [
            { name: 'Electrolytes', timing: 'Every 2 hours', purpose: 'Hydration support', dosage: 'As directed' },
            { name: 'L-Theanine', timing: 'As needed for anxiety', purpose: 'Promotes calm', dosage: '200mg' }
          ],
          postDosing: [
            { name: '5-HTP', timing: '24 hours after', purpose: 'Serotonin support', dosage: '100mg' },
            { name: 'Magnesium', timing: 'Before sleep', purpose: 'Muscle relaxation', dosage: '200-400mg' }
          ],
          mechanisms: [
            '5-HT2A receptor agonism',
            'Default mode network modulation',
            'Increased neuroplasticity',
            'Glutamate release enhancement'
          ],
          safetyNotes: [
            'Start with lower doses if inexperienced',
            'Avoid if you have personal or family history of psychosis',
            'Do not combine with lithium, tramadol, or MAOIs',
            'Set and setting are crucial for positive experiences'
          ]
        },
        { 
          id: 'lsd',
          name: 'LSD', 
          common: true, 
          riskProfile: 'Low physiological risk',
          onset: '30-60 minutes',
          peak: '3-5 hours',
          duration: '8-12 hours',
          afterEffects: '12-24 hours',
          supportiveTasks: ['Artistic expression', 'Music appreciation', 'Nature connection', 'Philosophical exploration', 'Gentle movement'],
          avoidTasks: ['Driving or operating machinery', 'Public environments', 'Important responsibilities', 'High-stress situations'],
          preDosing: [
            { name: 'Magnesium Glycinate', timing: '2 hours before', purpose: 'Muscle relaxation', dosage: '200-400mg' },
            { name: 'Vitamin C', timing: '1-2 hours before', purpose: 'Antioxidant support', dosage: '500-1000mg' }
          ],
          duringDosing: [
            { name: 'Electrolytes', timing: 'Every 3 hours', purpose: 'Hydration maintenance', dosage: 'As directed' },
            { name: 'L-Theanine', timing: 'As needed for tension', purpose: 'Promotes calmness', dosage: '200mg' }
          ],
          postDosing: [
            { name: 'Magnesium', timing: 'Before sleep', purpose: 'Muscle relaxation', dosage: '200-400mg' },
            { name: 'Melatonin', timing: 'If sleep is difficult', purpose: 'Sleep support', dosage: '0.5-1mg' }
          ],
          mechanisms: [
            '5-HT2A receptor agonism',
            'Increased prefrontal cortex activity',
            'Visual processing alterations',
            'Default mode network modulation'
          ],
          safetyNotes: [
            'Test substances with reagent kits for verification',
            'Start with low doses, particularly if inexperienced',
            'Avoid if personal or family history of psychosis',
            'Plan for the full duration including recovery time'
          ]
        },
        { 
          id: 'dmt',
          name: 'DMT', 
          common: false, 
          riskProfile: 'Low physiological risk when proper administration methods used',
          onset: 'Seconds to minutes',
          peak: '5-15 minutes',
          duration: '15-60 minutes',
          afterEffects: '30-60 minutes',
          supportiveTasks: ['Meditation', 'Comfortable seated or reclined position', 'Eyes closed exploration', 'Breathing techniques'],
          avoidTasks: ['Standing or walking', 'Complex environments', 'Social interactions', 'Tasks requiring attention'],
          preDosing: [
            { name: 'Magnesium Glycinate', timing: '1 hour before', purpose: 'Muscle relaxation', dosage: '200-400mg' }
          ],
          duringDosing: [
            { name: 'N/A', timing: 'Experience too short for supplementation', purpose: 'N/A', dosage: 'N/A' }
          ],
          postDosing: [
            { name: 'L-Theanine', timing: 'If needed for reintegration', purpose: 'Calm alertness', dosage: '200mg' }
          ],
          mechanisms: [
            '5-HT2A receptor agonism',
            'Sigma-1 receptor activation',
            'Neural network synchronization',
            'Visual processing center activation'
          ],
          safetyNotes: [
            'MAOI interactions can be dangerous - verify medication compatibility',
            'Proper administration technique is crucial',
            'Have a sitter present, especially for new users',
            'Verify legal status in your jurisdiction'
          ]
        }
      ]
    },
    {
      id: 'stimulants',
      name: 'Stimulants',
      color: 'bg-red-600',
      textColor: 'text-red-600',
      gradient: 'from-red-600 to-red-700',
      icon: '⚡',
      description: 'Substances that increase energy, alertness, and cognitive function by affecting dopaminergic and noradrenergic systems',
      safetyProfile: 'Cardiovascular monitoring important, potential for dependence',
      substances: [
        { 
          id: 'caffeine',
          name: 'Caffeine', 
          common: true, 
          riskProfile: 'Generally safe with appropriate dosing',
          onset: '15-45 minutes',
          peak: '30-75 minutes',
          duration: '3-5 hours',
          afterEffects: '4-6 hours',
          supportiveTasks: ['Focused work', 'Physical exercise', 'Learning tasks', 'Creative problem-solving', 'Reading comprehension'],
          avoidTasks: ['Relaxation activities', 'Sleep preparation', 'Meditation', 'Activities requiring calm'],
          preDosing: [
            { name: 'L-Theanine', timing: 'With caffeine', purpose: 'Smooth energy, reduced jitters', dosage: '100-200mg' }
          ],
          duringDosing: [
            { name: 'Water', timing: 'Regular intervals', purpose: 'Counteract dehydration', dosage: '8 oz every hour' }
          ],
          postDosing: [
            { name: 'Magnesium', timing: 'Evening', purpose: 'Muscular relaxation', dosage: '200-400mg' },
            { name: 'Vitamin C', timing: '4-6 hours after', purpose: 'Acidification to speed clearance', dosage: '500-1000mg' }
          ],
          mechanisms: [
            'Adenosine receptor antagonism',
            'Phosphodiesterase inhibition',
            'Increased dopamine signaling',
            'Enhanced catecholamine release'
          ],
          safetyNotes: [
            'Limit consumption after midday to protect sleep',
            'Manage dose to prevent tolerance development',
            'Stay hydrated to counter diuretic effects',
            'Monitor cardiovascular response, especially with higher doses'
          ]
        },
        { 
          id: 'modafinil',
          name: 'Modafinil', 
          common: false, 
          riskProfile: 'Well-tolerated but requires prescription in most regions',
          onset: '30-60 minutes',
          peak: '2-4 hours',
          duration: '8-12 hours',
          afterEffects: '2-4 hours',
          supportiveTasks: ['Extended cognitive work', 'Focus-requiring tasks', 'Learning new information', 'Analytical thinking', 'Complex problem-solving'],
          avoidTasks: ['Sleep preparation', 'Deep relaxation', 'Activities requiring emotional engagement'],
          preDosing: [
            { name: 'Choline', timing: 'Morning with dose', purpose: 'Cognitive support', dosage: '250-500mg' }
          ],
          duringDosing: [
            { name: 'Water', timing: 'Regular intervals', purpose: 'Counteract dry mouth', dosage: '8 oz every hour' },
            { name: 'Electrolytes', timing: 'Midday', purpose: 'Hydration support', dosage: 'As directed' }
          ],
          postDosing: [
            { name: 'Magnesium', timing: 'Evening', purpose: 'Muscle relaxation', dosage: '200-400mg' },
            { name: 'Melatonin', timing: 'If sleep difficult', purpose: 'Sleep regulation', dosage: '0.5-1mg' }
          ],
          mechanisms: [
            'Dopamine reuptake inhibition',
            'Orexin/hypocretin system enhancement',
            'Glutamate/GABA balance modulation',
            'Histamine signaling effects'
          ],
          safetyNotes: [
            'Verify legal status and prescription requirements',
            'Morning use only to prevent sleep disruption',
            'Maintain hydration throughout use period',
            'Can affect hormonal contraceptives - use backup methods'
          ]
        },
        { 
          id: 'methylphenidate',
          name: 'Methylphenidate', 
          common: false, 
          riskProfile: 'Medical supervision recommended, prescription required',
          onset: '20-60 minutes',
          peak: '1-3 hours',
          duration: '3-6 hours',
          afterEffects: '2-4 hours',
          supportiveTasks: ['Focused attention tasks', 'Executive function activities', 'Organization work', 'Reading comprehension', 'Learning new skills'],
          avoidTasks: ['Sleep preparation', 'Activities requiring emotional sensitivity', 'Meditation', 'Highly creative work'],
          preDosing: [
            { name: 'Magnesium Glycinate', timing: 'With dose', purpose: 'Reduce tension', dosage: '200mg' },
            { name: 'Vitamin C', timing: 'Not within 1 hour of dose', purpose: 'Affects absorption', dosage: 'Avoid near dosing' }
          ],
          duringDosing: [
            { name: 'Water', timing: 'Regular intervals', purpose: 'Counteract dry mouth', dosage: '8 oz every hour' },
            { name: 'Protein-rich snack', timing: '2 hours after dose', purpose: 'Support catecholamine production', dosage: '10-20g protein' }
          ],
          postDosing: [
            { name: 'Vitamin C', timing: 'Evening', purpose: 'Acidification to speed clearance', dosage: '500-1000mg' },
            { name: 'Magnesium', timing: 'Evening', purpose: 'Muscle relaxation', dosage: '200-400mg' }
          ],
          mechanisms: [
            'Dopamine reuptake inhibition',
            'Norepinephrine reuptake inhibition',
            'Increased catecholamine release',
            'Prefrontal cortex activation enhancement'
          ],
          safetyNotes: [
            'Medical supervision and prescription required',
            'Monitor cardiovascular effects (heart rate, blood pressure)',
            'Regular tolerance and dependency assessment',
            'Potential appetite suppression requires nutritional planning'
          ]
        }
      ]
    },
    {
      id: 'nootropics',
      name: 'Nootropics',
      color: 'bg-blue-600',
      textColor: 'text-blue-600',
      gradient: 'from-blue-600 to-blue-700',
      icon: '💡',
      description: 'Cognitive enhancers that support various aspects of brain function with generally mild effects',
      safetyProfile: 'Generally well-tolerated with appropriate cycling',
      substances: [
        { 
          id: 'racetams',
          name: 'Racetams', 
          common: false, 
          riskProfile: 'Well-tolerated with appropriate dosing',
          onset: '30-60 minutes',
          peak: '1-3 hours',
          duration: '4-8 hours',
          afterEffects: '2-4 hours',
          supportiveTasks: ['Memory-intensive tasks', 'Verbal fluency activities', 'Learning new information', 'Complex problem-solving', 'Technical reading'],
          avoidTasks: ['Activities requiring physical endurance', 'Sleep preparation', 'Highly emotional activities'],
          preDosing: [
            { name: 'Choline source', timing: 'With dose', purpose: 'Prevent headaches, support acetylcholine', dosage: '250-500mg CDP-Choline or Alpha-GPC' }
          ],
          duringDosing: [
            { name: 'Water', timing: 'Regular intervals', purpose: 'Optimal brain hydration', dosage: '8 oz every hour' }
          ],
          postDosing: [
            { name: 'B-Complex', timing: 'With meal after', purpose: 'Support neurotransmitter production', dosage: 'As directed' }
          ],
          mechanisms: [
            'Acetylcholine system modulation',
            'Membrane fluidity enhancement',
            'AMPA receptor modulation',
            'Increased cerebral blood flow'
          ],
          safetyNotes: [
            'Start with lower doses to assess response',
            'Cycle usage to prevent tolerance (e.g., 4-8 weeks on, 1-2 weeks off)',
            'Choline supplementation often necessary to prevent headaches',
            'Consider kidney function with long-term use'
          ]
        },
        { 
          id: 'bacopa',
          name: 'Bacopa Monnieri', 
          common: true, 
          riskProfile: 'Well-tolerated with chronic use',
          onset: 'Cumulative (4-6 weeks)',
          peak: 'After 8-12 weeks of consistent use',
          duration: 'Ongoing with consistent use',
          afterEffects: 'Effects persist 1-2 weeks after discontinuation',
          supportiveTasks: ['Memory consolidation', 'Information retention', 'Learning new material', 'Stress management activities', 'Focus-requiring tasks'],
          avoidTasks: ['Activities requiring immediate cognitive enhancement', 'High stress situations without prior adaptation'],
          preDosing: [
            { name: 'Take with fat', timing: 'With dose', purpose: 'Enhance absorption', dosage: 'Small amount of healthy fat' }
          ],
          duringDosing: [
            { name: 'Consistent timing', timing: 'Daily', purpose: 'Maintain steady levels', dosage: 'Same time each day' }
          ],
          postDosing: [
            { name: 'N/A', timing: 'N/A', purpose: 'Long-term use substance', dosage: 'N/A' }
          ],
          mechanisms: [
            'Acetylcholine system enhancement',
            'Antioxidant neuroprotection',
            'Cerebral blood flow support',
            'Dendritic growth enhancement'
          ],
          safetyNotes: [
            'May initially cause mild gastrointestinal effects',
            'Best results require consistent daily use for 8-12 weeks',
            'Take with meals to minimize digestive discomfort',
            'Benefits are cumulative rather than acute'
          ]
        },
        { 
          id: 'lions-mane',
          name: 'Lion\'s Mane Mushroom', 
          common: true, 
          riskProfile: 'Well-tolerated, even with extended use',
          onset: 'Cumulative (2-4 weeks)',
          peak: 'After 4-8 weeks of consistent use',
          duration: 'Ongoing with consistent use',
          afterEffects: 'Effects diminish gradually over 1-3 weeks',
          supportiveTasks: ['Creative thinking', 'Learning tasks', 'Memory-intensive work', 'Neuroplasticity-enhancing activities (learning new skills)', 'Cognitive recovery'],
          avoidTasks: ['None specifically contraindicated'],
          preDosing: [
            { name: 'Vitamin D', timing: 'Morning supplement regimen', purpose: 'Synergistic neurotropic effects', dosage: '1000-2000 IU' }
          ],
          duringDosing: [
            { name: 'Consistent schedule', timing: 'Daily', purpose: 'Maintain steady levels', dosage: 'Morning and evening doses' }
          ],
          postDosing: [
            { name: 'N/A', timing: 'N/A', purpose: 'Long-term use substance', dosage: 'N/A' }
          ],
          mechanisms: [
            'Nerve Growth Factor stimulation',
            'Brain-Derived Neurotrophic Factor enhancement',
            'Myelination support',
            'Anti-inflammatory activity in neural tissues'
          ],
          safetyNotes: [
            'Source quality important - look for hot water extract or dual extract',
            'Consistent daily use necessary for benefits',
            'Consider cycling (3 months on, 1 month off) for some users',
            'Rare allergic reactions possible in mushroom-sensitive individuals'
          ]
        }
      ]
    },
    {
      id: 'depressants',
      name: 'Depressants',
      color: 'bg-indigo-600',
      textColor: 'text-indigo-600',
      gradient: 'from-indigo-600 to-indigo-700',
      icon: '🌙',
      description: 'Substances that decrease CNS activity, typically affecting GABA systems to produce calming effects',
      safetyProfile: 'Respiratory monitoring important, high risk when combined with other depressants',
      substances: [
        { 
          id: 'alcohol',
          name: 'Alcohol', 
          common: true, 
          riskProfile: 'Moderation crucial, risk increases with quantity',
          onset: '10-30 minutes',
          peak: '30-90 minutes',
          duration: '1-3 hours per drink',
          afterEffects: '12-24 hours',
          supportiveTasks: ['Social interaction (moderate amounts)', 'Relaxation activities', 'Gentle creative exploration'],
          avoidTasks: ['Driving or operating machinery', 'Complex cognitive tasks', 'Decision-making', 'Physical coordination activities', 'Learning new information'],
          preDosing: [
            { name: 'N-Acetyl Cysteine', timing: '30 minutes before', purpose: 'Glutathione support', dosage: '600mg' },
            { name: 'B-Complex', timing: '1 hour before', purpose: 'Support alcohol metabolism', dosage: 'As directed' }
          ],
          duringDosing: [
            { name: 'Water', timing: 'Between alcoholic drinks', purpose: 'Maintain hydration', dosage: '8 oz per alcoholic drink' }
          ],
          postDosing: [
            { name: 'Electrolytes', timing: 'Before sleep and morning', purpose: 'Rehydration', dosage: 'As directed' },
            { name: 'Magnesium', timing: 'Before sleep', purpose: 'Neurological support', dosage: '200-400mg' }
          ],
          mechanisms: [
            'GABA receptor positive modulation',
            'Glutamate receptor inhibition',
            'Dopamine system activation (initial phase)',
            'Multiple neurotransmitter disruption'
          ],
          safetyNotes: [
            'Consume with food to slow absorption',
            'Space drinks to maintain safe blood alcohol levels',
            'NEVER combine with other depressants (benzodiazepines, opioids)',
            'Stay hydrated but don\'t overhydrate (1 water per alcoholic drink)'
          ]
        },
        { 
          id: 'benzodiazepines',
          name: 'Benzodiazepines', 
          common: false, 
          riskProfile: 'Medical supervision necessary, dependency potential',
          onset: '15-60 minutes',
          peak: '1-2 hours',
          duration: '4-12 hours (varies by type)',
          afterEffects: '12-24 hours',
          supportiveTasks: ['Anxiety management (therapeutic use)', 'Muscle relaxation (therapeutic)'],
          avoidTasks: ['Driving or operating machinery', 'Complex cognitive tasks', 'Learning activities', 'Memory-dependent tasks', 'Physical coordination activities'],
          preDosing: [
            { name: 'Medical confirmation', timing: 'Before regimen', purpose: 'Verify appropriate use', dosage: 'Consultation' }
          ],
          duringDosing: [
            { name: 'Use as prescribed', timing: 'Per prescription', purpose: 'Safety management', dosage: 'Prescribed amount only' }
          ],
          postDosing: [
            { name: 'Medical monitoring', timing: 'Regular intervals', purpose: 'Dependency prevention', dosage: 'Scheduled assessment' }
          ],
          mechanisms: [
            'GABA-A receptor positive modulation',
            'Benzodiazepine binding site activation',
            'Chloride ion channel activity enhancement',
            'CNS activity reduction'
          ],
          safetyNotes: [
            'Medical supervision and prescription REQUIRED',
            'High dependency and tolerance potential',
            'NEVER combine with other depressants (alcohol, opioids)',
            'Tapering necessary for discontinuation after extended use'
          ]
        },
        { 
          id: 'kava',
          name: 'Kava', 
          common: true, 
          riskProfile: 'Generally safe with quality sources',
          onset: '20-30 minutes',
          peak: '1-2 hours',
          duration: '2-4 hours',
          afterEffects: '1-3 hours',
          supportiveTasks: ['Relaxation activities', 'Social anxiety management', 'Mild stress relief', 'Evening wind-down'],
          avoidTasks: ['Driving or operating machinery', 'Complex cognitive tasks', 'Physical coordination activities'],
          preDosing: [
            { name: 'Empty stomach', timing: '1-2 hours before', purpose: 'Enhanced effects', dosage: 'Dietary timing' }
          ],
          duringDosing: [
            { name: 'Healthy fat', timing: 'With kava', purpose: 'Kavalactone absorption', dosage: 'Small amount' }
          ],
          postDosing: [
            { name: 'Water', timing: 'After session', purpose: 'Hydration', dosage: '16 oz' }
          ],
          mechanisms: [
            'GABA receptor modulation',
            'Mild dopamine reuptake inhibition',
            'Norepinephrine reduction',
            'Glutamate modulation'
          ],
          safetyNotes: [
            'Use only noble kava varieties from reputable sources',
            'Avoid with liver conditions or during pregnancy',
            'Do not combine with alcohol or other depressants',
            'Limit use to 2-3 times per week for most users'
          ]
        }
      ]
    }
  ];
  
  // Handle category selection
  const handleCategorySelect = (categoryId) => {
    // Don't reselect the same category
    if (selectedCategory === categoryId) return;
    
    // Clear any selected substance when changing categories
    setSelectedSubstance(null);
    setSelectedCategory(categoryId);
    setCurrentView('substances');
    
    // Display a random safety tip when a category is selected
    const tips = safetyTips[categoryId] || [];
    if (tips.length > 0) {
      const randomIndex = Math.floor(Math.random() * tips.length);
      setShowSafetyTipMessage(tips[randomIndex]);
      setShowSafetyTip(true);
      
      // Hide the message after a few seconds
      setTimeout(() => {
        setShowSafetyTip(false);
      }, 8000);
    }
  };
  
  // Handle substance selection
  const handleSubstanceSelect = (substance) => {
    setSelectedSubstance(substance);
    setShowSubstanceModal(true);
  };
  
  // Handle back button
  const handleBack = () => {
    if (currentView === 'substances') {
      setCurrentView('categories');
      setSelectedCategory(null);
    } else if (currentView === 'session') {
      setShowSubstanceModal(true);
      setCurrentView('substances');
    }
  };
  
  // Start session with selected substance
  const startSession = () => {
    setSessionActive(true);
    setSessionTime(0);
    setSessionPhase('onset');
    setShowSubstanceModal(false);
    setCurrentView('session');
  };

  // View for substance categories selection
  const CategoriesView = () => (
    <div className="space-y-8">
      <section className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-6 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
          <h2 className="text-2xl font-bold mb-2">NeuroPharma Guide</h2>
          <p className="text-blue-100">
            Evidence-based information to support responsible substance use and cognitive optimization
          </p>
        </div>
      
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-6">
          {categories.map(category => (
            <div 
              key={category.id} 
              className="bg-white border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => handleCategorySelect(category.id)}
            >
              <div className={`p-4 bg-gradient-to-r ${category.gradient} text-white`}>
                <div className="flex items-center">
                  <span className="text-3xl mr-3">{category.icon}</span>
                  <h3 className="text-lg font-semibold">{category.name}</h3>
                </div>
              </div>
              
              <div className="p-4">
                <p className="text-gray-700 mb-3">{category.description}</p>
                <div className="text-sm text-gray-600 flex items-center">
                  <Shield className="w-4 h-4 mr-1" />
                  {category.safetyProfile}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
      
      <section className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-6 bg-gradient-to-r from-purple-600 to-purple-800 text-white">
          <h2 className="text-2xl font-bold mb-2">
            <Brain className="inline-block w-6 h-6 mr-2" />
            Active Session Support
          </h2>
          <p className="text-purple-100">
            Already took something? Get real-time guidance based on current phase
          </p>
        </div>
        
        <div className="p-6">
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-5 mb-4">
            <h3 className="text-lg font-semibold text-purple-800 mb-3">I Already Took Something</h3>
            <p className="text-gray-700 mb-4">
              Get phase-specific guidance for maximizing safety and positive outcomes based on what you've taken and when.
            </p>
            <button 
              className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg flex items-center"
              onClick={() => setCurrentView('substances')}
            >
              Start Active Session
              <ArrowRight className="w-4 h-4 ml-2" />
            </button>
          </div>
          
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-5">
            <h3 className="text-lg font-semibold text-blue-800 mb-3">I Want to Plan Ahead</h3>
            <p className="text-gray-700 mb-4">
              Research evidence-based information before use, including proper timing for supplements, safety protocols, and cognitive optimization strategies.
            </p>
            <button 
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center"
              onClick={() => setCurrentView('categories')}
            >
              Explore Substances
              <ArrowRight className="w-4 h-4 ml-2" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
  
  // View for substances within a selected category
  const SubstancesView = () => {
    const category = categories.find(c => c.id === selectedCategory);
    if (!category && !sessionActive) return <CategoriesView />;
    
    return (
      <div className="space-y-6">
        <div className="flex items-center mb-4">
          <button 
            className="flex items-center text-gray-600 hover:text-gray-900"
            onClick={handleBack}
          >
            <ChevronLeft className="w-5 h-5 mr-1" />
            {sessionActive ? "Back to substance details" : "Back to all categories"}
          </button>
        </div>
        
        {category && (
          <div className={`bg-white rounded-lg shadow-md overflow-hidden border-t-4 ${category.color}`}>
            <div className="p-6">
              <div className="flex items-center mb-2">
                <span className="text-3xl mr-3">{category.icon}</span>
                <h2 className="text-2xl font-bold">{category.name}</h2>
              </div>
              <p className="text-gray-700 mb-3">{category.description}</p>
              <div className="text-sm text-gray-600 flex items-center">
                <Shield className="w-4 h-4 mr-1" />
                {category.safetyProfile}
              </div>
            </div>
          </div>
        )}
        
        {showSafetyTip && (
          <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4">
            <div className="flex items-start">
              <Info className="w-5 h-5 text-indigo-500 mt-1 mr-2 flex-shrink-0" />
              <p className="text-indigo-800 italic">{safetyTipMessage}</p>
            </div>
          </div>
        )}
        
        {sessionActive ? (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-bold mb-4">What substance did you take?</h3>
            <p className="text-gray-700 mb-6">Select the substance you've taken to begin tracking your session and receive phase-specific guidance.</p>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {categories.map(category => 
                category.substances.map(substance => (
                  <button
                    key={substance.id}
                    className="bg-gray-100 hover:bg-blue-50 p-3 rounded-lg flex flex-col items-center transition-colors"
                    onClick={() => handleSubstanceSelect(substance)}
                  >
                    <Pill className="w-8 h-8 text-gray-700 mb-2" />
                    <span className="text-sm font-medium">{substance.name}</span>
                  </button>
                ))
              )}
              <button
                className="bg-gray-100 hover:bg-blue-50 p-3 rounded-lg flex flex-col items-center transition-colors"
              >
                <Search className="w-8 h-8 text-gray-700 mb-2" />
                <span className="text-sm font-medium">Other</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-4 bg-gray-50 border-b">
                <h3 className="text-lg font-semibold text-gray-800">
                  Common Substances
                </h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
                {category.substances.filter(substance => substance.common).map(substance => (
                  <div 
                    key={substance.id} 
                    className="bg-white border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                    onClick={() => handleSubstanceSelect(substance)}
                  >
                    <div className="p-4 border-b">
                      <div className="flex items-center justify-between">
                        <h4 className="text-lg font-medium">{substance.name}</h4>
                        <span className={`${category.textColor} bg-gray-100 text-xs px-2 py-1 rounded-full flex items-center`}>
                          {substance.riskProfile}
                        </span>
                      </div>
                    </div>
                    
                    <div className="p-4 border-b">
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div className="flex items-center">
                          <Clock className="w-3 h-3 text-gray-500 mr-1" />
                          <span className="text-gray-600">Onset: {substance.onset}</span>
                        </div>
                        <div className="flex items-center">
                          <BarChart className="w-3 h-3 text-gray-500 mr-1" />
                          <span className="text-gray-600">Peak: {substance.peak}</span>
                        </div>
                        <div className="flex items-center">
                          <Hourglass className="w-3 h-3 text-gray-500 mr-1" />
                          <span className="text-gray-600">Duration: {substance.duration}</span>
                        </div>
                        <div className="flex items-center">
                          <Timer className="w-3 h-3 text-gray-500 mr-1" />
                          <span className="text-gray-600">After: {substance.afterEffects}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-4 text-center">
                      <span className="text-indigo-700 font-medium flex items-center justify-center">
                        Full safety & optimization guide
                        <ArrowRight className="w-4 h-4 ml-1" />
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-4 bg-gray-50 border-b">
                <h3 className="text-lg font-semibold text-gray-800 flex items-center">
                  <Compass className="w-5 h-5 text-blue-500 mr-2" />
                  Less Common Options
                </h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
                {category.substances.filter(substance => !substance.common).map(substance => (
                  <div 
                    key={substance.id} 
                    className="bg-white border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                    onClick={() => handleSubstanceSelect(substance)}
                  >
                    <div className="p-4 border-b">
                      <div className="flex items-center justify-between">
                        <h4 className="text-lg font-medium">{substance.name}</h4>
                        <span className={`${category.textColor} bg-gray-100 text-xs px-2 py-1 rounded-full flex items-center`}>
                          {substance.riskProfile}
                        </span>
                      </div>
                    </div>
                    
                    <div className="p-4 border-b">
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div className="flex items-center">
                          <Clock className="w-3 h-3 text-gray-500 mr-1" />
                          <span className="text-gray-600">Onset: {substance.onset}</span>
                        </div>
                        <div className="flex items-center">
                          <BarChart className="w-3 h-3 text-gray-500 mr-1" />
                          <span className="text-gray-600">Peak: {substance.peak}</span>
                        </div>
                        <div className="flex items-center">
                          <Hourglass className="w-3 h-3 text-gray-500 mr-1" />
                          <span className="text-gray-600">Duration: {substance.duration}</span>
                        </div>
                        <div className="flex items-center">
                          <Timer className="w-3 h-3 text-gray-500 mr-1" />
                          <span className="text-gray-600">After: {substance.afterEffects}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-4 text-center">
                      <span className="text-indigo-700 font-medium flex items-center justify-center">
                        Full safety & optimization guide
                        <ArrowRight className="w-4 h-4 ml-1" />
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };
  
  // View for active session
  const SessionView = () => {
    if (!selectedSubstance) return <SubstancesView />;
    
    // Determine appropriate supplements based on phase
    const getCurrentPhaseSupplements = () => {
      if (sessionPhase === 'onset' || sessionPhase === 'peak') {
        return selectedSubstance.duringDosing;
      } else if (sessionPhase === 'comedown' || sessionPhase === 'after') {
        return selectedSubstance.postDosing;
      }
      return [];
    };
    
    // Get recommended activities for current phase
    const getPhaseActivities = () => {
      // In a real app, these would be phase-specific
      return selectedSubstance.supportiveTasks.slice(0, 4);
    };
    
    return (
      <div className="space-y-6">
        <div className="flex items-center mb-4">
          <button 
            className="flex items-center text-gray-600 hover:text-gray-900"
            onClick={handleBack}
          >
            <ChevronLeft className="w-5 h-5 mr-1" />
            Back to substance selection
          </button>
        </div>
        
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-6 bg-gradient-to-r from-indigo-600 to-indigo-800 text-white">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-2xl font-bold">Active Session: {selectedSubstance.name}</h2>
              <div className="flex items-center bg-indigo-800 bg-opacity-50 px-3 py-1 rounded-full">
                <Clock className="w-4 h-4 text-white mr-2" />
                <span>{formatTime(sessionTime)}</span>
              </div>
            </div>
            <div className="flex items-center text-indigo-200">
              <Activity className="w-4 h-4 mr-2" />
              <span>Current Phase: <span className="font-medium text-white">{sessionPhase.charAt(0).toUpperCase() + sessionPhase.slice(1)}</span></span>
            </div>
          </div>
          
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                <h3 className="flex items-center font-semibold mb-3">
                  <Clock className="w-5 h-5 text-blue-600 mr-2" />
                  Timeline
                </h3>
                <div className="space-y-2">
                  <div className="flex items-center text-sm">
                    <div className="w-20 font-medium">Onset:</div>
                    <div>{selectedSubstance.onset}</div>
                  </div>
                  <div className="flex items-center text-sm">
                    <div className="w-20 font-medium">Peak:</div>
                    <div>{selectedSubstance.peak}</div>
                  </div>
                  <div className="flex items-center text-sm">
                    <div className="w-20 font-medium">Duration:</div>
                    <div>{selectedSubstance.duration}</div>
                  </div>
                  <div className="flex items-center text-sm">
                    <div className="w-20 font-medium">After:</div>
                    <div>{selectedSubstance.afterEffects}</div>
                  </div>
                </div>
              </div>
              
              <div className="bg-purple-50 p-4 rounded-lg border border-purple-100">
                <h3 className="flex items-center font-semibold mb-3">
                  <Brain className="w-5 h-5 text-purple-600 mr-2" />
                  Effect Profile
                </h3>
                <div className="space-y-2 text-sm">
                  {selectedSubstance.mechanisms.slice(0, 4).map((mechanism, index) => (
                    <div key={index} className="flex items-start">
                      <Check className="w-4 h-4 text-purple-600 mt-0.5 mr-2 flex-shrink-0" />
                      <span>{mechanism}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="bg-red-50 p-4 rounded-lg border border-red-100">
                <h3 className="flex items-center font-semibold mb-3">
                  <Shield className="w-5 h-5 text-red-600 mr-2" />
                  Key Safety Points
                </h3>
                <div className="space-y-2 text-sm">
                  {selectedSubstance.safetyNotes.slice(0, 4).map((note, index) => (
                    <div key={index} className="flex items-start">
                      <AlertTriangle className="w-4 h-4 text-red-600 mt-0.5 mr-2 flex-shrink-0" />
                      <span>{note}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <h3 className="text-lg font-semibold mb-3">Optimal Activities for This Phase</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {getPhaseActivities().map((activity, index) => (
                    <div key={index} className="border p-3 rounded-lg bg-gray-50">
                      <h4 className="font-medium mb-1">{activity}</h4>
                    </div>
                  ))}
                </div>
                
                <div className="mt-4">
                  <h4 className="font-medium text-red-600 mb-2 flex items-center">
                    <X className="w-4 h-4 mr-1" />
                    Avoid During This Phase:
                  </h4>
                  <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                    {selectedSubstance.avoidTasks.slice(0, 3).map((task, index) => (
                      <li key={index}>{task}</li>
                    ))}
                  </ul>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-3">
                  <span className="flex items-center">
                    <Pill className="w-5 h-5 text-blue-600 mr-2" />
                    Current Phase Supplements
                  </span>
                </h3>
                
                <div className="border rounded-lg overflow-hidden">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Supplement</th>
                        <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Timing</th>
                        <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Purpose</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {getCurrentPhaseSupplements().map((supplement, index) => (
                        <tr key={index}>
                          <td className="px-3 py-2 text-sm">{supplement.name}</td>
                          <td className="px-3 py-2 text-sm">{supplement.timing}</td>
                          <td className="px-3 py-2 text-sm">{supplement.purpose}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                
                <p className="text-xs text-gray-500 mt-2">
                  *Always consult a healthcare provider before taking supplements, especially in combination with any substances.
                </p>
              </div>
            </div>
            
            <div className="bg-green-50 border border-green-100 rounded-lg p-4 mb-6">
              <h3 className="flex items-center font-semibold mb-2">
                <Lightbulb className="w-5 h-5 text-green-600 mr-2" />
                Improvement Tips for Next Time
              </h3>
              <p className="text-sm mb-3">Based on neuroscience research and harm reduction practices:</p>
              <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                <li>Keep a detailed journal of your experiences to identify optimal conditions</li>
                <li>Plan your supplementation schedule before beginning your session</li>
                <li>Allow sufficient recovery time between sessions (minimum 2-4 weeks)</li>
                <li>Prepare your environment thoughtfully before starting</li>
                <li>Consider a pre-session meditation practice to establish intentions</li>
              </ul>
            </div>
            
            <div className="flex justify-between">
              <button 
                onClick={() => setShowSubstanceModal(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
              >
                View Full Information
              </button>
              <button
                onClick={() => {
                  setSessionActive(false);
                  setCurrentView('substances');
                }}
                className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded flex items-center"
              >
                <X className="w-4 h-4 mr-1" />
                End Session
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  // Modal for substance details
  const SubstanceModal = () => {
    if (!selectedSubstance) return null;
    
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto">
          <div className="sticky top-0 bg-white border-b z-10">
            <div className="p-4 flex justify-between items-start">
              <div>
                <p className="text-gray-500">Substance Information</p>
                <h2 className="text-2xl font-bold">{selectedSubstance.name}</h2>
                <div className="flex items-center mt-1">
                  <span className="bg-blue-100 text-blue-800 text-xs px-2 py-0.5 rounded-full">
                    {selectedSubstance.riskProfile}
                  </span>
                </div>
              </div>
              <button 
                className="text-gray-500 hover:text-gray-700" 
                onClick={() => setShowSubstanceModal(false)}
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>
          
          <div className="p-6 space-y-8">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-900 flex items-center">
                <Clock className="w-5 h-5 text-blue-600 mr-2" />
                Timeline & Phases
              </h3>
              <div className="bg-gray-50 p-4 rounded-lg border">
                <div className="relative">
                  {/* Timeline line */}
                  <div className="absolute left-[7.5rem] top-6 h-[calc(100%-32px)] w-0.5 bg-blue-200"></div>
                  
                  {/* Onset */}
                  <div className="flex mb-8 relative">
                    <div className="w-28 font-medium text-gray-900">Onset</div>
                    <div className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-600 text-white font-bold">
                      1
                    </div>
                    <div className="ml-6">
                      <p className="text-gray-700 font-medium mb-1">{selectedSubstance.onset}</p>
                      <div className="text-sm text-gray-600">
                        Initial effects begin. May include subtle changes in perception, alertness, or mood.
                      </div>
                    </div>
                  </div>
                  
                  {/* Peak */}
                  <div className="flex mb-8 relative">
                    <div className="w-28 font-medium text-gray-900">Peak</div>
                    <div className="w-8 h-8 flex items-center justify-center rounded-full bg-purple-600 text-white font-bold">
                      2
                    </div>
                    <div className="ml-6">
                      <p className="text-gray-700 font-medium mb-1">{selectedSubstance.peak}</p>
                      <div className="text-sm text-gray-600">
                        Maximum intensity. Effects are fully expressed during this phase.
                      </div>
                    </div>
                  </div>
                  
                  {/* Duration */}
                  <div className="flex mb-8 relative">
                    <div className="w-28 font-medium text-gray-900">Duration</div>
                    <div className="w-8 h-8 flex items-center justify-center rounded-full bg-indigo-600 text-white font-bold">
                      3
                    </div>
                    <div className="ml-6">
                      <p className="text-gray-700 font-medium mb-1">{selectedSubstance.duration}</p>
                      <div className="text-sm text-gray-600">
                        Total length of primary effects before tapering begins.
                      </div>
                    </div>
                  </div>
                  
                  {/* After-effects */}
                  <div className="flex relative">
                    <div className="w-28 font-medium text-gray-900">After-effects</div>
                    <div className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-600 text-white font-bold">
                      4
                    </div>
                    <div className="ml-6">
                      <p className="text-gray-700 font-medium mb-1">{selectedSubstance.afterEffects}</p>
                      <div className="text-sm text-gray-600">
                        Residual effects as the substance clears. May include fatigue, mood changes, or insight integration.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-gray-900 flex items-center">
                  <Brain className="w-5 h-5 text-purple-600 mr-2" />
                  Neurological Mechanisms
                </h3>
                <div className="bg-purple-50 p-4 rounded-lg border border-purple-100">
                  <ul className="space-y-2">
                    {selectedSubstance.mechanisms.map((mechanism, index) => (
                      <li key={index} className="flex items-start">
                        <Check className="w-4 h-4 text-purple-700 mt-1 mr-2 flex-shrink-0" />
                        <span>{mechanism}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-gray-900 flex items-center">
                  <Shield className="w-5 h-5 text-red-600 mr-2" />
                  Safety Guidelines
                </h3>
                <div className="bg-red-50 p-4 rounded-lg border border-red-100">
                  <ul className="space-y-2">
                    {selectedSubstance.safetyNotes.map((note, index) => (
                      <li key={index} className="flex items-start">
                        <AlertTriangle className="w-4 h-4 text-red-700 mt-1 mr-2 flex-shrink-0" />
                        <span>{note}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-900 flex items-center">
                <Compass className="w-5 h-5 text-green-600 mr-2" />
                Optimizing the Experience
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-green-50 p-4 rounded-lg border border-green-100">
                  <h4 className="font-medium mb-2 flex items-center">
                    <Check className="w-4 h-4 text-green-700 mr-2" />
                    Recommended Activities
                  </h4>
                  <ul className="space-y-1">
                    {selectedSubstance.supportiveTasks.map((task, index) => (
                      <li key={index} className="text-sm">• {task}</li>
                    ))}
                  </ul>
                </div>
                
                <div className="bg-red-50 p-4 rounded-lg border border-red-100">
                  <h4 className="font-medium mb-2 flex items-center">
                    <X className="w-4 h-4 text-red-700 mr-2" />
                    Activities to Avoid
                  </h4>
                  <ul className="space-y-1">
                    {selectedSubstance.avoidTasks.map((task, index) => (
                      <li key={index} className="text-sm">• {task}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-900 flex items-center">
                <Pill className="w-5 h-5 text-blue-600 mr-2" />
                Supplement Protocol
              </h3>
              
              <div className="border rounded-lg overflow-hidden">
                <div className="bg-blue-50 p-3 border-b">
                  <h4 className="font-medium text-blue-800">Pre-Session Supplements</h4>
                </div>
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Supplement</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Timing</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Purpose</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Dosage</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {selectedSubstance.preDosing.map((supplement, index) => (
                      <tr key={index}>
                        <td className="px-4 py-2 text-sm">{supplement.name}</td>
                        <td className="px-4 py-2 text-sm">{supplement.timing}</td>
                        <td className="px-4 py-2 text-sm">{supplement.purpose}</td>
                        <td className="px-4 py-2 text-sm">{supplement.dosage}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              <div className="border rounded-lg overflow-hidden">
                <div className="bg-purple-50 p-3 border-b">
                  <h4 className="font-medium text-purple-800">During Session</h4>
                </div>
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Supplement</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Timing</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Purpose</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Dosage</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {selectedSubstance.duringDosing.map((supplement, index) => (
                      <tr key={index}>
                        <td className="px-4 py-2 text-sm">{supplement.name}</td>
                        <td className="px-4 py-2 text-sm">{supplement.timing}</td>
                        <td className="px-4 py-2 text-sm">{supplement.purpose}</td>
                        <td className="px-4 py-2 text-sm">{supplement.dosage}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              <div className="border rounded-lg overflow-hidden">
                <div className="bg-indigo-50 p-3 border-b">
                  <h4 className="font-medium text-indigo-800">Post-Session Recovery</h4>
                </div>
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Supplement</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Timing</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Purpose</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Dosage</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {selectedSubstance.postDosing.map((supplement, index) => (
                      <tr key={index}>
                        <td className="px-4 py-2 text-sm">{supplement.name}</td>
                        <td className="px-4 py-2 text-sm">{supplement.timing}</td>
                        <td className="px-4 py-2 text-sm">{supplement.purpose}</td>
                        <td className="px-4 py-2 text-sm">{supplement.dosage}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              <p className="text-sm text-gray-500">
                *Always consult with healthcare professionals before taking any supplements, especially when combining with substances. Individual responses vary significantly.
              </p>
            </div>
            
            <div className="flex flex-col md:flex-row justify-between space-y-4 md:space-y-0 pt-4">
              <button 
                className="px-6 py-2 bg-gray-100 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-200"
                onClick={() => setShowSubstanceModal(false)}
              >
                Close
              </button>
              
              <div className="space-x-3">
                <button 
                  className="px-6 py-2 bg-blue-100 border border-blue-300 text-blue-700 rounded-lg hover:bg-blue-200"
                  onClick={() => setShowSubstanceModal(false)}
                >
                  <FileText className="w-4 h-4 inline-block mr-2" />
                  Save Info
                </button>
                
                <button 
                  className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                  onClick={startSession}
                >
                  <Clock className="w-4 h-4 inline-block mr-2" />
                  Start Session Tracking
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            NeuroPharma Guide
          </h1>
          <p className="text-xl text-gray-600">
            Evidence-based information for optimal substance experiences with neuroscience-informed 
            protocols for safety and cognitive enhancement
          </p>
          
          <div className="mt-6 flex flex-col sm:flex-row gap-2">
            <div className="flex-grow relative">
              <input 
                type="text" 
                className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Search for substances or supplements..."
              />
              <Search className="absolute left-3 top-3.5 text-gray-400 w-5 h-5" />
            </div>
            <button 
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center justify-center"
            >
              Search
            </button>
          </div>
          
          {sessionActive && (
            <div className="mt-4 bg-yellow-100 border border-yellow-300 rounded-lg p-4 flex items-center justify-between">
              <div className="flex items-center">
                <Clock className="w-5 h-5 text-yellow-700 mr-2" />
                <div>
                  <p className="font-medium">Active session: {selectedSubstance.name}</p>
                  <p className="text-sm text-yellow-800">
                    Time: {formatTime(sessionTime)} | Current phase: {sessionPhase}
                  </p>
                </div>
              </div>
              <button 
                className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-lg"
                onClick={() => setCurrentView('session')}
              >
                Return to Session
              </button>
            </div>
          )}
        </header>
      </div>
      
      <div className="max-w-6xl mx-auto">
        {currentView === 'categories' ? (
          <CategoriesView />
        ) : currentView === 'substances' ? (
          <SubstancesView />
        ) : currentView === 'session' ? (
          <SessionView />
        ) : null}
      </div>
      
      {/* Modals */}
      {showSubstanceModal && <SubstanceModal />}
    </div>
  );
};

export default NeuroPharmaGuide;