import {FC, ReactElement} from 'react'
import * as EditorIcons from '../Icons/EditorMenuIcons.tsx'
import styles from './Buttons.module.scss'

type ButtonTypes = 'RotateLeft' | 'RotateRight' | 'Bold' | 'Italic' | 'Underline' | 'Strikethrough' | 'Code'

interface Props {
	type: ButtonTypes
	handler: () => void
	disabled?: boolean
	isActive?: boolean
}

export const MenuButtons: FC<Props> = ({type, handler, disabled, isActive}) => {
	const buttonIsActive = isActive ? styles.isActive : ''
	const icons: Record<ButtonTypes, ReactElement> = {
		RotateLeft: <EditorIcons.RotateLeft />,
		RotateRight: <EditorIcons.RotateRight />,
		Bold: <EditorIcons.Bold />,
		Italic: <EditorIcons.Italic />,
		Underline: <EditorIcons.Underline />,
		Strikethrough: <EditorIcons.Strikethrough />,
		Code: <EditorIcons.Code />,
	}

	return (
		<button onClick={handler} disabled={disabled} className={buttonIsActive}>
			{icons[type]}
		</button>
	)
}
