import {createAsyncThunk} from '@reduxjs/toolkit'
import {projectService} from '../../services/projectService.ts'

export const getAllProjects = createAsyncThunk('projects/getAllProjects', async () => {
	try {
		return await projectService.getAllProjects()
	} catch (error) {
		console.error(error)
	}
})