export interface LoginResponse {
    username: string;
    id: string;
    email: string;
    role: 'ADMIN' | 'USER'; 
    token: string;
  }
  