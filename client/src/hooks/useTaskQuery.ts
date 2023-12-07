import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query'
import {useAppSelector} from '../libs/redux/hooks/typedHooks.ts'
import {taskService} from '../services/taskService.ts'


export const useTaskQuery = (description: string) => {
	const taskId = useAppSelector(state => state.ui.modal.task) as number
	const queryClient = useQueryClient()

	const {data, isLoading} = useQuery({
		queryKey: ['task'],
		queryFn: () => taskService.getTaskById(taskId),
	})

	const {mutate} = useMutation({
		mutationFn: () => taskService.updateTaskDescription(taskId, description),
		onSuccess: () => {
			void queryClient.refetchQueries({queryKey: ['task']})
		},
	})

	const resetTaskQueries = () => {
		void queryClient.removeQueries({queryKey: ['task']})
		void queryClient.refetchQueries({queryKey: ['tasks']})
	}

	return {data, isLoading, mutate, resetTaskQueries}
}