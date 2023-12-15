import {createSlice, PayloadAction} from '@reduxjs/toolkit'

interface IUISlice {
	search: boolean,
	tasksLayout: boolean
	modal: {
		isOpen: boolean
		login: boolean
		register: boolean
		task: number | null
		taskAdd: boolean
		taskEdit: boolean
	}
}

const initState: IUISlice = {
	search: false,
	tasksLayout: false,
	modal: {
		isOpen: false,
		login: false,
		register: false,
		task: null,
		taskAdd: false,
		taskEdit: false,
	},
}


const uiSlice = createSlice({
	name: 'ui',
	initialState: initState,
	reducers: {
		changeTasksLayout: (state) => {
			state.tasksLayout = !state.tasksLayout
		},
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
		openAddTaskModal: (state) => {
			state.modal.isOpen = true
			state.modal.taskAdd = true
		},
		openEditTaskModal: (state, action: PayloadAction<number>) => {
			state.modal.isOpen = true
			state.modal.task = action.payload
			state.modal.taskEdit = true
		},
		resetState: () => initState,
	},
})

export const uiReducer = uiSlice.reducer
export const uiActions = uiSlice.actions