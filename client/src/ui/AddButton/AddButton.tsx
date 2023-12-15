import {FC} from 'react'
import styles from './addButton.module.scss'

interface Props {
	customClass?: string
	handler: () => void
}

export const AddButton: FC<Props> = ({handler}) => {
	return (
		<button className={styles.addButton} onClick={handler}>
			+
		</button>
	)
}