import {Editor} from '@tiptap/react'
import {FC} from 'react'
import {MenuButtons} from '../Buttons/Buttons.tsx'
import styles from './editorMenu.module.scss'

interface Props {
	editor: Editor
}

export const EditorMenu: FC<Props> = ({editor}) => {
	return (
		<div className={styles.editorMenu}>
			<MenuButtons type='RotateLeft'
							 handler={() => editor.chain().focus().undo().run()}
							 disabled={!editor.can().undo()} />
			<MenuButtons type='RotateRight'
							 handler={() => editor.chain().focus().redo().run()}
							 disabled={!editor.can().redo()} />
			<MenuButtons type='Bold'
							 handler={() => editor.chain().focus().toggleBold().run()}
							 isActive={editor.isActive('bold')} />
			<MenuButtons type='Italic'
							 handler={() => editor.chain().focus().toggleItalic().run()}
							 isActive={editor.isActive('italic')} />
			<MenuButtons type='Underline'
							 handler={() => editor.chain().focus().toggleUnderline().run()}
							 isActive={editor.isActive('underline')} />
			<MenuButtons type='Strikethrough'
							 handler={() => editor.chain().focus().toggleStrike().run()}
							 isActive={editor.isActive('strikethrough')} />
			<MenuButtons type='Code'
							 handler={() => editor.chain().focus().toggleCode().run()}
							 isActive={editor.isActive('code')} />
		</div>
	)
}