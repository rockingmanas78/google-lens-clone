import React, { Dispatch, SetStateAction } from 'react';
import { View, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo'

interface HeaderProps {
  setModalVisible: Dispatch<SetStateAction<boolean>>;
  modalVisible: boolean;
}

const Header: React.FC<HeaderProps> = ({ setModalVisible }) => {
  return (
    <View style={styles.container}>
        <View style={styles.containerTop}>
            <Entypo name="lab-flask" size={32} color="#a8c6fb" />
            <TouchableOpacity
        style={styles.profileIcon}
        onPress={() => setModalVisible(true)}
      >
        <View style={styles.profileIcon} />
      </TouchableOpacity>
        </View>
      <Image source={require('../../assets/google-text.png')} style={styles.logo} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  containerTop: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  time: {
    color: 'white',
    fontSize: 18,
  },
  logo: {
    width: 150,
    height: 60,
    resizeMode: 'contain',
    marginVertical: 10,
  },
  profileIcon: {
    width: 40,
    height: 40,
    backgroundColor: '#757575',
    borderRadius: 20,
  },
});

export default Header;
