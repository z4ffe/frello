import bannerImage from '../../app/assets/images/svg/login-banner.svg'
import {Logo} from '../../shared/ui/Logo/Logo.tsx'
import {LoginForm} from '../LoginForm/LoginForm.tsx'
import styles from './login.module.scss'

export const Login = () => {
	return (
		<div className={styles.login}>
			<div className={styles.login__banner}>
				<img className={styles.bannerImage} src={bannerImage} alt='Teamwork' draggable={false} />
			</div>
			<div className={styles.login__formWrapper}>
				<div>
					<Logo customClass={styles.logo} homeRedirect={false} />
				</div>
				<span className={styles.welcomeText}>Nice to see you again</span>
				<LoginForm />
			</div>
		</div>
	)
}