// Move all content from src/app/_layout.tsx here
// Keep the same code, just rename the component to AppNavigation
import { useEffect } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Stack } from 'expo-router';
import { CartProvider } from '../context/CartContext';
import { CartButton } from '../components/CartButton';
import * as Font from 'expo-font';
import { useCallback } from 'react';
import { View } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';

const queryClient = new QueryClient();

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

export default function Layout() {
  const [fontsLoaded] = Font.useFonts({
    'Onest-Light': require('../../assets/fonts/Onest-Light.ttf'),
    'Onest-Regular': require('../../assets/fonts/Onest-Regular.ttf'),
    'Onest-Medium': require('../../assets/fonts/Onest-Medium.ttf'),
    'Onest-SemiBold': require('../../assets/fonts/Onest-SemiBold.ttf'),
    'Onest-Bold': require('../../assets/fonts/Onest-Bold.ttf'),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <CartProvider>
        <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
          <Stack>
            <Stack.Screen
              name="index"
              options={{
                title: 'Products',
                headerRight: () => <CartButton />,
                headerTitleStyle: {
                  fontFamily: 'Onest-SemiBold',
                }
              }}
            />
            <Stack.Screen
              name="product/[slug]"
              options={{
                title: 'Product Details',
                headerRight: () => <CartButton />,
                headerTitleStyle: {
                  fontFamily: 'Onest-SemiBold',
                }
              }}
            />
            <Stack.Screen
              name="cart"
              options={{
                title: 'Shopping Cart',
                headerTitleStyle: {
                  fontFamily: 'Onest-SemiBold',
                }
              }}
            />
          </Stack>
        </View>
      </CartProvider>
    </QueryClientProvider>
  );
} 