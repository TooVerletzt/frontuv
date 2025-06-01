// src/screens/SettingsScreen.tsx
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Linking,
  Alert,
} from 'react-native';
import { useColorScheme } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';

const STAR_KEY = 'userStars';

const SettingsScreen = ({ navigation }: { navigation: any }) => {
  const isDark = useColorScheme() === 'dark';
  const [stars, setStars] = useState<number>(0);

  useEffect(() => {
    // Al montar, cargar la cantidad de estrellas desde storage
    AsyncStorage.getItem(STAR_KEY)
      .then((val) => {
        const parsed = val ? parseInt(val, 10) : 0;
        setStars(isNaN(parsed) ? 0 : parsed);
      })
      .catch(() => setStars(0));
  }, []);

  const handleLogout = async () => {
    await AsyncStorage.removeItem('authToken');
    Alert.alert('Sesión cerrada', 'Has cerrado sesión correctamente');
    navigation.replace('Login');
  };

  return (
    <View style={[styles.container, isDark && styles.darkBg]}>
      {/* Contador de estrellas en la parte superior */}
      <View style={styles.starsContainer}>
        <Ionicons name="star" size={24} color="#FFD700" />
        <Text style={[styles.starsText, isDark && styles.textLight]}>
          {stars} Estrella{stars === 1 ? '' : 's'}
        </Text>
      </View>

      <Text style={[styles.title, isDark && styles.textLight]}>Configuración</Text>

      <TouchableOpacity
        style={styles.optionButton}
        onPress={() => navigation.navigate('Profile')}
      >
        <Text style={styles.optionText}>Perfil</Text>
      </TouchableOpacity>

      {/* Toggle de modo oscuro (pendiente) */}
      <TouchableOpacity style={styles.optionButton}>
        <Text style={styles.optionText}>Modo Oscuro: Próximamente 🌙</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.optionButton}
        onPress={() => Linking.openURL('https://tusitio.com/terminos')}
      >
        <Text style={styles.optionText}>Términos de uso</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Cerrar sesión</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#fff',
  },
  darkBg: {
    backgroundColor: '#121212',
  },
  starsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    justifyContent: 'center',
  },
  starsText: {
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 8,
    color: '#000',
  },
  textLight: {
    color: '#f4f4f4',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
    color: '#000',
  },
  optionButton: {
    padding: 14,
    backgroundColor: '#e0e0e0',
    borderRadius: 8,
    marginBottom: 12,
  },
  optionText: {
    fontSize: 16,
    color: '#000',
  },
  logoutButton: {
    marginTop: 30,
    padding: 14,
    backgroundColor: '#d32f2f',
    borderRadius: 8,
    alignItems: 'center',
  },
  logoutText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
