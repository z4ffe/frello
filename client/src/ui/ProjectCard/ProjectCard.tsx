import {zodResolver} from '@hookform/resolvers/zod'
import {useQueryClient} from '@tanstack/react-query'
import {FC, useState} from 'react'
import ReactDatePicker from 'react-datepicker'
import {Controller, useForm} from 'react-hook-form'
import avatar from '../../assets/images/avatar.png'
import assignImg from '../../assets/images/svg/assign_icon.svg'
import closeImg from '../../assets/images/svg/close.svg'
import clockImg from '../../assets/images/svg/icon-clock.svg'
import flagImg from '../../assets/images/svg/icon-flag.svg'
import {useAppDispatch, useAppSelector} from '../../libs/redux/hooks/typedHooks.ts'
import {projectService} from '../../services/projectService.ts'
import {uiActions} from '../../store/ui/uiSlice.ts'
import {projectDefaultValues, projectSchema, projectSchemaType} from '../../validations/projectSchema.ts'
import {Avatar} from '../Avatar/Avatar.tsx'
import {Divider} from '../Divider/Divider.tsx'
import {RegularButton} from '../RegularButton/RegularButton.tsx'
import styles from './projectCard.module.scss'
import 'react-datepicker/dist/react-datepicker.css'

interface Props {
	editMode: boolean
}

export const ProjectCard: FC<Props> = ({editMode}) => {
	const dispatch = useAppDispatch()
	const {id, flagged, description, title, deadline} = useAppSelector(state => state.ui.modal.projectEditData)
	const [loading, setLoading] = useState(false)
	const queryClient = useQueryClient()
	const {handleSubmit, register, control} = useForm<projectSchemaType>({
		defaultValues: editMode ? {
			title,
			deadline: new Date(deadline),
			description,
			flagged,
		} : projectDefaultValues,
		resolver: zodResolver(projectSchema),
	})

	const addProject = async (values: projectSchemaType) => {
		setLoading(true)
		const data = {
			name: values.title,
			description: values.description,
			deadline: values.deadline,
			flagged: values.flagged,
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
				<div className={styles.flagged}>
					<div className={styles.flagged__label}>
						<img src={flagImg} alt='flagged' />
						<span>Flagged</span>
					</div>
					<label className={styles.toggle}>
						<input type='checkbox' {...register('flagged')} />
						<span className={styles.switch} />
					</label>
				</div>
				<Divider />
				<div className={styles.date}>
					<div className={styles.date__label}>
						<img src={clockImg} alt='deadline' />
						<span>Due</span>
					</div>
					<Controller control={control} name='deadline' render={({field}) => (
						<ReactDatePicker className={styles.picker} portalId='portal' popperClassName={styles.popper} onChange={(date) => field.onChange(date)} selected={field.value} dateFormat='d MMM yyyy'
											  todayButton='Today' minDate={new Date()} />
					)} />
				</div>
				<Divider />
				<div className={styles.flagged}>
					<div className={styles.flagged__label}>
						<img src={assignImg} alt='assign' />
						<span>Assign users</span>
					</div>
					<Avatar src={avatar} />
				</div>
				<RegularButton customClass={styles.addBtn} type='submit' text={editMode ? 'Edit' : 'Add'} loading={loading} disabled={loading} />
			</form>
			<div className={styles.closeBtn}>
				<img src={closeImg} alt='Close Button' />
			</div>
		</div>
	)
}