"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  TestTube, 
  Play, 
  CheckCircle2, 
  XCircle, 
  Loader2,
  Activity,
  Database,
  Network,
  Users,
  AlertTriangle
} from 'lucide-react';
import { 
  DiseaseApi, 
  PatientDataUtils, 
  DISEASES, 
  API_BASE_URL 
} from '@/lib/api';

interface TestResult {
  name: string;
  status: 'running' | 'passed' | 'failed' | 'pending';
  message?: string;
  data?: any;
}

export default function ApiTestPage() {
  const [tests, setTests] = useState<TestResult[]>([
    { name: 'API Connectivity', status: 'pending' },
    { name: 'Health Check', status: 'pending' },
    { name: 'API Information', status: 'pending' },
    { name: 'Models Status', status: 'pending' },
    { name: 'Sample Prediction', status: 'pending' },
    { name: 'Data Validation', status: 'pending' },
    { name: 'Error Handling', status: 'pending' },
    { name: 'Performance Test', status: 'pending' }
  ]);
  
  const [isRunning, setIsRunning] = useState(false);
  const [overallResult, setOverallResult] = useState<'pending' | 'passed' | 'failed'>('pending');

  const updateTestStatus = (testName: string, status: TestResult['status'], message?: string, data?: any) => {
    setTests(prev => prev.map(test => 
      test.name === testName 
        ? { ...test, status, message, data }
        : test
    ));
  };

  const runTest = async (testName: string, testFn: () => Promise<{ success: boolean; message?: string; data?: any }>) => {
    updateTestStatus(testName, 'running');
    try {
      const result = await testFn();
      updateTestStatus(
        testName, 
        result.success ? 'passed' : 'failed', 
        result.message,
        result.data
      );
      return result.success;
    } catch (error) {
      updateTestStatus(testName, 'failed', error instanceof Error ? error.message : 'Unknown error');
      return false;
    }
  };

  const runAllTests = async () => {
    setIsRunning(true);
    setOverallResult('pending');

    // Reset all tests
    setTests(prev => prev.map(test => ({ ...test, status: 'pending' as const })));

    const results: boolean[] = [];

    // Test 1: API Connectivity
    results.push(await runTest('API Connectivity', async () => {
      const isConnected = await DiseaseApi.testConnection();
      return {
        success: isConnected,
        message: isConnected ? 'Successfully connected to API' : 'Failed to connect to API'
      };
    }));

    // Test 2: Health Check
    results.push(await runTest('Health Check', async () => {
      const response = await DiseaseApi.getHealth();
      if (response.error) {
        return { success: false, message: response.error };
      }
      return {
        success: true,
        message: `API Status: ${response.data?.status}`,
        data: response.data
      };
    }));

    // Test 3: API Information
    results.push(await runTest('API Information', async () => {
      const response = await DiseaseApi.getInfo();
      if (response.error) {
        return { success: false, message: response.error };
      }
      return {
        success: true,
        message: `API: ${response.data?.api_name} v${response.data?.version}`,
        data: response.data
      };
    }));

    // Test 4: Models Status
    results.push(await runTest('Models Status', async () => {
      const response = await DiseaseApi.getModels();
      if (response.error) {
        return { success: false, message: response.error };
      }
      const available = response.data ? Object.values(response.data.models).filter(m => m.available).length : 0;
      return {
        success: available > 0,
        message: `${available}/${response.data?.total_diseases} models available`,
        data: response.data
      };
    }));

    // Test 5: Sample Prediction
    results.push(await runTest('Sample Prediction', async () => {
      const features = PatientDataUtils.generateSamplePatient();
      const response = await DiseaseApi.predictAllDiseases(features);
      if (response.error) {
        return { success: false, message: response.error };
      }
      const predictions = response.data?.predictions;
      const successfulPredictions = predictions ? Object.values(predictions).filter(p => !p.error).length : 0;
      return {
        success: successfulPredictions > 0,
        message: `${successfulPredictions}/${DISEASES.length} predictions successful`,
        data: predictions
      };
    }));

    // Test 6: Data Validation
    results.push(await runTest('Data Validation', async () => {
      const validFeatures = PatientDataUtils.generateSamplePatient();
      const validErrors = PatientDataUtils.validateFeatures(validFeatures);
      
      const invalidFeatures = [0, 0, 0, 0, 0, 0, 0, 0, 0];
      const invalidErrors = PatientDataUtils.validateFeatures(invalidFeatures);
      
      const validationWorks = validErrors.length === 0 && invalidErrors.length > 0;
      return {
        success: validationWorks,
        message: validationWorks ? 'Validation working correctly' : 'Validation not working properly'
      };
    }));

    // Test 7: Error Handling
    results.push(await runTest('Error Handling', async () => {
      const invalidFeatures = [45, 25]; // Wrong number of features
      const response = await DiseaseApi.predictAllDiseases(invalidFeatures);
      return {
        success: !!response.error,
        message: response.error ? 'Error handling works' : 'Error handling failed'
      };
    }));

    // Test 8: Performance Test
    results.push(await runTest('Performance Test', async () => {
      const features = PatientDataUtils.generateSamplePatient();
      const startTime = performance.now();
      const response = await DiseaseApi.predictAllDiseases(features);
      const endTime = performance.now();
      const duration = endTime - startTime;
      
      const isAcceptable = duration < 5000; // Under 5 seconds
      return {
        success: !response.error && isAcceptable,
        message: `Prediction took ${duration.toFixed(0)}ms`,
        data: { duration, acceptable: isAcceptable }
      };
    }));

    // Calculate overall result
    const passedTests = results.filter(Boolean).length;
    const totalTests = results.length;
    setOverallResult(passedTests === totalTests ? 'passed' : 'failed');
    
    setIsRunning(false);
  };

  const getStatusIcon = (status: TestResult['status']) => {
    switch (status) {
      case 'running': return <Loader2 className="h-4 w-4 animate-spin text-blue-600" />;
      case 'passed': return <CheckCircle2 className="h-4 w-4 text-green-600" />;
      case 'failed': return <XCircle className="h-4 w-4 text-red-600" />;
      default: return <div className="h-4 w-4 rounded-full border-2 border-gray-300" />;
    }
  };

  const getStatusColor = (status: TestResult['status']) => {
    switch (status) {
      case 'running': return 'border-blue-200 bg-blue-50';
      case 'passed': return 'border-green-200 bg-green-50';
      case 'failed': return 'border-red-200 bg-red-50';
      default: return 'border-gray-200';
    }
  };

  const passedTests = tests.filter(t => t.status === 'passed').length;
  const totalTests = tests.length;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TestTube className="h-6 w-6 text-purple-600" />
              API Integration Test Suite
            </CardTitle>
            <div className="flex items-center justify-between">
              <p className="text-gray-600">
                Comprehensive testing of the ML API integration
              </p>
              <Badge variant="outline">
                {API_BASE_URL.replace('http://', '').replace('https://', '')}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              <Button 
                onClick={runAllTests} 
                disabled={isRunning}
                size="lg"
              >
                {isRunning ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Running Tests...
                  </>
                ) : (
                  <>
                    <Play className="h-4 w-4 mr-2" />
                    Run All Tests
                  </>
                )}
              </Button>
              
              {overallResult !== 'pending' && (
                <div className="flex items-center gap-2">
                  {overallResult === 'passed' ? (
                    <CheckCircle2 className="h-5 w-5 text-green-600" />
                  ) : (
                    <XCircle className="h-5 w-5 text-red-600" />
                  )}
                  <span className={`font-medium ${
                    overallResult === 'passed' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {passedTests}/{totalTests} Tests Passed
                  </span>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Test Results */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {tests.map((test, index) => (
            <Card key={index} className={`transition-colors ${getStatusColor(test.status)}`}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold">{test.name}</h3>
                  {getStatusIcon(test.status)}
                </div>
                
                {test.message && (
                  <p className="text-sm text-gray-600 mb-2">{test.message}</p>
                )}
                
                {test.data && test.status === 'passed' && (
                  <div className="mt-2 p-2 bg-gray-100 rounded text-xs">
                    <pre>{JSON.stringify(test.data, null, 2).slice(0, 200)}
                    {JSON.stringify(test.data, null, 2).length > 200 && '...'}</pre>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* API Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Network className="h-5 w-5 text-blue-600" />
              API Configuration
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div>
                <h4 className="font-semibold mb-2">Endpoint Details</h4>
                <div className="space-y-1">
                  <div><span className="text-gray-600">Base URL:</span> {API_BASE_URL}</div>
                  <div><span className="text-gray-600">Protocol:</span> HTTP</div>
                  <div><span className="text-gray-600">Platform:</span> AWS Elastic Beanstalk</div>
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold mb-2">Supported Diseases</h4>
                <div className="space-y-1">
                  {DISEASES.map(disease => (
                    <div key={disease} className="text-gray-600 capitalize">{disease}</div>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold mb-2">Test Coverage</h4>
                <div className="space-y-1">
                  <div><span className="text-gray-600">Connectivity:</span> Health checks</div>
                  <div><span className="text-gray-600">Functionality:</span> ML predictions</div>
                  <div><span className="text-gray-600">Validation:</span> Input/output validation</div>
                  <div><span className="text-gray-600">Performance:</span> Response times</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Instructions */}
        <Alert>
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            <strong>Testing Instructions:</strong>
            <ul className="mt-2 space-y-1 text-sm">
              <li>• Click "Run All Tests" to validate API integration</li>
              <li>• Green tests indicate successful functionality</li>
              <li>• Red tests indicate issues that need attention</li>
              <li>• Check browser console for detailed error information</li>
              <li>• Ensure the API server is running before testing</li>
            </ul>
          </AlertDescription>
        </Alert>
      </div>
    </div>
  );
}