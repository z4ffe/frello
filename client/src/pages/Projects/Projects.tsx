import {useQuery} from '@tanstack/react-query'
import {projectService} from '../../services/projectService.ts'
import {LoaderDots} from '../../ui/LoaderDots/LoaderDots.tsx'
import {ProjectTile} from '../../ui/ProjectTile/ProjectTile.tsx'
import styles from './projects.module.scss'

export const Projects = () => {
	const {isPending, data} = useQuery({
		queryKey: ['projects'],
		queryFn: () => projectService.getAllProjects(),
	})

	if (isPending) {
		return <div style={{margin: 'auto 0'}}><LoaderDots /></div>
	}

	return (
		<div className={styles.projects}>
			{data ? data.map(project => (<ProjectTile key={project.id} project={project} />)) : <LoaderDots />}
		</div>
	)
}