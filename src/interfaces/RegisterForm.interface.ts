export interface RegisterForm {
    email: {
        value: string
    };
    password: {
        value: string
    };
    passwordConfirm: {
        value: string
    };
    username: {
        value: string
    };
    phone?: {
        value: string
    };
}

export interface User {
    id: string;
    email: string;
    password: string; // В реальном приложении должен быть хеш
    username: string;
    phone?: string;
    createdAt: string;
}

