import {FC} from 'react'
import {useNavigate} from 'react-router-dom'
import menuIcon from '../../assets/images/svg/dropdown_menu.svg'
import {IProject} from '../../types/interfaces/project.interface.ts'
import {ProgressBar} from '../ProgressBar/ProgressBar.tsx'
import styles from './projectTile.module.scss'

interface Props {
	project: IProject
}

export const ProjectTile: FC<Props> = ({project}) => {
	const createdDate = new Date(project.createdAt).toDateString()
	const randomProgress = Math.round(Math.random() * 100)
	const rndDesc = `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam`
	const navigate = useNavigate()

	return (
		<div className={styles.projectTile} onClick={() => navigate(`/tasks/${project.id}`)}>
			<h2 className={styles.projectTile__title}>{project.name}</h2>
			<span className={styles.projectTile__date}>{createdDate}</span>
			<p className={styles.projectTile__desc}>{rndDesc}</p>
			<div className={styles.projectTile__progress}>
				<div className={styles.header}>
					<h3 className={styles.header__title}>Project progress</h3>
					<span className={styles.header__percent}>{randomProgress}%</span>
				</div>
				<ProgressBar percent={randomProgress} />
			</div>
			<div className={styles.authorSection}>
				<span>Author:&nbsp;</span>
				<span>{project.authorId.username}</span>
			</div>
			<div className={styles.dropdownWrapper}>
				<img src={menuIcon} alt='Dropdown Menu' />
			</div>
		</div>
	)
}