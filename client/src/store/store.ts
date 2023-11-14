import {configureStore} from '@reduxjs/toolkit'
import {projects} from './projects/projectsSlice.ts'


export const store = configureStore({
	reducer: {
		projects,
	},
})

export type RootState = ReturnType<typeof store.getState>