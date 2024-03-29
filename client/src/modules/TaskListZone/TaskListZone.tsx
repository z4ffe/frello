import {FC, LegacyRef} from 'react'
import {uiActions} from '../../app/store/ui/uiSlice.ts'
import {useAppDispatch} from '../../shared/lib/redux/hooks/typedHooks.ts'
import {ITask} from '../../shared/types/interfaces/task.interface.ts'
import {ETaskStatus} from '../../shared/types/taskType.ts'
import {AddButton} from '../../shared/ui/AddButton/AddButton.tsx'
import {TaskItem} from '../TaskItem/TaskItem.tsx'
import styles from './taskListZone.module.scss'

interface Props {
	title: string
	nodeRef: LegacyRef<HTMLDivElement>
	data: ITask[]
	isOver: boolean | undefined
	status: ETaskStatus
}


export const TaskListZone: FC<Props> = ({title, nodeRef, data, isOver, status}) => {
	const dispatch = useAppDispatch()
	const countStyle = () => {
		switch (status) {
			case ETaskStatus.Queue:
				return `rgba(8, 160, 247, 0.9)`
			case ETaskStatus.Development:
				return `rgba(251, 166, 60, 0.9)`
			case ETaskStatus.Done:
				return `rgba(52, 167, 112, 0.9)`
		}
	}

	const handleAddModal = () => {
		dispatch(uiActions.openAddTaskModal())
	}

	return (
		<div ref={nodeRef}
			  className={styles.taskDropZone}
			  style={{transform: `scale(${isOver ? '102' : '100'}%)`, borderBottom: `2px solid ${countStyle()}`}}
		>
			<div className={styles.taskDropZone__title}>
				<div className={`${styles.taskCount}`} style={{backgroundColor: countStyle()}}>
					<p>{data.length}</p>
				</div>
				<p className={styles.titleText}>{title}</p>
				<div className={styles.addTask}>
					<AddButton handler={handleAddModal} />
				</div>
			</div>
			<div className={styles.taskDropZone__tasks}>
				{data.map(task => <TaskItem key={task.id} task={task} />)}
			</div>
		</div>
	)
}