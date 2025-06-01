// src/screens/ProfileScreen.tsx

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Button from '@/components/Button';
import UserService, { User } from '../services/UserService';

const STORAGE_KEY_MATRICULA = 'userMatricula';
const STORAGE_KEY_AUTH = 'authToken';

const ProfileScreen = ({ navigation }: { navigation: any }) => {
  const [userData, setUserData] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 1) Obtenemos la matrícula del AsyncStorage (supongamos que la guardaste al iniciar sesión)
    AsyncStorage.getItem(STORAGE_KEY_MATRICULA)
      .then((matri) => {
        if (matri) {
          // 2) Con esa matrícula, pedimos a UserService que devuelva el usuario completo
          const usr = UserService.getUserByMatricula(matri);
          if (usr) {
            setUserData(usr);
          } else {
            // Si no existe en UserService, forzamos logout
            Alert.alert(
              'Error',
              'Usuario no encontrado. Vuelve a iniciar sesión.',
              [{ text: 'OK', onPress: () => navigation.replace('Login') }]
            );
          }
        } else {
          // Si por alguna razón no hay matrícula, enviamos al login
          navigation.replace('Login');
        }
      })
      .catch(() => {
        // En caso de error leyendo AsyncStorage, vamos a login
        navigation.replace('Login');
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleLogout = async () => {
    // Limpiamos authToken y matrícula para desloguear
    await AsyncStorage.removeItem(STORAGE_KEY_AUTH);
    await AsyncStorage.removeItem(STORAGE_KEY_MATRICULA);
    Alert.alert('Sesión cerrada', 'Has cerrado sesión correctamente.');
    navigation.replace('Login');
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#2f855a" />
      </View>
    );
  }

  if (!userData) {
    // Si no hay userData (por seguridad), no renderizamos nada
    return null;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Perfil de Usuario</Text>

      <View style={styles.card}>
        <Text style={styles.cardText}>
          Nombre: {userData.nombre}
        </Text>
        <Text style={styles.cardText}>
          Apellido Paterno: {userData.apellidoPaterno}
        </Text>
        <Text style={styles.cardText}>
          Apellido Materno: {userData.apellidoMaterno}
        </Text>
        <Text style={styles.cardText}>
          Matrícula: {userData.matricula}
        </Text>
        <Text style={styles.cardText}>
          Correo: {userData.correo}
        </Text>
      </View>

      <Button title="Cerrar sesión" onPress={handleLogout} />
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 20,
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#f5f5f5',
    padding: 16,
    marginBottom: 20,
    borderRadius: 8,
  },
  cardText: {
    fontSize: 16,
    marginBottom: 8,
  },
});
