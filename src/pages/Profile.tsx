
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAuth } from '@/contexts/AuthContext';
import { useOnboarding } from '@/contexts/OnboardingContext';
import { useLanguage } from '@/contexts/LanguageContext';

const Profile = () => {
  const { currentUser } = useAuth();
  const { onboardingData } = useOnboarding();
  const { t } = useLanguage();
  
  return (
    <div className="container max-w-4xl py-8 px-4 md:px-6">
      <div className="flex flex-col gap-8">
        <div className="flex flex-col items-center gap-4 md:flex-row">
          <Avatar className="h-24 w-24">
            <AvatarImage src={currentUser?.photoURL || ""} alt={onboardingData?.name || "User"} />
            <AvatarFallback className="text-2xl bg-primary text-primary-foreground">
              {onboardingData?.name ? onboardingData.name.charAt(0).toUpperCase() : 'U'}
            </AvatarFallback>
          </Avatar>
          <div className="text-center md:text-left">
            <h1 className="text-3xl font-bold">{onboardingData?.name || t('profile.user')}</h1>
            <p className="text-muted-foreground">{currentUser?.email}</p>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>{t('profile.personalInfo')}</CardTitle>
            <CardDescription>{t('profile.profileInfo')}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-muted-foreground">{t('profile.name')}</p>
                <p>{onboardingData?.name || t('profile.notProvided')}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">{t('profile.age')}</p>
                <p>{onboardingData?.age || t('profile.notProvided')}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">{t('profile.email')}</p>
                <p>{currentUser?.email || t('profile.notProvided')}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{t('profile.workoutPreferences')}</CardTitle>
            <CardDescription>{t('profile.workoutSettings')}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-muted-foreground">{t('profile.workoutDuration')}</p>
                <p>{onboardingData?.workoutDuration || t('profile.notProvided')}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">{t('profile.workoutDays')}</p>
                <p>{onboardingData?.workoutDaysPerWeek || t('profile.notProvided')}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">{t('profile.height')}</p>
                <p>{onboardingData?.height ? `${onboardingData.height} cm` : t('profile.notProvided')}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">{t('profile.weight')}</p>
                <p>{onboardingData?.weight ? `${onboardingData.weight} kg` : t('profile.notProvided')}</p>
              </div>
              <div className="col-span-full">
                <p className="text-sm font-medium text-muted-foreground">{t('profile.allergies')}</p>
                <p>{onboardingData?.allergies || t('profile.none')}</p>
              </div>
              {onboardingData?.bmi && (
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{t('profile.bmi')}</p>
                  <p>{onboardingData.bmi.toFixed(1)}</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Profile;
