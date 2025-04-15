
import React, { useState } from 'react';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import { useLanguage } from '@/contexts/LanguageContext';

const NotificationSettings = () => {
  const { t } = useLanguage();
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [inAppAlerts, setInAppAlerts] = useState(true);

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('settings.notification')}</CardTitle>
        <CardDescription>Configure how you receive notifications</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="email-notifications">{t('settings.email')}</Label>
            <p className="text-sm text-muted-foreground">Receive workout reminders and updates via email</p>
          </div>
          <Switch 
            id="email-notifications" 
            checked={emailNotifications}
            onCheckedChange={setEmailNotifications}
          />
        </div>
        
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="push-notifications">{t('settings.push')}</Label>
            <p className="text-sm text-muted-foreground">Receive push notifications on your device</p>
          </div>
          <Switch 
            id="push-notifications" 
            checked={pushNotifications}
            onCheckedChange={setPushNotifications}
          />
        </div>
        
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="in-app-alerts">{t('settings.inApp')}</Label>
            <p className="text-sm text-muted-foreground">Receive alerts while using the app</p>
          </div>
          <Switch 
            id="in-app-alerts" 
            checked={inAppAlerts}
            onCheckedChange={setInAppAlerts}
          />
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={() => toast.success("Notification settings saved")}>Save Changes</Button>
      </CardFooter>
    </Card>
  );
};

export default NotificationSettings;
