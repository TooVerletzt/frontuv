// src/screens/ResistanceTestScreen.tsx
import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Alert,
  TouchableOpacity,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigation';

type ResistanceTestScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'Resistance'
>;

/**
 * Rubrica para puntaje de resistencia:
 * Velocidad = distancia / tiempo (m/s)
 * - <2 m/s: muy pobre        => 0
 * - 2–3   m/s: bajo          => 1–3
 * - 3–4   m/s: promedio      => 4–6
 * - 4–6   m/s: bueno         => 7–9
 * - ≥6    m/s: excelente     => 10
 */
function computeResistanceScore(distance: number, time: number): number {
  const speed = distance / time; // m/s
  if (speed >= 6) {
    return 10;
  }
  if (speed >= 4) {
    return Math.round(((speed - 4) / 2) * 2) + 7; // mapea 4–6 → 7–9
  }
  if (speed >= 3) {
    return Math.round((speed - 3) * 2) + 4; // mapea 3–4 → 4–6
  }
  if (speed >= 2) {
    return Math.round((speed - 2) * 2) + 1; // mapea 2–3 → 1–3
  }
  return 0;
}

const ResistanceTestScreen = ({ navigation, route }: ResistanceTestScreenProps) => {
  const { onFinish } = route.params;
  const [distance, setDistance] = useState('');     // Distancia en metros
  const [timer, setTimer] = useState(0);            // Segundos transcurridos
  const [isRunning, setIsRunning] = useState(false);
  const [canEnterDistance, setCanEnterDistance] = useState(false);
  const MAX_SPEED = 8;                              // m/s plausible máximo
  
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Efecto para manejar el cronómetro
  useEffect(() => {
    if (isRunning) {
      // iniciar
      intervalRef.current = setInterval(() => {
        setTimer(t => t + 1);
      }, 1000);
    } else {
      // detener
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }
    return () => {
      // limpieza al desmontar / cambiar isRunning
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [isRunning]);

  // Efecto para habilitar ingreso de distancia tras 60s
  useEffect(() => {
    if (timer >= 60) {
      setCanEnterDistance(true);
    }
  }, [timer]);

  const handleStart = () => {
    setTimer(0);
    setDistance('');
    setCanEnterDistance(false);
    setIsRunning(true);
  };

  const handleConfirmar = () => {
    if (!canEnterDistance) {
      Alert.alert('Espera primero', 'Debes correr al menos 60 segundos antes de ingresar distancia.');
      return;
    }
    const distNum = parseFloat(distance);
    if (isNaN(distNum) || distNum <= 0) {
      Alert.alert('Distancia inválida', 'Ingresa una distancia válida en metros.');
      return;
    }
    // coherencia velocidad
    const speed = distNum / timer;
    if (speed > MAX_SPEED) {
      Alert.alert(
        'Datos incoherentes',
        `La distancia es muy alta para ${timer}s.\nVelocidad ≈ ${speed.toFixed(1)} m/s (> ${MAX_SPEED} m/s).`
      );
      return;
    }
    // puntaje y escala 0–100
    const score0to10 = computeResistanceScore(distNum, timer);
    const finalScore = score0to10 * 10;

    Alert.alert(
      'Resultado registrado',
      `Distancia: ${distNum.toFixed(1)} m\nTiempo: ${timer}s\nPuntaje: ${finalScore}/100`
    );

    setIsRunning(false);
    onFinish(finalScore);
    navigation.goBack();
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Prueba de Resistencia</Text>
        <Text style={styles.description}>
          Corre al menos 60 segundos. Luego ingresa la distancia recorrida (m).
        </Text>

        <Text style={styles.timer}>Cronómetro: {timer}s</Text>

        <TextInput
          placeholder="Distancia (m)"
          keyboardType="numeric"
          value={distance}
          onChangeText={setDistance}
          style={[
            styles.input,
            (!canEnterDistance || isRunning) && styles.inputDisabled,
          ]}
          editable={canEnterDistance && !isRunning}
        />

        <TouchableOpacity
          style={[styles.button, isRunning && styles.buttonDisabled]}
          onPress={handleStart}
          disabled={isRunning}
        >
          <Text style={styles.buttonText}>
            {isRunning ? 'Corriendo…' : 'Iniciar'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.button,
            (!canEnterDistance || isRunning) && styles.buttonDisabled,
          ]}
          onPress={handleConfirmar}
          disabled={!canEnterDistance || isRunning}
        >
          <Text style={styles.buttonText}>Confirmar</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default ResistanceTestScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1, justifyContent: 'center', padding: 24, backgroundColor: '#fff',
  },
  title: {
    fontSize: 22, fontWeight: '700', textAlign: 'center', marginBottom: 12,
  },
  description: {
    fontSize: 16, textAlign: 'center', marginBottom: 20,
  },
  timer: {
    fontSize: 28, fontWeight: '600', textAlign: 'center', marginBottom: 20,
  },
  input: {
    borderColor: '#ccc', borderWidth: 1, borderRadius: 6,
    padding: 12, marginBottom: 20, fontSize: 16, color: '#222',
  },
  inputDisabled: {
    backgroundColor: '#f0f0f0', color: '#888',
  },
  button: {
    backgroundColor: '#2E7D32', padding: 14,
    borderRadius: 8, alignItems: 'center', marginVertical: 8,
  },
  buttonDisabled: {
    backgroundColor: '#a5d6a7',
  },
  buttonText: {
    color: '#fff', fontWeight: '700',
  },
});
