import React, { useState } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, StyleSheet, Image } from 'react-native';
import LottieView from 'lottie-react-native';

const Home = () => {
  const [animationFinished, setAnimationFinished] = useState(false);

  const handleAnimationFinish = () => {
    console.log('Animation Finished!');
    setAnimationFinished(true);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          flex: 1,
          backgroundColor: '#ffffff',
        }}
      >
        {!animationFinished ? (
          <LottieView
            source={require('../assets/splash3.json')}
            autoPlay
            loop={false}
            speed={0.5}
            onAnimationFinish={handleAnimationFinish}
          />
        ) : (
          <View style={{ flex: 1 }}>
            <Image style={styles.image} source={require('../image/taxi2.jpg')} />
            <View style={styles.main}>
            <Text style={styles.text}>Efficiency at its best:</Text>
            <Text style={styles.text}>Drivers pick routes,</Text>
            <Text style={styles.text}>passengers know when to step out.</Text>
            </View>
            <TouchableOpacity style={styles.button}>
              <Text style={{ color: 'white' }}>Continue With Mobile Number</Text>
            </TouchableOpacity>
            <Text style={styles.privacy}>
              By continuing, you agree that you have read and accept our 
              <Text style={styles.underlineText}> T&amp;C's</Text> and 
              <Text style={styles.underlineText}> Privacy Policy</Text>
            </Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width: '100%',
    height: '70%',
  },
  main:{
      marginTop:30,
  },
  text: {
    fontSize: 25,
    marginLeft: 10,
  },
  button: {
    alignItems: 'center',
    backgroundColor: 'black',
    padding: 10,
    width: '80%',
    alignSelf: 'center',
    borderRadius: 30,
    marginTop: 20,
  },
  privacy: {
    fontStyle: 'italic',
    color: 'gray', // You can adjust the color as needed
    marginTop: 20,
    marginLeft:10,
  },
  underlineText: {
    textDecorationLine: 'underline',
  },
});

export default Home;
