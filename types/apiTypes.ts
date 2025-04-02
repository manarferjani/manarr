// frontend/types/apiTypes.ts
export interface ApiUser {
    id: string;
    name: string;
    email: string;
    role: 'admin' | 'user';
    createdAt?: string;
  }