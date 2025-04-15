
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';

const SecuritySettings = () => {
  const { updatePassword } = useAuth();
  const { t } = useLanguage();
  
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isPasswordUpdating, setIsPasswordUpdating] = useState(false);

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
      // In a real app, you'd pass the current password to verify the user
      // For this demo app, we're just passing the new password
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
  );
};

export default SecuritySettings;
