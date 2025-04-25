// src/screens/ResultsScreen.tsx

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Button from '@/components/Button';

const ResultsScreen = ({ route, navigation }: { route: any, navigation: any }) => {
  const { fuerza, resistencia, flexibilidad, velocidad, imc } = route.params;

  const promedio = Math.round(
    (Number(fuerza) + Number(resistencia) + Number(flexibilidad) + Number(velocidad)) / 4
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>¡Evaluación Completada!</Text>
      <Text style={styles.result}>Tu IMC fue: {imc}</Text>
      <Text style={styles.result}>Promedio general: {promedio}/100</Text>

      <Button title="Ir al Menú Principal" onPress={() => navigation.navigate('Home')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 30, textAlign: 'center' },
  result: { fontSize: 18, marginBottom: 10, textAlign: 'center' },
});

export default ResultsScreen;
