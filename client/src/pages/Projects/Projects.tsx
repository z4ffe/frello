import {useQuery, useQueryClient} from '@tanstack/react-query'
import {useEffect, useState} from 'react'
import {useAppDispatch, useAppSelector} from '../../libs/redux/hooks/typedHooks.ts'
import {projectService} from '../../services/projectService.ts'
import {uiActions} from '../../store/ui/uiSlice.ts'
import {AddButton} from '../../ui/AddButton/AddButton.tsx'
import {LoaderDots} from '../../ui/LoaderDots/LoaderDots.tsx'
import {ProjectTile} from '../../ui/ProjectTile/ProjectTile.tsx'
import styles from './projects.module.scss'

export const Projects = () => {
	const dispatch = useAppDispatch()
	const userId = useAppSelector(state => state.user.id)
	const [fetchEnabled, setFetchEnabled] = useState(false)
	const queryClient = useQueryClient()
	const {isPending, data} = useQuery({
		queryKey: ['projects'],
		queryFn: () => {
			if (userId) {
				return projectService.getAllProjects(userId)
			}
		},
		enabled: fetchEnabled,
	})

	useEffect(() => {
		if (userId) {
			setFetchEnabled(true)
		} else if (!userId) {
			setFetchEnabled(false)
			queryClient.removeQueries({queryKey: ['projects']})
		}
	}, [userId])


	if (isPending) {
		return <div><LoaderDots /></div>
	}

	return (
		<div className={styles.projects}>
			<div className={styles.projects__main}>
				{data && data.map(project => (<ProjectTile key={project.id} project={project} />))}
			</div>
			<AddButton customClass={styles.add__btn} handler={() => dispatch(uiActions.addProject())} />
		</div>
	)
}