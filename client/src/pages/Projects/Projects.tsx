import {useEffect, useState} from 'react'
import {useProjectsQuery} from '../../hooks/useProjectsQuery.ts'
import {useAppDispatch, useAppSelector} from '../../libs/redux/hooks/typedHooks.ts'
import {uiActions} from '../../store/ui/uiSlice.ts'
import {AddButton} from '../../ui/AddButton/AddButton.tsx'
import {LoaderDots} from '../../ui/LoaderDots/LoaderDots.tsx'
import {ProjectTile} from '../../ui/ProjectTile/ProjectTile.tsx'
import styles from './projects.module.scss'

export const Projects = () => {
	const dispatch = useAppDispatch()
	const userId = useAppSelector(state => state.user.id)
	const [fetchEnabled, setFetchEnabled] = useState(false)
	const {projectsData, projectsIsPending, removeProjectsQueries} = useProjectsQuery(userId, fetchEnabled)

	useEffect(() => {
		if (userId) {
			return setFetchEnabled(true)
		}
		setFetchEnabled(false)
		removeProjectsQueries()
	}, [userId])

	if (projectsIsPending) {
		return <LoaderDots />
	}

	return (
		<div className={styles.projects}>
			<div className={styles.projects__main}>
				{projectsData && projectsData.map(project => (<ProjectTile key={project.id} project={project} />))}
			</div>
			<AddButton customClass={styles.add__btn} handler={() => dispatch(uiActions.addProject())} />
		</div>
	)
}