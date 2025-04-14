import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { toast } from 'sonner';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAuth } from '@/contexts/AuthContext';
import { useTheme } from '@/contexts/ThemeContext';
import { useColorTheme } from '@/contexts/ColorThemeContext';
import { useLanguage, languages } from '@/contexts/LanguageContext';

const Settings = () => {
  const { currentUser, updatePassword } = useAuth();
  const { theme, setTheme } = useTheme();
  const { themeColor, setThemeColor } = useColorTheme();
  const { language, setLanguage, t } = useLanguage();
  
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isPasswordUpdating, setIsPasswordUpdating] = useState(false);
  
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [inAppAlerts, setInAppAlerts] = useState(true);

  const handlePasswordUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (newPassword !== confirmPassword) {
      toast.error("New passwords don't match");
      return;
    }
    
    if (newPassword.length < 6) {
      toast.error("Password should be at least 6 characters");
      return;
    }
    
    setIsPasswordUpdating(true);
    try {
      // This is just demo functionality - in production you'd verify current password first
      await updatePassword(newPassword);
      toast.success("Password updated successfully");
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (error) {
      toast.error("Failed to update password");
      console.error(error);
    } finally {
      setIsPasswordUpdating(false);
    }
  };

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
          <Card>
            <CardHeader>
              <CardTitle>{t('settings.appearance')}</CardTitle>
              <CardDescription>Customize how FitGenius looks</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="dark-mode">{t('settings.darkMode')}</Label>
                  <Switch 
                    id="dark-mode" 
                    checked={theme === 'dark'}
                    onCheckedChange={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                  />
                </div>
                
                <div className="space-y-2 mt-4">
                  <Label>{t('settings.language')}</Label>
                  <Select value={language} onValueChange={setLanguage}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select language" />
                    </SelectTrigger>
                    <SelectContent>
                      {languages.map((lang) => (
                        <SelectItem key={lang.value} value={lang.value}>
                          {lang.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2 mt-4">
                  <Label>{t('settings.themeColors')}</Label>
                  <div className="flex space-x-2">
                    <Button 
                      variant={themeColor === 'gold' ? 'default' : 'outline'} 
                      onClick={() => setThemeColor('gold')}
                      className="bg-gold text-white hover:bg-gold-dark"
                    >
                      {t('settings.colorGold')}
                    </Button>
                    <Button 
                      variant={themeColor === 'red' ? 'default' : 'outline'} 
                      onClick={() => setThemeColor('red')}
                      className="bg-red-500 text-white hover:bg-red-600"
                    >
                      {t('settings.colorRed')}
                    </Button>
                    <Button 
                      variant={themeColor === 'blue' ? 'default' : 'outline'} 
                      onClick={() => setThemeColor('blue')}
                      className="bg-blue-500 text-white hover:bg-blue-600"
                    >
                      {t('settings.colorBlue')}
                    </Button>
                    <Button 
                      variant={themeColor === 'green' ? 'default' : 'outline'} 
                      onClick={() => setThemeColor('green')}
                      className="bg-green-500 text-white hover:bg-green-600"
                    >
                      {t('settings.colorGreen')}
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="notifications">
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
        </TabsContent>
        
        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle>{t('settings.password')}</CardTitle>
              <CardDescription>Update your password to keep your account secure</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handlePasswordUpdate} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="current-password">{t('settings.currentPassword')}</Label>
                  <Input 
                    id="current-password" 
                    type="password" 
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="new-password">{t('settings.newPassword')}</Label>
                  <Input 
                    id="new-password" 
                    type="password" 
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="confirm-password">{t('settings.confirmPassword')}</Label>
                  <Input 
                    id="confirm-password" 
                    type="password" 
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </div>
                
                <Button type="submit" disabled={isPasswordUpdating}>
                  {isPasswordUpdating ? "Updating..." : t('settings.update')}
                </Button>
              </form>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button 
                variant="destructive" 
                onClick={() => {
                  // This would typically show a confirmation dialog
                  toast.error("This is a demo feature");
                }}
              >
                {t('settings.signOut')}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Settings;
