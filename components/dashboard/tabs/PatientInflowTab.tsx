"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users } from 'lucide-react';

export default function PatientInflowTab() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="h-5 w-5" />
          Patient Inflow Analysis
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600">
          Patient inflow tracking and analytics coming soon...
        </p>
      </CardContent>
    </Card>
  );
}