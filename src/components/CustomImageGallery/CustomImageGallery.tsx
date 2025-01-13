import { View, Text, Image, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react';
import { ImageItem } from '../ImageSearchResults/types';
import { styles } from './styles.ts'; 

interface ImageGalleryProps {
    images: ImageItem[];
}
const CustomImageGallery: React.FC<ImageGalleryProps> = ({ images }) => {
  const [finalImages, setFinalImages] = useState<ImageItem[]>([]);
    const leftColumn: ImageItem[] = [];
    const rightColumn: ImageItem[] = [];

    useEffect(() => {
      const fetchAspectRatios = async () => {
        const updatedImages = await Promise.all(
          images.map(
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
                      aspectRatio: 1, // fallback if error
                    })
                );
              })
          )
        );
        setFinalImages(updatedImages);
      };
      fetchAspectRatios();
    }, []);

      finalImages.forEach((item, index) => {
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
                    <Image source={{ uri: item.logo }} style={[styles.logo]} resizeMode='cover' />
                    <Text style={styles.imageTitle}>{item.title}</Text>
                </View>
                <Text style={styles.imageText} numberOfLines={2}>{item.subtitle}</Text>
            </View>
          </View>
        );
      };
  return (
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        nestedScrollEnabled
      >
            <View style={styles.column}>
              {leftColumn.map((item) => renderImage(item))}
            </View>
            <View style={styles.column}>
              {rightColumn.map((item) => renderImage(item))}
            </View>
        </ScrollView>
      )
}

export default CustomImageGallery