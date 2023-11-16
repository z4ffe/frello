import {Navigate, Route, Routes} from 'react-router-dom'
import {Projects} from '../pages/Projects/Projects.tsx'
import {Tasks} from '../pages/Tasks/Tasks.tsx'

export const Router = () => {
	return (
		<Routes>
			<Route path='/' element={<Navigate to='projects' />} />
			<Route path='/projects' element={<Projects />} />
			<Route path='/tasks/:id' element={<Tasks />} />
			<Route path='*' element={<p>404</p>} />
		</Routes>
	)
}