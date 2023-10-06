import {FC, PropsWithChildren} from 'react'
import styles from './mainLayout.module.scss'

export const MainLayout: FC<PropsWithChildren> = ({children}) => {
	return (
		<div className={styles.main__layout}>
			{children}
		</div>
	)
}