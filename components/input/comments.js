import { useContext, useEffect, useState } from 'react';

import CommentList from './comment-list';
import NewComment from './new-comment';
import classes from './comments.module.css';
import NotificationContext from '../../store/notification-context';

export default function Comments(props) {
  const { eventId } = props;

  const [showComments, setShowComments] = useState(false);
  const [commentData, setCommentData] = useState([]);
  const [isFetching, setIsFetching] = useState(false)

  const notifcationCtx = useContext(NotificationContext)

  useEffect(() => {
    
    if(showComments){
      // notifcationCtx.showNotification({
      //   title: 'Loading comments...',
      //   message: 'Please wait while the comments are being loaded.',
      //   status : 'pending'
      // })
      setIsFetching(true)

      fetch(`/api/comments/${eventId}`,{
        method :'GET'
      })
        .then((response) => response.json())
        .then((data) => {
          setCommentData(data.comments)
          // notifcationCtx.hideNotification()
          setIsFetching(false)
        }); 
    }
  
   
  }, [showComments])
  

  function toggleCommentsHandler(id) {
    setShowComments((prevStatus) => !prevStatus)

  }

  function addCommentHandler(commentData) {

    const {email,name,comment} = commentData

    const reqBody = { eventId: eventId, email: email, name: name, comment: comment };

    notifcationCtx.showNotification({
      title: 'Adding Comment...',
      message: 'Your comment is being posted',
      status : 'pending'
    })

    fetch('/api/comments', {
      method: 'POST',
      body: JSON.stringify(reqBody),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if(response.ok){
          return response.json()
        }
         return response.json().then((data) =>{
          throw new Error(data.message || 'Something went wrong!')
         })
      })
      .then((data) => {
        notifcationCtx.showNotification({
          title: 'Comment Added!',
          message: 'Your comment has been posted successfully!',
          status : 'success'
        })
      }).catch((error)=>{
        notifcationCtx.showNotification({
          title: 'Failed to Add Comment!',
          message:  'Something went wrong!',
          status : 'error'
        })
      })

    // fetch('/api/comments', {
    //   method: 'POST',
    //   body: JSON.stringify(reqBody),
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    // })
    //   .then((response) => response.json())
    //   .then((data) => console.log(data))

  }

  return (
    <section className={classes.comments}>
      <button onClick={toggleCommentsHandler}>
        {showComments ? 'Hide' : 'Show'} Comments
      </button>
      {showComments && <NewComment onAddComment={addCommentHandler} />}
      {showComments && isFetching ? <p>Loading...</p> : <CommentList commentData={commentData} />}
    </section>
  );
}


