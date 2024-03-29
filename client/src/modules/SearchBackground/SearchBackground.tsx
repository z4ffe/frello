import {AnimatePresence, motion} from 'framer-motion'
import {useAppSelector} from '../../shared/lib/redux/hooks/typedHooks.ts'
import {modalAnimation} from '../Modal/modalAnimation.ts'
import styles from './searchBackground.module.scss'

export const SearchBackground = () => {
	const search = useAppSelector(state => state.ui.search)

	return (
		<AnimatePresence>
			{search ? <motion.div {...modalAnimation} className={styles.searchBackground}></motion.div> : null}
		</AnimatePresence>
	)
}