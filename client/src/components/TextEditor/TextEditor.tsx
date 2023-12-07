import {Underline} from '@tiptap/extension-underline'
import {Editor, EditorContent, useEditor} from '@tiptap/react'
import {StarterKit} from '@tiptap/starter-kit'
import {FC} from 'react'
import {Divider} from '../../ui/Divider/Divider.tsx'
import {EditorMenu} from './Menu/EditorMenu.tsx'
import styles from './textEditor.module.scss'

const extensions = [StarterKit, Underline]

interface Props {
	content: string
	handleContentChange: (text: string) => void
	handleSave?: () => void
}

export const TextEditor: FC<Props> = ({content, handleContentChange, handleSave}) => {
	const editor = useEditor({extensions, content, onUpdate: () => handleEditorInput()}) as Editor

	const handleEditorInput = () => {
		const text = JSON.stringify(editor.getJSON())
		handleContentChange(text)
	}

	if (!editor) {
		return null
	}

	return (
		<div className={styles.textEditor}>
			<EditorMenu editor={editor} handleSave={handleSave} />
			<Divider />
			<EditorContent editor={editor} />
		</div>
	)
}