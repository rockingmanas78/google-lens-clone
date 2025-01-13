import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    listContainer: {
      marginBottom: 16,
      paddingHorizontal: 16,
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '100%',
    },
    card: {
      width: 83,
      height: 56,
      borderRadius: 28,
      justifyContent: 'center',
      alignItems: 'center',
    },
    title: {
      color: 'white',
      fontSize: 14,
      fontFamily: 'OpenSans-Regular',
      textAlign: 'center',
    },
    value: {
      color: 'white',
      fontSize: 16,
      fontFamily: 'OpenSans-Bold',
      textAlign: 'center',
      marginTop: 4,
    },
    label: {
      color: 'white',
      fontSize: 12,
      fontFamily: 'OpenSans-Regular',
      marginTop: 8,
    },
  });