import { useState, type FormEvent } from 'react';
import Button from '../../components/Button/Button';
import Headling from '../../components/Headling/Headling';
import Input from '../../components/Input/Input';
import styles from './AuthAdmin.module.css';
import { type RegisterForm } from '../../interfaces/RegisterForm.interface';
import { usersStorage } from '../../helpers/usersStorage';

interface RegisterFormProps {
    onSuccess: (email?: string) => void;
    onCancel: () => void;
}

export function RegisterForm({ onSuccess, onCancel }: RegisterFormProps) {
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    // Валидация email
    const validateEmail = (email: string): boolean => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const submit = async (e: FormEvent) => {
        e.preventDefault();
        setError(null);
        setIsLoading(true);
        
        const target = e.target as typeof e.target & RegisterForm;
        const { email, password, passwordConfirm, username, phone } = target;

        // Валидация полей
        if (!email.value || !password.value || !passwordConfirm.value || !username.value) {
            setError('Пожалуйста, заполните все обязательные поля');
            setIsLoading(false);
            return;
        }

        // Валидация email
        if (!validateEmail(email.value)) {
            setError('Введите корректный email (example@mail.com)');
            setIsLoading(false);
            return;
        }

        // Валидация пароля
        if (password.value.length < 6) {
            setError('Пароль должен быть минимум 6 символов');
            setIsLoading(false);
            return;
        }

        // Проверка совпадения паролей
        if (password.value !== passwordConfirm.value) {
            setError('Пароли не совпадают');
            setIsLoading(false);
            return;
        }

        // Проверка существующего email
        const existingUser = usersStorage.findUserByEmail(email.value);
        if (existingUser) {
            setError('Пользователь с таким email уже зарегистрирован');
            setIsLoading(false);
            return;
        }

        // Сохранение пользователя
        try {
            const newUser = usersStorage.addUser({
                email: email.value,
                password: password.value, // В реальном приложении должен быть хеш
                username: username.value,
                phone: phone?.value || undefined
            });

            if (newUser) {
                setSuccess(true);
                setError(null);
                
                const userEmail = email.value;
                
                // Очистка формы
                email.value = '';
                password.value = '';
                passwordConfirm.value = '';
                username.value = '';
                if (phone) phone.value = '';

                // Через 2 секунды закрываем форму и предлагаем авторизоваться
                setTimeout(() => {
                    onSuccess(userEmail);
                }, 2000);
            } else {
                setError('Ошибка при регистрации. Попробуйте позже.');
            }
        } catch (err) {
            console.error('Registration error:', err);
            setError('Ошибка при регистрации. Попробуйте позже.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className={styles.auth}>
            <div className={styles.head}>
                <Headling appearence="admin">регистрация</Headling>
            </div>
            {error && <div className={styles.error}>{error}</div>}
            {success && (
                <div className={styles.success}>
                    Регистрация успешна! Перенаправление на авторизацию...
                </div>
            )}
            <form className={styles.form} onSubmit={submit}>
                <div className={styles.field}>
                    <label htmlFor="reg-email">E-mail *</label>
                    <Input 
                        id="reg-email" 
                        name="email" 
                        type="email" 
                        placeholder="example@domain.xyz" 
                        required
                        disabled={isLoading || success}
                    />
                </div>
                <div className={styles.field}>
                    <label htmlFor="reg-username">Имя пользователя *</label>
                    <Input 
                        id="reg-username" 
                        name="username" 
                        type="text" 
                        placeholder="Ваше имя" 
                        required
                        disabled={isLoading || success}
                    />
                </div>
                <div className={styles.field}>
                    <label htmlFor="reg-phone">Номер телефона</label>
                    <Input 
                        id="reg-phone" 
                        name="phone" 
                        type="tel" 
                        placeholder="+7 (999) 123-45-67" 
                        disabled={isLoading || success}
                    />
                </div>
                <div className={styles.field}>
                    <label htmlFor="reg-password">Пароль *</label>
                    <Input 
                        id="reg-password" 
                        name="password" 
                        type="password" 
                        placeholder="Минимум 6 символов" 
                        required
                        disabled={isLoading || success}
                    />
                </div>
                <div className={styles.field}>
                    <label htmlFor="reg-password-confirm">Подтверждение пароля *</label>
                    <Input 
                        id="reg-password-confirm" 
                        name="passwordConfirm" 
                        type="password" 
                        placeholder="Повторите пароль" 
                        required
                        disabled={isLoading || success}
                    />
                </div>
                <div className={styles.buttons}>
                    <div className={styles.button}>
                        <Button 
                            appereance='admin' 
                            type="submit"
                            disabled={isLoading || success}
                        >
                            {isLoading ? 'Регистрация...' : 'Зарегистрироваться'}
                        </Button>
                    </div>
                    <div className={styles.button}>
                        <Button 
                            appereance='cancel' 
                            type="button"
                            onClick={onCancel}
                            disabled={isLoading || success}
                        >
                            Отмена
                        </Button>
                    </div>
                </div>
            </form>
        </div>
    );
}

