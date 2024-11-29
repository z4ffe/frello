import {useMediaQuery} from 'react-responsive'
import {HeaderLogo} from '../../ui/HeaderLogo/HeaderLogo.tsx'
import {NavAuthBar} from '../../ui/NavAuthBar/NavAuthBar.tsx'
import {Search} from '../../ui/Search/Search.tsx'
import styles from './header.module.scss'

export const Header = () => {
	const isMobile = useMediaQuery({query: '(max-width: 450px)'})

	return (
		<header className={styles.header}>
			<div className={styles.container}>
				<HeaderLogo homeRedirect={true} />
				<Search />
				{!isMobile && <NavAuthBar />}
			</div>
		</header>
	)
}