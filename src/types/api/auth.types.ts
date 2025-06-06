export interface LoginResponse {
  user: {
    name: string;
    email: string;
    premium: boolean;
    token: string;
  };
  message?: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface ApiError {
  message: string;
  code?: string;
  status?: number;
} 