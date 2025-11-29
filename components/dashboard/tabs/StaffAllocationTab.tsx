"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { UserCog } from 'lucide-react';

export default function StaffAllocationTab() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <UserCog className="h-5 w-5" />
          Staff Allocation Management
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600">
          Staff allocation and scheduling system coming soon...
        </p>
      </CardContent>
    </Card>
  );
}