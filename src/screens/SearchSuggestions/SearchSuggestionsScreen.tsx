import React, { useCallback, useEffect, useState } from 'react';
import {
  View,
  TextInput,
  Text,
  FlatList,
  KeyboardAvoidingView,
  TouchableOpacity,
  Keyboard,
  Animated
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather'
import { navigateWithTransition } from '../../navigation/transitionHelpers';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../navigation/types';
import { ApiHandler } from '../../services/ApiHandler';
import { ApiEndpoints } from '../../services/ApiEndpoints';
import { styles } from './styles';

const SearchSuggestionScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [searchText, setSearchText] = useState<string>('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [recentSearches, setRecentSearches] = useState<string[]>([
    'sleeveless gilet jacket men india',
    'floral crop top',
    'woodlang jacket',
    'elon musk',
    'world health day'
  ]);
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const [transitionAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    const showListener = Keyboard.addListener('keyboardDidShow', () =>
      setKeyboardVisible(true)
    );
    const hideListener = Keyboard.addListener('keyboardDidHide', () =>
      setKeyboardVisible(false)
    );

    return () => {
      showListener.remove();
      hideListener.remove();
    };
  }, []);

  const fetchSuggestions = useCallback(
    async (text: string) => {
      try {
        const response = await ApiHandler<{ results: string[] }>({
          endpoint: ApiEndpoints.TEXT_SEARCH,
          method: "POST",
          data: { query: text },
        });
        setSuggestions(response.results || []);
      } catch (error) {
        console.error("Error fetching suggestions:", error);
        setSuggestions([]);
      }
    },
    []
  );

  const debounce = (func: (...args: any[]) => void, delay: number) => {
    let timeoutId: NodeJS.Timeout;
    return (...args: any[]) => {
      if (timeoutId) clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func(...args), delay);
    };
  };

  const handleTextChange = debounce((text: string) => {
    if (text.trim().length > 2) {
      fetchSuggestions(text.trim());
      triggerTransition(true);
    } else {
      setSuggestions([]);
      triggerTransition(false);
    }
  }, 300);

  const triggerTransition = (toSuggestions: boolean) => {
    Animated.timing(transitionAnim, {
      toValue: toSuggestions ? 1 : 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <View style={styles.searchBar}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back-ios" size={24} color="#888" />
        </TouchableOpacity>
        <TextInput
          style={styles.input}
          placeholder="Search or type URL"
          placeholderTextColor="#888"
          value={searchText}
          onChangeText={(text) => {
            setSearchText(text);
            handleTextChange(text); // Trigger API call with debounce
          }}
        />
        <View style={styles.iconRow}>
          {searchText ? (
            <TouchableOpacity onPress={() => setSearchText('')}>
              <Feather name="x" size={24} color="#888" />
            </TouchableOpacity>
          ) : (
            <>
              <TouchableOpacity
                style={styles.icon}
                onPress={() => navigateWithTransition(navigation, 'VoiceSearch')}
              >
                <MaterialCommunityIcons name="microphone" size={24} color="#fcfffe" />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.icon}
                onPress={() => navigateWithTransition(navigation, 'LensSearch')}
              >
                <MaterialCommunityIcons name="google-lens" size={24} color="#fcfffe" />
              </TouchableOpacity>
            </>
          )}
        </View>
      </View>

      <View style={styles.subtitleContainer}>
        <Text style={styles.subtitleText}>Recent Searches</Text>
        <Text style={styles.subtitleText2}>MANAGE HISTORY</Text>
      </View>
      <Animated.View
        style={[
          styles.content,
          {
            transform: [
              {
                translateY: transitionAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, -10],
                }),
              },
            ],
          },
        ]}
      >
        {searchText.trim() === '' ? (
          <FlatList
            data={recentSearches}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity style={styles.suggestionItem}>
                <View style={styles.historyIcon}>
                  <Feather name="clock" size={22} color="#9aa0a6" />
                </View>
                <Text style={styles.suggestionText}>{item}</Text>
              </TouchableOpacity>
            )}
          />
        ) : (
          <FlatList
            data={suggestions}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity style={styles.suggestionItem}>
                <View style={styles.historyIcon}>
                  <Feather name="search" size={20} color="#9aa0a6" />
                </View>
                <Text style={styles.suggestionText}>{item}</Text>
              </TouchableOpacity>
            )}
          />
        )}
      </Animated.View>
    </KeyboardAvoidingView>
  );
};

export default SearchSuggestionScreen;
