import dayjs from 'dayjs'
import {FC} from 'react'
import avatar from '../../assets/images/avatar.png'
import avatar2 from '../../assets/images/avatar2.png'
import avatar3 from '../../assets/images/avatar3.png'
import flag from '../../assets/images/svg/icon-flag.svg'
import {useAppDispatch, useAppSelector} from '../../libs/redux/hooks/typedHooks.ts'
import {uiActions} from '../../store/ui/uiSlice.ts'
import {IProject} from '../../types/interfaces/project.interface.ts'
import {ERoles} from '../../types/roleType.ts'
import {AddButton} from '../AddButton/AddButton.tsx'
import {Avatar} from '../Avatar/Avatar.tsx'
import {ProgressBar} from '../ProgressBar/ProgressBar.tsx'
import {ProjectDropDown} from '../ProjectDropDown/ProjectDropDown.tsx'
import styles from './projectTile.module.scss'

interface Props {
	project: IProject
}

export const ProjectTile: FC<Props> = ({project}) => {
	const role = useAppSelector(state => state.user.role)
	const dispatch = useAppDispatch()

	/* const navigate = useNavigate()

	const handleProjectDispatch = () => {
		dispatch(projectsActions.setProject(project))
		navigate(`/tasks/${project.id}`)
	} */

	const randomAvatar = () => {
		const avatars = [avatar, avatar2, avatar3]
		return avatars[Math.floor(Math.random() * 3)]
	}

	return (
		<div className={styles.projectTile}>
			<h2 className={styles.projectTile__title}>{project.name}</h2>
			<div className={styles.information}>
				{project.flagged ? <img className={styles.flag} src={flag} alt='flagged' /> : null}
				<span className={styles.deadline}>Due {dayjs(project.deadline).format('MMM DD')}</span>
			</div>
			<p className={styles.projectTile__desc}>{project.description}</p>
			<div className={styles.projectTile__progress}>
				<div className={styles.header}>
					<h3 className={styles.header__title}>Project progress</h3>
					<span className={styles.header__percent}>{project.progress}%</span>
				</div>
				<ProgressBar percent={project.progress} />
			</div>
			<div className={styles.authorSection}>
				<div className={styles.authorAvatars}>
					{new Array(project.projectAssign.length).fill(null).map((_, idx) => <Avatar key={idx} src={randomAvatar()} />)}
				</div>
				{role === ERoles.Admin ? <AddButton handler={() => dispatch(uiActions.openUserAssign(project.id))} /> : null}
			</div>
			<ProjectDropDown project={project} />
		</div>
	)
}