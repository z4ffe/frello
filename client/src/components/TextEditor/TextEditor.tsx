import {Editor, EditorContent, useEditor} from '@tiptap/react'
import {StarterKit} from '@tiptap/starter-kit'

const extensions = [StarterKit]

export const TextEditor = () => {
	const content = '<p>Hello World!</p>'

	const editor = useEditor({
		extensions,
		content,
	}) as Editor


	return (
		<div>
			<EditorContent editor={editor} />
		</div>
	)
}