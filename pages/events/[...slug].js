import { useRouter } from "next/router"
// import { getFilteredEvents } from "../../helpers/api-util"
import { Fragment, useState, useEffect } from "react"
import useSWR from 'swr'
import EventList from "../../components/events/event-list"
import ResultsTitle from "../../components/events/results-title"
import Button from "../../components/ui/button"
import ErrorAlert from "../../components/ui/error-alert"
import Head from "next/head"

export default function FilteredEventsPage(props) {

    // const { date, events, hasError } = props

    const [loadedEvents, setLoadedEvents] = useState()

    const router = useRouter()
    const filterData = router.query.slug

    const { data, error } = useSWR('https://nextevents-e411e-default-rtdb.firebaseio.com/events.json', (url) => fetch(url).then(res => res.json()))

    useEffect(() => {

        console.log(data)
        if (data) {
            const events = []

            for (const key in data) {
                events.push({
                    id: key,
                    ...data[key]
                })
            }
            setLoadedEvents(events)
        }
        console.log('End')


    }, [data])


    let pageHeadData =(
        <Head>
        <title> Filtered Events </title>
        <meta name='description' content={`List of filtered events`} />
    </Head>
    )

    if (!loadedEvents) {
        return <Fragment>
            {pageHeadData}
         <p className="center" >Loading...</p>
         </Fragment>
    }

    const filteredYear = filterData[0]
    const filteredMonth = filterData[1]

    const numYear = +filteredYear
    const numMonth = +filteredMonth

    const newDate = new Date(numYear, numMonth - 1)

    const humanReadableDate = new Date(newDate).toLocaleDateString('en-US', {
        month: 'long',
        year: 'numeric',
    });

    pageHeadData = (
        <Head>
            <title> {humanReadableDate} Events </title>
            <meta name='description' content={`Explore events for ${humanReadableDate}`} />
        </Head>
    )




    if (isNaN(numYear) ||
        isNaN(numMonth) ||
        numYear > 2030 ||
        numYear < 2020 ||
        numMonth < 1 ||
        numMonth > 12 ||
        filterData.length > 2 ||
        error) {
        return <Fragment>
            {pageHeadData}
            <ErrorAlert>
                <p className="center" >Invalid Filter! Please Adjust your Values.</p>
            </ErrorAlert>
            <div className="center" >
                <Button link='/events' >Show All Events</Button>
            </div>
        </Fragment>
    }


    const filteredEvents = loadedEvents.filter((event) => {
        const eventDate = new Date(event.date);
        return eventDate.getFullYear() === numYear && eventDate.getMonth() === numMonth - 1;
    });

    // if (hasError) {
    //     return <Fragment>
    //         <ErrorAlert>
    //             <p className="center" >Invalid Filter! Please Adjust your Values.</p>
    //         </ErrorAlert>
    //         <div className="center" >
    //             <Button link='/events' >Show All Events</Button>
    //         </div>
    //     </Fragment>
    // }

    // const filteredEvents = events

    if (!filteredEvents || filteredEvents.length === 0) {
        return <Fragment>
            {pageHeadData}
            <ErrorAlert>
                <p>No Events found! Please try a different Filter.</p>
            </ErrorAlert>
            <div className="center" >
                <Button link='/events' >Show All Events</Button>
            </div>
        </Fragment>
    }


    return (
        <Fragment>
            {pageHeadData}
            <ResultsTitle date={newDate} />
            <EventList items={filteredEvents} />
        </Fragment>
    )
}

// export async function getServerSideProps(context) {
//     const { params } = context

//     const filterData = params.slug

//     const filteredYear = filterData[0]
//     const filteredMonth = filterData[1]

//     const numYear = +filteredYear
//     const numMonth = +filteredMonth

//     if (isNaN(numYear) ||
//         isNaN(numMonth) ||
//         numYear > 2030 ||
//         numYear < 2020 ||
//         numMonth < 1 ||
//         numMonth > 12 ||
//         filterData.length > 2) {
//         return {
//             props: {
//                 hasError: true
//             }
//             // notFound : true,
//             // redirect : {
//             //     destination : '/error'
//             // }
//         }
//     }

//     const filteredEvents = await getFilteredEvents({
//         year: numYear,
//         month: numMonth
//     })

//     return {
//         props: {
//             events: filteredEvents,
//             date: {
//                 year: numYear,
//                 month: numMonth
//             }
//         },
//         revalidate: 60
//     }
// }