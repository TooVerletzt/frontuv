// src/screens/ProfileScreen.tsx
import React, { useState, useEffect } from 'react';
import {
  View, Text, StyleSheet, Alert, ActivityIndicator, TextInput, TouchableOpacity
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import UserService, { User } from '../services/UserService';
import { RootStackParamList } from '../navigation/AppNavigation';

type Props = NativeStackScreenProps<RootStackParamList, 'Profile'>;

const LAST_UPDATE_KEY = 'profileLastUpdate';

const ProfileScreen = ({ navigation, route }: Props) => {
  const { user } = route.params;           // <— viene de SettingsScreen
  const [data, setData] = useState<User>(user);
  const [loading, setLoading] = useState(true);
  const [editable, setEditable] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem(LAST_UPDATE_KEY).then(ts => {
      const now = Date.now();
      if (!ts || now - parseInt(ts, 10) > 1000 * 60 * 60 * 24 * 90) {
        setEditable(true);
      }
    }).finally(() => setLoading(false));
  }, []);

  const handleSave = async () => {
    UserService.updateUser(data);
    await AsyncStorage.setItem(LAST_UPDATE_KEY, Date.now().toString());
    Alert.alert('Perfil actualizado', 'Tus datos se guardaron correctamente.');
    setEditable(false);
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#2f855a" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Perfil de Usuario</Text>

      <TextInput
        style={[styles.input, !editable && styles.disabled]}
        value={data.nombre}
        onChangeText={t => setData({ ...data, nombre: t })}
        placeholder="Nombre"
        editable={editable}
      />
      <TextInput
        style={[styles.input, !editable && styles.disabled]}
        value={data.apellidoPaterno}
        onChangeText={t => setData({ ...data, apellidoPaterno: t })}
        placeholder="Apellido Paterno"
        editable={editable}
      />
      <TextInput
        style={[styles.input, !editable && styles.disabled]}
        value={data.apellidoMaterno}
        onChangeText={t => setData({ ...data, apellidoMaterno: t })}
        placeholder="Apellido Materno"
        editable={editable}
      />
      <TextInput
        style={[styles.input, !editable && styles.disabled]}
        value={data.correo}
        onChangeText={t => setData({ ...data, correo: t })}
        placeholder="Correo Electrónico"
        keyboardType="email-address"
        editable={editable}
      />

      {editable ? (
        <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
          <Text style={styles.saveText}>Guardar</Text>
        </TouchableOpacity>
      ) : (
        <Text style={styles.note}>
          Sólo puedes editar tu perfil cada 3 meses.
        </Text>
      )}
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  center: { flex:1, justifyContent:'center', alignItems:'center' },
  container: { flex:1, padding:20, backgroundColor:'#fff' },
  title: { fontSize:24, fontWeight:'700', marginBottom:20, textAlign:'center' },
  input: {
    borderWidth:1, borderColor:'#ccc', borderRadius:8,
    padding:12, marginBottom:12,
  },
  disabled: { backgroundColor:'#f0f0f0' },
  saveBtn: {
    backgroundColor:'#2f855a', padding:14, borderRadius:8,
    alignItems:'center', marginTop:10
  },
  saveText: { color:'#fff', fontWeight:'700', fontSize:16 },
  note: { textAlign:'center', marginTop:12, color:'#666' },
});
