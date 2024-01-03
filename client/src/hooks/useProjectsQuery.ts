import {useQuery, useQueryClient} from '@tanstack/react-query'
import {projectService} from '../services/projectService'

export const useProjectsQuery = (userId: number | null, enabled: boolean) => {
	const queryClient = useQueryClient()

	const {isPending, data} = useQuery({
			queryKey: ['projects'],
			queryFn: () => projectService.getAllProjects(userId!),
			enabled,
		},
	)

	const removeProjectsQueries = () => queryClient.removeQueries({queryKey: ['projects']})

	return {
		projectsData: data,
		projectsIsPending: isPending,
		removeProjectsQueries,
	}
}