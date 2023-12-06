import {FC, PropsWithChildren, useEffect} from 'react'
import {Header} from '../components/Header/Header.tsx'
import {useAppDispatch} from '../libs/redux/hooks/typedHooks.ts'
import {refreshToken} from '../store/user/userThunks.ts'
import {ModalContainer} from '../ui/ModalContainer/ModalContainer.tsx'
import {ModalContent} from '../ui/ModalContainer/ModalContent.tsx'
import {SearchBackground} from '../ui/SearchBackground/SearchBackground.tsx'
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
			<Header />
			{children}
			<SearchBackground />
			<ModalContainer>
				<ModalContent />
			</ModalContainer>
		</div>
	)
}