// src/screens/SplashLoader.tsx
import React, { useEffect } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SplashLoader = ({ navigation }: { navigation: any }) => {
  useEffect(() => {
    const checkAuth = async () => {
      const token = await AsyncStorage.getItem('authToken');
      navigation.replace(token ? 'Home' : 'Login');
    };
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const token = await AsyncStorage.getItem('authToken');
    const mustDoTests = await AsyncStorage.getItem('mustDoTests');

    if (token && mustDoTests === 'true') {
        navigation.replace('InputData');
    } else if (token) {
        navigation.replace('Home');
    } else {
        navigation.replace('Login');
    }
    };

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#2E7D32" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    backgroundColor: '#fff', // o el color que uses
  },
});



export default SplashLoader;
