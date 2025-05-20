// src/navigation/AppNavigation.tsx

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/LoginScreen';
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import EvaluationScreen from '../screens/EvaluationScreen'; 
import SettingsScreen from '../screens/SettingsScreen'; 
import InputDataScreen from '../screens/InputDataScreen';
import RegisterScreen from '../screens/RegisterScreen';
import ResultsScreen from '../screens/ResultsScreen';
import SplashLoader from '../screens/SplashLoader';
import PruebasMenuScreen from '../screens/PruebasMenuScreen';
import StrengthTestScreen from '@/screens/StrengthTestScreen';
import FlexibilityTestScreen from '@/screens/FlexibilityTestScreen';
import SpeedTestScreen from '@/screens/SpeedTestScreen';
import ResistanceTestScreen from '@/screens/ResistanceTestScreen';
import MotivationalScreen from '@/screens/MotivationalScreen';
import PerformanceSummaryScreen from '../screens/PerformanceSummaryScreen.tsx';


// Definimos los tipos explícitos para Stack.Navigator
type RootStackParamList = {
  Splash: undefined;
  Login: undefined;
  Home: undefined;
  Profile: undefined;
  Evaluation: undefined;
  Settings: undefined;
  InputData: undefined;
  Register: undefined;
  Results: undefined;
  PruebasMenu: undefined;
  Strength: undefined;
  Flexibility: undefined;
  Speed: undefined;
  Resistance: undefined;
  Motivational: undefined;
  Performance: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const AppNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash" screenOptions={{ headerShown: false }}>
        <Stack.Screen 
          name='Splash' component={SplashLoader}
        />
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
        <Stack.Screen 
          name="PruebasMenu" component={PruebasMenuScreen} 
        />
        <Stack.Screen 
          name="Strength" component={StrengthTestScreen} 
        />
        <Stack.Screen 
          name="Flexibility" component={FlexibilityTestScreen} 
        />
        <Stack.Screen 
          name="Speed" component={SpeedTestScreen} 
        />
        <Stack.Screen 
          name="Resistance" component={ResistanceTestScreen} 
        />
        <Stack.Screen 
          name="Motivational" component={MotivationalScreen} 
        />
        <Stack.Screen 
          name="Performance" component={PerformanceSummaryScreen} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigation;
