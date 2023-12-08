import {FC} from 'react'
import {IComment} from '../../types/interfaces/comment.interface.ts'
import styles from './comment.module.scss'

interface Props {
	comment: IComment
}

export const Comment: FC<Props> = ({comment}) => {
	return (
		<div className={styles.comment}>
			<span>{comment.username}</span> - <span>{comment.text}</span>
			{comment.child.length ? comment.child.map(comment => <Comment comment={comment} />) : null}
		</div>
	)
}