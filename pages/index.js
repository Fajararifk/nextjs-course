import Head from "next/head";
import { MongoClient } from "mongodb";
import MeetupList from "@/components/meetups/MeetupList";
import { Fragment } from "react";
//import { useEffect, useState } from "react";

const DUMMY_MEETUPS = [{
  id: 'm1',
  title: 'A First Meetup',
  image: 'https://upload.wikimedia.org/wikipedia/commons/8/87/Jerusalem-2013-Temple_Mount-Al-Aqsa_Mosque_%28NE_exposure%29.jpg',
  address: 'Some address 5, 12345 Some City',
  description: 'This is a first meetup!'
},
{
  id: 'm2',
  title: 'The Second Meetup',
  image: 'https://upload.wikimedia.org/wikipedia/commons/8/87/Jerusalem-2013-Temple_Mount-Al-Aqsa_Mosque_%28NE_exposure%29.jpg',
  address: 'Some address 5, 12345 Some City',
  description: 'The second!'
}]

export default function HomePage(props) {
  // const [loadedMeetups, setLoadedMeetups] =useState([])
  
  // useEffect(() => {
  //   setLoadedMeetups(DUMMY_MEETUPS);
  // }, [])
  return (
    <Fragment>
      <Head>
        <title>React Meetups</title>
        <meta name="description" content="Browse a huge a list of highly active React meetups!"></meta>
      </Head>
      <MeetupList meetups={props.meetups}></MeetupList> 
    </Fragment>
  )
}

// export async function getServerSideProps(context) {
  
//   const req = context.req;
//   const res = context.res;
  
//   return {
//     props : DUMMY_MEETUPS
//   }
// }

export async function getStaticProps() {

  const client = await MongoClient.connect('mongodb+srv://khamdiyahk:ru0tbdIM3HbfzRDy@cluster0.0fpjijh.mongodb.net/?retryWrites=true&w=majority')
  const db = client.db();

  const meetupCollection = db.collection('meetups')

  const meetups = await meetupCollection.find().toArray();
  //fetch('/api/meetups');
  client.close()

  return {
    props : {
      meetups: meetups.map(meetup =>({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        id: meetup._id.toString() 
      }))
    },
    revalidate: 1
  }
}