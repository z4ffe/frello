import {FC} from 'react'
import {IProject} from '../../types/interfaces/project.interface.ts'
import styles from './searchProjectTile.module.scss'

interface Props {
	project: IProject
}

export const SearchProjectTile: FC<Props> = ({project}) => {
	return (
		<div className={styles.searchProjectTile}>
			<h1>{project.name}</h1>
			<p>{project.description}</p>
			<span>{project.deadline}</span>
		</div>
	)
}