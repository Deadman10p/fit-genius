
import React from 'react';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useTheme } from '@/contexts/ThemeContext';
import { useColorTheme } from '@/contexts/ColorThemeContext';
import { useLanguage, languages } from '@/contexts/LanguageContext';

const AppearanceSettings = () => {
  const { theme, setTheme } = useTheme();
  const { themeColor, setThemeColor } = useColorTheme();
  const { language, setLanguage, t } = useLanguage();

  return (
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
  );
};

export default AppearanceSettings;
