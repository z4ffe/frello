import {FC, PropsWithChildren, SyntheticEvent} from 'react'
import {createPortal} from 'react-dom'
import {useAppDispatch, useAppSelector} from '../../lib/redux/hooks/typedHooks.ts'
import {uiActions} from '../../store/ui/uiSlice.ts'
import styles from './ModalContainer.module.scss'

export const ModalContainer: FC<PropsWithChildren> = ({children}) => {
	const isOpen = useAppSelector(state => state.ui.modal.isOpen)
	const dispatch = useAppDispatch()
	const modalHTMLElement = document.getElementById('modal') as HTMLElement

	const outsideClose = (event: SyntheticEvent) => {
		if (event.target === event.currentTarget) {
			dispatch(uiActions.resetState())
		}
	}

	if (!isOpen) {
		return null
	}

	const modalElement = (
		<div className={styles.modalContainer} onClick={outsideClose}>
			{children}
		</div>
	)

	return createPortal(modalElement, modalHTMLElement)
}