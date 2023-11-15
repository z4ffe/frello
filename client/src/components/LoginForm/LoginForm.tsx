import {zodResolver} from '@hookform/resolvers/zod'
import {useForm} from 'react-hook-form'
import {useAppDispatch} from '../../lib/redux/hooks/typedHooks.ts'
import {login} from '../../store/user/userThunks.ts'
import {loginSchema, loginSchemaType} from '../../validations/loginSchema.ts'
import styles from './LoginForm.module.scss'

export const LoginForm = () => {
	const dispatch = useAppDispatch()
	const {register, handleSubmit} = useForm<loginSchemaType>({
		defaultValues: {
			username: '',
			password: '',
		},
		resolver: zodResolver(loginSchema),
	})

	const asd = async (values: loginSchemaType) => {
		dispatch(login(values))
		return
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
			<button type='submit'>Click</button>
		</form>
	)
}