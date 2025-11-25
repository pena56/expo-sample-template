import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import * as React from 'react';
import { Image, View } from 'react-native';
import { useAuthStore } from '@/store/auth-store';
import { Icon } from '@/components/ui/icon';
import { ArrowBigDown, ArrowLeft, ArrowRight } from 'lucide-react-native';

export default function Screen() {
  const { completeOnboarding } = useAuthStore();

  return (
    <View className="relative flex-1 bg-background">
      <Image
        source={require('@/assets/images/onboarding-bg.png')}
        className="inset-0 h-full w-full flex-1 object-cover"
      />

      <View className="absolute inset-0 flex-1 items-center justify-center px-6 py-[26px]">
        <View className="flex h-full w-full items-center justify-center">
          <Image
            source={require('@/assets/images/onboarding-1.png')}
            className="z-10 h-[50%] w-[50%] translate-y-20 object-contain"
          />

          <View className="flex h-[50%] w-full justify-end rounded-sm rounded-tr-[70px] bg-white px-4 py-[22px]">
            <View className="flex gap-4">
              <View className="flex gap-2">
                <Text className="text-[20px] font-bold text-[#737381]">Verified professionals</Text>

                <View className="h-[2px] w-10 rounded-sm bg-secondary" />

                <Text className="text-[#737381]">
                  All service providers are thoroughly vetted to ensure their licenses,
                  certifications, and educational claims are valid and up to date to ensure they
                  have the required expertise.
                </Text>
              </View>

              <View className="flex flex-row items-center justify-between">
                <View className="flex flex-row gap-1">
                  <View className="h-2 w-2 rounded-full bg-[#1B1B1E]" />
                  <View className="h-2 w-2 rounded-full bg-[#DFDFE1]" />
                  <View className="h-2 w-2 rounded-full bg-[#DFDFE1]" />
                </View>

                <View className="flex flex-row items-center gap-4">
                  <Button
                    className="h-8 w-8 rounded-[8px] border border-[#B4B4BC] bg-transparent"
                    icon={<Icon as={ArrowLeft} />}></Button>

                  <Button
                    className="h-8 w-8 rounded-[8px] border border-[#B4B4BC] bg-transparent"
                    icon={<Icon as={ArrowRight} />}></Button>
                </View>
              </View>

              <Button className="mt-2" onPress={completeOnboarding}>
                Get Started
              </Button>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}
