import React, { useState } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation
import car from './image/car.png';
import arrow from './image/Arrow.png';

const Home = () => {
  const navigation = useNavigation(); // Get the navigation object

  const [animationFinished, setAnimationFinished] = useState(false);

  const handleAnimationFinish = () => {
    console.log('Animation Finished!');
    setAnimationFinished(true);
  };

  const onpress = () => {
    // Use navigation.navigate to redirect to Phone.js
    navigation.navigate('Phone');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container_items}>
        <View style={styles.navbar}>
            <Text style={styles.titles}></Text>
        </View>
        <Image
          style={styles.car_image}
          source={car}
        />
        <View style={styles.footer}>
          <Text style={styles.footer_items}>  Track Your Taxi Instantly</Text>
          <Text style={styles.footer_items1}>  Effortless travel with real-time updates.</Text>
          
        </View>
        <View style={styles.get_started}><Image
          style={styles.arrow_image}
          source={arrow}
          
        /></View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  navbar: {
     
  },
  titles: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  car_image: {
    width: '100%',
    height: '50%',
    marginTop: '22%',
  },
  container_items: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center', // Center the image vertically
  },
  // ... rest of your styles
  image: {
    width: '100%',
    height: '70%',
  },
  main: {
    marginTop: 30,
  },
  text: {
    fontSize: 25,
    marginLeft: 10,
    fontWeight: 'bold',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
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
    marginLeft: 10,
  },
  underlineText: {
    textDecorationLine: 'underline',
  },
  footer:{
    display:'flex',
    flexDirection: 'column',
  },
  footer_items:{
    color: 'white',
    fontSize:25,
    fontWeight: 'bold',
    marginTop:'10%',
    marginLeft:'11%'
  },
  footer_items1:{
    color: 'gray',
    fontSize:25,
    fontWeight: 'bold',
    marginTop:'2%',
  },
  get_started:{
    marginTop:'7%',
    height: 100,
    width: 100,
    borderRadius:50,
    backgroundColor:'rgba(141, 255, 131, 1)',
  },
  arrow_image:{
    width:'80%',
    marginTop:'29%',
    marginLeft:'10%'
  }
});

export default Home;
