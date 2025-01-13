import { CommonActions, StackActions, NavigationProp, NavigationState } from '@react-navigation/native';
import { Animated, Easing } from 'react-native';

type TransitionDirection = 'left' | 'right' | 'top' | 'bottom';

export const navigateWithTransition = (
  navigation: NavigationProp<any>,
  screenName: string,
  params: any = {},
  direction: TransitionDirection = 'right'
) => {
  const navigationState = navigation.getState() as NavigationState;

  const routes = navigationState.routes;
  const targetIndex = routes.findIndex(route => route.name === screenName);

  // Define the custom animation transition
  const animateTransition = () => {
    const animatedValue = new Animated.Value(0);

    Animated.timing(animatedValue, {
      toValue: 1,
      duration: 400,
      easing: Easing.out(Easing.ease),
      useNativeDriver: true,
    }).start();
  };

  if (targetIndex !== -1) {
    // Screen exists in the stack, pop to it and navigate
    const popCount = routes.length - 1 - targetIndex;
    if (popCount > 0) {
      navigation.dispatch(StackActions.pop(popCount));
    }
    navigation.dispatch(
      CommonActions.navigate({
        name: screenName,
        params: {
          ...params,
          transitionDirection: direction,
        },
      })
    );
  } else {
    // Screen doesn't exist, push it onto the stack
    animateTransition(); // Trigger animation before transition
    navigation.dispatch(
      StackActions.push(screenName, {
        ...params,
        transitionDirection: direction,
      })
    );
  }
};

