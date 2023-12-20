import {useQuery, useQueryClient} from '@tanstack/react-query'
import {AnimatePresence, motion} from 'framer-motion'
import {SyntheticEvent, useEffect, useState} from 'react'
import avatar from '../../assets/images/avatar.png'
import assignIcon from '../../assets/images/svg/assign_icon.svg'
import searchIcon from '../../assets/images/svg/search.svg'
import {useAppSelector} from '../../libs/redux/hooks/typedHooks.ts'
import {userService} from '../../services/userService.ts'
import {IUsers} from '../../types/interfaces/user.interface.ts'
import {Avatar} from '../Avatar/Avatar.tsx'
import {LoaderDots} from '../LoaderDots/LoaderDots.tsx'
import styles from './UserAssign.module.scss'
import {userAssignAnimation} from './userAssignAnimation.ts'

export const Assign = () => {
	const projectId = useAppSelector(state => state.ui.modal.assign)
	const [users, setUsers] = useState<IUsers[]>([])
	const queryClient = useQueryClient()
	const {data, isLoading} = useQuery({
		queryKey: ['users'],
		queryFn: () => {
			if (projectId) return userService.fetchAllUsers(+projectId)
		},
	})

	const handleSearch = (event: SyntheticEvent<HTMLInputElement>) => {
		const value = event.currentTarget.value.toLowerCase()
		const filtredUsers = data!.filter(user => {
			const fullName = (user.firstName + ' ' + user.lastName).toLowerCase()
			if (fullName.includes(value)) {
				return user
			}
		})
		setUsers(filtredUsers)
	}

	useEffect(() => {
		if (data) setUsers(data)
	}, [data])

	useEffect(() => {
		return () => {
			queryClient.removeQueries({queryKey: ['users']})
		}
	}, [])

	return (
		<>
			{isLoading && !data ?
				<LoaderDots />
				:
				<div className={styles.userAssign}>
					<div className={styles.title}>
						<img src={assignIcon} alt='assign icon' />
						<h1>Assign project to</h1>
					</div>
					<div className={styles.search}>
						<img className={styles.icon} src={searchIcon} alt='search' />
						<input className={styles.input} type='text' placeholder='Search users...' onInput={handleSearch} autoFocus />
					</div>
					<div className={styles.users}>

						<AnimatePresence initial={false}>
							{users?.sort((a, b) => Number(b.projectAssigned) - Number(a.projectAssigned)).map(user => {
								return (
									<motion.div
										{...userAssignAnimation}
										className={`${styles.user} ${user.projectAssigned ? styles.user__active : ''}`} key={user.id}>
										<Avatar src={avatar} />
										<span className={styles.name}>{user.firstName}{' '}{user.lastName}</span>
										<span className={styles.inprogress}>{user.projectsCount} projects on progress</span>
									</motion.div>
								)
							})}
						</AnimatePresence>

					</div>
				</div>
			}
		</>
	)
}