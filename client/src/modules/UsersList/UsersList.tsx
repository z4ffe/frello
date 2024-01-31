import {FC} from 'react'
import {uiActions} from '../../app/store/ui/uiSlice.ts'
import {useAppDispatch} from '../../shared/lib/redux/hooks/typedHooks.ts'
import {IProject} from '../../shared/types/interfaces/project.interface.ts'
import {AddButton} from '../../shared/ui/AddButton/AddButton.tsx'
import {Avatar} from '../../shared/ui/Avatar/Avatar.tsx'
import styles from './usersList.module.scss'

interface Props {
	project: IProject
}

export const UsersList: FC<Props> = ({project}) => {
	const dispatch = useAppDispatch()

	const users = project.projectAssign.map((user, idx) => {
		const SHOW_USERS = 5

		switch (true) {
			case(idx < SHOW_USERS):
				return <Avatar key={user.id} src={user.avatar} />
			case (idx >= SHOW_USERS && idx === project.projectAssign.length - 1):
				return <span key={Math.random()} className={styles.moreUsers}>{`+ ${project.projectAssign.length - 5} people`}</span>
			default:
				return false
		}
	})

	return (
		<div className={styles.usersList}>
			<div className={styles.usersAvatar}>
				{users}
			</div>
			<AddButton handler={() => dispatch(uiActions.openUserAssign(project.id))} />
		</div>
	)
}