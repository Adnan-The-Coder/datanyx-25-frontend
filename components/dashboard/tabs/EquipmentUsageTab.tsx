"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Stethoscope } from 'lucide-react';

export default function EquipmentUsageTab() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Stethoscope className="h-5 w-5" />
          Equipment Usage Monitoring
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600">
          Medical equipment tracking and usage analytics coming soon...
        </p>
      </CardContent>
    </Card>
  );
}