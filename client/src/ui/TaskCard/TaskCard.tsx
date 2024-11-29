import {ChangeEvent, FC, useEffect, useState} from 'react'
import {TextEditor} from '../../components/TextEditor/TextEditor.tsx'
import {useTaskQuery} from '../../hooks/useTaskQuery.ts'
import {useAppSelector} from '../../libs/redux/hooks/typedHooks.ts'
import {validateJSON} from '../../utils/validateJSON.ts'
import {Divider} from '../Divider/Divider.tsx'
import {LoaderDots} from '../LoaderDots/LoaderDots.tsx'
import {RegularButton} from '../RegularButton/RegularButton.tsx'
import styles from './TaskCard.module.scss'

interface Props {
	taskEdit?: boolean
}

export const TaskCard: FC<Props> = ({taskEdit}) => {
	const [title, setTitle] = useState<string>('')
	const [description, setDescription] = useState<string>('')
	const projectName = useAppSelector(state => state.projects.name)
	const {data, isLoading, mutate, resetTaskQueries} = useTaskQuery()

	const handleDescription = (desc: string) => setDescription(desc)

	useEffect(() => {
		if (data && validateJSON(data.description)) setDescription(JSON.parse(data.description))
		if (data?.title) setTitle(data.title)
		if (data?.description) setDescription(data.description)
	}, [data])

	useEffect(() => {
		return () => {
			resetTaskQueries()
		}
	}, [])


	const handleTitle = (event: ChangeEvent<HTMLInputElement>) => setTitle(event.target.value)

	if ((isLoading || !data) && taskEdit) return <LoaderDots />

	return (
		<div className={styles.tasksCard}>
			<span
				className={styles.tasksCard__breadcrumbs}>Projects&nbsp;&nbsp;/&nbsp;&nbsp;{projectName}&nbsp;&nbsp;/&nbsp;&nbsp;{taskEdit ? 'N-' + data?.id : ''}</span>
			<Divider />
			<label>
				<input type='text' onChange={handleTitle} placeholder={`Task name: ${title}`} value={title} />
			</label>
			<span className={styles.tasksCard__desc}>Description</span>
			{!taskEdit && <TextEditor handleDescription={handleDescription} />}
			{taskEdit && description && <TextEditor handleDescription={handleDescription} content={description} />}
			<Divider />
			<RegularButton handler={mutate} text={`${taskEdit ? 'Edit' : 'Add'}`}
								customClass={styles.addBtn} loading={isLoading} />

		</div>
	)
}


/*
const {data: comments} = useQuery({
	queryKey: ['comments'],
	queryFn: async () => {
		const response: AxiosResponse<IComment[]> = await apiInstance.get('http://localhost:5005/api/comment?id=13')
		return response.data
	},
	enabled: taskEdit,
})

{(taskEdit && comments?.length) ?
	<Comments comments={comments} /> : null}*/
