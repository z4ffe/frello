import closeImg from '../../assets/images/svg/close.svg'
import bannerImage from '../../assets/images/svg/support-team.svg'
import {useAppDispatch} from '../../lib/redux/hooks/typedHooks.ts'
import {uiActions} from '../../store/ui/uiSlice.ts'
import {HeaderLogo} from '../../ui/HeaderLogo/HeaderLogo.tsx'
import {LoginForm} from '../LoginForm/LoginForm.tsx'
import styles from './login.module.scss'

export const Login = () => {
	const dispatch = useAppDispatch()

	return (
		<div className={styles.login}>
			<div className={styles.login__banner}>
				<img className={styles.bannerImage} src={bannerImage} alt='Teamwork' />
			</div>
			<div className={styles.login__formWrapper}>
				<div>
					<HeaderLogo />
				</div>
				<span className={styles.welcomeText}>Nice to see you again</span>
				<LoginForm />
			</div>
			<div className={styles.closeBtn} onClick={() => dispatch(uiActions.resetState())}>
				<img src={closeImg} alt='Close Button' />
			</div>
		</div>
	)
}