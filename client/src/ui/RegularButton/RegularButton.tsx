import {FC} from 'react'
import styles from './RegularButton.module.scss'

interface Props {
	customClass?: string
	type: 'submit' | 'button' | 'reset'
	text: string
	loading?: boolean
}

export const RegularButton: FC<Props> = ({customClass, type, text, loading}) => {
	return (
		<button className={`${styles.regularButton} ${customClass}`} type={type} disabled={loading}>
			<div className={styles.btnWrapper}>
				<span className={styles.text}>{text}</span>
				{loading ? <span className={styles.spinner} /> : null}
			</div>
		</button>
	)
}