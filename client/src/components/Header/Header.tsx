import {useNavigate} from 'react-router-dom'
import {HeaderLogo} from '../../ui/HeaderLogo/HeaderLogo.tsx'
import {NavAuthBar} from '../../ui/NavAuthBar/NavAuthBar.tsx'
import {Search} from '../../ui/Search/Search.tsx'
import styles from './header.module.scss'

export const Header = () => {
	const navigate = useNavigate()

	return (
		<div className={styles.header}>
			<div className={styles.container}>
				<div onClick={() => navigate('/')}>
					<HeaderLogo />
				</div>
				<Search />
				<NavAuthBar />
			</div>
		</div>
	)
}