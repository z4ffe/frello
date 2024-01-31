import {useEffect, useState} from 'react'
import {uiActions} from '../../../app/store/ui/uiSlice.ts'
import {ProjectTile} from '../../../modules/ProjectTile/ProjectTile.tsx'
import {useProjectsQuery} from '../../../shared/hooks/useProjectsQuery.ts'
import {useAppDispatch, useAppSelector} from '../../../shared/lib/redux/hooks/typedHooks.ts'
import {AddButton} from '../../../shared/ui/AddButton/AddButton.tsx'
import {LoaderDots} from '../../../shared/ui/LoaderDots/LoaderDots.tsx'
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
		<main className={styles.projects}>
			<div className={styles.projects__main}>
				{projectsData && projectsData.map(project => (<ProjectTile key={project.id} project={project} />))}
			</div>
			<AddButton customClass={styles.add__btn} handler={() => dispatch(uiActions.addProject())} />
		</main>
	)
}