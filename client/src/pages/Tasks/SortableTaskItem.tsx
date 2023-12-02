import {useSortable} from '@dnd-kit/sortable'
import {CSS} from '@dnd-kit/utilities'
import {FC, PropsWithChildren} from 'react'
import {ITask} from '../../types/interfaces/task.interface.ts'

interface Props {
	task: ITask
}

export const SortableTaskItem: FC<PropsWithChildren<Props>> = ({children, task}) => {
	const {setNodeRef, transform, transition, isDragging, attributes, listeners} = useSortable({
		id: task.id,
	})

	const style = {
		transform: CSS.Transform.toString(transform),
		transition,
		opacity: isDragging ? 0 : 1,
	}

	return (
		<div ref={setNodeRef} {...attributes} {...listeners} style={style}>
			{children}
		</div>
	)
}