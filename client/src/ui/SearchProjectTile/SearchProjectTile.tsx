import dayjs from 'dayjs'
import {FC} from 'react'
import {useNavigate} from 'react-router-dom'
import {useAppDispatch} from '../../libs/redux/hooks/typedHooks.ts'
import {projectsActions} from '../../store/projects/projectsSlice.ts'
import {IProject} from '../../types/interfaces/project.interface.ts'
import {Icon} from '../Icon/Icon.tsx'
import styles from './searchProjectTile.module.scss'

interface Props {
	project: IProject
}

export const SearchProjectTile: FC<Props> = ({project}) => {
	const dispatch = useAppDispatch()
	const navigate = useNavigate()

	const handleProjectDispatch = () => {
		dispatch(projectsActions.setProject(project))
		navigate(`/tasks/${project.id}`)
	}


	return (
		<div className={styles.searchProjectTile}
			  onMouseDown={handleProjectDispatch}>
			<div className={styles.descWrapper}>
				<h1>{project.name}</h1>
				<p>{project.description}</p>
			</div>
			<div className={styles.info}>
				<div className={styles.deadlineWrapper}>
					<span
						className={styles.deadline}>{dayjs(project.deadline).format('MMM DD YYYY')}</span>
					<Icon iconType='clock' customStyles={styles.deadlineIcon} />
					{project.flagged &&
						<Icon iconType='flag' customStyles={styles.flag} />}
				</div>
			</div>
		</div>
	)
}

