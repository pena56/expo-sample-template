import { Stack } from 'expo-router';

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerShown: false,
          title: 'Profile',
        }}
      />
      <Stack.Screen
        name="personal"
        options={{
          headerShown: false,
          title: 'Personal Details',
        }}
      />
      <Stack.Screen
        name="password"
        options={{
          headerShown: false,
          title: 'Password',
        }}
      />
      <Stack.Screen
        name="password-otp"
        options={{
          headerShown: false,
          title: 'Password',
        }}
      />
      <Stack.Screen
        name="new-password"
        options={{
          headerShown: false,
          title: 'Create new password',
        }}
      />
      <Stack.Screen
        name="disputes"
        options={{
          headerShown: false,
          title: 'Disputes',
        }}
      />
      <Stack.Screen
        name="dispute-detail"
        options={{
          headerShown: false,
          title: 'Disputes',
        }}
      />
      <Stack.Screen
        name="promo"
        options={{
          headerShown: false,
          title: 'Promotions & Rewards',
        }}
      />
    </Stack>
  );
}
