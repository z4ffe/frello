import {NavLink} from 'react-router-dom'
import {useAppSelector} from '../../libs/redux/hooks/typedHooks.ts'
import {AuthProfile} from '../AuthProfile/AuthProfile.tsx'
import styles from './navAuthBar.module.scss'

export const NavAuthBar = () => {
	const projectId = useAppSelector(state => state.projects.id)


	return (
		<nav className={styles.nav}>
			{projectId && <NavLink end to={`/tasks/${projectId}`} className={styles.project__link}>Tasks</NavLink>}
			<NavLink end to='/projects' className={styles.project__link}>Projects</NavLink>
			<AuthProfile />
		</nav>
	)
}