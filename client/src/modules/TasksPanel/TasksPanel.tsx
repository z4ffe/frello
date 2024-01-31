import avatar from '../../app/assets/images/default_avatar.jpg'
import avatar2 from '../../app/assets/images/default_avatar.jpg'
import avatar3 from '../../app/assets/images/default_avatar.jpg'
import {uiActions} from '../../app/store/ui/uiSlice.ts'
import {useAppDispatch, useAppSelector} from '../../shared/lib/redux/hooks/typedHooks.ts'
import {Avatar} from '../../shared/ui/Avatar/Avatar.tsx'
import {Icon} from '../../shared/ui/Icon/Icon.tsx'
import styles from './tasksPanel.module.scss'

export const TasksPanel = () => {
	const projectName = useAppSelector(state => state.projects.name)
	const dispatch = useAppDispatch()

	return (
		<div className={styles.tasksPanel}>
			<div className={styles.tasksPanel__title}>
				<div>
					<Icon iconType='project' customStyles={styles.icon} />
					<h2 className={styles.text}>{projectName}</h2>
				</div>
				<div onClick={() => dispatch(uiActions.changeTasksLayout())}>
					<Icon iconType='layout' />
					<h2 className={styles.text}>Layout</h2>
				</div>
			</div>
			<div className={styles.tasksPanel__assigned}>
				<Avatar src={avatar} />
				<Avatar src={avatar2} />
				<Avatar src={avatar3} />
				<button className={styles.assignBtn}>
				</button>
			</div>
		</div>
	)
}