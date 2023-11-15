import {configureStore} from '@reduxjs/toolkit'
import {projectsReducer} from './projects/projectsSlice.ts'
import {uiReducer} from './ui/uiSlice.ts'
import {userReducer} from './user/userSlice.ts'


export const store = configureStore({
	reducer: {
		projects: projectsReducer,
		ui: uiReducer,
		user: userReducer,
	},
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>