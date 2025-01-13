import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1f1f1f',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 7,
    backgroundColor: '#333438',
    borderRadius: 32,
    margin: 16,
  },
  iconRow: {
    flexDirection: 'row',
  },
  icon: {
    marginLeft: 16,
  },
  input: {
    flex: 1,
    marginLeft: 8,
    color: '#FFF',
    fontSize: 19,
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
  subtitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:'space-between',
    marginBottom: 16,
    paddingHorizontal: 16
  },
  subtitleText: {
    fontSize: 15,
    color: '#9aa0a6',
    fontFamily: 'OpenSans-Medium'
  },
  subtitleText2: {
    fontSize: 14,
    color: '#9aa0a6',
    fontFamily: 'OpenSans-SemiBold'
  },
  suggestionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    // borderBottomWidth: 1,
    // borderBottomColor: '#333',
  },
  suggestionText: {
    fontSize: 16,
    color: '#e7e9ec',
    marginLeft: 12,
  },
  historyIcon: {
    // marginLeft: 4,
    backgroundColor: '#303134',
    padding: 8,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  noSuggestionsText: {
    color: '#888',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
  },
  footer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#333',
    alignItems: 'center',
  },
  incognitoToggle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  incognitoText: {
    color: '#888',
    fontSize: 16,
    marginLeft: 8,
  },
});
