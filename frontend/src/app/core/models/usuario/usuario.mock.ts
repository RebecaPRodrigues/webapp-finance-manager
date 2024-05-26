import { Usuario } from './usuario.interface';

export const usuariosMocked: Usuario[] = [
  {
    userName: 'admin',
    email: 'admin@email.com',
    password: '12345678',
    image: 'avatar-1.png',
    admin: true,
  },
  {
    userName: 'Fulano',
    email: 'fulano@email.com',
    password: '12345678',
    image: 'avatar-0.png',
    admin: false,
  },
  {
    userName: 'Beltrano',
    email: 'beltrano@email.com',
    password: '12345678',
    image: 'avatar-0.png',
    admin: false,
  },
  {
    userName: 'Ciclano',
    email: 'ciclano@email.com',
    password: '12345678',
    image: 'avatar-0.png',
    admin: false,
  }
];
