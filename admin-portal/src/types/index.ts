export interface User {
    id: string;
    email: string;
    password: string;
}

export interface AuthRequest {
    email: string;
    password: string;
}