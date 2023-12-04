import {ITask} from '../types/interfaces/task.interface.ts'
import {ETaskPriority, ETaskStatus} from '../types/taskType.ts'

export const tasksFilter = (tasksArr: ITask[], status: ETaskStatus) => {
	const filtredTasks = tasksArr.filter(task => task.status === status)
	const sortedTasks: ITask[] = []
	filtredTasks.forEach(task => {
		if (task.priority === ETaskPriority.High) {
			sortedTasks.unshift(task)
		} else {
			sortedTasks.push(task)
		}
	})
	return sortedTasks
}