import {ComponentPropsWithoutRef, FC} from 'react'
import styles from './RegularButton.module.scss'

type Props = {
	customClass?: string
	text: string
	loading?: boolean
} & ComponentPropsWithoutRef<'button'>

export const RegularButton: FC<Props> = ({customClass, text, loading, ...rest}) => {
	return (
		<button className={`${styles.regularButton} ${customClass}`} {...rest}>
			<div className={styles.btnWrapper}>
				<span className={styles.text}>{text}</span>
				{loading ? <span className={styles.spinner} /> : null}
			</div>
		</button>
	)
}