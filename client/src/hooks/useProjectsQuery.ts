import {useQuery, useQueryClient} from '@tanstack/react-query'
import {useAppSelector} from '../libs/redux/hooks/typedHooks.ts'
import {projectService} from '../services/projectService'

export const useProjectsQuery = (userId: number | null, enabled: boolean) => {
	const isAuth = useAppSelector(state => state.user.isAuth)
	const queryClient = useQueryClient()

	const {isPending, data} = useQuery({
			queryKey: ['projects'],
			queryFn: () => projectService.getAllProjects(userId!),
			enabled: isAuth && enabled,
		},
	)

	const removeProjectsQueries = () => queryClient.removeQueries({queryKey: ['projects']})

	return {
		projectsData: data,
		projectsIsPending: isPending,
		removeProjectsQueries,
	}
}