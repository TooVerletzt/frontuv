import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, Alert } from 'react-native';
import Button from '@/components/Button';
import UserService from '@/services/UserService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Picker } from '@react-native-picker/picker';

const RegisterScreen = ({ navigation }: { navigation: any }) => {
  const [form, setForm,] = useState({
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

  const handleRegister = async () => {
    const camposVacios = Object.entries(form).filter(([_, val]) => !val);
    if (camposVacios.length > 0) {
      Alert.alert('Campos incompletos', 'Por favor llena todos los campos.');
      return;
    }

    UserService.addUser(form);
    Alert.alert('¡Registro exitoso!', 'Ahora puedes iniciar sesión.');
    await AsyncStorage.setItem('authToken', 'nuevo_usuario');
    await AsyncStorage.setItem('mustDoTests', 'true');
    navigation.replace('InputData');
    navigation.navigate('Login');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Crear una cuenta</Text>

      <TextInput placeholder="Ej. Jeshua" style={styles.input} onChangeText={(v) => handleChange('nombre', v)} />
      <TextInput placeholder="Ej. Benítez" style={styles.input} onChangeText={(v) => handleChange('apellidoPaterno', v)} />
      <TextInput placeholder="Ej. Ruiz" style={styles.input} onChangeText={(v) => handleChange('apellidoMaterno', v)} />
      <TextInput placeholder="Ej. example@correo.com" style={styles.input} keyboardType="email-address" onChangeText={(v) => handleChange('correo', v)} />
      <TextInput placeholder="Ej. Ing_Soft2025*" style={styles.input} secureTextEntry onChangeText={(v) => handleChange('password', v)} />
      <TextInput placeholder="Ej. ZS24028763" style={styles.input} onChangeText={(v) => handleChange('matricula', v)} />
      <TextInput placeholder="Ej. Ingeniería de Software" style={styles.input} onChangeText={(v) => handleChange('carrera', v)} />
      <TextInput placeholder="Ej. 5" style={styles.input} keyboardType="numeric" onChangeText={(v) => handleChange('semestre', v)} />
      <Picker
        selectedValue={form.sexo}
        onValueChange={(itemValue) => handleChange('sexo', itemValue)}
        style={styles.picker}
      >
      <Picker.Item label="Selecciona tu sexo" value="" />
      <Picker.Item label="Masculino" value="masculino" />
      <Picker.Item label="Femenino" value="femenino" />
      <Picker.Item label="Otro" value="otro" />
      </Picker>


      <Button title="Registrar" onPress={handleRegister} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    backgroundColor: '#fff', // o el color que uses
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
  picker: {
    width: '100%',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 6,
    marginBottom: 15,
  },
});

export default RegisterScreen;
