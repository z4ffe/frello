import {FC} from 'react'

interface Props {
	iconType: iconType
	customStyles?: string
}

type iconType =
	| 'assign'
	| 'checked'
	| 'choose'
	| 'clock'
	| 'close'
	| 'dropdown'
	| 'edit'
	| 'flag'
	| 'layout'
	| 'login_banner'
	| 'paperclip'
	| 'project'
	| 'remove'
	| 'search'
	| 'show_password'
	| 'signout'

export const Icon: FC<Props> = ({iconType, customStyles}) => {
	return (
		<img className={customStyles}
			  src={`/src/assets/images/svg/${iconType}.svg`}
			  alt={iconType} />
	)
}