import {useQueryClient} from '@tanstack/react-query'
import {useNavigate} from 'react-router-dom'
import avatar2 from '../../assets/images/avatar2.png'
import signoutIcon from '../../assets/images/svg/signout.svg'
import {useAppDispatch, useAppSelector} from '../../libs/redux/hooks/typedHooks.ts'
import {projectsActions} from '../../store/projects/projectsSlice.ts'
import {uiActions} from '../../store/ui/uiSlice.ts'
import {userActions} from '../../store/user/userSlice.ts'
import {Avatar} from '../Avatar/Avatar.tsx'
import styles from './AuthProfile.module.scss'

export const AuthProfile = () => {
	const queryClient = useQueryClient()
	const {isAuth, username} = useAppSelector(state => state.user)
	const dispatch = useAppDispatch()
	const navigate = useNavigate()

	const handleLogout = async () => {
		localStorage.removeItem('accessToken')
		dispatch(userActions.logoutUser())
		dispatch(projectsActions.resetProject())
		queryClient.clear()
		navigate('/')
	}

	return (
		<div className={styles.authProfile}>
			{isAuth && username ?
				<div className={styles.user}>
					<span>Hello, {username}</span>
					<img className={styles.user__logout} src={signoutIcon} alt='SignOut' onClick={handleLogout} />
				</div>
				:
				<button className={styles.auth__button} onClick={() => dispatch(uiActions.openLoginModal())}>Sign in</button>
			}
			<Avatar src={avatar2} />
		</div>
	)
}