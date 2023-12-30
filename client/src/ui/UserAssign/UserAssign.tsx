import {AnimatePresence} from 'framer-motion'
import {SyntheticEvent, useEffect, useState} from 'react'
import assignIcon from '../../assets/images/svg/assign_icon.svg'
import searchIcon from '../../assets/images/svg/search.svg'
import {useUsersQuery} from '../../hooks/useUsersQuery.ts'
import {useAppSelector} from '../../libs/redux/hooks/typedHooks.ts'
import {IUsers} from '../../types/interfaces/user.interface.ts'
import {LoaderDots} from '../LoaderDots/LoaderDots.tsx'
import {UserTile} from '../UserTile/UserTile.tsx'
import styles from './UserAssign.module.scss'

export const Assign = () => {
	const projectId = useAppSelector(state => state.ui.modal.assign)
	const [users, setUsers] = useState<IUsers[]>([])
	const {usersData, usersLoading, removeUsers} = useUsersQuery(projectId)

	useEffect(() => {
		return () => {
			removeUsers()
		}
	}, [])

	useEffect(() => {
		if (usersData) setUsers(usersData)
	}, [usersData])


	const handleSearch = (event: SyntheticEvent<HTMLInputElement>) => {
		if (usersData) {
			const value = event.currentTarget.value.toLowerCase()
			const filtredUsers = usersData.filter(user => {
				const fullName = (user.firstName + ' ' + user.lastName).toLowerCase()
				if (fullName.includes(value)) {
					return user
				}
			})
			setUsers(filtredUsers)
		}
	}

	if (usersLoading) {
		return <LoaderDots />
	}

	return (
		<div className={styles.userAssign}>
			<div className={styles.title}>
				<img src={assignIcon} alt='assign icon' />
				<h1>Assign project to</h1>
			</div>
			<div className={styles.search__wrapper}>
				<div className={styles.search}>
					<img className={styles.icon} src={searchIcon} alt='search' />
					<input className={styles.input} type='text' placeholder='Search users...' onInput={handleSearch} autoFocus />
				</div>
			</div>
			<div className={styles.users}>
				<AnimatePresence initial={false}>
					{users?.sort((a, b) => Number(b.projectAssign) - Number(a.projectAssign)).map(user => (
						<UserTile key={user.id} user={user} />
					))}
				</AnimatePresence>
			</div>
		</div>
	)
}