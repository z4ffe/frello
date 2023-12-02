import {useDroppable} from '@dnd-kit/core'
import {FC} from 'react'
import {ITask} from '../../types/interfaces/task.interface.ts'
import {ETaskStatus} from '../../types/taskType.ts'
import {Task} from './Task.tsx'

interface Props {
	data: ITask[]
}

export const Droppable: FC<Props> = ({data}) => {
	const {setNodeRef: queueZone} = useDroppable({id: 'queue'})
	const {setNodeRef: devZone} = useDroppable({id: 'dev'})
	const {setNodeRef: doneZone} = useDroppable({id: 'done'})

	return (
		<div style={{display: 'flex', gap: '10px'}}>
			<div ref={queueZone} style={{display: 'flex', flexDirection: 'column', width: '300px', height: '500px', backgroundColor: 'beige', gap: '5px'}}>
				{data.map(task => {
					if (task.status === ETaskStatus.Queue) {
						return <Task key={task.id} task={task} />
					}
				})}
			</div>
			<div ref={devZone} style={{display: 'flex', flexDirection: 'column', width: '300px', height: '500px', backgroundColor: 'bisque', gap: '5px'}}>
				{data.map(task => {
					if (task.status === ETaskStatus.Development) {
						return <Task key={task.id} task={task} />
					}
				})}
			</div>
			<div ref={doneZone} style={{display: 'flex', flexDirection: 'column', width: '300px', height: '500px', backgroundColor: 'bisque', gap: '5px'}}>
				{data.map(task => {
					if (task.status === ETaskStatus.Done) {
						return <Task key={task.id} task={task} />
					}
				})}
			</div>
		</div>
	)
}