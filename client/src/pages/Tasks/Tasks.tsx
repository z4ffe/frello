import {closestCenter, DndContext, DragEndEvent, DragOverlay, DragStartEvent, KeyboardSensor, MouseSensor, TouchSensor, useSensor, useSensors} from '@dnd-kit/core'
import {restrictToWindowEdges} from '@dnd-kit/modifiers'
import {useEffect, useState} from 'react'
import {useNavigate, useParams} from 'react-router-dom'
import {TaskContainer} from '../../components/TaskContainer/TaskContainer.tsx'
import {useTasksQuery} from '../../hooks/useTasksQuery.ts'
import {useAppSelector} from '../../libs/redux/hooks/typedHooks.ts'
import {ITask} from '../../types/interfaces/task.interface.ts'
import {ETaskStatus} from '../../types/taskType.ts'
import {LoaderDots} from '../../ui/LoaderDots/LoaderDots.tsx'
import {TaskItem} from '../../ui/TaskItem/TaskItem.tsx'
import {TasksPanel} from '../../ui/TasksPanel/TasksPanel.tsx'
import styles from './Tasks.module.scss'

export const Tasks = () => {
	const {id} = useParams() as {id: string}
	const {tasks, mutate, updateTasks} = useTasksQuery(Number(id))
	const [active, setActive] = useState<ITask | null>(null)
	const projectId = useAppSelector(state => state.projects.id)
	const sensors = useSensors(useSensor(MouseSensor, {activationConstraint: {distance: 10}}), useSensor(TouchSensor), useSensor(KeyboardSensor))
	const navigate = useNavigate()

	useEffect(() => {
		if (projectId !== Number(id)) {
			navigate('/projects')
		}
	}, [])

	const handleDragEnd = (event: DragEndEvent) => {
		if (!event.active.id || !(event.active.data.current?.status === event.over?.id)) {
			if (!tasks) return
			const taskIndex = tasks.findIndex(task => task.id === event.active.id)
			if (taskIndex === -1) return
			const mutatedTask = tasks[taskIndex]
			const modifiedTask = {...mutatedTask, status: event.over?.id} as ITask
			const updatedTasks = tasks.map(task => task.id === event.active.id ? modifiedTask : task)
			updateTasks(updatedTasks)
			mutate({id: active!.id, status: event.over?.id as ETaskStatus})
		}
		setActive(null)
	}

	const handleDragStart = (event: DragStartEvent) => {
		const activeTask = event.active.data.current as ITask
		setActive(activeTask)
	}

	return (
		<div className={styles.tasks}>
			<TasksPanel />
			<DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd} onDragStart={handleDragStart} sensors={sensors}>
				{tasks ? <TaskContainer data={tasks} /> : <LoaderDots />}
				<DragOverlay modifiers={[restrictToWindowEdges]}>
					{active && <div className={styles.dragOverlay}><TaskItem task={active} /></div>}
				</DragOverlay>
			</DndContext>
		</div>
	)
}