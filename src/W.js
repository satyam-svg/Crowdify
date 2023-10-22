import React from "react";
import { View, Text, StyleSheet } from 'react-native';

const W = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>This is the 'w' screen</Text>
      {/* Add your screen content here */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20, // Adjust the font size as needed
  },
});

export default W;
