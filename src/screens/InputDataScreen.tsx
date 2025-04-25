// src/screens/InputDataScreen.tsx

import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, Alert } from 'react-native';
import Button from '@/components/Button';

const InputDataScreen = ({ navigation }: { navigation: any }) => {
  const [peso, setPeso] = useState('');
  const [estatura, setEstatura] = useState('');
  const [imc, setImc] = useState('');

  useEffect(() => {
    const pesoNum = parseFloat(peso);
    const estaturaNum = parseFloat(estatura) / 100; // convertir cm a m

    if (pesoNum > 0 && estaturaNum > 0) {
      const resultado = pesoNum / (estaturaNum * estaturaNum);
      setImc(resultado.toFixed(2));
    } else {
      setImc('');
    }
  }, [peso, estatura]);

  const handleSubmit = () => {
    if (!peso || !estatura || !imc) {
      Alert.alert('Error', 'Completa todos los campos.');
      return;
    }

    navigation.navigate('Evaluation', { imc });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Datos Iniciales</Text>

      <TextInput
        style={styles.input}
        placeholder="Peso (kg)"
        keyboardType="numeric"
        value={peso}
        onChangeText={setPeso}
      />
      <TextInput
        style={styles.input}
        placeholder="Estatura (cm)"
        keyboardType="numeric"
        value={estatura}
        onChangeText={setEstatura}
      />
      <TextInput
        style={[styles.input, { backgroundColor: '#eee' }]}
        placeholder="IMC (calculado)"
        value={imc}
        editable={false}
      />

      <Button title="Continuar" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  input: { borderColor: '#ccc', borderWidth: 1, borderRadius: 6, padding: 10, marginBottom: 15 },
});

export default InputDataScreen;
