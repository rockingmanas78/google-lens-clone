import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#1f1f1f',
    },
    topBar: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 16,
      marginTop: 16,
    },
    circleButton: {
      width: 48,
      height: 48,
      borderRadius: 24,
      backgroundColor: '#444',
      justifyContent: 'center',
      alignItems: 'center',
    },
    backIcon: {
      backgroundColor: '#303134',
      padding: 8,
      borderRadius: 28,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    centerContent: {
      flex: 1,
      justifyContent: 'space-around',
      alignItems: 'center',
      height: '50%',
    },
    speakNowText: {
      color: '#888',
      fontSize: 26,
      fontFamily: 'OpenSans-Medium',
      marginBottom: 40,
    },
    googleDots: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 40,
    },
    dot: {
      width: 10,
      height: 10,
      borderRadius: 5,
      marginHorizontal: 4,
    },
    bottomContent: {
      marginTop: 40,
    },
    searchButton: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 10,
      paddingHorizontal: 15,
      borderWidth: 1,
      borderColor: '#454746',
      borderRadius: 32,
    },
    searchButtonText: {
      color: '#888',
      fontSize: 16,
      marginLeft: 8,
      fontFamily: 'OpenSans-SemiBold',
    },
  });