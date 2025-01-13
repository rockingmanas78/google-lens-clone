import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

interface EnvironmentListProps {
  data: { id: string; title: string; value: string; icon: string; color: string }[];
}

const EnvironmentList: React.FC<EnvironmentListProps> = ({ data }) => {
  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id}
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.listContainer}
      renderItem={({ item }) => (
        <View style={[styles.card ]}>
          <View style={styles.content}>
            <Text style={styles.title}>{item.title}</Text>
          </View>
          <View style={styles.bottomView}>
            <Text style={styles.value}>{item.value}</Text>
            <View style={[styles.iconBackground, { backgroundColor: item.color }]}>
                <Icon name={item.icon} size={24} color="white" />
            </View>
          </View>
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  listContainer: {
    marginTop: 8,
    // paddingVertical: 16,
    paddingHorizontal: 12,
    borderTopWidth: 1,
    width: '100%',
    borderTopColor: '#ddd',
    overflow: 'scroll'
  },
  card: {
    minWidth: 180,
    height: 90,
    borderRadius: 16,
    borderColor: '#343635',
    borderWidth: 1,
    marginRight: 8,
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: 10,
    // paddingVertical: 16
  },
  content: {
    flex: 1,
  },
  iconBackground: {
    width: 30,
    height: 30,
    borderRadius: 15
  },
  bottomView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%'
  },
  title: {
    color: 'white',
    fontSize: 16,
    padding: 0,
    fontFamily: 'OpenSans-Medium',
  },
  value: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
    padding: 0,
    fontFamily: 'OpenSans-Bold',
  },
});

export default EnvironmentList;
