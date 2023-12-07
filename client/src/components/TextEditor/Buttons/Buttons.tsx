import {FC} from 'react'
import * as EditorIcons from './Icons/EditorMenuIcons.tsx'

interface Props {
	handler: () => void
	disabled?: boolean
}

export const RotateLeft: FC<Props> = ({handler, disabled}) => {
	return (
		<button onClick={handler} disabled={disabled}>
			<EditorIcons.RotateLeft />
		</button>
	)
}

export const RotateRight: FC<Props> = ({handler, disabled}) => {
	return (
		<button onClick={handler} disabled={disabled}>
			<EditorIcons.RotateRight />
		</button>
	)
}

export const Bold: FC<Props> = ({handler}) => {
	return (
		<button onClick={handler}>
			<EditorIcons.Bold />
		</button>
	)
}