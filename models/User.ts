// frontend/models/UserTypes.ts
export interface UserProfile {
  id: string;       // Conversion de _id en string
  name: string;
  email: string;
  role: 'admin' | 'user';
  createdAt?: string; // Optionnel selon besoins
}

export interface RegisterForm {
  name: string;
  email: string;
  password: string;
  confirmPassword?: string; // Pour validation côté client
}

export interface LoginForm {
  email: string;
  password: string;
}