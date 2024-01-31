import dayjs from 'dayjs'
import {FC} from 'react'
import {useNavigate} from 'react-router-dom'
import {projectsActions} from '../../app/store/projects/projectsSlice.ts'
import {useAppDispatch} from '../../shared/lib/redux/hooks/typedHooks.ts'
import {IProject} from '../../shared/types/interfaces/project.interface.ts'
import {Icon} from '../../shared/ui/Icon/Icon.tsx'
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
		<div className={styles.searchProjectTile} onMouseDown={handleProjectDispatch}>
			<div className={styles.descWrapper}>
				<h1>{project.name}</h1>
				<p>{project.description}</p>
			</div>
			<div className={styles.info}>
				{project.flagged && <Icon iconType='flag' customStyles={styles.flag} />}
				<div className={styles.deadlineWrapper}>
					<Icon iconType='clock' customStyles={styles.deadlineIcon} />
					<span className={styles.deadline}>{dayjs(project.deadline).format('MMM DD YYYY')}</span>
				</div>
			</div>
		</div>
	)
}

