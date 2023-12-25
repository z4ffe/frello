import {zodResolver} from '@hookform/resolvers/zod'
import {useQueryClient} from '@tanstack/react-query'
import {useState} from 'react'
import ReactDatePicker from 'react-datepicker'
import {useForm} from 'react-hook-form'
import closeImg from '../../assets/images/svg/close.svg'
import clockImg from '../../assets/images/svg/icon-clock.svg'
import {useAppDispatch} from '../../libs/redux/hooks/typedHooks.ts'
import {projectService} from '../../services/projectService.ts'
import {uiActions} from '../../store/ui/uiSlice.ts'
import {projectDefaultValues, projectSchema, projectSchemaType} from '../../validations/projectSchema.ts'
import {Divider} from '../Divider/Divider.tsx'
import {RegularButton} from '../RegularButton/RegularButton.tsx'
import styles from './projectCard.module.scss'
import 'react-datepicker/dist/react-datepicker.css'

export const ProjectCard = () => {
	const dispatch = useAppDispatch()
	const [startDate, setStartDate] = useState<Date>(new Date())
	const [loading, setLoading] = useState(false)
	const queryClient = useQueryClient()
	const {handleSubmit, register} = useForm<projectSchemaType>({
		defaultValues: projectDefaultValues,
		resolver: zodResolver(projectSchema),
	})

	const addProject = async (values: projectSchemaType) => {
		setLoading(true)
		const data = {
			name: values.title,
			description: values.description,
			deadline: '2023-12-12 19:55:04.899+00',
			flagged: false,
		}
		try {
			void await projectService.addProject(data)
			await queryClient.invalidateQueries({queryKey: ['projects']})
			dispatch(uiActions.resetState())
		} catch (error) {
			console.error(error)
		}
		setLoading(false)
	}

	return (
		<div className={styles.projectCard}>
			<h1 className={styles.projectCard__title}>Create New Project</h1>
			<form className={styles.form} onSubmit={handleSubmit(addProject)}>
				<label>
					<input type='text' placeholder='Project title' {...register('title')} />
				</label>
				<label>
					<textarea className={styles.desc} placeholder='Project description' {...register('description')} autoFocus />
				</label>
				<label>
					<input type='radio' />
				</label>
				<Divider />
				<div className={styles.date}>
					<div className={styles.date__label}>
						<img src={clockImg} alt='deadline' />
						<span>Due</span>
					</div>
					<ReactDatePicker className={styles.picker} portalId='portal' popperClassName={styles.popper} onChange={(data) => console.log(data)} selected={startDate} dateFormat='d MMM yyyy'
										  todayButton='Today' />
				</div>
				<Divider />
				<RegularButton customClass={styles.addBtn} type='submit' text='Add' loading={loading} disabled={loading} />
			</form>
			<div className={styles.closeBtn}>
				<img src={closeImg} alt='Close Button' />
			</div>
		</div>
	)
}