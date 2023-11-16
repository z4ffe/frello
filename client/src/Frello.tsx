import {QueryClient, QueryClientProvider} from '@tanstack/react-query'
import {Provider} from 'react-redux'
import {BrowserRouter} from 'react-router-dom'
import {MainLayout} from './layout/MainLayout.tsx'
import {Router} from './routes/Router.tsx'
import {store} from './store/store.ts'

const queryClient = new QueryClient()

export const Frello = () => {
	return (
		<BrowserRouter>
			<Provider store={store}>
				<QueryClientProvider client={queryClient}>
					<MainLayout>
						<Router />
					</MainLayout>
				</QueryClientProvider>
			</Provider>
		</BrowserRouter>
	)
}