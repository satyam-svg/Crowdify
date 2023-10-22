import React, { useState } from "react";
import { SafeAreaView, Text, View, StyleSheet, TouchableOpacity, Alert, TextInput } from "react-native";
import { FontAwesome5 } from '@expo/vector-icons';
import LottieView from 'lottie-react-native';
import axios from 'axios';
import { MaterialIcons } from '@expo/vector-icons'; 
import { useNavigation } from '@react-navigation/native'; 

const Phone = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [tapped, setTapped] = useState(false);
  const [animationFinished, setAnimationFinished] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [successMessage, setSuccessMessage] = useState(''); // New state for success message

  const handleEmailInputTap = () => {
    setTapped(true);
  };

  const handleAnimationFinish = () => {
    console.log('Animation Finished!');
    setAnimationFinished(true);
  };

  const sendOTP = async () => {
    try {
      const response = await axios.post("http://192.168.170.235:8082/send-otp", {
        email,
      });
      if (response.data.success) {
        setOtpSent(true);
        setSuccessMessage("OTP sent successfully!"); // Set success message
        navigation.navigate("VerificationForm", { email });
      } else {
        navigation.navigate('Verify');
      }
    } catch (error) {
      console.error("Error sending OTP:", error);
      Alert.alert("Error", "Could not send OTP. Please try again later.");
    }
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
          <Text style={styles.ver}>Enter Your Email Address For Verification</Text>
          <Text style={styles.ver1}>
            Your email address is essential for account updates. We'll send you a verification code via email. Your privacy is our priority; we won't share your email.
          </Text>
          <View style={styles.input}>
            <TextInput
            
              placeholder="Enter your email"
              value={email}
              onChangeText={(text) => setEmail(text)}
              onFocus={handleEmailInputTap}
              style={styles.emailInput}
            />
            {tapped && email === '' && (
              <Text style={styles.warningText}>Enter your email (required)</Text>
            )}
          </View>
          <View style={styles.sign}>
            <Text style={styles.signtext}>Sign In with</Text>
            <View style={styles.font}>
              <View style={styles.fb}>
                <FontAwesome5 name="facebook" size={55} color="black" />
              </View>
              <View style={styles.fb}>
                <FontAwesome5 name="google" size={55} color="black" />
              </View>
            </View>
          </View>
        </View>
      )}
      {animationFinished && (
        <View style={styles.buttonContainer}>
          {otpSent ? (
            <Text style={{ color: "green", fontSize: 20 }}>
              {successMessage}
            </Text>
          ) : (
            <TouchableOpacity style={styles.button} onPress={sendOTP}>
              <Text style={styles.btntext}>NEXT</Text>
            </TouchableOpacity>
          )}
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
  emailInput: {
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
    color: 'black',
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
  btntext:{
        fontSize:30,
        fontWeight:"bold"
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
    flexDirection: 'row',
  },
});

export default Phone;
