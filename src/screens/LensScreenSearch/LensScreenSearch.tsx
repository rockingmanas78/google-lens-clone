// screens/LensSearchScreen/LensSearchScreen.tsx
import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Animated,
  Dimensions,
  Text,
  TouchableOpacity,
  PanResponder,
  Image,
} from 'react-native';
import { Camera, PhotoFile, useCameraDevices } from 'react-native-vision-camera';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import ImageSearchResults from '../../components/ImageSearchResults/ImageSearchResults';
import type { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../navigation/types';
import { styles } from './styles';
import { ApiEndpoints } from '../../services/ApiEndpoints';
import { ApiHandler } from '../../services/ApiHandler';
import { ImageItem } from '../../components/ImageSearchResults/types';
import ImageCropPicker from 'react-native-image-crop-picker';
import ImageEditor from '@react-native-community/image-editor';
import LottieView from 'lottie-react-native';
import glowingStarAnimation from '../../assets/lottie/star.json';
import { navigateWithTransition } from '../../navigation/transitionHelpers';

const { width, height } = Dimensions.get('window');

// type LensSearchScreenNavProp = StackNavigationProp<RootStackParamList, 'LensSearch'>;

const LensSearchScreen: React.FC = () => {
  const [selectedIndex, setSelectedIndex] = useState(1);
  const [showResults, setShowResults] = useState(false);
  const [results, setResults] = useState<ImageItem[]>([]);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const devices = useCameraDevices();
  const device = devices.filter(d => d.position === 'back')[0];
  const [hasPermission, setHasPermission] = useState(false);
  const [flashEnabled, setFlashEnabled] = useState(false);
  const cameraRef = useRef<Camera>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [croppedImage, setCroppedImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const bottomSheetHeight = useRef(new Animated.Value(height * 0.3)).current;
  const [cropBox, setCropBox] = useState({
    x: width * 0.1,
    y: height * 0.1,
    width: 300,
    height: 300,
  });
  const glowOpacity = useRef(new Animated.Value(0.5)).current;
  const cameraHeightAnim = useRef(new Animated.Value(height)).current;
  const bottomSheetTranslateY = useRef(new Animated.Value(0)).current;

  const menuItems = [
    { id: 0, name: 'Translate', icon: 'translate', library: 'MaterialIcons' },
    { id: 1, name: 'Search', icon: 'search', library: 'MaterialIcons' },
    { id: 2, name: 'Homework', icon: 'school-outline', library: 'Ionicons' },
  ];

  // Request camera permission
  useEffect(() => {
    (async () => {
      const status = await Camera.requestCameraPermission();
      setHasPermission(status === 'granted');
    })();
  }, []);

  // Animate the camera/overlay height based on showResults
  useEffect(() => {
    Animated.timing(cameraHeightAnim, {
      toValue: showResults ? height * 0.65 - 72 : height - 72, 
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [showResults]);

const handleImageSearch = async (imagePath: string) => {
  const fullUri = imagePath.startsWith('file:///') ? imagePath : `file://${photo.path}`;
  setLoading(true);
  const formData = new FormData();
  formData.append('file', {
    uri: fullUri,
    type: 'image/jpeg',
    name: 'image.jpg',
  } as any);

  try {
    const response = await ApiHandler({
      endpoint: ApiEndpoints.IMAGE_SEARCH,
      method: 'POST',
      data: formData,
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    setLoading(false);
    glowOpacity.stopAnimation()
    setShowResults(true);
    let result = response.results as ImageItem[];
    setResults(result);
    console.log("Lens Search Screen ", croppedImage);
  } catch (error) {
    setLoading(false);
    glowOpacity.stopAnimation()
    console.error('Error performing image search:', error);
  }
};

const handleCapture = async () => {
  if (!cameraRef.current) return;

  try {
    const photo: PhotoFile = await cameraRef.current.takePhoto();
    if (photo.path) {
      setCapturedImage(`file://${photo.path}`);
    }
  } catch (error) {
    console.error('Error capturing photo:', error);
  }
};

const handleTickPress = () => {
  if(showResults) {
    navigateWithTransition(navigation, 'SearchResults', { results: results, query: '', imageQuery: croppedImage }, 'bottom');
  } else {
    applyCrop();
  }
}

const applyCrop = async () => {
  console.log("ApplyingCrop");
  if (!capturedImage) return;
  try {
    const cropData = {
      offset: { x: cropBox.x, y: cropBox.y },
      size: { width: cropBox.width, height: cropBox.height },
      displaySize: { width: cropBox.width, height: cropBox.height },
      resizeMode: 'contain',
    };
    const croppedUri = await ImageEditor.cropImage(capturedImage, cropData);
    console.log('Cropped Image URI:', croppedUri);
    setCroppedImage(croppedUri.uri);
    setCapturedImage(croppedUri.uri);
    handleImageSearch(croppedUri.uri);
  } catch (error) {
    console.error('Error cropping image:', error);
  }
};

  const resetImagesOrGoBack = () => {
    if (capturedImage || croppedImage) {
      setCapturedImage(null);
      setCroppedImage(null);
      setShowResults(false);
    } else {
      navigation.goBack();
    }
  };
  const openGallery = async () => {
    const result = await ImageCropPicker.openPicker({
      mediaType: 'photo',
      cropping: true,
    });
    if (result) {
      console.log("Cropped Image from Gallery");
      console.log(result.path)
      setCroppedImage(result.path);
      setCapturedImage(result.path);
      handleImageSearch(result.path);
    } else {
      console.log('User cancelled image selection');
    }
  };

  const DRAG_THRESHOLD = height * 0.6;

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (evt, gestureState) => {
        const newCropBox = {
          ...cropBox,
          x: Math.min(Math.max(cropBox.x + gestureState.dx, 0), width - cropBox.width),
          y: Math.min(Math.max(cropBox.y + gestureState.dy, 0), height - cropBox.height),
        };
        setCropBox(newCropBox);
      },
      onPanResponderRelease: () => {
      },
    })
  ).current;

  const resizeResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (evt, gestureState) => {
        const newCropBox = {
          ...cropBox,
          width: Math.max(cropBox.width + gestureState.dx, 50),
          height: Math.max(cropBox.height + gestureState.dy, 50),
        };
        setCropBox(newCropBox);
      },
      onPanResponderRelease: () => {
      },
    })
  ).current;

const bottomSheetPanResponder = useRef(
  PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onStartShouldSetPanResponderCapture: () => true,
    onMoveShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponderCapture: () => true,

    onPanResponderMove: (evt, gestureState) => {
      console.log("moving", gestureState.dy);
      // For example:
      if (gestureState.dy < 0) {
        const newHeight = Math.max(DRAG_THRESHOLD - gestureState.dy, DRAG_THRESHOLD);
        bottomSheetHeight.setValue(newHeight);
      }
    },
    onPanResponderRelease: (evt, gestureState) => {
      console.log("released");
      if (-gestureState.dy > DRAG_THRESHOLD) {
        // Fully expand or navigate
        Animated.timing(bottomSheetHeight, {
          toValue: height,
          duration: 300,
          useNativeDriver: false,
        }).start(() => {
          navigateWithTransition(navigation, 'SearchResults', { results: results, query: '', imageQuery: croppedImage }, 'bottom');
        });
      } else {
        Animated.spring(bottomSheetHeight, {
          toValue: height * 0.3,
          useNativeDriver: false,
        }).start();
      }
    },
  })
).current;

  if (!device) {
    return (
      <View style={styles.loadingScreen}>
        <Text>Loading Camera...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {hasPermission && !capturedImage && (
        <Animated.View style={[styles.cameraContainer, { height: height }]}>
          <Camera
            ref={cameraRef}
            style={styles.camera}
            device={device}
            isActive={true}
            photo={true}
            video={false}
            enableZoomGesture
            torch={flashEnabled ? 'on' : 'off'}
          />
        </Animated.View>
      )}
          {loading && (
            <View style={styles.lottieContainer}>
              <LottieView
                source={glowingStarAnimation}
                autoPlay
                loop
                style={styles.lottieAnimation}
              />
            </View>
          )}
      <SafeAreaView style={styles.overlayContainer}>
        <View style={styles.topBar}>
          <TouchableOpacity style={styles.iconButton} onPress={resetImagesOrGoBack}>
            <Icon name="close" size={28} color="white" />
          </TouchableOpacity>
          <Text style={styles.title}>Google Lens</Text>
          <TouchableOpacity
            style={styles.iconButton}
            onPress={() => setFlashEnabled(!flashEnabled)}
          >
            <Ionicons name="ellipsis-vertical" size={22} color="white" />
          </TouchableOpacity>
        </View>

        {!capturedImage  &&
            <View style={styles.overlay}>
              <View style={styles.middleOverlay}>
                <View style={styles.sideOverlay} />
                <View style={styles.cropArea}>
                  <View style={[styles.corner, styles.topLeftCorner]} />
                  <View style={[styles.corner, styles.topRightCorner]} />
                  <View style={[styles.corner, styles.bottomLeftCorner]} />
                  <View style={[styles.corner, styles.bottomRightCorner]} />
                </View>
                <View style={styles.sideOverlay} />
              </View>
            </View>
        }
        { croppedImage ? ( 
  <View style={styles.imageContainer}>
    <Image
      source={{ uri: croppedImage }}
      style={styles.croppedImage}
      resizeMode="contain"
      />
  </View>
) : !croppedImage && capturedImage && (
  <View style={styles.imageContainer}>
  <Image
    source={{ uri: capturedImage }}
    style={styles.capturedImage}
    resizeMode="contain"
  />
  <View
    {...panResponder.panHandlers}
    style={[
      styles.cropBox,
      {
        left: cropBox.x,
        top: cropBox.y,
        width: cropBox.width,
        height: cropBox.height,
      },
    ]}
  >
  <View
    {...resizeResponder.panHandlers}
    style={styles.resizeHandle}
  />
</View>
</View>

)}
        <View style={styles.bottomBar}>
          <TouchableOpacity style={styles.iconButton} onPress={openGallery}>
            <View style={styles.imageOuter}>
              <View style={styles.imageInner} />
            </View>
          </TouchableOpacity>
          <View style={styles.captureButton}>
            <View style={styles.captureOuter}>
              <TouchableOpacity
                style={styles.captureInner}
                onPress={handleCapture}
              >
                <View style={styles.captureInnerMost}>
                  <Icon name="search" size={36} color="#121212" />
                </View>
              </TouchableOpacity>
            </View>
          </View>
          <TouchableOpacity style={styles.cropButton} onPress={handleTickPress}>
            {showResults ? <Icon name="navigate-next" size={24} color="white" /> :
            <Icon name="check" size={24} color="white" />}
          </TouchableOpacity>
        </View>

        <View style={styles.menuContainer}>
          {menuItems.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={[
                styles.menuItem,
                selectedIndex === item.id && styles.activeMenuItem,
              ]}
              onPress={() => {
                setSelectedIndex(item.id);
              }}
            >
              {item.library === 'MaterialIcons' ? (
                <Icon
                  name={item.icon}
                  size={20}
                  color={selectedIndex === item.id ? '#8cb3ee' : 'white'}
                />
              ) : (
                <Ionicons
                  name={item.icon}
                  size={20}
                  color={selectedIndex === item.id ? '#8cb3ee' : 'white'}
                />
              )}
              <Text
                style={[
                  styles.menuText,
                  { color: selectedIndex === item.id ? '#8cb3ee' : 'white' },
                ]}
              >
                {item.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <Animated.View
          style={{
            transform: [{ translateY: bottomSheetTranslateY }],
          }}
          {...bottomSheetPanResponder.panHandlers}
        >
          <ImageSearchResults show={showResults} results={results} />
        </Animated.View>
      </SafeAreaView>
    </View>
  );
};

export default LensSearchScreen;