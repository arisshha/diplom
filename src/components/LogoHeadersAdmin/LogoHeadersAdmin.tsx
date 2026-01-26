import styles from './LogoHeadersAdmin.module.css';
import { useNavigate, useLocation } from 'react-router-dom';
import { authHelper } from '../../helpers/auth';
import Button from '../Button/Button';

export function LogoHeadersAdmin() {
	const navigate = useNavigate();
	const location = useLocation();
	const isAuthenticated = authHelper.isAuthenticated();
	const isLoginPage = location.pathname === '/admin/login';

	const handleLogout = () => {
		authHelper.removeToken();
		navigate('/admin/login');
	};

	return (<div>
		<div className={styles.head}>идём<span>в</span>кино</div>
		<div className={styles.text}>Администраторррская</div>
		{isAuthenticated && !isLoginPage && (
			<div className={styles.logout}>
				<Button appereance='admin' onClick={handleLogout}>
					Выйти
				</Button>
			</div>
		)}
	</div>
		
	);
};

export default LogoHeadersAdmin;