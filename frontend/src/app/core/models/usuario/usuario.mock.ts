import { Usuario } from './usuario.interface';

export const usuariosMocked: Usuario[] = [
  {
    username: 'admin',
    email: 'admin@email.com',
    password: '12345678',
    imageUrl: 'avatar-1.png',
    role: 'user',
    admin: true
  },
  {
    username: 'Fulano',
    email: 'fulano@email.com',
    password: '12345678',
    imageUrl: 'avatar-0.png',
    role: 'user',
    admin: false
  },
  {
    username: 'Beltrano',
    email: 'beltrano@email.com',
    password: '12345678',
    imageUrl: 'avatar-0.png',
    role: 'user',
    admin: false
  },
  {
    username: 'Ciclano',
    email: 'ciclano@email.com',
    password: '12345678',
    imageUrl: 'avatar-0.png',
    role: 'user',
    admin: false
  }
];
