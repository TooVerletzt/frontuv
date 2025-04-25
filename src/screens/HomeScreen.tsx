// src/screens/HomeScreen.tsx

import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import Button from '@/components/Button';
import Input from '@/components/Input';


// Simulamos los datos que vendrían de la API
const mockUserData = [
  { id: '1', nombre: 'Juan Pérez', matricula: 'zS23004742', email: 'juan.pe@example.com' },
  { id: '2', nombre: 'Carlos Gómez', matricula: 'zS23004743', email: 'carlos.go@example.com' },
  { id: '3', nombre: 'Ana Martínez', matricula: 'zS23004744', email: 'ana.ma@example.com' },
];

const HomeScreen = () => {
  // Estado para manejar los usuarios
  const [users, setUsers] = useState<any[]>([]);

  // Estado para el indicador de carga (simulamos que los datos se están obteniendo)
  const [loading, setLoading] = useState(true);

  // Simulamos que obtenemos los usuarios de la API
  useEffect(() => {
    setTimeout(() => {
      setUsers(mockUserData);  // Simulamos que la API nos dio estos datos
      setLoading(false); // Después de "obtener los datos", cambiamos el estado de loading
    }, 2000); // Simulamos que toma 2 segundos obtener los datos
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Usuarios:</Text>

      {loading ? (
        // Si estamos cargando, mostramos el spinner de carga
        <ActivityIndicator size="large" color="#007bff" />
      ) : (
        // Cuando ya no estamos cargando, mostramos la lista de usuarios
        <FlatList
          data={users}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.cardText}>Nombre: {item.nombre}</Text>
              <Text style={styles.cardText}>Matrícula: {item.matricula}</Text>
              <Text style={styles.cardText}>Correo: {item.email}</Text>
            </View>
          )}
        />
      )}
    </View>
  );
};

// Estilos para la pantalla
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
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
  },
});

export default HomeScreen;
