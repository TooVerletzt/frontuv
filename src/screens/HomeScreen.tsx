// src/screens/HomeScreen.tsx

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

const HomeScreen = ({ navigation }: { navigation: any }) => {
  const dias = ['L', 'M', 'M', 'J', 'V', 'S', 'D'];
  const diaActual = new Date().getDay(); // 0 = domingo, 1 = lunes, etc.
  const diaMap = [6, 0, 1, 2, 3, 4, 5]; // para que el domingo esté al final

  return (
    <View style={styles.container}>
      {/* Logo */}
      <Image
        source={require('@/assets/logo.png')} // Asegúrate de que el logo esté en assets/logo.png
        style={styles.logo}
        resizeMode="contain"
      />

      <Text style={styles.title}>Menú Principal</Text>

      {/* Botones */}
      <TouchableOpacity style={styles.menuButton} onPress={() => navigation.navigate('Results')}>
        <Text style={styles.menuButtonText}>Registros y Avances</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.menuButton} onPress={() => navigation.navigate('Settings')}>
        <Text style={styles.menuButtonText}>Configuración</Text>
      </TouchableOpacity>

      {/* Calendario semanal */}
      <View style={styles.calendar}>
        {dias.map((dia, index) => (
          <View
            key={index}
            style={[
              styles.dia,
              diaMap[diaActual] === index && styles.diaActual // resalta el día actual
            ]}
          >
            <Text style={styles.diaTexto}>{dia}</Text>
          </View>
        ))}
      </View>

      {/* Botón Comenzar Rutina */}
      <TouchableOpacity style={styles.startButton} onPress={() => navigation.navigate('Evaluation')}>
        <Text style={styles.startButtonText}>Comenzar Rutina</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 24,
    backgroundColor: '#fff',
  },
  logo: {
    width: 160,
    height: 80,
    marginBottom: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 20,
  },
  menuButton: {
    width: '90%',
    backgroundColor: '#2E7D32',
    paddingVertical: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
  menuButtonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
    fontWeight: '600',
  },
  calendar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 30,
    marginBottom: 20,
    width: '100%',
    paddingHorizontal: 20,
  },
  dia: {
    width: 35,
    height: 35,
    borderRadius: 20,
    backgroundColor: '#eee',
    justifyContent: 'center',
    alignItems: 'center',
  },
  diaActual: {
    backgroundColor: '#2E7D32',
  },
  diaTexto: {
    color: '#000',
    fontWeight: 'bold',
  },
  startButton: {
    backgroundColor: '#2E7D32',
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 40,
    marginTop: 20,
  },
  startButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default HomeScreen;
