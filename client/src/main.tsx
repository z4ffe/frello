import React from 'react'
import ReactDOM from 'react-dom/client'
import '../src/assets/styles/index.scss'
import {Frello} from './Frello.tsx'


ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<Frello />
		<div id='modal' />
		<div id='portal' />
		<div id='search' />
	</React.StrictMode>,
)