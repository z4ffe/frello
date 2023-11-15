import {createSlice} from '@reduxjs/toolkit'

const projectsSlice = createSlice({
	name: 'projects',
	initialState: {},
	reducers: {},
	extraReducers: {},
})

export const projectsReducer = projectsSlice.reducer
export const projectsActions = projectsSlice.actions