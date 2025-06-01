// src/services/RoutineService.ts

/**
 * Aquí definimos la forma de un ejercicio dentro de la rutina.
 * Ajusta estas propiedades a lo que deba regresar tu API real.
 */
export interface RoutineExercise {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  videoUrl?: string;
  sets: number;
  reps: number;
  restSeconds: number; // segundos de descanso entre series
}

/**
 * RoutineService: punto único de contacto con la API para obtener la "rutina diaria".
 * 
 * En el futuro, este método hará la llamada real (ej. fetch o axios)
 * a tu backend, devolverá los datos y los transformará en RuntimeExercise[].
 *
 * Por ahora, devolvemos un mock con una Promise retrasada para simular carga remota.
 */
export default class RoutineService {
  static async getDailyRoutine(): Promise<RoutineExercise[]> {
    // ↪ En producción reemplaza esto por:
    //    const response = await fetch('https://tu-api.com/routines/today');
    //    const json = await response.json();
    //    return json.exercises as RoutineExercise[];
    //
    // Mientras desarrollamos, devolvemos un “dummy”:
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          {
            id: 'e1',
            name: 'Flexiones de Pecho',
            description: 'Realiza 3 series de 12 repeticiones de flexiones manteniendo la espalda recta.',
            imageUrl: 'https://tu-servidor.com/images/flexiones.jpg',
            videoUrl: 'https://www.youtube.com/watch?v=IODxDxX7oi4',
            sets: 3,
            reps: 12,
            restSeconds: 60,
          },
          {
            id: 'e2',
            name: 'Sentadillas',
            description: '3 series de 15 repeticiones con pausa de 60seg entre series.',
            imageUrl: 'https://tu-servidor.com/images/sentadillas.jpg',
            videoUrl: 'https://www.youtube.com/watch?v=aclHkVaku9U',
            sets: 3,
            reps: 15,
            restSeconds: 60,
          },
          {
            id: 'e3',
            name: 'Plancha',
            description:
              'Mantén posición de plancha frontal durante 3 series de 45 segundos cada una.',
            imageUrl: 'https://tu-servidor.com/images/plancha.jpg',
            videoUrl: 'https://www.youtube.com/watch?v=pSHjTRCQxIw',
            sets: 3,
            reps: 0, // las “reps” no aplican aquí; usamos tiempo en desc
            restSeconds: 30,
          },
          {
            id: 'e4',
            name: 'Dominadas',
            description: '2 series al fallo, intentando llegar al máximo número de repeticiones.',
            imageUrl: 'https://tu-servidor.com/images/dominadas.jpg',
            videoUrl: 'https://www.youtube.com/watch?v=eGo4IYlbE5g',
            sets: 2,
            reps: 8,
            restSeconds: 90,
          },
        ]);
      }, 1200);
    });
  }
}
