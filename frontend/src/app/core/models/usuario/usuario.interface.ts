export interface Usuario {
  _id?: string;
  username: string;
  email: string;
  password?: string;
  role: string;
  imageUrl?: string;
  admin?: boolean;
  fullName?: string;
}
