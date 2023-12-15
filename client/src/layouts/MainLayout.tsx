import {FC, PropsWithChildren, useEffect} from 'react'
import {Header} from '../components/Header/Header.tsx'
import {useAppDispatch, useAppSelector} from '../libs/redux/hooks/typedHooks.ts'
import {uiActions} from '../store/ui/uiSlice.ts'
import {refreshToken} from '../store/user/userThunks.ts'
import {ModalContainer} from '../ui/ModalContainer/ModalContainer.tsx'
import {ModalContent} from '../ui/ModalContainer/ModalContent.tsx'
import {SearchBackground} from '../ui/SearchBackground/SearchBackground.tsx'
import styles from './mainLayout.module.scss'

export const MainLayout: FC<PropsWithChildren> = ({children}) => {
	const isAuth = useAppSelector(state => state.user.isAuth)
	const dispatch = useAppDispatch()

	useEffect(() => {
		const localToken = localStorage.getItem('accessToken')
		if (localToken) {
			dispatch(refreshToken())
			return
		}
	}, [])

	useEffect(() => {
		if (!isAuth) dispatch(uiActions.openLoginModal())
		if (isAuth) dispatch(dispatch(uiActions.resetState()))
	}, [isAuth])


	return (
		<div className={styles.main__layout}>
			<Header />
			{children}
			<SearchBackground />
			<ModalContainer>
				<ModalContent />
			</ModalContainer>
		</div>
	)
}