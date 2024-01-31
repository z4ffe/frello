import styles from './confirmDialog.module.scss'

export const ConfirmDialog = () => {
	return (
		<div className={styles.confirmDialog}>
			<h1>ConfirmDialog</h1>
			<button>No</button>
			<button>Yes</button>
		</div>
	)
}