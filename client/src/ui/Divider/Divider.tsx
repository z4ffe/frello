import {FC} from 'react'
import styles from './divider.module.scss'

interface Props {
	customClass?: string
}

export const Divider: FC<Props> = ({customClass}) => {
	return (
		<div className={`${styles.divider} ${customClass}`} />
	)
}