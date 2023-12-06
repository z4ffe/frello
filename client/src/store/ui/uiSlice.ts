import {createSlice} from '@reduxjs/toolkit'

interface IUISlice {
	search: boolean,
	modal: {
		isOpen: boolean
		login: boolean
		register: boolean
		task: boolean
	}
}

const initState: IUISlice = {
	search: false,
	modal: {
		isOpen: false,
		login: false,
		register: false,
		task: false,
	},
}


const uiSlice = createSlice({
	name: 'ui',
	initialState: initState,
	reducers: {
		searchOn: (state) => {
			state.search = true
		},
		searchOff: (state) => {
			state.search = false
		},
		openLoginModal: (state) => {
			state.modal.isOpen = true
			state.modal.login = true
		},
		openTaskModal: (state) => {
			state.modal.isOpen = true
			state.modal.task = true
		},
		resetState: () => initState,
	},
})

export const uiReducer = uiSlice.reducer
export const uiActions = uiSlice.actions