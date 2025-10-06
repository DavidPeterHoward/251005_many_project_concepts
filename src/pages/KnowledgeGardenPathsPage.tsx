import React, { useState, useEffect } from 'react';
import { 
  Leaf, 
  Search, 
  ArrowRight, 
  ArrowLeft, 
  CheckCircle,
  Info,
  Heart,
  Star,
  MessageCircle,
  ChevronDown,
  ChevronRight,
  Sparkles,
  Users,
  Layers,
  Compass,
  PenTool,
  Zap,
  Briefcase,
  GraduationCap,
  Palette,
  Activity,
  GitBranch,
  BookOpen,
  Globe
} from 'lucide-react';

const MultidisciplinaryProfessionalPaths = () => {
  // State for selected sector and job role
  const [selectedSector, setSelectedSector] = useState(null);
  const [selectedRole, setSelectedRole] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [showMotivation, setShowMotivation] = useState(false);
  const [motivationMessage, setMotivationMessage] = useState('');
  const [showMultiskillModal, setShowMultiskillModal] = useState(false);
  
  // Motivational messages by sector
  const motivationalMessages = {
    trades: [
      "Your skilled craftsmanship builds the physical world we all depend on daily.",
      "Problem-solving with both hands and mind is a rare and valuable ability in today's world.",
      "The expertise you've developed combines tradition and innovation in powerful ways."
    ],
    business: [
      "Your commercial insights help transform ideas into sustainable value for communities.",
      "The ability to navigate organizational dynamics and economic realities is crucial for any successful venture.",
      "Business acumen combined with your unique perspective creates opportunities for meaningful growth."
    ],
    education: [
      "Your teaching abilities transfer knowledge across generations, creating lasting impact.",
      "Helping others develop skills and confidence transforms individual lives and communities.",
      "The capacity to make complex ideas accessible is a transformative skill in any context."
    ],
    creative: [
      "Your creative vision helps others see possibilities they couldn't imagine before.",
      "The ability to blend artistic expression with practical application enriches our shared experience.",
      "Creative problem-solving approaches add value in expected and unexpected contexts."
    ],
    healthcare: [
      "Your care work improves quality of life and provides dignity to those in vulnerable moments.",
      "The combination of technical knowledge and compassion you bring creates healing environments.",
      "Health expertise integrated with other disciplines creates innovative approaches to wellbeing."
    ],
    technology: [
      "Your technical abilities help bridge human needs with digital possibilities.",
      "The capacity to understand both systems and people makes technology truly valuable.",
      "Technical skill combined with domain expertise creates solutions with real-world impact."
    ],
    government: [
      "Your understanding of public systems helps communities function effectively and fairly.",
      "The ability to navigate policy implementation improves lives in tangible and intangible ways.",
      "Public service expertise combined with specialized knowledge helps address complex social challenges."
    ],
    environment: [
      "Your environmental understanding helps create sustainable paths forward in a changing world.",
      "The ability to connect ecological systems with human needs is increasingly essential.",
      "Environmental expertise integrated with other domains creates resilient solutions for the future."
    ]
  };
  
  // Sectors with different categorization - reordered per request
  const sectors = [
    {
      id: 'trades',
      name: 'Trades & Technical Services',
      color: 'bg-amber-600',
      gradient: 'from-amber-600 to-amber-700',
      icon: '🔧',
      description: 'Skilled trades, technical work and essential services',
      jobRoles: [
        { title: 'Electrical Systems Specialist', emerging: false, growth: 'High' },
        { title: 'Construction Professional', emerging: false, growth: 'High' },
        { title: 'Mechanical Technician', emerging: false, growth: 'Moderate' },
        { title: 'Precision Manufacturing Specialist', emerging: false, growth: 'Moderate' },
        { title: 'Transportation & Logistics Professional', emerging: false, growth: 'Moderate' },
        { title: 'Sustainable Energy Technician', emerging: true, growth: 'Very High' },
        { title: 'Automated Systems Specialist', emerging: true, growth: 'High' },
        { title: 'Additive Manufacturing Technician', emerging: true, growth: 'High' },
        { title: 'Infrastructure Maintenance Specialist', emerging: false, growth: 'Moderate' },
        { title: 'Telecommunications Technician', emerging: false, growth: 'Moderate' }
      ]
    },
    {
      id: 'business',
      name: 'Business & Commercial',
      color: 'bg-blue-600',
      gradient: 'from-blue-600 to-blue-700',
      icon: '💼',
      description: 'Management, finance, operations and commerce',
      jobRoles: [
        { title: 'Financial Management Professional', emerging: false, growth: 'High' },
        { title: 'Strategic Marketing Specialist', emerging: false, growth: 'Moderate' },
        { title: 'Operations & Process Analyst', emerging: false, growth: 'High' },
        { title: 'Human Capital Development Specialist', emerging: false, growth: 'Moderate' },
        { title: 'Project Implementation Leader', emerging: false, growth: 'High' },
        { title: 'Business Development Representative', emerging: false, growth: 'Moderate' },
        { title: 'Supply Chain Resilience Manager', emerging: true, growth: 'High' },
        { title: 'Digital Commerce Specialist', emerging: true, growth: 'High' },
        { title: 'Organizational Sustainability Leader', emerging: true, growth: 'High' },
        { title: 'Remote Work Experience Designer', emerging: true, growth: 'Moderate' }
      ]
    },
    {
      id: 'education',
      name: 'Education & Knowledge Transfer',
      color: 'bg-emerald-600',
      gradient: 'from-emerald-600 to-emerald-700',
      icon: '🎓',
      description: 'Teaching, training and learning facilitation',
      jobRoles: [
        { title: 'Learning Experience Designer', emerging: false, growth: 'High' },
        { title: 'Educational Facilitator', emerging: false, growth: 'Moderate' },
        { title: 'Digital Learning Specialist', emerging: true, growth: 'High' },
        { title: 'Knowledge Systems Developer', emerging: true, growth: 'High' },
        { title: 'Educational Content Creator', emerging: true, growth: 'High' },
        { title: 'Learning Assessment Specialist', emerging: false, growth: 'Moderate' },
        { title: 'Specialized Subject Educator', emerging: false, growth: 'Moderate' },
        { title: 'Career Development Facilitator', emerging: false, growth: 'Moderate' },
        { title: 'Educational Technology Integration Specialist', emerging: true, growth: 'High' },
        { title: 'Curriculum Design Specialist', emerging: false, growth: 'Moderate' }
      ]
    },
    {
      id: 'creative',
      name: 'Creative & Design',
      color: 'bg-purple-600',
      gradient: 'from-purple-600 to-purple-700',
      icon: '🎨',
      description: 'Creative, design, media and artistic work',
      jobRoles: [
        { title: 'Visual Communication Designer', emerging: false, growth: 'Moderate' },
        { title: 'Content Development Specialist', emerging: false, growth: 'High' },
        { title: 'User Experience Designer', emerging: false, growth: 'High' },
        { title: 'Digital Narrative Producer', emerging: true, growth: 'High' },
        { title: 'Interactive Media Specialist', emerging: true, growth: 'High' },
        { title: 'Creative Strategy Consultant', emerging: false, growth: 'Moderate' },
        { title: 'Experiential Design Specialist', emerging: true, growth: 'Moderate' },
        { title: 'Immersive Technology Creator', emerging: true, growth: 'High' },
        { title: 'Audio-Visual Content Producer', emerging: false, growth: 'Moderate' },
        { title: 'Brand Identity Specialist', emerging: false, growth: 'Moderate' }
      ]
    },
    {
      id: 'healthcare',
      name: 'Healthcare & Wellbeing',
      color: 'bg-teal-600',
      gradient: 'from-teal-600 to-teal-700',
      icon: '⚕️',
      description: 'Medical, wellness and health services',
      jobRoles: [
        { title: 'Clinical Care Professional', emerging: false, growth: 'High' },
        { title: 'Integrated Health Specialist', emerging: true, growth: 'High' },
        { title: 'Mental Wellbeing Consultant', emerging: false, growth: 'High' },
        { title: 'Health Systems Coordinator', emerging: false, growth: 'Moderate' },
        { title: 'Rehabilitation Specialist', emerging: false, growth: 'Moderate' },
        { title: 'Preventative Health Advisor', emerging: true, growth: 'High' },
        { title: 'Remote Health Monitoring Specialist', emerging: true, growth: 'Very High' },
        { title: 'Health Informatics Analyst', emerging: true, growth: 'High' },
        { title: 'Patient Experience Designer', emerging: true, growth: 'Moderate' },
        { title: 'Genomic Medicine Consultant', emerging: true, growth: 'High' }
      ]
    },
    {
      id: 'technology',
      name: 'Technology & Digital',
      color: 'bg-indigo-600',
      gradient: 'from-indigo-600 to-indigo-700',
      icon: '💻',
      description: 'Software, data, digital and IT systems',
      jobRoles: [
        { title: 'Software Solutions Developer', emerging: false, growth: 'Very High' },
        { title: 'AI Implementation Specialist', emerging: true, growth: 'Very High' },
        { title: 'Digital Security Architect', emerging: false, growth: 'Very High' },
        { title: 'Data Intelligence Analyst', emerging: false, growth: 'High' },
        { title: 'Cloud Systems Engineer', emerging: false, growth: 'High' },
        { title: 'Digital Experience Designer', emerging: false, growth: 'Moderate' },
        { title: 'System Integration Specialist', emerging: false, growth: 'High' },
        { title: 'Extended Reality Developer', emerging: true, growth: 'High' },
        { title: 'Distributed Systems Architect', emerging: true, growth: 'Moderate' },
        { title: 'Quantum Computing Researcher', emerging: true, growth: 'Moderate' }
      ]
    },
    {
      id: 'government',
      name: 'Government & Public Systems',
      color: 'bg-red-600',
      gradient: 'from-red-600 to-red-700',
      icon: '🏛️',
      description: 'Public service, civic and governmental work',
      jobRoles: [
        { title: 'Public Systems Administrator', emerging: false, growth: 'Moderate' },
        { title: 'Policy Implementation Specialist', emerging: false, growth: 'Moderate' },
        { title: 'Community Planning Consultant', emerging: false, growth: 'Moderate' },
        { title: 'Public Health Coordinator', emerging: false, growth: 'High' },
        { title: 'Emergency Response Strategist', emerging: false, growth: 'High' },
        { title: 'Community Support Specialist', emerging: false, growth: 'High' },
        { title: 'Public-Private Partnership Facilitator', emerging: false, growth: 'Moderate' },
        { title: 'Digital Government Experience Designer', emerging: true, growth: 'High' },
        { title: 'Civic Technology Implementation Specialist', emerging: true, growth: 'High' },
        { title: 'Community Resilience Coordinator', emerging: true, growth: 'High' }
      ]
    },
    {
      id: 'environment',
      name: 'Environment & Sustainability',
      color: 'bg-green-600',
      gradient: 'from-green-600 to-green-700',
      icon: '🌱',
      description: 'Environmental, conservation and sustainability work',
      jobRoles: [
        { title: 'Environmental Systems Analyst', emerging: false, growth: 'High' },
        { title: 'Renewable Energy Implementation Specialist', emerging: true, growth: 'Very High' },
        { title: 'Sustainability Integration Consultant', emerging: true, growth: 'High' },
        { title: 'Ecological Conservation Specialist', emerging: false, growth: 'Moderate' },
        { title: 'Environmental Engineering Professional', emerging: false, growth: 'High' },
        { title: 'Urban Agriculture Consultant', emerging: true, growth: 'Moderate' },
        { title: 'Water Systems Management Specialist', emerging: false, growth: 'High' },
        { title: 'Carbon Management Strategist', emerging: true, growth: 'High' },
        { title: 'Circular Economy Implementation Specialist', emerging: true, growth: 'High' },
        { title: 'Climate Adaptation Analyst', emerging: true, growth: 'High' }
      ]
    }
  ];
  
  // Multidisciplinary pathways for those who work across domains
  const multidisciplinaryPathways = [
    {
      title: "Technical-Commercial Integration",
      description: "Bridge skilled trades expertise with business operations and customer engagement",
      primarySectors: ["Trades & Technical Services", "Business & Commercial"],
      supportingSectors: ["Technology & Digital"],
      pathDescription: "This pathway combines hands-on technical skills with business acumen. You might manage technical operations, consult on implementation, develop service businesses, or work in technical sales and customer support. Your value comes from understanding both practical applications and commercial contexts.",
      skills: ["Technical expertise", "Business operations", "Client relationship management", "Project economics"],
      examples: [
        "Technical Operations Manager",
        "Implementation Consultant",
        "Service Business Owner",
        "Technical Account Manager",
        "Construction Management Specialist"
      ],
      growth: "High",
      testimonial: {
        quote: "My background as an electrician gave me practical insights I use daily in construction project management. I speak both languages - technical and business - which helps me bridge gaps between different teams.",
        author: "Miguel Torres, Construction Operations Director"
      }
    },
    {
      title: "Business Systems Development",
      description: "Combine commercial expertise with technological implementation and educational facilitation",
      primarySectors: ["Business & Commercial", "Technology & Digital"],
      supportingSectors: ["Education & Knowledge Transfer"],
      pathDescription: "This pathway leverages business process knowledge with technology implementation capabilities. You excel at understanding workflow needs, translating them into technical requirements, training users, and managing change. Your multidisciplinary perspective helps organizations transform effectively.",
      skills: ["Process analysis", "Systems thinking", "Technology implementation", "Change management"],
      examples: [
        "Business Systems Analyst",
        "Organizational Transformation Specialist",
        "ERP Implementation Consultant",
        "Technology Adoption Manager",
        "Business Process Automation Specialist"
      ],
      growth: "Very High",
      testimonial: {
        quote: "Having worked in both finance and software development, I can translate business needs into technical solutions. I also enjoy the training aspect of implementation - helping teams embrace new systems rather than fear them.",
        author: "Sarah Johnson, Digital Transformation Lead"
      }
    },
    {
      title: "Educational Content Development",
      description: "Blend educational expertise with creative production and specialized knowledge areas",
      primarySectors: ["Education & Knowledge Transfer", "Creative & Design"],
      supportingSectors: ["Any specialized knowledge domain"],
      pathDescription: "This pathway combines teaching skills with content creation abilities. You excel at making complex information accessible through various media formats. Whether designing learning experiences, creating educational materials, or facilitating knowledge transfer, your multidisciplinary approach makes learning engaging and effective.",
      skills: ["Instructional design", "Content creation", "Subject matter expertise", "Audience engagement"],
      examples: [
        "Learning Experience Designer",
        "Educational Content Producer",
        "Technical Training Developer",
        "Knowledge Translation Specialist",
        "Educational Technology Content Creator"
      ],
      growth: "High",
      testimonial: {
        quote: "My background in teaching combined with digital media production skills allows me to create learning experiences that actually engage students. Understanding both pedagogy and production makes the difference between content that educates and content that transforms.",
        author: "Luis Mendes, Learning Design Director"
      }
    },
    {
      title: "Creative-Technical Development",
      description: "Integrate creative design skills with technical implementation capabilities",
      primarySectors: ["Creative & Design", "Technology & Digital"],
      supportingSectors: ["Business & Commercial"],
      pathDescription: "This pathway merges artistic vision with technical execution abilities. You bridge the gap between conceptual design and functional implementation, creating digital products and experiences that are both beautiful and usable. Your cross-domain expertise helps translate creative concepts into technical reality.",
      skills: ["Visual design", "Technical implementation", "User experience", "Creative problem-solving"],
      examples: [
        "Creative Technologist",
        "Front-End Development Specialist",
        "Interactive Experience Developer",
        "Digital Product Designer",
        "User Interface Engineer"
      ],
      growth: "High",
      testimonial: {
        quote: "I've always lived at the intersection of design and code. Understanding both the aesthetic principles and technical constraints means I can design things that are not just beautiful, but actually implementable. This dual perspective is increasingly valuable as digital experiences become more complex.",
        author: "Anya Chen, Creative Technology Director"
      }
    },
    {
      title: "Healthcare Experience Enhancement",
      description: "Combine healthcare expertise with design thinking and technology implementation",
      primarySectors: ["Healthcare & Wellbeing", "Creative & Design"],
      supportingSectors: ["Technology & Digital"],
      pathDescription: "This pathway integrates clinical knowledge with patient experience design and digital health implementation. You apply human-centered design principles to healthcare contexts, creating services and systems that are both clinically effective and patient-friendly. Your cross-domain perspective improves healthcare delivery and outcomes.",
      skills: ["Health services knowledge", "Experience design", "Patient journey mapping", "Digital health tools"],
      examples: [
        "Healthcare Service Designer",
        "Patient Experience Specialist",
        "Digital Health Implementation Consultant",
        "Healthcare Innovation Strategist",
        "Clinical Systems Designer"
      ],
      growth: "Very High",
      testimonial: {
        quote: "My nursing background combined with UX design skills gives me unique insights into creating healthcare services that work for both patients and providers. The healthcare system needs more people who can bridge clinical requirements with thoughtful, human-centered design.",
        author: "Dr. Mei Zhang, Healthcare Experience Director"
      }
    },
    {
      title: "Public Sector Innovation",
      description: "Merge public administration knowledge with technology implementation and citizen engagement",
      primarySectors: ["Government & Public Systems", "Technology & Digital"],
      supportingSectors: ["Creative & Design"],
      pathDescription: "This pathway combines understanding of public systems with digital transformation capabilities. You apply technology and design thinking to government services, improving citizen experiences and operational efficiency. Your cross-sector perspective helps navigate institutional complexities while implementing meaningful innovations.",
      skills: ["Policy implementation", "Digital service design", "Stakeholder engagement", "Change management"],
      examples: [
        "Civic Innovation Specialist",
        "Government Digital Service Designer",
        "Public Sector Transformation Consultant",
        "Smart City Implementation Specialist",
        "Civic Technology Program Manager"
      ],
      growth: "High",
      testimonial: {
        quote: "Having worked in both government administration and digital design has enabled me to create public services that actually work for citizens. Understanding policy constraints AND user needs means finding effective solutions that can navigate institutional realities.",
        author: "James Wilson, Government Digital Services Lead"
      }
    },
    {
      title: "Sustainable Systems Implementation",
      description: "Integrate environmental expertise with business strategy and technical implementation",
      primarySectors: ["Environment & Sustainability", "Business & Commercial"],
      supportingSectors: ["Technology & Digital", "Trades & Technical Services"],
      pathDescription: "This pathway combines sustainability knowledge with practical implementation skills across business and technical domains. You help organizations operationalize environmental principles through strategy, systems, and infrastructure. Your multidisciplinary approach creates solutions that are environmentally sound, technically feasible, and economically viable.",
      skills: ["Sustainability frameworks", "Business integration", "Systems implementation", "Impact assessment"],
      examples: [
        "Sustainable Business Transformation Specialist",
        "Green Building Implementation Consultant",
        "Corporate ESG Integration Manager",
        "Circular Economy Business Designer",
        "Sustainable Supply Chain Specialist"
      ],
      growth: "Very High",
      testimonial: {
        quote: "My environmental science background combined with business implementation experience allows me to translate sustainability principles into practical business operations. Companies need people who understand both the 'why' of sustainability and the 'how' of implementation.",
        author: "Thomas Okafor, Sustainability Implementation Director"
      }
    },
    {
      title: "Technical Training & Implementation",
      description: "Combine trades expertise with educational delivery and business implementation",
      primarySectors: ["Trades & Technical Services", "Education & Knowledge Transfer"],
      supportingSectors: ["Business & Commercial"],
      pathDescription: "This pathway merges hands-on technical knowledge with training and implementation capabilities. You excel at transferring practical skills to others and helping organizations adopt new technical systems and processes. Your multidisciplinary perspective bridges technical requirements with learning needs and business contexts.",
      skills: ["Technical expertise", "Training delivery", "Implementation management", "Needs assessment"],
      examples: [
        "Technical Training Specialist",
        "Implementation Field Consultant",
        "Technical Knowledge Manager",
        "Skills Development Coordinator",
        "Technical Systems Coach"
      ],
      growth: "Moderate",
      testimonial: {
        quote: "My years as a manufacturing technician gave me the credibility and knowledge to now train others effectively. Understanding both the technical aspects and how adults learn helps me create training programs that actually produce capable technicians rather than just checking boxes.",
        author: "Robert Chen, Technical Training Director"
      }
    }
  ];
  
  // Professional insights from experts who work across domains
  const professionalInsights = [
    {
      sectors: ["trades", "business"],
      quote: "The most valuable people in technical businesses can translate between the workshop floor and the boardroom. They understand both the practical realities and the business imperatives.",
      author: "Lisa Rodriguez, Construction Business Owner"
    },
    {
      sectors: ["business", "technology"],
      quote: "Business isn't separate from technology anymore - they're completely intertwined. The professionals who understand both domains can identify opportunities others miss entirely.",
      author: "Raj Patel, Digital Transformation Consultant"
    },
    {
      sectors: ["education", "creative"],
      quote: "The future of education is about creating meaningful learning experiences across multiple formats. People who combine teaching expertise with content creation skills are incredibly valuable.",
      author: "Maria Chen, Educational Content Director"
    },
    {
      sectors: ["creative", "technology"],
      quote: "The gap between design and development is where innovation often fails. Professionals who can bridge this divide by understanding both aesthetics and implementation are worth their weight in gold.",
      author: "James Wilson, Creative Technology Lead"
    },
    {
      sectors: ["healthcare", "technology"],
      quote: "Healthcare desperately needs people who understand both clinical realities and technological possibilities. This intersection is where we'll find solutions to our biggest healthcare challenges.",
      author: "Dr. Samira Khan, Digital Health Strategist"
    },
    {
      sectors: ["government", "technology"],
      quote: "Public services are being reimagined through digital transformation. The key is having people who understand both government systems and user-centered design to create services that truly work for citizens.",
      author: "Michael Thompson, Civic Innovation Director"
    },
    {
      sectors: ["environment", "business"],
      quote: "Sustainability isn't just about environmental science - it's about implementation in real business contexts. Professionals who can connect these worlds create practical solutions that actually get adopted.",
      author: "Emma Garcia, Sustainability Implementation Consultant"
    },
    {
      sectors: ["trades", "education"],
      quote: "There's a critical need for people who can both DO the technical work and TEACH it effectively to others. This combination of skills is essential for addressing our skilled trades gaps.",
      author: "David Johnson, Technical Skills Educator"
    }
  ];
  
  // Handle random motivation message
  useEffect(() => {
    if (selectedSector && motivationalMessages[selectedSector]) {
      const randomIndex = Math.floor(Math.random() * motivationalMessages[selectedSector].length);
      setMotivationMessage(motivationalMessages[selectedSector][randomIndex]);
    }
  }, [selectedSector]);
  
  // Handle sector selection
  const handleSectorSelect = (sectorId) => {
    setSelectedSector(sectorId);
    setSelectedRole(null);
    setShowMotivation(true);
    
    // Hide motivation message after 5 seconds
    setTimeout(() => {
      setShowMotivation(false);
    }, 5000);
  };
  
  // Handle role selection
  const handleRoleSelect = (role) => {
    setSelectedRole(role);
  };
  
  // Handle search query
  const handleSearch = () => {
    if (searchQuery.trim() === '') return;
    setIsSearching(true);
    
    // Simulate search delay
    setTimeout(() => {
      setIsSearching(false);
    }, 1000);
  };
  
  // Get filtered job roles based on search query
  const getFilteredRoles = () => {
    if (!selectedSector) return [];
    
    const currentSector = sectors.find(s => s.id === selectedSector);
    if (!currentSector) return [];
    
    if (!searchQuery) return currentSector.jobRoles;
    
    return currentSector.jobRoles.filter(role => 
      role.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };
  
  // Get professional insight for selected sector
  const getInsight = () => {
    if (!selectedSector) return null;
    return professionalInsights.find(insight => insight.sectors.includes(selectedSector));
  };
  
  // Function to get growth indicator color
  const getGrowthColor = (growth) => {
    switch(growth) {
      case 'Very High': return 'bg-emerald-500';
      case 'High': return 'bg-green-500';
      case 'Moderate': return 'bg-yellow-500';
      case 'Low': return 'bg-orange-500';
      default: return 'bg-gray-500';
    }
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-blue-50">
      {/* Header with title */}
      <header className="bg-gradient-to-r from-indigo-600 to-purple-600 py-8">
        <div className="container mx-auto px-6">
          <div className="text-center text-white">
            <h1 className="text-3xl md:text-4xl font-bold mb-3">Your Professional Identity</h1>
            <p className="text-lg md:text-xl opacity-90 max-w-3xl mx-auto">Select a pathway that reflects your expertise - whether within a traditional sector or spanning multiple domains</p>
          </div>
        </div>
      </header>
      
      {/* Multi-disciplinary banner */}
      <div className="bg-gradient-to-r from-indigo-50 to-purple-50 border-b border-indigo-100">
        <div className="container mx-auto py-4 px-6">
          <button 
            onClick={() => setShowMultiskillModal(true)}
            className="w-full flex items-center justify-between bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-all border border-indigo-100 group"
          >
            <div className="flex items-center">
              <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full p-3 mr-4">
                <Layers className="w-6 h-6 text-white" />
              </div>
              <div className="text-left">
                <h3 className="text-lg font-bold text-indigo-900">Multidisciplinary Professional Pathways</h3>
                <p className="text-indigo-700">For those whose expertise spans multiple domains or who work at the intersection of different fields</p>
              </div>
            </div>
            <div className="bg-indigo-100 group-hover:bg-indigo-200 rounded-full p-2">
              <Compass className="w-5 h-5 text-indigo-700" />
            </div>
          </button>
        </div>
      </div>
      
      {/* Main content */}
      <main className="container mx-auto px-4 py-8">
        {/* Sector grid */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Professional Sectors</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {sectors.map(sector => (
              <button
                key={sector.id}
                className={`p-6 rounded-xl transition-all flex flex-col items-center text-center ${
                  selectedSector === sector.id 
                    ? `bg-gradient-to-r ${sector.gradient} text-white shadow-lg scale-105 transform` 
                    : 'bg-white border border-gray-200 hover:border-indigo-300 hover:shadow-md text-gray-800'
                }`}
                onClick={() => handleSectorSelect(sector.id)}
              >
                <div className="text-4xl mb-3">{sector.icon}</div>
                <h3 className="font-bold mb-1">{sector.name}</h3>
                <p className={`text-xs ${selectedSector === sector.id ? 'text-white opacity-90' : 'text-gray-500'}`}>
                  {sector.description}
                </p>
              </button>
            ))}
          </div>
        </div>
        
        {/* Motivational message */}
        {showMotivation && motivationMessage && (
          <div className="bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-100 rounded-lg p-4 mb-6 flex items-center animate-fade-in">
            <div className="bg-indigo-100 p-2 rounded-full mr-3">
              <Heart className="text-indigo-600 w-5 h-5" />
            </div>
            <div>
              <p className="text-indigo-800 font-medium">{motivationMessage}</p>
            </div>
          </div>
        )}
        
        {/* Selected sector details */}
        {selectedSector && (
          <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
            <div className={`bg-gradient-to-r ${sectors.find(s => s.id === selectedSector)?.gradient} p-6 text-white`}>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div className="flex items-center mb-4 md:mb-0">
                  <div className="text-3xl mr-3">
                    {sectors.find(s => s.id === selectedSector)?.icon}
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">
                      {sectors.find(s => s.id === selectedSector)?.name}
                    </h2>
                    <p className="opacity-90">Select your specific professional role</p>
                  </div>
                </div>
                
                <div className="relative w-full md:w-64">
                  <input
                    type="text"
                    placeholder="Search for a role..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 bg-white bg-opacity-20 border border-white border-opacity-30 rounded-lg text-white placeholder-white placeholder-opacity-70 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
                  />
                  <Search className="absolute left-3 top-2.5 text-white opacity-70 w-4 h-4" />
                </div>
              </div>
            </div>
            
            {/* Professional Insight */}
            {getInsight() && (
              <div className="border-b border-gray-100 py-4 px-6 bg-indigo-50">
                <div className="flex items-start">
                  <MessageCircle className="w-5 h-5 text-indigo-600 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-gray-700 italic mb-1">"{getInsight().quote}"</p>
                    <p className="text-sm text-indigo-600 font-medium">{getInsight().author}</p>
                  </div>
                </div>
              </div>
            )}
            
            <div className="p-6">
              <div className="mb-4 flex justify-between items-center">
                <h3 className="font-semibold text-lg text-gray-800">Roles in this sector</h3>
                <div className="flex items-center text-sm">
                  <div className="flex items-center mr-4">
                    <div className="w-3 h-3 rounded-full bg-emerald-500 mr-1"></div>
                    <span className="text-gray-600">Very High Growth</span>
                  </div>
                  <div className="flex items-center">
                    <Sparkles className="w-4 h-4 text-purple-500 mr-1" />
                    <span className="text-gray-600">Emerging Role</span>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {getFilteredRoles().map((role, index) => (
                  <button
                    key={index}
                    className={`p-4 rounded-lg text-left transition-all flex items-start ${
                      selectedRole === role 
                        ? 'bg-indigo-50 border-2 border-indigo-300' 
                        : 'border border-gray-200 hover:border-indigo-300 hover:bg-indigo-50'
                    }`}
                    onClick={() => handleRoleSelect(role)}
                  >
                    <div className={`w-3 h-3 rounded-full ${getGrowthColor(role.growth)} mt-1.5 mr-2 flex-shrink-0`}></div>
                    <div>
                      <div className="font-medium text-gray-800 flex items-center">
                        {role.title}
                        {role.emerging && (
                          <Sparkles className="w-3.5 h-3.5 text-purple-500 ml-1.5" />
                        )}
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        {role.growth} growth • Click to select
                      </div>
                    </div>
                  </button>
                ))}
              </div>
              
              {getFilteredRoles().length === 0 && (
                <div className="text-center py-6">
                  <p className="text-gray-500">No roles found matching your search. Try different keywords or clear your search.</p>
                  <button 
                    className="mt-2 text-indigo-600 hover:text-indigo-800"
                    onClick={() => setSearchQuery('')}
                  >
                    Clear search
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
        
        {/* Navigation buttons */}
        <div className="flex justify-between">
          <button
            className="px-6 py-3 border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 flex items-center"
          >
            <ArrowLeft className="mr-2 w-5 h-5" />
            Back
          </button>
          
          <button
            className={`px-8 py-3 rounded-xl text-white flex items-center ${
              selectedRole 
                ? 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700' 
                : 'bg-gray-400 cursor-not-allowed'
            }`}
            disabled={!selectedRole}
          >
            <span>Continue</span>
            <ArrowRight className="ml-2 w-5 h-5" />
          </button>
        </div>
      </main>
      
      {/* Multidisciplinary pathways modal */}
      {showMultiskillModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-t-xl">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold text-white flex items-center">
                  <Layers className="w-6 h-6 mr-2" />
                  Multidisciplinary Professional Pathways
                </h3>
                <button 
                  onClick={() => setShowMultiskillModal(false)}
                  className="text-white hover:text-indigo-100"
                >
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <p className="text-indigo-100 mt-1">For professionals whose expertise transcends traditional boundaries</p>
            </div>
            
            <div className="p-6">
              <div className="bg-indigo-50 border border-indigo-100 rounded-lg p-5 mb-6">
                <div className="flex">
                  <PenTool className="w-6 h-6 text-indigo-500 mr-3 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-indigo-900 mb-2">Embracing Professional Complexity</h4>
                    <p className="text-indigo-800">Many of today's most valuable professionals don't fit neatly into traditional categories. Your unique combination of expertise across different domains is a significant strength in our interconnected world.</p>
                    <p className="text-indigo-800 mt-2">These pathways represent common intersections where professionals create distinctive value by bridging multiple disciplines.</p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-6 mb-6">
                {multidisciplinaryPathways.map((pathway, index) => (
                  <div key={index} className="border border-gray-200 rounded-xl overflow-hidden hover:border-indigo-300 hover:shadow-md transition-all">
                    <div className="p-5 border-b border-gray-100 bg-gray-50 flex justify-between items-center">
                      <h4 className="font-semibold text-gray-900 flex items-center">
                        <GitBranch className="w-5 h-5 text-indigo-500 mr-2" />
                        {pathway.title}
                      </h4>
                      <div className="flex items-center">
                        <div className={`w-2.5 h-2.5 rounded-full ${getGrowthColor(pathway.growth)} mr-1.5`}></div>
                        <span className="text-sm text-gray-600">{pathway.growth} growth</span>
                      </div>
                    </div>
                    
                    <div className="p-5">
                      <p className="text-gray-700 mb-4">{pathway.description}</p>
                      
                      <div className="mb-4">
                        <div className="text-sm font-medium text-gray-700 mb-2">Primary domains:</div>
                        <div className="flex flex-wrap gap-2">
                          {pathway.primarySectors.map((sector, i) => (
                            <span key={i} className="bg-indigo-100 text-indigo-800 text-xs px-3 py-1 rounded-full">
                              {sector}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      <div className="mb-4">
                        <div className="text-sm font-medium text-gray-700 mb-2">Supporting domains:</div>
                        <div className="flex flex-wrap gap-2">
                          {pathway.supportingSectors.map((sector, i) => (
                            <span key={i} className="bg-purple-100 text-purple-800 text-xs px-3 py-1 rounded-full">
                              {sector}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      <div className="mb-4">
                        <div className="text-sm font-medium text-gray-700 mb-2">Pathway description:</div>
                        <p className="text-gray-600">{pathway.pathDescription}</p>
                      </div>
                      
                      <div className="mb-4">
                        <div className="text-sm font-medium text-gray-700 mb-2">Key transferable skills:</div>
                        <div className="flex flex-wrap gap-2">
                          {pathway.skills.map((skill, i) => (
                            <span key={i} className="bg-green-100 text-green-800 text-xs px-3 py-1 rounded-full">
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      <div className="mb-4">
                        <div className="text-sm font-medium text-gray-700 mb-2">Example roles:</div>
                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                          {pathway.examples.map((example, i) => (
                            <li key={i} className="flex items-center text-gray-700">
                              <div className="w-1.5 h-1.5 rounded-full bg-gray-400 mr-2"></div>
                              {example}
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      {pathway.testimonial && (
                        <div className="mt-5 pt-5 border-t border-gray-100">
                          <div className="bg-gray-50 rounded-lg p-4">
                            <div className="flex">
                              <MessageCircle className="w-5 h-5 text-indigo-500 mr-3 flex-shrink-0 mt-0.5" />
                              <div>
                                <p className="text-gray-700 italic text-sm mb-1">"{pathway.testimonial.quote}"</p>
                                <p className="text-xs text-indigo-600 font-medium">{pathway.testimonial.author}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="flex justify-center">
                <button
                  onClick={() => setShowMultiskillModal(false)}
                  className="px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:from-indigo-700 hover:to-purple-700 flex items-center"
                >
                  <span>Select a pathway</span>
                  <ArrowRight className="ml-2 w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Custom animation styles */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-fade-in {
          animation: fadeIn 0.5s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default MultidisciplinaryProfessionalPaths;