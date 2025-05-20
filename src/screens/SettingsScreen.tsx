// src/screens/SettingsScreen.tsx

import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import { useColorScheme } from 'react-native'; // Para detectar el tema del sistema
import Input from '@/components/Input';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert, Button } from 'react-native';

const SettingsScreen = ({ navigation }: { navigation: any }) => {
  const handleLogout = async () => {
    await AsyncStorage.removeItem('authToken');
    Alert.alert('Sesión cerrada', 'Has cerrado sesión correctamente');
    navigation.replace('Login');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Configuración</Text>

      <TouchableOpacity style={styles.optionButton} onPress={() => navigation.navigate('Profile')}>
        <Text style={styles.optionText}>Perfil</Text>
      </TouchableOpacity>

      {/* Aquí puedes poner un toggle si implementas el modo claro/oscuro */}
      <TouchableOpacity style={styles.optionButton}>
        <Text style={styles.optionText}>Modo Oscuro: Próximamente 🌙</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.optionButton} onPress={() => Linking.openURL('https://tusitio.com/terminos')}>
        <Text style={styles.optionText}>Términos de uso</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Cerrar sesión</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
  },
  optionButton: {
    padding: 14,
    backgroundColor: '#e0e0e0',
    borderRadius: 8,
    marginBottom: 12,
  },
  optionText: {
    fontSize: 16,
    color: '#000',
  },
  logoutButton: {
    marginTop: 30,
    padding: 14,
    backgroundColor: '#d32f2f',
    borderRadius: 8,
    alignItems: 'center',
  },
  logoutText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default SettingsScreen;
