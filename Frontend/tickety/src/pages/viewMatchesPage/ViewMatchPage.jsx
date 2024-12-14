import React, { useState } from "react";
import { useEffect } from 'react';
import "./ViewMatchPage.css";
import logo from "../../assets/black_on_trans.png";
import apiGetMatches from "../../apis/MatchApis/getMatches"
import Match from "./Match/match"
const ViewMatchPage = () => {
  const [matches, setMatches] = useState([]);
  useEffect(() => {
    const fetchMatches = async () => {
        try {
            const fetchedMatches = await apiGetMatches();
            console.log("Items from api",fetchedMatches)
            setMatches(fetchedMatches);
        } catch (error) {
            console.error('Error fetching Matches:', error);
        }
    };
    fetchMatches();
    // console.log('these are the Matches: ', matches);
}, []);
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
                />
            ))}
      </div>
      <div className="image-container">
        <img src={logo} />
      </div>
      {/*  )} */}
    </div>
  );
};

export default ViewMatchPage;
