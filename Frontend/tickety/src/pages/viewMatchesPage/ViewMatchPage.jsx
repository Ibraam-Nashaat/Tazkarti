import React, { useState } from "react";
import { useEffect } from "react";
import "./ViewMatchPage.css";
import logo from "../../assets/black_on_trans.png";
import apiGetMatches from "../../apis/MatchApis/getMatches";
import Button from "@mui/material/Button";
import Match from "./Match/match";
const ViewMatchPage = () => {
  const [matches, setMatches] = useState([]);
  const [clickedMatch, setClickedMatch] = useState();
  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const fetchedMatches = await apiGetMatches();
        console.log("Items from api", fetchedMatches);
        setMatches(fetchedMatches);
      } catch (error) {
        console.error("Error fetching Matches:", error);
      }
    };
    fetchMatches();
    // console.log('these are the Matches: ', matches);
  }, []);
  const handleBookMatch = () => {

  };
  const handleMatchClick = (match) => {
    setClickedMatch(match);
  };
  return (
    <div className="viewmatch">
      <div className="matches-container">
        {matches.map((match) => (
          <Match
            id={match.matchId}
            dateTime={match.dateTime}
            firstLinesman={match.firstLinesman}
            mainReferee={match.mainReferee}
            secondLinesman={match.secondLinesman}
            ticketPrice={match.ticketPrice}
            awayTeam={match.awayTeamName}
            homeTeam={match.homeTeamName}
            stadium={match.stadiumName}
            onClick={() => handleMatchClick(match)}
          />
        ))}
      </div>
        {clickedMatch && (
          <div className="clicked-match-details">
            <p>
              <strong>Home Team:</strong> {clickedMatch.homeTeamName}
            </p>
            <p>
              <strong>Away Team:</strong> {clickedMatch.awayTeamName}
            </p>
            <p>
              <strong>Date:</strong> {clickedMatch.dateTime.split("T")[0]}
            </p>
            <p>
              <strong>Time:</strong> {clickedMatch.dateTime.split("T")[1]}
            </p>
            <p>
              <strong>Stadium:</strong> {clickedMatch.stadiumName}
            </p>
            <p>
              <strong>Main Referee:</strong> {clickedMatch.mainReferee}
            </p>
            <p>
              <strong>First Linesman:</strong> {clickedMatch.firstLinesman}
            </p>
            <p>
              <strong>Second Linesman:</strong> {clickedMatch.secondLinesman}
            </p>
            <p>
              <strong>Ticket Price:</strong> ${clickedMatch.ticketPrice}
            </p>
            <div className="space-wrapper"></div>
             <Button
        className="book-button"
        onClick={handleBookMatch}
      >
        Book Ticket
      </Button> 
          </div>
        )}
      </div>
  );
};

export default ViewMatchPage;
