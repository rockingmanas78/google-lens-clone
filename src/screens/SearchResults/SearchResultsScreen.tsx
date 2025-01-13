import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from 'react-native';
import CustomImageGallery from '../../components/CustomImageGallery/CustomImageGallery';
import { ImageItem } from '../../components/ImageSearchResults/types';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { RouteProp, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../../navigation/types';
import { styles } from './styles';

type SearchResultsScreenRouteProp = RouteProp<RootStackParamList, 'SearchResults'>;

const SearchResultsScreen: React.FC = () => {
  const route = useRoute<SearchResultsScreenRouteProp>();
  const { results, query, imageQuery } = route.params || {};
  console.log(imageQuery);
  const [activeTab, setActiveTab] = useState('All');
  const tabs = ['All', 'Products', 'Visual matches', 'About this image', 'About this text'];
  const [images, setImages] = useState<ImageItem[]>(results);
  useEffect(() => {
    if (results?.length > 0) {
      setImages(results);
    }
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.searchBar}>
        <Image
              source={require('../../assets/google-logo.png')}
              style={styles.logo}
          />
        {imageQuery && <View style={styles.imagePreview}>
          <Image
            source={{
              uri: imageQuery,
            }}
            style={styles.previewImage}
          />
        </View>}
        <TextInput style={styles.searchInput} placeholder="Add to search" placeholderTextColor="#888" value={query || ''} />
        <TouchableOpacity style={styles.profile}>
            <View style={styles.profileIcon}>
              <Text style={styles.profileText}>A</Text>
            </View>
        </TouchableOpacity>
      </View>

      <View style={styles.tabsWrapper}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.tabsContainer}
      >
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[
              styles.tabItem,
              activeTab === tab && styles.activeTabItem,
            ]}
            onPress={() => setActiveTab(tab)}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === tab && styles.activeTabText,
              ]}
            >
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>

    <View style={styles.resultsInfo}>
      <Icon name="alert-circle-outline" size={20} color="#bdc1c6" />
        <Text style={styles.resultsInfoText}>Results for people are limited</Text>
      </View>

        <CustomImageGallery images={images} />
      <View style={styles.bottomBar}>
        <Text style={styles.bottomText}>Are these results useful?</Text>
          <TouchableOpacity>
            <Text style={styles.actionText}>Yes</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.actionText}>No</Text>
          </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.closeText}>✕</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SearchResultsScreen;

