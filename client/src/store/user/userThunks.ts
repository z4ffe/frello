import {createAsyncThunk} from '@reduxjs/toolkit'
import {AxiosResponse} from 'axios'
import {apiInstance} from '../../lib/axios/apiInstance.ts'
import {ILoginResponse, ILogoutResponse} from '../../types/interfaces/user.interface.ts'
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

export const logout = createAsyncThunk('user/logoutThunk', async () => {
	try {
		const response: AxiosResponse<ILogoutResponse> = await apiInstance.get('auth/logout')
		console.log(response.data)
		return response.data
	} catch (error) {
		console.error(error)
		throw new Error('Something went wrong')
	}
})

export const refreshToken = createAsyncThunk('user/refreshTokenThunk', async () => {
	try {
		const response: AxiosResponse<ILoginResponse> = await apiInstance.get('auth/refresh')
		return response.data
	} catch (error) {
		localStorage.removeItem('accessToken')
		console.error(error)
		throw new Error('Wrong credentials')
	}
})