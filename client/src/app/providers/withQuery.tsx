import {QueryClient, QueryClientProvider} from '@tanstack/react-query'
import {ReactNode} from 'react'

const queryClient = new QueryClient()

export const withQuery = (component: () => ReactNode) => () => (
	<QueryClientProvider client={queryClient}>
		{component()}
	</QueryClientProvider>
)