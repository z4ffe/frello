import avatar from '../../assets/images/avatar.png'
import avatar2 from '../../assets/images/avatar2.png'
import avatar3 from '../../assets/images/avatar3.png'
import layoutIcon from '../../assets/images/svg/layout_icon.svg'
import projectIcon from '../../assets/images/svg/project_icon.svg'
import {useAppDispatch, useAppSelector} from '../../libs/redux/hooks/typedHooks.ts'
import {uiActions} from '../../store/ui/uiSlice.ts'
import {Avatar} from '../Avatar/Avatar.tsx'
import styles from './tasksPanel.module.scss'

export const TasksPanel = () => {
	const projectName = useAppSelector(state => state.projects.name)
	const dispatch = useAppDispatch()

	return (
		<div className={styles.tasksPanel}>
			<div className={styles.tasksPanel__title}>
				<div>
					<img className={styles.icon} src={projectIcon} alt='project icon' />
					<h2 className={styles.text}>{projectName}</h2>
				</div>
				<div onClick={() => dispatch(uiActions.changeTasksLayout())}>
					<img className={layoutIcon} src={layoutIcon} alt='layout icon' />
					<h2 className={styles.text}>Layout</h2>
				</div>
			</div>
			<div className={styles.tasksPanel__assigned}>
				<Avatar src={avatar} />
				<Avatar src={avatar2} />
				<Avatar src={avatar3} />
				<button className={styles.assignBtn}>
					{/* <img src={assignBtn} alt='add user' /> */}
				</button>
			</div>
		</div>
	)
}