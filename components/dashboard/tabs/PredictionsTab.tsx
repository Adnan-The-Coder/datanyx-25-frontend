"use client";

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, Activity, AlertCircle, CheckCircle2, RefreshCw, Stethoscope } from 'lucide-react';
import { 
  DiseaseApi, 
  FEATURE_NAMES, 
  DISEASES, 
  PatientDataUtils, 
  PredictionResponse,
  DiseaseePrediction,
  useApiStatus 
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

export default function PredictionsTab() {
  const [formData, setFormData] = useState<FormData>(INITIAL_FORM_DATA);
  const [predictions, setPredictions] = useState<Record<string, DiseaseePrediction> | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  const { isConnected, isLoading: apiLoading } = useApiStatus();
  const { showNotification } = useNotification();

  // Load sample data
  const loadSampleData = () => {
    const sampleFeatures = PatientDataUtils.generateSamplePatient();
    const sampleData: FormData = {
      age: sampleFeatures[0].toString(),
      bmi: sampleFeatures[1].toString(),
      symptom_duration: sampleFeatures[2].toString(),
      severity: sampleFeatures[3].toString(),
      progression: sampleFeatures[4].toString(),
      medication_response: sampleFeatures[5].toString(),
      exercise_tolerance: sampleFeatures[6].toString(),
      stress_impact: sampleFeatures[7].toString(),
      health_score: sampleFeatures[8].toString(),
    };
    setFormData(sampleData);
    showNotification('Sample patient data loaded', 'info');
  };

  // Handle input changes
  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    // Clear errors when user starts typing
    if (errors.length > 0) {
      setErrors([]);
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

  // Submit prediction
  const handlePredict = async () => {
    setIsLoading(true);
    setErrors([]);

    try {
      const features = getFeatures();
      
      // Validate features
      const validationErrors = PatientDataUtils.validateFeatures(features);
      if (validationErrors.length > 0) {
        setErrors(validationErrors);
        showNotification('Please fix validation errors', 'error');
        return;
      }

      // Make API call
      const response = await DiseaseApi.predictAllDiseases(features);
      
      if (response.error) {
        setErrors([response.error]);
        showNotification('Prediction failed', 'error');
      } else if (response.data) {
        setPredictions(response.data.predictions);
        showNotification('Prediction completed successfully', 'success');
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      setErrors([errorMessage]);
      showNotification('Prediction failed', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  // Clear form
  const clearForm = () => {
    setFormData(INITIAL_FORM_DATA);
    setPredictions(null);
    setErrors([]);
    showNotification('Form cleared', 'info');
  };

  // Get disease badge color
  const getDiseaseColor = (prediction: DiseaseePrediction): string => {
    if (prediction.error) return 'destructive';
    return prediction.prediction === 1 ? 'destructive' : 'secondary';
  };

  // Get prediction confidence color
  const getConfidenceColor = (accuracy: number): string => {
    if (accuracy >= 0.9) return 'text-green-600';
    if (accuracy >= 0.8) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Stethoscope className="h-6 w-6" />
            ML Disease Predictions
          </h2>
          <p className="text-muted-foreground">
            Advanced machine learning predictions for myasthenia gravis symptoms
          </p>
        </div>
        
        {/* API Status Indicator */}
        <div className="flex items-center gap-2">
          <Badge variant={isConnected ? 'default' : 'destructive'} className="flex items-center gap-1">
            {apiLoading ? (
              <Loader2 className="h-3 w-3 animate-spin" />
            ) : isConnected ? (
              <CheckCircle2 className="h-3 w-3" />
            ) : (
              <AlertCircle className="h-3 w-3" />
            )}
            {apiLoading ? 'Checking...' : isConnected ? 'API Connected' : 'API Disconnected'}
          </Badge>
        </div>
      </div>

      {/* API Connection Warning */}
      {!isConnected && !apiLoading && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Cannot connect to the ML API. Please ensure the Docker container is running on http://localhost:8000
          </AlertDescription>
        </Alert>
      )}

      {/* Patient Input Form */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5" />
            Patient Information
          </CardTitle>
          <div className="flex gap-2">
            <Button
              onClick={loadSampleData}
              variant="outline"
              size="sm"
            >
              Load Sample
            </Button>
            <Button
              onClick={clearForm}
              variant="outline"
              size="sm"
            >
              Clear
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {FEATURE_NAMES.map((feature, index) => {
              const fieldName = feature as keyof FormData;
              const ranges = {
                age: '20-80 years',
                bmi: '18-35 kg/m²',
                symptom_duration: '0.1-10 years',
                severity: '0.1-10 scale',
                progression: '0.1-10 rate',
                medication_response: '1-10 scale',
                exercise_tolerance: '1-10 level',
                stress_impact: '0.1-5 scale',
                health_score: '50-100 score'
              };

              return (
                <div key={feature} className="space-y-2">
                  <Label htmlFor={feature} className="text-sm font-medium">
                    {feature.split('_').map(word => 
                      word.charAt(0).toUpperCase() + word.slice(1)
                    ).join(' ')}
                  </Label>
                  <Input
                    id={feature}
                    type="number"
                    step="0.1"
                    placeholder={ranges[feature as keyof typeof ranges]}
                    value={formData[fieldName]}
                    onChange={(e) => handleInputChange(fieldName, e.target.value)}
                    className="w-full"
                  />
                  <p className="text-xs text-muted-foreground">
                    Range: {ranges[feature as keyof typeof ranges]}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Validation Errors */}
          {errors.length > 0 && (
            <Alert variant="destructive" className="mt-4">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                <div className="space-y-1">
                  {errors.map((error, index) => (
                    <div key={index}>{error}</div>
                  ))}
                </div>
              </AlertDescription>
            </Alert>
          )}

          {/* Predict Button */}
          <div className="flex justify-center mt-6">
            <Button
              onClick={handlePredict}
              disabled={isLoading || !isConnected}
              size="lg"
              className="px-8"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  <Activity className="mr-2 h-4 w-4" />
                  Generate Predictions
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Prediction Results */}
      {predictions && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-green-600" />
              Prediction Results
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {DISEASES.map((disease) => {
                const prediction = predictions[disease];
                if (!prediction) return null;

                return (
                  <div
                    key={disease}
                    className="border rounded-lg p-4 space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <h4 className="font-semibold capitalize">
                        {disease}
                      </h4>
                      <Badge variant={getDiseaseColor(prediction)}>
                        {prediction.error ? 'Error' : prediction.status}
                      </Badge>
                    </div>

                    {prediction.error ? (
                      <div className="text-sm text-red-600">
                        {prediction.error}
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Prediction:</span>
                          <span className="font-medium">
                            {prediction.prediction === 1 ? 'Present' : 'Absent'}
                          </span>
                        </div>
                        
                        {prediction.model_accuracy !== undefined && (
                          <div className="flex justify-between text-sm">
                            <span>Model Accuracy:</span>
                            <span className={`font-medium ${getConfidenceColor(prediction.model_accuracy)}`}>
                              {(prediction.model_accuracy * 100).toFixed(1)}%
                            </span>
                          </div>
                        )}

                        {/* Visual indicator */}
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full ${
                              prediction.prediction === 1
                                ? 'bg-red-500'
                                : 'bg-green-500'
                            }`}
                            style={{
                              width: `${prediction.model_accuracy ? prediction.model_accuracy * 100 : 50}%`
                            }}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Summary */}
            <div className="mt-6 p-4 bg-muted rounded-lg">
              <h4 className="font-semibold mb-2">Summary</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Present:</span>
                  <span className="ml-2 font-medium text-red-600">
                    {Object.values(predictions).filter(p => p.prediction === 1 && !p.error).length}
                  </span>
                </div>
                <div>
                  <span className="text-muted-foreground">Absent:</span>
                  <span className="ml-2 font-medium text-green-600">
                    {Object.values(predictions).filter(p => p.prediction === 0 && !p.error).length}
                  </span>
                </div>
                <div>
                  <span className="text-muted-foreground">Errors:</span>
                  <span className="ml-2 font-medium text-yellow-600">
                    {Object.values(predictions).filter(p => p.error).length}
                  </span>
                </div>
                <div>
                  <span className="text-muted-foreground">Total:</span>
                  <span className="ml-2 font-medium">
                    {Object.keys(predictions).length}
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
