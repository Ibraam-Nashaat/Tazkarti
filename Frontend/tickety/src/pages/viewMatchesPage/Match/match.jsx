import React, { useState } from "react";
import "./match.css";
import LocationOnIcon from "@mui/icons-material/LocationOnOutlined";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
const Match = ({
  id,
  dateTime,
  firstLinesman,
  mainReferee,
  secondLinesman,
  ticketPrice,
  awayTeam,
  homeTeam,
  stadium,
  onClick
}
) => {
  const formatDateTime = (dateTime) => {
    const [date, time] = dateTime.split("T"); // Split by 'T'
    return { date, time };
  };

  const { date, time } = formatDateTime(dateTime);
  return (
    <div className="match-container " onClick={onClick}>
        <div className="team-info">
      <div className="team-name-first">{homeTeam}</div>
      <div className="team-seperator">vs</div>
      <div className="team-name-second">{awayTeam}</div>
      </div>
      <div className="match-info">
        <div className="location-container">
        <div className="location-icon">
        <LocationOnIcon className="icon"/>
        </div>

        <div className="stadium-container">{stadium}</div>
        </div>
        <div className="date-container">
            <div className="date-icon">
                <CalendarMonthIcon className="icon"/>
            </div>
            <div className="dt-wrapper">
            <div className="date">{date}</div>
            <div className="time">Time: {time}</div>
            </div>
        </div>
        <div className="date-container"></div>
      </div>
      {/* <Button
        className="book-button"
        onClick={handleBookMatch}
      >
        Book Ticket
      </Button> */}
    </div>
  );
};
export default Match;
