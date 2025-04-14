
/// <reference types="google.maps" />

// This file helps TypeScript recognize the Google Maps API
// By adding this declaration file, we're telling TypeScript that the global 'google' object exists
declare global {
  interface Window {
    google: typeof google;
  }
}

export {};
