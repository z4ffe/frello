import {useDraggable} from '@dnd-kit/core'
import {CSS} from '@dnd-kit/utilities'
import {FC} from 'react'
import {ITask} from '../../types/interfaces/task.interface.ts'

interface Props {
	task: ITask
}

export const TaskItem: FC<Props> = ({task}) => {
	const {attributes, listeners, setNodeRef, transform} = useDraggable({
		id: task.id,
		data: task,
	})

	const style = {
		border: '1px solid black',
		transform: CSS.Translate.toString(transform),
	}

	return (
		<div ref={setNodeRef} {...listeners} {...attributes} style={style}>
			{task.id} - {task.title}
		</div>
	)
}