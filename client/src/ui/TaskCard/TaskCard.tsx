import {useEffect, useState} from 'react'
import {TextEditor} from '../../components/TextEditor/TextEditor.tsx'
import {useTaskQuery} from '../../hooks/useTaskQuery.ts'
import {useAppSelector} from '../../libs/redux/hooks/typedHooks.ts'
import {validateJSON} from '../../utils/validateJSON.ts'
import {LoaderDots} from '../LoaderDots/LoaderDots.tsx'
import styles from './TaskCard.module.scss'

export const TaskCard = () => {
	const [description, setDescription] = useState<string>('')
	const projectName = useAppSelector(state => state.projects.name)
	const {data, isLoading, mutate, resetTaskQueries} = useTaskQuery(description)

	useEffect(() => {
		if (data && validateJSON(data.description)) {
			setDescription(JSON.parse(data.description))
		}
	}, [data])

	useEffect(() => {
		return () => {
			resetTaskQueries()
		}
	}, [])


	const handleDescription = (text: string) => {
		setDescription(text)
	}

	if (isLoading || !data) {
		return <LoaderDots />
	}

	return (
		<div className={styles.tasksCard}>
			<p>Projects / {projectName} / {data.taskNumber}</p>
			<button>Create subtask</button>
			<h1 className={styles.tasksCard__title}>{data.title}</h1>
			<span className={styles.tasksCard__desc}>Description: </span>
			{description && <TextEditor content={description} handleContentChange={handleDescription} handleSave={mutate} />}
		</div>
	)
}