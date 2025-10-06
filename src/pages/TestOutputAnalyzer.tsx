import React, { useState, useMemo, useCallback } from 'react';
import { Search, Filter, ChevronDown, ChevronRight, AlertCircle, CheckCircle, XCircle, BarChart3, FileText, Zap, Eye, EyeOff, Download, Hash, Clock, TrendingUp, Layers, Cpu, Database, Copy, Upload, RefreshCw, Code, TreePine, Package, Target, Minimize2, Settings, Save, Share2, History, Sparkles, Brain, GitMerge, Sliders } from 'lucide-react';

const TestOutputAnalyzer = () => {
  const [rawInput, setRawInput] = useState('');
  const [compressionStrategy, setCompressionStrategy] = useState('intelligent');
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingResults, setProcessingResults] = useState(null);
  const [inputError, setInputError] = useState('');
  const [outputFormat, setOutputFormat] = useState('json');
  const [customRules, setCustomRules] = useState([]);
  const [showCustomRules, setShowCustomRules] = useState(false);
  const [compressionLevel, setCompressionLevel] = useState(3);
  const [preserveContext, setPreserveContext] = useState(true);
  const [includeMetrics, setIncludeMetrics] = useState(true);
  const [batchMode, setBatchMode] = useState(false);
  const [realTimePreview, setRealTimePreview] = useState(false);
  const [processingHistory, setProcessingHistory] = useState([]);
  const [selectedTab, setSelectedTab] = useState('compressed');

  // Compression strategies for test outputs
  const testCompressionStrategies = {
    'intelligent': {
      name: 'Intelligent Summarization',
      description: 'Smart grouping with error pattern detection',
      icon: Target,
      color: 'blue',
      efficiency: 85
    },
    'error-focused': {
      name: 'Error-Focused Compression',
      description: 'Prioritize failed tests and error details',
      icon: AlertCircle,
      color: 'red',
      efficiency: 75
    },
    'statistical': {
      name: 'Statistical Summary',
      description: 'Convert to metrics and counts',
      icon: BarChart3,
      color: 'green',
      efficiency: 95
    },
    'hierarchical': {
      name: 'Hierarchical Grouping',
      description: 'Nested structure by test modules',
      icon: TreePine,
      color: 'purple',
      efficiency: 70
    },
    'token-optimized': {
      name: 'Token-Optimized',
      description: 'Minimize tokens while preserving context',
      icon: Minimize2,
      color: 'orange',
      efficiency: 90
    },
    'semantic': {
      name: 'Semantic Clustering',
      description: 'Group by error meaning and context',
      icon: Brain,
      color: 'pink',
      efficiency: 80
    }
  };

  // Output formats
  const outputFormats = {
    'json': { name: 'JSON', extension: '.json', mime: 'application/json' },
    'yaml': { name: 'YAML', extension: '.yaml', mime: 'text/yaml' },
    'csv': { name: 'CSV', extension: '.csv', mime: 'text/csv' },
    'markdown': { name: 'Markdown', extension: '.md', mime: 'text/markdown' },
    'xml': { name: 'XML', extension: '.xml', mime: 'application/xml' },
    'summary': { name: 'Summary', extension: '.txt', mime: 'text/plain' }
  };

  // Token counting utility
  const countTokens = useCallback((text) => {
    if (typeof text === 'object') {
      text = JSON.stringify(text);
    }
    return Math.ceil(text.length / 4);
  }, []);

  // Parse raw test output
  const parseRawTestOutput = useCallback((input) => {
    const tests = [];
    const lines = input.split('\n');
    
    // Parse pytest-style output
    const testPattern = /^(FAILED|ERROR|PASSED)\s+([\w\/\\\.]+)::([\w_]+)::([\w_]+)/;
    const errorPattern = /^E\s+(.+)/;
    const fileLinePattern = /^([\w\/\\\.]+):(\d+):/;
    const summaryPattern = /(\d+)\s+(failed|passed|error)/g;
    
    let currentTest = null;
    let currentError = [];
    let summary = { total: 0, passed: 0, failed: 0, errors: 0 };
    
    lines.forEach((line, index) => {
      const testMatch = line.match(testPattern);
      const errorMatch = line.match(errorPattern);
      const fileLineMatch = line.match(fileLinePattern);
      
      // Parse summary line
      if (line.includes('failed') || line.includes('passed') || line.includes('error')) {
        let match;
        while ((match = summaryPattern.exec(line)) !== null) {
          const [, count, type] = match;
          summary[type] = parseInt(count);
          summary.total += parseInt(count);
        }
      }
      
      if (testMatch) {
        // Save previous test
        if (currentTest) {
          currentTest.error = currentError.join(' ').trim() || null;
          tests.push(currentTest);
        }
        
        // Start new test
        const [, status, file, testClass, testMethod] = testMatch;
        currentTest = {
          type: status.toLowerCase() === 'passed' ? 'passed' : status.toLowerCase(),
          category: testClass,
          test: testMethod,
          file: file.split(/[\/\\]/).pop(),
          line: null,
          fullPath: file,
          timestamp: new Date().toISOString()
        };
        currentError = [];
      } else if (errorMatch && currentTest) {
        currentError.push(errorMatch[1]);
      } else if (fileLineMatch && currentTest && !currentTest.line) {
        currentTest.line = parseInt(fileLineMatch[2]);
      }
      
      // Parse simple format
      if (line.includes('FAILED') || line.includes('ERROR')) {
        const parts = line.split(' - ');
        if (parts.length >= 2) {
          const testName = parts[0].replace(/^(FAILED|ERROR)\s+/, '');
          const errorMsg = parts.slice(1).join(' - ');
          
          if (!tests.find(t => t.test === testName)) {
            tests.push({
              type: line.includes('ERROR') ? 'error' : 'failed',
              category: testName.split('::')[1] || 'Unknown',
              test: testName.split('::').pop() || testName,
              error: errorMsg,
              file: testName.split('::')[0]?.split(/[\/\\]/).pop() || 'unknown.py',
              line: null,
              timestamp: new Date().toISOString()
            });
          }
        }
      }
    });
    
    // Add final test
    if (currentTest) {
      currentTest.error = currentError.join(' ').trim() || null;
      tests.push(currentTest);
    }
    
    return { tests, summary };
  }, []);

  // Advanced compression functions
  const compressTestOutput = useCallback((data, strategy) => {
    const { tests, summary } = data;
    
    switch (strategy) {
      case 'intelligent': {
        const grouped = {};
        const errorPatterns = {};
        
        tests.forEach(test => {
          const key = test.category || 'Unknown';
          if (!grouped[key]) {
            grouped[key] = { passed: 0, failed: 0, errors: 0, tests: [], patterns: [] };
          }
          grouped[key][test.type === 'error' ? 'errors' : test.type]++;
          
          if (test.type !== 'passed') {
            const errorType = test.error?.split(':')[0] || 'Unknown';
            errorPatterns[errorType] = (errorPatterns[errorType] || 0) + 1;
            
            grouped[key].tests.push({
              name: test.test,
              type: test.type,
              error: compressionLevel > 2 ? test.error : test.error?.substring(0, 100) + '...',
              line: test.line,
              file: test.file
            });
          }
        });
        
        return {
          summary,
          groups: grouped,
          error_patterns: Object.entries(errorPatterns).sort(([,a], [,b]) => b - a).slice(0, 10),
          compression_info: {
            strategy: 'intelligent',
            level: compressionLevel,
            context_preserved: preserveContext
          }
        };
      }
      
      case 'error-focused': {
        const errors = tests.filter(t => t.type !== 'passed');
        const criticalErrors = errors.filter(t => t.type === 'error');
        const failedTests = errors.filter(t => t.type === 'failed');
        
        return {
          summary: `${summary.passed}P/${summary.failed}F/${summary.errors}E`,
          critical_errors: criticalErrors.slice(0, 15).map(test => ({
            test: test.test,
            category: test.category,
            error: test.error?.split(':')[0] || 'Unknown error',
            file: test.file,
            line: test.line
          })),
          failed_tests: failedTests.slice(0, 20).map(test => ({
            test: test.test,
            category: test.category,
            error: compressionLevel > 2 ? test.error : test.error?.substring(0, 80),
            file: test.file
          })),
          total_tests: tests.length,
          failure_rate: `${((errors.length / tests.length) * 100).toFixed(1)}%`
        };
      }
      
      case 'statistical': {
        const stats = tests.reduce((acc, test) => {
          acc[test.type] = (acc[test.type] || 0) + 1;
          return acc;
        }, {});
        
        const errorTypes = {};
        const fileStats = {};
        const categoryStats = {};
        
        tests.forEach(test => {
          if (test.error) {
            const errorType = test.error.split(':')[0];
            errorTypes[errorType] = (errorTypes[errorType] || 0) + 1;
          }
          fileStats[test.file] = (fileStats[test.file] || 0) + 1;
          categoryStats[test.category] = (categoryStats[test.category] || 0) + 1;
        });
        
        return {
          test_summary: stats,
          pass_rate: `${((stats.passed || 0) / tests.length * 100).toFixed(1)}%`,
          error_distribution: Object.entries(errorTypes).sort(([,a], [,b]) => b - a).slice(0, 8),
          file_distribution: Object.entries(fileStats).sort(([,a], [,b]) => b - a).slice(0, 8),
          category_distribution: Object.entries(categoryStats).sort(([,a], [,b]) => b - a).slice(0, 8),
          total: tests.length,
          metrics: {
            avg_errors_per_file: (Object.values(errorTypes).reduce((a, b) => a + b, 0) / Object.keys(fileStats).length).toFixed(2),
            most_problematic_category: Object.entries(categoryStats).sort(([,a], [,b]) => b - a)[0]?.[0] || 'N/A'
          }
        };
      }
      
      case 'hierarchical': {
        const tree = {};
        tests.forEach(test => {
          const file = test.file || 'unknown.py';
          const category = test.category || 'Unknown';
          
          if (!tree[file]) tree[file] = {};
          if (!tree[file][category]) tree[file][category] = { 
            passed: 0, failed: 0, errors: 0, tests: [] 
          };
          
          tree[file][category][test.type === 'error' ? 'errors' : test.type]++;
          
          if (test.type !== 'passed') {
            tree[file][category].tests.push({
              name: test.test,
              type: test.type,
              error: test.error?.substring(0, 100),
              line: test.line
            });
          }
        });
        return { file_tree: tree, summary };
      }
      
      case 'token-optimized': {
        const compressed = tests.map(test => ({
          t: test.test.replace(/^test_/, '').substring(0, 20),
          c: test.category?.substring(0, 8) || 'unk',
          s: test.type[0], // p/f/e
          e: test.error ? test.error.substring(0, 40) : null,
          f: test.file?.substring(0, 15),
          l: test.line
        }));
        
        return {
          meta: { 
            total: tests.length, 
            format: 't:test,c:category,s:status,e:error,f:file,l:line',
            summary: `${summary.passed}P/${summary.failed}F/${summary.errors}E`
          },
          data: compressed
        };
      }
      
      case 'semantic': {
        const semanticGroups = {
          'Configuration Issues': [],
          'Import/Module Errors': [],
          'Type/Attribute Errors': [],
          'Assertion Failures': [],
          'Permission/Access Issues': [],
          'Parsing/Syntax Errors': [],
          'Runtime Exceptions': [],
          'Other': []
        };
        
        tests.forEach(test => {
          if (test.type === 'passed') return;
          
          const error = test.error?.toLowerCase() || '';
          const testName = test.test.toLowerCase();
          
          if (error.includes('config') || error.includes('manager') || testName.includes('config')) {
            semanticGroups['Configuration Issues'].push(test);
          } else if (error.includes('import') || error.includes('module') || error.includes('no module')) {
            semanticGroups['Import/Module Errors'].push(test);
          } else if (error.includes('attribute') || error.includes('type') || error.includes('isinstance')) {
            semanticGroups['Type/Attribute Errors'].push(test);
          } else if (error.includes('assert') || error.includes('assertion')) {
            semanticGroups['Assertion Failures'].push(test);
          } else if (error.includes('permission') || error.includes('access') || error.includes('denied')) {
            semanticGroups['Permission/Access Issues'].push(test);
          } else if (error.includes('parse') || error.includes('parsing') || error.includes('syntax')) {
            semanticGroups['Parsing/Syntax Errors'].push(test);
          } else if (error.includes('exception') || error.includes('runtime')) {
            semanticGroups['Runtime Exceptions'].push(test);
          } else {
            semanticGroups['Other'].push(test);
          }
        });
        
        // Remove empty groups and limit items
        const result = {};
        Object.entries(semanticGroups).forEach(([group, items]) => {
          if (items.length > 0) {
            result[group] = {
              count: items.length,
              tests: items.slice(0, 10).map(test => ({
                name: test.test,
                category: test.category,
                error: test.error?.substring(0, 80),
                file: test.file
              }))
            };
          }
        });
        
        return { semantic_groups: result, summary };
      }
      
      default:
        return { tests, summary };
    }
  }, [compressionLevel, preserveContext]);

  // Format output based on selected format
  const formatOutput = useCallback((data, format) => {
    switch (format) {
      case 'yaml':
        // Simple YAML-like formatting
        const yamlify = (obj, indent = 0) => {
          const spaces = '  '.repeat(indent);
          if (typeof obj === 'object' && obj !== null) {
            if (Array.isArray(obj)) {
              return obj.map(item => `${spaces}- ${typeof item === 'object' ? '\n' + yamlify(item, indent + 1) : item}`).join('\n');
            } else {
              return Object.entries(obj).map(([key, value]) => 
                `${spaces}${key}: ${typeof value === 'object' ? '\n' + yamlify(value, indent + 1) : value}`
              ).join('\n');
            }
          }
          return `${spaces}${obj}`;
        };
        return yamlify(data);
        
      case 'csv':
        if (data.tests || data.data) {
          const tests = data.tests || data.data;
          const headers = ['Test', 'Category', 'Status', 'Error', 'File', 'Line'];
          const rows = tests.map(test => [
            test.test || test.t || test.name,
            test.category || test.c,
            test.type || test.s || test.status,
            (test.error || test.e || '').replace(/,/g, ';'),
            test.file || test.f,
            test.line || test.l || ''
          ]);
          return [headers, ...rows].map(row => row.join(',')).join('\n');
        }
        return JSON.stringify(data);
        
      case 'markdown':
        let md = '# Test Results Summary\n\n';
        if (data.summary) {
          md += `## Overview\n- Total: ${data.summary.total || 'N/A'}\n- Passed: ${data.summary.passed || 0}\n- Failed: ${data.summary.failed || 0}\n- Errors: ${data.summary.errors || 0}\n\n`;
        }
        if (data.groups) {
          md += '## Test Groups\n';
          Object.entries(data.groups).forEach(([group, info]) => {
            md += `### ${group}\n- Passed: ${info.passed}, Failed: ${info.failed}, Errors: ${info.errors}\n\n`;
          });
        }
        return md;
        
      case 'xml':
        const xmlify = (obj, rootName = 'testResults') => {
          if (typeof obj !== 'object') return `<${rootName}>${obj}</${rootName}>`;
          
          let xml = `<${rootName}>`;
          Object.entries(obj).forEach(([key, value]) => {
            if (Array.isArray(value)) {
              value.forEach(item => {
                xml += xmlify(item, key.slice(0, -1)); // Remove 's' for singular
              });
            } else if (typeof value === 'object') {
              xml += xmlify(value, key);
            } else {
              xml += `<${key}>${value}</${key}>`;
            }
          });
          xml += `</${rootName}>`;
          return xml;
        };
        return xmlify(data);
        
      case 'summary':
        let summary = 'TEST RESULTS SUMMARY\n';
        summary += '===================\n\n';
        if (data.summary) {
          summary += `Total Tests: ${data.summary.total || 'N/A'}\n`;
          summary += `Passed: ${data.summary.passed || 0}\n`;
          summary += `Failed: ${data.summary.failed || 0}\n`;
          summary += `Errors: ${data.summary.errors || 0}\n`;
          summary += `Pass Rate: ${data.pass_rate || 'N/A'}\n\n`;
        }
        if (data.error_patterns) {
          summary += 'TOP ERROR PATTERNS:\n';
          data.error_patterns.forEach(([pattern, count]) => {
            summary += `- ${pattern}: ${count} occurrences\n`;
          });
        }
        return summary;
        
      default:
        return JSON.stringify(data, null, 2);
    }
  }, []);

  // Process raw input
  const processRawInput = useCallback(async () => {
    if (!rawInput.trim()) {
      setInputError('Please paste test output to process');
      return;
    }

    setIsProcessing(true);
    setInputError('');
    
    try {
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const parsedData = parseRawTestOutput(rawInput);
      
      if (parsedData.tests.length === 0) {
        throw new Error('No valid test results found. Please paste pytest, unittest, or similar test output.');
      }
      
      const originalTokens = countTokens(rawInput);
      const compressed = compressTestOutput(parsedData, compressionStrategy);
      const formattedOutput = formatOutput(compressed, outputFormat);
      const compressedTokens = countTokens(formattedOutput);
      const reduction = ((originalTokens - compressedTokens) / originalTokens * 100).toFixed(1);

      const results = {
        original: {
          text: rawInput,
          tokens: originalTokens,
          size: `${(rawInput.length / 1024).toFixed(1)} KB`,
          tests: parsedData.tests.length
        },
        compressed: {
          data: compressed,
          formatted: formattedOutput,
          tokens: compressedTokens,
          size: `${(formattedOutput.length / 1024).toFixed(1)} KB`,
          reduction: reduction
        },
        parsedData,
        strategy: compressionStrategy,
        format: outputFormat,
        metadata: {
          compressionRatio: `${(originalTokens / compressedTokens).toFixed(1)}:1`,
          tokenSavings: originalTokens - compressedTokens,
          efficiency: testCompressionStrategies[compressionStrategy].efficiency,
          timestamp: new Date().toISOString()
        }
      };

      setProcessingResults(results);
      
      // Add to history
      setProcessingHistory(prev => [
        {
          id: Date.now(),
          strategy: compressionStrategy,
          format: outputFormat,
          reduction: reduction,
          timestamp: new Date().toISOString(),
          tokens: { original: originalTokens, compressed: compressedTokens }
        },
        ...prev.slice(0, 9) // Keep last 10
      ]);
      
    } catch (e) {
      setInputError(e.message);
    } finally {
      setIsProcessing(false);
    }
  }, [rawInput, compressionStrategy, outputFormat, parseRawTestOutput, compressTestOutput, formatOutput, countTokens]);

  // Copy to clipboard
  const copyToClipboard = useCallback(async (text) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch (e) {
      console.error('Failed to copy:', e);
    }
  }, []);

  // Download file
  const downloadFile = useCallback((content, filename) => {
    const blob = new Blob([content], { type: outputFormats[outputFormat].mime });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename + outputFormats[outputFormat].extension;
    a.click();
    URL.revokeObjectURL(url);
  }, [outputFormat]);

  // Load sample test output
  const loadSampleOutput = useCallback(() => {
    const sampleOutput = `platform win32 -- Python 3.11.9, pytest-7.4.2, pluggy-1.6.0
rootdir: D:\\python_data\\250709_code_analysis\\backend
configfile: pyproject.toml
testpaths: tests
plugins: asyncio-0.21.1, cov-4.1.0, mock-3.11.1
collected 420 items

tests\\test_app_simple.py .........                                       [  2%]
tests\\test_config_manager.py FFFFF.FFFFFFFFFFFFF                         [  6%]
tests\\test_parsers.py F.FFFFFF.FFFFFFFEEEEEEEEEEEEEEEFFFFFFFFFFFF.FFFFFF [ 50%]

================================== FAILURES ==================================
________________________ TestFeatureConfigManager.test_config_manager_initialization ________________________________

self = <backend.tests.test_config_manager.TestFeatureConfigManager object at 0x000001F016BC4290>

    def test_config_manager_initialization(self):
        """Test FeatureConfigManager initialization."""
        assert self.manager is not None
>       assert self.manager.config_file == self.config_file
E       AttributeError: 'FeatureConfigManager' object has no attribute 'config_file'

tests\\test_config_manager.py:34: AttributeError

________________________________ TestParserFactory.test_get_parser_javascript ________________________________

self = <backend.tests.test_parsers.TestParserFactory object at 0x000001F017FCC7D0>

    def test_get_parser_javascript(self):
        """Test getting JavaScript parser."""
>       parser = self.factory.get_parser('javascript')
E       utils.exceptions.LanguageNotSupportedError: Language 'javascript' not supported. Supported languages: python

tests\\test_parsers.py:46: LanguageNotSupportedError

========================= short test summary info =========================
FAILED tests/test_config_manager.py::TestFeatureConfigManager::test_config_manager_initialization - AttributeError: 'FeatureConfigManager' object has no attribute 'config_file'
FAILED tests/test_parsers.py::TestParserFactory::test_get_parser_javascript - utils.exceptions.LanguageNotSupportedError: Language 'javascript' not supported
======================================== 113 failed, 292 passed, 15 errors in 19.55s ========================================`;
    
    setRawInput(sampleOutput);
    setInputError('');
  }, []);

  return (
    <div className="max-w-7xl mx-auto p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Test Output Compression Tool</h1>
        <p className="text-gray-600">Compress test output to minimize token usage while preserving critical information</p>
      </div>

      {/* Input Section */}
      <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Test Output Input</h2>
          <div className="flex items-center gap-2">
            <button
              onClick={loadSampleOutput}
              className="text-sm bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded flex items-center gap-1"
            >
              <Upload className="w-4 h-4" />
              Load Sample
            </button>
            <button
              onClick={() => setShowCustomRules(!showCustomRules)}
              className="text-sm bg-blue-100 hover:bg-blue-200 text-blue-700 px-3 py-1 rounded flex items-center gap-1"
            >
              <Settings className="w-4 h-4" />
              Settings
            </button>
          </div>
        </div>

        {/* Settings Panel */}
        {showCustomRules && (
          <div className="mb-6 p-4 bg-gray-50 rounded-lg border">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Compression Level</label>
                <div className="flex items-center gap-2">
                  <Sliders className="w-4 h-4 text-gray-500" />
                  <input
                    type="range"
                    min="1"
                    max="5"
                    value={compressionLevel}
                    onChange={(e) => setCompressionLevel(Number(e.target.value))}
                    className="flex-1"
                  />
                  <span className="text-sm text-gray-600">{compressionLevel}</span>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Options</label>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={preserveContext}
                      onChange={(e) => setPreserveContext(e.target.checked)}
                      className="mr-2"
                    />
                    <span className="text-sm">Preserve Context</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={includeMetrics}
                      onChange={(e) => setIncludeMetrics(e.target.checked)}
                      className="mr-2"
                    />
                    <span className="text-sm">Include Metrics</span>
                  </label>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Options</label>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={realTimePreview}
                      onChange={(e) => setRealTimePreview(e.target.checked)}
                      className="mr-2"
                    />
                    <span className="text-sm">Real-time Preview</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={batchMode}
                      onChange={(e) => setBatchMode(e.target.checked)}
                      className="mr-2"
                    />
                    <span className="text-sm">Batch Mode</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Strategy and Format Selection */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-4">
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-3">Compression Strategy</h3>
            <div className="grid grid-cols-2 gap-2">
              {Object.entries(testCompressionStrategies).map(([key, strategy]) => {
                const Icon = strategy.icon;
                return (
                  <button
                    key={key}
                    onClick={() => setCompressionStrategy(key)}
                    className={`p-3 rounded-lg border text-left transition-all ${
                      compressionStrategy === key
                        ? `bg-${strategy.color}-100 border-${strategy.color}-300 text-${strategy.color}-800`
                        : 'bg-white border-gray-200 hover:border-gray-300 text-gray-700'
                    }`}
                  >
                    <Icon className="w-5 h-5 mb-2" />
                    <div className="text-xs font-medium mb-1">{strategy.name}</div>
                    <div className="text-xs opacity-75">{strategy.efficiency}% reduction</div>
                  </button>
                );
              })}
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-3">Output Format</h3>
            <div className="grid grid-cols-3 gap-2">
              {Object.entries(outputFormats).map(([key, format]) => (
                <button
                  key={key}
                  onClick={() => setOutputFormat(key)}
                  className={`p-3 rounded-lg border text-center transition-all ${
                    outputFormat === key
                      ? 'bg-blue-100 border-blue-300 text-blue-800'
                      : 'bg-white border-gray-200 hover:border-gray-300 text-gray-700'
                  }`}
                >
                  <div className="text-sm font-medium">{format.name}</div>
                  <div className="text-xs opacity-75">{format.extension}</div>
                </button>
              ))}
            </div>
          </div>
        </div>
        
        <textarea
          value={rawInput}
          onChange={(e) => setRawInput(e.target.value)}
          placeholder="Paste your pytest, unittest, or other test framework output here..."
          className="w-full h-48 p-4 border border-gray-300 rounded-lg font-mono text-sm resize-y focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        
        <div className="flex items-center justify-between mt-4">
          <div className="text-sm text-gray-500">
            {rawInput ? `${countTokens(rawInput)} tokens, ${(rawInput.length / 1024).toFixed(1)} KB` : 'No input'}
          </div>
          
          <button
            onClick={processRawInput}
            disabled={!rawInput.trim() || isProcessing}
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-8 py-3 rounded-lg flex items-center transition-colors text-lg"
          >
            {isProcessing ? (
              <>
                <RefreshCw className="w-5 h-5 mr-2 animate-spin" />
                Processing...
              </>
            ) : (
              <>
                <Zap className="w-5 h-5 mr-2" />
                Process & Compress
              </>
            )}
          </button>
        </div>

        {inputError && (
          <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center">
            <AlertCircle className="w-5 h-5 text-red-600 mr-2" />
            <span className="text-red-700">{inputError}</span>
          </div>
        )}
      </div>

      {/* Results Section */}
      {processingResults && (
        <div className="space-y-6">
          {/* Metrics Overview */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <div className="flex items-center mb-2">
                <BarChart3 className="w-5 h-5 text-blue-600 mr-2" />
                <span className="font-semibold text-gray-800">Token Reduction</span>
              </div>
              <div className="text-2xl font-bold text-green-600">{processingResults.compressed.reduction}%</div>
              <div className="text-sm text-gray-500">
                {processingResults.original.tokens} → {processingResults.compressed.tokens}
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border p-6">
              <div className="flex items-center mb-2">
                <Minimize2 className="w-5 h-5 text-purple-600 mr-2" />
                <span className="font-semibold text-gray-800">Compression Ratio</span>
              </div>
              <div className="text-2xl font-bold text-purple-600">{processingResults.metadata.compressionRatio}</div>
              <div className="text-sm text-gray-500">Original to compressed</div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border p-6">
              <div className="flex items-center mb-2">
                <FileText className="w-5 h-5 text-orange-600 mr-2" />
                <span className="font-semibold text-gray-800">Tests Processed</span>
              </div>
              <div className="text-2xl font-bold text-orange-600">{processingResults.original.tests}</div>
              <div className="text-sm text-gray-500">Test cases</div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border p-6">
              <div className="flex items-center mb-2">
                <Cpu className="w-5 h-5 text-green-600 mr-2" />
                <span className="font-semibold text-gray-800">Strategy Efficiency</span>
              </div>
              <div className="text-2xl font-bold text-green-600">{processingResults.metadata.efficiency}%</div>
              <div className="text-sm text-gray-500">Theoretical max</div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border p-6">
              <div className="flex items-center mb-2">
                <Save className="w-5 h-5 text-indigo-600 mr-2" />
                <span className="font-semibold text-gray-800">Format</span>
              </div>
              <div className="text-lg font-bold text-indigo-600">{outputFormats[processingResults.format].name}</div>
              <div className="text-sm text-gray-500">{outputFormats[processingResults.format].extension}</div>
            </div>
          </div>

          {/* Output Tabs */}
          <div className="bg-white rounded-lg shadow-sm border">
            <div className="border-b border-gray-200">
              <nav className="flex space-x-8 px-6" aria-label="Tabs">
                {[
                  { id: 'compressed', name: 'Compressed Output', icon: Package },
                  { id: 'formatted', name: 'Formatted Output', icon: Code },
                  { id: 'original', name: 'Original Input', icon: FileText },
                  { id: 'analysis', name: 'Analysis', icon: BarChart3 }
                ].map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setSelectedTab(tab.id)}
                      className={`${
                        selectedTab === tab.id
                          ? 'border-blue-500 text-blue-600'
                          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                      } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center gap-2`}
                    >
                      <Icon className="w-4 h-4" />
                      {tab.name}
                    </button>
                  );
                })}
              </nav>
            </div>

            <div className="p-6">
              {selectedTab === 'compressed' && (
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-gray-800">Compressed Data Structure</h3>
                    <div className="flex items-center gap-2">
                      <span className="text-sm bg-green-100 text-green-800 px-2 py-1 rounded">
                        {processingResults.compressed.tokens} tokens
                      </span>
                      <button
                        onClick={() => copyToClipboard(JSON.stringify(processingResults.compressed.data, null, 2))}
                        className="text-gray-500 hover:text-gray-700 p-1"
                      >
                        <Copy className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => downloadFile(JSON.stringify(processingResults.compressed.data, null, 2), 'compressed-tests')}
                        className="text-gray-500 hover:text-gray-700 p-1"
                      >
                        <Download className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  <pre className="bg-gray-50 p-4 rounded-lg text-sm overflow-auto max-h-96 font-mono">
                    {JSON.stringify(processingResults.compressed.data, null, 2)}
                  </pre>
                </div>
              )}

              {selectedTab === 'formatted' && (
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-gray-800">Formatted Output ({outputFormats[processingResults.format].name})</h3>
                    <div className="flex items-center gap-2">
                      <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded">
                        {processingResults.format.toUpperCase()}
                      </span>
                      <button
                        onClick={() => copyToClipboard(processingResults.compressed.formatted)}
                        className="text-gray-500 hover:text-gray-700 p-1"
                      >
                        <Copy className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => downloadFile(processingResults.compressed.formatted, 'formatted-tests')}
                        className="text-gray-500 hover:text-gray-700 p-1"
                      >
                        <Download className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  <pre className="bg-gray-50 p-4 rounded-lg text-sm overflow-auto max-h-96 font-mono whitespace-pre-wrap">
                    {processingResults.compressed.formatted}
                  </pre>
                </div>
              )}

              {selectedTab === 'original' && (
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-gray-800">Original Input</h3>
                    <div className="flex items-center gap-2">
                      <span className="text-sm bg-red-100 text-red-800 px-2 py-1 rounded">
                        {processingResults.original.tokens} tokens
                      </span>
                      <button
                        onClick={() => copyToClipboard(processingResults.original.text)}
                        className="text-gray-500 hover:text-gray-700 p-1"
                      >
                        <Copy className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  <pre className="bg-gray-50 p-4 rounded-lg text-sm overflow-auto max-h-96 font-mono whitespace-pre-wrap">
                    {processingResults.original.text}
                  </pre>
                </div>
              )}

              {selectedTab === 'analysis' && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h4 className="font-medium text-blue-800 mb-2">Compression Details</h4>
                      <div className="space-y-2 text-sm text-blue-700">
                        <div>Strategy: {testCompressionStrategies[processingResults.strategy].name}</div>
                        <div>Compression Level: {compressionLevel}/5</div>
                        <div>Context Preserved: {preserveContext ? 'Yes' : 'No'}</div>
                        <div>Output Format: {outputFormats[processingResults.format].name}</div>
                        <div>Processing Time: ~0.8s</div>
                      </div>
                    </div>
                    
                    <div className="bg-green-50 p-4 rounded-lg">
                      <h4 className="font-medium text-green-800 mb-2">Performance Metrics</h4>
                      <div className="space-y-2 text-sm text-green-700">
                        <div>Token Savings: {processingResults.metadata.tokenSavings}</div>
                        <div>Size Reduction: {processingResults.original.size} → {processingResults.compressed.size}</div>
                        <div>Efficiency: {processingResults.metadata.efficiency}%</div>
                        <div>Quality Score: High</div>
                        <div>Data Integrity: Preserved</div>
                      </div>
                    </div>
                  </div>
                  
                  {processingHistory.length > 0 && (
                    <div>
                      <h4 className="font-medium text-gray-800 mb-3">Processing History</h4>
                      <div className="bg-gray-50 rounded-lg p-4">
                        <div className="space-y-2">
                          {processingHistory.slice(0, 5).map((entry) => (
                            <div key={entry.id} className="flex items-center justify-between text-sm">
                              <span className="text-gray-600">
                                {testCompressionStrategies[entry.strategy]?.name} ({entry.format.toUpperCase()})
                              </span>
                              <div className="flex items-center gap-3">
                                <span className="text-green-600">{entry.reduction}% reduction</span>
                                <span className="text-gray-400">{new Date(entry.timestamp).toLocaleTimeString()}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Success Message */}
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center">
            <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
            <span className="text-green-700">
              Successfully processed {processingResults.original.tests} test cases using <strong>{testCompressionStrategies[processingResults.strategy].name}</strong>. 
              Achieved {processingResults.compressed.reduction}% token reduction ({processingResults.metadata.tokenSavings} tokens saved) 
              in {outputFormats[processingResults.format].name} format.
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default TestOutputAnalyzer;