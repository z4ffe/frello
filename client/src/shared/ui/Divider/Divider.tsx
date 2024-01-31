import clsx from 'clsx'
import {FC} from 'react'
import styles from './divider.module.scss'

interface Props {
	customClass?: string
}

export const Divider: FC<Props> = ({customClass}) => {
	return (
		<div className={clsx(styles.divider, customClass)} />
	)
}