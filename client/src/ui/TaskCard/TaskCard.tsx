import {useQuery} from '@tanstack/react-query'
import {AxiosResponse} from 'axios'
import {FC, useEffect, useState} from 'react'
import {TextEditor} from '../../components/TextEditor/TextEditor.tsx'
import {useTaskQuery} from '../../hooks/useTaskQuery.ts'
import {apiInstance} from '../../libs/axios/apiInstance.ts'
import {useAppSelector} from '../../libs/redux/hooks/typedHooks.ts'
import {IComment} from '../../types/interfaces/comment.interface.ts'
import {validateJSON} from '../../utils/validateJSON.ts'
import {Comment} from '../Comment/Comment.tsx'
import {LoaderDots} from '../LoaderDots/LoaderDots.tsx'
import styles from './TaskCard.module.scss'


interface Props {
	taskEdit?: boolean
}

export const TaskCard: FC<Props> = ({taskEdit}) => {
	const [description, setDescription] = useState<string>('')
	const projectName = useAppSelector(state => state.projects.name)
	const {data, isLoading, mutate, resetTaskQueries} = useTaskQuery(description, taskEdit)
	const {data: comments} = useQuery({
		queryKey: ['comments'],
		queryFn: async () => {
			const response: AxiosResponse<IComment[]> = await apiInstance.get('http://localhost:5005/api/comment?id=13')
			return response.data
		},
		enabled: taskEdit,
	})

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

	if ((isLoading || !data) && taskEdit) {
		return <LoaderDots />
	}

	return (
		<div className={styles.tasksCard}>
			<p className={styles.tasksCard__breadcrumbs}>Projects&nbsp;&nbsp;/&nbsp;&nbsp;{projectName}&nbsp;&nbsp;/&nbsp;&nbsp;N-{data?.id}</p>
			<h1 className={styles.tasksCard__title}>{data?.title}</h1>
			<button className={styles.subTaskBtn}>Create subtask</button>
			<span className={styles.tasksCard__desc}>Description</span>
			{description && <TextEditor content={description} handleContentChange={handleDescription} handleSave={mutate} />}
			<span>Activity</span>
			{taskEdit && <div className={styles.comments}>
				{comments?.length && comments.map(comment => <Comment key={comment.id} comment={comment} />)}
			</div>}
		</div>
	)
}