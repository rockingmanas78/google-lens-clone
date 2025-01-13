import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../navigation/types';
import { styles } from './styles';

const VoiceSearchScreen: React.FC = () => {
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        {/* Back Button */}
        <TouchableOpacity style={styles.circleButton} onPress={() => navigation.goBack()}>
          <View style={styles.backIcon}>
            <Ionicons name="chevron-back" size={32} color="#888" />
          </View>
        </TouchableOpacity>
        {/* Globe Icon */}
        <TouchableOpacity style={styles.circleButton}>
          <MaterialCommunityIcons name="web" size={32} color="#888" />
        </TouchableOpacity>
      </View>

      <View style={styles.centerContent}>
        <Text style={styles.speakNowText}>Speak now</Text>

        <View style={styles.googleDots}>
          <View style={[styles.dot, { backgroundColor: '#4285F4' }]} />
          <View style={[styles.dot, { backgroundColor: '#EA4335' }]} />
          <View style={[styles.dot, { backgroundColor: '#FBBC05' }]} />
          <View style={[styles.dot, { backgroundColor: '#34A853' }]} />
        </View>

        <View style={styles.bottomContent}>
          <TouchableOpacity style={styles.searchButton}>
            <MaterialCommunityIcons name="music-note" size={20} color="#888" />
            <Text style={styles.searchButtonText}>Search a song</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default VoiceSearchScreen;
