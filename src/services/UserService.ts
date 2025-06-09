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

  public addUser(user: User): void {
    this.users.push(user);
  }

  public validateCredentials(matricula: string, password: string): boolean {
    return this.users.some(
      (u) =>
        u.matricula.toUpperCase() === matricula.toUpperCase() &&
        u.password === password
    );
  }

  public getUserByMatricula(matricula: string): User | undefined {
    return this.users.find(
      (u) => u.matricula.toUpperCase() === matricula.toUpperCase()
    );
  }

  public updateUser(updated: User): boolean {
    const idx = this.users.findIndex(
      (u) => u.matricula.toUpperCase() === updated.matricula.toUpperCase()
    );
    if (idx === -1) return false;
    this.users[idx] = { ...this.users[idx], ...updated };
    return true;
  }
}

export default new UserService();
