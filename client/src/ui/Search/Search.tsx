import {ChangeEvent, useEffect, useState} from 'react'
import {useLocation} from 'react-router-dom'
import searchIcon from '../../assets/images/svg/search.svg'
import {useProjectsQuery} from '../../hooks/useProjectsQuery.ts'
import {useTasksQuery} from '../../hooks/useTasksQuery.ts'
import {useAppDispatch, useAppSelector} from '../../libs/redux/hooks/typedHooks.ts'
import {uiActions} from '../../store/ui/uiSlice.ts'
import {IProject} from '../../types/interfaces/project.interface.ts'
import {ITask} from '../../types/interfaces/task.interface.ts'
import {SearchProjectTile} from '../SearchProjectTile/SearchProjectTile.tsx'
import {SearchTaskTile} from '../SearchTaskTile/SearchTaskTile.tsx'
import styles from './search.module.scss'

enum ESearchMode {
	'projects' = 'projects',
	'tasks' = 'tasks',
}

export const Search = () => {
	const userId = useAppSelector(state => state.user.id)
	const projectId = useAppSelector(state => state.projects.id)
	const dispatch = useAppDispatch()
	const [mode, setMode] = useState<ESearchMode>(ESearchMode.projects)
	const [projects, setProjects] = useState<IProject[]>([])
	const [tasks, setTasks] = useState<ITask[]>([])
	const [searchStatus, setSearchStatus] = useState(false)
	const {projectsData} = useProjectsQuery(userId, true)
	const {tasksData} = useTasksQuery(projectId!)
	const location = useLocation()

	useEffect(() => {
		if (location.pathname.includes('projects')) setMode(ESearchMode.projects)
		if (location.pathname.includes('tasks')) setMode(ESearchMode.tasks)
	}, [location])

	const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
		const searchText = event.target.value.toLowerCase()
		if (!searchText) {
			return setProjects([])
		}
		const filterElements = (arr: IProject[] | ITask[] | undefined) => {
			if (!arr) return []
			return arr.filter(element => {
				const entries = Object.values(element)
				const findEntries = entries.filter(entry => entry.toString().toLowerCase().includes(searchText))
				if (findEntries.length) {
					return element
				}
			})
		}
		switch (mode) {
			case ESearchMode.projects:
				setProjects(filterElements(projectsData) as IProject[])
				break
			case ESearchMode.tasks:
				setTasks(filterElements(tasksData) as ITask[])
				break
		}
	}

	const searchResult = () => {
		switch (mode) {
			case ESearchMode.projects:
				return projects.map(project => <SearchProjectTile key={project.id} project={project} />)
			case ESearchMode.tasks:
				return tasks.map(task => <SearchTaskTile key={task.id} task={task} />)
		}
	}

	const handleSearchOn = () => {
		setSearchStatus(true)
		dispatch(uiActions.searchOn())
	}

	const handleSearchOff = () => {
		setSearchStatus(false)
		dispatch(uiActions.searchOff())
	}

	return (
		<div className={styles.search}>
			<img className={styles.search__icon} src={searchIcon} alt='search' />
			<input className={styles.input} placeholder={`Search ${mode}...`} onChange={handleSearch} onFocus={handleSearchOn} onBlur={handleSearchOff} />
			{searchStatus && <div className={styles.result}>
				{searchResult()}
			</div>}
		</div>
	)
}