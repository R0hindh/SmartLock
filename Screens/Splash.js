import React, {useRef, useEffect, useState} from 'react';
import {
  Animated,
  Text,
  View,
  Image,
  PixelRatio,
  StatusBar,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import auth from '@react-native-firebase/auth';

const FadeInView = props => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const [fadeOutState, setfadeOutState] = useState(false);

  // console.log("1111",PixelRatio.get())
  // console.log("1112",PixelRatio.getPixelSizeForLayoutSize(50))

  React.useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 2,
      useNativeDriver: true,
    }).start(() => {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      }).start(() => {
        console.log('Completed animation');
        props.setIsLoading(false);
      });
    });
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

export default SplashScreen = ({navigation, setIsLoading}) => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#3386EB" barStyle={'default'} />
      <View style={styles.bodyView}>
        <StatusBar
          style={{
            backgroundColor: '#3386EB',
          }}
        />
        <FadeInView navigation={navigation} setIsLoading={setIsLoading}>
          <View style={styles.Imagecontainer}>
            <Image source={require('../Asset/no_slogan.png')} style={styles.logo}/>
          </View>
        </FadeInView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ECF0F1',
  },
  buttonsContainer: {
    padding: 10,
  },
  Imagecontainer:{
    alignItems: 'center',
    margin: 10,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.8,
    overflow: 'hidden',
    shadowRadius: 2,
  },
  logo: {
    height: 150,
    width: 150,
    resizeMode: 'cover', 
  },
  textStyle: {
    textAlign: 'center',
    marginBottom: 8,
  },
  bodyView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#3386EB',
  },
  imageFadeIn: {
    width: PixelRatio.getPixelSizeForLayoutSize(95),
    height: PixelRatio.getPixelSizeForLayoutSize(95),
    alignItems: 'center',
    margin: 10,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.8,
    shadowRadius: 2,
  },
});
