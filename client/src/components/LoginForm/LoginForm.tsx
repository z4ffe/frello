import {zodResolver} from '@hookform/resolvers/zod'
import {useForm} from 'react-hook-form'
import {useAppDispatch, useAppSelector} from '../../lib/redux/hooks/typedHooks.ts'
import {uiActions} from '../../store/ui/uiSlice.ts'
import {userActions} from '../../store/user/userSlice.ts'
import {login} from '../../store/user/userThunks.ts'
import {Divider} from '../../ui/Divider/Divider.tsx'
import {RegularButton} from '../../ui/RegularButton/RegularButton.tsx'
import {loginSchema, loginSchemaType} from '../../validations/loginSchema.ts'
import styles from './LoginForm.module.scss'

export const LoginForm = () => {
	const loading = useAppSelector(state => state.user.loading)
	const saveSession = useAppSelector(state => state.user.saveSession)
	const dispatch = useAppDispatch()
	const {register, handleSubmit} = useForm<loginSchemaType>({
		defaultValues: {
			username: '',
			password: '',
		},
		resolver: zodResolver(loginSchema),
	})

	const formSubmit = async (values: loginSchemaType) => {
		await dispatch(login(values))
		dispatch(uiActions.resetState())
	}

	const handleSaveSession = () => {
		dispatch(userActions.handleSaveSession(!saveSession))
	}

	return (
		<form className={styles.loginForm} onSubmit={handleSubmit(formSubmit)}>
			<div className={styles.inputWrapper}>
				<label className={styles.inputLabel}>Login</label>
				<input type='text' placeholder='Username' {...register('username')} />
			</div>
			<div className={styles.inputWrapper}>
				<label className={styles.inputLabel}>Password</label>
				<input type='password' placeholder='Enter password' {...register('password')} />
			</div>
			<div className={styles.rememberSection}>
				<label className={styles.switch}>
					<input type='checkbox' checked={saveSession} onChange={handleSaveSession} />
					<span className={`${styles.slider} ${styles.round}`}></span>
				</label>
				<span>Remember me</span>
			</div>
			<RegularButton type={'submit'} text='Sign in' loading={loading} />
			<Divider />
			<div className={styles.signUpSection}>
				<span>Dont have an account?</span>
				<button type='button'>Sign up now</button>
			</div>
		</form>
	)
}