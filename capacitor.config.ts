
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.4933a8b63c354d29a35dbf6097d32a75',
  appName: 'FitGenius',
  webDir: 'dist',
  server: {
    url: 'https://4933a8b6-3c35-4d29-a35d-bf6097d32a75.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  android: {
    buildOptions: {
      keystorePath: undefined,
      keystoreAlias: undefined,
      keystorePassword: undefined,
      keystoreAliasPassword: undefined,
      releaseType: undefined,
    }
  },
  ios: {
    contentInset: 'automatic',
  }
};

export default config;
