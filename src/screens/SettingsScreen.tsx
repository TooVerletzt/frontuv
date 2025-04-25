// src/screens/SettingsScreen.tsx

import React, { useState } from 'react';
import { View, Text, Switch, StyleSheet } from 'react-native';
import { useColorScheme } from 'react-native-appearance'; // Para detectar el tema del sistema
import Button from '@/components/Button';
import Input from '@/components/Input';

const SettingsScreen = () => {
  // Estado para manejar el cambio de tema
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Cambia el tema
  const toggleSwitch = () => setIsDarkMode(previousState => !previousState);

  return (
    <View style={[styles.container, isDarkMode ? styles.darkMode : styles.lightMode]}>
      <Text style={styles.title}>Configuraciones</Text>

      <View style={styles.settingContainer}>
        <Text style={styles.settingText}>Modo Oscuro</Text>
        <Switch
          value={isDarkMode}
          onValueChange={toggleSwitch}
        />
      </View>

      {/* Aquí podrías agregar más configuraciones si lo necesitas */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  settingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  settingText: {
    fontSize: 18,
  },
  darkMode: {
    backgroundColor: '#333',
    color: 'white',
  },
  lightMode: {
    backgroundColor: '#fff',
    color: 'black',
  },
});

export default SettingsScreen;
