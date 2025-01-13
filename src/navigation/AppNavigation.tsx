
import React from 'react';
import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack';
import { RootStackParamList } from './types';

import HomeScreen from '../screens/Home/HomeScreen';
import SearchResultsScreen from '../screens/SearchResults/SearchResultsScreen';
import LensSearchScreen from '../screens/LensScreenSearch/LensScreenSearch';
import SearchSuggestionScreen from '../screens/SearchSuggestions/SearchSuggestionsScreen';
import VoiceSearchScreen from '../screens/VoiceSearchScreen/VoiceSearchScreen';
import { forSlideFromBottomAt40 } from './SlideFromBottomAt40';

const Stack = createStackNavigator<RootStackParamList>()

const AppNavigation = () => {

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen
          name="SearchResults"
          component={SearchResultsScreen}
          options={({ route }) => {
            const fromSheet = route.params?.fromSheet;
            if (fromSheet) {
              return {
                cardStyleInterpolator: forSlideFromBottomAt40,
                transitionSpec: {
                  open: { animation: 'timing', config: { duration: 200 } },
                  close: { animation: 'timing', config: { duration: 300 } },
                },
                gestureEnabled: true,
              };
            } else {
              return {
                cardStyleInterpolator: CardStyleInterpolators.forFadeFromBottomAndroid,
                gestureEnabled: true,
              };
            }
          }}
        />
      <Stack.Screen name="LensSearch" component={LensSearchScreen} />
      <Stack.Screen name="SearchSuggestions" component={SearchSuggestionScreen} />
      <Stack.Screen name="VoiceSearch" component={VoiceSearchScreen} />
    </Stack.Navigator>
  );
};

export default AppNavigation;
