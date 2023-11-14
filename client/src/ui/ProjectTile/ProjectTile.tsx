import {FC} from 'react'
import {IProject} from '../../types/interfaces/project.interface.ts'
import styles from './projectTile.module.scss'

interface Props {
	project: IProject
}

export const ProjectTile: FC<Props> = ({project}) => {
	return (
		<div className={styles.projectTile}>
			<h2 className={styles.projectTile__title}>{project.name}</h2>
		</div>
	)
}