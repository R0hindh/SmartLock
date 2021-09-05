import React, {useRef, useEffect} from 'react';
import {Animated, Text, View, Image, PixelRatio} from 'react-native';
import auth from '@react-native-firebase/auth';

const FadeInView = props => {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  return (
    <Animated.View
      style={{
        ...props.style,
        opacity: fadeAnim,
      }}>
      {props.children}
    </Animated.View>
  );
};

export default SplashScreen = () => {
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#3386EB',
      }}>
      <FadeInView>
        <Image
          style={{
            width: PixelRatio.getPixelSizeForLayoutSize(50),
          height: PixelRatio.getPixelSizeForLayoutSize(50),
            alignItems: 'center',
            margin: 10,
            borderRadius: 20,
            shadowColor: '#000',
            shadowOffset: {width: 0, height: 2},
            shadowOpacity: 0.8,
            shadowRadius: 2,
          }}
          source={require('../Asset/no_slogan.png')}
        />
      </FadeInView>
    </View>
  );
};
