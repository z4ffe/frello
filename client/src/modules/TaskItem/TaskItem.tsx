import {useDraggable} from '@dnd-kit/core'
import {CSS} from '@dnd-kit/utilities'
import {FC} from 'react'
import {uiActions} from '../../app/store/ui/uiSlice.ts'
import {useAppDispatch} from '../../shared/lib/redux/hooks/typedHooks.ts'
import {ITask} from '../../shared/types/interfaces/task.interface.ts'
import {ETaskPriority} from '../../shared/types/taskType.ts'
import {Divider} from '../../shared/ui/Divider/Divider.tsx'
import {convertEditorText} from '../../shared/utils/convertEditorText.ts'
import styles from './TaskItem.module.scss'

interface Props {
	task: ITask
}

export const TaskItem: FC<Props> = ({task}) => {
	const dispatch = useAppDispatch()
	const {attributes, listeners, setNodeRef, transform} = useDraggable({
		id: task.id,
		data: task,
	})

	const style = {
		transform: CSS.Translate.toString(transform),
	}

	const taskPriority = () => {
		switch (task.priority) {
			case ETaskPriority.Low:
				return styles.low
			case ETaskPriority.Medium:
				return styles.med
			case ETaskPriority.High:
				return styles.high
			default:
				return styles.med
		}
	}

	return (
		<div className={`${styles.taskItem} ${taskPriority()}`} ref={setNodeRef} {...listeners} {...attributes} style={style} onClick={() => dispatch(uiActions.openEditTaskModal(task.id))}>
			<h2 className={styles.taskItem__title}>{task.title}</h2>
			<p className={styles.taskItem__desc}>{convertEditorText(task.description)}</p>
			<Divider />
		</div>
	)
}