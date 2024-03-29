import clsx from 'clsx'
import {FC} from 'react'
import {useNavigate} from 'react-router-dom'
import styles from './logo.module.scss'

interface Props {
	customClass?: string
	homeRedirect: boolean
}

export const Logo: FC<Props> = ({customClass, homeRedirect}) => {
	const navigate = useNavigate()

	const handleHomeRedirect = () => {
		if (homeRedirect) {
			navigate('/')
		}
	}

	return (
		<div className={clsx(styles.logo, customClass)} onClick={handleHomeRedirect}>
			<div className={styles.icon}>
				<span className={styles.icon__text}>F</span>
			</div>
			<h1 className={styles.title}>Frello</h1>
		</div>
	)
}