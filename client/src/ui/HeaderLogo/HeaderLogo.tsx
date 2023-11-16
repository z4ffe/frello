import {FC} from 'react'
import styles from './headerLogo.module.scss'

interface Props {
	customClass?: string
}

export const HeaderLogo: FC<Props> = ({customClass}) => {
	return (
		<div className={`${styles.logo} ${customClass}`}>
			<div className={styles.icon}>
				<span className={styles.icon__text}>F</span>
			</div>
			<h1 className={styles.title}>Frello</h1>
		</div>
	)
}