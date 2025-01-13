import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    fullscreenOverlay: {
      flex: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      justifyContent: 'flex-end',
      alignItems: 'center',
    },
    modalContent: {
      width: '95%',
      backgroundColor: '#2e2f33',
      borderRadius: 16,
      maxHeight: '90%',
      alignItems: 'center',
      justifyContent: 'center',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
    },
    closeButton: {
        padding: 16,
        alignSelf: 'flex-start',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 26,
        color: '#fff',
        fontFamily: 'OpenSans-SemiBold',
        position: 'absolute',
        left: 0,
        right: 0,
        textAlign: 'center',
    },
    profileIcon: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#78909c',
        justifyContent: 'center',
        borderColor: '#bbb',
        borderWidth: 0.5,
        alignItems: 'center',
        // marginLeft: 8,
    },
    profileCircleText: {
        color: '#fff',
        fontSize: 26,
        fontFamily: 'OpenSans-Medium',
    },
    placeholder: {
        width: 24,
    },
    profileSection: {
        alignItems: 'center',
        marginBottom: 16,
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        alignContent: 'center',
        paddingHorizontal: 16,
      },
      profileDetails: {
        flexDirection: 'row',
      },
      profileIconContainer: {
        position: 'relative', // Relative positioning for the camera icon
        width: 54,
        height: 54,
      },
      cameraIconContainer: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        backgroundColor: '#1E1E1E', // Background color for the camera icon
        borderRadius: 11, // Make it circular
        width: 22,
        height: 22,
        alignItems: 'center',
        justifyContent: 'center',
      },
      profileTextContainer: {
        flexDirection: 'column',
        alignContent: 'center',
        justifyContent: 'center',
        gap: 4,
        marginLeft: 12, // Add spacing between icon and text
      },
      iconContainer: {
        borderColor: '#616368',
        borderWidth: 1,
        borderRadius: 14,
        width: 28,
        height: 28,
        alignItems: 'center',
        justifyContent: 'center',
      },
      iconButton: {
        alignItems: 'center',
        justifyContent: 'center',
      },
      profileText: {
        color: '#ddd',
        fontSize: 14,
        fontFamily: 'OpenSans-SemiBold',
      },
      profileEmail: {
        color: '#ccc',
        fontSize: 12,
        fontFamily: 'OpenSans-Regular',
      },
      manageYourAccount: {
        borderWidth: 1,
        borderColor: '#616368',
        borderRadius: 40,
        paddingHorizontal: 20,
        paddingVertical: 8,
        marginBottom: 16,
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
      },
      manageYourAccountText: {
        fontSize: 16,
        fontFamily: 'OpenSans-Medium',
        color: '#eee',
        textAlign: 'center',
      },
    menuContainer: {
      width: '100%',
      marginTop: 8,
    },
    groupContainer: {
        paddingHorizontal: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#4f4f4f',
        marginTop: 8,
      },
      firstGroupContainer: {
        borderTopWidth: 1,
        borderTopColor: '#4f4f4f',
      },
      subGroupContainer: {
        borderBottomWidth: 1,
        borderBottomColor: '#4f4f4f',
      },
      lastSubGroupWithoutBorder: {
        borderBottomWidth: 0,
      },
      menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 16,
      },
      menuText: {
        color: '#e9eaee',
        fontSize: 16,
        marginLeft: 16,
        flex: 1,
        fontFamily: 'OpenSans-Medium',
      },
      additionalText: {
        color: '#888',
        fontSize: 14,
      },
      iconPlaceholder: {
        width: 24,
        height: 24,
      },
    footer: {
      flexDirection: 'row',
      justifyContent: 'center',
      marginVertical: 16,
      fontFamily: 'OpenSans-Regular',
    },
    footerText: {
      color: '#e9eaee',
      marginHorizontal: 4,
    },
});