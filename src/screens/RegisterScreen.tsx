import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, Alert } from 'react-native';
import Button from '@/components/Button';
import UserService from '@/services/UserService';

const RegisterScreen = ({ navigation }: { navigation: any }) => {
  const [form, setForm] = useState({
    nombre: '',
    apellidoPaterno: '',
    apellidoMaterno: '',
    correo: '',
    matricula: '',
    carrera: '',
    semestre: '',
    sexo: '',
    password: '',
  });

  const handleChange = (key: string, value: string) => {
    setForm(prev => ({ ...prev, [key]: value }));
  };

  const handleRegister = () => {
    const camposVacios = Object.entries(form).filter(([_, val]) => !val);
    if (camposVacios.length > 0) {
      Alert.alert('Campos incompletos', 'Por favor llena todos los campos.');
      return;
    }

    UserService.addUser(form);
    Alert.alert('¡Registro exitoso!', 'Ahora puedes iniciar sesión.');
    navigation.navigate('Login');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Crear una cuenta</Text>

      <TextInput placeholder="Nombre" style={styles.input} onChangeText={(v) => handleChange('nombre', v)} />
      <TextInput placeholder="Apellido Paterno" style={styles.input} onChangeText={(v) => handleChange('apellidoPaterno', v)} />
      <TextInput placeholder="Apellido Materno" style={styles.input} onChangeText={(v) => handleChange('apellidoMaterno', v)} />
      <TextInput placeholder="Correo Electrónico" style={styles.input} keyboardType="email-address" onChangeText={(v) => handleChange('correo', v)} />
      <TextInput placeholder="Contraseña" style={styles.input} secureTextEntry onChangeText={(v) => handleChange('password', v)} />
      <TextInput placeholder="Matrícula" style={styles.input} onChangeText={(v) => handleChange('matricula', v)} />
      <TextInput placeholder="Carrera" style={styles.input} onChangeText={(v) => handleChange('carrera', v)} />
      <TextInput placeholder="Semestre" style={styles.input} keyboardType="numeric" onChangeText={(v) => handleChange('semestre', v)} />
      <TextInput placeholder="Sexo" style={styles.input} onChangeText={(v) => handleChange('sexo', v)} />

      <Button title="Registrar" onPress={handleRegister} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 40,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 6,
    padding: 10,
    marginBottom: 12,
  },
});

export default RegisterScreen;
