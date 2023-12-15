import {useEffect} from 'react'
import {Login} from '../../components/Login/Login.tsx'
import {useAppDispatch, useAppSelector} from '../../libs/redux/hooks/typedHooks.ts'
import {ErrorPage} from '../../pages/ErrorPage/NotFound.tsx'
import {uiActions} from '../../store/ui/uiSlice.ts'
import {TaskCard} from '../TaskCard/TaskCard.tsx'
import {Assign} from '../UserAssign/UserAssign.tsx'

export const ModalContent = () => {
	const {login, register, task, taskEdit, taskAdd, assign} = useAppSelector(state => state.ui.modal)
	const dispatch = useAppDispatch()

	useEffect(() => {
		if (!login && !register && !taskAdd && !assign && !(task && taskEdit)) {
			dispatch(uiActions.resetState())
		}
	}, [])


	if (login) return <Login />
	if (register) return <ErrorPage />
	if (taskAdd) return <TaskCard taskEdit={false} />
	if (task && taskEdit) return <TaskCard taskEdit={true} />
	if (assign) return <Assign />
}