import {useQueryClient} from '@tanstack/react-query'
import {useNavigate} from 'react-router-dom'
import {projectsActions} from '../../app/store/projects/projectsSlice.ts'
import {uiActions} from '../../app/store/ui/uiSlice.ts'
import {userActions} from '../../app/store/user/userSlice.ts'
import {useAppDispatch, useAppSelector} from '../../shared/lib/redux/hooks/typedHooks.ts'
import {Avatar} from '../../shared/ui/Avatar/Avatar.tsx'
import {Icon} from '../../shared/ui/Icon/Icon.tsx'
import styles from './AuthProfile.module.scss'

export const AuthProfile = () => {
	const queryClient = useQueryClient()
	const {isAuth, username, avatar} = useAppSelector(state => state.user)
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
					<button onClick={handleLogout}>
						<Icon customStyles={styles.user__logout} iconType='signout' />
					</button>
				</div>
				:
				<button className={styles.auth__button} onClick={() => dispatch(uiActions.openLoginModal())}>Sign in</button>
			}
			<Avatar src={avatar} />
		</div>
	)
}