import clsx from 'clsx'
import {AnimatePresence, motion} from 'framer-motion'
import {FC, useEffect, useRef, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import {projectsActions} from '../../app/store/projects/projectsSlice.ts'
import {uiActions} from '../../app/store/ui/uiSlice.ts'
import {useAppDispatch} from '../../shared/lib/redux/hooks/typedHooks.ts'
import {IProject} from '../../shared/types/interfaces/project.interface.ts'
import {Divider} from '../../shared/ui/Divider/Divider.tsx'
import {Icon} from '../../shared/ui/Icon/Icon.tsx'
import styles from './projectDropDown.module.scss'

interface Props {
	project: IProject
}

export const ProjectDropDown: FC<Props> = ({project}) => {
	const dispatch = useAppDispatch()
	const [dropDown, setDropDown] = useState(false)
	const dropDownRef = useRef<HTMLDivElement>(null)
	const navigate = useNavigate()

	const handleProjectDispatch = () => {
		dispatch(projectsActions.setProject(project))
		navigate(`/tasks/${project.id}`)
	}

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
			<button className={styles.dropdown__btn}>
				<Icon iconType='dropdown' />
			</button>
			<AnimatePresence>
				{dropDown &&
					<motion.div
						initial={{opacity: 0, scale: '0%'}}
						animate={{opacity: 1, scale: '100%'}}
						exit={{opacity: 0, scale: '0'}}
						className={styles.dropdown__project}>
						<div className={styles.btn__wrapper} onClick={handleProjectDispatch}>
							<Icon iconType='choose' />
							<button className={styles.btn}>Choose</button>
						</div>
						<Divider />
						<div className={styles.btn__wrapper} onClick={() => dispatch(uiActions.editProject(project))}>
							<Icon iconType='edit' />
							<button className={styles.btn}>Edit</button>
						</div>
						<Divider />
						<div className={styles.btn__wrapper}>
							<Icon iconType='remove' />
							<button className={clsx(styles.btn, styles.delete__btn)}>Delete</button>
						</div>
					</motion.div>
				}
			</AnimatePresence>
		</div>
	)
}