// src/screens/EvaluationScreen.tsx

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

const EvaluationScreen = ({ navigation }: { navigation: any }) => {
  const pruebas = [
    { nombre: 'Fuerza', ruta: 'PruebaFuerza' },
    { nombre: 'Flexibilidad', ruta: 'PruebaFlexibilidad' },
    { nombre: 'Resistencia', ruta: 'PruebaResistencia' },
    { nombre: 'Velocidad', ruta: 'PruebaVelocidad' },
  ];

  return (
    <View style={styles.container}>
      {/* Logo */}
      <Image
        source={require('@/assets/logo.png')}
        style={styles.logo}
        resizeMode="contain"
      />

      <Text style={styles.title}>Evaluaciones Físicas</Text>

      {pruebas.map((prueba, index) => (
        <TouchableOpacity
          key={index}
          style={styles.testButton}
          onPress={() => navigation.navigate(prueba.ruta)}
        >
          <Text style={styles.testButtonText}>{prueba.nombre}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  logo: {
    width: 160,
    height: 80,
    marginBottom: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  testButton: {
    width: '90%',
    backgroundColor: '#2E7D32',
    paddingVertical: 14,
    borderRadius: 8,
    marginBottom: 12,
    alignItems: 'center',
  },
  testButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default EvaluationScreen;
