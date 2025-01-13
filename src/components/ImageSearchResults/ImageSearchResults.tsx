import React, { useEffect, useState, useRef } from 'react';
import {
  View,
  Text,
  Image,
  Animated,
  Dimensions,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { ImageItem } from './types';
import { styles } from './styles.ts';

const { height: screenHeight } = Dimensions.get('window');
interface ImageSearchResultsProps {
  show: boolean;
  results: ImageItem[]
}

const ImageSearchResults: React.FC<ImageSearchResultsProps> = ({ show, results }) => {
  const heightAnim = useRef(new Animated.Value(0)).current;
  const [images, setImages] = useState<ImageItem[]>([]);

  useEffect(() => {
    const fetchAspectRatios = async () => {
      const updatedImages = await Promise.all(
        results.map(
          (item) =>
            new Promise<ImageItem>((resolve) => {
              Image.getSize(
                item.imageUrl,
                (w, h) =>
                  resolve({
                    ...item,
                    aspectRatio: w / h,
                  }),
                () =>
                  resolve({
                    ...item,
                    aspectRatio: 1,
                  })
              );
            })
        )
      );
      setImages(updatedImages);
    };
    fetchAspectRatios();
  }, [results]);

  useEffect(() => {
    Animated.timing(heightAnim, {
      toValue: show ? screenHeight * 0.35 : 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [show]);

  const leftColumn: ImageItem[] = [];
  const rightColumn: ImageItem[] = [];

  images.forEach((item, index) => {
    if (index % 2 === 0) {
      leftColumn.push(item);
    } else {
      rightColumn.push(item);
    }
  });

  const renderImage = (item: ImageItem) => {
    return (
      <View key={item.id} style={styles.imageContainer}>
        <Image
          source={{ uri: item.imageUrl }}
          style={[styles.image, { aspectRatio: item.aspectRatio || 1 }]}
          resizeMode="cover"
        />
        <View style={styles.imageBottomContainer}>
          <View style={styles.imageContainerTop}>
            <Image
              source={{ uri: item.logo }}
              style={[styles.logo]}
              resizeMode="cover"
            />
            <Text style={styles.imageTitle}>{item.title}</Text>
          </View>
          <Text style={styles.imageText} numberOfLines={2}>
            {item.text}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <Animated.View style={[styles.container, { height: heightAnim }]}>
      <View style={styles.resultsInfo}>
        <Icon name="alert-circle-outline" size={22} color="#bdc1c6" />
        <Text style={styles.resultsInfoText}>Results for people are limited</Text>
      </View>
      <ScrollView
        pointerEvents="none"
        contentContainerStyle={styles.scrollContent}
        nestedScrollEnabled
      >
        <View style={styles.column}>{leftColumn.map((item) => renderImage(item))}</View>
        <View style={styles.column}>{rightColumn.map((item) => renderImage(item))}</View>
      </ScrollView>
    </Animated.View>
  );
};

export default ImageSearchResults;

