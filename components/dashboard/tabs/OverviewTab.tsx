"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Activity, 
  Users, 
  Bed, 
  TrendingUp, 
  Heart,
  Clock,
  AlertTriangle,
  CheckCircle2
} from 'lucide-react';

export default function OverviewTab() {
  const stats = [
    {
      title: 'Total Patients',
      value: '247',
      change: '+12%',
      changeType: 'positive' as const,
      icon: <Users className="h-5 w-5" />,
      color: 'blue'
    },
    {
      title: 'Available Beds',
      value: '43/120',
      change: '64% occupied',
      changeType: 'neutral' as const,
      icon: <Bed className="h-5 w-5" />,
      color: 'green'
    },
    {
      title: 'Critical Alerts',
      value: '3',
      change: '-2 from yesterday',
      changeType: 'positive' as const,
      icon: <AlertTriangle className="h-5 w-5" />,
      color: 'red'
    },
    {
      title: 'ML Predictions',
      value: '156',
      change: '+24 today',
      changeType: 'positive' as const,
      icon: <Activity className="h-5 w-5" />,
      color: 'purple'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Message */}
      <Card className="bg-linear-to-r from-blue-50 to-purple-50 border-blue-200">
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
                <div className={`p-2 rounded-full bg-blue-100`}>
                  <div className={`text-blue-600`}>
                    {stat.icon}
                  </div>
                </div>
              </div>
              <div>
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="flex items-center gap-1 text-xs text-gray-500">
                  <TrendingUp className="h-3 w-3" />
                  {stat.change}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

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
            <div className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer">
              <h4 className="font-semibold text-blue-600 mb-2">ML Predictions</h4>
              <p className="text-sm text-gray-600">
                Generate disease predictions using our advanced machine learning models
              </p>
            </div>
            <div className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer">
              <h4 className="font-semibold text-green-600 mb-2">Bed Management</h4>
              <p className="text-sm text-gray-600">
                Monitor and manage hospital bed allocation and availability
              </p>
            </div>
            <div className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer">
              <h4 className="font-semibold text-purple-600 mb-2">Staff Allocation</h4>
              <p className="text-sm text-gray-600">
                Optimize staff scheduling and resource allocation
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* System Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5" />
            System Status
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm">ML API Service</span>
              <Badge variant="default" className="bg-green-100 text-green-800">
                Online
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Database Connection</span>
              <Badge variant="default" className="bg-green-100 text-green-800">
                Connected
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Real-time Updates</span>
              <Badge variant="default" className="bg-green-100 text-green-800">
                Active
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Last Update</span>
              <span className="text-sm text-gray-500 flex items-center gap-1">
                <Clock className="h-3 w-3" />
                Just now
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}


