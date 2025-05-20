import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Alert, TouchableOpacity } from 'react-native';

const SpeedTestScreen = ({ navigation }: { navigation: any }) => {
  const [tiempo, setTiempo] = useState('');

  const handleConfirmar = () => {
    if (!tiempo) {
      Alert.alert('Campo vacío', 'Ingresa el tiempo que tardaste en correr 50 metros.');
      return;
    }

    navigation.navigate('PruebasMenu');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Prueba de Velocidad</Text>
      <Text style={styles.description}>Corre 50 metros lo más rápido posible y registra tu tiempo en segundos.</Text>

      <TextInput
        placeholder="Ej. 11.5"
        keyboardType="numeric"
        value={tiempo}
        onChangeText={setTiempo}
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

export default SpeedTestScreen;
