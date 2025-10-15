/* eslint-disable max-lines-per-function */
import type { ConfigContext, ExpoConfig } from '@expo/config';
import type { AppIconBadgeConfig } from 'app-icon-badge/types';
import { version } from './package.json';

const EAS_PROJECT_ID = '308d5d5c-43d6-46a6-93b0-79547d296355';
const PROJECT_SLUG = 'sampletemplate';
const OWNER = 'pena56';
const BUNDLE_IDENTIFIER = 'com.sampleTemplate'; // ios bundle id
const PACKAGE_NAME = 'com.sampleTemplate'; // android package name
const APP_NAME = 'SampleTemplate'; // app name
const SCHEME = 'sampletemplate'; // app scheme

const appIconBadgeConfig: AppIconBadgeConfig = {
  enabled: process.env.APP_ENV !== 'production',
  badges: [
    {
      text: process.env.APP_ENV ?? 'development',
      type: 'banner',
      color: 'white',
    },
    {
      text: version,
      type: 'ribbon',
      color: 'white',
    },
  ],
};

export default ({ config }: ConfigContext): ExpoConfig => {
  const { name, bundleIdentifier, packageName, scheme, googleServicesFile } = getDynamicAppConfig(
    (process.env.APP_ENV as 'development' | 'preview' | 'production') || 'development'
  );

  return {
    ...config,
    name: name,
    description: `${name} Mobile App`,
    owner: OWNER,
    scheme: scheme,
    slug: PROJECT_SLUG,
    version: version, // Automatically bump your project version with `pnpm version patch`, `pnpm version minor` or `pnpm version major`.
    orientation: 'portrait',
    icon: './assets/images/icon.png',
    userInterfaceStyle: 'automatic',
    newArchEnabled: true,
    splash: {
      image: './assets/images/splash.png',
      resizeMode: 'contain',
      backgroundColor: '#ffffff',
    },
    updates: {
      url: `https://u.expo.dev/${EAS_PROJECT_ID}`,
    },
    runtimeVersion: {
      policy: 'appVersion',
    },
    assetBundlePatterns: ['**/*'],
    ios: {
      supportsTablet: true,
      bundleIdentifier: bundleIdentifier,
      infoPlist: {
        ITSAppUsesNonExemptEncryption: false,
      },
    },
    experiments: {
      typedRoutes: true,
    },
    android: {
      edgeToEdgeEnabled: true,
      adaptiveIcon: {
        foregroundImage: './assets/images/adaptive-icon.png',
        backgroundColor: '#ffffff',
      },
      package: packageName,
      googleServicesFile,
    },
    web: {
      bundler: 'metro',
      output: 'static',
      favicon: './assets/images/favicon.png',
    },
    plugins: [
      'expo-router',
      ['app-icon-badge', appIconBadgeConfig],
      'expo-sqlite',
      'expo-notifications',
    ],
    extra: {
      eas: {
        projectId: EAS_PROJECT_ID,
      },
    },
  };
};

export const getDynamicAppConfig = (environment: 'development' | 'preview' | 'production') => {
  if (environment === 'production') {
    return {
      name: APP_NAME,
      bundleIdentifier: BUNDLE_IDENTIFIER,
      packageName: PACKAGE_NAME,
      scheme: SCHEME,
      googleServicesFile: './prod-google-services.json',
    };
  }

  if (environment === 'preview') {
    return {
      name: `${APP_NAME} Preview`,
      bundleIdentifier: `${BUNDLE_IDENTIFIER}.preview`,
      packageName: `${PACKAGE_NAME}.preview`,
      scheme: `${SCHEME}-prev`,
      googleServicesFile: './preview-google-services.json',
    };
  }

  return {
    name: `${APP_NAME} Development`,
    bundleIdentifier: `${BUNDLE_IDENTIFIER}.dev`,
    packageName: `${PACKAGE_NAME}.dev`,
    scheme: `${SCHEME}-dev`,
    googleServicesFile: './dev-google-services.json',
  };
};
