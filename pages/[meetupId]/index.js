import { MongoClient, ObjectId } from "mongodb";
import React from "react";
import MeetupDetail from "../../components/meetups/MeetupDetail";

function MeetDetails({ meetupData }) {
  const { image, title, address, description } = meetupData;
  return (
    <>
      <MeetupDetail
        src={image}
        title={title}
        address={address}
        description={description}
      />
    </>
  );
}

export const getStaticProps = async (ctx) => {
  const { meetupId } = ctx.params;
  const client = await MongoClient.connect(
    "mongodb+srv://omelchukmaxim:6OCC50afjLQIbxV9@cluster0.ebxnto2.mongodb.net/Meetups?retryWrites=true&w=majority"
  );
  const db = client.db();
  const meetupsCollection = db.collection("Meetups");
  console.log(meetupId, "------------------------meetupIdmeetupId");
  const selectedMeetup = await meetupsCollection.findOne({
    _id: new ObjectId(meetupId),
  });

  client.close();
  return {
    props: {
      meetupData: {
        id: selectedMeetup._id.toString(),
        title: selectedMeetup.title,
        description: selectedMeetup.description,
        address: selectedMeetup.address,
        image: selectedMeetup.image,
      },
    },
  };
};

export async function getStaticPaths() {
  const client = await MongoClient.connect(
    "mongodb+srv://omelchukmaxim:6OCC50afjLQIbxV9@cluster0.ebxnto2.mongodb.net/Meetups?retryWrites=true&w=majority"
  );
  const db = client.db();
  const meetupsCollection = db.collection("Meetups");
  const meetups = await meetupsCollection.find({}, { _id: 1 }).toArray();
  client.close();

  return {
    fallback: false,
    paths: meetups.map((meetup) => ({
      params: { meetupId: meetup._id.toString() },
    })),
  };
}
export default MeetDetails;
