import { View, ViewStyle, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface LayoutProps {
  children: React.ReactNode;
  scrollable?: boolean;
  bottomPadding?: number;
  topPadding?: number;
  horizontalPadding?: boolean;
  paddingHorizontal?: number;
  keyboardAvoiding?: boolean;
}

export function Layout({
  children,
  bottomPadding = 8,
  horizontalPadding = true,
  keyboardAvoiding = true,
  paddingHorizontal = 24,
  scrollable = true,
  topPadding = 8,
}: LayoutProps) {
  const insets = useSafeAreaInsets();

  // Calculate safe area padding
  const safePaddingTop = insets.top + topPadding;
  const safePaddingBottom = insets.bottom + bottomPadding;

  const containerStyles: ViewStyle = {
    flex: 1,
    paddingTop: safePaddingTop,
  };

  const contentContainerStyles: ViewStyle = {
    flexGrow: 1,
    paddingBottom: safePaddingBottom,
    ...(horizontalPadding && { paddingHorizontal }),
  };

  // Render content with or without scroll
  const renderContent = () => {
    if (scrollable) {
      return (
        <ScrollView
          contentContainerStyle={contentContainerStyles}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}>
          {children}
        </ScrollView>
      );
    }

    return <View style={[contentContainerStyles, { flex: 1 }]}>{children}</View>;
  };

  return (
    <>
      {keyboardAvoiding ? (
        <KeyboardAvoidingView
          style={containerStyles}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}>
          {renderContent()}
        </KeyboardAvoidingView>
      ) : (
        <View style={containerStyles}>{renderContent()}</View>
      )}
    </>
  );
}
