import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import styles from './ClientLayout.module.css';
import LogoHeadersClient from '../../components/LogoHeadersClient/LogoHeadersClient';
import Button from '../../components/Button/Button';


export function ClientLayout() {
    const location = useLocation();
    const navigate = useNavigate();
    const hideHeaderButton = location.pathname === '/';

    return  <div className={styles['client-layout']}>
                <div className={styles.logo}>
                        <LogoHeadersClient />
                            {hideHeaderButton && (
                                <div className={styles.authButtons}>
                                    <Button appereance="small" className={styles.authButton} onClick={() => navigate('/admin/login')}>
                                        войти
                                    </Button>
                                </div>
                            )}
                </div>
                <div className={styles.main}>
                    
                    <div className={styles['content']}>
                        <Outlet />          
                    </div>
                </div>
            </div>;
}