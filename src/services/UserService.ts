type User = {
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
    private static instance: UserService;
    private users: User[] = [];
  
    private constructor() {}
  
    public static getInstance(): UserService {
      if (!UserService.instance) {
        UserService.instance = new UserService();
      }
      return UserService.instance;
    }
  
    public addUser(user: User): void {
      this.users.push(user);
    }
  
    public authenticate(correo: string, password: string): boolean {
      return this.users.some(user => user.correo === correo && user.password === password);
    }
  
    public getUser(correo: string): User | undefined {
      return this.users.find(user => user.correo === correo);
    }
  
    public clear(): void {
      this.users = [];
    }
  }
  
  export default UserService.getInstance();
  