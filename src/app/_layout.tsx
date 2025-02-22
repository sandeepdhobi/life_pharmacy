import { useEffect } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Stack } from 'expo-router';
import { CartProvider } from '../context/CartContext';
import { CartButton } from '../components/CartButton';
import * as Font from 'expo-font';
import { Platform, View } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';

const queryClient = new QueryClient();

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded] = Font.useFonts({
    'Onest-Light': require('../../assets/fonts/Onest-Light.ttf'),
    'Onest-Regular': require('../../assets/fonts/Onest-Regular.ttf'),
    'Onest-Medium': require('../../assets/fonts/Onest-Medium.ttf'),
    'Onest-SemiBold': require('../../assets/fonts/Onest-SemiBold.ttf'),
    'Onest-Bold': require('../../assets/fonts/Onest-Bold.ttf'),
  });

  useEffect(() => {
    const hideSplash = async () => {
      if (fontsLoaded) {
        // Wait for 2 seconds before hiding splash screen
        await new Promise(resolve => setTimeout(resolve, 3000));
        await SplashScreen.hideAsync();
      }
    };
    
    hideSplash();
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  const formSheet = Platform.OS === 'ios' ? 'formSheet' : 'modal';

  return (
    <QueryClientProvider client={queryClient}>
      <CartProvider>
        <View style={{ flex: 1 }}>
          <Stack>
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen name="product/[slug]" options={{ title: 'Product Details', headerRight: () => <CartButton /> }} />
            <Stack.Screen name="Cart/index" options={{ presentation: formSheet, title: 'Shopping Cart' }} />
          </Stack>
        </View>
      </CartProvider>
    </QueryClientProvider>
  );
} 