"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Settings } from 'lucide-react';

export default function AdminPanelTab() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Settings className="h-5 w-5" />
          Administration Panel
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600">
          System administration and configuration tools coming soon...
        </p>
      </CardContent>
    </Card>
  );
}