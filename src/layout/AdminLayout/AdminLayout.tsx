import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import LogoHeadersAdmin from "../../components/LogoHeadersAdmin/LogoHeadersAdmin";
import styles from './AdminLayout.module.css';
import { authHelper } from "../../helpers/auth";

export function AdminLayout() {
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        // Проверяем авторизацию для всех маршрутов кроме /admin/login
        if (location.pathname !== '/admin/login' && !authHelper.isAuthenticated()) {
            navigate('/admin/login');
        }
    }, [location.pathname, navigate]);

    // Если пользователь не авторизован и не на странице логина, не показываем контент
    if (location.pathname !== '/admin/login' && !authHelper.isAuthenticated()) {
        return null;
    }

    return <div className={styles['admin-layout']}>
                <div className={styles.main}>
                    <div className={styles.logo}>
                        <LogoHeadersAdmin />                       
                    </div>
                    <div className={styles['content']}>
                        <Outlet />          
                    </div>
                </div>
            </div> 
}