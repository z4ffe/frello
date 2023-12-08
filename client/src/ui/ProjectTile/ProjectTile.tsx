import dayjs from 'dayjs'
import {FC} from 'react'
import {useNavigate} from 'react-router-dom'
import avatar from '../../assets/images/avatar.png'
import avatar2 from '../../assets/images/avatar2.png'
import avatar3 from '../../assets/images/avatar3.png'
import menuIcon from '../../assets/images/svg/dropdown_menu.svg'
import {useAppDispatch} from '../../libs/redux/hooks/typedHooks.ts'
import {projectsActions} from '../../store/projects/projectsSlice.ts'
import {IProject} from '../../types/interfaces/project.interface.ts'
import {AddButton} from '../AddButton/AddButton.tsx'
import {Avatar} from '../Avatar/Avatar.tsx'
import {ProgressBar} from '../ProgressBar/ProgressBar.tsx'
import styles from './projectTile.module.scss'

interface Props {
	project: IProject
}

export const ProjectTile: FC<Props> = ({project}) => {
	const dispatch = useAppDispatch()
	const randomProgress = Math.round(Math.random() * 100)
	const rndDesc = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores beatae dignissimos dolor ducimus eius, error illum in odit possimus quam quisquam tenetur. Molestiae nihil odit quasi repellendus repudiandae sapiente sequi.'
	const navigate = useNavigate()

	const handleProjectDispatch = () => {
		dispatch(projectsActions.setProject(project))
		navigate(`/tasks/${project.id}`)
	}

	const randomAvatar = () => {
		const avatars = [avatar, avatar2, avatar3]
		return avatars[Math.floor(Math.random() * 3)]
	}

	return (
		<div className={styles.projectTile} onClick={handleProjectDispatch}>
			<h2 className={styles.projectTile__title}>{project.name}</h2>
			<span className={styles.projectTile__date}>Due {dayjs(project.createdAt).format('MMM DD')}</span>
			<p className={styles.projectTile__desc}>{rndDesc}</p>
			<div className={styles.projectTile__progress}>
				<div className={styles.header}>
					<h3 className={styles.header__title}>Project progress</h3>
					<span className={styles.header__percent}>{randomProgress}%</span>
				</div>
				<ProgressBar percent={randomProgress} />
			</div>
			<div className={styles.authorSection}>
				<div className={styles.authorAvatars}>
					{new Array(Math.ceil(Math.random() * 4)).fill(null).map((_, idx) => <Avatar key={idx} src={randomAvatar()} />)}
				</div>
				<AddButton />
			</div>
			<div className={styles.dropdownWrapper}>
				<img src={menuIcon} alt='Dropdown Menu' />
			</div>
		</div>
	)
}