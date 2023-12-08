import avatar2 from '../../assets/images/avatar2.png'
import signoutIcon from '../../assets/images/svg/signout.svg'
import {useAppDispatch, useAppSelector} from '../../libs/redux/hooks/typedHooks.ts'
import {uiActions} from '../../store/ui/uiSlice.ts'
import {userActions} from '../../store/user/userSlice.ts'
import {logout} from '../../store/user/userThunks.ts'
import {Avatar} from '../Avatar/Avatar.tsx'
import styles from './AuthProfile.module.scss'

export const AuthProfile = () => {
	const {isAuth, username} = useAppSelector(state => state.user)
	const dispatch = useAppDispatch()

	const handleLogout = async () => {
		localStorage.removeItem('accessToken')
		dispatch(userActions.logoutUser())
		await dispatch(logout())
	}

	return (
		<div className={styles.authProfile}>
			{isAuth && username ?
				<div className={styles.user}>
					<span>Hello, {username.toUpperCase()}</span>
					<img className={styles.user__logout} src={signoutIcon} alt='SignOut' onClick={handleLogout} />
				</div>
				:
				<button className={styles.auth__button} onClick={() => dispatch(uiActions.openLoginModal())}>Sign in</button>
			}
			<Avatar src={avatar2} />
		</div>
	)
}