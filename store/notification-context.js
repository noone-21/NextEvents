import { createContext, useEffect, useState } from "react";


const NotificationContext = createContext({
    notification: null,
    showNotification: (notificatinData) => { },
    hideNotification: () => { }
})

export function NotificationContextProvider(props) {

    const [activeNotification, setActiveNotification] = useState()

    useEffect(() => {
      
        if(activeNotification && 
            (activeNotification.status === 'success' ||
             activeNotification.status === 'error' ) 
             ){
                const timer = setTimeout(() => {
                    hideNotificationHandler()
                }, 2000)

                return () =>{
                    clearTimeout(timer)
                }
             }

    }, [activeNotification])
    

    const showNotificationHandler = (notificatinData)=>{
        setActiveNotification(notificatinData)
    }

    const hideNotificationHandler = ()=>{
        setActiveNotification(null)
    }

    const context ={
        notification: activeNotification,
        showNotification : showNotificationHandler,
        hideNotification: hideNotificationHandler
    }

    return (
        <NotificationContext.Provider value={context} >
            {props.children}
        </NotificationContext.Provider>
    )
}

export default NotificationContext