import {useEffect, useState} from 'react'
import {Navigate, Route, Routes} from 'react-router-dom'
import {useAppSelector} from '../shared/lib/redux/hooks/typedHooks.ts'
import {healthService} from '../shared/services/healthService.ts'
import {ErrorPage} from './ErrorPage'
import {Projects} from './Projects'
import {Tasks} from './Tasks'


export const Routing = () => {
	const [api, setApi] = useState<boolean>(true)
	const isAuth = useAppSelector(state => state.user.isAuth)

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

	if (!isAuth && api) {
		return <></>
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