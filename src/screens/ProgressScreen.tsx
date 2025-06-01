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
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LineChart } from 'react-native-chart-kit';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigation';

type ProgressScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Progress'
>;

/**
 * Estructura de cada entrada de progreso diario que guardamos en AsyncStorage:
 * {
 *   fecha: string; // p. ej. "2023-11-18"
 *   fuerza: number;       // 0–100
 *   velocidad: number;    // 0–100
 *   flexibilidad: number; // 0–100
 *   resistencia: number;  // 0–100
 *   imc: string;          // ejemplo: "23.45"
 * }
 */
type DailyResult = {
  fecha: string;
  fuerza: number;
  velocidad: number;
  flexibilidad: number;
  resistencia: number;
  imc: string;
};

const STORAGE_KEY_PROGRESS = 'progressData';

const ProgressScreen = () => {
  const navigation = useNavigation<ProgressScreenNavigationProp>();
  const [loading, setLoading] = useState(true);
  const [history, setHistory] = useState<DailyResult[]>([]);

  // Datos para las gráficas
  const [chartData, setChartData] = useState<{
    labels: string[];
    series: {
      fuerza: number[];
      velocidad: number[];
      flexibilidad: number[];
      resistencia: number[];
    };
    averages: {
      fuerza: number;
      velocidad: number;
      flexibilidad: number;
      resistencia: number;
      general: number;
    };
  }>({
    labels: [],
    series: { fuerza: [], velocidad: [], flexibilidad: [], resistencia: [] },
    averages: { fuerza: 0, velocidad: 0, flexibilidad: 0, resistencia: 0, general: 0 },
  });

  useEffect(() => {
    loadProgress();
  }, []);

  const loadProgress = async () => {
    try {
      const raw = await AsyncStorage.getItem(STORAGE_KEY_PROGRESS);
      let arr: DailyResult[] = [];
      if (raw) {
        arr = JSON.parse(raw) as DailyResult[];
      }

      // Ordenamos por fecha ascendente (en caso de no estarlo)
      arr.sort((a, b) => new Date(a.fecha).getTime() - new Date(b.fecha).getTime());

      setHistory(arr);
      computeChartData(arr);
    } catch (e) {
      Alert.alert('Error', 'No se pudo cargar el historial de progreso.');
    } finally {
      setLoading(false);
    }
  };

  const computeChartData = (arr: DailyResult[]) => {
    const labels: string[] = [];
    const fuerzaArr: number[] = [];
    const velocidadArr: number[] = [];
    const flexArr: number[] = [];
    const resArr: number[] = [];

    arr.forEach((item) => {
      // Etiqueta simple: solo día/mes (p.ej. "18/11")
      const dateObj = new Date(item.fecha);
      const label = `${dateObj.getDate()}/${dateObj.getMonth() + 1}`;
      labels.push(label);

      fuerzaArr.push(item.fuerza);
      velocidadArr.push(item.velocidad);
      flexArr.push(item.flexibilidad);
      resArr.push(item.resistencia);
    });

    // Cálculo de promedios de cada serie (última media de todos los días)
    const avg = (nums: number[]) =>
      nums.length > 0 ? Math.round(nums.reduce((a, b) => a + b, 0) / nums.length) : 0;

    const avgF = avg(fuerzaArr);
    const avgV = avg(velocidadArr);
    const avgX = avg(flexArr);
    const avgR = avg(resArr);

    const generalAvg = Math.round((avgF + avgV + avgX + avgR) / 4);

    setChartData({
      labels,
      series: {
        fuerza: fuerzaArr,
        velocidad: velocidadArr,
        flexibilidad: flexArr,
        resistencia: resArr,
      },
      averages: {
        fuerza: avgF,
        velocidad: avgV,
        flexibilidad: avgX,
        resistencia: avgR,
        general: generalAvg,
      },
    });
  };

  const screenWidth = Dimensions.get('window').width - 32; // margen de 16px a cada lado

  const chartConfig = {
    backgroundGradientFrom: '#fff',
    backgroundGradientTo: '#fff',
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(47,133,90, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(0,0,0, ${opacity})`,
    style: { borderRadius: 16 },
    propsForDots: {
      r: '4',
      strokeWidth: '2',
      stroke: '#2f855a',
    },
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#2f855a" />
      </View>
    );
  }

  if (history.length === 0) {
    return (
      <SafeAreaView style={styles.emptyContainer}>
        <Text style={styles.emptyText}>Aún no hay resultados guardados.</Text>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.backButtonText}>Regresar</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{ paddingVertical: 16 }}>
        <Text style={styles.title}># Progreso y Promedios</Text>

        {/* Tarjeta de Promedio General */}
        <View style={styles.avgCard}>
          <Text style={styles.avgTitle}>Promedio General (0–100):</Text>
          <Text style={styles.avgValue}>{chartData.averages.general}</Text>
        </View>

        {/* Gráfica de Fuerza */}
        <View style={styles.chartContainer}>
          <Text style={styles.chartTitle}>Fuerza</Text>
          <LineChart
            data={{
              labels: chartData.labels,
              datasets: [{ data: chartData.series.fuerza }],
            }}
            width={screenWidth}
            height={200}
            chartConfig={chartConfig}
            bezier
            style={styles.chartStyle}
            formatYLabel={(y) => `${y}`}
          />
          <Text style={styles.currentAvgText}>
            Promedio Fuerza: {chartData.averages.fuerza}/100
          </Text>
        </View>

        {/* Gráfica de Velocidad */}
        <View style={styles.chartContainer}>
          <Text style={styles.chartTitle}>Velocidad</Text>
          <LineChart
            data={{
              labels: chartData.labels,
              datasets: [{ data: chartData.series.velocidad }],
            }}
            width={screenWidth}
            height={200}
            chartConfig={chartConfig}
            bezier
            style={styles.chartStyle}
            formatYLabel={(y) => `${y}`}
          />
          <Text style={styles.currentAvgText}>
            Promedio Velocidad: {chartData.averages.velocidad}/100
          </Text>
        </View>

        {/* Gráfica de Flexibilidad */}
        <View style={styles.chartContainer}>
          <Text style={styles.chartTitle}>Flexibilidad</Text>
          <LineChart
            data={{
              labels: chartData.labels,
              datasets: [{ data: chartData.series.flexibilidad }],
            }}
            width={screenWidth}
            height={200}
            chartConfig={chartConfig}
            bezier
            style={styles.chartStyle}
            formatYLabel={(y) => `${y}`}
          />
          <Text style={styles.currentAvgText}>
            Promedio Flexibilidad: {chartData.averages.flexibilidad}/100
          </Text>
        </View>

        {/* Gráfica de Resistencia */}
        <View style={styles.chartContainer}>
          <Text style={styles.chartTitle}>Resistencia</Text>
          <LineChart
            data={{
              labels: chartData.labels,
              datasets: [{ data: chartData.series.resistencia }],
            }}
            width={screenWidth}
            height={200}
            chartConfig={chartConfig}
            bezier
            style={styles.chartStyle}
            formatYLabel={(y) => `${y}`}
          />
          <Text style={styles.currentAvgText}>
            Promedio Resistencia: {chartData.averages.resistencia}/100
          </Text>
        </View>

        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.backButtonText}>Regresar</Text>
        </TouchableOpacity>
      </ScrollView>
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
