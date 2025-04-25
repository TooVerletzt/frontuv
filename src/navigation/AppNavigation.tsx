// src/navigation/AppNavigation.tsx

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/LoginScreen';
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import EvaluationScreen from '../screens/EvaluationScreen'; // Asegúrate de importar la pantalla de evaluación
import SettingsScreen from '../screens/SettingsScreen'; // Asegúrate de importar la pantalla de configuración
import InputDataScreen from '@/screens/InputDataScreen';
import RegisterScreen from '@/screens/RegisterScreen';
import ResultsScreen from '@/screens/ResultsScreen';

// Definimos los tipos explícitos para Stack.Navigator
type RootStackParamList = {
  Login: undefined;
  Home: undefined;
  Profile: undefined;
  Evaluation: undefined;
  Settings: undefined;
  InputData: undefined;
  Register: undefined;
  Results: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const AppNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen 
          name="Login" 
          component={LoginScreen} 
        />
        <Stack.Screen 
          name="Home" 
          component={HomeScreen} 
        />
        <Stack.Screen 
          name="Profile" 
          component={ProfileScreen} 
        />
        <Stack.Screen 
          name="Evaluation" 
          component={EvaluationScreen} 
        />
        <Stack.Screen 
          name="Settings" 
          component={SettingsScreen} 
        />
        <Stack.Screen 
          name="InputData" component={InputDataScreen} 
        />
        <Stack.Screen 
          name="Register" component={RegisterScreen} 
        />
        <Stack.Screen
          name="Results" component={ResultsScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigation;
