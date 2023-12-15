import {Login} from '../../components/Login/Login.tsx'
import {useAppSelector} from '../../libs/redux/hooks/typedHooks.ts'
import {ErrorPage} from '../../pages/ErrorPage/NotFound.tsx'
import {TaskCard} from '../TaskCard/TaskCard.tsx'

export const ModalContent = () => {
	const {login, register, task, taskEdit, taskAdd} = useAppSelector(state => state.ui.modal)

	if (login) return <Login />
	if (register) return <ErrorPage />
	if (taskAdd) return <TaskCard taskEdit={false} />
	if (task && taskEdit) return <TaskCard taskEdit={true} />
}