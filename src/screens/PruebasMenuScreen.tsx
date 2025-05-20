// src/screens/PruebasMenuScreen.tsx

import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';

const PruebasMenuScreen = ({ navigation }: { navigation: any }) => {
  const [completadas, setCompletadas] = useState({
    fuerza: false,
    velocidad: false,
    flexibilidad: false,
    resistencia: false,
  });

  useEffect(() => {
    const todasHechas = Object.values(completadas).every(Boolean);
    if (todasHechas) {
      setTimeout(() => navigation.replace('Motivational'), 800); // delay de transición
    }
  }, [completadas]);

  const marcarCompletada = (tipo: string) => {
    setCompletadas((prev) => ({ ...prev, [tipo]: true }));
  };

  const handleNavegar = (pantalla: string, tipo: string) => {
    navigation.navigate(pantalla, {
      onFinish: () => marcarCompletada(tipo),
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Evaluaciones Físicas</Text>
      <Text style={styles.subtitle}>Realiza las siguientes pruebas:</Text>

      <BotonPrueba
        titulo="Fuerza"
        disabled={completadas.fuerza}
        onPress={() => handleNavegar('Strength', 'fuerza')}
      />
      <BotonPrueba
        titulo="Velocidad"
        disabled={completadas.velocidad}
        onPress={() => handleNavegar('Speed', 'velocidad')}
      />
      <BotonPrueba
        titulo="Flexibilidad"
        disabled={completadas.flexibilidad}
        onPress={() => handleNavegar('Flexibility', 'flexibilidad')}
      />
      <BotonPrueba
        titulo="Resistencia"
        disabled={completadas.resistencia}
        onPress={() => handleNavegar('Resistance', 'resistencia')}
      />
    </View>
  );
};

const BotonPrueba = ({ titulo, disabled, onPress }: any) => (
  <TouchableOpacity
    style={[styles.button, disabled && styles.disabled]}
    onPress={onPress}
    disabled={disabled}
  >
    <Text style={styles.buttonText}>
      {disabled ? `${titulo} (Hecho)` : `Prueba de ${titulo}`}
    </Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 24, backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 12 },
  subtitle: { fontSize: 16, textAlign: 'center', marginBottom: 20 },
  button: {
    padding: 14,
    backgroundColor: '#2E7D32',
    borderRadius: 8,
    marginBottom: 14,
    alignItems: 'center',
  },
  disabled: {
    backgroundColor: '#9E9E9E',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default PruebasMenuScreen;
