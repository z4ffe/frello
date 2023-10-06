import searchIcon from '../../assets/images/svg/search.svg'
import styles from './search.module.scss'

export const Search = () => {
	return (
		<div className={styles.search}>
			<img className={styles.search__icon} src={searchIcon} alt='search' />
			<input className={styles.input} placeholder='Search tasks...' />
		</div>
	)
}