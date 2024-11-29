import {Underline} from '@tiptap/extension-underline'
import {Editor, EditorContent, useEditor} from '@tiptap/react'
import {StarterKit} from '@tiptap/starter-kit'
import {FC} from 'react'
import {Divider} from '../../ui/Divider/Divider.tsx'
import {EditorMenu} from './Menu/EditorMenu.tsx'
import styles from './textEditor.module.scss'

interface Props {
	handleDescription: any
	content?: any
}

const extensions = [StarterKit, Underline]
export const TextEditor: FC<Props> = ({handleDescription, content}) => {
	const parsedContent = content ? JSON.parse(content) : ''
	const editor = useEditor({
		extensions, content: parsedContent, onUpdate: () => handleEditorInput(),
	}) as Editor

	const handleEditorInput = () => {
		const text = JSON.stringify(editor.getJSON())
		handleDescription(text)
	}

	if (!editor) {
		return null
	}

	return (
		<div className={styles.textEditor}>
			<EditorMenu editor={editor} />
			<Divider />
			<EditorContent editor={editor} />
		</div>
	)
}