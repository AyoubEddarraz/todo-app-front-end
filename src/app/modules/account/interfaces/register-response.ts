import { Role } from "./role";

export interface RegisterResponse {
  userId: string;
  name: string;
  email: string;
  roles: Role[];
}
