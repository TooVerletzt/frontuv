import React, { useEffect, useState, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';

const SpeedTestScreen = ({ navigation, route }: { navigation: any; route: any }) => {
  const [tiempo, setTiempo] = useState(0);
  const [corriendo, setCorriendo] = useState(false);
  const [botonHabilitado, setBotonHabilitado] = useState(false);
  const intervalo = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    iniciarCronometro();

    // Habilitar botón después de 10 segundos
    const timeout = setTimeout(() => setBotonHabilitado(true), 10000);

    return () => {
      if (intervalo.current) clearInterval(intervalo.current);
      clearTimeout(timeout);
    };
  }, []);

  const iniciarCronometro = () => {
    setCorriendo(true);
    intervalo.current = setInterval(() => {
      setTiempo((prev) => +(prev + 0.1).toFixed(1));
    }, 100);
  };

  const detenerCronometro = () => {
    if (intervalo.current) clearInterval(intervalo.current);
    setCorriendo(false);

    // Simula guardado del resultado
    Alert.alert('Resultado registrado', `Tu tiempo fue: ${tiempo.toFixed(1)} segundos.`);

    // Marca como completado
    if (route.params?.onFinish) route.params.onFinish();

    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Prueba de Velocidad</Text>
      <Text style={styles.description}>
        Corre 50 metros lo más rápido posible. El cronómetro se inició automáticamente.
      </Text>

      <Text style={styles.timer}>{tiempo.toFixed(1)}s</Text>

      <TouchableOpacity
        style={[styles.button, !botonHabilitado && styles.disabled]}
        onPress={detenerCronometro}
        disabled={!botonHabilitado}
      >
        <Text style={styles.buttonText}>
          {botonHabilitado ? 'Detener' : 'Espera 10s...'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 24, backgroundColor: '#fff' },
  title: { fontSize: 22, fontWeight: 'bold', textAlign: 'center', marginBottom: 12 },
  description: { fontSize: 16, textAlign: 'center', marginBottom: 30 },
  timer: { fontSize: 48, fontWeight: 'bold', marginBottom: 40, color: '#2E7D32' },
  button: {
    padding: 14,
    backgroundColor: '#2E7D32',
    borderRadius: 8,
    width: 200,
    alignItems: 'center',
  },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  disabled: { backgroundColor: '#9E9E9E' },
});

export default SpeedTestScreen;
