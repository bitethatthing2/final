"use client";

import { useState } from 'react';
import { NotificationManager } from '@/components/features/notifications/NotificationManager';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { testNotificationSetup } from '@/lib/supabase/notification-service';
import { supabase } from '@/lib/supabase/client';
import { AlertCircle, CheckCircle2, BellIcon } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export default function NotificationSettingsPage() {
  const [testStatus, setTestStatus] = useState<'idle' | 'testing' | 'success' | 'error'>('idle');
  const [testMessage, setTestMessage] = useState<string>('');

  const testConnection = async () => {
    if (!supabase) {
      setTestStatus('error');
      setTestMessage('Supabase client not initialized. Check your environment variables.');
      return;
    }

    setTestStatus('testing');
    setTestMessage('Testing connection to notification service...');
    
    try {
      const result = await testNotificationSetup(supabase);
      
      if (result) {
        setTestStatus('success');
        setTestMessage('Connection successful! Your notification system is properly configured.');
      } else {
        setTestStatus('error');
        setTestMessage('Connection test failed. Check the console for more details.');
      }
    } catch (error) {
      console.error('Error testing notification setup:', error);
      setTestStatus('error');
      setTestMessage('An error occurred while testing the notification setup.');
    }
  };

  return (
    <div className="container max-w-4xl py-10">
      <div className="flex items-center gap-2 mb-6">
        <BellIcon className="h-6 w-6" />
        <h1 className="text-3xl font-bold">Notification Settings</h1>
      </div>
      
      <p className="text-muted-foreground mb-8">
        Manage your notification preferences and stay updated with the latest from Hustle Hard.
      </p>
      
      <div className="grid gap-8">
        {/* Main notification toggle */}
        <NotificationManager />
        
        <Separator />
        
        {/* Connection test */}
        <Card>
          <CardHeader>
            <CardTitle>Notification System Status</CardTitle>
            <CardDescription>
              Test the connection to our notification service to ensure everything is working properly.
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-4">
            <Button 
              onClick={testConnection} 
              disabled={testStatus === 'testing'}
            >
              {testStatus === 'testing' ? 'Testing...' : 'Test Connection'}
            </Button>
            
            {testStatus !== 'idle' && (
              <Alert variant={testStatus === 'success' ? 'default' : 'destructive'}>
                {testStatus === 'success' ? (
                  <CheckCircle2 className="h-4 w-4" />
                ) : (
                  <AlertCircle className="h-4 w-4" />
                )}
                <AlertTitle>
                  {testStatus === 'success' ? 'Success' : 'Error'}
                </AlertTitle>
                <AlertDescription>
                  {testMessage}
                </AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>
        
        {/* Notification types - for future implementation */}
        <Card>
          <CardHeader>
            <CardTitle>Notification Types</CardTitle>
            <CardDescription>
              Choose which types of notifications you want to receive. 
              This feature will be available soon.
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <p className="text-sm text-muted-foreground italic">
              Coming soon: Customize which notifications you receive, including promotions, 
              events, and special offers.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
