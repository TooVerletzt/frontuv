// src/screens/HomeScreen.tsx
import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  SafeAreaView,
  useColorScheme,
  Platform,
  Modal,
  Pressable,
  ImageBackground,
  Alert,
} from 'react-native';
import { useNavigation, useRoute, useFocusEffect } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import UserService from '../services/UserService';

type RootStackParamList = {
  Home: { evaluationsDone?: boolean; userMatricula?: string } | undefined;
  PhysicalEvaluationScreen: undefined;
  Results: {
    fuerza: number;
    velocidad: number;
    flexibilidad: number;
    resistencia: number;
    imc: string;
  };
  Register: undefined;
  Settings: undefined;
  Progress: undefined;
  Routine: undefined;
};

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

const WEEK_DAYS = ['L', 'M', 'M', 'J', 'V', 'S', 'D'];

const HomeScreen = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const route = useRoute();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  // Tomamos la matrícula desde los params si viene (login debería pasarla)
  const routeParams = (route.params as any) ?? {};
  const loggedUserMatricula = typeof routeParams.userMatricula === 'string'
    ? routeParams.userMatricula
    : 'ZS24000001';
  const user = UserService.getUserByMatricula(loggedUserMatricula);
  const loggedUserName = user ? user.nombre : 'Invitado';

  // Estado de si ya completó evaluaciones
  const [isNewUser, setIsNewUser] = useState(!routeParams.evaluationsDone);
  const [menuVisible, setMenuVisible] = useState(false);

  // Datos de fecha actual
  const currentDate = new Date();
  const months = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre',
  ];
  const weekdays = [
    'Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado',
  ];
  const dayOfWeek = weekdays[currentDate.getDay()];
  const dayOfMonth = currentDate.getDate();
  const month = months[currentDate.getMonth()];
  const year = currentDate.getFullYear();
  const todayWeekDay = (currentDate.getDay() + 6) % 7; // Ajuste: lunes=0

  // Cada vez que la pantalla recibe foco:
  useFocusEffect(
    useCallback(() => {
      const params = (route.params as any) ?? {};
      if (params.evaluationsDone === true) {
        setIsNewUser(false);
        // Limpiar flag para no reejecutar
        navigation.setParams({ evaluationsDone: false });
      }
    }, [route.params])
  );

  // Manejadores de botón
  const onPressVerAvances = () => {
    if (isNewUser) {
      Alert.alert('Primero realiza las evaluaciones', 'Debes completar las evaluaciones para ver tus avances.');
    } else {
      // Navegar a Results; podría necesitar los params guardados previamente
      navigation.navigate('Results', {
        // Aquí tendrías que pasar los valores calculados
        // Ejemplo:
        fuerza: routeParams.fuerza ?? 0,
        velocidad: routeParams.velocidad ?? 0,
        flexibilidad: routeParams.flexibilidad ?? 0,
        resistencia: routeParams.resistencia ?? 0,
        imc: routeParams.imc ?? '',
      });
    }
  };

  const onPressComenzarRutina = () => {
    if (isNewUser) {
      Alert.alert('Primero realiza las evaluaciones', 'Debes completar las evaluaciones para comenzar tu rutina.');
    } else {
      navigation.navigate('Register');
    }
  };

  return (
    <SafeAreaView style={[styles.container, isDark ? styles.darkBg : styles.lightBg]}>
      <ImageBackground
        source={require('../../assets/waves.jpg')}
        style={styles.fullBackground}
        imageStyle={{ opacity: 0.59, transform: [{ scale: 1.2 }] }}
      >
        {/* ─── Top Bar ────────────────────────────────────────────────────────── */}
        <View style={styles.topBarUala}>
          <View style={styles.leftSection}>
            <Text style={styles.greetingText}>Hola, {loggedUserName}</Text>
            <Text style={styles.dateTextHeader}>
              {`${dayOfWeek}, ${dayOfMonth} de \n${month} del ${year}`}
            </Text>
          </View>

          <View style={styles.rightSection}>
            <TouchableOpacity style={styles.iconButton}>
              <Ionicons name="notifications-outline" size={24} color="white" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton}>
              <Ionicons name="help-circle-outline" size={24} color="white" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton} onPress={() => setMenuVisible(true)}>
              <Ionicons name="menu" size={28} color="white" />
            </TouchableOpacity>
          </View>
        </View>

        {/* ─── Menú Modal ────────────────────────────────────────────────────────── */}
        <Modal
          animationType="fade"
          transparent
          visible={menuVisible}
          onRequestClose={() => setMenuVisible(false)}
        >
          <Pressable style={styles.modalOverlay} onPress={() => setMenuVisible(false)}>
            <View style={[styles.menuContainer, isDark ? styles.menuDark : styles.menuLight]}>
              <TouchableOpacity
                style={styles.menuItem}
                onPress={() => {
                  setMenuVisible(false);
                  navigation.navigate('Settings');
                }}
              >
                <Text style={[styles.menuText, isDark ? styles.textLight : styles.textDark]}>
                  Configuración
                </Text>
              </TouchableOpacity>
            </View>
          </Pressable>
        </Modal>

        {/* ─── Bienvenida ────────────────────────────────────────────────────────── */}
        <View style={styles.greetingContainer}>
          <Text style={[styles.greeting, isDark ? styles.textLight : styles.textDark]}>
            ¡Bienvenido a UVFit!
          </Text>
          <Text style={[styles.motivationalTextBody, isDark ? styles.textLight : styles.textDark]}>
            "¡Nunca te rindas, cada día cuenta!"
          </Text>
        </View>

        {/* ─── Calendario Semanal ────────────────────────────────────────────────────────── */}
        <View style={styles.weekContainer}>
          <ImageBackground
            source={require('../../assets/treadmill_pattern.jpg')}
            style={styles.weekBackground}
            imageStyle={{ opacity: 0.9 }}
          >
            {WEEK_DAYS.map((day, index) => {
              const isToday = index === todayWeekDay;
              return (
                <View
                  key={index}
                  style={[
                    styles.dayCircle,
                    isToday && styles.todayCircle,
                  ]}
                >
                  <Text
                    style={[
                      styles.dayText,
                      isToday ? styles.todayText : styles.dayText,
                    ]}
                  >
                    {day}
                  </Text>
                </View>
              );
            })}
          </ImageBackground>
        </View>

        {/* ─── Botones ────────────────────────────────────────────────────────── */}
        <View style={styles.buttonsContainer}>
          {/* Evaluaciones Físicas (siempre habilitado) */}
          <TouchableOpacity
            onPress={() => navigation.navigate('PhysicalEvaluationScreen')}
            activeOpacity={0.7}
          >
            <LinearGradient
              colors={isDark ? ['#276749', '#2f855a'] : ['#48bb78', '#2f855a']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.button}
            >
              <Text style={styles.buttonText}>Evaluaciones Físicas</Text>
            </LinearGradient>
          </TouchableOpacity>

          {/* Ver Avances */}
          <TouchableOpacity
            onPress={() => navigation.navigate('Progress')}
            activeOpacity={isNewUser ? 1 : 0.7}
          >
            <LinearGradient
              colors={isDark ? ['#276749', '#2f855a'] : ['#48bb78', '#2f855a']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={[styles.button, isNewUser && styles.buttonDisabled]}
            >
              <Text style={styles.buttonText}>Ver Avances</Text>
            </LinearGradient>
          </TouchableOpacity>

          {/* Comenzar Rutina */}
          <TouchableOpacity
            onPress={() => {
              if (isNewUser) {
              Alert.alert('Primero realiza las evaluaciones', 'Debes completar las evaluaciones para comenzar tu rutina.');
              } else {
                navigation.navigate('Routine');
              }
            }}
            activeOpacity={isNewUser ? 1 : 0.7}
            >
            <LinearGradient
              colors={isDark ? ['#276749', '#2f855a'] : ['#48bb78', '#2f855a']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={[styles.button, isNewUser && styles.buttonDisabled]}
            >
              <Text style={styles.buttonText}>Comenzar Rutina</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: { flex: 1 },
  lightBg: { backgroundColor: '#fff' },
  darkBg: { backgroundColor: '#121212' },
  fullBackground: {
    flex: 1,
    resizeMode: 'cover',
    width: '100%',
    height: '100%',
  },
  topBarUala: {
    flexDirection: 'row',
    backgroundColor: '#2f855a',
    paddingVertical: 18,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 8,
  },
  leftSection: {
    flexDirection: 'column',
  },
  greetingText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 18,
  },
  dateTextHeader: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  iconButton: {
    paddingHorizontal: 8,
    paddingVertical: 5,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  menuContainer: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 80 : 70,
    right: 15,
    width: 150,
    borderRadius: 6,
    paddingVertical: 10,
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 8,
  },
  menuLight: {
    backgroundColor: 'white',
  },
  menuDark: {
    backgroundColor: '#222',
  },
  menuItem: {
    paddingVertical: 12,
    paddingHorizontal: 15,
  },
  menuText: {
    fontSize: 16,
  },
  greetingContainer: {
    marginTop: 25,
    alignItems: 'center',
  },
  greeting: {
    fontSize: 28,
    fontWeight: '700',
    color: '#2f855a',
    textShadowColor: 'rgba(255, 255, 255, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 4,
  },
  textLight: {
    color: '#f4f4f4',
  },
  textDark: {
    color: '#222',
  },
  motivationalTextBody: {
    fontStyle: 'italic',
    fontWeight: '600',
    fontSize: 16,
    marginTop: 6,
    textAlign: 'center',
  },
  weekContainer: {
    marginTop: 30,
    flexDirection: 'row',
    borderRadius: 30,
    overflow: 'hidden',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    paddingHorizontal: 5,
  },
  weekBackground: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    flex: 5,
    paddingHorizontal: 5,
    alignItems: 'center',
  },
  dayCircle: {
    width: 50,
    height: 50,
    borderRadius: 80,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 3,
    marginVertical: 6,
  },
  todayCircle: {
    backgroundColor: '#18529D',
    borderWidth: 7,
    borderColor: '#38a169',
    shadowColor: '#38a169',
    shadowOffset: { width: 10, height: 10 },
    shadowOpacity: 0.8,
    shadowRadius: 8,
    elevation: 10,
  },
  dayText: {
    fontWeight: '700',
    fontSize: 22,
    color: '#22543d',
  },
  todayText: {
    color: 'white',
    fontWeight: '800',
    fontSize: 24,
  },
  buttonsContainer: {
    marginTop: 50,
    paddingHorizontal: 20,
  },
  button: {
    paddingVertical: 15,
    borderRadius: 10,
    marginBottom: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 6,
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 18,
  },
  buttonDisabled: {
    opacity: 0.5,
  },
});
