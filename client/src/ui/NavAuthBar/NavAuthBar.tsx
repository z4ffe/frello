import {NavLink} from 'react-router-dom'
import styles from './navAuthBar.module.scss'

export const NavAuthBar = () => {
	return (
		<div className={styles.nav}>
			<NavLink to='/projects' className={styles.project__link}>Projects</NavLink>
			<button className={styles.auth__button} onClick={() => alert('Modal inc.')}>Sign up</button>
		</div>
	)
}