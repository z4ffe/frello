import {FC} from 'react'
import styles from './Spinner.module.scss'

interface Props {
	customClass?: string
}

export const Spinner: FC<Props> = ({customClass}) => {
	return (
		<span className={`${styles.spinner} ${customClass}`}></span>
	)
}