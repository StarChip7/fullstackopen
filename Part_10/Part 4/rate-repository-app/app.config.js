import 'dotenv/config';

export default {
  name: 'rate-repository-app',
  slug: 'rate-repository-app',
  version: '1.0.0',
  orientation: 'portrait',
  icon: './assets/icon.png',
  userInterfaceStyle: 'light',
  splash: {
    image: './assets/splash.png',
    resizeMode: 'contain',
    backgroundColor: '#ffffff',
  },
  assetBundlePatterns: ['**/*'],
  ios: {
    supportsTablet: true,
  },
  android: {
    package: 'com.harish.raterepositoryapp',
    adaptiveIcon: {
      foregroundImage: './assets/adaptive-icon.png',
      backgroundColor: '#ffffff',
    },
    permissions: ['android.permission.DETECT_SCREEN_CAPTURE'],
  },
  web: {
    favicon: './assets/favicon.png',
  },
  extra: {
    apiUrl: process.env.API_URL || 'http://localhost:5000/api',
    graphqlUrl: process.env.GRAPHQL_URL || 'http://127.0.1:4000/graphql',
    environment: process.env.ENVIRONMENT || 'development',
  },
};
