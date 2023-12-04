import {useDroppable} from '@dnd-kit/core'
import {SortableContext, verticalListSortingStrategy} from '@dnd-kit/sortable'
import {FC} from 'react'
import {ITask} from '../../types/interfaces/task.interface.ts'
import {ETaskStatus} from '../../types/taskType.ts'
import {SortableTaskItem} from '../../ui/SortableTaskItem/SortableTaskItem.tsx'
import {TaskItem} from '../../ui/TaskItem/TaskItem.tsx'
import styles from './taskContainer.module.scss'

interface Props {
	data: ITask[]
}

export const TaskContainer: FC<Props> = ({data}) => {
	const {setNodeRef: queueZone} = useDroppable({id: 'queue'})
	const {setNodeRef: devZone} = useDroppable({id: 'dev'})
	const {setNodeRef: doneZone} = useDroppable({id: 'done'})

	return (
		<div className={styles.taskContainer}>
			<SortableContext
				id='queue'
				items={data.filter(el => el.status === ETaskStatus.Queue)}
				strategy={verticalListSortingStrategy}
			>
				<div ref={queueZone} style={{display: 'flex', flexDirection: 'column', width: '300px', height: '500px', backgroundColor: 'beige', gap: '5px'}}>
					<h5>{data.filter(el => el.status === ETaskStatus.Queue).length}</h5>
					{data.map(task => {
						if (task.status === ETaskStatus.Queue) {
							return <SortableTaskItem key={task.id} task={task}><TaskItem task={task} /></SortableTaskItem>
						}
					})}
				</div>
			</SortableContext>
			<SortableContext
				id='dev'
				items={data.filter(el => el.status === ETaskStatus.Development)}
				strategy={verticalListSortingStrategy}
			>
				<div ref={devZone} style={{display: 'flex', flexDirection: 'column', width: '300px', height: '500px', backgroundColor: 'bisque', gap: '5px'}}>
					<h5>{data.filter(el => el.status === ETaskStatus.Development).length}</h5>
					{data.map(task => {
						if (task.status === ETaskStatus.Development) {
							return <SortableTaskItem key={task.id} task={task}><TaskItem task={task} /></SortableTaskItem>
						}
					})}
				</div>
			</SortableContext>
			<SortableContext
				id='done'
				items={data.filter(el => el.status === ETaskStatus.Done)}
				strategy={verticalListSortingStrategy}
			>
				<div ref={doneZone} style={{display: 'flex', flexDirection: 'column', width: '300px', height: '500px', backgroundColor: 'bisque', gap: '5px'}}>
					<h5>{data.filter(el => el.status === ETaskStatus.Done).length}</h5>
					{data.map(task => {
						if (task.status === ETaskStatus.Done) {
							return <SortableTaskItem key={task.id} task={task}><TaskItem task={task} /></SortableTaskItem>
						}
					})}
				</div>
			</SortableContext>
		</div>
	)
}