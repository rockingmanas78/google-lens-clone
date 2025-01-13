import React from 'react';
import { View, Text, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import GlobalStyles from '../../styles/GlobalStyles';
import IonicFonts from 'react-native-vector-icons/Ionicons';
import { styles } from './styles';
import { NewsCardProps } from './types';

const NewsCard: React.FC<NewsCardProps> = ({ title, image, source, sourceImg, time }) => {
  return (
    <View style={styles.card}>
      <Image source={{ uri: image }} style={styles.image} />
      <Text style={[GlobalStyles.textSemiBold,styles.title]}>{title}</Text>
      <View style={styles.textContainer}>
        <View style={styles.footer}>
          <Image source={{uri: sourceImg }} style={styles.logo} />
          <Text style={styles.source}>{source}</Text>
          <Text style={styles.source}> · </Text>
          <Text style={styles.source}>{time}</Text>
        </View>
        <View style={styles.iconContainer}>
          <Icon name="favorite-border" size={16} color="#888" />
          <Icon name="share" size={16} color="#888" style={styles.icon} />
          <IonicFonts name="ellipsis-vertical" size={16} color="#888" style={styles.icon} />
        </View>
      </View>
    </View>
  );
};



export default NewsCard;
