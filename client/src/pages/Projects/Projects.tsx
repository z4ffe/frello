import {useQuery} from '@tanstack/react-query'
import {projectService} from '../../services/projectService.ts'
import {ProjectTile} from '../../ui/ProjectTile/ProjectTile.tsx'
import {LoaderDots} from '../../ui/Spinner/LoaderDots.tsx'
import styles from './projects.module.scss'

export const Projects = () => {
	const {isPending, error, data} = useQuery({
		queryKey: ['projects'],
		queryFn: () => projectService.getAllProjects(),
	})

	if (isPending) {
		return <LoaderDots />
	}

	return (
		<div className={styles.projects}>
			{data ? data.map(project => (<ProjectTile project={project} />)) : <LoaderDots />}
		</div>
	)
}