import {useEffect} from 'react'
import {Login} from '../../components/Login/Login.tsx'
import {useAppDispatch, useAppSelector} from '../../libs/redux/hooks/typedHooks.ts'
import {ErrorPage} from '../../pages/ErrorPage/NotFound.tsx'
import {uiActions} from '../../store/ui/uiSlice.ts'
import {ProjectCard} from '../ProjectCard/ProjectCard.tsx'
import {TaskCard} from '../TaskCard/TaskCard.tsx'
import {Assign} from '../UserAssign/UserAssign.tsx'

export const ModalContent = () => {
	const {login, register, task, taskEdit, taskAdd, assign, projectAdd, projectEdit} = useAppSelector(state => state.ui.modal)
	const dispatch = useAppDispatch()

	useEffect(() => {
		if (!login && !register && !taskAdd && !assign && !projectAdd && !projectEdit && !(task && taskEdit)) {
			dispatch(uiActions.resetState())
			document.body.style.overflow = 'unset'
		}
		document.body.style.overflow = 'hidden'
		return () => {
			document.body.style.overflow = 'unset'
		}
	}, [])


	switch (true) {
		case (login):
			return <Login />
		case (register):
			return <ErrorPage />
		case (taskAdd):
			return <TaskCard taskEdit={false} />
		case (task && taskEdit):
			return <TaskCard taskEdit={true} />
		case (!!assign):
			return <Assign />
		case (projectAdd):
			return <ProjectCard editMode={false} />
		case (projectEdit):
			return <ProjectCard editMode={projectEdit} />
		default:
			dispatch(uiActions.resetState())
	}
}