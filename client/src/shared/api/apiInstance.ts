import {Store} from '@reduxjs/toolkit'
import axios from 'axios'

const BASE_URL = import.meta.env.VITE_API_URL

let store: Store

export const injectStore = (_store: Store) => {
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