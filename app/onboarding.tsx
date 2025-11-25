import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import * as React from 'react';
import { Image, Pressable, View } from 'react-native';
import { useAuthStore } from '@/store/auth-store';
import { ArrowBigLeft, ArrowBigRight } from 'lucide-react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
  interpolate,
  Extrapolate,
} from 'react-native-reanimated';

const data = [
  {
    id: 1,
    imageSrc: require('@/assets/images/onboarding-1.png'),
    title: 'Verified professionals',
    subtitle:
      'All service providers are thoroughly vetted to ensure their licenses, certifications, and educational claims are valid and up to date to ensure they have the required expertise.',
  },
  {
    id: 2,
    imageSrc: require('@/assets/images/onboarding-2.png'),
    title: 'Secure escrow payments',
    subtitle:
      'You are protected from paying upfront for work that is never started, incomplete, or of poor quality. Funds are only released after you inspect and approve the finished work.',
  },
  {
    id: 3,
    imageSrc: require('@/assets/images/onboarding-3.png'),
    title: 'Real-time tracking',
    subtitle:
      "Track your provider live and know exactly when they'll reach you. No guessing, no waiting in the dark.",
  },
];

export default function Screen() {
  const { completeOnboarding } = useAuthStore();
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const progress = useSharedValue(0);

  const handleNext = () => {
    if (currentIndex < data.length - 1) {
      setCurrentIndex(currentIndex + 1);
      progress.value = withSpring(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      progress.value = withSpring(currentIndex - 1);
    }
  };

  const imageAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: withTiming(1, { duration: 400 }),
      transform: [
        {
          scale: withSpring(1, {
            damping: 15,
            stiffness: 100,
          }),
        },
        {
          translateY: 80,
        },
      ],
    };
  });

  const contentAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: withTiming(1, { duration: 300 }),
      transform: [
        {
          translateY: withSpring(0, {
            damping: 20,
            stiffness: 90,
          }),
        },
      ],
    };
  });

  React.useEffect(() => {
    progress.value = withSpring(currentIndex);
  }, [currentIndex]);

  const isFirstSlide = currentIndex === 0;
  const isLastSlide = currentIndex === data.length - 1;

  return (
    <View className="relative flex-1 bg-background">
      <Image
        source={require('@/assets/images/onboarding-bg.png')}
        className="inset-0 h-full w-full flex-1 object-cover"
      />
      <View className="absolute inset-0 flex-1 items-center justify-center px-6 py-[26px]">
        <View className="flex h-full w-full items-center justify-center">
          {/* Animated Image */}
          <Animated.View
            key={`image-${data[currentIndex].id}`}
            style={imageAnimatedStyle}
            className="z-10 h-[50%] w-[90%]">
            <Image source={data[currentIndex].imageSrc} className="h-full w-full object-contain" />
          </Animated.View>

          <View className="flex h-[50%] w-full justify-end rounded-sm rounded-tr-[70px] bg-white px-4 py-[22px]">
            <Animated.View
              key={`content-${data[currentIndex].id}`}
              style={contentAnimatedStyle}
              className="flex gap-4">
              <View className="flex gap-2">
                {/* Animated Title */}
                <Text className="text-[20px] font-bold text-[#737381]">
                  {data[currentIndex].title}
                </Text>
                <View className="h-[2px] w-10 rounded-sm bg-secondary" />
                {/* Animated Subtitle */}
                <Text className="text-[#737381]">{data[currentIndex].subtitle}</Text>
              </View>

              <View className="flex flex-row items-center justify-between">
                {/* Animated Indicators */}
                <View className="flex flex-row gap-1">
                  {data.map((_, index) => {
                    const indicatorStyle = useAnimatedStyle(() => {
                      const isActive = index === currentIndex;
                      return {
                        backgroundColor: withTiming(isActive ? '#1B1B1E' : '#DFDFE1', {
                          duration: 300,
                        }),
                        width: withSpring(isActive ? 8 : 8),
                        height: withSpring(isActive ? 8 : 8),
                      };
                    });

                    return (
                      <Animated.View key={index} style={indicatorStyle} className="rounded-full" />
                    );
                  })}
                </View>

                <View className="flex flex-row items-center gap-4">
                  {/* Left Arrow Navigator */}
                  <Pressable
                    onPress={handlePrev}
                    disabled={isFirstSlide}
                    className={`flex h-8 w-8 items-center justify-center rounded-[8px] border ${
                      isFirstSlide
                        ? 'border-[#B4B4BC] bg-transparent'
                        : 'border-[#1B1B1E] bg-[#1B1B1E]'
                    }`}>
                    <ArrowBigLeft
                      size={16}
                      color={isFirstSlide ? '#B4B4BC' : '#FFFFFF'}
                      fill={isFirstSlide ? 'transparent' : '#FFFFFF'}
                    />
                  </Pressable>

                  {/* Right Arrow Navigator */}
                  <Pressable
                    onPress={handleNext}
                    disabled={isLastSlide}
                    className={`flex h-8 w-8 items-center justify-center rounded-[8px] border ${
                      isLastSlide
                        ? 'border-[#B4B4BC] bg-transparent'
                        : 'border-[#1B1B1E] bg-[#1B1B1E]'
                    }`}>
                    <ArrowBigRight
                      fill={isLastSlide ? 'transparent' : '#FFFFFF'}
                      size={16}
                      color={isLastSlide ? '#B4B4BC' : '#FFFFFF'}
                    />
                  </Pressable>
                </View>
              </View>

              <Button className="mt-2" onPress={completeOnboarding}>
                Get Started
              </Button>
            </Animated.View>
          </View>
        </View>
      </View>
    </View>
  );
}
