import React, { useState, useEffect } from 'react';
import { LineChart, Line, BarChart, Bar, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ScatterChart, Scatter, ZAxis } from 'recharts';
import { Rocket, Brain, Database, Shield, Satellite, Zap, Globe, Moon, Star, Activity, Cpu, HardDrive, Thermometer, Radio } from 'lucide-react';

const InterstellarConsciousnessApp = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedNEO, setSelectedNEO] = useState(null);
  const [missionYear, setMissionYear] = useState(0);

  // Near-Earth Objects Data (realistic simulated data)
  const neoData = [
    { id: 1, name: '433 Eros', type: 'S-type', diameter: 16.84, distance: 0.15, velocity: 24.36, composition: 'Silicate', albedo: 0.25, rotation: 5.27, optimal: false },
    { id: 2, name: '1036 Ganymed', type: 'S-type', diameter: 31.66, distance: 0.25, velocity: 17.42, composition: 'Silicate', albedo: 0.22, rotation: 10.3, optimal: false },
    { id: 3, name: '253 Mathilde', type: 'C-type', diameter: 52.8, distance: 1.94, velocity: 19.87, composition: 'Carbonaceous', albedo: 0.04, rotation: 417.7, optimal: true },
    { id: 4, name: '65 Cybele', type: 'C-type', diameter: 237, distance: 3.07, velocity: 16.32, composition: 'Carbonaceous', albedo: 0.06, rotation: 6.08, optimal: true },
    { id: 5, name: '10 Hygiea', type: 'C-type', diameter: 407, distance: 2.91, velocity: 16.76, composition: 'Carbonaceous', albedo: 0.07, rotation: 27.6, optimal: true },
    { id: 6, name: '24 Themis', type: 'C-type', diameter: 198, distance: 3.13, velocity: 15.98, composition: 'Carbonaceous', albedo: 0.05, rotation: 8.38, optimal: true },
    { id: 7, name: '2 Pallas', type: 'B-type', diameter: 512, distance: 2.77, velocity: 17.65, composition: 'Carbonaceous', albedo: 0.10, rotation: 7.81, optimal: false },
    { id: 8, name: '1221 Amor', type: 'S-type', diameter: 1.0, distance: 0.11, velocity: 32.7, composition: 'Silicate', albedo: 0.18, rotation: 2.57, optimal: false },
    { id: 9, name: '52 Europa', type: 'C-type', diameter: 302.5, distance: 3.10, velocity: 16.45, composition: 'Carbonaceous', albedo: 0.06, rotation: 11.2, optimal: true },
    { id: 10, name: '704 Interamnia', type: 'C-type', diameter: 326, distance: 3.06, velocity: 16.92, composition: 'Carbonaceous', albedo: 0.05, rotation: 8.73, optimal: true },
  ];

  // Technology Readiness Levels
  const technologyData = [
    { name: 'DNA Storage', current: 85, required: 95, timeline: 2035 },
    { name: 'Microfluidics', current: 70, required: 90, timeline: 2040 },
    { name: 'Ion Propulsion', current: 90, required: 95, timeline: 2030 },
    { name: 'Self-Healing', current: 60, required: 85, timeline: 2045 },
    { name: 'Brain Mapping', current: 45, required: 95, timeline: 2060 },
    { name: 'Consciousness Transfer', current: 15, required: 95, timeline: 2080 },
  ];

  // Storage Density Comparison
  const storageData = [
    { name: 'DNA', density: 19, capacity: 215000, power: 0, temp: 20 },
    { name: 'Atomic', density: 17, capacity: 1000, power: 5000, temp: -270 },
    { name: 'Holographic', density: 15, capacity: 500, power: 100, temp: 20 },
    { name: 'Quantum', density: 16, capacity: 2000, power: 10000, temp: -273 },
    { name: 'Memristor', density: 12, capacity: 10, power: 50, temp: 60 },
  ];

  // Mission Timeline
  const missionPhases = [
    { year: 0, phase: 'Launch Preparation', status: 'Planning', energy: 100 },
    { year: 10, phase: 'Solar System Escape', status: 'Active', energy: 95 },
    { year: 100, phase: 'Interstellar Cruise', status: 'Stealth', energy: 90 },
    { year: 1000, phase: 'Mid-Journey Check', status: 'Stealth', energy: 80 },
    { year: 5000, phase: 'Halfway Point', status: 'Stealth', energy: 65 },
    { year: 9000, phase: 'Target Approach', status: 'Active', energy: 55 },
    { year: 10000, phase: 'Arrival & Deployment', status: 'Active', energy: 50 },
    { year: 15000, phase: 'Return Journey', status: 'Stealth', energy: 40 },
    { year: 20000, phase: 'Home Arrival', status: 'Complete', energy: 25 },
  ];

  // Radiation Protection Data
  const radiationData = [
    { angle: 0, aluminum: 20, hydrogenRich: 65, boronNitride: 80, multilayer: 90 },
    { angle: 45, aluminum: 22, hydrogenRich: 68, boronNitride: 82, multilayer: 91 },
    { angle: 90, aluminum: 25, hydrogenRich: 70, boronNitride: 85, multilayer: 93 },
    { angle: 135, aluminum: 23, hydrogenRich: 67, boronNitride: 83, multilayer: 92 },
    { angle: 180, aluminum: 21, hydrogenRich: 66, boronNitride: 81, multilayer: 90 },
  ];

  const renderOverview = () => (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-purple-900 via-blue-900 to-indigo-900 rounded-lg p-8 text-white">
        <h2 className="text-4xl font-bold mb-4 flex items-center gap-3">
          <Brain className="w-10 h-10" />
          Interstellar Consciousness Transfer Protocol
        </h2>
        <p className="text-xl leading-relaxed">
          A comprehensive system for transferring human consciousness across interstellar distances using 
          camouflaged celestial objects, ensuring complete untraceability through round-trip mission architecture.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-blue-50 rounded-lg p-6 border-2 border-blue-200">
          <Database className="w-8 h-8 text-blue-600 mb-2" />
          <h3 className="font-bold text-lg mb-1">DNA Storage</h3>
          <p className="text-3xl font-bold text-blue-600">10^19</p>
          <p className="text-sm text-gray-600">bits/cm³ density</p>
        </div>
        
        <div className="bg-green-50 rounded-lg p-6 border-2 border-green-200">
          <Shield className="w-8 h-8 text-green-600 mb-2" />
          <h3 className="font-bold text-lg mb-1">Protection</h3>
          <p className="text-3xl font-bold text-green-600">91%</p>
          <p className="text-sm text-gray-600">self-healing in 5min</p>
        </div>
        
        <div className="bg-purple-50 rounded-lg p-6 border-2 border-purple-200">
          <Rocket className="w-8 h-8 text-purple-600 mb-2" />
          <h3 className="font-bold text-lg mb-1">Mission Duration</h3>
          <p className="text-3xl font-bold text-purple-600">20,000</p>
          <p className="text-sm text-gray-600">years round-trip</p>
        </div>
        
        <div className="bg-orange-50 rounded-lg p-6 border-2 border-orange-200">
          <Star className="w-8 h-8 text-orange-600 mb-2" />
          <h3 className="font-bold text-lg mb-1">Stealth Factor</h3>
          <p className="text-3xl font-bold text-orange-600">C-type</p>
          <p className="text-sm text-gray-600">asteroid mimicry</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-2xl font-bold mb-4">Mission Architecture Overview</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="border-l-4 border-blue-500 pl-4">
            <h4 className="font-bold text-lg mb-2">Phase 1: Capture</h4>
            <ul className="text-sm space-y-1 text-gray-700">
              <li>• Neural mapping (86B neurons)</li>
              <li>• DNA encoding (10 exabytes)</li>
              <li>• Radiation-resistant encapsulation</li>
              <li>• Triple redundancy systems</li>
            </ul>
          </div>
          <div className="border-l-4 border-green-500 pl-4">
            <h4 className="font-bold text-lg mb-2">Phase 2: Transit</h4>
            <ul className="text-sm space-y-1 text-gray-700">
              <li>• C-type asteroid camouflage</li>
              <li>• Microfluidic protection active</li>
              <li>• Ion propulsion navigation</li>
              <li>• Complete stealth operation</li>
            </ul>
          </div>
          <div className="border-l-4 border-purple-500 pl-4">
            <h4 className="font-bold text-lg mb-2">Phase 3: Revival</h4>
            <ul className="text-sm space-y-1 text-gray-700">
              <li>• Self-replicating infrastructure</li>
              <li>• Consciousness reconstruction</li>
              <li>• Return vessel preparation</li>
              <li>• Double-anonymity achieved</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );

  const renderTechnology = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <Cpu className="w-6 h-6" />
          Technology Readiness Assessment
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={technologyData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" angle={-45} textAnchor="end" height={100} />
            <YAxis label={{ value: 'Readiness Level (%)', angle: -90, position: 'insideLeft' }} />
            <Tooltip />
            <Legend />
            <Bar dataKey="current" fill="#3b82f6" name="Current TRL" />
            <Bar dataKey="required" fill="#10b981" name="Required TRL" />
          </BarChart>
        </ResponsiveContainer>
        <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-4">
          {technologyData.map(tech => (
            <div key={tech.name} className="bg-gray-50 rounded p-3">
              <div className="font-semibold text-sm">{tech.name}</div>
              <div className="text-xs text-gray-600">Target: {tech.timeline}</div>
              <div className="mt-1 bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-500 h-2 rounded-full transition-all"
                  style={{ width: `${(tech.current / tech.required) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <HardDrive className="w-6 h-6" />
          Storage Technology Comparison
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <ScatterChart>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              type="number" 
              dataKey="density" 
              name="Density (log10 bits/cm³)" 
              label={{ value: 'Storage Density (log₁₀)', position: 'insideBottom', offset: -5 }}
            />
            <YAxis 
              type="number" 
              dataKey="capacity" 
              name="Capacity (PB/g)" 
              label={{ value: 'Capacity (PB/g)', angle: -90, position: 'insideLeft' }}
              scale="log"
              domain={['auto', 'auto']}
            />
            <ZAxis type="number" dataKey="power" range={[100, 1000]} name="Power (W)" />
            <Tooltip cursor={{ strokeDasharray: '3 3' }} />
            <Legend />
            <Scatter name="Storage Technologies" data={storageData} fill="#8b5cf6">
              {storageData.map((entry, index) => (
                <text key={index} x={0} y={0} textAnchor="middle" fontSize={10}>
                  {entry.name}
                </text>
              ))}
            </Scatter>
          </ScatterChart>
        </ResponsiveContainer>
        <div className="mt-4 grid grid-cols-1 md:grid-cols-5 gap-3">
          {storageData.map(tech => (
            <div key={tech.name} className={`rounded-lg p-4 ${tech.name === 'DNA' ? 'bg-purple-100 border-2 border-purple-500' : 'bg-gray-50'}`}>
              <div className="font-bold">{tech.name}</div>
              <div className="text-xs mt-2 space-y-1">
                <div>Density: 10^{tech.density}</div>
                <div>Capacity: {tech.capacity} PB/g</div>
                <div>Power: {tech.power} W</div>
                <div>Temp: {tech.temp}°C</div>
              </div>
              {tech.name === 'DNA' && (
                <div className="mt-2 text-xs font-bold text-purple-700">✓ OPTIMAL</div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <Shield className="w-6 h-6" />
          Radiation Protection Effectiveness
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <RadarChart data={radiationData}>
            <PolarGrid />
            <PolarAngleAxis dataKey="angle" />
            <PolarRadiusAxis angle={90} domain={[0, 100]} />
            <Radar name="Aluminum" dataKey="aluminum" stroke="#94a3b8" fill="#94a3b8" fillOpacity={0.3} />
            <Radar name="Hydrogen-Rich" dataKey="hydrogenRich" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.3} />
            <Radar name="Boron Nitride" dataKey="boronNitride" stroke="#10b981" fill="#10b981" fillOpacity={0.3} />
            <Radar name="Multilayer" dataKey="multilayer" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.5} />
            <Legend />
            <Tooltip />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );

  const renderNEOs = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <Moon className="w-6 h-6" />
          Near-Earth Objects: Camouflage Candidates
        </h3>
        <p className="mb-4 text-gray-700">
          C-type (carbonaceous) asteroids provide optimal stealth characteristics: low albedo (0.03-0.09), 
          abundant population (75% of asteroids), and easily mimicked composition.
        </p>
        
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">Type</th>
                <th className="p-3 text-right">Diameter (km)</th>
                <th className="p-3 text-right">Distance (AU)</th>
                <th className="p-3 text-right">Velocity (km/s)</th>
                <th className="p-3 text-right">Albedo</th>
                <th className="p-3 text-right">Rotation (hrs)</th>
                <th className="p-3 text-center">Stealth Rating</th>
              </tr>
            </thead>
            <tbody>
              {neoData.map(neo => (
                <tr 
                  key={neo.id}
                  className={`border-b hover:bg-gray-50 cursor-pointer ${neo.optimal ? 'bg-green-50' : ''}`}
                  onClick={() => setSelectedNEO(neo)}
                >
                  <td className="p-3 font-medium">{neo.name}</td>
                  <td className="p-3">
                    <span className={`px-2 py-1 rounded text-xs font-bold ${neo.type === 'C-type' ? 'bg-green-200 text-green-800' : 'bg-gray-200 text-gray-800'}`}>
                      {neo.type}
                    </span>
                  </td>
                  <td className="p-3 text-right">{neo.diameter.toFixed(2)}</td>
                  <td className="p-3 text-right">{neo.distance.toFixed(2)}</td>
                  <td className="p-3 text-right">{neo.velocity.toFixed(2)}</td>
                  <td className="p-3 text-right">{neo.albedo.toFixed(2)}</td>
                  <td className="p-3 text-right">{neo.rotation.toFixed(1)}</td>
                  <td className="p-3 text-center">
                    {neo.optimal ? (
                      <span className="text-green-600 font-bold">★★★★★</span>
                    ) : (
                      <span className="text-gray-400">★★</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {selectedNEO && (
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-xl font-bold mb-4">Selected Object: {selectedNEO.name}</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-blue-50 rounded p-4">
              <div className="text-sm text-gray-600">Composition</div>
              <div className="text-xl font-bold text-blue-600">{selectedNEO.composition}</div>
            </div>
            <div className="bg-purple-50 rounded p-4">
              <div className="text-sm text-gray-600">Diameter</div>
              <div className="text-xl font-bold text-purple-600">{selectedNEO.diameter.toFixed(2)} km</div>
            </div>
            <div className="bg-green-50 rounded p-4">
              <div className="text-sm text-gray-600">Albedo</div>
              <div className="text-xl font-bold text-green-600">{selectedNEO.albedo.toFixed(3)}</div>
            </div>
            <div className="bg-orange-50 rounded p-4">
              <div className="text-sm text-gray-600">Rotation Period</div>
              <div className="text-xl font-bold text-orange-600">{selectedNEO.rotation.toFixed(1)} hrs</div>
            </div>
          </div>
          
          <div className="mt-4 p-4 bg-gray-50 rounded">
            <h4 className="font-bold mb-2">Stealth Assessment</h4>
            {selectedNEO.optimal ? (
              <div className="text-green-700">
                <p className="font-semibold">✓ EXCELLENT CANDIDATE</p>
                <ul className="mt-2 space-y-1 text-sm">
                  <li>• Low albedo provides thermal stealth</li>
                  <li>• C-type composition abundant in solar system</li>
                  <li>• Size appropriate for mission payload</li>
                  <li>• Rotation period within natural range</li>
                </ul>
              </div>
            ) : (
              <div className="text-gray-700">
                <p className="font-semibold">⚠ SUBOPTIMAL</p>
                <ul className="mt-2 space-y-1 text-sm">
                  <li>• Higher albedo increases detection risk</li>
                  <li>• S-type asteroids less common for camouflage</li>
                  <li>• Consider C-type alternatives</li>
                </ul>
              </div>
            )}
          </div>
        </div>
      )}

      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-xl font-bold mb-4">Optimal Camouflage Parameters</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="border-l-4 border-green-500 pl-4">
            <h4 className="font-semibold mb-2">Physical Characteristics</h4>
            <ul className="text-sm space-y-1 text-gray-700">
              <li>• Type: C-type carbonaceous</li>
              <li>• Diameter: 100-400m</li>
              <li>• Albedo: 0.03-0.09</li>
              <li>• Density: 1.3-2.0 g/cm³</li>
              <li>• Rotation: 2-40 hours</li>
            </ul>
          </div>
          <div className="border-l-4 border-blue-500 pl-4">
            <h4 className="font-semibold mb-2">Behavioral Mimicry</h4>
            <ul className="text-sm space-y-1 text-gray-700">
              <li>• Gravity-assisted trajectory</li>
              <li>• Natural rotation wobble</li>
              <li>• No active emissions</li>
              <li>• Edge-on thermal profile</li>
              <li>• Realistic surface features</li>
            </ul>
          </div>
          <div className="border-l-4 border-purple-500 pl-4">
            <h4 className="font-semibold mb-2">Detection Avoidance</h4>
            <ul className="text-sm space-y-1 text-gray-700">
              <li>• IR signature minimized</li>
              <li>• Passive navigation only</li>
              <li>• Ion drive off during cruise</li>
              <li>• Blends with NEO population</li>
              <li>• Indistinguishable spectroscopy</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );

  const renderMission = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <Rocket className="w-6 h-6" />
          Mission Timeline: 20,000-Year Round Trip
        </h3>
        
        <div className="mb-6">
          <label className="block text-sm font-medium mb-2">Mission Year: {missionYear.toLocaleString()}</label>
          <input 
            type="range" 
            min="0" 
            max="20000" 
            step="100"
            value={missionYear}
            onChange={(e) => setMissionYear(Number(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>Launch</span>
            <span>Interstellar Cruise</span>
            <span>Arrival</span>
            <span>Return</span>
            <span>Complete</span>
          </div>
        </div>

        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={missionPhases}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="year" 
              label={{ value: 'Mission Year', position: 'insideBottom', offset: -5 }}
              tickFormatter={(value) => `${value/1000}k`}
            />
            <YAxis 
              label={{ value: 'Energy Reserve (%)', angle: -90, position: 'insideLeft' }}
            />
            <Tooltip 
              formatter={(value, name) => [value + (name === 'energy' ? '%' : ''), name]}
            />
            <Legend />
            <Line type="monotone" dataKey="energy" stroke="#8b5cf6" strokeWidth={3} name="Power System" />
          </LineChart>
        </ResponsiveContainer>

        <div className="mt-6 space-y-3">
          {missionPhases.map(phase => {
            const isActive = missionYear >= phase.year && (missionPhases[missionPhases.indexOf(phase) + 1]?.year > missionYear || !missionPhases[missionPhases.indexOf(phase) + 1]);
            return (
              <div 
                key={phase.year}
                className={`p-4 rounded-lg border-l-4 transition-all ${
                  isActive 
                    ? 'bg-purple-50 border-purple-500 shadow-md' 
                    : 'bg-gray-50 border-gray-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-bold">{phase.phase}</div>
                    <div className="text-sm text-gray-600">Year {phase.year.toLocaleString()}</div>
                  </div>
                  <div className="text-right">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                      phase.status === 'Stealth' ? 'bg-green-200 text-green-800' :
                      phase.status === 'Active' ? 'bg-blue-200 text-blue-800' :
                      phase.status === 'Planning' ? 'bg-gray-200 text-gray-800' :
                      'bg-purple-200 text-purple-800'
                    }`}>
                      {phase.status}
                    </span>
                    <div className="text-sm text-gray-600 mt-1">Energy: {phase.energy}%</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-xl font-bold mb-4">Mission Architecture Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold mb-3 flex items-center gap-2">
              <Activity className="w-5 h-5" />
              Propulsion System
            </h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between p-2 bg-gray-50 rounded">
                <span>Primary Drive:</span>
                <span className="font-semibold">Ion Thruster</span>
              </div>
              <div className="flex justify-between p-2 bg-gray-50 rounded">
                <span>Specific Impulse:</span>
                <span className="font-semibold">5,000 sec</span>
              </div>
              <div className="flex justify-between p-2 bg-gray-50 rounded">
                <span>Thrust:</span>
                <span className="font-semibold">5.4 N</span>
              </div>
              <div className="flex justify-between p-2 bg-gray-50 rounded">
                <span>Power Requirement:</span>
                <span className="font-semibold">102 kW</span>
              </div>
              <div className="flex justify-between p-2 bg-gray-50 rounded">
                <span>Backup System:</span>
                <span className="font-semibold">Chemical RCS</span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-3 flex items-center gap-2">
              <Zap className="w-5 h-5" />
              Power Generation
            </h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between p-2 bg-gray-50 rounded">
                <span>Primary Source:</span>
                <span className="font-semibold">Americium-241 RTG</span>
              </div>
              <div className="flex justify-between p-2 bg-gray-50 rounded">
                <span>Half-life:</span>
                <span className="font-semibold">432 years</span>
              </div>
              <div className="flex justify-between p-2 bg-gray-50 rounded">
                <span>Initial Output:</span>
                <span className="font-semibold">150 kW</span>
              </div>
              <div className="flex justify-between p-2 bg-gray-50 rounded">
                <span>End-of-Mission:</span>
                <span className="font-semibold">38 kW</span>
              </div>
              <div className="flex justify-between p-2 bg-gray-50 rounded">
                <span>Supplemental:</span>
                <span className="font-semibold">Energy Harvesting</span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-3 flex items-center gap-2">
              <Database className="w-5 h-5" />
              Consciousness Storage
            </h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between p-2 bg-gray-50 rounded">
                <span>Primary Medium:</span>
                <span className="font-semibold">DNA Sequences</span>
              </div>
              <div className="flex justify-between p-2 bg-gray-50 rounded">
                <span>Total Capacity:</span>
                <span className="font-semibold">10 Exabytes</span>
              </div>
              <div className="flex justify-between p-2 bg-gray-50 rounded">
                <span>Redundancy:</span>
                <span className="font-semibold">Triple (3x)</span>
              </div>
              <div className="flex justify-between p-2 bg-gray-50 rounded">
                <span>Encapsulation:</span>
                <span className="font-semibold">Steel Capsules</span>
              </div>
              <div className="flex justify-between p-2 bg-gray-50 rounded">
                <span>Processing:</span>
                <span className="font-semibold">Memristor Arrays</span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-3 flex items-center gap-2">
              <Shield className="w-5 h-5" />
              Protection Systems
            </h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between p-2 bg-gray-50 rounded">
                <span>Active System:</span>
                <span className="font-semibold">Microfluidic Network</span>
              </div>
              <div className="flex justify-between p-2 bg-gray-50 rounded">
                <span>Shielding:</span>
                <span className="font-semibold">Multilayer Composite</span>
              </div>
              <div className="flex justify-between p-2 bg-gray-50 rounded">
                <span>Self-Healing:</span>
                <span className="font-semibold">91% / 5 min</span>
              </div>
              <div className="flex justify-between p-2 bg-gray-50 rounded">
                <span>Thermal Control:</span>
                <span className="font-semibold">±0.1°C</span>
              </div>
              <div className="flex justify-between p-2 bg-gray-50 rounded">
                <span>Radiation Block:</span>
                <span className="font-semibold">90%+ efficiency</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderSpecs = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-2xl font-bold mb-6">Complete Technical Specifications</h3>
        
        <div className="space-y-6">
          <div className="border-l-4 border-blue-500 pl-6">
            <h4 className="text-xl font-bold mb-3 text-blue-700">Vessel Dimensions</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <div className="text-sm text-gray-600">Overall Diameter</div>
                <div className="text-2xl font-bold">200 m</div>
              </div>
              <div>
                <div className="text-sm text-gray-600">Mass (Dry)</div>
                <div className="text-2xl font-bold">2.5 × 10⁶ kg</div>
              </div>
              <div>
                <div className="text-sm text-gray-600">Density</div>
                <div className="text-2xl font-bold">1.7 g/cm³</div>
              </div>
              <div>
                <div className="text-sm text-gray-600">Albedo</div>
                <div className="text-2xl font-bold">0.05</div>
              </div>
            </div>
          </div>

          <div className="border-l-4 border-green-500 pl-6">
            <h4 className="text-xl font-bold mb-3 text-green-700">Consciousness System</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <div className="text-sm font-semibold mb-2">Data Capacity</div>
                <ul className="text-sm space-y-1">
                  <li>• Total neurons: 86 × 10⁹</li>
                  <li>• Synaptic connections: 100 × 10¹²</li>
                  <li>• Data requirement: 10,000 TB</li>
                  <li>• DNA storage mass: 46.5 grams</li>
                  <li>• Backup copies: 3× redundant</li>
                </ul>
              </div>
              <div>
                <div className="text-sm font-semibold mb-2">Processing Hardware</div>
                <ul className="text-sm space-y-1">
                  <li>• Memristor arrays: 10²² synapses</li>
                  <li>• Processing speed: 10¹⁵ ops/sec</li>
                  <li>• Power draw: 20 kW</li>
                  <li>• Quantum co-processor: 1000 qubits</li>
                  <li>• Temperature: -10°C ± 0.1°C</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="border-l-4 border-purple-500 pl-6">
            <h4 className="text-xl font-bold mb-3 text-purple-700">Microfluidic Protection</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <div className="text-sm font-semibold mb-2">Network Architecture</div>
                <ul className="text-sm space-y-1">
                  <li>• Total channels: 10⁶ pathways</li>
                  <li>• Channel diameter: 100-500 μm</li>
                  <li>• Fluid volume: 500 liters</li>
                  <li>• Flow rate: 0.1-10 mL/min</li>
                </ul>
              </div>
              <div>
                <div className="text-sm font-semibold mb-2">Thermal Management</div>
                <ul className="text-sm space-y-1">
                  <li>• Heat flux: 500 W/cm²</li>
                  <li>• Working fluid: n-octadecane</li>
                  <li>• Range: -200°C to +200°C</li>
                  <li>• Precision: ±0.1°C</li>
                </ul>
              </div>
              <div>
                <div className="text-sm font-semibold mb-2">Self-Healing</div>
                <ul className="text-sm space-y-1">
                  <li>• Recovery rate: 91% / 5 min</li>
                  <li>• Capsule size: 615-630 μm</li>
                  <li>• Healing agent: DCPD</li>
                  <li>• Cycles: 100+ repairs</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="border-l-4 border-orange-500 pl-6">
            <h4 className="text-xl font-bold mb-3 text-orange-700">Propulsion & Navigation</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <div className="text-sm font-semibold mb-2">Ion Drive System</div>
                <ul className="text-sm space-y-1">
                  <li>• Thruster type: X3 Hall effect</li>
                  <li>• Thrust output: 5.4 Newtons</li>
                  <li>• Specific impulse: 5,000 seconds</li>
                  <li>• Propellant: Xenon (2,000 kg)</li>
                  <li>• Efficiency: 70% power-to-thrust</li>
                  <li>• Operational life: 50,000 hours</li>
                </ul>
              </div>
              <div>
                <div className="text-sm font-semibold mb-2">Navigation System</div>
                <ul className="text-sm space-y-1">
                  <li>• Primary: Pulsar triangulation</li>
                  <li>• Accuracy: ±1 AU at 10 ly</li>
                  <li>• Attitude control: Reaction wheels</li>
                  <li>• Star trackers: Triple redundant</li>
                  <li>• Course corrections: 10-year intervals</li>
                  <li>• Autonomous operation: Full</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="border-l-4 border-red-500 pl-6">
            <h4 className="text-xl font-bold mb-3 text-red-700">Radiation Protection</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <div className="text-sm font-semibold mb-2">Shielding Layers</div>
                <ul className="text-sm space-y-1">
                  <li>• Outer layer: Aluminum-bronze (5 cm)</li>
                  <li>• Mid layer: Boron nitride composite (10 cm)</li>
                  <li>• Inner layer: Hydrogen-rich polymer (8 cm)</li>
                  <li>• Core vault: Molybdenum (3 cm)</li>
                  <li>• Total mass: 180,000 kg</li>
                </ul>
              </div>
              <div>
                <div className="text-sm font-semibold mb-2">Protection Performance</div>
                <ul className="text-sm space-y-1">
                  <li>• GCR attenuation: 90%</li>
                  <li>• Solar particle events: 99%</li>
                  <li>• Neutron capture: 85%</li>
                  <li>• Electromagnetic: Full spectrum</li>
                  <li>• Expected dose: 0.5 Gy/year</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="border-l-4 border-indigo-500 pl-6">
            <h4 className="text-xl font-bold mb-3 text-indigo-700">Power System</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <div className="text-sm font-semibold mb-2">Primary Generation</div>
                <ul className="text-sm space-y-1">
                  <li>• Source: ²⁴¹Am RTG</li>
                  <li>• Initial: 150 kW</li>
                  <li>• Year 10,000: 73 kW</li>
                  <li>• Year 20,000: 38 kW</li>
                  <li>• Total mass: 3,500 kg</li>
                </ul>
              </div>
              <div>
                <div className="text-sm font-semibold mb-2">Power Distribution</div>
                <ul className="text-sm space-y-1">
                  <li>• Storage: 20 kW</li>
                  <li>• Propulsion: 102 kW (active)</li>
                  <li>• Protection: 15 kW</li>
                  <li>• Sensors: 5 kW</li>
                  <li>• Reserve: 8 kW</li>
                </ul>
              </div>
              <div>
                <div className="text-sm font-semibold mb-2">Supplemental</div>
                <ul className="text-sm space-y-1">
                  <li>• Cosmic ray harvesting</li>
                  <li>• Magnetic field induction</li>
                  <li>• Temperature differential</li>
                  <li>• Total: +2-5 kW</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-blue-900 to-purple-900 rounded-lg p-6 text-white">
        <h3 className="text-xl font-bold mb-4">Mission Success Criteria</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h4 className="font-semibold mb-2">Technical Objectives</h4>
            <ul className="text-sm space-y-1">
              <li>✓ Consciousness data integrity &gt;99.999%</li>
              <li>✓ Stealth maintained through interstellar transit</li>
              <li>✓ Successful destination arrival within 1 AU</li>
              <li>✓ Infrastructure deployment and consciousness revival</li>
              <li>✓ Return vessel launch and trajectory establishment</li>
              <li>✓ Origin system arrival with complete anonymity</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Scientific Milestones</h4>
            <ul className="text-sm space-y-1">
              <li>✓ First interstellar consciousness transfer</li>
              <li>✓ Longest autonomous space mission</li>
              <li>✓ Demonstration of millennia-scale stealth</li>
              <li>✓ Validation of self-replicating probe technology</li>
              <li>✓ Proof of consciousness substrate independence</li>
              <li>✓ Establishment of interstellar transfer protocol</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );

  const tabs = [
    { id: 'overview', name: 'Overview', icon: Globe },
    { id: 'technology', name: 'Technology', icon: Cpu },
    { id: 'neos', name: 'NEO Database', icon: Moon },
    { id: 'mission', name: 'Mission Profile', icon: Rocket },
    { id: 'specs', name: 'Specifications', icon: Activity },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-t-lg shadow-2xl">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 rounded-t-lg">
            <h1 className="text-3xl font-bold mb-2 flex items-center gap-3">
              <Satellite className="w-8 h-8" />
              Interstellar Consciousness Transfer System
            </h1>
            <p className="text-blue-100">Mission Control & Technical Database</p>
          </div>

          <div className="flex border-b overflow-x-auto">
            {tabs.map(tab => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-6 py-4 font-medium transition-colors whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'bg-blue-50 text-blue-600 border-b-2 border-blue-600'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  {tab.name}
                </button>
              );
            })}
          </div>

          <div className="p-6">
            {activeTab === 'overview' && renderOverview()}
            {activeTab === 'technology' && renderTechnology()}
            {activeTab === 'neos' && renderNEOs()}
            {activeTab === 'mission' && renderMission()}
            {activeTab === 'specs' && renderSpecs()}
          </div>
        </div>

        <div className="mt-4 bg-gray-800 text-gray-300 rounded-b-lg p-4 text-sm">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <span className="font-semibold">Project Status:</span> Research & Development Phase
            </div>
            <div>
              <span className="font-semibold">Estimated Timeline:</span> 2025-2100 (Technical Feasibility)
            </div>
            <div>
              <span className="font-semibold">Research Classification:</span> Theoretical/Speculative
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InterstellarConsciousnessApp;