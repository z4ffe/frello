import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {IProject} from '../../types/interfaces/project.interface.ts'

interface IProjectsSlice {
	id: number | null
	name: string
	createdAt: string
	updatedAt: string
	authorId: {
		id: number | null
		username: string
	},
}

const initState: IProjectsSlice = {
	id: null,
	name: '',
	createdAt: '',
	updatedAt: '',
	authorId: {
		id: null,
		username: '',
	},
}

const projectsSlice = createSlice({
	name: 'projects',
	initialState: initState,
	reducers: {
		setProject: (_, action: PayloadAction<IProject>) => {
			if (action.payload satisfies IProject)
				return action.payload
		},
	},
	extraReducers: {},
})

export const projectsReducer = projectsSlice.reducer
export const projectsActions = projectsSlice.actions