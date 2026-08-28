import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, AppState, AppStateStatus } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import * as Updates from 'expo-updates';
import {
  useFonts,
  PlusJakartaSans_400Regular,
  PlusJakartaSans_500Medium,
  PlusJakartaSans_600SemiBold,
  PlusJakartaSans_700Bold,
  PlusJakartaSans_800ExtraBold,
} from '@expo-google-fonts/plus-jakarta-sans';
import {
  Nunito_600SemiBold,
  Nunito_700Bold,
  Nunito_800ExtraBold,
  Nunito_900Black,
} from '@expo-google-fonts/nunito';
import { TabNavigator } from './src/navigation/TabNavigator';

export default function App() {
  const [isUpdating, setIsUpdating] = useState(false);
  const [updateStatusText, setUpdateStatusText] = useState('Syncing SQUI...');

  const [fontsLoaded] = useFonts({
    PlusJakartaSans_400Regular,
    PlusJakartaSans_500Medium,
    PlusJakartaSans_600SemiBold,
    PlusJakartaSans_700Bold,
    PlusJakartaSans_800ExtraBold,
    Nunito_600SemiBold,
    Nunito_700Bold,
    Nunito_800ExtraBold,
    Nunito_900Black,
  });

  useEffect(() => {
    async function checkForOtaUpdates() {
      if (__DEV__) return;
      try {
        const updateCheck = await Updates.checkForUpdateAsync();
        if (updateCheck.isAvailable) {
          setIsUpdating(true);
          setUpdateStatusText('Downloading latest updates...');
          await Updates.fetchUpdateAsync();
          setUpdateStatusText('Applying update...');
          await Updates.reloadAsync();
        }
      } catch (error) {
        console.log('[SQUI Updates] OTA check:', error);
      } finally {
        setIsUpdating(false);
      }
    }

    checkForOtaUpdates();

    const appStateListener = AppState.addEventListener('change', (nextState: AppStateStatus) => {
      if (nextState === 'active') {
        checkForOtaUpdates();
      }
    });

    return () => appStateListener.remove();
  }, []);

  if (!fontsLoaded || isUpdating) {
    return (
      <View style={{ flex: 1, backgroundColor: '#FDFBF7', justifyContent: 'center', alignItems: 'center', gap: 12 }}>
        <ActivityIndicator size="large" color="#10B981" />
        {isUpdating && (
          <Text style={{ fontSize: 14, color: '#1B432C', fontWeight: '600' }}>
            {updateStatusText}
          </Text>
        )}
      </View>
    );
  }

  return (
    <SafeAreaProvider>
      <StatusBar style="dark" translucent backgroundColor="transparent" />
      <TabNavigator />
    </SafeAreaProvider>
  );
}
