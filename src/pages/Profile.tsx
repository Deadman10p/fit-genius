
import React from 'react';
import { Layout } from '@/components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAuth } from '@/contexts/AuthContext';
import { useOnboarding } from '@/contexts/OnboardingContext';

const Profile = () => {
  const { currentUser } = useAuth();
  const { onboardingData } = useOnboarding();
  
  return (
    <Layout>
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
              <h1 className="text-3xl font-bold">{onboardingData?.name || "User"}</h1>
              <p className="text-muted-foreground">{currentUser?.email}</p>
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>Your profile information from your account</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Name</p>
                  <p>{onboardingData?.name || "Not provided"}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Age</p>
                  <p>{onboardingData?.age || "Not provided"}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Email</p>
                  <p>{currentUser?.email || "Not provided"}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Workout Preferences</CardTitle>
              <CardDescription>Your workout settings and preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Workout Duration</p>
                  <p>{onboardingData?.workoutDuration || "Not provided"}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Workout Days</p>
                  <p>{onboardingData?.workoutDaysPerWeek || "Not provided"}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Height</p>
                  <p>{onboardingData?.height ? `${onboardingData.height} cm` : "Not provided"}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Weight</p>
                  <p>{onboardingData?.weight ? `${onboardingData.weight} kg` : "Not provided"}</p>
                </div>
                <div className="col-span-full">
                  <p className="text-sm font-medium text-muted-foreground">Allergies</p>
                  <p>{onboardingData?.allergies || "None"}</p>
                </div>
                {onboardingData?.bmi && (
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">BMI</p>
                    <p>{onboardingData.bmi.toFixed(1)}</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
