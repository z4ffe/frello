import {closestCenter, DndContext, DragEndEvent, DragOverlay, DragStartEvent, KeyboardSensor, MouseSensor, TouchSensor, useSensor, useSensors} from '@dnd-kit/core'
import {restrictToWindowEdges} from '@dnd-kit/modifiers'
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query'
import {useEffect, useState} from 'react'
import {useNavigate, useParams} from 'react-router-dom'
import {TaskContainer} from '../../components/TaskContainer/TaskContainer.tsx'
import {useAppSelector} from '../../lib/redux/hooks/typedHooks.ts'
import {taskService} from '../../services/taskService.ts'
import {ITask} from '../../types/interfaces/task.interface.ts'
import {ETaskStatus} from '../../types/taskType.ts'
import {LoaderDots} from '../../ui/LoaderDots/LoaderDots.tsx'
import {TaskItem} from '../../ui/TaskItem/TaskItem.tsx'
import styles from './Tasks.module.scss'

export const Tasks = () => {
	const projectId = useAppSelector(state => state.projects.id)
	const navigate = useNavigate()
	const [tasks, setTasks] = useState<ITask[]>([])
	const [active, setActive] = useState<ITask | null>(null)
	const {id} = useParams() as {id: string}
	const {data} = useQuery({
		queryKey: ['tasks', id],
		queryFn: () => taskService.getAllTasks(+id),
	})
	const sensors = useSensors(useSensor(MouseSensor, {activationConstraint: {distance: 10}}), useSensor(TouchSensor), useSensor(KeyboardSensor))
	const queryClient = useQueryClient()

	useEffect(() => {
		if (projectId !== Number(id)) {
			navigate('/')
		}
	}, [])

	useEffect(() => {
		if (data) setTasks(data)
	}, [data])

	const mutation = useMutation({
		mutationFn: ({id, status}: {id: number, status: ETaskStatus}) => taskService.updateTask(id, status),
		onSuccess: () => {
			void queryClient.invalidateQueries({queryKey: ['tasks']})
		},
	})

	const handleDragEnd = (event: DragEndEvent) => {
		if (!event.active.id || !(event.active.data.current?.status === event.over?.id)) {
			const taskIndex = tasks.findIndex(task => task.id === event.active.id)
			if (taskIndex === -1) return
			const mutatedTask = tasks[taskIndex]
			const modifiedTask = {...mutatedTask, status: event.over?.id} as ITask
			const updatedTasks = tasks.map(task => task.id === event.active.id ? modifiedTask : task)
			setTasks(updatedTasks)
			mutation.mutate({id: active!.id, status: event.over?.id as ETaskStatus})
		}
		setActive(null)
	}

	const handleDragStart = (event: DragStartEvent) => {
		const activeTask = event.active.data.current as ITask
		setActive(activeTask)
	}

	return (
		<div className={styles.tasks}>
			<DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd} onDragStart={handleDragStart} sensors={sensors}>
				{data ? <TaskContainer data={tasks} /> : <LoaderDots />}
				<DragOverlay modifiers={[restrictToWindowEdges]}>
					{active && <div className={styles.dragOverlay}><TaskItem task={active} /></div>}
				</DragOverlay>
			</DndContext>
		</div>
	)
}