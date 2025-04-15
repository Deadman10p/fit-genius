
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useLanguage } from '@/contexts/LanguageContext';
import AppearanceSettings from '@/components/settings/AppearanceSettings';
import NotificationSettings from '@/components/settings/NotificationSettings';
import SecuritySettings from '@/components/settings/SecuritySettings';

const Settings = () => {
  const { t } = useLanguage();

  return (
    <div className="container max-w-4xl py-8 px-4 md:px-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">{t('settings.title')}</h1>
      </div>
      
      <Tabs defaultValue="appearance" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="appearance">{t('settings.appearance')}</TabsTrigger>
          <TabsTrigger value="notifications">{t('settings.notification')}</TabsTrigger>
          <TabsTrigger value="security">{t('settings.password')}</TabsTrigger>
        </TabsList>
        
        <TabsContent value="appearance">
          <AppearanceSettings />
        </TabsContent>
        
        <TabsContent value="notifications">
          <NotificationSettings />
        </TabsContent>
        
        <TabsContent value="security">
          <SecuritySettings />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Settings;
