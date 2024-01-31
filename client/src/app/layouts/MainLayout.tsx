import {FC, PropsWithChildren, useEffect} from 'react'
import {ModalContainer} from '../../modules/ModalContainer/ModalContainer.tsx'
import {ModalContent} from '../../modules/ModalContainer/ModalContent.tsx'
import {SearchBackground} from '../../modules/SearchBackground/SearchBackground.tsx'
import {useAppDispatch, useAppSelector} from '../../shared/lib/redux/hooks/typedHooks.ts'
import {Header} from '../../widgets/Header'
import {uiActions} from '../store/ui/uiSlice.ts'
import {refreshToken} from '../store/user/userThunks.ts'
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