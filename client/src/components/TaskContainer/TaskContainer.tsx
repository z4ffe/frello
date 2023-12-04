import {useDroppable} from '@dnd-kit/core'
import {FC} from 'react'
import {ITask} from '../../types/interfaces/task.interface.ts'
import {ETaskStatus} from '../../types/taskType.ts'
import {TaskDropZone} from '../../ui/TaskDropZone/TaskDropZone.tsx'
import {tasksFilter} from '../../utils/tasksFilter.ts'
import styles from './taskContainer.module.scss'

interface Props {
	data: ITask[]
}

export const TaskContainer: FC<Props> = ({data}) => {
	const {setNodeRef: queueZone} = useDroppable({id: 'queue'})
	const {setNodeRef: devZone} = useDroppable({id: 'dev'})
	const {setNodeRef: doneZone} = useDroppable({id: 'done'})

	const dropZones = [
		{
			title: 'Queue',
			nodeRef: queueZone,
			data: tasksFilter(data, ETaskStatus.Queue),
		},
		{
			title: 'In Progress',
			nodeRef: devZone,
			data: tasksFilter(data, ETaskStatus.Development),
		},
		{
			title: 'Done',
			nodeRef: doneZone,
			data: tasksFilter(data, ETaskStatus.Done),
		},
	]

	return (
		<div className={styles.taskContainer}>
			{dropZones.map(zone => <TaskDropZone key={zone.title} title={zone.title} nodeRef={zone.nodeRef} data={zone.data} />)}
		</div>
	)
}