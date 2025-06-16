export interface LoginResponse {
  data: {
    user: {
      id: number; // Added 'id'
      name: string;
      email: string;
      plan: { // Changed 'premium' to 'plan' object
        id: number;
        description: string;
      };
      preferences: { // Added 'preferences' object
        cookLevel: {
          id: number;
          description: string;
        };
        diet: {
          id: number;
          description: string;
        };
      };
      token: string;
    };
    message?: string;
  }
}
export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  plan_id: number;
  cook_level_id: number;
  diet_id: number;
  dietary_needs: number[];
  allergies: number[];
}
export interface RegisterResponse {
  data: {
    user: {
      id: number; // Added 'id'
      name: string;
      email: string;
      plan: { // Changed 'premium' to 'plan' object
        id: number;
        description: string;
      };
      preferences: { // Added 'preferences' object
        cookLevel: {
          id: number;
          description: string;
        };
        diet: {
          id: number;
          description: string;
        };
        dietaryNeeds: number[];
        allergies: number[];
      };
    };
  }
}

export interface ApiError {
  message: string;
  code?: string;
  status?: number;
} 