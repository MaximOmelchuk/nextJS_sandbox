import React from "react";

function MeetupDetail({ src, title, address, description }) {
  return (
    <>
      <img src={src} alt={title} />
      <h1>{title}</h1>
      <address>{address}</address>
      <p>{description}</p>
    </>
  );
}

export default MeetupDetail;
