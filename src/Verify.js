import React, { useRef, useState, useEffect } from "react";
import { View, Text, SafeAreaView, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import LottieView from 'lottie-react-native';
import { useNavigation } from '@react-navigation/native';

const Verify = () => {
  const navigation = useNavigation();
  const [otp, setOtp] = useState(['', '', '', '']);
  const otpInputRefs = [useRef(), useRef(), useRef(), useRef()];
  const [otpStatus, setOtpStatus] = useState(null);
  const [isAnimationVisible, setIsAnimationVisible] = useState(false);

  const handleOtpInputChange = (index, value) => {
    if (value === '') {
      if (index > 0) {
        otpInputRefs[index - 1].current.focus();
      } else {
        otpInputRefs[index].current.focus();
      }
      setOtp((prevOtp) => {
        const updatedOtp = [...prevOtp];
        updatedOtp[index] = '';
        return updatedOtp;
      });
    } else if (/^\d+$/.test(value)) {
      setOtp((prevOtp) => {
        const updatedOtp = [...prevOtp];
        updatedOtp[index] = value;
        if (index < 3) {
          otpInputRefs[index + 1].current.focus();
        }
        return updatedOtp;
      });
    }
  };

  const handleVerify = async () => {
    console.log('Button is clicked');

    const enteredOTP = otp.join('');

    try {
      setIsAnimationVisible(true);

      // Simulate a delay to show the animation for demonstration purposes
      setTimeout(async () => {
        const response = await fetch('http://192.168.170.235:8082/verify-otp', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: 'your-email@example.com',
            otp: enteredOTP,
          }),
        });

        if (response.status === 200) {
          setOtpStatus('OTP is correct');
        } else if (response.status === 404) {
          setOtpStatus('OTP not found or expired.');
        } else if (response.status === 400) {
          setOtpStatus('OTP has expired.');
        } else {
          setOtpStatus('Error verifying OTP.');
        }
      }, 2000); // Simulated 2-second delay

    } catch (error) {
      console.error('Error verifying OTP: ' + error);
      setOtpStatus('Error verifying OTP');
    }
  };

  useEffect(() => {
    if (otpStatus === 'OTP is correct') {
      // Navigate to 'w.js' when animation finishes
      setTimeout(() => {
        setIsAnimationVisible(false);
        navigation.navigate('W');
      }, 2000); // Simulated 2-second delay before navigating to 'w.js'
    }
  }, [otpStatus, navigation]);

  return (
    <SafeAreaView style={styles.container}>
      {isAnimationVisible && (
        <View style={styles.splashContainer}>
          <LottieView
            source={require('../assets/success.json')}
            autoPlay
            loop={false}
            speed={1}
            onAnimationFinish={() => {
              navigation.navigate('W');
            }}
          />
        </View>
      )}
      {!isAnimationVisible && (
        <View style={styles.email}>
          <Text style={styles.email1}>Verify Your Email</Text>
          <Text style={styles.code}>Enter your OTP code here</Text>
          <View style={styles.otpContainer}>
            {[0, 1, 2, 3].map((index) => (
              <TextInput
                key={index}
                ref={otpInputRefs[index]}
                style={[
                  styles.otpInput,
                  {
                    backgroundColor: otp[index] ? 'black' : 'white',
                  },
                ]}
                keyboardType="numeric"
                onChangeText={(value) => handleOtpInputChange(index, value)}
                value={otp[index]}
                maxLength={1}
              />
            ))}
          </View>
          {otpStatus && <Text style={otpStatus === 'OTP is correct' ? styles.successText : styles.errorText}>{otpStatus}</Text>}
          <Text style={styles.recieve}>
            Didn't you receive any code?
          </Text>
          <Text style={styles.recieve1} onPress={handleVerify}>
            RESEND NEW CODE
          </Text>
        </View>
      )}
      {!isAnimationVisible && (
        <View style={styles.content}>
          <TouchableOpacity style={styles.button} onPress={handleVerify}>
            <Text style={styles.btntext}>VERIFY</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  splashContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white', // Change to the desired background color
  },
  email: {
    flex: 1,
    flexDirection: 'column',
    marginTop: 80,
  },
  email1: {
    fontSize: 30,
    fontWeight: "bold",
    marginTop: 170,
    alignSelf: 'center',
  },
  code: {
    alignSelf: 'center',
    fontStyle: 'italic',
    color: 'gray',
    marginTop: 10,
  },
  otpContainer: {
    marginTop: 40,
    alignSelf: 'center',
    marginBottom: 20,
    flexDirection: 'row',
  },
  otpInput: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 1,
    borderColor: 'gray',
    textAlign: 'center',
    fontSize: 24,
    marginHorizontal: 5,
    color: 'white',
  },
  recieve: {
    alignSelf: 'center',
    fontSize: 17,
    fontStyle: 'italic',
    color: 'gray',
  },
  recieve1: {
    alignSelf: 'center',
    fontWeight: 'bold',
    color: '#E100AF',
    marginTop: 12,
  },
  successText: {
    alignSelf: 'center',
    color: 'green',
    marginTop: 10,
  },
  errorText: {
    alignSelf: 'center',
    color: 'red',
    marginTop: 10,
  },
  content: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  button: {
    backgroundColor: '#0C9800',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btntext: {
    fontSize: 30,
    fontWeight: "bold",
  },
});

export default Verify;
