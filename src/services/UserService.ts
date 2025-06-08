// src/services/UserService.ts

export type User = {
  nombre: string;
  apellidoPaterno: string;
  apellidoMaterno: string;
  correo: string;
  matricula: string;
  carrera: string;
  semestre: string;
  sexo: string;
  password: string;
};

class UserService {
  private users: User[] = [];

  constructor() {
    // NO pre-cargamos ningún usuario: arrancamos con el array vacío
  }

  /** Agrega un usuario nuevo */
  public addUser(user: User): void {
    this.users.push(user);
  }

  /** Valida credenciales por matrícula y contraseña */
  public validateCredentials(matricula: string, password: string): boolean {
    return this.users.some(
      (u) =>
        u.matricula.toUpperCase() === matricula.toUpperCase() &&
        u.password === password
    );
  }

  /** Obtiene un usuario completo por matrícula */
  public getUserByMatricula(matricula: string): User | undefined {
    return this.users.find(
      (u) => u.matricula.toUpperCase() === matricula.toUpperCase()
    );
  }

  /**
   * Actualiza los datos de un usuario existente.
   * Devuelve true si encontró y actualizó al usuario, false si no existía.
   */
  public updateUser(updated: User): boolean {
    const idx = this.users.findIndex(
      (u) => u.matricula.toUpperCase() === updated.matricula.toUpperCase()
    );
    if (idx === -1) return false;
    // Merge: mantenemos cualquier campo que no venga en `updated`
    this.users[idx] = { ...this.users[idx], ...updated };
    return true;
  }
}

const userServiceInstance = new UserService();
export default userServiceInstance;
