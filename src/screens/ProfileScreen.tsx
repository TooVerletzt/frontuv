// src/screens/ProfileScreen.tsx

import React from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import Button from '@/components/Button';
import Input from '@/components/Input';

// Simulamos los datos del usuario
const mockUserData = {
  nombre: 'Juan Pérez',
  apellido: 'Gómez',
  matricula: 'zS23004742',
  email: 'juan.pe@example.com',
};

const ProfileScreen = ({ navigation }: { navigation: any }) => {
  // Función que simula el cierre de sesión
  const handleLogout = () => {
    // Aquí podrías agregar lógica de logout real, pero lo simulamos
    Alert.alert('Sesión cerrada');
    navigation.navigate('Login'); // Regresamos a la pantalla de Login
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Perfil de Usuario</Text>

      <View style={styles.card}>
        <Text style={styles.cardText}>Nombre: {mockUserData.nombre}</Text>
        <Text style={styles.cardText}>Apellido: {mockUserData.apellido}</Text>
        <Text style={styles.cardText}>Matrícula: {mockUserData.matricula}</Text>
        <Text style={styles.cardText}>Correo: {mockUserData.email}</Text>
      </View>

      <Button title="Cerrar sesión" onPress={handleLogout} />
    </View>
  );
};

// Estilos para la pantalla de perfil
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#f5f5f5',
    padding: 12,
    marginBottom: 10,
    borderRadius: 8,
  },
  cardText: {
    fontSize: 16,
    marginBottom: 5,
  },
});

export default ProfileScreen;
