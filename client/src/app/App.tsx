import {Routing} from '../pages/Routing.tsx'
import {MainLayout} from './layouts/MainLayout.tsx'
import {withProviders} from './providers'

const App = () => {
	return (
		<MainLayout>
			<Routing />
		</MainLayout>
	)
}

export default withProviders(App)