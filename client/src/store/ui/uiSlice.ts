import {createSlice} from '@reduxjs/toolkit'

interface IUISlice {
	modal: {
		isOpen: boolean
		login: boolean
		register: boolean
	}
}

const initState: IUISlice = {
	modal: {
		isOpen: false,
		login: false,
		register: false,
	},
}


const uiSlice = createSlice({
	name: 'ui',
	initialState: initState,
	reducers: {
		openLoginModal: (state) => {
			state.modal.isOpen = true
			state.modal.login = true
		},
		resetState: () => initState,
	},
})

export const uiReducer = uiSlice.reducer
export const uiActions = uiSlice.actions