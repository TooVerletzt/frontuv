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
 * Basada en velocidad (m/s). Se considera:
 * - <2 m/s: muy pobre
 * - 2–3 m/s: bajo
 * - 3–4 m/s: promedio
 * - 4–6 m/s: bueno
 * - ≥6 m/s: excelente
 * Puntaje 0–10 según rangos:
 *   speed < 2    => 0
 *   2 ≤ s < 3    => 1–3
 *   3 ≤ s < 4    => 4–6
 *   4 ≤ s < 6    => 7–9
 *   s ≥ 6        => 10
 */
function computeResistanceScore(distance: number, time: number): number {
  const speed = distance / time; // m/s
  if (speed >= 6) {
    return 10;
  }
  if (speed >= 4) {
    // mapea 4–6 a 7–9 linealmente
    return Math.round(((speed - 4) / (6 - 4)) * 2) + 7;
  }
  if (speed >= 3) {
    // mapea 3–4 a 4–6
    return Math.round(((speed - 3) / (4 - 3)) * 2) + 4;
  }
  if (speed >= 2) {
    // mapea 2–3 a 1–3
    return Math.round(((speed - 2) / (3 - 2)) * 2) + 1;
  }
  return 0;
}

const ResistanceTestScreen = ({ navigation, route }: ResistanceTestScreenProps) => {
  const { onFinish } = route.params;
  const [distance, setDistance] = useState('');     // Distancia en metros
  const [timer, setTimer] = useState(0);            // Segundos transcurridos
  const [isRunning, setIsRunning] = useState(false);
  const [canEnterDistance, setCanEnterDistance] = useState(false);

  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Máxima velocidad plausible (m/s) para evitar datos absurdos: 8 m/s (~28.8 km/h)
  const MAX_SPEED = 8;

  // Iniciar cronómetro
  const handleStart = () => {
    setDistance('');
    setIsRunning(true);
    setTimer(0);
    setCanEnterDistance(false);

    intervalRef.current = setInterval(() => {
      setTimer((t) => t + 1);
    }, 1000);
  };

  // Control del cronómetro y habilitación del campo distancia
  useEffect(() => {
    if (!isRunning && intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    if (timer >= 60 && !canEnterDistance) {
      // Tras 60 segundos, habilitamos ingreso de distancia
      setCanEnterDistance(true);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [timer, isRunning]);

  // Confirmar resultado
  const handleConfirmar = () => {
    const distNum = parseFloat(distance);
    if (!canEnterDistance) {
      Alert.alert('Espera primero', 'Debes correr al menos 60 segundos antes de ingresar distancia.');
      return;
    }
    if (isNaN(distNum) || distNum <= 0) {
      Alert.alert('Distancia inválida', 'Ingresa una distancia válida en metros.');
      return;
    }
    // Verificar coherencia: speed <= MAX_SPEED
    const speed = distNum / timer; // m/s
    if (speed > MAX_SPEED) {
      Alert.alert(
        'Datos incoherentes',
        `La distancia ingresada es demasiado alta para ${timer}s.\nVelocidad ≈ ${speed.toFixed(
          1
        )} m/s (> ${MAX_SPEED} m/s).`
      );
      return;
    }

    // Calcular puntaje 0–10 y escalar a 0–100
    const score0to10 = computeResistanceScore(distNum, timer);
    const finalScore = score0to10 * 10; // 0–100

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
          Corre al menos 60 segundos. Después, ingresa la distancia recorrida en metros.
        </Text>

        <Text style={styles.timer}>Cronómetro: {timer}s</Text>

        {/* Distancia solo editable tras 60s */}
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
            {isRunning ? `Corriendo...` : 'Iniciar'}
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
    flex: 1,
    justifyContent: 'center',
    padding: 24,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  timer: {
    fontSize: 28,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 6,
    padding: 12,
    marginBottom: 20,
    fontSize: 16,
    color: '#222',
  },
  inputDisabled: {
    backgroundColor: '#f0f0f0',
    color: '#888',
  },
  button: {
    backgroundColor: '#2E7D32',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 8,
  },
  buttonDisabled: {
    backgroundColor: '#a5d6a7',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
