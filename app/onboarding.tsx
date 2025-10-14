import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import * as React from 'react';
import { View } from 'react-native';
import { useAuthStore } from '@/store/auth-store';

export default function Screen() {
  const { completeOnboarding } = useAuthStore();

  return (
    <View className="flex-1 items-center justify-center gap-8 p-4">
      <View className="gap-2 p-4">
        <Text className="ios:text-foreground font-mono text-sm text-muted-foreground">
          Onboarding Screen
        </Text>

        <Button onPress={completeOnboarding}>
          <Text>Complete Onboarding</Text>
        </Button>
      </View>
    </View>
  );
}
