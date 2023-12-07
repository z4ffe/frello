import {FC} from 'react'
import styles from './avatar.module.scss'

interface Props {
	src: string
}

export const Avatar: FC<Props> = ({src}) => {
	return (
		<div className={styles.avatar}>
			<img className={styles.avatar__img} src={src} alt='avatar' />
		</div>
	)
}