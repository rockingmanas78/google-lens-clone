import React, { Dispatch, SetStateAction } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Fontiso from 'react-native-vector-icons/Fontisto';
import AntDesign from 'react-native-vector-icons/AntDesign'
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import { styles } from './styles';

interface ProfileModalProps {
    setModalVisible: Dispatch<SetStateAction<boolean>>;
    modalVisible: boolean;
}

const ProfileModal: React.FC<ProfileModalProps> = ({ setModalVisible, modalVisible }) => {
    const menuItems = [
        [{ icon: 'incognito', text: 'Turn on Incognito', name: 'MaterialCommunityIcon' }],
        [
            [{ icon: 'history', text: 'Search history', additionalText: 'Saving' }],
            [{ icon: 'delete', text: 'Delete last 15 mins' }]
        ],
        [
            [
                { icon: 'shield-account-variant-outline', text: 'SafeSearch',name: 'MaterialCommunityIcon' },
                { icon: 'interests', text: 'Interests' },
                { icon: 'vpn-key', text: 'Passwords' },
                { icon: 'person-outline', text: 'Your profile' },
                { icon: 'search', text: 'Search personalisation' }],
            [
                { icon: 'settings', text: 'Settings' },
                { icon: 'help-outline', text: 'Help and feedback' }
            ]
        ],
      ];
    return (
      <Modal
        animationType="slide"
        transparent
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.fullscreenOverlay}>
          <View style={styles.modalContent}>
          <View style={styles.header}>
            <TouchableOpacity onPress={() => {
                setModalVisible(false);
              }} style={styles.closeButton} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
                <Icon name="close" size={28} color="#fff" />
            </TouchableOpacity>
            <Text style={styles.title}>Google</Text>
            <View style={styles.placeholder} />
            </View>

            <View style={styles.profileSection}>
                <View style={styles.profileDetails}>
                    <View style={styles.profileIconContainer}>
                    <TouchableOpacity style={styles.profileIcon}>
                            {/* <View> */}
                            <Text style={styles.profileCircleText}>A</Text>
                            {/* </View> */}
                        </TouchableOpacity>
                    <TouchableOpacity style={styles.cameraIconContainer}>
                        <AntDesign name="camera" size={14} color="white" />
                    </TouchableOpacity>
                    </View>
                    <View style={styles.profileTextContainer}>
                    <Text style={styles.profileText}>Your Name</Text>
                    <Text style={styles.profileEmail}>youremail@gmail.com</Text>
                    </View>
                </View>
                <View style={styles.iconContainer}>
                    <TouchableOpacity style={styles.iconButton}>
                    <Fontiso name="angle-down" size={14} color="#fff" />
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.manageYourAccount}>
                <Text style={styles.manageYourAccountText}>Manage your Google Account</Text>
            </View>

            <ScrollView style={styles.menuContainer}>

            {menuItems.map((group, groupIndex) => (
                <View
                    key={groupIndex}
                    style={[
                    styles.groupContainer,
                    groupIndex === 0 && styles.firstGroupContainer, // Add top border for the first group
                    ]}
                >
                    {group.map((subGroup, subGroupIndex) => {
                    if (Array.isArray(subGroup)) {
                        return (
                        <View
                            key={subGroupIndex}
                            style={[
                            styles.subGroupContainer,
                            subGroupIndex === group.length - 1 && groupIndex !== menuItems.length - 1
                                ? styles.lastSubGroupWithoutBorder
                                : null,
                            ]}
                        >
                            {subGroup.map((item, itemIndex) => (
                            <MenuItem key={itemIndex} item={item} />
                            ))}
                        </View>
                        );
                    } else {
                        return <MenuItem key={subGroupIndex} item={subGroup} />;
                    }
                    })}
                </View>
            ))}
            </ScrollView>
            <View style={styles.footer}>
              <Text style={styles.footerText}>Privacy Policy</Text>
              <Text style={styles.footerText}> • </Text>
              <Text style={styles.footerText}>Terms of Service</Text>
            </View>
          </View>
        </View>
      </Modal>
    );
  };

  const MenuItem = ({ item }: { item: { icon?: string; text: string; additionalText?: string, name?: string } }) => (
    <View style={styles.menuItem}>
      {item.icon ? (
        item.name && item.name === 'MaterialCommunityIcon' ?
        <MaterialCommunityIcon name={item.icon} size={20} color="#e9eaee" /> :
        <Icon name={item.icon} size={24} color="#e9eaee" />
      ) : (
        <View style={styles.iconPlaceholder} />
      )}
      <Text style={styles.menuText}>{item.text}</Text>
      {item.additionalText && <Text style={styles.additionalText}>{item.additionalText}</Text>}
    </View>
  );

export default ProfileModal;