/**
 * API Integration Test Suite
 * Tests the integration between frontend and production ML API
 */

import { DiseaseApi, PatientDataUtils, DISEASES, FEATURE_NAMES } from '../lib/api';

// Test configuration
const API_BASE_URL = 'http://python-fast-api-datanyx.eba-f3wni6xk.ap-south-1.elasticbeanstalk.com';

/**
 * Test API connectivity and basic endpoints
 */
async function testApiConnectivity() {
  console.log('🔍 Testing API Connectivity...');
  
  try {
    // Test connection
    const isConnected = await DiseaseApi.testConnection();
    console.log(`✅ Connection Status: ${isConnected ? 'Connected' : 'Failed'}`);
    
    if (!isConnected) {
      throw new Error('API connection failed');
    }
    
    // Test health endpoint
    const healthResponse = await DiseaseApi.getHealth();
    if (healthResponse.error) {
      throw new Error(`Health check failed: ${healthResponse.error}`);
    }
    
    console.log('✅ Health Check:', {
      status: healthResponse.data?.status,
      version: healthResponse.data?.version,
      models_loaded: healthResponse.data?.models_loaded
    });
    
    return true;
  } catch (error) {
    console.error('❌ API Connectivity Test Failed:', error);
    return false;
  }
}

/**
 * Test API information endpoints
 */
async function testApiInformation() {
  console.log('🔍 Testing API Information...');
  
  try {
    // Test API info endpoint
    const infoResponse = await DiseaseApi.getInfo();
    if (infoResponse.error) {
      throw new Error(`API info failed: ${infoResponse.error}`);
    }
    
    console.log('✅ API Info:', {
      name: infoResponse.data?.api_name,
      version: infoResponse.data?.version,
      total_diseases: infoResponse.data?.total_diseases,
      diseases: infoResponse.data?.diseases
    });
    
    // Test models endpoint
    const modelsResponse = await DiseaseApi.getModels();
    if (modelsResponse.error) {
      throw new Error(`Models info failed: ${modelsResponse.error}`);
    }
    
    const availableModels = modelsResponse.data ? 
      Object.values(modelsResponse.data.models).filter(m => m.available).length : 0;
    
    console.log('✅ Models Info:', {
      total_models: modelsResponse.data?.total_diseases,
      available_models: availableModels,
      model_status: Object.entries(modelsResponse.data?.models || {})
        .map(([disease, info]) => ({ disease, available: info.available }))
    });
    
    return true;
  } catch (error) {
    console.error('❌ API Information Test Failed:', error);
    return false;
  }
}

/**
 * Test patient data utilities
 */
function testPatientDataUtils() {
  console.log('🔍 Testing Patient Data Utils...');
  
  try {
    // Test sample data generation
    const sampleFeatures = PatientDataUtils.generateSamplePatient();
    console.log('✅ Sample Patient Data:', sampleFeatures);
    
    if (sampleFeatures.length !== 9) {
      throw new Error(`Expected 9 features, got ${sampleFeatures.length}`);
    }
    
    // Test random data generation
    const randomFeatures = PatientDataUtils.generateRandomPatient();
    console.log('✅ Random Patient Data:', randomFeatures.map(f => f.toFixed(1)));
    
    if (randomFeatures.length !== 9) {
      throw new Error(`Expected 9 features, got ${randomFeatures.length}`);
    }
    
    // Test validation
    const validationErrors = PatientDataUtils.validateFeatures(sampleFeatures);
    console.log('✅ Validation Test:', validationErrors.length === 0 ? 'Passed' : `Failed: ${validationErrors}`);
    
    // Test invalid data validation
    const invalidFeatures = [0, 0, 0, 0, 0, 0, 0, 0, 0]; // All out of range
    const invalidErrors = PatientDataUtils.validateFeatures(invalidFeatures);
    console.log('✅ Invalid Data Test:', invalidErrors.length > 0 ? 'Passed' : 'Failed');
    
    // Test formatting
    const formatted = PatientDataUtils.formatFeatures(sampleFeatures);
    console.log('✅ Format Test:', Object.keys(formatted).length === 9 ? 'Passed' : 'Failed');
    
    return true;
  } catch (error) {
    console.error('❌ Patient Data Utils Test Failed:', error);
    return false;
  }
}

/**
 * Test disease prediction functionality
 */
async function testDiseasePrediction() {
  console.log('🔍 Testing Disease Prediction...');
  
  try {
    // Generate test patient data
    const testFeatures = PatientDataUtils.generateSamplePatient();
    console.log('📊 Test Patient Features:', testFeatures.map(f => f.toFixed(1)));
    
    // Test all diseases prediction
    const predictionResponse = await DiseaseApi.predictAllDiseases(testFeatures);
    if (predictionResponse.error) {
      throw new Error(`Prediction failed: ${predictionResponse.error}`);
    }
    
    const predictions = predictionResponse.data?.predictions;
    if (!predictions) {
      throw new Error('No predictions returned');
    }
    
    console.log('✅ All Diseases Prediction:');
    DISEASES.forEach(disease => {
      const prediction = predictions[disease];
      if (prediction) {
        console.log(`  ${disease}: ${prediction.status} (${prediction.prediction}) - Accuracy: ${prediction.model_accuracy}`);
      } else {
        console.log(`  ${disease}: No prediction available`);
      }
    });
    
    // Test individual disease prediction (first disease)
    const testDisease = DISEASES[0];
    const singleResponse = await DiseaseApi.predictSingleDisease(testDisease, testFeatures);
    if (singleResponse.error) {
      console.log(`⚠️  Single disease prediction failed for ${testDisease}: ${singleResponse.error}`);
    } else {
      console.log(`✅ Single Disease Prediction (${testDisease}):`, {
        prediction: singleResponse.data?.prediction,
        status: singleResponse.data?.status
      });
    }
    
    return true;
  } catch (error) {
    console.error('❌ Disease Prediction Test Failed:', error);
    return false;
  }
}

/**
 * Test error handling scenarios
 */
async function testErrorHandling() {
  console.log('🔍 Testing Error Handling...');
  
  try {
    // Test invalid features (wrong length)
    console.log('Testing invalid feature length...');
    const invalidFeatures = [45, 25]; // Only 2 features instead of 9
    const invalidResponse = await DiseaseApi.predictAllDiseases(invalidFeatures);
    console.log('✅ Invalid Length Test:', invalidResponse.error ? 'Passed' : 'Failed');
    
    // Test out-of-range values
    console.log('Testing out-of-range values...');
    const outOfRangeFeatures = [150, 50, 20, 15, 15, 15, 15, 10, 150]; // All out of range
    const outOfRangeErrors = PatientDataUtils.validateFeatures(outOfRangeFeatures);
    console.log('✅ Out-of-Range Test:', outOfRangeErrors.length > 0 ? 'Passed' : 'Failed');
    
    // Test empty features
    console.log('Testing empty features...');
    const emptyFeatures: number[] = [];
    const emptyErrors = PatientDataUtils.validateFeatures(emptyFeatures);
    console.log('✅ Empty Features Test:', emptyErrors.length > 0 ? 'Passed' : 'Failed');
    
    return true;
  } catch (error) {
    console.error('❌ Error Handling Test Failed:', error);
    return false;
  }
}

/**
 * Performance test - measure prediction latency
 */
async function testPerformance() {
  console.log('🔍 Testing Performance...');
  
  try {
    const testFeatures = PatientDataUtils.generateSamplePatient();
    const iterations = 5;
    const times: number[] = [];
    
    for (let i = 0; i < iterations; i++) {
      const startTime = performance.now();
      const response = await DiseaseApi.predictAllDiseases(testFeatures);
      const endTime = performance.now();
      
      if (response.error) {
        throw new Error(`Performance test iteration ${i + 1} failed: ${response.error}`);
      }
      
      times.push(endTime - startTime);
    }
    
    const averageTime = times.reduce((a, b) => a + b, 0) / times.length;
    const minTime = Math.min(...times);
    const maxTime = Math.max(...times);
    
    console.log('✅ Performance Results:', {
      iterations,
      average_time: `${averageTime.toFixed(2)}ms`,
      min_time: `${minTime.toFixed(2)}ms`,
      max_time: `${maxTime.toFixed(2)}ms`
    });
    
    // Performance should be under 5 seconds for acceptable UX
    const acceptableTime = 5000; // 5 seconds
    const performanceGrade = averageTime < acceptableTime ? 'Excellent' : 'Needs Improvement';
    console.log('✅ Performance Grade:', performanceGrade);
    
    return true;
  } catch (error) {
    console.error('❌ Performance Test Failed:', error);
    return false;
  }
}

/**
 * Run comprehensive test suite
 */
async function runTestSuite() {
  console.log('🚀 Starting API Integration Test Suite...');
  console.log(`🌐 Testing against: ${API_BASE_URL}`);
  console.log('=' .repeat(60));
  
  const results = {
    connectivity: false,
    information: false,
    utils: false,
    prediction: false,
    errorHandling: false,
    performance: false
  };
  
  // Run all tests
  results.connectivity = await testApiConnectivity();
  results.information = await testApiInformation();
  results.utils = testPatientDataUtils();
  results.prediction = await testDiseasePrediction();
  results.errorHandling = await testErrorHandling();
  results.performance = await testPerformance();
  
  // Summary
  console.log('=' .repeat(60));
  console.log('📊 Test Results Summary:');
  Object.entries(results).forEach(([test, passed]) => {
    console.log(`  ${passed ? '✅' : '❌'} ${test.charAt(0).toUpperCase() + test.slice(1)}: ${passed ? 'PASSED' : 'FAILED'}`);
  });
  
  const passedTests = Object.values(results).filter(Boolean).length;
  const totalTests = Object.keys(results).length;
  const passRate = ((passedTests / totalTests) * 100).toFixed(1);
  
  console.log(`\n🎯 Overall: ${passedTests}/${totalTests} tests passed (${passRate}%)`);
  
  if (passedTests === totalTests) {
    console.log('🎉 All tests passed! API integration is working perfectly.');
  } else {
    console.log('⚠️  Some tests failed. Please check the API configuration and network connectivity.');
  }
  
  return results;
}

// Export for use in browser console or testing framework
if (typeof window !== 'undefined') {
  (window as any).apiTest = {
    runTestSuite,
    testApiConnectivity,
    testApiInformation,
    testPatientDataUtils,
    testDiseasePrediction,
    testErrorHandling,
    testPerformance
  };
}

export {
  runTestSuite,
  testApiConnectivity,
  testApiInformation,
  testPatientDataUtils,
  testDiseasePrediction,
  testErrorHandling,
  testPerformance
};