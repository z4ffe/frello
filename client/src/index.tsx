import * as React from 'react'
import * as ReactDOM from 'react-dom/client'
import './assets/styles/index.scss'
import {Frello} from './Frello'

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<Frello />
	</React.StrictMode>,
)
