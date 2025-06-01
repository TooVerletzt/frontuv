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
    // Carga un usuario completo con todos los campos (ejemplo)
    this.users.push({
      nombre: 'Jeshua',
      apellidoPaterno: 'Hernandez',
      apellidoMaterno: 'Benitez',
      correo: 'jeshua@example.com',
      matricula: 'ZS24000001',
      carrera: 'Ingeniería de Software',
      semestre: '8',
      sexo: 'Masculino',
      password: 'abc123456',
    });
  }

  public addUser(user: User): void {
    this.users.push(user);
  }

  public validateCredentials(matricula: string, password: string): boolean {
    return this.users.some(
      (u) => u.matricula.toUpperCase() === matricula.toUpperCase() && u.password === password
    );
  }

  // Nuevo método para obtener usuario completo por matrícula
  public getUserByMatricula(matricula: string): User | undefined {
    return this.users.find(
      (u) => u.matricula.toUpperCase() === matricula.toUpperCase()
    );
  }
}

const userServiceInstance = new UserService();

export default userServiceInstance;

