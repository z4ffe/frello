import {FC} from 'react'
import {IProject} from '../../types/interfaces/project.interface.ts'
import styles from './projectTile.module.scss'

interface Props {
	project: IProject
}

export const ProjectTile: FC<Props> = ({project}) => {
	const createdDate = new Date(project.createdAt).toDateString()
	const randomProgress = Math.round(Math.random() * 100)

	return (
		<div className={styles.projectTile}>
			<h2 className={styles.projectTile__title}>{project.name}</h2>
			<span className={styles.projectTile__date}>{createdDate}</span>
			<p className={styles.projectTile__desc}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam</p>
			<div className={styles.projectTile__progress}>
				<div className={styles.header}>
					<h3 className={styles.header__title}>Project progress</h3>
					<span className={styles.header__percent}>{randomProgress}%</span>
				</div>
				<div className={styles.progressBar} style={{width: `${randomProgress}%`}} />
			</div>
		</div>
	)
}