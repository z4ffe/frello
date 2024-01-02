import {createSlice} from '@reduxjs/toolkit'
import {ITokenPayload} from '../../types/interfaces/user.interface.ts'
import {jwtDecode} from '../../utils/jwtDecode.ts'
import {login, refreshToken} from './userThunks.ts'

interface IUserSlice {
	isAuth: boolean
	token: string
	id: null | number
	username: string
	role: string
	avatar: string
	saveSession: boolean
	loading: boolean
}

const initState: IUserSlice = {
	isAuth: false,
	token: '',
	id: null,
	username: '',
	role: '',
	avatar: '',
	saveSession: false,
	loading: false,
}

const userSlice = createSlice({
	name: 'user',
	initialState: initState,
	reducers: {
		logoutUser: () => initState,
		handleSaveSession: (state, action) => {
			state.saveSession = action.payload
		},
	},
	extraReducers: builder => {
		builder.addCase(login.pending, (state) => {
			state.loading = true
		})
		builder.addCase(login.fulfilled, (state, action) => {
			const tokenPayloadData: ITokenPayload = JSON.parse(jwtDecode(action.payload.accessToken))
			if (state.saveSession) {
				localStorage.setItem('accessToken', action.payload.accessToken)
			}
			if (tokenPayloadData) {
				state.id = tokenPayloadData.userId
				state.username = tokenPayloadData.username
				state.role = tokenPayloadData.role
				state.token = action.payload.accessToken
				state.avatar = tokenPayloadData.avatar
				state.isAuth = true
			}
			state.loading = false
		})
		builder.addCase(login.rejected, (state) => {
			state.loading = false
		})
		builder.addCase(refreshToken.pending, (state) => {
			state.loading = true
		})
		builder.addCase(refreshToken.fulfilled, (state, action) => {
			const tokenPayloadData: ITokenPayload = JSON.parse(jwtDecode(action.payload.accessToken))
			if (tokenPayloadData) {
				state.id = tokenPayloadData.userId
				state.username = tokenPayloadData.username
				state.role = tokenPayloadData.role
				state.token = action.payload.accessToken
				state.avatar = tokenPayloadData.avatar
				state.isAuth = true
			}
			localStorage.setItem('accessToken', action.payload.accessToken)
			state.loading = false
		})
		builder.addCase(refreshToken.rejected, (state) => {
			state.loading = false
		})
	},
})

export const userReducer = userSlice.reducer
export const userActions = userSlice.actions