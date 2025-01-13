import React from 'react';
import { View, TextInput, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import { navigateWithTransition } from '../../navigation/transitionHelpers';
import { NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../../navigation/types';
import { styles } from './styles';

interface SearchBarProps {
  navigation: NavigationProp<RootStackParamList>;
}
const SearchBar: React.FC<SearchBarProps> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Fontisto name="search" size={22} color="#9d9d9d" />
      <TextInput
        placeholder="Search"
        placeholderTextColor="#9d9d9d"
        style={styles.input}
        onFocus={() => navigation.navigate('SearchSuggestions')}
      />
      <View style={styles.iconRow}>
        <TouchableOpacity
          style={styles.icon}
          onPress={() => navigateWithTransition(navigation, 'VoiceSearch')}
        >
          <Icon name="microphone" size={24} color="#fcfffe" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.icon}
          onPress={() => navigateWithTransition(navigation, 'LensSearch')}
        >
          <Icon name="google-lens" size={24} color="#fcfffe" />
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default SearchBar;