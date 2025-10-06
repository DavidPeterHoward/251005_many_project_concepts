import React, { useState } from 'react';

const ComponentViewer = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedModel, setSelectedModel] = useState(null);
  const [viewMode, setViewMode] = useState('normal');
  const [explosionLevel, setExplosionLevel] = useState(0);
  const [cutawayAxis, setCutawayAxis] = useState('none');
  const [cutawayPosition, setCutawayPosition] = useState(50);
  const [showLabels, setShowLabels] = useState(true);
  const [selectedComponent, setSelectedComponent] = useState(null);

  // Sample model categories and items
  const modelCategories = [
    {
      name: 'Manufacturing Equipment',
      items: [
        { id: 'cnc-mill', name: 'CNC Milling Machine', complexity: 'High', components: 120 },
        { id: '3d-printer', name: '3D Printer', complexity: 'Medium', components: 85 },
        { id: 'robot-arm', name: 'Industrial Robot Arm', complexity: 'High', components: 94 },
        { id: 'laser-cutter', name: 'Laser Cutting System', complexity: 'Medium', components: 76 }
      ]
    },
    {
      name: 'Automotive',
      items: [
        { id: 'engine-v8', name: 'V8 Engine Block', complexity: 'High', components: 150 },
        { id: 'transmission', name: 'Automatic Transmission', complexity: 'High', components: 130 },
        { id: 'brake-system', name: 'Disc Brake Assembly', complexity: 'Medium', components: 45 },
        { id: 'suspension', name: 'Front Suspension System', complexity: 'Medium', components: 60 }
      ]
    },
    {
      name: 'Consumer Electronics',
      items: [
        { id: 'smartphone', name: 'Smartphone', complexity: 'Medium', components: 70 },
        { id: 'drone', name: 'Consumer Drone', complexity: 'Medium', components: 85 },
        { id: 'laptop', name: 'Laptop Computer', complexity: 'High', components: 110 },
        { id: 'dslr-camera', name: 'DSLR Camera', complexity: 'High', components: 95 }
      ]
    },
    {
      name: 'Tools & Hardware',
      items: [
        { id: 'power-drill', name: 'Cordless Power Drill', complexity: 'Medium', components: 55 },
        { id: 'chainsaw', name: 'Chainsaw', complexity: 'Medium', components: 75 },
        { id: 'lawn-mower', name: 'Riding Lawn Mower', complexity: 'High', components: 110 },
        { id: 'portable-generator', name: 'Portable Generator', complexity: 'Medium', components: 65 }
      ]
    },
    {
      name: 'Appliances',
      items: [
        { id: 'refrigerator', name: 'Refrigerator Cooling System', complexity: 'Medium', components: 70 },
        { id: 'washing-machine', name: 'Washing Machine', complexity: 'Medium', components: 85 },
        { id: 'espresso-machine', name: 'Espresso Machine', complexity: 'Medium', components: 60 },
        { id: 'vacuum-cleaner', name: 'Robotic Vacuum Cleaner', complexity: 'Medium', components: 65 }
      ]
    },
    {
      name: 'Medical Devices',
      items: [
        { id: 'ventilator', name: 'Medical Ventilator', complexity: 'High', components: 120 },
        { id: 'mri-machine', name: 'MRI Machine Components', complexity: 'Very High', components: 180 },
        { id: 'heart-monitor', name: 'Heart Rate Monitor', complexity: 'Medium', components: 60 },
        { id: 'prosthetic-leg', name: 'Prosthetic Leg', complexity: 'High', components: 95 }
      ]
    }
  ];

  // Sample component structure for V8 Engine
  const componentHierarchy = [
    {
      id: 'block-assembly',
      name: 'Engine Block Assembly',
      children: [
        { id: 'cylinder-block', name: 'Cylinder Block' },
        { id: 'cylinder-heads', name: 'Cylinder Heads' },
        { id: 'gaskets', name: 'Head Gaskets' },
        { id: 'water-jackets', name: 'Water Jackets' }
      ]
    },
    {
      id: 'crankshaft-assembly',
      name: 'Crankshaft Assembly',
      children: [
        { id: 'crankshaft', name: 'Crankshaft' },
        { id: 'bearings', name: 'Main Bearings' },
        { id: 'flywheel', name: 'Flywheel' },
        { id: 'harmonic-balancer', name: 'Harmonic Balancer' }
      ]
    },
    {
      id: 'pistons-assembly',
      name: 'Pistons Assembly',
      children: [
        { id: 'pistons', name: 'Pistons' },
        { id: 'piston-rings', name: 'Piston Rings' },
        { id: 'connecting-rods', name: 'Connecting Rods' },
        { id: 'wrist-pins', name: 'Wrist Pins' }
      ]
    },
    {
      id: 'valvetrain-assembly',
      name: 'Valvetrain Assembly',
      children: [
        { id: 'valves', name: 'Valves' },
        { id: 'springs', name: 'Valve Springs' },
        { id: 'lifters', name: 'Lifters' },
        { id: 'pushrods', name: 'Pushrods' },
        { id: 'rocker-arms', name: 'Rocker Arms' }
      ]
    },
    {
      id: 'camshaft-assembly',
      name: 'Camshaft Assembly',
      children: [
        { id: 'camshaft', name: 'Camshaft' },
        { id: 'cam-bearings', name: 'Cam Bearings' },
        { id: 'timing-chain', name: 'Timing Chain' },
        { id: 'gears', name: 'Timing Gears' }
      ]
    },
    {
      id: 'lubrication-assembly',
      name: 'Lubrication System',
      children: [
        { id: 'oil-pump', name: 'Oil Pump' },
        { id: 'oil-pan', name: 'Oil Pan' },
        { id: 'oil-filter', name: 'Oil Filter' },
        { id: 'oil-pickup', name: 'Oil Pickup Tube' }
      ]
    },
    {
      id: 'fuel-assembly',
      name: 'Fuel System',
      children: [
        { id: 'injectors', name: 'Fuel Injectors' },
        { id: 'fuel-rails', name: 'Fuel Rails' },
        { id: 'throttle-body', name: 'Throttle Body' },
        { id: 'intake-manifold', name: 'Intake Manifold' }
      ]
    },
    {
      id: 'exhaust-assembly',
      name: 'Exhaust System',
      children: [
        { id: 'exhaust-manifolds', name: 'Exhaust Manifolds' },
        { id: 'exhaust-valves', name: 'Exhaust Valves' },
        { id: 'catalytic-converter', name: 'Catalytic Converter' },
        { id: 'oxygen-sensors', name: 'Oxygen Sensors' }
      ]
    }
  ];

  // Select a model
  const handleModelSelect = (categoryIndex, modelIndex) => {
    const selectedItem = modelCategories[categoryIndex].items[modelIndex];
    setSelectedModel(selectedItem);
    // Reset view settings when changing models
    setViewMode('normal');
    setExplosionLevel(0);
    setCutawayAxis('none');
    setCutawayPosition(50);
    setSelectedComponent(null);
  };

  // Handle explosion level change
  const handleExplosionChange = (e) => {
    setExplosionLevel(Number(e.target.value));
  };

  // Handle cutaway position change
  const handleCutawayPositionChange = (e) => {
    setCutawayPosition(Number(e.target.value));
  };

  // Handle component selection
  const handleComponentSelect = (component) => {
    setSelectedComponent(component);
  };

  // Component detail panel
  const ComponentDetail = () => {
    if (!selectedComponent) return (
      <div className="p-4 text-gray-500 text-center">
        Select a component to view details
      </div>
    );
    
    return (
      <div className="p-4">
        <h3 className="font-bold text-lg mb-2">{selectedComponent.name}</h3>
        <div className="bg-gray-100 h-40 rounded flex items-center justify-center mb-3">
          [Component Image]
        </div>
        <div className="space-y-3">
          <div>
            <h4 className="font-semibold text-sm">Description</h4>
            <p className="text-sm text-gray-600">
              This is the {selectedComponent.name.toLowerCase()} of the engine. It plays a crucial role in the 
              overall operation by [function description].
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm">Material</h4>
            <p className="text-sm text-gray-600">
              Typically made of high-grade aluminum alloy or cast iron depending on the application.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm">Maintenance</h4>
            <p className="text-sm text-gray-600">
              Requires inspection every 50,000 miles. Common issues include wear on contact surfaces.
            </p>
          </div>
          <div className="flex space-x-2">
            <button className="bg-blue-600 text-white text-sm py-1 px-3 rounded">
              Learn More
            </button>
            <button className="bg-gray-200 text-sm py-1 px-3 rounded">
              View Assembly Guide
            </button>
          </div>
        </div>
      </div>
    );
  };

  // 3D Controls panel
  const ViewControls = () => (
    <div className="p-4 space-y-4 border-b">
      <div>
        <h3 className="font-bold mb-2">View Mode</h3>
        <div className="flex space-x-2">
          <button 
            className={`px-3 py-1 text-sm rounded ${viewMode === 'normal' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
            onClick={() => setViewMode('normal')}
          >
            Normal
          </button>
          <button 
            className={`px-3 py-1 text-sm rounded ${viewMode === 'exploded' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
            onClick={() => setViewMode('exploded')}
          >
            Exploded
          </button>
          <button 
            className={`px-3 py-1 text-sm rounded ${viewMode === 'cutaway' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
            onClick={() => setViewMode('cutaway')}
          >
            Cutaway
          </button>
        </div>
      </div>
      
      {viewMode === 'exploded' && (
        <div>
          <h3 className="font-bold mb-1">Explosion Level</h3>
          <input 
            type="range" 
            min="0" 
            max="100" 
            value={explosionLevel} 
            onChange={handleExplosionChange}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-gray-500">
            <span>Compact</span>
            <span>Fully Exploded</span>
          </div>
        </div>
      )}
      
      {viewMode === 'cutaway' && (
        <div className="space-y-2">
          <h3 className="font-bold mb-1">Cutaway Plane</h3>
          <div className="flex space-x-2 mb-2">
            <button 
              className={`px-2 py-1 text-xs rounded ${cutawayAxis === 'x' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
              onClick={() => setCutawayAxis('x')}
            >
              X-Axis
            </button>
            <button 
              className={`px-2 py-1 text-xs rounded ${cutawayAxis === 'y' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
              onClick={() => setCutawayAxis('y')}
            >
              Y-Axis
            </button>
            <button 
              className={`px-2 py-1 text-xs rounded ${cutawayAxis === 'z' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
              onClick={() => setCutawayAxis('z')}
            >
              Z-Axis
            </button>
          </div>
          
          <div>
            <h3 className="font-bold mb-1">Slice Position</h3>
            <input 
              type="range" 
              min="0" 
              max="100" 
              value={cutawayPosition} 
              onChange={handleCutawayPositionChange}
              className="w-full"
              disabled={cutawayAxis === 'none'}
            />
          </div>
        </div>
      )}
      
      <div className="flex items-center space-x-3">
        <label className="flex items-center text-sm">
          <input 
            type="checkbox" 
            checked={showLabels} 
            onChange={() => setShowLabels(!showLabels)}
            className="mr-2"
          />
          Show Labels
        </label>
        
        <button className="bg-gray-200 px-3 py-1 text-sm rounded">
          Reset View
        </button>
      </div>
    </div>
  );

  // Render the model explorer
  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <header className="bg-gray-800 text-white p-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="text-xl font-bold">3D Component Explorer</div>
          <div>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded">
              Help
            </button>
          </div>
        </div>
      </header>

      {/* Main content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left sidebar - Model selection */}
        <div className="w-64 border-r bg-gray-50 flex flex-col">
          <div className="p-4 border-b">
            <h2 className="font-bold text-lg">Model Library</h2>
            <p className="text-xs text-gray-500">Select a model to explore its components</p>
          </div>
          <div className="overflow-y-auto flex-1">
            {modelCategories.map((category, categoryIndex) => (
              <div key={categoryIndex} className="mb-4">
                <div className="bg-gray-200 px-4 py-2 font-semibold">
                  {category.name}
                </div>
                <div className="px-2">
                  {category.items.map((model, modelIndex) => (
                    <div 
                      key={modelIndex} 
                      className={`px-2 py-2 border-b cursor-pointer hover:bg-blue-50 ${selectedModel?.id === model.id ? 'bg-blue-100' : ''}`}
                      onClick={() => handleModelSelect(categoryIndex, modelIndex)}
                    >
                      <div className="font-medium text-sm">{model.name}</div>
                      <div className="flex justify-between text-xs text-gray-500">
                        <span>Complexity: {model.complexity}</span>
                        <span>{model.components} parts</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Main content area */}
        <div className="flex-1 flex flex-col">
          {selectedModel ? (
            <>
              {/* Model view header */}
              <div className="bg-white p-4 border-b">
                <h2 className="text-xl font-bold">{selectedModel.name}</h2>
                <div className="flex space-x-4 mt-2">
                  <button 
                    className={`px-3 py-1 text-sm rounded-full ${activeTab === 'overview' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
                    onClick={() => setActiveTab('overview')}
                  >
                    Overview
                  </button>
                  <button 
                    className={`px-3 py-1 text-sm rounded-full ${activeTab === 'specifications' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
                    onClick={() => setActiveTab('specifications')}
                  >
                    Specifications
                  </button>
                  <button 
                    className={`px-3 py-1 text-sm rounded-full ${activeTab === 'maintenance' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
                    onClick={() => setActiveTab('maintenance')}
                  >
                    Maintenance
                  </button>
                  <button 
                    className={`px-3 py-1 text-sm rounded-full ${activeTab === 'operation' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
                    onClick={() => setActiveTab('operation')}
                  >
                    Operation
                  </button>
                </div>
              </div>
              
              {/* Model viewer */}
              <div className="flex flex-1 overflow-hidden">
                {/* 3D viewport */}
                <div className="flex-1 relative bg-gray-900">
                  <div className="absolute inset-0 flex items-center justify-center text-white text-xl">
                    {/* Placeholder for 3D model viewer */}
                    <div className="text-center">
                      <div className="mb-4">[3D Model Viewer]</div>
                      <div className="text-sm">
                        {viewMode === 'normal' && 'Normal View'}
                        {viewMode === 'exploded' && `Exploded View (Level: ${explosionLevel}%)`}
                        {viewMode === 'cutaway' && `Cutaway View (${cutawayAxis.toUpperCase()}-Axis: ${cutawayPosition}%)`}
                      </div>
                    </div>
                  </div>
                  
                  {/* Camera controls */}
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-black bg-opacity-50 text-white rounded-full px-4 py-2 flex space-x-6">
                      <button className="hover:text-blue-300">
                        <span role="img" aria-label="rotate">🔄</span>
                      </button>
                      <button className="hover:text-blue-300">
                        <span role="img" aria-label="zoom">🔍</span>
                      </button>
                      <button className="hover:text-blue-300">
                        <span role="img" aria-label="pan">👆</span>
                      </button>
                      <button className="hover:text-blue-300">
                        <span role="img" aria-label="reset">⟲</span>
                      </button>
                    </div>
                  </div>
                </div>
                
                {/* Right sidebar - Component details */}
                <div className="w-80 border-l flex flex-col">
                  <ViewControls />
                  
                  <div className="flex-1 overflow-y-auto">
                    <div className="p-4 border-b">
                      <h3 className="font-bold mb-2">Component Hierarchy</h3>
                      <div className="max-h-64 overflow-y-auto bg-gray-50 rounded border p-2">
                        {componentHierarchy.map((group) => (
                          <div key={group.id} className="mb-2">
                            <div 
                              className="font-medium text-sm cursor-pointer hover:text-blue-600"
                              onClick={() => handleComponentSelect(group)}
                            >
                              {group.name}
                            </div>
                            <div className="pl-3 mt-1">
                              {group.children.map((component) => (
                                <div 
                                  key={component.id} 
                                  className={`text-xs py-1 cursor-pointer hover:text-blue-600 ${selectedComponent?.id === component.id ? 'text-blue-600 font-semibold' : ''}`}
                                  onClick={() => handleComponentSelect(component)}
                                >
                                  {component.name}
                                </div>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    {/* Component details */}
                    <ComponentDetail />
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center bg-gray-100">
              <div className="text-center p-8 max-w-md">
                <div className="text-6xl mb-4">🔍</div>
                <h2 className="text-2xl font-bold mb-2">Select a Model</h2>
                <p className="text-gray-600">
                  Choose a model from the library to explore its components, view exploded diagrams, and learn about its operation.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ComponentViewer;
