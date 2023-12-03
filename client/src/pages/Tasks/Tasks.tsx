import {closestCorners, DndContext, DragEndEvent, DragOverlay, DragStartEvent, KeyboardSensor, PointerSensor, TouchSensor, useSensor, useSensors} from '@dnd-kit/core'
import {useQuery} from '@tanstack/react-query'
import {useState} from 'react'
import {useParams} from 'react-router-dom'
import {TaskContainer} from '../../components/TaskContainer/TaskContainer.tsx'
import {TaskItem} from '../../components/TaskContainer/TaskItem.tsx'
import {taskService} from '../../services/taskService.ts'
import {ITask} from '../../types/interfaces/task.interface.ts'
import {Spinner} from '../../ui/Spinner/Spinner.tsx'

export const Tasks = () => {
	const [active, setActive] = useState<ITask | null>(null)
	const {id} = useParams() as {id: string}
	const {data} = useQuery({
		queryKey: ['tasks'],
		queryFn: () => taskService.getAllTasks(+id),
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
			<DndContext collisionDetection={closestCorners} onDragEnd={onDragEnd} onDragStart={handleDragStart} sensors={sensors}>
				{data ? <TaskContainer data={data} /> : <Spinner />}
				<DragOverlay>
					{active && (<TaskItem task={active} />)}
				</DragOverlay>
			</DndContext>
		</div>
	)
}