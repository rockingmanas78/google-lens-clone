import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 16,
    marginVertical: 16,
    backgroundColor: '#333438',
    borderRadius: 50,
    paddingVertical: 12,
    paddingHorizontal: 28
  },
  input: {
    flex: 1,
    color: 'white',
    paddingLeft: 16,
    fontFamily: 'OpenSans-Regular',
    fontSize: 24,
  },
  iconRow: {
    flexDirection: 'row',
    gap: 8
  },
  icon: {
    marginLeft: 16,
  },
});
