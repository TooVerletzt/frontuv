import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';

const ResistanceTestScreen = ({ navigation, route }: { navigation: any; route: any }) => {
  const [tiempo, setTiempo] = useState(0); // tiempo en segundos
  const [corriendo, setCorriendo] = useState(true);
  const [botonHabilitado, setBotonHabilitado] = useState(false);
  const intervalo = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    iniciarCronometro();

    const timeout = setTimeout(() => setBotonHabilitado(true), 30000); // habilitar tras 30s

    return () => {
      if (intervalo.current) clearInterval(intervalo.current);
      clearTimeout(timeout);
    };
  }, []);

  const iniciarCronometro = () => {
    intervalo.current = setInterval(() => {
      setTiempo((prev) => prev + 1);
    }, 1000);
  };

  const detenerCronometro = () => {
    if (intervalo.current) clearInterval(intervalo.current);
    setCorriendo(false);

    const minutos = Math.floor(tiempo / 60);
    const segundos = tiempo % 60;

    Alert.alert('Resultado registrado', `Tiempo total: ${minutos} min ${segundos} s`);

    if (route.params?.onFinish) route.params.onFinish();
    navigation.goBack();
  };

  const formatTiempo = (t: number) => {
    const min = Math.floor(t / 60).toString().padStart(2, '0');
    const sec = (t % 60).toString().padStart(2, '0');
    return `${min}:${sec}`;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Prueba de Resistencia</Text>
      <Text style={styles.description}>
        Corre sin detenerte el mayor tiempo posible. Cronómetro en marcha.
      </Text>

      <Text style={styles.timer}>{formatTiempo(tiempo)}</Text>

      <TouchableOpacity
        style={[styles.button, !botonHabilitado && styles.disabled]}
        onPress={detenerCronometro}
        disabled={!botonHabilitado}
      >
        <Text style={styles.buttonText}>
          {botonHabilitado ? 'Detener' : 'Disponible en 30s...'}
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

export default ResistanceTestScreen;
