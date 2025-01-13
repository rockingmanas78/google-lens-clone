import React from 'react';
import { FlatList } from 'react-native';
import NewsCard from '../NewsCard/NewsCard';
import { NewsListProps } from './types';
import { styles } from './styles';

const NewsList: React.FC<NewsListProps> = ({ data }) => {
  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <NewsCard
          title={item.title}
          image={item.image}
          source={item.source}
          sourceImg={item.sourceImg}
          time={item.time}
        />
      )}
      contentContainerStyle={styles.listContainer}
    />
  );
};

export default NewsList;
