import {Editor} from '@tiptap/react'
import {validateJSON} from './validateJSON.ts'

export const restoreEditorText = (json: string): string => {
	const isJson = validateJSON(json)
	if (!isJson) {
		return 'No description'
	}
	const editor = new Editor({content: json})
	return editor.getText()
}