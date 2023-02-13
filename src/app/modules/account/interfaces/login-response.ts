export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  uid: string;
  roles: string[];
  authorities: string[];
}
