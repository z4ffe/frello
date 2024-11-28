import {FC} from 'react'
import {ITask} from '../../types/interfaces/task.interface.ts'
import styles from './searchTaskTile.module.scss'

interface Props {
	task: ITask
}

export const SearchTaskTile: FC<Props> = ({task}) => {
	return (
		<div className={styles.searchTaskTile}>
			<div className={styles.descWrapper}>
				<h1>{task.title}</h1>
				<p>{task.description}</p>
			</div>
		</div>
	)
}