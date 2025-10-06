import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Home, Save, Download, Upload, Zap, Wrench, Settings, Grid,
  Share, Library, Plus, LayoutGrid, Activity, Calculator,
  Search, AlertTriangle, FileText, History, Database, Box,
  CheckCircle2, FolderTree, Star, Calendar, Heart, DollarSign, 
  Utensils, Car, Briefcase, Users, Shield, Thermometer, Camera, 
  MapPin, Clock, Target, BookOpen, Gamepad2, Music, Palette, 
  TreePine, ShoppingCart, Pill, Scissors, Hammer, Lightbulb, 
  Coffee, Baby, GraduationCap, Plane, Gift, Phone, Mail, Key, 
  Lock, Wifi, Bluetooth, Watch, Smartphone, Laptop, Tv, Shirt, 
  Package2, Flower, Dog, Fish, Bird, Sun, Moon, Sparkles, 
  Recycle, Banknote, CreditCard, Receipt, Archive, Bookmark, 
  Tag, Filter, SortAsc, BarChart3, Brain, TrendingUp, Bell,
  Eye, ChevronRight, ChevronDown, Edit, Trash2, QrCode,
  Maximize2, Minimize2, RotateCcw, RefreshCw, ExternalLink
} from 'lucide-react';

const LifeHubWireframe = () => {
  const [currentView, setCurrentView] = useState('dashboard');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  // Life Categories Data
  const LIFE_CATEGORIES = {
    home_inventory: {
      name: 'Home Inventory',
      icon: Home,
      color: 'blue',
      subcategories: [
        { name: 'Electronics', icon: Laptop, items: 23, value: 12450 },
        { name: 'Furniture', icon: Box, items: 45, value: 8900 },
        { name: 'Tools & Hardware', icon: Hammer, items: 67, value: 3200 },
        { name: 'Kitchen & Dining', icon: Utensils, items: 89, value: 2100 },
        { name: 'Clothing & Accessories', icon: Package2, items: 156, value: 4500 },
        { name: 'Books & Media', icon: BookOpen, items: 234, value: 1800 }
      ]
    },
    smart_home: {
      name: 'Smart Home',
      icon: Zap,
      color: 'yellow',
      subcategories: [
        { name: 'Security Systems', icon: Shield, items: 12, value: 2400 },
        { name: 'Climate Control', icon: Thermometer, items: 8, value: 1800 },
        { name: 'Lighting', icon: Lightbulb, items: 24, value: 900 },
        { name: 'Entertainment', icon: Tv, items: 15, value: 5600 },
        { name: 'Network & Connectivity', icon: Wifi, items: 18, value: 1200 }
      ]
    },
    health_wellness: {
      name: 'Health & Wellness',
      icon: Heart,
      color: 'red',
      subcategories: [
        { name: 'Medical Records', icon: Pill, items: 45, value: 0 },
        { name: 'Fitness & Exercise', icon: Activity, items: 12, value: 2100 },
        { name: 'Nutrition & Diet', icon: Utensils, items: 28, value: 450 },
        { name: 'Mental Health', icon: Brain, items: 8, value: 0 },
        { name: 'Personal Care', icon: Scissors, items: 34, value: 890 }
      ]
    },
    finances: {
      name: 'Financial Management',
      icon: DollarSign,
      color: 'green',
      subcategories: [
        { name: 'Banking & Accounts', icon: CreditCard, items: 8, value: 125000 },
        { name: 'Investments', icon: BarChart3, items: 15, value: 89000 },
        { name: 'Budgeting', icon: Calculator, items: 12, value: 0 },
        { name: 'Insurance', icon: Shield, items: 6, value: 0 },
        { name: 'Taxes & Records', icon: Receipt, items: 156, value: 0 }
      ]
    },
    family_life: {
      name: 'Family & Relationships',
      icon: Users,
      color: 'purple',
      subcategories: [
        { name: 'Family Members', icon: Users, items: 4, value: 0 },
        { name: 'Childcare', icon: Baby, items: 23, value: 1200 },
        { name: 'Pets', icon: Dog, items: 12, value: 800 },
        { name: 'Social Events', icon: Calendar, items: 34, value: 0 },
        { name: 'Gifts & Occasions', icon: Gift, items: 45, value: 2100 }
      ]
    }
  };

  // Sample inventory items
  const SAMPLE_ITEMS = [
    { id: 1, name: 'MacBook Pro 16" M2', category: 'Electronics', location: 'Home Office', value: 2499, condition: 'Excellent', purchaseDate: '2023-09-15', warranty: '2025-09-15', image: '📱' },
    { id: 2, name: 'KitchenAid Stand Mixer', category: 'Kitchen', location: 'Kitchen Counter', value: 379, condition: 'Very Good', purchaseDate: '2022-11-20', warranty: '2025-11-20', image: '🍽️' },
    { id: 3, name: 'Samsung 65" QLED TV', category: 'Electronics', location: 'Living Room', value: 1299, condition: 'Excellent', purchaseDate: '2023-03-10', warranty: '2026-03-10', image: '📺' },
    { id: 4, name: 'DeWalt 20V Drill Set', category: 'Tools', location: 'Garage Workbench', value: 189, condition: 'Good', purchaseDate: '2023-01-15', warranty: '2026-01-15', image: '🔧' },
    { id: 5, name: 'Herman Miller Aeron Chair', category: 'Furniture', location: 'Home Office', value: 1395, condition: 'Excellent', purchaseDate: '2022-08-05', warranty: '2034-08-05', image: '🪑' },
    { id: 6, name: 'Dyson V15 Vacuum', category: 'Appliances', location: 'Utility Closet', value: 749, condition: 'Very Good', purchaseDate: '2023-05-22', warranty: '2025-05-22', image: '🧹' }
  ];

  // Sample tasks and alerts
  const ALERTS = [
    { id: 1, type: 'warning', title: 'MacBook Pro Warranty Expires Soon', message: 'Warranty expires in 45 days', date: '2025-07-30', priority: 'high' },
    { id: 2, type: 'info', title: 'Home Insurance Renewal', message: 'Policy renewal due next month', date: '2025-08-15', priority: 'medium' },
    { id: 3, type: 'success', title: 'Smart Thermostat Optimization', message: 'Saved $23 last month through automation', date: '2025-07-10', priority: 'low' },
    { id: 4, type: 'warning', title: 'Car Service Due', message: 'Toyota Camry needs oil change', date: '2025-07-25', priority: 'medium' }
  ];

  const PROJECTS = [
    { id: 1, name: 'Smart Home Security Upgrade', progress: 75, dueDate: '2025-08-30', category: 'Smart Home', priority: 'high' },
    { id: 2, name: 'Kitchen Renovation Planning', progress: 35, dueDate: '2025-10-15', category: 'Home Improvement', priority: 'medium' },
    { id: 3, name: 'Financial Portfolio Review', progress: 60, dueDate: '2025-08-05', category: 'Finance', priority: 'high' },
    { id: 4, name: 'Garden Landscaping Project', progress: 20, dueDate: '2025-09-20', category: 'Outdoor', priority: 'low' }
  ];

  // Calculate total values
  const totalInventoryValue = SAMPLE_ITEMS.reduce((sum, item) => sum + item.value, 0);
  const totalItems = SAMPLE_ITEMS.length;

  // Sidebar Component
  const Sidebar = () => (
    <div className={`${sidebarCollapsed ? 'w-16' : 'w-80'} border-r bg-slate-50 overflow-y-auto transition-all duration-300 flex flex-col`}>
      <div className="p-4 border-b bg-white">
        <div className="flex items-center justify-between">
          <div className={`flex items-center gap-3 ${sidebarCollapsed ? 'hidden' : ''}`}>
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <Home className="h-5 w-5 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-900">LifeHub</h2>
              <p className="text-xs text-gray-500">Life Management Studio</p>
            </div>
          </div>
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
          >
            {sidebarCollapsed ? <Maximize2 className="h-4 w-4" /> : <Minimize2 className="h-4 w-4" />}
          </Button>
        </div>
      </div>

      {!sidebarCollapsed && (
        <div className="p-4 space-y-4 flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input 
              placeholder="Search everything..." 
              className="pl-10 bg-white"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            {Object.entries(LIFE_CATEGORIES).map(([key, category]) => {
              const IconComponent = category.icon;
              const isSelected = selectedCategory === key;
              const totalValue = category.subcategories.reduce((sum, sub) => sum + sub.value, 0);
              const totalItems = category.subcategories.reduce((sum, sub) => sum + sub.items, 0);
              
              return (
                <div key={key} className="space-y-1">
                  <button
                    className={`w-full text-left p-3 rounded-lg transition-all ${
                      isSelected ? 'bg-blue-100 text-blue-900' : 'hover:bg-white hover:shadow-sm'
                    }`}
                    onClick={() => setSelectedCategory(isSelected ? null : key)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg ${isSelected ? 'bg-blue-200' : 'bg-white'}`}>
                          <IconComponent className={`h-5 w-5 ${isSelected ? 'text-blue-700' : `text-${category.color}-600`}`} />
                        </div>
                        <div>
                          <p className="font-medium text-sm">{category.name}</p>
                          <p className="text-xs text-gray-500">{totalItems} items • ${totalValue.toLocaleString()}</p>
                        </div>
                      </div>
                      {isSelected ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                    </div>
                  </button>
                  
                  {isSelected && (
                    <div className="ml-6 space-y-1 bg-white rounded-lg p-2 shadow-sm">
                      {category.subcategories.map(subcat => {
                        const SubIconComponent = subcat.icon;
                        return (
                          <button
                            key={subcat.name}
                            className="w-full text-left p-2 rounded hover:bg-blue-50 transition-colors"
                            onClick={() => setCurrentView(`${key}_${subcat.name.toLowerCase().replace(/\s+/g, '_')}`)}
                          >
                            <div className="flex items-center gap-3">
                              <SubIconComponent className="h-4 w-4 text-gray-600" />
                              <div className="flex-1">
                                <p className="text-sm font-medium text-gray-900">{subcat.name}</p>
                                <p className="text-xs text-gray-500">{subcat.items} items • ${subcat.value.toLocaleString()}</p>
                              </div>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );

  // Dashboard View
  const DashboardView = () => (
    <div className="p-6 space-y-6 bg-gray-50 min-h-full">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Life Management Dashboard</h1>
          <p className="text-gray-600 mt-1">Welcome back! Here's your comprehensive life overview</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" size="sm">
            <Bell className="h-4 w-4 mr-2" />
            Alerts ({ALERTS.length})
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button className="bg-blue-600">
            <Plus className="h-4 w-4 mr-2" />
            Quick Add
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm">Total Inventory Value</p>
                <p className="text-3xl font-bold">${totalInventoryValue.toLocaleString()}</p>
                <p className="text-blue-100 text-xs mt-1">↑ 12% from last month</p>
              </div>
              <DollarSign className="h-10 w-10 text-blue-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 text-sm">Total Items Tracked</p>
                <p className="text-3xl font-bold">2,847</p>
                <p className="text-green-100 text-xs mt-1">+23 this week</p>
              </div>
              <Box className="h-10 w-10 text-green-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100 text-sm">Active Projects</p>
                <p className="text-3xl font-bold">{PROJECTS.length}</p>
                <p className="text-purple-100 text-xs mt-1">2 due this month</p>
              </div>
              <Target className="h-10 w-10 text-purple-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-500 to-orange-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-100 text-sm">Smart Automations</p>
                <p className="text-3xl font-bold">47</p>
                <p className="text-orange-100 text-xs mt-1">Running smoothly</p>
              </div>
              <Zap className="h-10 w-10 text-orange-200" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-12 gap-6">
        {/* Recent Alerts */}
        <div className="col-span-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-orange-500" />
                Priority Alerts & Reminders
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {ALERTS.map(alert => (
                  <div key={alert.id} className={`p-4 rounded-lg border-l-4 ${
                    alert.type === 'warning' ? 'border-yellow-400 bg-yellow-50' :
                    alert.type === 'info' ? 'border-blue-400 bg-blue-50' :
                    'border-green-400 bg-green-50'
                  }`}>
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <p className={`font-medium text-sm ${
                          alert.type === 'warning' ? 'text-yellow-900' :
                          alert.type === 'info' ? 'text-blue-900' :
                          'text-green-900'
                        }`}>
                          {alert.title}
                        </p>
                        <p className={`text-xs mt-1 ${
                          alert.type === 'warning' ? 'text-yellow-700' :
                          alert.type === 'info' ? 'text-blue-700' :
                          'text-green-700'
                        }`}>
                          {alert.message}
                        </p>
                        <p className="text-xs text-gray-500 mt-2">{alert.date}</p>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">Action</Button>
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="col-span-4 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lightbulb className="h-5 w-5 text-yellow-500" />
                Smart Suggestions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="p-3 bg-blue-50 rounded-lg">
                  <p className="text-sm font-medium text-blue-900">Insurance Optimization</p>
                  <p className="text-xs text-blue-700 mt-1">Review homeowner's policy - potential $180/year savings</p>
                  <Button variant="outline" size="sm" className="mt-2 w-full text-xs">
                    Review Now
                  </Button>
                </div>
                <div className="p-3 bg-green-50 rounded-lg">
                  <p className="text-sm font-medium text-green-900">Energy Savings</p>
                  <p className="text-xs text-green-700 mt-1">Smart thermostat saved $23 last month</p>
                  <Button variant="outline" size="sm" className="mt-2 w-full text-xs">
                    View Report
                  </Button>
                </div>
                <div className="p-3 bg-purple-50 rounded-lg">
                  <p className="text-sm font-medium text-purple-900">Maintenance Due</p>
                  <p className="text-xs text-purple-700 mt-1">3 items need scheduled maintenance</p>
                  <Button variant="outline" size="sm" className="mt-2 w-full text-xs">
                    Schedule
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5 text-blue-500" />
                Active Projects
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {PROJECTS.slice(0, 3).map(project => (
                  <div key={project.id} className="p-3 border rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <p className="text-sm font-medium text-gray-900">{project.name}</p>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        project.priority === 'high' ? 'bg-red-100 text-red-700' :
                        project.priority === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-green-100 text-green-700'
                      }`}>
                        {project.priority}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full" 
                        style={{ width: `${project.progress}%` }}
                      ></div>
                    </div>
                    <p className="text-xs text-gray-500">Due: {project.dueDate}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Category Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Category Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-5 gap-6">
            {Object.entries(LIFE_CATEGORIES).map(([key, category]) => {
              const IconComponent = category.icon;
              const totalValue = category.subcategories.reduce((sum, sub) => sum + sub.value, 0);
              const totalItems = category.subcategories.reduce((sum, sub) => sum + sub.items, 0);
              
              return (
                <button
                  key={key}
                  className="flex flex-col items-center gap-3 p-6 rounded-lg hover:bg-gray-50 transition-colors group"
                  onClick={() => {
                    setSelectedCategory(key);
                    setCurrentView(key);
                  }}
                >
                  <div className={`p-4 bg-${category.color}-100 rounded-lg group-hover:bg-${category.color}-200 transition-colors`}>
                    <IconComponent className={`h-8 w-8 text-${category.color}-600`} />
                  </div>
                  <div className="text-center">
                    <p className="font-medium text-sm text-gray-900">{category.name}</p>
                    <p className="text-xs text-gray-500 mt-1">{totalItems} items</p>
                    <p className="text-xs font-semibold text-gray-700">${totalValue.toLocaleString()}</p>
                  </div>
                </button>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  // Inventory View
  const InventoryView = () => (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900">Inventory Management</h2>
          <p className="text-gray-600">Comprehensive tracking of all your belongings</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" size="sm">
            <QrCode className="h-4 w-4 mr-2" />
            Scan Item
          </Button>
          <Button variant="outline" size="sm">
            <Camera className="h-4 w-4 mr-2" />
            Take Photo
          </Button>
          <Button className="bg-blue-600">
            <Plus className="h-4 w-4 mr-2" />
            Add Item
          </Button>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="flex gap-4 items-center">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input placeholder="Search inventory..." className="pl-10" />
          </div>
        </div>
        <Button variant="outline" size="sm">
          <Filter className="h-4 w-4 mr-2" />
          Filter
        </Button>
        <Button variant="outline" size="sm">
          <SortAsc className="h-4 w-4 mr-2" />
          Sort
        </Button>
      </div>

      {/* Inventory Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {SAMPLE_ITEMS.map(item => (
          <Card 
            key={item.id} 
            className="hover:shadow-lg transition-shadow cursor-pointer"
            onClick={() => setSelectedItem(item)}
          >
            <CardContent className="p-4">
              <div className="space-y-4">
                <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center text-4xl">
                  {item.image}
                </div>
                
                <div>
                  <h3 className="font-semibold text-sm text-gray-900">{item.name}</h3>
                  <p className="text-xs text-gray-600 mt-1">{item.category}</p>
                </div>
                
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Location:</span>
                    <span className="font-medium">{item.location}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Value:</span>
                    <span className="font-semibold text-green-600">${item.value.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Condition:</span>
                    <span className={`font-medium ${
                      item.condition === 'Excellent' ? 'text-green-600' :
                      item.condition === 'Very Good' ? 'text-blue-600' :
                      item.condition === 'Good' ? 'text-yellow-600' : 'text-red-600'
                    }`}>
                      {item.condition}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Warranty:</span>
                    <span className="font-medium">{item.warranty}</span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1 text-xs">
                    <Edit className="h-3 w-3 mr-1" />
                    Edit
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1 text-xs">
                    <QrCode className="h-3 w-3 mr-1" />
                    QR
                  </Button>
                  <Button variant="outline" size="sm" className="text-xs px-2">
                    <ExternalLink className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  // Top Navigation
  const TopNavigation = () => (
    <div className="h-14 bg-slate-800 text-white px-6 flex items-center justify-between">
      <div className="flex items-center gap-6">
        <Button 
          variant="ghost" 
          className={`text-white hover:bg-slate-700 ${currentView === 'dashboard' ? 'border-b-2 border-blue-400' : ''}`}
          onClick={() => setCurrentView('dashboard')}
        >
          <LayoutGrid className="h-4 w-4 mr-2" />
          Dashboard
        </Button>
        <Button 
          variant="ghost" 
          className={`text-white hover:bg-slate-700 ${currentView === 'inventory' ? 'border-b-2 border-blue-400' : ''}`}
          onClick={() => setCurrentView('inventory')}
        >
          <Box className="h-4 w-4 mr-2" />
          Inventory
        </Button>
        <Button 
          variant="ghost" 
          className={`text-white hover:bg-slate-700 ${currentView === 'projects' ? 'border-b-2 border-blue-400' : ''}`}
          onClick={() => setCurrentView('projects')}
        >
          <Target className="h-4 w-4 mr-2" />
          Projects
        </Button>
        <Button 
          variant="ghost" 
          className={`text-white hover:bg-slate-700 ${currentView === 'automation' ? 'border-b-2 border-blue-400' : ''}`}
          onClick={() => setCurrentView('automation')}
        >
          <Zap className="h-4 w-4 mr-2" />
          Automation
        </Button>
        <Button 
          variant="ghost" 
          className={`text-white hover:bg-slate-700 ${currentView === 'analytics' ? 'border-b-2 border-blue-400' : ''}`}
          onClick={() => setCurrentView('analytics')}
        >
          <BarChart3 className="h-4 w-4 mr-2" />
          Analytics
        </Button>
      </div>

      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" className="text-white">
          <RefreshCw className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="sm" className="text-white">
          <Settings className="h-4 w-4" />
        </Button>
        <div className="w-px h-6 bg-slate-600" />
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-sm font-semibold">
            JD
          </div>
          <span className="text-sm">John Doe</span>
        </div>
      </div>
    </div>
  );

  // Render current view
  const renderView = () => {
    switch (currentView) {
      case 'dashboard': return <DashboardView />;
      case 'inventory': return <InventoryView />;
      case 'projects': return <div className="p-6"><h2 className="text-2xl font-semibold">Project Management</h2><p className="text-gray-600">Coming soon...</p></div>;
      case 'automation': return <div className="p-6"><h2 className="text-2xl font-semibold">Smart Home Automation</h2><p className="text-gray-600">Coming soon...</p></div>;
      case 'analytics': return <div className="p-6"><h2 className="text-2xl font-semibold">Analytics & Reports</h2><p className="text-gray-600">Coming soon...</p></div>;
      default: return <DashboardView />;
    }
  };

  return (
    <div className="h-screen flex flex-col bg-white">
      {/* Header */}
      <div className="h-16 bg-white border-b px-6 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <Home className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">LifeHub Pro</h1>
              <p className="text-xs text-gray-500">Personal Life Management Studio</p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm">
              <History className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <Database className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <Settings className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="w-px h-6 bg-gray-300" />
          
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Share className="h-4 w-4 mr-2" />
              Share
            </Button>
            <Button size="sm" className="bg-blue-600">
              <Save className="h-4 w-4 mr-2" />
              Save
            </Button>
          </div>
        </div>
      </div>

      <TopNavigation />

      <div className="flex-1 overflow-hidden flex">
        <Sidebar />
        <div className="flex-1 overflow-y-auto">
          {renderView()}
        </div>
      </div>

      {/* Item Detail Modal */}
      {selectedItem && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full p-6">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-semibold">{selectedItem.name}</h3>
              <Button variant="ghost" size="sm" onClick={() => setSelectedItem(null)}>
                ✕
              </Button>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center text-6xl">
                {selectedItem.image}
              </div>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-600">Category</label>
                  <p className="text-lg">{selectedItem.category}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Location</label>
                  <p className="text-lg">{selectedItem.location}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Value</label>
                  <p className="text-lg font-semibold text-green-600">${selectedItem.value.toLocaleString()}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Condition</label>
                  <p className="text-lg">{selectedItem.condition}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Purchase Date</label>
                  <p className="text-lg">{selectedItem.purchaseDate}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Warranty Until</label>
                  <p className="text-lg">{selectedItem.warranty}</p>
                </div>
                <div className="flex gap-2 pt-4">
                  <Button className="flex-1">Edit Item</Button>
                  <Button variant="outline">Generate QR</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LifeHubWireframe;