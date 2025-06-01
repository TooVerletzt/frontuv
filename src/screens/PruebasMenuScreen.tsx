// src/screens/PruebasMenuScreen.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigation';

type PruebasMenuNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'PruebasMenuScreen'
>;

const PruebasMenuScreen = () => {
  const navigation = useNavigation<PruebasMenuNavigationProp>();
  const route = useRoute();
  const { imc } = route.params as { imc: string };

  const [scores, setScores] = useState<{
    strength: number | null;
    speed: number | null;
    flexibility: number | null;
    resistance: number | null;
  }>({
    strength: null,
    speed: null,
    flexibility: null,
    resistance: null,
  });

  const markScore = (key: keyof typeof scores, score: number) => {
    setScores((prev) => ({ ...prev, [key]: score }));
  };

  const allDone = Object.values(scores).every((v) => v !== null);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Elige tu prueba</Text>

      {/* 1. Prueba de Flexibilidad (estiramiento previo) */}
      <TouchableOpacity
        style={[styles.button, scores.flexibility !== null && styles.disabled]}
        onPress={() =>
          navigation.navigate('Flexibility', {
            onFinish: (score) => markScore('flexibility', score),
          })
        }
        disabled={scores.flexibility !== null}
      >
        <Text style={styles.buttonText}>
          {scores.flexibility !== null
            ? `Flexibilidad ✔️ (${scores.flexibility}/100)`
            : 'Prueba de Flexibilidad'}
        </Text>
      </TouchableOpacity>

      {/* 2. Prueba de Fuerza */}
      <TouchableOpacity
        style={[styles.button, scores.strength !== null && styles.disabled]}
        onPress={() =>
          navigation.navigate('Strength', {
            onFinish: (score) => markScore('strength', score),
          })
        }
        disabled={scores.strength !== null}
      >
        <Text style={styles.buttonText}>
          {scores.strength !== null
            ? `Fuerza ✔️ (${scores.strength}/100)`
            : 'Prueba de Fuerza'}
        </Text>
      </TouchableOpacity>

      {/* 3. Prueba de Velocidad */}
      <TouchableOpacity
        style={[styles.button, scores.speed !== null && styles.disabled]}
        onPress={() =>
          navigation.navigate('Speed', {
            onFinish: (score) => markScore('speed', score),
          })
        }
        disabled={scores.speed !== null}
      >
        <Text style={styles.buttonText}>
          {scores.speed !== null
            ? `Velocidad ✔️ (${scores.speed}/100)`
            : 'Prueba de Velocidad'}
        </Text>
      </TouchableOpacity>

      {/* 4. Prueba de Resistencia */}
      <TouchableOpacity
        style={[styles.button, scores.resistance !== null && styles.disabled]}
        onPress={() =>
          navigation.navigate('Resistance', {
            onFinish: (score) => markScore('resistance', score),
          })
        }
        disabled={scores.resistance !== null}
      >
        <Text style={styles.buttonText}>
          {scores.resistance !== null
            ? `Resistencia ✔️ (${scores.resistance}/100)`
            : 'Prueba de Resistencia'}
        </Text>
      </TouchableOpacity>

      {allDone && (
        <TouchableOpacity
          style={[styles.button, styles.finishButton]}
          onPress={() =>
            navigation.navigate('Results', {
              fuerza: scores.strength!,
              velocidad: scores.speed!,
              flexibilidad: scores.flexibility!,
              resistencia: scores.resistance!,
              imc: imc,
            })
          }
        >
          <Text style={styles.buttonText}>Ver Resultados 🎉</Text>
        </TouchableOpacity>
      )}
    </SafeAreaView>
  );
};

export default PruebasMenuScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 30,
    color: '#2f855a',
  },
  button: {
    backgroundColor: '#38a169',
    paddingVertical: 16,
    borderRadius: 10,
    marginBottom: 20,
    alignItems: 'center',
    elevation: 4,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '700',
  },
  disabled: {
    backgroundColor: '#a0aec0',
  },
  finishButton: {
    backgroundColor: '#3182ce',
  },
});
