"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Zap } from 'lucide-react';

export default function SimulationsTab() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Zap className="h-5 w-5" />
          Scenario Simulations
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600">
          Scenario planning and simulation modeling coming soon...
        </p>
      </CardContent>
    </Card>
  );
}