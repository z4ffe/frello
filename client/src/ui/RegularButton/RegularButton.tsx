import {ComponentPropsWithoutRef, FC} from 'react'
import styles from './RegularButton.module.scss'

type Props = {
	customClass?: string
	text: string
	loading?: boolean
	handler?: any
} & ComponentPropsWithoutRef<'button'>

export const RegularButton: FC<Props> = ({
														  customClass, text, handler, loading,
														  ...rest
													  }) => {
	return (
		<button onClick={handler}
				  className={`${styles.regularButton} ${customClass}`} {...rest}>
			<div className={styles.btnWrapper}>
				<span className={styles.text}>{text}</span>
				{loading ? <span className={styles.spinner} /> : null}
			</div>
		</button>
	)
}