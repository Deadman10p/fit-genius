
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { auth, updateUserPassword, firebaseSignOut } from "@/config/firebase";
import { useTheme } from "@/contexts/ThemeContext";
import { useAuth } from "@/contexts/AuthContext";
import { logAnalyticsEvent } from "@/utils/analytics";
import { Layout } from "@/components/Layout";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { 
  Bell, 
  Settings as SettingsIcon, 
  Key, 
  Languages, 
  Globe, 
  Lock, 
  LogOut
} from "lucide-react";

// Password schema with validation
const passwordSchema = z.object({
  currentPassword: z.string().min(6, {
    message: "Current password must be at least 6 characters",
  }),
  newPassword: z.string().min(6, {
    message: "New password must be at least 6 characters",
  }),
  confirmPassword: z.string().min(6, {
    message: "Confirm password must be at least 6 characters",
  }),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type PasswordForm = z.infer<typeof passwordSchema>;

const Settings = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const { theme, setTheme } = useTheme();
  
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [inAppAlerts, setInAppAlerts] = useState(true);
  const [language, setLanguage] = useState("en");

  // Password form
  const form = useForm<PasswordForm>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const onPasswordSubmit = async (values: PasswordForm) => {
    try {
      await updateUserPassword(values.currentPassword, values.newPassword);
      
      // Log analytics event
      logAnalyticsEvent("password_updated", {
        userId: currentUser?.uid,
      });
      
      toast.success("Password updated successfully");
      form.reset();
    } catch (error: any) {
      toast.error(`Failed to update password: ${error.message}`);
    }
  };

  const handleSignOut = async () => {
    try {
      await firebaseSignOut();
      navigate("/login");
    } catch (error: any) {
      toast.error(`Failed to sign out: ${error.message}`);
    }
  };

  const handleThemeToggle = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    
    // Log analytics event
    logAnalyticsEvent("theme_changed", {
      userId: currentUser?.uid,
      theme: newTheme,
    });
  };

  const handleNotificationChange = (type: string, value: boolean) => {
    if (type === "email") setEmailNotifications(value);
    if (type === "push") setPushNotifications(value);
    if (type === "inApp") setInAppAlerts(value);
    
    // Log analytics event
    logAnalyticsEvent("notification_preference_changed", {
      userId: currentUser?.uid,
      notificationType: type,
      enabled: value,
    });
  };

  const handleLanguageChange = (value: string) => {
    setLanguage(value);
    
    // Log analytics event
    logAnalyticsEvent("language_changed", {
      userId: currentUser?.uid,
      language: value,
    });
  };

  if (!currentUser) {
    navigate("/login");
    return null;
  }

  return (
    <Layout>
      <div className="container mx-auto py-6 max-w-4xl">
        <div className="flex items-center gap-2 mb-6">
          <SettingsIcon className="h-6 w-6 text-primary" />
          <h1 className="text-3xl font-bold">Settings</h1>
        </div>

        {/* Change Password */}
        <Card className="mb-6">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Key className="h-5 w-5 text-primary" />
              <CardTitle>Change Password</CardTitle>
            </div>
            <CardDescription>
              Update your password to maintain account security
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onPasswordSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="currentPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Current Password</FormLabel>
                      <FormControl>
                        <Input 
                          type="password" 
                          placeholder="Enter current password" 
                          {...field} 
                        />
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
                      <FormLabel>New Password</FormLabel>
                      <FormControl>
                        <Input 
                          type="password" 
                          placeholder="Enter new password" 
                          {...field} 
                        />
                      </FormControl>
                      <FormDescription>
                        Password must be at least 6 characters
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm New Password</FormLabel>
                      <FormControl>
                        <Input 
                          type="password" 
                          placeholder="Confirm new password" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full">Update Password</Button>
              </form>
            </Form>
          </CardContent>
        </Card>

        {/* Theme Selection */}
        <Card className="mb-6">
          <CardHeader>
            <div className="flex items-center gap-2">
              {theme === "dark" ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                  <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path>
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                  <circle cx="12" cy="12" r="4"></circle>
                  <path d="M12 2v2"></path>
                  <path d="M12 20v2"></path>
                  <path d="m4.93 4.93 1.41 1.41"></path>
                  <path d="m17.66 17.66 1.41 1.41"></path>
                  <path d="M2 12h2"></path>
                  <path d="M20 12h2"></path>
                  <path d="m6.34 17.66-1.41 1.41"></path>
                  <path d="m19.07 4.93-1.41 1.41"></path>
                </svg>
              )}
              <CardTitle>Theme Selection</CardTitle>
            </div>
            <CardDescription>
              Choose between light and dark mode for the application
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <Label htmlFor="theme-mode">Dark Mode</Label>
              <Switch 
                id="theme-mode" 
                checked={theme === "dark"} 
                onCheckedChange={handleThemeToggle} 
              />
            </div>
          </CardContent>
        </Card>

        {/* Notification Preferences */}
        <Card className="mb-6">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Bell className="h-5 w-5 text-primary" />
              <CardTitle>Notification Preferences</CardTitle>
            </div>
            <CardDescription>
              Manage how you receive notifications from the app
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="email-notifications">Email Notifications</Label>
              <Switch 
                id="email-notifications" 
                checked={emailNotifications} 
                onCheckedChange={(checked) => handleNotificationChange("email", checked)} 
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="push-notifications">Push Notifications</Label>
              <Switch 
                id="push-notifications" 
                checked={pushNotifications} 
                onCheckedChange={(checked) => handleNotificationChange("push", checked)} 
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="in-app-alerts">In-App Alerts</Label>
              <Switch 
                id="in-app-alerts" 
                checked={inAppAlerts} 
                onCheckedChange={(checked) => handleNotificationChange("inApp", checked)} 
              />
            </div>
          </CardContent>
        </Card>

        {/* Language Selection */}
        <Card className="mb-6">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Globe className="h-5 w-5 text-primary" />
              <CardTitle>Language Selection</CardTitle>
            </div>
            <CardDescription>
              Choose your preferred language for the application
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col space-y-2">
              <Label htmlFor="language-select">Select Language</Label>
              <Select value={language} onValueChange={handleLanguageChange}>
                <SelectTrigger id="language-select">
                  <SelectValue placeholder="Select a language" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="es">Spanish</SelectItem>
                  <SelectItem value="fr">French</SelectItem>
                  <SelectItem value="de">German</SelectItem>
                  <SelectItem value="zh">Chinese</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Sign Out Button */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <LogOut className="h-5 w-5 text-destructive" />
              <CardTitle>Account</CardTitle>
            </div>
            <CardDescription>
              Sign out from your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button 
              variant="destructive" 
              className="w-full"
              onClick={handleSignOut}
            >
              Sign Out
            </Button>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Settings;
