import React from 'react';
import { View, StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';
import { useNavigation } from '@react-navigation/native';

export default function Splash() {
  const navigation = useNavigation();

  const handleAnimationFinish = () => {
    navigation.replace('Home');
  };

  return (
    <View style={styles.container}>
      <LottieView
        source={require('../assets/splash.json')}
        autoPlay
        loop={false}
        speed={1}
        onAnimationFinish={handleAnimationFinish}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
