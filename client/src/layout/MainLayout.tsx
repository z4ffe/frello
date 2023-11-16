import {FC, PropsWithChildren, useEffect} from 'react'
import {useAppDispatch} from '../lib/redux/hooks/typedHooks.ts'
import {refreshToken} from '../store/user/userThunks.ts'
import styles from './mainLayout.module.scss'

export const MainLayout: FC<PropsWithChildren> = ({children}) => {
	const dispatch = useAppDispatch()

	useEffect(() => {
		const localToken = localStorage.getItem('accessToken')
		if (localToken) {
			dispatch(refreshToken())
			return
		}
	}, [])

	return (
		<div className={styles.main__layout}>
			{children}
		</div>
	)
}