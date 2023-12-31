import {AnimatePresence, motion} from 'framer-motion'
import {FC, PropsWithChildren, SyntheticEvent, useEffect} from 'react'
import {createPortal} from 'react-dom'
import {useAppDispatch, useAppSelector} from '../../libs/redux/hooks/typedHooks.ts'
import {uiActions} from '../../store/ui/uiSlice.ts'
import {modalAnimation} from './modalAnimation.ts'
import styles from './ModalContainer.module.scss'

export const ModalContainer: FC<PropsWithChildren> = ({children}) => {
	const isOpen = useAppSelector(state => state.ui.modal.isOpen)
	const auth = useAppSelector(state => state.user.isAuth)
	const dispatch = useAppDispatch()
	const modalHTMLElement = document.getElementById('modal') as HTMLElement

	const outsideClose = (event: SyntheticEvent) => {
		if (!auth) return
		if (event.target === event.currentTarget) {
			dispatch(uiActions.resetState())
		}
	}

	useEffect(() => {
		return () => {
			dispatch(uiActions.resetState())
		}
	}, [])

	const modalElement = (
		<AnimatePresence>
			{isOpen &&
				<motion.div
					{...modalAnimation}
					className={styles.modalContainer}
					onClick={outsideClose}>
					{children}
				</motion.div>}
		</AnimatePresence>

	)

	return createPortal(modalElement, modalHTMLElement)
}