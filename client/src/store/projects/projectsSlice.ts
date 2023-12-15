import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {IProject} from '../../types/interfaces/project.interface.ts'

interface IProjectsSlice {
	id: number | null
	name: string
	deadline: string
	progress: number
}

const initState: IProjectsSlice = {
	id: null,
	name: '',
	deadline: '',
	progress: 0,
}

const projectsSlice = createSlice({
	name: 'projects',
	initialState: initState,
	reducers: {
		setProject: (state, action: PayloadAction<IProject>) => {
			state.id = action.payload.id
			state.name = action.payload.name
			state.deadline = action.payload.deadline
			state.progress = action.payload.progress
		},
		resetProject: () => initState,
	},
})

export const projectsReducer = projectsSlice.reducer
export const projectsActions = projectsSlice.actions