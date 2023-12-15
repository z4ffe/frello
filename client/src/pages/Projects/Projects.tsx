import {useQuery, useQueryClient} from '@tanstack/react-query'
import {useEffect, useState} from 'react'
import {useAppSelector} from '../../libs/redux/hooks/typedHooks.ts'
import {projectService} from '../../services/projectService.ts'
import {LoaderDots} from '../../ui/LoaderDots/LoaderDots.tsx'
import {ProjectTile} from '../../ui/ProjectTile/ProjectTile.tsx'
import styles from './projects.module.scss'

export const Projects = () => {
	const userId = useAppSelector(state => state.user.id)
	const [fetchEnabled, setEnabled] = useState(false)
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
			setEnabled(true)
		} else if (!userId) {
			setEnabled(false)
			queryClient.removeQueries({queryKey: ['projects']})
		}
	}, [userId])

	if (!fetchEnabled) {
		return 'Login'
	}

	if (isPending) {
		return <div><LoaderDots /></div>

	}

	return (
		<div className={styles.projects}>
			{data && data.map(project => (<ProjectTile key={project.id} project={project} />))}
		</div>
	)
}