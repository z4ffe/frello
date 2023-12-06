import {Login} from '../../components/Login/Login.tsx'
import {useAppSelector} from '../../libs/redux/hooks/typedHooks.ts'
import {ErrorPage} from '../../pages/ErrorPage/NotFound.tsx'
import {TaskCard} from '../TaskCard/TaskCard.tsx'

export const ModalContent = () => {
	const {login, register, task} = useAppSelector(state => state.ui.modal)

	if (login) return <Login />
	if (register) return <ErrorPage />
	if (task) return <TaskCard />
}