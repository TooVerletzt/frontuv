import React, { useState, useEffect } from 'react';
import { Picker }  from '@react-native-picker/picker';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Alert,
  TouchableOpacity,
  ScrollView,
  Platform,
} from 'react-native';
import Button from '@/components/Button';

const InputDataScreen = ({ navigation }: { navigation: any }) => {
  const [edad, setEdad] = useState('');
  const [sexo, setSexo] = useState('');
  const [peso, setPeso] = useState('');
  const [estatura, setEstatura] = useState('');
  const [imc, setImc] = useState('');

  useEffect(() => {
    const pesoNum = parseFloat(peso);
    const estaturaNum = parseFloat(estatura) / 100; // convertir cm a m

    if (pesoNum > 0 && estaturaNum > 0) {
      const resultado = pesoNum / (estaturaNum * estaturaNum);
      setImc(resultado.toFixed(2));
    } else {
      setImc('');
    }
  }, [peso, estatura]);

  const handleSubmit = () => {
    if (!edad || !sexo || !peso || !estatura || !imc) {
      Alert.alert('Error', 'Completa todos los campos.');
      return;
    }

    navigation.navigate('Evaluation', { imc });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Tus datos físicos</Text>
      <Text style={styles.subtitle}>Estos datos nos ayudarán a adaptar tus evaluaciones y rutinas</Text>

      <TextInput
        style={styles.input}
        placeholder="Edad (Ej. 20)"
        keyboardType="numeric"
        value={edad}
        onChangeText={setEdad}
      />

      <View style={styles.pickerContainer}>
        <Text style={styles.pickerLabel}>Sexo:</Text>
        <Picker
          selectedValue={sexo}
          onValueChange={(itemValue: string) => setSexo(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Seleccionar" value="" />
          <Picker.Item label="Masculino" value="Masculino" />
          <Picker.Item label="Femenino" value="Femenino" />
          <Picker.Item label="Otro" value="Otro" />
        </Picker>
      </View>

      <TextInput
        style={styles.input}
        placeholder="Peso (kg) Ej. 72"
        keyboardType="numeric"
        value={peso}
        onChangeText={setPeso}
      />
      <TextInput
        style={styles.input}
        placeholder="Estatura (cm) Ej. 172"
        keyboardType="numeric"
        value={estatura}
        onChangeText={setEstatura}
      />
      <TextInput
        style={[styles.input, { backgroundColor: '#eee' }]}
        placeholder="IMC (calculado)"
        value={imc}
        editable={false}
      />

      <Button title="Continuar" onPress={handleSubmit} />

      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={styles.regresar}>Regresar</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20, paddingBottom: 40 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 10, textAlign: 'center' },
  subtitle: { fontSize: 14, marginBottom: 20, textAlign: 'center', color: '#555' },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 6,
    padding: 10,
    marginBottom: 15,
  },
  pickerContainer: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 6,
    marginBottom: 15,
    paddingHorizontal: Platform.OS === 'ios' ? 10 : 0,
  },
  pickerLabel: {
    padding: 10,
    color: '#333',
  },
  picker: {
    height: 50,
    width: '100%',
  },
  regresar: {
    color: '#2E7D32',
    fontWeight: 'bold',
    marginTop: 20,
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
});

export default InputDataScreen;
