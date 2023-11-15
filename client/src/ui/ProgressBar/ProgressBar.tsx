import {FC} from 'react'
import styles from './progressBar.module.scss'


interface Props {
	percent: number
}

export const ProgressBar: FC<Props> = ({percent}) => {
	return (
		<div className={styles.progressBar} style={{width: `${percent}%`}} />
	)
}