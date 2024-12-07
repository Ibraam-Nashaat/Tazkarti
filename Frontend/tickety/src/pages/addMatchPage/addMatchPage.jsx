import React, { useState, useEffect } from "react";
import "./MatchDialog.css";

const AddMatch = ({ onSubmit, matchData, loadTeams, loadStadiums }) => {
  const [dialog, setDialog] = useState(false);
  const [homeTeam, setHomeTeam] = useState(matchData.homeTeam || "");
  const [awayTeam, setAwayTeam] = useState(matchData.awayTeam || "");
  const [venue, setVenue] = useState(matchData.venue || "");
  const [dateTime, setDateTime] = useState(matchData.dateTime || "");
  const [mainReferee, setMainReferee] = useState(matchData.mainReferee || "");
  const [firstLinesman, setFirstLinesman] = useState(matchData.firstLinesman || "");
  const [secondLinesman, setSecondLinesman] = useState(matchData.secondLinesman || "");
  const [ticketPrice, setTicketPrice] = useState(matchData.ticketPrice || "");
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
      venue,
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
      <button onClick={() => setDialog(true)} className="btn">
        Add Match
      </button>
      {dialog && (
        <div className="dialog">
          <form className="form" onSubmit={handleSubmit}>
            <h2 className="dialog-title">Add Match</h2>
            {error && <p className="error">{error}</p>}
            <div className="form-group">
              <label>Home Team</label>
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
              <label>Away Team</label>
              <select
                value={awayTeam}
                onChange={(e) => setAwayTeam(e.target.value)}
                required
              >
                <option value="" disabled>
                  Select Away Team
                </option>
                {teams.map((team) => (
                  <option key={team.name} value={team.name}>
                    {team.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>Venue</label>
              <select
                value={venue}
                onChange={(e) => setVenue(e.target.value)}
                required
              >
                <option value="" disabled>
                  Select Venue
                </option>
                {stadiums.map((stadium) => (
                  <option key={stadium.name} value={stadium.name}>
                    {stadium.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>Date & Time</label>
              <input
                type="datetime-local"
                value={dateTime}
                onChange={(e) => setDateTime(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Main Referee</label>
              <input
                type="text"
                value={mainReferee}
                onChange={(e) => setMainReferee(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>First Linesman</label>
              <input
                type="text"
                value={firstLinesman}
                onChange={(e) => setFirstLinesman(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Second Linesman</label>
              <input
                type="text"
                value={secondLinesman}
                onChange={(e) => setSecondLinesman(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Ticket Price</label>
              <input
                type="number"
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
      )}
    </div>
  );
};

export default AddMatch;
