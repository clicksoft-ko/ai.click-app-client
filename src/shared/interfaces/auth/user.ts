export interface User {
  id: string;
  iat: number;
  exp: number;
  roomKey: string;
  hsUserId: string;
  csUserId: string;
  name: string;
  email: string;
}