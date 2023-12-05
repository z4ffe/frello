import {closestCenter, DndContext, DragEndEvent, DragOverlay, DragStartEvent, KeyboardSensor, PointerSensor, TouchSensor, useSensor, useSensors} from '@dnd-kit/core'
import {restrictToWindowEdges} from '@dnd-kit/modifiers'
import {useQuery} from '@tanstack/react-query'
import {useState} from 'react'
import {useParams} from 'react-router-dom'
import {TaskContainer} from '../../components/TaskContainer/TaskContainer.tsx'
import {taskService} from '../../services/taskService.ts'
import {ITask} from '../../types/interfaces/task.interface.ts'
import {LoaderDots} from '../../ui/LoaderDots/LoaderDots.tsx'
import {TaskItem} from '../../ui/TaskItem/TaskItem.tsx'
import styles from './Tasks.module.scss'

export const Tasks = () => {
	const [active, setActive] = useState<ITask | null>(null)
	const {id} = useParams() as {id: string}
	const {data} = useQuery({
		queryKey: ['tasks'],
		queryFn: () => taskService.getAllTasks(+id),
	})
	const sensors = useSensors(useSensor(PointerSensor), useSensor(TouchSensor), useSensor(KeyboardSensor))

	const handleDragMove = (event: DragEndEvent) => {
		// console.log('Drag MOVE', event.over?.id)
	}
	const handleDragEnd = (event: DragEndEvent) => {
		// console.log('Drag END', event)
	}

	const handleDragOver = (event: DragEndEvent) => {
		// console.log('Drag OVER', event)
	}

	const handleDragStart = (event: DragStartEvent) => {
		const activeTask = event.active.data.current as ITask
		setActive(activeTask)
		// console.log('Drag START', event)
	}

	return (
		<div className={styles.tasks}>
			<DndContext collisionDetection={closestCenter} onDragMove={handleDragMove} onDragEnd={handleDragEnd} onDragStart={handleDragStart} onDragOver={handleDragOver} sensors={sensors}>
				{data ? <TaskContainer data={data} /> : <LoaderDots />}
				<DragOverlay modifiers={[restrictToWindowEdges]}>
					{active && <div className={styles.dragOverlay}><TaskItem task={active} /></div>}
				</DragOverlay>
			</DndContext>
		</div>
	)
}