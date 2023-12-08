import avatar from '../../assets/images/avatar.png'
import avatar2 from '../../assets/images/avatar2.png'
import avatar3 from '../../assets/images/avatar3.png'
import projectIcon from '../../assets/images/svg/project_icon.svg'
import {useAppSelector} from '../../libs/redux/hooks/typedHooks.ts'
import {Avatar} from '../Avatar/Avatar.tsx'
import styles from './projectPanel.module.scss'

export const ProjectPanel = () => {
	const projectName = useAppSelector(state => state.projects.name)

	return (
		<div className={styles.projectPanel}>
			<div className={styles.projectPanel__title}>
				<img className={styles.icon} src={projectIcon} alt='project icon' />
				<h2 className={styles.text}>{projectName}</h2>
			</div>
			<div className={styles.projectPanel__assigned}>
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