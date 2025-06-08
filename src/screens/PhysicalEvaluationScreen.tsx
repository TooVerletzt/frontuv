// src/screens/PhysicalEvaluationScreen.tsx
import React, { useState, useEffect } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView,
  ScrollView, Alert, useColorScheme
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigation';

type PhysicalEvaluationScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'PhysicalEvaluationScreen'
>;

// Opciones para selectores
const sexoOptions = ['Masculino', 'Femenino', 'Otro'];
const grasaOptions = ['Abdomen', 'Caderas', 'Piernas', 'Brazos', 'Otro'];
const tipoFisicoOptions = ['Ectomorfo', 'Mesomorfo', 'Endomorfo', 'No sabe'];
const tiempoEjercicioOptions = ['Menos de 1 mes', '1-3 meses', '3-6 meses', 'Más de 6 meses'];
const siNoOptions = ['Sí', 'No'];

// Leyendas para cada tipo de cuerpo
const tipoFisicoDescriptions: Record<string, string> = {
  Ectomorfo: 'Tendencia a ser delgado, metabolismo rápido.',
  Mesomorfo: 'Estructura atlética y musculatura bien desarrollada.',
  Endomorfo: 'Mayor facilidad para acumular grasa, metabolismo más lento.',
  'No sabe': 'Selecciona tu tipo de cuerpo para ver la descripción.',
};

const PhysicalEvaluationScreen = () => {
  const navigation = useNavigation<PhysicalEvaluationScreenNavigationProp>();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  // Estados para cada campo
  const [peso, setPeso] = useState('');
  const [estatura, setEstatura] = useState('');
  const [imc, setImc] = useState('');
  const [imcCategory, setImcCategory] = useState('');
  const [sexo, setSexo] = useState('');
  const [cintura, setCintura] = useState('');
  const [cadera, setCadera] = useState('');
  const [zonaGrasa, setZonaGrasa] = useState('');
  const [tipoFisico, setTipoFisico] = useState('');
  const [tiempoSinEjercicio, setTiempoSinEjercicio] = useState('');
  const [lesiones, setLesiones] = useState('');
  const [realizaEjercicio, setRealizaEjercicio] = useState('');
  const [tipoEjercicio, setTipoEjercicio] = useState('');
  const [metaPersonal, setMetaPersonal] = useState('');

  // Errores de validación
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // Calcular IMC automáticamente
  useEffect(() => {
    const p = parseFloat(peso);
    const h = parseFloat(estatura) / 100;
    if (p > 0 && h > 0) {
      setImc((p / (h * h)).toFixed(2));
    } else {
      setImc('');
    }
  }, [peso, estatura]);

  // Categoría de IMC
  useEffect(() => {
    const val = parseFloat(imc);
    let cat = '';
    if (!isNaN(val) && val > 0) {
      if (val < 18.5) cat = 'Bajo peso';
      else if (val < 25) cat = 'Peso normal';
      else if (val < 30) cat = 'Sobrepeso';
      else cat = 'Obesidad';
    }
    setImcCategory(cat);
  }, [imc]);

  const validateAndContinue = () => {
    const newErrors: { [key: string]: string } = {};
    const pNum = Number(peso);
    const eNum = Number(estatura);
    const cNum = Number(cintura);
    const dNum = Number(cadera);

    // Validaciones básicas + rangos máximos
    if (!peso || isNaN(pNum) || pNum <= 0) newErrors.peso = 'Peso inválido';
    else if (pNum > 250) newErrors.peso = 'El peso no debe exceder 250 kg';

    if (!estatura || isNaN(eNum) || eNum <= 0) newErrors.estatura = 'Estatura inválida';
    else if (eNum > 215) newErrors.estatura = 'La estatura no debe exceder 215 cm';

    if (!sexo) newErrors.sexo = 'Seleccione sexo';

    if (!cintura || isNaN(cNum) || cNum <= 0) newErrors.cintura = 'Cintura inválida';
    else if (cNum > 150) newErrors.cintura = 'Circunf. cintura ≤ 150 cm';

    if (!cadera || isNaN(dNum) || dNum <= 0) newErrors.cadera = 'Cadera inválida';
    else if (dNum > 200) newErrors.cadera = 'Circunf. cadera ≤ 200 cm';

    if (!zonaGrasa) newErrors.zonaGrasa = 'Seleccione zona de grasa';
    if (!tipoFisico) newErrors.tipoFisico = 'Seleccione tipo de físico';
    if (!tiempoSinEjercicio) newErrors.tiempoSinEjercicio = 'Seleccione tiempo sin ejercicio';
    if (!realizaEjercicio) newErrors.realizaEjercicio = 'Seleccione si realiza ejercicio';
    if (realizaEjercicio === 'Sí' && !tipoEjercicio.trim())
      newErrors.tipoEjercicio = 'Indique tipo de ejercicio';
    if (!metaPersonal.trim()) newErrors.metaPersonal = 'Escriba su meta personal';

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) {
      Alert.alert('Errores', 'Por favor corrija los campos indicados.');
      return;
    }

    navigation.navigate('PruebasMenuScreen', { imc });
  };

  const renderSelector = (
    label: string,
    options: string[],
    selected: string,
    onSelect: (val: string) => void,
    error?: string
  ) => (
    <View style={{ marginBottom: 15 }}>
      <Text style={[styles.label, isDark ? styles.textLight : styles.textDark]}>{label}</Text>
      <View style={[styles.selectorContainer, error && styles.errorBorder]}>
        {options.map((opt) => (
          <TouchableOpacity
            key={opt}
            style={[styles.selectorOption, selected === opt && styles.selectorOptionSelected]}
            onPress={() => onSelect(opt)}
          >
            <Text style={selected === opt ? styles.selectorTextSelected : styles.selectorText}>
              {opt}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      {!!error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );

  return (
    <SafeAreaView style={[styles.container, isDark ? styles.darkBg : styles.lightBg]}>
      <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
        <Text style={[styles.title, isDark ? styles.textLight : styles.textDark]}>
          Datos Físicos
        </Text>

        <TextInput
          placeholder="Peso (kg)"
          placeholderTextColor={isDark ? '#aaa' : '#666'}
          keyboardType="numeric"
          style={[
            styles.input,
            isDark ? styles.inputDark : styles.inputLight,
            errors.peso && styles.errorBorder,
          ]}
          value={peso}
          onChangeText={setPeso}
        />
        {errors.peso && <Text style={styles.errorText}>{errors.peso}</Text>}

        <TextInput
          placeholder="Estatura (cm)"
          placeholderTextColor={isDark ? '#aaa' : '#666'}
          keyboardType="numeric"
          style={[
            styles.input,
            isDark ? styles.inputDark : styles.inputLight,
            errors.estatura && styles.errorBorder,
          ]}
          value={estatura}
          onChangeText={setEstatura}
        />
        {errors.estatura && <Text style={styles.errorText}>{errors.estatura}</Text>}

        <Text style={[styles.label, isDark ? styles.textLight : styles.textDark]}>
          IMC: {imc}
        </Text>
        {imc ? (
          <Text style={[styles.label, isDark ? styles.textLight : styles.textDark]}>
            Categoría: {imcCategory}
          </Text>
        ) : null}

        {renderSelector('Sexo', sexoOptions, sexo, setSexo, errors.sexo)}

        <TextInput
          placeholder="Circun. cintura (cm)"
          placeholderTextColor={isDark ? '#aaa' : '#666'}
          keyboardType="numeric"
          style={[
            styles.input,
            isDark ? styles.inputDark : styles.inputLight,
            errors.cintura && styles.errorBorder,
          ]}
          value={cintura}
          onChangeText={setCintura}
        />
        {errors.cintura && <Text style={styles.errorText}>{errors.cintura}</Text>}

        <TextInput
          placeholder="Circun. cadera (cm)"
          placeholderTextColor={isDark ? '#aaa' : '#666'}
          keyboardType="numeric"
          style={[
            styles.input,
            isDark ? styles.inputDark : styles.inputLight,
            errors.cadera && styles.errorBorder,
          ]}
          value={cadera}
          onChangeText={setCadera}
        />
        {errors.cadera && <Text style={styles.errorText}>{errors.cadera}</Text>}

        {renderSelector(
          '¿Dónde se acumula más grasa?',
          grasaOptions,
          zonaGrasa,
          setZonaGrasa,
          errors.zonaGrasa
        )}

        {renderSelector('Tipo de físico', tipoFisicoOptions, tipoFisico, setTipoFisico, errors.tipoFisico)}
        {/* Leyenda para tipo de cuerpo */}
        {tipoFisico ? (
          <Text style={[styles.legendText, isDark ? styles.textLight : styles.textDark]}>
            {tipoFisicoDescriptions[tipoFisico]}
          </Text>
        ) : null}

        {renderSelector(
          'Tiempo sin realizar ejercicio',
          tiempoEjercicioOptions,
          tiempoSinEjercicio,
          setTiempoSinEjercicio,
          errors.tiempoSinEjercicio
        )}

        {renderSelector('¿Tiene lesiones?', siNoOptions, lesiones ? 'Sí' : 'No', val => setLesiones(val), errors.lesiones)}
        {lesiones === 'Sí' && (
          <TextInput
            placeholder="Describe tus lesiones"
            placeholderTextColor={isDark ? '#aaa' : '#666'}
            style={[
              styles.input,
              isDark ? styles.inputDark : styles.inputLight,
              errors.lesiones && styles.errorBorder,
            ]}
            value={lesiones}
            onChangeText={setLesiones}
          />
        )}

        {renderSelector('¿Realiza ejercicio actualmente?', siNoOptions, realizaEjercicio, setRealizaEjercicio, errors.realizaEjercicio)}
        {realizaEjercicio === 'Sí' && (
          <TextInput
            placeholder="¿Qué tipo de ejercicio realizas?"
            placeholderTextColor={isDark ? '#aaa' : '#666'}
            style={[
              styles.input,
              isDark ? styles.inputDark : styles.inputLight,
              errors.tipoEjercicio && styles.errorBorder,
            ]}
            value={tipoEjercicio}
            onChangeText={setTipoEjercicio}
          />
        )}

        <TextInput
          placeholder="¿Cuál es tu meta personal?"
          placeholderTextColor={isDark ? '#aaa' : '#666'}
          style={[
            styles.input,
            isDark ? styles.inputDark : styles.inputLight,
            errors.metaPersonal && styles.errorBorder,
          ]}
          value={metaPersonal}
          onChangeText={setMetaPersonal}
          multiline
          numberOfLines={3}
        />
        {errors.metaPersonal && <Text style={styles.errorText}>{errors.metaPersonal}</Text>}

        <TouchableOpacity style={styles.submitButton} onPress={validateAndContinue}>
          <Text style={styles.submitButtonText}>Continuar</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  lightBg: { backgroundColor: '#fff' },
  darkBg: { backgroundColor: '#121212' },
  title: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 25,
    textAlign: 'center',
  },
  input: {
    borderRadius: 8,
    height: 50,
    fontSize: 16,
    paddingHorizontal: 15,
    marginBottom: 12,
  },
  inputLight: {
    backgroundColor: '#f1f1f1',
    color: '#222',
  },
  inputDark: {
    backgroundColor: '#333',
    color: '#eee',
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 6,
  },
  selectorContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  selectorOption: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#888',
    marginRight: 8,
    marginBottom: 8,
  },
  selectorOptionSelected: {
    backgroundColor: '#2f855a',
    borderColor: '#2f855a',
  },
  selectorText: {
    fontSize: 14,
    color: '#555',
  },
  selectorTextSelected: {
    color: 'white',
  },
  legendText: {
    fontSize: 14,
    fontStyle: 'italic',
    marginBottom: 15,
    paddingHorizontal: 10,
  },
  errorText: {
    color: '#e53935',
    marginBottom: 8,
  },
  errorBorder: {
    borderColor: '#e53935',
  },
  submitButton: {
    backgroundColor: '#2f855a',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 20,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 6,
  },
  submitButtonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 18,
  },
  textLight: {
    color: '#eee',
  },
  textDark: {
    color: '#222',
  },
});

export default PhysicalEvaluationScreen;
