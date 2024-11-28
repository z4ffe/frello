// @ts-ignore
import {ToolkitStore} from '@reduxjs/toolkit/dist/configureStore'
import axios from 'axios'

let store: ToolkitStore
const BASE_URL = import.meta.env.VITE_API_URL

export const injectStore = (_store: ToolkitStore) => {
	store = _store
}

export const apiInstance = axios.create({
	baseURL: BASE_URL,
	withCredentials: true,
})

apiInstance.interceptors.request.use(request => {
	const accessToken = store.getState().user.token
	request.headers.authorization = `Bearer ${accessToken}`
	return request
})