export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  createdAt: Date;
  password: string;
  active: boolean;
  latitude: number;
  longitude: number;
}