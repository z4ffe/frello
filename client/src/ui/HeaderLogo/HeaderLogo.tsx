import {FC} from 'react'
import {useNavigate} from 'react-router-dom'
import styles from './headerLogo.module.scss'

interface Props {
	customClass?: string
	homeRedirect: boolean
}

export const HeaderLogo: FC<Props> = ({customClass, homeRedirect}) => {
	const navigate = useNavigate()

	const handleHomeRedirect = () => {
		if (homeRedirect) {
			navigate('/')
		}
	}

	return (
		<div className={`${styles.logo} ${customClass}`} onClick={handleHomeRedirect}>
			<div className={styles.icon}>
				<span className={styles.icon__text}>F</span>
			</div>
			<h1 className={styles.title}>Frello</h1>
		</div>
	)
}