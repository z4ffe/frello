import {closestCenter, DndContext, DragEndEvent, DragOverlay, DragStartEvent, KeyboardSensor, PointerSensor, TouchSensor, useSensor, useSensors} from '@dnd-kit/core'
import {useQuery} from '@tanstack/react-query'
import {useState} from 'react'
import {useParams} from 'react-router-dom'
import {taskService} from '../../services/taskService.ts'
import {ITask} from '../../types/interfaces/task.interface.ts'
import {Spinner} from '../../ui/Spinner/Spinner.tsx'
import {Droppable} from './Droppable.tsx'
import {Task} from './Task.tsx'

export const Tasks = () => {
	const [active, setActive] = useState<ITask | null>(null)
	const {id} = useParams()
	const {data} = useQuery({
		queryKey: ['tasks'],
		queryFn: () => taskService.getAllTasks(+id!),
	})
	const sensors = useSensors(useSensor(PointerSensor), useSensor(TouchSensor), useSensor(KeyboardSensor))

	const onDragEnd = (event: DragEndEvent) => {
		console.log('Drag END', event)
	}

	const handleDragStart = (event: DragStartEvent) => {
		const activeTask = event.active.data.current as ITask
		setActive(activeTask)
		console.log('Drag START', event)
	}

	return (
		<div>
			<DndContext collisionDetection={closestCenter} onDragEnd={onDragEnd} onDragStart={handleDragStart} sensors={sensors}>
				{data ? <Droppable data={data} /> : <Spinner />}
				<DragOverlay>
					{active && (<Task task={active} />)}
				</DragOverlay>
			</DndContext>
		</div>
	)
}