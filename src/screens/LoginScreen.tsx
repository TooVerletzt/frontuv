// src/screens/LoginScreen.tsx

import React, { useState } from 'react';
import { View, Text, TextInput, Alert, StyleSheet } from 'react-native';
import Button from '@/components/Button';
import Input from '@/components/Input';
import { TouchableOpacity } from 'react-native';
import UserService from '@/services/UserService';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = ({ navigation }: { navigation: any }) => {
  // Estados para guardar los valores del formulario
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Función que maneja el inicio de sesión
  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Por favor ingresa tu correo y contraseña');
      return;
    }

    const valid = UserService.authenticate(email, password);
    if (valid) {
      // Guarda una sesión ficticia
      await AsyncStorage.setItem('authToken', 'token_de_ejemplo');
      
      // Redirige a la pantalla principal
      navigation.replace('Home');
    } else {
      Alert.alert('Error', 'Credenciales incorrectas');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Iniciar sesión</Text>

      <TextInput
        style={styles.input}
        placeholder="Correo electrónico"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <Button title="Iniciar sesión" onPress={handleLogin} />

      <View style={styles.registerContainer}>

      <Text style={styles.registerText}>¿No tienes cuenta?</Text>
      <TouchableOpacity onPress={() => navigation.navigate('Register')}>
        <Text style={styles.registerLink}>¡Crea una!</Text>
      </TouchableOpacity>
  </View>
    </View>
  );
};

// Estilos para el formulario
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    backgroundColor: '#fff', // o el color que uses
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 6,
    padding: 10,
    marginBottom: 15,
  },
  registerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  registerText: {
    marginRight: 4,
  },
  registerLink: {
    color: '#007bff',
    fontWeight: 'bold',
  },  
});

export default LoginScreen;
