import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Splash from './src/Splash'; // Import your Splash component
import Home from './src/Home'; // Import your Home component
import Phone from './src/Phone';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash">
        <Stack.Screen
          name="Splash"
          component={Splash}
          options={{ headerShown: false }} // Hide the header for the Splash screen
        />
        <Stack.Screen 
        name="Home" 
        component={Home} 
        options={{ headerShown: false }}/>
        <Stack.Screen 
        name="Phone" 
        component={Phone} 
        options={{ headerShown: false }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
