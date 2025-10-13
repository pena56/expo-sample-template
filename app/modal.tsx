import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import * as React from 'react';
import { View } from 'react-native';
import * as Application from 'expo-application';

export default function Screen() {
  return (
    <View className="flex-1 items-center justify-center gap-8 p-4">
      <View className="gap-2 p-4">
        <Text className="ios:text-foreground font-mono text-sm text-muted-foreground">
          APP ID: {Application.applicationId}
        </Text>

        <Button>
          <Text>Login</Text>
        </Button>
      </View>
    </View>
  );
}
