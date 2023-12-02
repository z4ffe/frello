import {useLocation} from 'react-router-dom'
import searchIcon from '../../assets/images/svg/search.svg'
import {useAppDispatch} from '../../lib/redux/hooks/typedHooks.ts'
import {uiActions} from '../../store/ui/uiSlice.ts'
import styles from './search.module.scss'

export const Search = () => {
	const location = useLocation()
	const dispatch = useAppDispatch()

	const searchPrefix = () => {
		if (location.pathname.includes('projects')) return 'projects'
		if (location.pathname.includes('tasks')) return 'tasks'
		return 'something'
	}

	const handleSearchOn = () => {
		dispatch(uiActions.searchOn())
	}

	const handleSearchOff = () => {
		dispatch(uiActions.searchOff())
	}

	return (
		<div className={styles.search}>
			<img className={styles.search__icon} src={searchIcon} alt='search' />
			<input className={styles.input} placeholder={`Search ${searchPrefix()}...`} onFocus={handleSearchOn} onBlur={handleSearchOff} />
		</div>
	)
}