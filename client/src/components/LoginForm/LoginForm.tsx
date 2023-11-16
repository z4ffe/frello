import {zodResolver} from '@hookform/resolvers/zod'
import {useForm} from 'react-hook-form'
import {useAppDispatch, useAppSelector} from '../../lib/redux/hooks/typedHooks.ts'
import {uiActions} from '../../store/ui/uiSlice.ts'
import {login} from '../../store/user/userThunks.ts'
import {RegularButton} from '../../ui/RegularButton/RegularButton.tsx'
import {loginSchema, loginSchemaType} from '../../validations/loginSchema.ts'
import styles from './LoginForm.module.scss'

export const LoginForm = () => {
	const loading = useAppSelector(state => state.user.loading)
	const dispatch = useAppDispatch()
	const {register, handleSubmit, resetField} = useForm<loginSchemaType>({
		defaultValues: {
			username: '',
			password: '',
		},
		resolver: zodResolver(loginSchema),
	})

	const asd = async (values: loginSchemaType) => {
		await dispatch(login(values)).unwrap().catch((res) => console.log(res))
		dispatch(uiActions.resetState())
	}

	return (
		<form className={styles.loginForm} onSubmit={handleSubmit(asd)}>
			<div className={styles.inputWrapper}>
				<label className={styles.inputLabel}>Login</label>
				<input type='text' placeholder='Username' {...register('username')} />
			</div>
			<div className={styles.inputWrapper}>
				<label className={styles.inputLabel}>Password</label>
				<input type='password' placeholder='Enter password' {...register('password')} />
			</div>
			<RegularButton type={'submit'} text='Sign in' loading={loading} />
		</form>
	)
}