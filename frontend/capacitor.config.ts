import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.ns.OfficeWing',
  appName: 'OfficeWing',
  webDir: 'dist/frontend/browser',
  server: {
    androidScheme: 'http',
    cleartext: true
  }
};

export default config;