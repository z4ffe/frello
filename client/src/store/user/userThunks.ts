import {createAsyncThunk} from '@reduxjs/toolkit'
import {AxiosResponse} from 'axios'
import {apiInstance} from '../../lib/axios/apiInstance.ts'
import {ILoginResponse} from '../../types/interfaces/user.interface.ts'
import {loginSchemaType} from '../../validations/loginSchema.ts'

export const login = createAsyncThunk('user/loginThunk', async ({username, password}: loginSchemaType) => {
	try {
		const response: AxiosResponse<ILoginResponse> = await apiInstance.post('auth/login', {
			username,
			password,
		})
		return response.data
	} catch (error) {
		console.error(error)
		throw new Error('Wrong credentials')
	}
})