import {HeaderLogo} from '../../ui/HeaderLogo/HeaderLogo.tsx'
import {NavAuthBar} from '../../ui/NavAuthBar/NavAuthBar.tsx'
import {Search} from '../../ui/Search/Search.tsx'
import styles from './header.module.scss'

export const Header = () => {


	return (
		<div className={styles.header}>
			<div className={styles.container}>
				<HeaderLogo homeRedirect={true} />
				<Search />
				<NavAuthBar />
			</div>
		</div>
	)
}