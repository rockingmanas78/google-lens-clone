// App.tsx
import React from 'react';
import AppNavigation from './src/navigation/AppNavigation';
import 'react-native-gesture-handler';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import { enableScreens } from 'react-native-screens';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
enableScreens();

export default function App() {
  return (
    <SafeAreaProvider>
      <GestureHandlerRootView style={{flex: 1}}>
        <NavigationContainer>
          <AppNavigation />
        </NavigationContainer>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
}