import { Fragment } from "react"
import EventList from "../../components/events/event-list"
import EventSearch from "../../components/events/event-search"
import { getAllEvents } from "../../helpers/api-util" 
import { useRouter } from "next/router"
import Head from "next/head"

export default function EventsPage(props){

    const {events} =props
    const router = useRouter()

    const findEventsHandler = (year, month)=>{
        const fullPath =`/events/${year}/${month}`
        
        router.push(fullPath)
    }

    return(
        <Fragment>
             <Head>
                <title>All Events</title>
                <meta name='description' content='Explore different events suitable to your prefrences..' />
            </Head>
            <EventSearch onSearch={findEventsHandler} /> 
           <EventList items={events} />
        </Fragment>
    )
}

export async function getStaticProps() {
    const allEvents = await getAllEvents()

    return {
        props :{
            events : allEvents
        },
        revalidate : 60
    }
}