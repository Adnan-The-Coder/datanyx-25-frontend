"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Bed } from 'lucide-react';

export default function BedStatusTab() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bed className="h-5 w-5" />
          Bed Status Management
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600">
          Bed management functionality coming soon...
        </p>
      </CardContent>
    </Card>
  );
}