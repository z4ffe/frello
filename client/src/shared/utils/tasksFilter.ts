import {ITask} from '../types/interfaces/task.interface.ts'
import {ETaskStatus} from '../types/taskType.ts'

const sortByStatus = (taskA: ITask, taskB: ITask) => {
	const statusOrder = {
		'low': 1,
		'med': 2,
		'high': 3,
	}
	return statusOrder[taskB.priority] - statusOrder[taskA.priority]
}

export const tasksFilter = (tasksArr: ITask[], status: ETaskStatus) => {
	const filtredTasks = tasksArr.filter(task => task.status === status)
	return filtredTasks.sort(sortByStatus)
}