// src/navigation/RegisterScreen.tsx
import React, { useState } from 'react';
import UserService, { User } from '../services/UserService';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  useColorScheme,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

type RootStackParamList = {
  Register: undefined;
  Login: undefined;
  Home: undefined;
};

type RegisterScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Register'>;

const RegisterScreen = () => {
  const navigation = useNavigation<RegisterScreenNavigationProp>();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  const [apellidoPaterno, setApellidoPaterno] = useState('');
  const [apellidoMaterno, setApellidoMaterno] = useState('');
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [matricula, setMatricula] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validateAndRegister = () => {
    const newErrors: { [key: string]: string } = {};

    if (!apellidoPaterno.trim()) newErrors.apellidoPaterno = 'Campo requerido';
    if (!apellidoMaterno.trim()) newErrors.apellidoMaterno = 'Campo requerido';
    if (!nombre.trim()) newErrors.nombre = 'Campo requerido';

    // Validar email básico
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(correo)) newErrors.correo = 'Correo inválido';

    // Matrícula: debe iniciar con ZS + 8 dígitos
    if (!/^ZS\d{8}$/i.test(matricula)) newErrors.matricula = 'Matrícula inválida';

    if (password.length < 6 || password.length > 15) newErrors.password = 'Mínimo 6 caracteres y máximo 15';
    if (password !== confirmPassword) newErrors.confirmPassword = 'No coincide';

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    // Crear objeto User con los datos del formulario
    const newUser: User = {
      nombre,
      apellidoPaterno,
      apellidoMaterno,
      correo,
      matricula,
      carrera: '', // si no tienes estos campos, pon vacíos o agrégalos
      semestre: '',
      sexo: '',
      password,
    };

    // Guardar usuario en UserService
    UserService.addUser(newUser);

    Alert.alert('Registro exitoso', `Usuario ${nombre} registrado.`);
    navigation.replace('Login');

  };

  return (
    <SafeAreaView style={[styles.container, isDark ? styles.darkBg : styles.lightBg]}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
          <Text style={[styles.title, isDark ? styles.textLight : styles.textDark]}>
            Crear Cuenta
          </Text>

          {/** Campos **/}
          <TextInput
            placeholder="Apellido Paterno"
            placeholderTextColor={isDark ? '#aaa' : '#666'}
            style={[styles.input, isDark ? styles.inputDark : styles.inputLight]}
            value={apellidoPaterno}
            onChangeText={setApellidoPaterno}
            autoCapitalize="words"
          />
          {errors.apellidoPaterno && <Text style={styles.errorText}>{errors.apellidoPaterno}</Text>}

          <TextInput
            placeholder="Apellido Materno"
            placeholderTextColor={isDark ? '#aaa' : '#666'}
            style={[styles.input, isDark ? styles.inputDark : styles.inputLight]}
            value={apellidoMaterno}
            onChangeText={setApellidoMaterno}
            autoCapitalize="words"
          />
          {errors.apellidoMaterno && <Text style={styles.errorText}>{errors.apellidoMaterno}</Text>}

          <TextInput
            placeholder="Nombre(s)"
            placeholderTextColor={isDark ? '#aaa' : '#666'}
            style={[styles.input, isDark ? styles.inputDark : styles.inputLight]}
            value={nombre}
            onChangeText={setNombre}
            autoCapitalize="words"
          />
          {errors.nombre && <Text style={styles.errorText}>{errors.nombre}</Text>}

          <TextInput
            placeholder="Correo Electrónico"
            placeholderTextColor={isDark ? '#aaa' : '#666'}
            style={[styles.input, isDark ? styles.inputDark : styles.inputLight]}
            value={correo}
            onChangeText={setCorreo}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          {errors.correo && <Text style={styles.errorText}>{errors.correo}</Text>}

          <TextInput
            placeholder="Matrícula (ej. ZS24123456)"
            placeholderTextColor={isDark ? '#aaa' : '#666'}
            style={[styles.input, isDark ? styles.inputDark : styles.inputLight]}
            value={matricula}
            onChangeText={setMatricula}
            autoCapitalize="characters"
            maxLength={10}
          />
          {errors.matricula && <Text style={styles.errorText}>{errors.matricula}</Text>}

          <TextInput
            placeholder="Contraseña"
            placeholderTextColor={isDark ? '#aaa' : '#666'}
            style={[styles.input, isDark ? styles.inputDark : styles.inputLight]}
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}

          <TextInput
            placeholder="Confirmar contraseña"
            placeholderTextColor={isDark ? '#aaa' : '#666'}
            style={[styles.input, isDark ? styles.inputDark : styles.inputLight]}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
          />
          {errors.confirmPassword && <Text style={styles.errorText}>{errors.confirmPassword}</Text>}

          <TouchableOpacity style={styles.registerButton} onPress={validateAndRegister}>
            <Text style={styles.registerButtonText}>Crear cuenta</Text>
          </TouchableOpacity>

          <View style={styles.loginRedirect}>
            <Text style={isDark ? styles.textLight : styles.textDark}>¿Ya tienes cuenta? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={styles.loginRedirectText}>Inicia sesión</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 25,
    paddingBottom: 20,
    paddingTop: 40,
    justifyContent: 'center',
  },
  lightBg: {
    backgroundColor: '#fff',
  },
  darkBg: {
    backgroundColor: '#121212',
  },
  title: {
    fontSize: 30,
    fontWeight: '700',
    marginBottom: 30,
    alignSelf: 'center',
  },
  textLight: {
    color: '#eee',
  },
  textDark: {
    color: '#222',
  },
  input: {
    height: 50,
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 8,
    fontSize: 16,
  },
  inputLight: {
    backgroundColor: '#f1f1f1',
    color: '#222',
  },
  inputDark: {
    backgroundColor: '#333',
    color: '#eee',
  },
  errorText: {
    color: '#e53935',
    marginBottom: 6,
    marginLeft: 4,
  },
  registerButton: {
    backgroundColor: '#2f855a', // Verde UV profesional
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 25,
    marginBottom: 35,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  registerButtonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 18,
  },
  loginRedirect: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  loginRedirectText: {
    color: '#2f855a',
    fontWeight: '700',
    textDecorationLine: 'underline',
  },
});

