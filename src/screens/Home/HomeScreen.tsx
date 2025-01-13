
import React, { useState } from 'react';
import { View, StatusBar, ScrollView } from 'react-native';
import Header from '../../components/Header/Header';
import SearchBar from '../../components/searchBar/SearchBar';
import NewsList from '../../components/NewsList/NewsList';
import WidgetList from '../../components/WidgetList/WidgetList';
import EnvironmentList from '../../components/EnvironmentList/EnvironmentList';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../navigation/types';
import ProfileModal from '../../components/ProfileModal/ProfileModal';
import { environmentListData, listData1, newsData } from '../../helpers/constants';
import { styles } from './styles';

const HomeScreen: React.FC = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  return (
    <View style={styles.container}>
      <ScrollView>
        <StatusBar barStyle="light-content" />
        <Header setModalVisible={setModalVisible} modalVisible={modalVisible} />
        <SearchBar navigation={navigation} />
        <WidgetList data={listData1} />
        <EnvironmentList data={environmentListData} />
        <NewsList data={newsData} />
      </ScrollView>
      <ProfileModal setModalVisible={setModalVisible} modalVisible={modalVisible} />
    </View>
  );
};

export default HomeScreen;
