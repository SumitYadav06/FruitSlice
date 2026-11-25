import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.fruitslice.game',
  appName: 'Fruit Slice',
  webDir: 'www',
  backgroundColor: '#FFF3E0',
  android: {
    allowMixedContent: true,
  },
};

export default config;
