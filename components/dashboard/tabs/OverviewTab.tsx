"use client";

import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Activity, 
  Users, 
  Bed, 
  TrendingUp, 
  Heart,
  Clock,
  AlertTriangle,
  CheckCircle2,
  Database,
  Wifi,
  WifiOff,
  Brain,
  Server,
  Loader2,
  RefreshCw
} from 'lucide-react';
import { 
  useApiStatus, 
  useModelsStatus, 
  DiseaseApi, 
  API_BASE_URL,
  DISEASES 
} from '@/lib/api';

export default function OverviewTab() {
  const { isConnected, isLoading: apiLoading, checkConnection } = useApiStatus();
  const { models, isLoading: modelsLoading, error: modelsError } = useModelsStatus();
  const [apiInfo, setApiInfo] = useState<any>(null);
  const [healthData, setHealthData] = useState<any>(null);

  useEffect(() => {
    if (isConnected) {
      // Fetch API info when connected
      DiseaseApi.getInfo().then(response => {
        if (response.data) {
          setApiInfo(response.data);
        }
      });
      
      // Fetch health data
      DiseaseApi.getHealth().then(response => {
        if (response.data) {
          setHealthData(response.data);
        }
      });
    }
  }, [isConnected]);

  const stats = [
    {
      title: 'API Connection',
      value: isConnected ? 'Connected' : 'Disconnected',
      change: API_BASE_URL.replace('http://', '').replace('https://', ''),
      changeType: isConnected ? 'positive' : 'negative' as const,
      icon: isConnected ? <Wifi className="h-5 w-5" /> : <WifiOff className="h-5 w-5" />,
      color: isConnected ? 'green' : 'red'
    },
    {
      title: 'ML Models',
      value: models ? `${Object.values(models.models).filter(m => m.available).length}/${models.total_diseases}` : '0/7',
      change: `${DISEASES.length} disease types`,
      changeType: 'neutral' as const,
      icon: <Brain className="h-5 w-5" />,
      color: 'purple'
    },
    {
      title: 'API Status',
      value: healthData?.status || 'Unknown',
      change: `Version ${healthData?.version || 'N/A'}`,
      changeType: healthData?.status === 'healthy' ? 'positive' : 'negative' as const,
      icon: <Server className="h-5 w-5" />,
      color: 'blue'
    },
    {
      title: 'Predictions Ready',
      value: (models && isConnected) ? 'Available' : 'Unavailable',
      change: `7 disease models`,
      changeType: (models && isConnected) ? 'positive' : 'negative' as const,
      icon: <Activity className="h-5 w-5" />,
      color: 'orange'
    }
  ];

  const getChangeTypeColor = (changeType: string) => {
    switch (changeType) {
      case 'positive': return 'text-green-600';
      case 'negative': return 'text-red-600';
      default: return 'text-gray-500';
    }
  };

  const getValueColor = (changeType: string) => {
    switch (changeType) {
      case 'positive': return 'text-green-700';
      case 'negative': return 'text-red-700';
      default: return 'text-gray-700';
    }
  };

  return (
    <div className="space-y-6">
      {/* Welcome Message */}
      <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Heart className="h-6 w-6 text-red-500" />
            Welcome to DataNyx Health Dashboard
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600">
            Your comprehensive hospital management system with advanced ML-powered disease prediction capabilities.
            Monitor real-time metrics, manage resources, and leverage AI insights for better patient care.
          </p>
        </CardContent>
      </Card>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between space-y-0 pb-2">
                <div className="text-sm font-medium text-gray-600">
                  {stat.title}
                </div>
                <div className={`p-2 rounded-full ${
                  stat.color === 'green' ? 'bg-green-100' :
                  stat.color === 'red' ? 'bg-red-100' :
                  stat.color === 'purple' ? 'bg-purple-100' :
                  stat.color === 'orange' ? 'bg-orange-100' :
                  'bg-blue-100'
                }`}>
                  <div className={`${
                    stat.color === 'green' ? 'text-green-600' :
                    stat.color === 'red' ? 'text-red-600' :
                    stat.color === 'purple' ? 'text-purple-600' :
                    stat.color === 'orange' ? 'text-orange-600' :
                    'text-blue-600'
                  }`}>
                    {apiLoading && index === 0 ? <Loader2 className="h-5 w-5 animate-spin" /> : stat.icon}
                  </div>
                </div>
              </div>
              <div>
                <div className={`text-2xl font-bold ${getValueColor(stat.changeType)}`}>
                  {stat.value}
                </div>
                <div className={`flex items-center gap-1 text-xs ${getChangeTypeColor(stat.changeType)}`}>
                  <TrendingUp className="h-3 w-3" />
                  {stat.change}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* API Status Details */}
      {isConnected && apiInfo && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="h-5 w-5 text-blue-600" />
              ML API Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="space-y-2">
                <h4 className="font-semibold text-sm text-gray-700">API Details</h4>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Name:</span>
                    <span className="font-medium">{apiInfo.api_name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Version:</span>
                    <span className="font-medium">{apiInfo.version}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Diseases:</span>
                    <span className="font-medium">{apiInfo.total_diseases}</span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <h4 className="font-semibold text-sm text-gray-700">Model Status</h4>
                <div className="space-y-1">
                  {DISEASES.slice(0, 4).map((disease) => (
                    <div key={disease} className="flex justify-between text-sm">
                      <span className="text-gray-600 capitalize">{disease}:</span>
                      <Badge variant={apiInfo.model_status?.[disease]?.available ? 'secondary' : 'destructive'} className="text-xs">
                        {apiInfo.model_status?.[disease]?.available ? 'Ready' : 'Unavailable'}
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="space-y-2">
                <h4 className="font-semibold text-sm text-gray-700">Endpoints</h4>
                <div className="space-y-1">
                  {Object.entries(apiInfo.endpoints || {}).slice(0, 4).map(([key, endpoint]) => (
                    <div key={key} className="text-sm">
                      <span className="text-gray-600 capitalize">{key.replace('_', ' ')}:</span>
                      <code className="ml-2 text-xs bg-gray-100 px-1 py-0.5 rounded">{endpoint as string}</code>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Connection Management */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Server className="h-5 w-5 text-blue-600" />
              API Connection Management
            </div>
            <Button
              onClick={checkConnection}
              variant="outline"
              size="sm"
              disabled={apiLoading}
            >
              {apiLoading ? (
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
              ) : (
                <RefreshCw className="h-4 w-4 mr-2" />
              )}
              Refresh
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center gap-3">
                {isConnected ? (
                  <CheckCircle2 className="h-5 w-5 text-green-600" />
                ) : (
                  <AlertTriangle className="h-5 w-5 text-red-600" />
                )}
                <div>
                  <h4 className="font-semibold">Production API</h4>
                  <p className="text-sm text-gray-600">{API_BASE_URL}</p>
                </div>
              </div>
              <Badge variant={isConnected ? 'secondary' : 'destructive'}>
                {isConnected ? 'Connected' : 'Disconnected'}
              </Badge>
            </div>
            
            {!isConnected && (
              <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <h4 className="font-semibold text-yellow-800 mb-2">Connection Issues</h4>
                <p className="text-sm text-yellow-700 mb-3">
                  Unable to connect to the ML API. Please ensure:
                </p>
                <ul className="text-sm text-yellow-700 space-y-1 ml-4">
                  <li>• The API server is running</li>
                  <li>• Network connectivity is available</li>
                  <li>• CORS is properly configured</li>
                  <li>• The URL is correct: {API_BASE_URL}</li>
                </ul>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5 text-green-600" />
            Quick Actions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
              <div className="flex items-center gap-2 mb-2">
                <Brain className="h-5 w-5 text-purple-600" />
                <h4 className="font-semibold text-purple-600">ML Predictions</h4>
              </div>
              <p className="text-sm text-gray-600">
                Generate disease predictions using our advanced machine learning models
              </p>
              <Badge className="mt-2" variant={isConnected ? 'secondary' : 'destructive'}>
                {isConnected ? 'Available' : 'Offline'}
              </Badge>
            </div>
            
            <div className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
              <div className="flex items-center gap-2 mb-2">
                <Activity className="h-5 w-5 text-blue-600" />
                <h4 className="font-semibold text-blue-600">Real-time Monitoring</h4>
              </div>
              <p className="text-sm text-gray-600">
                Monitor API health, model status, and prediction performance
              </p>
              <Badge className="mt-2" variant="secondary">
                Active
              </Badge>
            </div>
            
            <div className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
              <div className="flex items-center gap-2 mb-2">
                <Database className="h-5 w-5 text-green-600" />
                <h4 className="font-semibold text-green-600">Model Management</h4>
              </div>
              <p className="text-sm text-gray-600">
                View model information, accuracy metrics, and availability status
              </p>
              <Badge className="mt-2" variant={models ? 'secondary' : 'destructive'}>
                {models ? `${Object.values(models.models).filter(m => m.available).length} Models` : 'Loading'}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}