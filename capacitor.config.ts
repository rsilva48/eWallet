import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.harusoft.rsewallet',
  appName: 'RSeWallet',
  webDir: 'www',
  server: {
    androidScheme: 'https'
  }
};

export default config;
