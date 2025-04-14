
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useTheme } from '@/contexts/ThemeContext';
import { useColorTheme } from '@/contexts/ColorThemeContext';
import { useLanguage, languages } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';
import { Moon, Sun, Bell, Globe, Lock, LogOut, Palette } from 'lucide-react';
import { logAnalyticsEvent } from '@/utils/analytics';

const passwordSchema = z.object({
  currentPassword: z.string().min(6, {
    message: 'Current password must be at least 6 characters.',
  }),
  newPassword: z.string().min(6, {
    message: 'New password must be at least 6 characters.',
  }),
  confirmPassword: z.string().min(6, {
    message: 'Confirm password must be at least 6 characters.',
  }),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
});

type PasswordFormData = z.infer<typeof passwordSchema>;

const Settings = () => {
  const navigate = useNavigate();
  const { currentUser, signOut } = useAuth();
  const { theme, setTheme } = useTheme();
  const { themeColor, setThemeColor } = useColorTheme();
  const { language, setLanguage, t } = useLanguage();
  
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [inAppAlerts, setInAppAlerts] = useState(true);
  
  const form = useForm<PasswordFormData>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
  });
  
  const handleChangePassword = (data: PasswordFormData) => {
    // In a real app, you would call an API here
    console.log('Password change requested:', data);
    
    // Log to Firebase Analytics
    logAnalyticsEvent('password_change_attempt', {
      success: true,
    });
    
    toast.success('Password changed successfully!');
    form.reset();
  };
  
  const handleToggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    
    // Log to Firebase Analytics
    logAnalyticsEvent('theme_change', {
      theme: newTheme,
    });
  };
  
  const handleThemeColorChange = (color: "gold" | "red" | "blue" | "green") => {
    setThemeColor(color);
    
    // Log to Firebase Analytics
    logAnalyticsEvent('theme_color_change', {
      color: color,
    });
    
    toast.success(`Theme color changed to ${color}!`);
  };
  
  const handleNotificationChange = (type: string, value: boolean) => {
    if (type === 'email') setEmailNotifications(value);
    if (type === 'push') setPushNotifications(value);
    if (type === 'inApp') setInAppAlerts(value);
    
    // Log to Firebase Analytics
    logAnalyticsEvent('notification_preference_change', {
      type,
      enabled: value,
    });
  };
  
  const handleLanguageChange = (value: string) => {
    setLanguage(value);
    
    // Log to Firebase Analytics
    logAnalyticsEvent('language_change', {
      language: value,
    });
    
    toast.success(`Language changed to ${languages.find(lang => lang.value === value)?.label}!`);
  };
  
  const handleSignOut = async () => {
    try {
      await signOut();
      navigate("/login");
    } catch (error: any) {
      toast.error(`Failed to sign out: ${error.message}`);
    }
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">{t('settings.title')}</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Change Password */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Lock className="mr-2 h-5 w-5 text-primary" /> 
              {t('settings.password')}
            </CardTitle>
            <CardDescription>Update your account password</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleChangePassword)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="currentPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('settings.currentPassword')}</FormLabel>
                      <FormControl>
                        <Input type="password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="newPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('settings.newPassword')}</FormLabel>
                      <FormControl>
                        <Input type="password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('settings.confirmPassword')}</FormLabel>
                      <FormControl>
                        <Input type="password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit">{t('settings.update')}</Button>
              </form>
            </Form>
          </CardContent>
        </Card>
        
        {/* Theme Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              {theme === 'dark' ? (
                <Moon className="mr-2 h-5 w-5 text-primary" />
              ) : (
                <Sun className="mr-2 h-5 w-5 text-primary" />
              )}
              {t('settings.appearance')}
            </CardTitle>
            <CardDescription>Customize the look and feel of the application</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="theme-mode">{t('settings.darkMode')}</Label>
                <p className="text-sm text-muted-foreground">
                  Switch between light and dark themes
                </p>
              </div>
              <Switch
                id="theme-mode"
                checked={theme === 'dark'}
                onCheckedChange={handleToggleTheme}
              />
            </div>
            
            <div>
              <Label className="block mb-2">Theme Color</Label>
              <div className="flex space-x-3">
                <button 
                  onClick={() => handleThemeColorChange('gold')}
                  className={`w-10 h-10 rounded-full bg-[#D4AF37] flex items-center justify-center border-2 transition-all ${themeColor === 'gold' ? 'border-black dark:border-white scale-110' : 'border-transparent opacity-70'}`}
                  aria-label="Gold theme"
                >
                  {themeColor === 'gold' && <Palette className="h-5 w-5 text-white" />}
                </button>
                <button 
                  onClick={() => handleThemeColorChange('red')}
                  className={`w-10 h-10 rounded-full bg-red-500 flex items-center justify-center border-2 transition-all ${themeColor === 'red' ? 'border-black dark:border-white scale-110' : 'border-transparent opacity-70'}`}
                  aria-label="Red theme"
                >
                  {themeColor === 'red' && <Palette className="h-5 w-5 text-white" />}
                </button>
                <button 
                  onClick={() => handleThemeColorChange('blue')}
                  className={`w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center border-2 transition-all ${themeColor === 'blue' ? 'border-black dark:border-white scale-110' : 'border-transparent opacity-70'}`}
                  aria-label="Blue theme"
                >
                  {themeColor === 'blue' && <Palette className="h-5 w-5 text-white" />}
                </button>
                <button 
                  onClick={() => handleThemeColorChange('green')}
                  className={`w-10 h-10 rounded-full bg-green-600 flex items-center justify-center border-2 transition-all ${themeColor === 'green' ? 'border-black dark:border-white scale-110' : 'border-transparent opacity-70'}`}
                  aria-label="Green theme"
                >
                  {themeColor === 'green' && <Palette className="h-5 w-5 text-white" />}
                </button>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Notification Preferences */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Bell className="mr-2 h-5 w-5 text-primary" />
              {t('settings.notification')}
            </CardTitle>
            <CardDescription>Manage how you receive notifications</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="email-notifications">{t('settings.email')}</Label>
                <p className="text-sm text-muted-foreground">
                  Receive notifications via email
                </p>
              </div>
              <Switch
                id="email-notifications"
                checked={emailNotifications}
                onCheckedChange={(checked) => handleNotificationChange('email', checked)}
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="push-notifications">{t('settings.push')}</Label>
                <p className="text-sm text-muted-foreground">
                  Receive notifications on your device
                </p>
              </div>
              <Switch
                id="push-notifications"
                checked={pushNotifications}
                onCheckedChange={(checked) => handleNotificationChange('push', checked)}
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="in-app-alerts">{t('settings.inApp')}</Label>
                <p className="text-sm text-muted-foreground">
                  Receive notifications within the app
                </p>
              </div>
              <Switch
                id="in-app-alerts"
                checked={inAppAlerts}
                onCheckedChange={(checked) => handleNotificationChange('inApp', checked)}
              />
            </div>
          </CardContent>
        </Card>
        
        {/* Language Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Globe className="mr-2 h-5 w-5 text-primary" />
              {t('settings.language')}
            </CardTitle>
            <CardDescription>Choose your preferred language</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Label htmlFor="language">{t('settings.language')}</Label>
              <Select value={language} onValueChange={handleLanguageChange}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a language" />
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
          </CardContent>
        </Card>
      </div>
      
      {/* Sign Out Button */}
      <div className="mt-8">
        <Button variant="destructive" onClick={handleSignOut} className="flex items-center">
          <LogOut className="mr-2 h-4 w-4" />
          {t('settings.signOut')}
        </Button>
      </div>
    </div>
  );
};

export default Settings;
