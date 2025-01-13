// transitions/SlideFromBottomAt40.ts
import { StackCardStyleInterpolator } from '@react-navigation/stack';

export const forSlideFromBottomAt40: StackCardStyleInterpolator = ({
  current,
  layouts,
}) => {
  const translateY = current.progress.interpolate({
    inputRange: [0, 1],
    outputRange: [layouts.screen.height * 0.6, 0],
  });

  return {
    cardStyle: {
      transform: [{ translateY }],
    },
    overlayStyle: {
      opacity: current.progress.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 0.3],
      }),
    },
  };
};
