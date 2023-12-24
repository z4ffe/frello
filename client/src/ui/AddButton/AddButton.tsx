import {FC} from 'react'
import styles from './addButton.module.scss'

interface Props {
	customClass?: string
	handler: () => void
}

export const AddButton: FC<Props> = ({handler, customClass}) => {
	return (
		<button className={`${styles.addButton} ${customClass ? customClass : ''}`} onClick={handler}>
			+
		</button>
	)
}