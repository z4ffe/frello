import {BrowserRouter, Navigate, Route, Routes} from 'react-router-dom'
import {Header} from './components/Header/Header.tsx'
import {MainLayout} from './layout/MainLayout.tsx'
import {Projects} from './pages/Projects/Projects.tsx'
import {Tasks} from './pages/Tasks/Tasks.tsx'

export const Frello = () => {
	return (
		<BrowserRouter>
			<MainLayout>
				<Header />
				<Routes>
					<Route path='/' element={<Navigate to='projects' />} />
					<Route path='/projects' element={<Projects />} />
					<Route path='/tasks/:id' element={<Tasks />} />
					<Route path='*' element={<p>404</p>} />
				</Routes>
			</MainLayout>
		</BrowserRouter>
	)
}