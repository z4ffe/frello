import {useLocation} from 'react-router-dom'
import searchIcon from '../../assets/images/svg/search.svg'
import styles from './search.module.scss'

export const Search = () => {
	const location = useLocation()

	const searchPrefix = () => {
		switch (location.pathname) {
			case('/projects'):
				return 'projects'
			case('/tasks'):
				return 'tasks'
			default:
				return 'something'
		}
	}

	return (
		<div className={styles.search}>
			<img className={styles.search__icon} src={searchIcon} alt='search' />
			<input className={styles.input} placeholder={`Search ${searchPrefix()}...`} />
		</div>
	)
}