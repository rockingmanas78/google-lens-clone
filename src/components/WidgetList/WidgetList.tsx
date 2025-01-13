import React from 'react';
import { View, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { styles } from './styles';
import { WidgetListProps } from './types';

const WidgetList: React.FC<WidgetListProps> = ({ data }) => {
  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id}
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.listContainer}
      renderItem={({ item }) => (
        <View style={[styles.card, { backgroundColor: `${item.color}30` }]}>
          {item.icon && (item.icon.includes("outline")) ?
            (<MaterialCommunityIcons name={item.icon} size={20} color={item.color} />)
          : (<Icon name={item.icon} size={20} color={item.color} />)}
        </View>
      )}
    />
  );
};

export default WidgetList;
