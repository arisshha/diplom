import type { User } from '../interfaces/RegisterForm.interface';

const USERS_STORAGE_KEY = 'cinema_users';

export const usersStorage = {
    // Получить всех пользователей
    getUsers: (): User[] => {
        try {
            const usersJson = localStorage.getItem(USERS_STORAGE_KEY);
            return usersJson ? JSON.parse(usersJson) : [];
        } catch {
            return [];
        }
    },

    // Сохранить пользователей
    saveUsers: (users: User[]) => {
        try {
            localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
        } catch (error) {
            console.error('Error saving users:', error);
        }
    },

    // Добавить нового пользователя
    addUser: (user: Omit<User, 'id' | 'createdAt'>): User | null => {
        const users = usersStorage.getUsers();
        
        // Проверка на существующий email
        if (users.some(u => u.email.toLowerCase() === user.email.toLowerCase())) {
            return null; // Email уже существует
        }

        const newUser: User = {
            ...user,
            id: `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
            createdAt: new Date().toISOString()
        };

        users.push(newUser);
        usersStorage.saveUsers(users);
        return newUser;
    },

    // Найти пользователя по email
    findUserByEmail: (email: string): User | null => {
        const users = usersStorage.getUsers();
        return users.find(u => u.email.toLowerCase() === email.toLowerCase()) || null;
    },

    // Проверить пароль пользователя
    verifyPassword: (email: string, password: string): boolean => {
        const user = usersStorage.findUserByEmail(email);
        if (!user) return false;
        return user.password === password; // В реальном приложении нужно сравнивать хеши
    }
};

