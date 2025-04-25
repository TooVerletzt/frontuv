// src/screens/EvaluationScreen.tsx

import React, { useState } from 'react';
import { View, Text, Alert, StyleSheet } from 'react-native';
import Button from '@/components/Button';

const EvaluationScreen = ({ navigation, route }: { navigation: any, route: any }) => {
  const { imc } = route.params;
  const [evaluations, setEvaluations] = useState({
    fuerza: null,
    resistencia: null,
    flexibilidad: null,
    velocidad: null,
  });
  const [completed, setCompleted] = useState<string[]>([]);

  const handleEvaluation = (type: keyof typeof evaluations) => {
    const value = Math.floor(Math.random() * 26) + 75; // Simula un resultado entre 75 y 100
    Alert.alert(`${type.charAt(0).toUpperCase() + type.slice(1)} completado`, `Resultado: ${value}`, [
      {
        text: "OK", onPress: () => {
          setEvaluations(prev => ({ ...prev, [type]: value }));
          setCompleted(prev => [...prev, type]);
        }
      }
    ]);
  };

  const isAllCompleted = completed.length === 4;

  const handleFinish = () => {
    navigation.navigate('Results', { ...evaluations, imc });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Evaluación Física</Text>

      {['fuerza', 'resistencia', 'flexibilidad', 'velocidad'].map((item) => (
        <Button
          key={item}
          title={`Evaluar ${item}`}
          onPress={() => handleEvaluation(item as any)}
          disabled={completed.includes(item)}
        />
      ))}

      {isAllCompleted && (
        <Button title="Finalizar Evaluación" onPress={handleFinish} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
});

export default EvaluationScreen;
