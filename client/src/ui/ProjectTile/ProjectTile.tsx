import dayjs from 'dayjs'
import {FC, SyntheticEvent} from 'react'
import {useNavigate} from 'react-router-dom'
import flag from '../../assets/images/svg/icon-flag.svg'
import {useAppDispatch} from '../../libs/redux/hooks/typedHooks.ts'
import {projectsActions} from '../../store/projects/projectsSlice.ts'
import {IProject} from '../../types/interfaces/project.interface.ts'
import {ProgressBar} from '../ProgressBar/ProgressBar.tsx'
import {ProjectDropDown} from '../ProjectDropDown/ProjectDropDown.tsx'
import {UsersList} from '../UsersList/UsersList.tsx'
import styles from './projectTile.module.scss'

interface Props {
	project: IProject
}

export const ProjectTile: FC<Props> = ({project}) => {
	const dispatch = useAppDispatch()
	const navigate = useNavigate()
	
	const handleProjectDispatch = () => {
		dispatch(projectsActions.setProject(project))
		navigate(`/tasks/${project.id}`)
	}

	const handleProject = (event: SyntheticEvent) => {
		const target = event.target as Element
		if (!target.classList[0].includes('addButton') && !target.classList[0].includes('dropdown') && !target.classList[0].includes('btn')) {
			handleProjectDispatch()
		}
	}

	return (
		<div className={styles.projectTile} onMouseUp={handleProject}>
			<h2 className={styles.projectTile__title}>{project.name}</h2>
			<div className={styles.information}>
				{project.flagged && <img className={styles.flag} src={flag} alt='flagged' />}
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
			<UsersList project={project} />
			<ProjectDropDown project={project} />
		</div>
	)
}