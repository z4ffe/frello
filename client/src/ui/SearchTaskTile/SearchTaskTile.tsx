import {FC} from 'react'
import {ITask} from '../../types/interfaces/task.interface.ts'

interface Props {
	task: ITask
}

export const SearchTaskTile: FC<Props> = ({task}) => {
	return (
		<div>
			<span>{task.taskNumber}</span>
			<h1>{task.title}</h1>
			<p>{task.description}</p>
		</div>
	)
}