import React, { useState } from "react";
import { SafeAreaView, Text, View, StyleSheet, TouchableOpacity } from "react-native";
import PhoneInput from "react-native-phone-number-input";
import { FontAwesome5 } from '@expo/vector-icons'; 
import { AntDesign } from '@expo/vector-icons'; 
import LottieView from 'lottie-react-native';

const Phone = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [tapped, setTapped] = useState(false);
  const [animationFinished, setAnimationFinished] = useState(false);

  const handlePhoneInputTap = () => {
    setTapped(true);
  };

  const handleAnimationFinish = () => {
    console.log('Animation Finished!');
    setAnimationFinished(true);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {!animationFinished ? (
        <LottieView
          source={require('../assets/splash4.json')}
          autoPlay
          loop={false}
          speed={0.5}
          onAnimationFinish={handleAnimationFinish}
        />
      ) : (
        <View style={styles.container}>
          <Text style={styles.text}>WELCOME TO</Text>
          <Text style={styles.text1}>CROWDIFY</Text>
          <View style={styles.line}></View>
          <Text style={styles.ver}>Enter Your Phone Number For Verification</Text>
          <Text style={styles.ver1}>
            Your contact number is essential for ride updates. We'll send you a verification code via SMS. Your privacy is our priority; we won't share your number.
          </Text>
          <View style={styles.input}>
            <PhoneInput
              defaultValue={phoneNumber}
              containerStyle={{ width: "95%", borderColor: 'white' }}
              defaultCode="IN"
              onChangeText={(text) => setPhoneNumber(text)}
              onFocus={handlePhoneInputTap}
            />
            {tapped && phoneNumber === '' && (
              <Text style={styles.warningText}>Enter your phone number (required)</Text>
            )}
          </View>
          <View style={styles.sign}>
            <Text style={styles.signtext}>Sign In with</Text>
            <View style={styles.font}>
              <View style={styles.fb}>
                <FontAwesome5 name="facebook" size={55} color="black" />
              </View>
              <View style={styles.google}>
                <FontAwesome5 name="google" size={51} color="black" />
              </View>
            </View>
          </View>
        </View>
      )}
      {animationFinished && (
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button}>
            <Text style={{ color: 'white', alignSelf: 'center', fontSize: 25, fontWeight: 'bold' }}>NEXT</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 58,
    marginLeft: 20,
  },
  text: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  text1: {
    fontSize: 60,
    fontWeight: 'bold',
  },
  line: {
    marginTop: 10,
    width: '55%',
    height: 4,
    backgroundColor: 'gray',
  },
  buttonContainer: {
    width: '100%',
    justifyContent: 'flex-end',
  },
  button: {
    backgroundColor: '#0C9800',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ver: {
    marginTop: 30,
    fontSize: 25,
    fontWeight: 'bold',
  },
  ver1: {
    marginTop: 20,
    fontStyle: 'italic',
  },
  input: {
    marginTop: 60,
  },
  warningText: {
    color: 'red',
    marginTop: 10,
  },
  sign: {
    flex: 1,
    justifyContent: 'center',
    marginTop: 100,
  },
  signtext: {
    alignSelf: 'center',
    fontSize: 19,
    fontWeight: 'bold',
  },
  font: {
    alignSelf: 'center',
    flexDirection: 'row',
    marginLeft: 20,
    marginTop: 21,
  },
  fb: {
    marginRight: 20,
  },
  google: {
    marginRight: 20,
  },
});

export default Phone;
