import {FC} from 'react'
import {ITask} from '../../types/interfaces/task.interface.ts'
import {TaskItem} from '../TaskItem/TaskItem.tsx'
import styles from './taskDropZone.module.scss'

interface Props {
	title: string
	nodeRef: any
	data: ITask[]
}

export const TaskDropZone: FC<Props> = ({title, nodeRef, data}) => {
	return (
		<div ref={nodeRef} className={styles.taskDropZone}>
			<div className={styles.taskDropZone__title}>
				<p>{title}</p>
				<div className={styles.taskCount}>
					<p>{data.length}</p>
				</div>
			</div>
			<div className={styles.taskDropZone__tasks}>
				{data.map(task => <TaskItem key={task.id} task={task} />)}
			</div>
		</div>
	)
}