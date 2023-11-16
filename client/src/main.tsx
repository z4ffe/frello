import React from 'react'
import ReactDOM from 'react-dom/client'
import '../src/assets/styles/index.scss'
import {Frello} from './Frello.tsx'


ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<Frello />
		<div id='modal'></div>
		<div id='tooltip'></div>
		<div id='search'></div>
	</React.StrictMode>,
)