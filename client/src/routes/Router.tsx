import {useEffect, useState} from 'react'
import {Navigate, Route, Routes} from 'react-router-dom'
import {ErrorPage} from '../pages/ErrorPage/NotFound.tsx'
import {Projects} from '../pages/Projects/Projects.tsx'
import {Tasks} from '../pages/Tasks/Tasks.tsx'
import {healthService} from '../services/healthService.ts'

export const Router = () => {
	const [api, setApi] = useState<boolean>(true)

	const handleApiHealth = async () => {
		try {
			await healthService.healthCheck()
			setApi(true)
		} catch (error) {
			setApi(false)
		}
	}

	useEffect(() => {
		void handleApiHealth()
	}, [])

	if (!api) {
		return <ErrorPage />
	}

	return (
		<Routes>
			<Route path='/' element={<Navigate to='projects' />} />
			<Route path='/projects' element={<Projects />} />
			<Route path='/tasks/:id' element={<Tasks />} />
			<Route path='/error' element={<ErrorPage />} />
			<Route path='*' element={<ErrorPage />} />
		</Routes>
	)
}