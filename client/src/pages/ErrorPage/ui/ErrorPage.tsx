import styles from './errorPage.module.scss'

export const ErrorPage = () => {
	return (
		<div className={styles.errorPage}>
			<h1>404</h1>
			<p>Something went wrong</p>
		</div>
	)
}