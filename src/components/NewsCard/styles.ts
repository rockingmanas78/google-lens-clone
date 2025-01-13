import { StyleSheet, Dimensions } from "react-native";
const screenWidth = Dimensions.get('window').width;

export const styles = StyleSheet.create({
    card: {
      borderBottomColor: '#666',
      borderBottomWidth: 0.5,
      padding: 12,
      overflow: 'hidden',
    },
    image: {
      width: '100%',
      height: screenWidth * (203 / 360),
      resizeMode: 'cover',
      borderRadius: 20,
    },
    logo: {
      width: 16,
      height: 16,
      resizeMode: 'contain',
      borderRadius: 8,
      marginRight: 8
    },
    textContainer: {
      flexDirection: 'row',
      justifyContent:'space-between',
      alignItems: 'center',
      marginVertical: 6,
    },
    title: {
      color: '#f1f1f1',
      fontSize: 20,
      marginTop: 12,
      marginBottom: 4,
    },
    footer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: 8,
    },
    source: {
      color: '#ccc',
      fontSize: 12,
    },
    time: {
      color: '#888',
      fontSize: 12,
    },
    iconContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      gap: 16
    },
    icon: {
      marginLeft: 16,
    },
});