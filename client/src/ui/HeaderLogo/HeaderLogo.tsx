import {useNavigate} from 'react-router'
import styles from './headerLogo.module.scss'

export const HeaderLogo = () => {
	const navigate = useNavigate()

	return (
		<div className={styles.logo} onClick={() => navigate('/')}>
			<div className={styles.icon}>
				<span className={styles.icon__text}>F</span>
			</div>
			<h1 className={styles.title}>Frello</h1>
		</div>
	)
}