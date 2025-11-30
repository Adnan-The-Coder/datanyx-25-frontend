/**
 * API Service for Disease Prediction ML Backend
 * Integrates with FastAPI backend deployed on AWS Elastic Beanstalk
 */

import { useState, useEffect } from 'react';

// Production API Base URL
const API_BASE_URL = 'https://python-fast-api-datanyx.eba-f3wni6xk.ap-south-1.elasticbeanstalk.com';

// Types for API responses
export interface ApiResponse<T> {
  data?: T;
  error?: string;
  status: number;
}

export interface HealthResponse {
  status: string;
  timestamp: string;
  api_name: string;
  version: string;
  models_loaded: boolean;
  uptime: string;
}

export interface ModelInfo {
  available: boolean;
  path?: string;
  accuracy?: number;
  model_type?: string;
  error?: string;
}

export interface ModelsResponse {
  models: Record<string, ModelInfo>;
  total_diseases: number;
}

export interface PatientFeatures {
  features: number[];
}

export interface DiseaseePrediction {
  prediction: number;
  status: 'Present' | 'Absent';
  model_accuracy?: number;
  confidence?: number;
  error?: string;
}

export interface ApiInfo {
  api_name: string;
  version: string;
  description: string;
  total_diseases: number;
  diseases: string[];
  model_status: Record<string, ModelInfo>;
  endpoints: {
    prediction: string;
    batch_prediction: string;
    model_info: string;
    health: string;
  };
}

export interface RootResponse {
  message: string;
  version: string;
  description: string;
  endpoints: Record<string, string>;
  diseases: string[];
  timestamp: string;
}

export interface BatchPatient {
  features: number[];
}

export interface BatchPredictionRequest {
  patients: BatchPatient[];
}

export interface BatchPredictionResponse {
  results: {
    patient_features: number[];
    predictions: Record<string, DiseaseePrediction>;
  }[];
  total_patients: number;
  processing_time?: number;
}

export interface PredictionResponse {
  patient_features: number[];
  predictions: Record<string, DiseaseePrediction>;
}

// Disease types
export const DISEASES = [
  'diplopia',
  'bulbar', 
  'facial',
  'fatigue',
  'limb',
  'ptosis',
  'respiratory'
] as const;

export type Disease = typeof DISEASES[number];

// Feature names for the ML model
export const FEATURE_NAMES = [
  'age',
  'bmi', 
  'symptom_duration',
  'severity',
  'progression',
  'medication_response',
  'exercise_tolerance',
  'stress_impact',
  'health_score'
] as const;

// Generic API call function
async function apiCall<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  try {
    const url = `${API_BASE_URL}${endpoint}`;
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    if (!response.ok) {
      const errorData = await response.text();
      return {
        error: `HTTP ${response.status}: ${errorData}`,
        status: response.status,
      };
    }

    const data = await response.json();
    return {
      data,
      status: response.status,
    };
  } catch (error) {
    return {
      error: error instanceof Error ? error.message : 'Unknown error occurred',
      status: 500,
    };
  }
}

// API Service Class
export class DiseaseApi {
  /**
   * Get API health status
   */
  static async getHealth(): Promise<ApiResponse<HealthResponse>> {
    return apiCall<HealthResponse>('/health');
  }

  /**
   * Get API information
   */
  static async getInfo(): Promise<ApiResponse<ApiInfo>> {
    return apiCall<ApiInfo>('/info');
  }

  /**
   * Get model information
   */
  static async getModels(): Promise<ApiResponse<ModelsResponse>> {
    return apiCall<ModelsResponse>('/predict/models');
  }

  /**
   * Predict all diseases for a patient
   */
  static async predictAllDiseases(
    features: number[]
  ): Promise<ApiResponse<PredictionResponse>> {
    return apiCall<PredictionResponse>('/predict/ml', {
      method: 'POST',
      body: JSON.stringify({ features }),
    });
  }

  /**
   * Predict a specific disease for a patient
   */
  static async predictSingleDisease(
    disease: Disease,
    features: number[]
  ): Promise<ApiResponse<DiseaseePrediction & { disease: string; patient_features: number[] }>> {
    return apiCall(`/predict/${disease}`, {
      method: 'POST',
      body: JSON.stringify({ features }),
    });
  }

  /**
   * Test API connectivity
   */
  static async testConnection(): Promise<boolean> {
    try {
      const response = await fetch(`${API_BASE_URL}/health`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });
      return response.ok;
    } catch {
      return false;
    }
  }

  /**
   * Get API root information
   */
  static async getRoot(): Promise<ApiResponse<{
    message: string;
    version: string;
    description: string;
    endpoints: Record<string, string>;
    diseases: string[];
    timestamp: string;
  }>> {
    return apiCall('/');
  }
}

// Utility functions for patient data
export class PatientDataUtils {
  /**
   * Validate patient features
   */
  static validateFeatures(features: number[]): string[] {
    const errors: string[] = [];
    
    if (features.length !== 9) {
      errors.push(`Expected 9 features, got ${features.length}`);
    }

    // Validate ranges based on API documentation
    const validations = [
      { name: 'Age', value: features[0], min: 20, max: 80 },
      { name: 'BMI', value: features[1], min: 18, max: 35 },
      { name: 'Symptom Duration', value: features[2], min: 0.1, max: 10 },
      { name: 'Severity', value: features[3], min: 0.1, max: 10 },
      { name: 'Progression', value: features[4], min: 0.1, max: 10 },
      { name: 'Medication Response', value: features[5], min: 1, max: 10 },
      { name: 'Exercise Tolerance', value: features[6], min: 1, max: 10 },
      { name: 'Stress Impact', value: features[7], min: 0.1, max: 5 },
      { name: 'Health Score', value: features[8], min: 50, max: 100 },
    ];

    validations.forEach(({ name, value, min, max }) => {
      if (value < min || value > max) {
        errors.push(`${name} must be between ${min} and ${max}`);
      }
    });

    return errors;
  }

  /**
   * Generate sample patient data
   */
  static generateSamplePatient(): number[] {
    return [
      45.0,  // age
      25.0,  // bmi
      3.5,   // symptom_duration
      6.0,   // severity
      4.0,   // progression
      7.0,   // medication_response
      8.0,   // exercise_tolerance
      2.5,   // stress_impact
      75.0   // health_score
    ];
  }

  /**
   * Generate random realistic patient data
   */
  static generateRandomPatient(): number[] {
    return [
      Math.random() * 40 + 30,    // age: 30-70
      Math.random() * 10 + 20,    // bmi: 20-30
      Math.random() * 8 + 0.5,    // symptom_duration: 0.5-8.5
      Math.random() * 8 + 1,      // severity: 1-9
      Math.random() * 8 + 1,      // progression: 1-9
      Math.random() * 7 + 2,      // medication_response: 2-9
      Math.random() * 7 + 2,      // exercise_tolerance: 2-9
      Math.random() * 4 + 0.5,    // stress_impact: 0.5-4.5
      Math.random() * 30 + 60     // health_score: 60-90
    ];
  }

  /**
   * Format features for display
   */
  static formatFeatures(features: number[]): Record<string, string> {
    const formatted: Record<string, string> = {};
    FEATURE_NAMES.forEach((name, index) => {
      if (features[index] !== undefined) {
        formatted[name] = features[index].toFixed(1);
      }
    });
    return formatted;
  }

  /**
   * Parse features from form data
   */
  static parseFormData(formData: Record<string, string>): number[] {
    return FEATURE_NAMES.map(name => parseFloat(formData[name]) || 0);
  }
}

// React hooks for API integration
export function useApiStatus() {
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [lastChecked, setLastChecked] = useState<Date | null>(null);

  const checkConnection = async () => {
    setIsLoading(true);
    try {
      const connected = await DiseaseApi.testConnection();
      setIsConnected(connected);
      setLastChecked(new Date());
    } catch (error) {
      setIsConnected(false);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    checkConnection();
    // Check connection every 30 seconds
    const interval = setInterval(checkConnection, 30000);
    return () => clearInterval(interval);
  }, []);

  return {
    isConnected,
    isLoading,
    lastChecked,
    checkConnection,
  };
}

export function useModelsStatus() {
  const [models, setModels] = useState<ModelsResponse | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchModels = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await DiseaseApi.getModels();
      if (response.error) {
        setError(response.error);
      } else {
        setModels(response.data || null);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch models');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchModels();
  }, []);

  return {
    models,
    isLoading,
    error,
    refetch: fetchModels,
  };
}

export function usePrediction() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [lastPrediction, setLastPrediction] = useState<PredictionResponse | null>(null);

  const predict = async (features: number[]): Promise<PredictionResponse | null> => {
    setIsLoading(true);
    setError(null);

    try {
      // Validate features first
      const validationErrors = PatientDataUtils.validateFeatures(features);
      if (validationErrors.length > 0) {
        setError(validationErrors.join(', '));
        return null;
      }

      const response = await DiseaseApi.predictAllDiseases(features);
      if (response.error) {
        setError(response.error);
        return null;
      }

      const prediction = response.data;
      setLastPrediction(prediction || null);
      return prediction || null;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Prediction failed';
      setError(errorMessage);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const predictSingle = async (disease: Disease, features: number[]) => {
    setIsLoading(true);
    setError(null);

    try {
      const validationErrors = PatientDataUtils.validateFeatures(features);
      if (validationErrors.length > 0) {
        setError(validationErrors.join(', '));
        return null;
      }

      const response = await DiseaseApi.predictSingleDisease(disease, features);
      if (response.error) {
        setError(response.error);
        return null;
      }

      return response.data;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Prediction failed';
      setError(errorMessage);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    predict,
    predictSingle,
    isLoading,
    error,
    lastPrediction,
    clearError: () => setError(null),
  };
}

// Export API base URL for debugging
export { API_BASE_URL };