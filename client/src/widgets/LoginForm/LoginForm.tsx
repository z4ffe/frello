import {zodResolver} from '@hookform/resolvers/zod'
import {useState} from 'react'
import {useForm} from 'react-hook-form'
import {uiActions} from '../../app/store/ui/uiSlice.ts'
import {userActions} from '../../app/store/user/userSlice.ts'
import {login} from '../../app/store/user/userThunks.ts'
import {useAppDispatch, useAppSelector} from '../../shared/lib/redux/hooks/typedHooks.ts'
import {Divider} from '../../shared/ui/Divider/Divider.tsx'
import {Icon} from '../../shared/ui/Icon/Icon.tsx'
import {RegularButton} from '../../shared/ui/RegularButton/RegularButton.tsx'
import {loginDefaultValues, loginSchema, loginSchemaType} from '../../shared/validations/loginSchema.ts'
import styles from './LoginForm.module.scss'

export const LoginForm = () => {
	const loading = useAppSelector(state => state.user.loading)
	const saveSession = useAppSelector(state => state.user.saveSession)
	const [showPassword, setShowPassword] = useState(true)
	const dispatch = useAppDispatch()
	const {register, handleSubmit} = useForm<loginSchemaType>({
		defaultValues: loginDefaultValues,
		resolver: zodResolver(loginSchema),
	})

	const formSubmit = async (values: loginSchemaType) => {
		const response = await dispatch(login(values)).unwrap()
		if (response.accessToken) {
			dispatch(uiActions.resetState())
		}
	}

	const handleSaveSession = () => {
		dispatch(userActions.handleSaveSession(!saveSession))
	}

	const handleShowPassword = () => {
		setShowPassword(!showPassword)
	}

	return (
		<form className={styles.loginForm} onSubmit={handleSubmit(formSubmit)}>
			<div className={styles.inputWrapper}>
				<label className={styles.inputLabel}>Login</label>
				<input type='text' placeholder='Username' {...register('username')} />
			</div>
			<div className={styles.inputWrapper}>
				<label className={styles.inputLabel}>Password</label>
				<input type={showPassword ? 'password' : 'text'} placeholder='Enter password' {...register('password')} />
				<button type='button' className={styles.passwordIconWrapper} onClick={handleShowPassword}>
					<Icon iconType='show_password' customStyles={styles.passwordIcon} />
				</button>
			</div>
			<div className={styles.rememberSection}>
				<label className={styles.switch}>
					<input type='checkbox' checked={saveSession} onChange={handleSaveSession} />
					<span className={`${styles.slider} ${styles.round}`}></span>
				</label>
				<span>Remember me</span>
			</div>
			<RegularButton type='submit' text='Sign in' disabled={loading} loading={loading} />
			<Divider />
			<div className={styles.signUpSection}>
				<span>Don't have an account?</span>
				<button type='button'>Sign up now</button>
			</div>
		</form>
	)
}