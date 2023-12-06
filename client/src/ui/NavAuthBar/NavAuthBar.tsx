import {NavLink} from 'react-router-dom'
import signoutIcon from '../../assets/images/svg/signout.svg'
import {useAppDispatch, useAppSelector} from '../../libs/redux/hooks/typedHooks.ts'
import {uiActions} from '../../store/ui/uiSlice.ts'
import {userActions} from '../../store/user/userSlice.ts'
import {logout} from '../../store/user/userThunks.ts'
import styles from './navAuthBar.module.scss'

export const NavAuthBar = () => {
	const {isAuth, username} = useAppSelector(state => state.user)
	const projectId = useAppSelector(state => state.projects.id)
	const dispatch = useAppDispatch()

	const handleLogout = async () => {
		localStorage.removeItem('accessToken')
		dispatch(userActions.logoutUser())
		await dispatch(logout())
	}

	return (
		<div className={styles.nav}>
			<NavLink to={projectId ? `/tasks/${projectId}` : '/projects'} className={styles.project__link}>Tasks</NavLink>
			<NavLink to='/projects' className={styles.project__link}>Projects</NavLink>
			{isAuth && username ?
				<div className={styles.user}>
					<span>Hello, {username.toUpperCase()}</span>
					<img src={signoutIcon} alt='SignOut' onClick={handleLogout} />
				</div>
				:
				<button className={styles.auth__button} onClick={() => dispatch(uiActions.openLoginModal())}>Sign in</button>
			}
		</div>
	)
}