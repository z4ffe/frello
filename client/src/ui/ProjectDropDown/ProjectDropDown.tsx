import {AnimatePresence, motion} from 'framer-motion'
import {FC, useEffect, useRef, useState} from 'react'
import editIcon from '../../assets/images/svg/edit.svg'
import deleteIcon from '../../assets/images/svg/remove.svg'
import {useAppDispatch} from '../../libs/redux/hooks/typedHooks.ts'
import {uiActions} from '../../store/ui/uiSlice.ts'
import {IProject} from '../../types/interfaces/project.interface.ts'
import {Divider} from '../Divider/Divider.tsx'
import styles from './projectDropDown.module.scss'

interface Props {
	project: IProject
}

export const ProjectDropDown: FC<Props> = ({project}) => {
	const dispatch = useAppDispatch()
	const [dropDown, setDropDown] = useState(false)
	const dropDownRef = useRef<HTMLDivElement>(null)

	const handleDropDown = () => {
		setDropDown(prevState => !prevState)
	}

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (dropDownRef.current && !dropDownRef.current.contains(event.target as Node)) {
				setDropDown(false)
			}
		}
		document.addEventListener('click', handleClickOutside)
		return () => {
			document.removeEventListener('click', handleClickOutside)
		}
	}, [dropDownRef, setDropDown])

	return (
		<div className={styles.dropdownWrapper} ref={dropDownRef} onClick={handleDropDown}>
			<button className={styles.dropdown__btn} />
			<AnimatePresence>
				{dropDown &&
					<motion.div
						initial={{opacity: 0, scale: '0%'}}
						animate={{opacity: 1, scale: '100%'}}
						exit={{opacity: 0, scale: '0'}}
						className={styles.dropdown__project}>
						<div className={styles.btn__wrapper} onClick={() => dispatch(uiActions.editProject(project))}>
							<img src={editIcon} alt='edit' />
							<button className={styles.btn}>Edit</button>
						</div>
						<Divider />
						<div className={styles.btn__wrapper}>
							<img src={deleteIcon} alt='remove project' />
							<button className={`${styles.btn} ${styles.delete__btn}`}>Delete</button>
						</div>
					</motion.div>
				}
			</AnimatePresence>
		</div>
	)
}