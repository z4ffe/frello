import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query'
import {useEffect, useState} from 'react'
import {useAppSelector} from '../libs/redux/hooks/typedHooks.ts'
import {taskService} from '../services/taskService.ts'
import {ITask} from '../types/interfaces/task.interface.ts'
import {ETaskStatus} from '../types/taskType.ts'

export const useTasksQuery = (id: number) => {
	const isAuth = useAppSelector(state => state.user.isAuth)
	const [tasks, setTasks] = useState<ITask[] | undefined>([])
	const queryClient = useQueryClient()

	const {data, isError, isLoading} = useQuery({
		queryKey: ['tasks', id],
		queryFn: () => taskService.getAllTasks(id),
		refetchOnWindowFocus: 'always',
		enabled: isAuth,
	})

	const {mutate} = useMutation({
		mutationFn: ({id, status}: {id: number, status: ETaskStatus}) => taskService.updateTaskStatus(id, status),
		onSuccess: () => {
			void queryClient.invalidateQueries({queryKey: ['tasks']})
		},
	})

	const updateTasks = (tasksArr: ITask[]) => {
		setTasks(tasksArr)
	}

	useEffect(() => {
		setTasks(data)
	}, [data])


	return {tasks, isError, isLoading, mutate, updateTasks, tasksData: data}
}