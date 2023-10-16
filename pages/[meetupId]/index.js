import Head from "next/head";
const { Fragment } = require("react");

import { MongoClient, ObjectId } from "mongodb";
import MeetupDetail from "@/components/meetups/MeetupDetail";

function MeetupDetails(props){
    return (
        <Fragment>
            <Head>
                <title>{props.meetupData.title}</title>
                <meta name="description" content={props.meetupData.description}></meta>
            </Head>
            <MeetupDetail 
                    image ={props.meetupData.image}
                    title = {props.meetupData.title}
                    address = {props.meetupData.address}
                    description = {props.meetupData.description}
                    // image = "https://upload.wikimedia.org/wikipedia/commons/8/87/Jerusalem-2013-Temple_Mount-Al-Aqsa_Mosque_%28NE_exposure%29.jpg"
                    // title = "A first meetup"
                    // address = "Some Street 5, Some City"
                    // description = "The meetup description"
                    />
        </Fragment>
        

        // <Fragment>
        //     <img src="https://upload.wikimedia.org/wikipedia/commons/8/87/Jerusalem-2013-Temple_Mount-Al-Aqsa_Mosque_%28NE_exposure%29.jpg" alt="A First Meet Up"/>
        //     <h1>A first meetup</h1>
        //     <address>Some Street 5, Some City</address>
        //     <p>The meetup description</p>
        // </Fragment>
    )
}

export default MeetupDetails;


export async function getStaticPaths(){

    const client = await MongoClient.connect('mongodb+srv://khamdiyahk:ru0tbdIM3HbfzRDy@cluster0.0fpjijh.mongodb.net/?retryWrites=true&w=majority')
    const db = client.db();
  
    const meetupCollection = db.collection('meetups')
  
    const meetups = await meetupCollection.find({}, {_id:1}).toArray();

    client.close()
    return {
        fallback: false, // auto pregenerate when have request
        paths: meetups.map(meetup => ({
            params : {meetupId: meetup._id.toString()}}))
        
        // [
        //     {
        //         params :{
        //             meetupId: 'm1'
        //         },
        //     },
        //     {
        //         params: {
        //             meetupId: 'm2'
        //         }
        //     }
        // ]
    }
}

export async function getStaticProps(context) {

const meetupId = context.params.meetupId;
//console.log(meetupId)
const client = await MongoClient.connect('mongodb+srv://khamdiyahk:ru0tbdIM3HbfzRDy@cluster0.0fpjijh.mongodb.net/?retryWrites=true&w=majority')
    const db = client.db();
  
    const meetupCollection = db.collection('meetups')
  
    const selectedMeetups = await meetupCollection.findOne({_id:ObjectId(meetupId)}).toArray();

    client.close()
  return {
    props : {
        meetupData: selectedMeetups
    //   meetups: {
    //     image: "https://upload.wikimedia.org/wikipedia/commons/8/87/Jerusalem-2013-Temple_Mount-Al-Aqsa_Mosque_%28NE_exposure%29.jpg",
    //     title: "A first meetup",
    //     address: "Some Street 5, Some City",
    //     description: "The meetup description"
    //   }
    },
    revalidate: 1
  }
}