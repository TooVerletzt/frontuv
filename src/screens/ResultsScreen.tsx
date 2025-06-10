// src/screens/ResultsScreen.tsx
import React, { useEffect } from 'react'; // ← agregado useEffect
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
} from 'react-native';
import Svg, { Circle, G, Text as SvgText } from 'react-native-svg';
import Button from '@/components/Button';
import ApiService from '../services/ApiService'; // ← agregado ApiService

interface ResultsParams {
  fuerza: number;
  resistencia: number;
  flexibilidad: number;
  velocidad: number;
  imc: string;
  userMatricula?: string; // ← agregado para identificar usuario
}

const { width } = Dimensions.get('window');
const chartSize = width * 0.4;

const getMotivationalMessage = (score: number): string => {
  if (score <= 30) return '¡Vamos, puedes mejorar! 💪';
  if (score <= 50) return 'Buen comienzo, sigue esforzándote! 👍';
  if (score <= 70) return '¡Bien hecho, mantén el impulso! 🏅';
  if (score <= 90) return '¡Excelente trabajo! 🌟';
  return '¡Eres un campeón! 🏆';
};

const RingChart = ({
  percentage,
  label,
}: {
  percentage: number;
  label: string;
}) => {
  const radius = chartSize / 2 - 10;
  const strokeWidth = 10;
  const circumference = 2 * Math.PI * radius;
  const progress = (percentage / 100) * circumference;
  const strokeDashoffset = circumference - progress;

  return (
    <View style={styles.chartContainer}>
      <Svg width={chartSize} height={chartSize}>
        <G rotation="-90" origin={`${chartSize / 2}, ${chartSize / 2}`}>
          <Circle
            cx={chartSize / 2}
            cy={chartSize / 2}
            r={radius}
            stroke="#e6e6e6"
            strokeWidth={strokeWidth}
            fill="transparent"
          />
          <Circle
            cx={chartSize / 2}
            cy={chartSize / 2}
            r={radius}
            stroke="#2f855a"
            strokeWidth={strokeWidth}
            strokeDasharray={`${circumference} ${circumference}`}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            fill="transparent"
          />
        </G>
        <SvgText
          x={chartSize / 2}
          y={chartSize / 2 + 5}
          fontSize="20"
          fontWeight="bold"
          fill="#2f855a"
          textAnchor="middle"
        >
          {`${percentage}`}
        </SvgText>
      </Svg>
      <Text style={styles.chartLabel}>{label}</Text>
      <Text style={styles.motivationalText}>{getMotivationalMessage(percentage)}</Text>
    </View>
  );
};

const ResultsScreen = ({
  route,
  navigation,
}: {
  route: { params?: Partial<ResultsParams> };
  navigation: any;
}) => {
  const {
    fuerza = 0,
    resistencia = 0,
    flexibilidad = 0,
    velocidad = 0,
    imc = '—',
    userMatricula = 'ZS24000001', // ← por si no viene
  } = route.params || {};

  const promedio = Math.round((fuerza + resistencia + flexibilidad + velocidad) / 4);

  // ─── Enviar los resultados al backend automáticamente ───
  useEffect(() => {
    const timestamp = new Date().toISOString();

    const enviarResultado = async (prueba: string, puntuacion: number) => {
      try {
        const payload = {
          matricula: userMatricula,
          prueba: prueba as any,
          puntuacion,
          rawValue: puntuacion, // puedes reemplazar esto si tienes valores reales
          timestamp,
        };
        await ApiService.sendTestResult(payload);
        console.log(`✅ Resultado de ${prueba} enviado`);
      } catch (err) {
        console.error(`❌ Error al enviar ${prueba}:`, err);
      }
    };

    enviarResultado('strength', fuerza);
    enviarResultado('resistance', resistencia);
    enviarResultado('flexibility', flexibilidad);
    enviarResultado('speed', velocidad);
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>¡Evaluación Completada!</Text>

      <Text style={styles.imcText}>Tu IMC fue: {imc}</Text>
      <Text style={styles.promedioText}>Promedio general: {promedio}/100</Text>

      <View style={styles.chartsRow}>
        <RingChart percentage={fuerza} label="Fuerza" />
        <RingChart percentage={resistencia} label="Resistencia" />
      </View>
      <View style={styles.chartsRow}>
        <RingChart percentage={velocidad} label="Velocidad" />
        <RingChart percentage={flexibilidad} label="Flexibilidad" />
      </View>

      <Button
        title="Ir al Menú Principal"
        onPress={() => navigation.navigate('Home', { evaluationsDone: true, userMatricula })}
      />
    </ScrollView>
  );
};

export default ResultsScreen;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingVertical: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  imcText: {
    fontSize: 18,
    marginBottom: 8,
    textAlign: 'center',
  },
  promedioText: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
  },
  chartsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 20,
  },
  chartContainer: {
    alignItems: 'center',
    width: chartSize,
  },
  chartLabel: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 8,
    textAlign: 'center',
  },
  motivationalText: {
    fontSize: 14,
    fontStyle: 'italic',
    marginTop: 4,
    textAlign: 'center',
    color: '#555',
  },
});
