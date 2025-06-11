// src/screens/ProgressScreen.tsx

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Dimensions,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigation';
import ApiService from '../services/ApiService';
import { getTokenPayload } from '../utils/TokenManager';

type ProgressScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Progress'
>;

type DailyResult = {
  fecha: string;
  fuerza: number;
  velocidad: number;
  flexibilidad: number;
  resistencia: number;
  imc: string;
};

const ProgressScreen = (): JSX.Element => {
  const navigation = useNavigation<ProgressScreenNavigationProp>();
  const [loading, setLoading] = useState(true);
  const [history, setHistory] = useState<DailyResult[]>([]);

  const [chartData, setChartData] = useState({
    labels: [],
    series: {
      fuerza: [] as number[],
      velocidad: [] as number[],
      flexibilidad: [] as number[],
      resistencia: [] as number[],
    },
    averages: {
      fuerza: 0,
      velocidad: 0,
      flexibilidad: 0,
      resistencia: 0,
      general: 0,
    },
  });

  useEffect(() => {
    loadProgress();
  }, []);

  const loadProgress = async () => {
    try {
      // aquí puedes adaptar para cargar desde API o localStorage si quieres
    } finally {
      setLoading(false);
    }
  };

  const computeChartData = (arr: DailyResult[]) => {
    // ...tus cálculos existentes
  };

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#2f855a" />
      </View>
    );
  }

  // ✅ ESTE ES EL RETURN QUE TE FALTABA
  return (
    <SafeAreaView>
      <Text>Tu historial aparecerá aquí.</Text>
      {/* puedes agregar tus gráficos o layout completo aquí */}
    </SafeAreaView>
  );
};

export default ProgressScreen;

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  emptyText: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
    color: '#555',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 16,
    color: '#2f855a',
  },
  avgCard: {
    backgroundColor: '#f0fdf4',
    marginHorizontal: 16,
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#a7f3d0',
  },
  avgTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#276749',
  },
  avgValue: {
    fontSize: 32,
    fontWeight: '700',
    color: '#2f855a',
    marginTop: 8,
  },
  chartContainer: {
    marginBottom: 32,
    alignItems: 'center',
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
    color: '#2f855a',
  },
  chartStyle: {
    borderRadius: 16,
  },
  currentAvgText: {
    marginTop: 6,
    fontSize: 14,
    color: '#333',
  },
  backButton: {
    marginTop: 20,
    marginHorizontal: 40,
    paddingVertical: 14,
    borderRadius: 8,
    backgroundColor: '#2f855a',
    alignItems: 'center',
    marginBottom: 30,
  },
  backButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
});
