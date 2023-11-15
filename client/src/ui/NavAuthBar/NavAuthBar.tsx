import cookies from 'js-cookie'
import {NavLink} from 'react-router-dom'
import signoutIcon from '../../assets/images/svg/signout.svg'
import {useAppDispatch, useAppSelector} from '../../lib/redux/hooks/typedHooks.ts'
import {uiActions} from '../../store/ui/uiSlice.ts'
import {userActions} from '../../store/user/userSlice.ts'
import styles from './navAuthBar.module.scss'

export const NavAuthBar = () => {
	const user = useAppSelector(state => state.user)
	const dispatch = useAppDispatch()

	const handleLogout = () => {
		dispatch(userActions.logoutUser())
		cookies.set('refreshToken', '')
	}

	return (
		<div className={styles.nav}>
			<NavLink to='/projects' className={styles.project__link}>Projects</NavLink>
			{user.isAuth ?
				<div className={styles.user}>
					<span>Hello, {user.username.toUpperCase()}</span>
					<img src={signoutIcon} alt='SignOut' onClick={handleLogout} />
				</div>
				:
				<button className={styles.auth__button} onClick={() => dispatch(uiActions.openLoginModal())}>Sign in</button>
			}
		</div>
	)
}