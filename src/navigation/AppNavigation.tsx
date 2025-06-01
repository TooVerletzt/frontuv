// src/navigation/AppNavigation.tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Importa aquí tus pantallas
import HomeScreen from '../screens/HomeScreen';
import PhysicalEvaluationScreen from '../screens/PhysicalEvaluationScreen';
import PruebasMenuScreen from '../screens/PruebasMenuScreen';
import StrengthTestScreen from '../screens/StrengthTestScreen';
import SpeedTestScreen from '../screens/SpeedTestScreen';
import FlexibilityTestScreen from '../screens/FlexibilityTestScreen';
import ResistanceTestScreen from '../screens/ResistanceTestScreen';
import ResultsScreen from '../screens/ResultsScreen';
import RegisterScreen from '../screens/RegisterScreen';
import SettingsScreen from '../screens/SettingsScreen';
import RecoverCredentialsScreen from '../screens/RecoverCredentialsScreen';
import SplashScreen from '../screens/SplashScreen';
import ProfileScreen from '../screens/ProfileScreen';
import MotivationalScreen from '../screens/MotivationalScreen';
import PerformanceSummaryScreen from '../screens/PerformanceSummaryScreen';
import LoginScreen from '@/screens/LoginScreen';
import ProgressScreen from '../screens/ProgressScreen';
import DailyRoutineScreen from '@/screens/DailyRoutineScreen';


////////////////////////////////////////////////////////////////////////////////
// 1) ACLARA AQUÍ la firma de cada pantalla (qué parámetros reciben en route.params)
////////////////////////////////////////////////////////////////////////////////
export type RootStackParamList = {
  Splash: undefined;
  Login: undefined;
  Register: undefined;
  RecoverCredentials: undefined;

  Home: undefined;

  PhysicalEvaluationScreen: undefined;

  /** PruebasMenuScreen SÍ va a recibir { imc: string } */
  PruebasMenuScreen: { imc: string };

  /** Cada test (Strength, Speed, Flexibility, Resistance) recibe un callback onFinish */
  Strength: {
    onFinish: (score: number) => void;
  };
  Speed: {
    onFinish: (score: number) => void;
  };
  Flexibility: {
    onFinish: (score: number) => void;
  };
  Resistance: {
    onFinish: (score: number) => void;
  };

  Progress: undefined;

  /** Results recibe los 4 puntajes y el imc */
  Results: {
    fuerza: number;
    velocidad: number;
    flexibilidad: number;
    resistencia: number;
    imc: string;
  };

  Settings: undefined;
  Profile: undefined;
  Routine: undefined;
  Motivational: undefined;
  Performance: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

export default function AppNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{
          headerShown: false,
          animation: 'default',
        }}
      >
        {/* ------------------------------------------------------- */}
        {/* Aquí debes usar **exactamente** los mismos 'name' que definiste en RootStackParamList */}
        {/* ------------------------------------------------------- */}
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="RecoverCredentials" component={RecoverCredentialsScreen} />

        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />

        <Stack.Screen
          name="PhysicalEvaluationScreen"
          component={PhysicalEvaluationScreen}
        />

        {/* IMPORTANTE: aquí el name es "PruebasMenuScreen" y su tipo es { imc: string } */}
        <Stack.Screen
          name="PruebasMenuScreen"
          component={PruebasMenuScreen}
        />

        <Stack.Screen name="Progress" component={ProgressScreen} />

        {/* Resultados recibe { fuerza, velocidad, flexibilidad, resistencia, imc } */}
        <Stack.Screen name="Results" component={ResultsScreen} />

        {/* Cada test recibe un onFinish */}
        <Stack.Screen
          name="Strength"
          component={StrengthTestScreen}
        />
        <Stack.Screen
          name="Speed"
          component={SpeedTestScreen}
        />
        <Stack.Screen
          name="Flexibility"
          component={FlexibilityTestScreen}
        />
        <Stack.Screen
          name="Resistance"
          component={ResistanceTestScreen}
        />

        <Stack.Screen name="Settings" component={SettingsScreen} />

        <Stack.Screen name='Routine' component={DailyRoutineScreen} />
        <Stack.Screen name="Motivational" component={MotivationalScreen} />
        <Stack.Screen name="Performance" component={PerformanceSummaryScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
