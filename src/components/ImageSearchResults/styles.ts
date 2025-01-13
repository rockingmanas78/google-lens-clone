import { StyleSheet, Dimensions } from "react-native";

const COLUMN_SPACING = 20;
const { width } = Dimensions.get('window');

export const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    backgroundColor: '#1E1E1E',
    width: '100%',
  },
  resultsInfo: {
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    gap: 8,
    alignItems: 'center',
  },
  resultsInfoText: {
    color: '#bdc1c6',
    fontSize: 18,
    textAlign: 'center',
  },
  imageBottomContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  imageContainerTop: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
    marginBottom: 4,
    gap: 8,
  },
  imageTitle: {
    fontFamily: 'OpenSans-Light',
    fontSize: 13,
    color: '#bdc1c6',
  },
  scrollContent: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 16,
    paddingHorizontal: 8,
  },
  logo: {
    height: 14,
    width: 14,
    resizeMode: 'contain',
    borderRadius: 7,
  },
  column: {
    width: (width * 0.5) - COLUMN_SPACING,
    alignItems: 'center',
  },
  imageContainer: {
    width: '100%',
    marginBottom: 16,
    alignItems: 'center',
  },
  image: {
    width: '100%',
    borderRadius: 20,
    backgroundColor: '#ccc',
  },
  imageText: {
    color: '#fff',
    marginTop: 4,
    textAlign: 'left',
    fontSize: 13,
    fontFamily: 'OpenSans-Medium',
  },
});
