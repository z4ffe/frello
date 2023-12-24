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
		projectAdd: boolean
		projectEdit: number | null
		assign: number | null
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
		projectAdd: false,
		projectEdit: null,
		assign: null,
	},
}


const uiSlice = createSlice({
	name: 'ui',
	initialState: initState,
	reducers: {
		addProject: (state) => {
			state.modal.isOpen = true
			state.modal.projectAdd = true
		},
		edit: (state, action: PayloadAction<number>) => {
			state.modal.isOpen = true
			state.modal.projectEdit = action.payload
		},
		changeTasksLayout: (state) => {
			state.tasksLayout = !state.tasksLayout
		},
		searchOn: (state) => {
			state.search = true
		},
		searchOff: (state) => {
			state.search = false
		},
		openUserAssign: (state, action: PayloadAction<number>) => {
			state.modal.isOpen = true
			state.modal.assign = action.payload
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