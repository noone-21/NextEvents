import { Fragment } from "react"
import EventList from "../../components/events/event-list"
import EventSearch from "../../components/events/event-search"
import { getAllEvents } from "../../dummy-data"
import { useRouter } from "next/router"

export default function EventsPage(){

    const router = useRouter()
    const allEvents = getAllEvents()
    
    const findEventsHandler = (year, month)=>{
        const fullPath =`/events/${year}/${month}`
        
        router.push(fullPath)
    }

    return(
        <Fragment>
            <EventSearch onSearch={findEventsHandler} /> 
           <EventList items={allEvents} />
        </Fragment>
    )
}