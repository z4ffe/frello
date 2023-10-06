import {useParams} from 'react-router-dom'

export const Tasks = () => {
	const {id} = useParams()

	return (
		<div>
			<h1>tasks for project with id: {id}</h1>
		</div>
	)
}