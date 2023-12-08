import {useDroppable} from '@dnd-kit/core'
import {FC} from 'react'
import {ITask} from '../../types/interfaces/task.interface.ts'
import {ETaskStatus} from '../../types/taskType.ts'
import {TaskListZone} from '../../ui/TaskListZone/TaskListZone.tsx'
import {tasksFilter} from '../../utils/tasksFilter.ts'
import styles from './taskContainer.module.scss'

interface Props {
	data: ITask[]
}

export const TaskContainer: FC<Props> = ({data}) => {
	const {setNodeRef: queueZone, isOver: queueIsOver} = useDroppable({id: ETaskStatus.Queue})
	const {setNodeRef: devZone, isOver: devIsOver} = useDroppable({id: ETaskStatus.Development})
	const {setNodeRef: doneZone, isOver: doneIsOver} = useDroppable({id: ETaskStatus.Done})

	const dropZones = [
		{
			title: 'To-Do',
			nodeRef: queueZone,
			data: tasksFilter(data, ETaskStatus.Queue),
			isOver: queueIsOver,
			status: ETaskStatus.Queue,
		},
		{
			title: 'In Progress',
			nodeRef: devZone,
			data: tasksFilter(data, ETaskStatus.Development),
			isOver: devIsOver,
			status: ETaskStatus.Development,
		},
		{
			title: 'Done',
			nodeRef: doneZone,
			data: tasksFilter(data, ETaskStatus.Done),
			isOver: doneIsOver,
			status: ETaskStatus.Done,
		},
	]

	return (
		<div className={styles.taskContainer}>
			{dropZones.map(zone => <TaskListZone
				key={zone.title}
				title={zone.title}
				nodeRef={zone.nodeRef}
				data={zone.data}
				isOver={zone.isOver}
				status={zone.status} />)}
		</div>
	)
}