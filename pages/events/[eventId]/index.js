import { useRouter } from "next/router"
import { getEventById } from "../../../dummy-data"
import { Fragment } from "react"
import EventSummary from "../../../components/event-detail/event-summary"
import EventLogistics from "../../../components/event-detail/event-logistics"
import EventContent from "../../../components/event-detail/event-content"
import ErrorAlert from "../../../components/ui/error-alert"
import Button from "../../../components/ui/button"

export default function EventDetailPage() {

    const router = useRouter()
    console.log(router)

    const eventId = router.query.eventId
    console.log(eventId)

    const event = getEventById(eventId)
    console.log(event)
    if (!event) {
        return <ErrorAlert>
            <p>Event not Found!</p>
        </ErrorAlert>
    }

    return (
        <Fragment>
            <EventSummary title={event.title} />
            <EventLogistics
                date={event.date}
                image={event.image}
                address={event.location}
                imageAlt={event.title}
            />
            <EventContent>
                <p> {event.description} </p>
            </EventContent>
        </Fragment>
    )
}