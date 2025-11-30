"use client";

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Loader2, 
  Activity, 
  AlertCircle, 
  CheckCircle2, 
  RefreshCw, 
  Stethoscope, 
  Brain,
  TrendingUp,
  Database,
  Wifi,
  WifiOff,
  Clock,
  Users,
  FileText
} from 'lucide-react';
import { 
  DiseaseApi, 
  FEATURE_NAMES, 
  DISEASES, 
  PatientDataUtils, 
  PredictionResponse,
  DiseaseePrediction,
  useApiStatus,
  usePrediction,
  useModelsStatus,
  API_BASE_URL
} from '@/lib/api';
import { useNotification } from '@/context/notification-context';

interface FormData {
  age: string;
  bmi: string;
  symptom_duration: string;
  severity: string;
  progression: string;
  medication_response: string;
  exercise_tolerance: string;
  stress_impact: string;
  health_score: string;
}

const INITIAL_FORM_DATA: FormData = {
  age: '',
  bmi: '',
  symptom_duration: '',
  severity: '',
  progression: '',
  medication_response: '',
  stress_impact: '',
  exercise_tolerance: '',
  health_score: ''
};

const FEATURE_DESCRIPTIONS = {
  age: 'Patient age in years (20-80)',
  bmi: 'Body mass index (18-35)',
  symptom_duration: 'Duration of symptoms in years (0.1-10)',
  severity: 'Symptom severity scale (0.1-10)',
  progression: 'Disease progression rate (0.1-10)',
  medication_response: 'Response to medication scale (1-10)',
  exercise_tolerance: 'Exercise tolerance level (1-10)',
  stress_impact: 'Stress impact on symptoms (0.1-5)',
  health_score: 'Overall health score (50-100)'
};

export default function PredictionsTab() {
  const [formData, setFormData] = useState<FormData>(INITIAL_FORM_DATA);
  const [formErrors, setFormErrors] = useState<string[]>([]);
  const { isConnected, isLoading: apiLoading, checkConnection } = useApiStatus();
  const { models, isLoading: modelsLoading, error: modelsError } = useModelsStatus();
  const { predict, isLoading, error, lastPrediction, clearError } = usePrediction();
  const { showNotification } = useNotification();

  // Load sample data
  const loadSampleData = () => {
    const sampleFeatures = PatientDataUtils.generateSamplePatient();
    const sampleData: FormData = {
      age: sampleFeatures[0].toFixed(1),
      bmi: sampleFeatures[1].toFixed(1),
      symptom_duration: sampleFeatures[2].toFixed(1),
      severity: sampleFeatures[3].toFixed(1),
      progression: sampleFeatures[4].toFixed(1),
      medication_response: sampleFeatures[5].toFixed(1),
      exercise_tolerance: sampleFeatures[6].toFixed(1),
      stress_impact: sampleFeatures[7].toFixed(1),
      health_score: sampleFeatures[8].toFixed(1),
    };
    setFormData(sampleData);
    setFormErrors([]);
    clearError();
    showNotification('Sample patient data loaded', 'info');
  };

  // Load random data
  const loadRandomData = () => {
    const randomFeatures = PatientDataUtils.generateRandomPatient();
    const randomData: FormData = {
      age: randomFeatures[0].toFixed(1),
      bmi: randomFeatures[1].toFixed(1),
      symptom_duration: randomFeatures[2].toFixed(1),
      severity: randomFeatures[3].toFixed(1),
      progression: randomFeatures[4].toFixed(1),
      medication_response: randomFeatures[5].toFixed(1),
      exercise_tolerance: randomFeatures[6].toFixed(1),
      stress_impact: randomFeatures[7].toFixed(1),
      health_score: randomFeatures[8].toFixed(1),
    };
    setFormData(randomData);
    setFormErrors([]);
    clearError();
    showNotification('Random patient data generated', 'info');
  };

  // Handle input changes
  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    // Clear errors when user starts typing
    if (formErrors.length > 0) {
      setFormErrors([]);
    }
    if (error) {
      clearError();
    }
  };

  // Convert form data to features array
  const getFeatures = (): number[] => {
    return [
      parseFloat(formData.age) || 0,
      parseFloat(formData.bmi) || 0,
      parseFloat(formData.symptom_duration) || 0,
      parseFloat(formData.severity) || 0,
      parseFloat(formData.progression) || 0,
      parseFloat(formData.medication_response) || 0,
      parseFloat(formData.exercise_tolerance) || 0,
      parseFloat(formData.stress_impact) || 0,
      parseFloat(formData.health_score) || 0,
    ];
  };

  // Validate form
  const validateForm = (): boolean => {
    const features = getFeatures();
    const validationErrors = PatientDataUtils.validateFeatures(features);
    
    // Check for empty fields
    const emptyFields = Object.entries(formData)
      .filter(([_, value]) => !value.trim())
      .map(([field, _]) => field);
    
    if (emptyFields.length > 0) {
      validationErrors.unshift(`Please fill in all fields: ${emptyFields.join(', ')}`);
    }

    setFormErrors(validationErrors);
    return validationErrors.length === 0;
  };

  // Submit prediction
  const handlePredict = async () => {
    if (!validateForm()) {
      showNotification('Please fix validation errors', 'error');
      return;
    }

    if (!isConnected) {
      showNotification('API is not connected. Please check connection.', 'error');
      return;
    }

    const features = getFeatures();
    const result = await predict(features);
    
    if (result) {
      showNotification('Prediction completed successfully', 'success');
    } else {
      showNotification('Prediction failed', 'error');
    }
  };

  // Clear form
  const clearForm = () => {
    setFormData(INITIAL_FORM_DATA);
    setFormErrors([]);
    clearError();
    showNotification('Form cleared', 'info');
  };

  // Get disease badge variant
  const getDiseaseVariant = (prediction: DiseaseePrediction) => {
    if (prediction.error) return 'destructive';
    return prediction.prediction === 1 ? 'destructive' : 'secondary';
  };

  // Get disease color
  const getDiseaseColor = (disease: string) => {
    const colors = {
      diplopia: 'text-blue-600',
      bulbar: 'text-purple-600',
      facial: 'text-green-600',
      fatigue: 'text-orange-600',
      limb: 'text-red-600',
      ptosis: 'text-cyan-600',
      respiratory: 'text-pink-600'
    };
    return colors[disease as keyof typeof colors] || 'text-gray-600';
  };

  const predictions = lastPrediction?.predictions;

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">API Status</CardTitle>
            {isConnected ? <Wifi className="h-4 w-4 text-green-600" /> : <WifiOff className="h-4 w-4 text-red-600" />}
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {apiLoading ? (
                <div className="flex items-center space-x-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span className="text-sm">Checking...</span>
                </div>
              ) : (
                <span className={isConnected ? 'text-green-600' : 'text-red-600'}>
                  {isConnected ? 'Connected' : 'Disconnected'}
                </span>
              )}
            </div>
            <p className="text-xs text-muted-foreground">
              {API_BASE_URL}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Models Status</CardTitle>
            <Database className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {modelsLoading ? (
                <div className="flex items-center space-x-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span className="text-sm">Loading...</span>
                </div>
              ) : models ? (
                <span className="text-blue-600">
                  {Object.values(models.models).filter(m => m.available).length}/{models.total_diseases}
                </span>
              ) : (
                <span className="text-red-600">Error</span>
              )}
            </div>
            <p className="text-xs text-muted-foreground">
              ML Models Available
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Last Prediction</CardTitle>
            <Clock className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {lastPrediction ? (
                <span className="text-green-600">Available</span>
              ) : (
                <span className="text-gray-600">None</span>
              )}
            </div>
            <p className="text-xs text-muted-foreground">
              Patient Analysis Result
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Error Display */}
      {(formErrors.length > 0 || error || modelsError) && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            <div className="space-y-1">
              {formErrors.map((err, index) => <div key={index}>{err}</div>)}
              {error && <div>{error}</div>}
              {modelsError && <div>Models Error: {modelsError}</div>}
            </div>
          </AlertDescription>
        </Alert>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Form */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <FileText className="h-5 w-5" />
              <span>Patient Data Input</span>
            </CardTitle>
            <div className="flex space-x-2">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={loadSampleData}
                disabled={isLoading}
              >
                <Users className="h-4 w-4 mr-1" />
                Sample Data
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={loadRandomData}
                disabled={isLoading}
              >
                <RefreshCw className="h-4 w-4 mr-1" />
                Random Data
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={clearForm}
                disabled={isLoading}
              >
                Clear Form
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {FEATURE_NAMES.map((feature) => (
                <div key={feature} className="space-y-2">
                  <Label htmlFor={feature} className="text-sm font-medium capitalize">
                    {feature.replace('_', ' ')}
                  </Label>
                  <Input
                    id={feature}
                    type="number"
                    step="0.1"
                    value={formData[feature as keyof FormData]}
                    onChange={(e) => handleInputChange(feature as keyof FormData, e.target.value)}
                    placeholder={FEATURE_DESCRIPTIONS[feature as keyof typeof FEATURE_DESCRIPTIONS]}
                    disabled={isLoading}
                    className="w-full"
                  />
                </div>
              ))}
            </div>
            
            <Button 
              onClick={handlePredict} 
              disabled={isLoading || !isConnected} 
              className="w-full"
              size="lg"
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Analyzing Patient...
                </>
              ) : (
                <>
                  <Brain className="h-4 w-4 mr-2" />
                  Predict Diseases
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Results Display */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Activity className="h-5 w-5" />
              <span>Disease Predictions</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {predictions ? (
              <div className="space-y-4">
                {DISEASES.map((disease) => {
                  const prediction = predictions[disease];
                  if (!prediction) return null;
                  
                  return (
                    <div key={disease} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className={`font-semibold capitalize ${getDiseaseColor(disease)}`}>
                          {disease}
                        </h4>
                        <Badge variant={getDiseaseVariant(prediction)}>
                          {prediction.error ? 'Error' : prediction.status}
                        </Badge>
                      </div>
                      
                      {prediction.error ? (
                        <p className="text-sm text-red-600">{prediction.error}</p>
                      ) : (
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Prediction:</span>
                            <span className={prediction.prediction === 1 ? 'text-red-600 font-medium' : 'text-green-600 font-medium'}>
                              {prediction.prediction === 1 ? 'Present' : 'Absent'}
                            </span>
                          </div>
                          
                          {prediction.model_accuracy && (
                            <div className="flex justify-between text-sm">
                              <span>Model Accuracy:</span>
                              <span className="font-medium">
                                {typeof prediction.model_accuracy === 'number' 
                                  ? `${(prediction.model_accuracy * 100).toFixed(1)}%`
                                  : prediction.model_accuracy
                                }
                              </span>
                            </div>
                          )}
                          
                          {prediction.confidence && (
                            <div className="flex justify-between text-sm">
                              <span>Confidence:</span>
                              <span className="font-medium">
                                {(prediction.confidence * 100).toFixed(1)}%
                              </span>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
                
                {/* Summary */}
                <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <h4 className="font-semibold text-blue-800 mb-2">Summary</h4>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-blue-600">Present: </span>
                      <span className="font-medium">
                        {Object.values(predictions).filter(p => !p.error && p.prediction === 1).length}
                      </span>
                    </div>
                    <div>
                      <span className="text-green-600">Absent: </span>
                      <span className="font-medium">
                        {Object.values(predictions).filter(p => !p.error && p.prediction === 0).length}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center text-gray-500 py-8">
                <Stethoscope className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Enter patient data and click "Predict Diseases" to see results</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}