// src/services/ApiService.ts

import { REACT_NATIVE_API_URL } from '@env';

export interface PhysicalEvaluationPayload {
  matricula: string;
  peso: number;
  estatura: number;
  sexo: string;
  cintura: number;
  cadera: number;
  zonaGrasa: string;
  tipoFisico: string;
  tiempoSinEjercicio: string;
  lesiones: string | null;
  tipoEjercicio: string | null;
  metaPersonal: string;
  imc: number;
}

export interface TestResultPayload {
  matricula: string;
  prueba: 'strength' | 'speed' | 'flexibility' | 'resistance';
  puntuacion: number;   // 0–100
  rawValue: number;     // p. ej. tiempo en segundos o distancia en cm/m
  timestamp: string;    // iso timestamp (por si quieres mantener histórico)
}

export interface RoutineExercise {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  videoUrl?: string;
  sets: number;
  reps: number;
  restSeconds: number;
}

export default class ApiService {
  private static baseUrl = REACT_NATIVE_API_URL;

  // ─── 1. ENVIAR datos de evaluación física ─────────────────────────────────────
  static async sendPhysicalEvaluation(
    payload: PhysicalEvaluationPayload
  ): Promise<{ success: boolean; message?: string }> {
    const url = `${this.baseUrl}/evaluations/physical`;
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // si necesitas un token de autorización, agrégalo aquí:
          // Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(payload),
      });
      if (!response.ok) {
        const errorBody = await response.text();
        throw new Error(`HTTP ${response.status}: ${errorBody}`);
      }
      const data = await response.json();
      return data; // p. ej. { success: true, message: 'Guardado' }
    } catch (err) {
      console.error('Error en sendPhysicalEvaluation:', err);
      throw err;
    }
  }

  // ─── 2. ENVIAR resultados de cada prueba ────────────────────────────────────────
  static async sendTestResult(
    payload: TestResultPayload
  ): Promise<{ success: boolean; message?: string }> {
    const url = `${this.baseUrl}/evaluations/tests`;
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
      if (!response.ok) {
        const errorBody = await response.text();
        throw new Error(`HTTP ${response.status}: ${errorBody}`);
      }
      const data = await response.json();
      return data; // p. ej. { success: true }
    } catch (err) {
      console.error('Error en sendTestResult:', err);
      throw err;
    }
  }

  // ─── 3. OBTENER la rutina diaria ─────────────────────────────────────────────────
  static async getDailyRoutine(matricula: string): Promise<RoutineExercise[]> {
    const url = `${this.baseUrl}/routines/today?matricula=${encodeURIComponent(matricula)}`;
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }
      const json = await response.json();
      // Se asume que el JSON devuelto es { exercises: RoutineExercise[] }
      return json.exercises ?? [];
    } catch (err) {
      console.error('Error en getDailyRoutine:', err);
      throw err;
    }
  }

  // ─── 4. OBTENER historial de avances (opcional) ─────────────────────────────────
  static async getProgressHistory(
    matricula: string
  ): Promise<{
    date: string;
    strength: number;
    speed: number;
    flexibility: number;
    resistance: number;
    imc: number;
  }[]> {
    const url = `${this.baseUrl}/evaluations/history?matricula=${encodeURIComponent(matricula)}`;
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }
      const json = await response.json();
      // Se asume que la API devuelve un array de objetos con la forma antes indicada
      return json.history ?? [];
    } catch (err) {
      console.error('Error en getProgressHistory:', err);
      throw err;
    }
  }

  // ─── 5. ENVIAR datos de perfil/registro de usuario ───────────────────────────────
  static async registerUser(
    payload: {
      nombre: string;
      apellidoPaterno: string;
      apellidoMaterno: string;
      correo: string;
      matricula: string;
      password: string;
      carrera?: string;
      semestre?: string;
      sexo?: string;
    }
  ): Promise<{ success: boolean; message?: string }> {
    const url = `${this.baseUrl}/users/register`;
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!response.ok) {
        const errorBody = await response.text();
        throw new Error(`HTTP ${response.status}: ${errorBody}`);
      }
      const data = await response.json();
      return data; // p. ej. { success: true }
    } catch (err) {
      console.error('Error en registerUser:', err);
      throw err;
    }
  }

  // ─── 6. OBTENER datos de perfil ──────────────────────────────────────────────────
  static async getUserProfile(matricula: string): Promise<{
    nombre: string;
    apellidoPaterno: string;
    apellidoMaterno: string;
    correo: string;
    carrera: string;
    semestre: string;
    sexo: string;
  }> {
    const url = `${this.baseUrl}/users/profile?matricula=${encodeURIComponent(matricula)}`;
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }
      const json = await response.json();
      return json.user;
    } catch (err) {
      console.error('Error en getUserProfile:', err);
      throw err;
    }
  }
}
