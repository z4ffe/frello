import {useEffect} from 'react'
import {uiActions} from '../../app/store/ui/uiSlice.ts'
import {ErrorPage} from '../../pages/ErrorPage/ui/ErrorPage.tsx'
import {useAppDispatch, useAppSelector} from '../../shared/lib/redux/hooks/typedHooks.ts'
import {Login} from '../../widgets/Login/Login.tsx'
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