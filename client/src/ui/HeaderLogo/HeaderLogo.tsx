import styles from './headerLogo.module.scss'

export const HeaderLogo = () => {
	return (
		<div className={styles.logo}>
			<div className={styles.icon}>
				<span className={styles.icon__text}>F</span>
			</div>
			<h1 className={styles.title}>Frello</h1>
		</div>
	)
}