import {useQuery} from '@tanstack/react-query'
import {AxiosResponse} from 'axios'
import {FC, useEffect, useState} from 'react'
import {apiInstance} from '../../shared/api/apiInstance.ts'
import {useTaskQuery} from '../../shared/hooks/useTaskQuery.ts'
import {useAppSelector} from '../../shared/lib/redux/hooks/typedHooks.ts'
import {IComment} from '../../shared/types/interfaces/comment.interface.ts'
import {Comment} from '../../shared/ui/Comment/Comment.tsx'
import {LoaderDots} from '../../shared/ui/LoaderDots/LoaderDots.tsx'
import {validateJSON} from '../../shared/utils/validateJSON.ts'
import {TextEditor} from '../../widgets/TextEditor/TextEditor.tsx'
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