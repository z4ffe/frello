import {Underline} from '@tiptap/extension-underline'
import {Editor} from '@tiptap/react'
import {StarterKit} from '@tiptap/starter-kit'
import {validateJSON} from './validateJSON.ts'

const extensions = [StarterKit, Underline]

export const convertEditorText = (content: string): string => {
	const isJson = validateJSON(content)
	if (!isJson) {
		return 'No description'
	}
	const parsedContent = JSON.parse(content)
	const editor = new Editor({content: parsedContent, extensions})
	return editor.getText()
}