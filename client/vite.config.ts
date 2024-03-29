import react from '@vitejs/plugin-react'
import * as dns from 'dns'
import {defineConfig} from 'vite'

dns.setDefaultResultOrder('verbatim')

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	server: {
		host: 'localhost',
		port: 3000,
	},
	css: {
		preprocessorOptions: {
			scss: {
				additionalData: '@import "src/app/styles/_variables.scss"; @import "src/app/styles/_functions.scss";',
			},
		},
	},
})
