import {createSlice} from '@reduxjs/toolkit'

const projectsSlice = createSlice({
	name: 'projects',
	initialState: {
		'id': 2,
		'name': 'Frontend',
		'createdAt': '2023-10-04T16:15:24.635Z',
		'updatedAt': '2023-10-04T16:15:24.635Z',
		'authorId': {
			'id': 1,
			'username': 'zaffe',
		},
	},
	reducers: {},
	extraReducers: {},
})

export const projectsReducer = projectsSlice.reducer
export const projectsActions = projectsSlice.actions