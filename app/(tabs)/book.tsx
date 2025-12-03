import { Text } from '@/components/ui/text';
import * as React from 'react';
import { View } from 'react-native';
import * as Application from 'expo-application';
import { Layout } from '@/components/layout';

export default function Screen() {
  return (
    <Layout>
      <View className="flex-1 items-center justify-center gap-8 p-4">
        <View className="gap-2 p-4">
          <Text className="ios:text-foreground font-mono text-sm text-muted-foreground">
            APP ID: {Application.applicationId}
          </Text>
          <Text className="ios:text-foreground font-mono text-sm text-muted-foreground">
            APP NAME: {Application.applicationName}
          </Text>
          <Text className="ios:text-foreground font-mono text-sm text-muted-foreground">
            VERSION: {Application.nativeApplicationVersion}
          </Text>
          <Text className="ios:text-foreground font-mono text-sm text-muted-foreground">
            BUILD: {Application.nativeBuildVersion}
          </Text>
        </View>
      </View>
    </Layout>
  );
}
