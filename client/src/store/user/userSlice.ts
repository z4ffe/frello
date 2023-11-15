import {createSlice} from '@reduxjs/toolkit'
import {ITokenPayload} from '../../types/interfaces/user.interface.ts'
import {jwtDecode} from '../../utils/jwtDecode.ts'
import {login} from './userThunks.ts'

interface IUserSlice {
	isAuth: boolean
	token: string
	id: null | number
	username: string
	role: string
	loading: boolean
}

const initState: IUserSlice = {
	isAuth: false,
	token: '',
	id: null,
	username: '',
	role: '',
	loading: false,
}

const userSlice = createSlice({
	name: 'user',
	initialState: initState,
	reducers: {
		logoutUser: () => initState,
	},
	extraReducers: builder => {
		builder.addCase(login.pending, (state) => {
			state.loading = true
		})
		builder.addCase(login.fulfilled, (state, action) => {
			state.loading = false
			const tokenPayloadData: ITokenPayload = JSON.parse(jwtDecode(action.payload.accessToken))
			state.id = tokenPayloadData.userId
			state.username = tokenPayloadData.login
			state.role = tokenPayloadData.role
			state.token = action.payload.accessToken
			state.isAuth = true
		})
		builder.addCase(login.rejected, (state) => {
			state.loading = false
		})
	},
})

export const userReducer = userSlice.reducer
export const userActions = userSlice.actions