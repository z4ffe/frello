import {FC} from 'react'
import defaultAvatar from '../../assets/images/default_avatar.jpg'
import styles from './avatar.module.scss'

interface Props {
	src: string
}

export const Avatar: FC<Props> = ({src}) => {
	const avatar = !src ? defaultAvatar : src

	return (
		<div className={styles.avatar}>
			<img className={styles.avatar__img} src={avatar} alt='avatar' />
		</div>
	)
}