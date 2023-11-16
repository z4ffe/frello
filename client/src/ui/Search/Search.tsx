import {useLocation} from 'react-router-dom'
import searchIcon from '../../assets/images/svg/search.svg'
import {useAppDispatch} from '../../lib/redux/hooks/typedHooks.ts'
import {uiActions} from '../../store/ui/uiSlice.ts'
import styles from './search.module.scss'

export const Search = () => {
	const location = useLocation()
	const dispatch = useAppDispatch()

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