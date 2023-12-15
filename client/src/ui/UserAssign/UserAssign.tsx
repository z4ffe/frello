import {useQuery, useQueryClient} from '@tanstack/react-query'
import {useEffect, useState} from 'react'
import avatar from '../../assets/images/avatar.png'
import assignIcon from '../../assets/images/svg/assign_icon.svg'
import {useAppSelector} from '../../libs/redux/hooks/typedHooks.ts'
import {userService} from '../../services/userService.ts'
import {Avatar} from '../Avatar/Avatar.tsx'
import {Divider} from '../Divider/Divider.tsx'
import {LoaderDots} from '../LoaderDots/LoaderDots.tsx'
import styles from './UserAssign.module.scss'

export const Assign = () => {
	const projectId = useAppSelector(state => state.ui.modal.assign)
	const [assigned, setAssigned] = useState<number[]>([])
	const queryClient = useQueryClient()
	const {data, isLoading} = useQuery({
		queryKey: ['users'],
		queryFn: () => {
			if (projectId) {
				return userService.fetchAllUsers(+projectId)
			}
		},
	})

	const handleAssignUser = (userId: number) => {
		if (!assigned.includes(userId)) {
			return setAssigned(prevState => [...prevState, userId])
		}
		const assignedModified = [...assigned]
		assignedModified.splice(assigned.indexOf(userId), 1)
		setAssigned(assignedModified)
	}

	useEffect(() => {
		console.log(assigned)
	}, [assigned])

	useEffect(() => {
		setAssigned([])
		data?.forEach(user => {
			if (user.projectAssigned) {
				setAssigned(prevState => [...prevState, user.id])
			}
		})
	}, [data])

	useEffect(() => {
		return () => {
			queryClient.removeQueries({queryKey: ['users']})
		}
	}, [])

	return (
		<div className={styles.userAssign}>
			<div className={styles.title}>
				<img src={assignIcon} alt='assign icon' />
				<h1>Assign project to</h1>
			</div>
			<Divider />
			<div className={styles.users}>
				{isLoading && !data ?
					<LoaderDots />
					:
					<>
						{data?.map(user => {
							console.log(user)
							return (
								<div className={`${styles.user} ${assigned.includes(user.id) ? styles.user__active : null}`} key={user.id} onClick={() => handleAssignUser(user.id)}>
									<Avatar src={avatar} />
									<span className={styles.name}>{user.firstName}{' '}{user.lastName}</span>
									<span className={styles.inprogress}>{user.projectsCount} projects on progress</span>
								</div>
							)
						})}
					</>
				}
			</div>
		</div>
	)
}