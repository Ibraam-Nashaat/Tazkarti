import React, { useState, useEffect } from "react";
import "./addMatchPage.css";
import { loadStadiums,loadTeams } from "./TeamsandStadiums";
import logo from "../../assets/black_on_trans.png"
const AddMatch = () => {
  const [dialog, setDialog] = useState(false);
  const [homeTeam, setHomeTeam] = useState( "");
  const [awayTeam, setAwayTeam] = useState( "");
  const [stadium, setstadium] = useState( "");
  const [dateTime, setDateTime] = useState( "");
  const [mainReferee, setMainReferee] = useState( "");
  const [firstLinesman, setFirstLinesman] = useState( "");
  const [secondLinesman, setSecondLinesman] = useState( "");
  const [ticketPrice, setTicketPrice] = useState("");
  const [teams, setTeams] = useState([]);
  const [stadiums, setStadiums] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const teamData = await loadTeams();
        const stadiumData = await loadStadiums();
        setTeams(teamData);
        setStadiums(stadiumData);
      } catch (err) {
        setError("Failed to load data");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [loadTeams, loadStadiums]);

  const validateInput = (value) => {
    return value ? true : "This field is required";
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const matchDetails = {
      homeTeam,
      awayTeam,
      stadium,
      dateTime,
      mainReferee,
      firstLinesman,
      secondLinesman,
      ticketPrice,
    };

    if (
      Object.values(matchDetails).some((field) => !validateInput(field))
    ) {
      setError("All fields are required.");
      return;
    }

    onSubmit(matchDetails);
    setDialog(false);
  };

  return (
    <div>
      {/* <button onClick={() => setDialog(true)} className="btn">
        Add Match
      </button> */}
      {/* {dialog && ( */}
        <div className="dialog">
          <form className="form" onSubmit={handleSubmit}>
            <h2 className="dialog-title">Add Match</h2>
            {error && <p className="error">{error}</p>}
            <div className="form-group">
              <label className="labelDataMatch">Home Team</label>
              <select
                value={homeTeam}
                onChange={(e) => setHomeTeam(e.target.value)}
                required
              >
                <option value="" disabled>
                  Select Home Team
                </option>
                {teams.map((team) => (
                  <option key={team.name} value={team.name}>
                    {team.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label className="labelDataMatch">Away Team</label>
              <select
                value={awayTeam}
                onChange={(e) => setAwayTeam(e.target.value)}
                required
              >
                <option value="" disabled>
                  Select Away Team
                </option>
                {teams.filter((team) => team.name !== homeTeam) .map((team) => (
                  <option key={team.name} value={team.name}>
                    {team.name}
                  </option>
                ))}
                
              </select>
            </div>
            <div className="form-group">
              <label className="labelDataMatch">Stadium</label>
              <select
                value={stadium}
                onChange={(e) => setstadium(e.target.value)}
                required
              >
                <option value="" disabled>
                  Select stadium
                </option>
                {stadiums.map((stadium) => (
                  <option key={stadium.name} value={stadium.name}>
                    {stadium.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label className="labelDataMatch">Date and Time </label>
              <input
                type="datetime-local"
                className="InputStyle"
                value={dateTime}
                onChange={(e) => setDateTime(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label className="labelDataMatch">Main Referee</label>
              <input
                type="text"
                className="InputStyle"
                value={mainReferee}
                onChange={(e) => setMainReferee(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label className="labelDataMatch">First Linesman</label>
              <input
                type="text"
                className="InputStyle"
                value={firstLinesman}
                onChange={(e) => setFirstLinesman(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label className="labelDataMatch">Second Linesman</label>
              <input
                type="text"
                className="InputStyle"
                value={secondLinesman}
                onChange={(e) => setSecondLinesman(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label className="labelDataMatch">Ticket Price</label>
              <input
                type="number"
                className="InputStyle"
                value={ticketPrice}
                onChange={(e) => setTicketPrice(e.target.value)}
                required
              />
            </div>
            <div className="form-actions">
              <button type="button" className="btn" onClick={() => setDialog(false)}>
                Close
              </button>
              <button type="submit" className="btn">
                Submit
              </button>
            </div>
          </form>
        </div>
        <div className="image-container">
                <img src={logo}  />
            </div>
   {/*  )} */}  
    </div>

  );
};

export default AddMatch;
