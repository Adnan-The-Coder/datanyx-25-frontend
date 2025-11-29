"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertTriangle } from 'lucide-react';

export default function AlertsSurgesTab() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <AlertTriangle className="h-5 w-5" />
          Alerts & Capacity Surges
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600">
          Alert management and surge capacity monitoring coming soon...
        </p>
      </CardContent>
    </Card>
  );
}