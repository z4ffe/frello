import {FC} from 'react'
import styles from './addButton.module.scss'

interface Props {
	customClass?: string
}

export const AddButton: FC<Props> = () => {
	return (
		<button className={styles.addButton}>
			+
		</button>
	)
}