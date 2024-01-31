import {useQuery, useQueryClient} from '@tanstack/react-query'
import {userService} from '../services/userService.ts'

export const useUsersQuery = (projectId: number | null) => {
	const queryClient = useQueryClient()

	const {data, isLoading} = useQuery({
		queryKey: ['users'],
		queryFn: () => {
			if (projectId) {
				return userService.fetchAllUsers(projectId)
			}
		},
	})

	const removeUsers = () => queryClient.removeQueries({queryKey: ['users']})

	return {
		usersData: data,
		usersLoading: isLoading,
		removeUsers,
	}
}