import {FC} from 'react'
import {IComment} from '../../types/interfaces/comment.interface.ts'
import {Comment} from '../Comment/Comment.tsx'
import {Divider} from '../Divider/Divider.tsx'
import styles from '../TaskCard/TaskCard.module.scss'

interface Props {
	comments: IComment[] | undefined
}


export const Comments: FC<Props> = ({comments}) => {
	return (
		<>
			<Divider />
			<span>Conversation: </span>
			<div className={styles.comments}>
				{comments?.length && comments.map(comment => <Comment
					key={comment.id} comment={comment} />)}
			</div>
		</>
	)
}