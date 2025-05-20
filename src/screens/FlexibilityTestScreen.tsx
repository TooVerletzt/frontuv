import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Alert, TouchableOpacity } from 'react-native';

const FlexibilityTestScreen = ({ navigation, route }: { navigation: any; route: any }) => {
  const [valor, setValor] = useState('');

  const handleConfirmar = () => {
    if (!valor) {
      Alert.alert('Campo vacío', 'Por favor ingresa la distancia alcanzada en centímetros.');
      return;
    }

    // Marca como prueba completada en el menú
    if (route.params?.onFinish) route.params.onFinish();

    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Prueba de Flexibilidad</Text>
      <Text style={styles.description}>
        Mide cuántos centímetros logras alcanzar estirándote hacia adelante desde posición sentada.
      </Text>

      <TextInput
        placeholder="Ej. 18"
        keyboardType="numeric"
        value={valor}
        onChangeText={setValor}
        style={styles.input}
      />

      <TouchableOpacity style={styles.button} onPress={handleConfirmar}>
        <Text style={styles.buttonText}>Confirmar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 24, backgroundColor: '#fff' },
  title: { fontSize: 22, fontWeight: 'bold', textAlign: 'center', marginBottom: 12 },
  description: { fontSize: 16, textAlign: 'center', marginBottom: 20 },
  input: { borderColor: '#ccc', borderWidth: 1, borderRadius: 6, padding: 12, marginBottom: 20 },
  button: { backgroundColor: '#2E7D32', padding: 14, borderRadius: 8, alignItems: 'center' },
  buttonText: { color: '#fff', fontWeight: 'bold' },
});

export default FlexibilityTestScreen;
