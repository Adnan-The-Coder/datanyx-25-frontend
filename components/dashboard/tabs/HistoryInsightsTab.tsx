"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { History } from 'lucide-react';

export default function HistoryInsightsTab() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <History className="h-5 w-5" />
          Historical Data & Insights
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600">
          Historical analytics and trend insights coming soon...
        </p>
      </CardContent>
    </Card>
  );
}