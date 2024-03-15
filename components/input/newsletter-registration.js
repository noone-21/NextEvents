import {  useContext, useRef } from 'react';
import classes from './newsletter-registration.module.css';
import NotificationContext from '../../store/notification-context';

export default function NewsletterRegistration() {

  const emailInputRef = useRef()

  const notifcationCtx = useContext(NotificationContext)

  function registrationHandler(event) {
    event.preventDefault()

    const enteredEmail = emailInputRef.current.value

    const reqBody = { email: enteredEmail }

    notifcationCtx.showNotification({
      title: 'Signing Up...',
      message: 'Your request is being processed',
      status : 'pending'
    })

    fetch('/api/newsletter', {
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
          title: 'Signed Up!',
          message: 'You have successfully signed up to our newsletter.',
          status : 'success'
        })
      }).catch((error)=>{
        notifcationCtx.showNotification({
          title: 'Failed to Signup!',
          message:  'Something went wrong!',
          status : 'error'
        })
      })
  }

  return (
    <section className={classes.newsletter}>
      <h2>Sign up to stay updated!</h2>
      <form onSubmit={registrationHandler}>
        <div className={classes.control}>
          <input
            type='email'
            id='email'
            ref={emailInputRef}
            placeholder='Your email'
            aria-label='Your email'
          />
          <button type='submit' >Register</button>
        </div>
      </form>
    </section>
  );
}

