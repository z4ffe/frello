import {createSlice} from '@reduxjs/toolkit'

const projectsSlice = createSlice({
	name: 'projects',
	initialState: {},
	reducers: {},
	extraReducers: {},
})

export const projects = projectsSlice.reducer
export const projectsActions = projectsSlice.actions