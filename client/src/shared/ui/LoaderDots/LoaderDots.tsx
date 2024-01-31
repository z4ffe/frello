import styles from './loaderDots.module.scss'

export const LoaderDots = () => {
	return (
		<div className={styles.wrapper}>
			<span className={styles.loader}></span>
		</div>
	)
}