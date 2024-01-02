import {useMutation, useQueryClient} from '@tanstack/react-query'
import clsx from 'clsx'
import {motion} from 'framer-motion'
import {FC} from 'react'
import {useAppSelector} from '../../libs/redux/hooks/typedHooks.ts'
import {projectService} from '../../services/projectService.ts'
import {IUsers} from '../../types/interfaces/user.interface.ts'
import {Avatar} from '../Avatar/Avatar.tsx'
import {Spinner} from '../Spinner/Spinner.tsx'
import {userAssignAnimation} from '../UserAssign/userAssignAnimation.ts'
import styles from './userTile.module.scss'

interface Props {
	user: IUsers
}

export const UserTile: FC<Props> = ({user}) => {
	const projectId = useAppSelector(state => state.ui.modal.assign)
	const queryClient = useQueryClient()

	const {mutate, isPending} = useMutation({
		mutationFn: () => {
			return projectService.assignProjectToUser(user.id, projectId!)
		},
		onSuccess: () => {
			void queryClient.invalidateQueries({queryKey: ['users'], refetchType: 'all'})
			void queryClient.invalidateQueries({queryKey: ['projects'], refetchType: 'all'})
		},
	})


	return (
		<motion.div
			{...userAssignAnimation}
			onClick={() => mutate()}
			className={clsx(styles.userCard, {[styles.userCard__active]: user.projectAssign})}>
			{isPending ? <Spinner /> : <Avatar src={user.avatar} />}
			<span className={styles.name}>{`${user.firstName} ${user.lastName}`}</span>
			<span className={styles.inprogress}>{user.projectsCount} projects on progress</span>
		</motion.div>
	)
}