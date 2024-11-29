import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query'
import {useAppSelector} from '../libs/redux/hooks/typedHooks.ts'
import {taskService} from '../services/taskService.ts'
import {ETaskPriority, ETaskStatus} from '../types/taskType.ts'


export const useTaskQuery = (title: string, description: string) => {
	//const isAuth = useAppSelector(state => state.user.isAuth)
	const taskId = useAppSelector(state => state.ui.modal.task) as number
	const authorId = useAppSelector(state => state.user.id)
	const queryClient = useQueryClient()
	const projectId = useAppSelector(state => state.projects.id)

	const {data, isLoading} = useQuery({
		queryKey: ['task'],
		queryFn: () => taskService.getTaskById(taskId),
		enabled: !!taskId,
	})

	const dt = {
		title,
		description,
		taskNumber: 1,
		deadline: '2023-10-04 12:14:34.207',
		subtaskAllowed: true,
		priority: ETaskPriority.High,
		status: ETaskStatus.Queue,
		authorId,
		projectId,
	}

	const {mutate} = useMutation({
		mutationFn: () => taskService.createTask(dt),
		onSuccess: () => {
			void queryClient.refetchQueries({queryKey: ['task']})
			void queryClient.refetchQueries({queryKey: ['tasks']})
		},
	})

	const resetTaskQueries = () => {
		void queryClient.removeQueries({queryKey: ['task']})
		void queryClient.refetchQueries({queryKey: ['tasks']})
	}

	return {data, isLoading, mutate, resetTaskQueries}
}