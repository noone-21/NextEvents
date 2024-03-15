import Head from 'next/head'

import { useEffect, useState } from 'react';
 import { getFeaturedEvents } from '../helpers/api-util';
 import NewsLetterRegistration from '../components/input/newsletter-registration'
import useSWR from 'swr';

import EventList from "../components/events/event-list"
// import { getFeaturedEvents } from "../dummy-data"

export default function HomePage(props) {

    // const featuredEvents = getFeaturedEvents()

    const {events} = props

    return (
        <div>
            <Head>
                <title>NextEvents</title>
                <meta name='description' content='Explore lots of great events that allow you to evolve..' />
            </Head>
            <NewsLetterRegistration />
            <EventList items={events} />
        </div>
    )
}

export async function getStaticProps() {
    const featuredEvents = await getFeaturedEvents()

    return {
        props :{
            events : featuredEvents
        },
        revalidate : 1800
    }
}