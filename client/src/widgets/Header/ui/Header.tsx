import {NavAuthBar} from '../../../modules/NavAuthBar/NavAuthBar.tsx'
import {Search} from '../../../modules/Search/Search.tsx'
import {Logo} from '../../../shared/ui/Logo/Logo.tsx'
import styles from './header.module.scss'

export const Header = () => {
	return (
		<header className={styles.header}>
			<div className={styles.container}>
				<Logo homeRedirect={true} />
				<Search />
				<NavAuthBar />
			</div>
		</header>
	)
}