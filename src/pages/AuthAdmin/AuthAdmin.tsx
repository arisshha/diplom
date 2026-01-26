import { useState, type FormEvent, useEffect } from 'react';
import Button from '../../components/Button/Button';
import Headling from '../../components/Headling/Headling';
import Input from '../../components/Input/Input';
import styles from './AuthAdmin.module.css';
import  { type LoginForm } from '../../interfaces/LoginForm.interface';
import { PREFIX } from '../../helpers/API';
import axios from 'axios';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { authHelper } from '../../helpers/auth';
import { RegisterForm } from './RegisterForm';
import { usersStorage } from '../../helpers/usersStorage';


export function AuthAdmin() {
    const [error, setError] = useState<string | null>();
    const [isLoading, setIsLoading] = useState(false);
    const [searchParams] = useSearchParams();
    const [showRegister, setShowRegister] = useState(searchParams.get('register') === 'true');
    const [registeredEmail, setRegisteredEmail] = useState<string | null>(null);
    const navigate = useNavigate();

    // Проверяем, не авторизован ли уже пользователь
    useEffect(() => {
        if (authHelper.isAuthenticated()) {
            navigate('/admin/cabinet');
        }
    }, [navigate]);

    // Скрываем сообщение об успешной регистрации через 5 секунд
    useEffect(() => {
        if (registeredEmail) {
            const timer = setTimeout(() => {
                setRegisteredEmail(null);
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [registeredEmail]);

    const submit = async (e: FormEvent) => {
        e.preventDefault();
        setError(null);
        setRegisteredEmail(null); // Скрываем сообщение об успешной регистрации при попытке входа
        setIsLoading(true);
        const target = e.target as typeof  e.target & LoginForm;
        const { login, password } = target;
        
        // Валидация
        if (!login.value || !password.value) {
            setError('Пожалуйста, заполните все поля');
            setIsLoading(false);
            return;
        }

        await sendLogin(login.value, password.value);
    };

    const sendLogin = async (login: string, password: string) => {
        try {
            // Сначала проверяем локальное хранилище пользователей
            const localUser = usersStorage.findUserByEmail(login);
            if (localUser && usersStorage.verifyPassword(login, password)) {
                // Пользователь найден в локальном хранилище
                const token = `auth_${Date.now()}_${localUser.id}`;
                authHelper.setToken(token);
                navigate('/admin/cabinet');
                return;
            }

            // Если не найден локально, пробуем через API (для существующих админов)
            try {
                const res = await axios.post(`${PREFIX}/login`, {
                    login,
                    password
                });
                
                // Обработка различных форматов ответа
                if (res.data) {
                    // Если есть токен в ответе
                    if (res.data.token) {
                        authHelper.setToken(res.data.token);
                        navigate('/admin/cabinet');
                        return;
                    }
                    
                    // Если есть success флаг
                    if (res.data.success) {
                        // Сохраняем токен, если он есть, или используем логин как идентификатор
                        const token = res.data.token || res.data.sessionId || `auth_${Date.now()}`;
                        authHelper.setToken(token);
                        navigate('/admin/cabinet');
                        return;
                    }
                    
                    // Если есть ошибка в ответе
                    if (res.data.error) {
                        setError(res.data.error);
                        setIsLoading(false);
                        return;
                    }
                }
                
                // Если ответ успешный, но нет явного success флага
                // Пытаемся сохранить любые данные как токен
                const token = res.data?.token || res.data?.sessionId || `auth_${Date.now()}`;
                authHelper.setToken(token);
                navigate('/admin/cabinet');
            } catch (apiError: any) {
                // Если API вернул ошибку, проверяем локальное хранилище еще раз
                if (apiError.response?.status === 401 || apiError.response?.status === 404) {
                    setError('Email или пароль неверный');
                } else {
                    throw apiError; // Пробрасываем дальше для общей обработки
                }
            }
        } catch (e: any) {
            console.error('Login error:', e);
            
            // Улучшенная обработка ошибок
            if (e.response) {
                // Сервер вернул ошибку
                const errorMessage = e.response.data?.error 
                    || e.response.data?.message 
                    || 'Email или пароль неверный';
                setError(errorMessage);
            } else if (e.request) {
                // Запрос был отправлен, но ответа не получено
                // Проверяем локальное хранилище как fallback
                const localUser = usersStorage.findUserByEmail(login);
                if (localUser && usersStorage.verifyPassword(login, password)) {
                    const token = `auth_${Date.now()}_${localUser.id}`;
                    authHelper.setToken(token);
                    navigate('/admin/cabinet');
                    return;
                }
                setError('Сервер не отвечает. Проверьте подключение к интернету.');
            } else {
                // Ошибка при настройке запроса
                setError('Ошибка при авторизации. Попробуйте позже.');
            }
            setIsLoading(false);
        }
    };   

    if (showRegister) {
        return (
            <>
                <RegisterForm 
                    onSuccess={(email?: string) => {
                        if (email) {
                            setRegisteredEmail(email);
                        }
                        setShowRegister(false);
                        setError(null);
                    }}
                    onCancel={() => {
                        setShowRegister(false);
                        setError(null);
                    }}
                />
                <div className={styles.switch}>
                    Уже есть аккаунт?{' '}
                    <button type="button" onClick={() => setShowRegister(false)}>
                        Войти
                    </button>
                </div>
            </>
        );
    }

    return (
        <>
            <div className={styles.auth}>
                <div className={styles.head}>
                    <Headling appearence="admin">авторизация</Headling>
                </div>
                {registeredEmail && (
                    <div className={styles.success}>
                        Регистрация успешна! Теперь вы можете войти с вашим email и паролем.
                    </div>
                )}
                {error && <div className={styles.error}>{error}</div>}
                <form className={styles.form} onSubmit={submit}>
                    <div className={styles.field}>
                        <label htmlFor="email">E-mail</label>
                        <Input 
                            id="email" 
                            name="login" 
                            type="email" 
                            placeholder="example@domain.xyz"
                            defaultValue={registeredEmail || ''}
                        />
                    </div>
                    <div className={styles.field}>
                        <label htmlFor="password">Пароль</label>
                        <Input id="password" type="password" name="password" placeholder="Ваш пароль" />
                    </div>                
                    <div className={styles.button}>
                        <Button appereance='admin' disabled={isLoading}>
                            {isLoading ? 'Авторизация...' : 'авторизоваться'}
                        </Button>
                    </div>                
                </form>
            </div>
            <div className={styles.switch}>
                Нет аккаунта?{' '}
                <button type="button" onClick={() => setShowRegister(true)}>
                    Зарегистрироваться
                </button>
            </div>
        </>
    );
}