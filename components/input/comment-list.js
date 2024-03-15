import { useContext } from 'react';
import NotificationContext from '../../store/notification-context';
import classes from './comment-list.module.css';

export default function CommentList(props) {

  const { commentData } = props

  const notifcationCtx = useContext(NotificationContext)

  return (
    <ul className={classes.comments}>
      {!commentData && <p>loading...</p> }
      {commentData.map(item => <li key={item._id} >
        <p>{item.comment.comment}</p>
        <div>
          By <address>{item.comment.name}</address>
        </div>
      </li>
      )}
    </ul>
  );
}


