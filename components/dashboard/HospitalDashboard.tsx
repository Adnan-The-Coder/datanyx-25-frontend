"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Activity, 
  Brain, 
  Users, 
  Bed, 
  AlertTriangle, 
  TrendingUp, 
  Stethoscope,
  Settings,
  History,
  BarChart3,
  Shield,
  UserCog,
  Zap
} from 'lucide-react';

// Import all tab components
import OverviewTab from './tabs/OverviewTab';
import PredictionsTab from './tabs/PredictionsTab';
import BedStatusTab from './tabs/BedStatusTab';
import PatientInflowTab from './tabs/PatientInflowTab';
import StaffAllocationTab from './tabs/StaffAllocationTab';
import EquipmentUsageTab from './tabs/EquipmentUsageTab';
import AlertsSurgesTab from './tabs/AlertsSurgesTab';
import HistoryInsightsTab from './tabs/HistoryInsightsTab';
import SimulationsTab from './tabs/SimulationsTab';
import AdminPanelTab from './tabs/AdminPanelTab';

import { useApiStatus } from '@/lib/api';

type TabKey = 
  | 'overview' 
  | 'predictions' 
  | 'beds' 
  | 'inflow' 
  | 'staff' 
  | 'equipment' 
  | 'alerts' 
  | 'history' 
  | 'simulations' 
  | 'admin';

interface TabConfig {
  key: TabKey;
  label: string;
  icon: React.ReactNode;
  component: React.ReactNode;
  description: string;
  featured?: boolean;
}

export default function HospitalDashboard() {
  const [activeTab, setActiveTab] = useState<TabKey>('overview');
  const { isConnected, isLoading: apiLoading } = useApiStatus();

  const tabs: TabConfig[] = [
    {
      key: 'overview',
      label: 'Overview',
      icon: <BarChart3 className="h-4 w-4" />,
      component: <OverviewTab />,
      description: 'Hospital metrics and KPIs',
    },
    {
      key: 'predictions',
      label: 'ML Predictions',
      icon: <Brain className="h-4 w-4" />,
      component: <PredictionsTab />,
      description: 'AI disease predictions',
      featured: true,
    },
    {
      key: 'beds',
      label: 'Bed Status',
      icon: <Bed className="h-4 w-4" />,
      component: <BedStatusTab />,
      description: 'Real-time bed availability',
    },
    {
      key: 'inflow',
      label: 'Patient Inflow',
      icon: <Users className="h-4 w-4" />,
      component: <PatientInflowTab />,
      description: 'Patient admission trends',
    },
    {
      key: 'staff',
      label: 'Staff Allocation',
      icon: <UserCog className="h-4 w-4" />,
      component: <StaffAllocationTab />,
      description: 'Staff management and scheduling',
    },
    {
      key: 'equipment',
      label: 'Equipment',
      icon: <Stethoscope className="h-4 w-4" />,
      component: <EquipmentUsageTab />,
      description: 'Medical equipment status',
    },
    {
      key: 'alerts',
      label: 'Alerts & Surges',
      icon: <AlertTriangle className="h-4 w-4" />,
      component: <AlertsSurgesTab />,
      description: 'Critical alerts and capacity surges',
    },
    {
      key: 'history',
      label: 'History & Insights',
      icon: <History className="h-4 w-4" />,
      component: <HistoryInsightsTab />,
      description: 'Historical data and analytics',
    },
    {
      key: 'simulations',
      label: 'Simulations',
      icon: <Zap className="h-4 w-4" />,
      component: <SimulationsTab />,
      description: 'Scenario planning and modeling',
    },
    {
      key: 'admin',
      label: 'Admin Panel',
      icon: <Settings className="h-4 w-4" />,
      component: <AdminPanelTab />,
      description: 'System administration',
    },
  ];

  const activeTabConfig = tabs.find(tab => tab.key === activeTab);

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
              <Activity className="h-8 w-8 text-blue-600" />
              DataNyx Health Dashboard
            </h1>
            <p className="text-gray-600 mt-1">
              Advanced ML-powered health predictions and hospital management
            </p>
          </div>

          {/* API Status */}
          <div className="flex items-center gap-2">
            <Badge 
              variant={isConnected ? 'default' : 'destructive'}
              className="flex items-center gap-1"
            >
              <Shield className="h-3 w-3" />
              {apiLoading ? 'Checking...' : isConnected ? 'ML API Online' : 'ML API Offline'}
            </Badge>
            {isConnected && (
              <Badge variant="secondary" className="flex items-center gap-1">
                <Brain className="h-3 w-3" />
                7 Models Ready
              </Badge>
            )}
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="mb-6">
        <div className="flex flex-wrap gap-2">
          {tabs.map((tab) => (
            <Button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              variant={activeTab === tab.key ? 'default' : 'outline'}
              size="sm"
              className={`flex items-center gap-2 ${tab.featured ? 'ring-2 ring-blue-200' : ''}`}
            >
              {tab.icon}
              {tab.label}
              {tab.featured && (
                <Badge variant="secondary" className="text-xs">NEW</Badge>
              )}
            </Button>
          ))}
        </div>

        {/* Active tab description */}
        {activeTabConfig && (
          <div className="mt-3 p-3 bg-white rounded-lg border border-gray-200">
            <p className="text-sm text-gray-600 flex items-center gap-2">
              {activeTabConfig.icon}
              <span className="font-medium">{activeTabConfig.label}:</span>
              {activeTabConfig.description}
            </p>
          </div>
        )}
      </div>

      {/* Tab Content */}
      <div className="space-y-6">
        {activeTabConfig?.component || (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-yellow-500" />
                Tab Under Development
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                This tab is currently being developed. Please check back soon!
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
