import {apiInstance} from '../../libs/axios/apiInstance.ts'
import styles from './projectCard.module.scss'

const payload = {
	'name': 'BE',
	'description': 'We need to implement this',
	'authorId': 1,
	'deadline': '2023-12-12 19:55:04.899+00',
	'flagged': true,
}

export const ProjectCard = () => {
	const addProject = () => {
		apiInstance.post('/project')
	}

	return (
		<div className={styles.projectCard}>
			<h1>ProjectCard</h1>
			<button>add</button>
		</div>
	)
}