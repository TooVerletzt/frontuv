// src/services/ApiService.ts
import { getToken } from '../utils/TokenManager';
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
  puntuacion: number;
  rawValue: number;
  timestamp: string;
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
    const token = await getToken();
    const url = `${this.baseUrl}/physicalEvaluations`;
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });
      if (!response.ok) {
        const errorBody = await response.text();
        throw new Error(`HTTP ${response.status}: ${errorBody}`);
      }
      const data = await response.json();
      return data;
    } catch (err) {
      console.error('Error en sendPhysicalEvaluation:', err);
      throw err;
    }
  }

  // ─── 2. ENVIAR resultados de cada prueba ────────────────────────────────────────
  static async sendTestResult(
    payload: TestResultPayload
  ): Promise<{ success: boolean; message?: string }> {
    const token = await getToken();
    const url = `${this.baseUrl}/pruebasFisicas`;
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });
      if (!response.ok) {
        const errorBody = await response.text();
        throw new Error(`HTTP ${response.status}: ${errorBody}`);
      }
      const data = await response.json();
      return data;
    } catch (err) {
      console.error('Error en sendTestResult:', err);
      throw err;
    }
  }

  // ─── 3. OBTENER la rutina diaria ─────────────────────────────────────────────────
  static async getDailyRoutine(matricula: string): Promise<RoutineExercise[]> {
    const token = await getToken();
    const url = `${this.baseUrl}/rutinas/today?matricula=${encodeURIComponent(matricula)}`;
    try {
      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }
      const json = await response.json();
      return json.exercises ?? [];
    } catch (err) {
      console.error('Error en getDailyRoutine:', err);
      throw err;
    }
  }

  // ─── 4. OBTENER historial de avances ─────────────────────────────────────────────
  static async getProgressHistory(
    matricula: string
  ): Promise<
    {
      date: string;
      strength: number;
      speed: number;
      flexibility: number;
      resistance: number;
      imc: number;
    }[]
  > {
    const token = await getToken();
    const url = `${this.baseUrl}/avances/history?matricula=${encodeURIComponent(matricula)}`;
    try {
      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }
      const json = await response.json();
      return json.history ?? [];
    } catch (err) {
      console.error('Error en getProgressHistory:', err);
      throw err;
    }
  }

  // ─── 5. ENVIAR datos de perfil/registro de usuario ───────────────────────────────
static async registerUser(payload: {
  nombre: string;
  apellido: string;
  email: string;
  matricula: string;
  password: string;
  fecha_inicio: string;
}): Promise<{ success: boolean; message: string }> {
  const url = `${this.baseUrl}/users`;
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    const responseBody = await response.json();

    if (!response.ok) {
      const message = responseBody?.error || responseBody?.respuesta || 'Error desconocido';
      return { success: false, message };
    }

    return { success: true, message: 'Usuario registrado correctamente' };
  } catch (err) {
    console.error('Error en registerUser:', err);
    return { success: false, message: 'No se pudo conectar al servidor' };
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
    const token = await getToken();
    const url = `${this.baseUrl}/users/profile?matricula=${encodeURIComponent(matricula)}`;
    try {
      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
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

  // ─── 7. OBTENER notificaciones ───────────────────────────────────────────────────
  static async getNotifications(matricula: string): Promise<
    { id: string; mensaje: string; fecha: string; leida: boolean }[]
  > {
    const token = await getToken();
    const url = `${this.baseUrl}/notifications?matricula=${encodeURIComponent(matricula)}`;
    try {
      const res = await fetch(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const json = await res.json();
      return json.notifications ?? [];
    } catch (err) {
      console.error('Error en getNotifications:', err);
      throw err;
    }
  }

  // ─── 8. ASIGNAR rutina al usuario ────────────────────────────────────────────────
  static async asignarRutina(data: {
    matricula: string;
    rutinaId: string;
  }): Promise<{ success: boolean; message?: string }> {
    const token = await getToken();
    const url = `${this.baseUrl}/usuarioRutinas`;
    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const errorBody = await res.text();
        throw new Error(`HTTP ${res.status}: ${errorBody}`);
      }
      return await res.json();
    } catch (err) {
      console.error('Error en asignarRutina:', err);
      throw err;
    }
  }

  // ─── 9. OBTENER rutinas asignadas ────────────────────────────────────────────────
  static async getRutinasAsignadas(matricula: string): Promise<RoutineExercise[]> {
    const token = await getToken();
    const url = `${this.baseUrl}/usuarioRutinas?matricula=${encodeURIComponent(matricula)}`;
    try {
      const res = await fetch(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const json = await res.json();
      return json.rutinas ?? [];
    } catch (err) {
      console.error('Error en getRutinasAsignadas:', err);
      throw err;
    }
  }

  // ─── 10. LOGIN de usuario ────────────────────────────────────────────────────────
  static async loginUser(
    matricula: string,
    password: string
  ): Promise<{ success: boolean; message?: string; user?: any; token?: string }> {
    const url = `${this.baseUrl}/auth/login`;
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ matricula, password }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP ${response.status}: ${errorText}`);
      }

      const json = await response.json();
      return json;
    } catch (err) {
      console.error('Error en loginUser:', err);
      throw err;
    }
  }
}
