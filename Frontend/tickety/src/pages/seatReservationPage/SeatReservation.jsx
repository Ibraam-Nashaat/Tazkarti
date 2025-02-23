import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './SeatReservation.css';
import { Grid } from '@mui/system';
import Col from 'react-bootstrap/Col'; // Ensure this is installed
import NavBar from '../../components/Navbar';
import Button from '@mui/material/Button';
import CreditCardModal from '../../components/CreditCardModal ';
import { useState } from 'react';
import FanService from '../../services/FanService';
import MatchService from '../../services/MatchService';
function SeatReservation() {
  const location = useLocation();
  //   const location = useLocation();
  const [match, setMatch] = useState(location.state.clickedMatch || null); // Initialize with a safe default
  // Extract properties from match
  const seatRows = match.seatRows;
  const seatsPerRow = match.seatsPerRow;
  function convertReservedSeats(reservedSeats, seatsPerRow) {
    console.log(match.reservedSeats, reservedSeats);
    return reservedSeats.map((seatNumber) => {
      const row = Math.ceil(seatNumber / seatsPerRow); // Calculate row number
      const seat = seatNumber % seatsPerRow; // Calculate seat number in the row
      return `R${row}-S${seat}`; // Return formatted string
    });
  }
  const [reservedSeats, setReservedSeats] = useState(
    convertReservedSeats(match.reservedSeats, seatsPerRow)
  );
  const seats = generateSeats(seatRows, seatsPerRow);

  const [seatAvailable, setSeatAvailable] = React.useState(
    seats.filter((seat) => !reservedSeats.includes(seat))
  );
  useEffect(() => {
    const fetchMatchData = async () => {
      try {
        const matchService = new MatchService();
        console.log('Match ID is', match.matchId);
        const id = match.matchId;
        const matchData = await matchService.getMatchById(id);
        console.log('Fetched match data:', matchData);
  
        setMatch(matchData);
  
        // Update reservedSeats with the new seat
        const seatNumber = matchData.reservedSeats[matchData.reservedSeats.length - 1];
        const row = Math.ceil(seatNumber / seatsPerRow); // Calculate row number
        const seat = seatNumber % seatsPerRow; // Calculate seat number in the row
        setReservedSeats((prevReserved) => [...prevReserved, `R${row}-S${seat}`]);
      } catch (error) {
        console.error('Error fetching match data:', error);
      }
    };
  
    fetchMatchData();
  }, []); // Add dependencies to ensure proper reactivity
  
  const [seatReserved, setSeatReserved] = React.useState([]);
  const [selectedSeat, setSelectedSeat] = useState(null);

  function generateSeats(rowCount, seatsPerRow) {
    const seats = [];
    for (let row = 1; row <= rowCount; row++) {
      for (let seat = 1; seat <= seatsPerRow; seat++) {
        seats.push(`R${row}-S${seat}`);
      }
    }
    return seats;
  }

  function onClickData(seat) {
    if (selectedSeat === seat) {
      // Cancel the reservation if the same seat is clicked again
      setSeatAvailable([...seatAvailable, seat]);
      setSeatReserved(seatReserved.filter((res) => res !== seat));
      setSelectedSeat(null); // Reset the selected seat
    } else {
      // If another seat is already selected, do nothing or alert the user
      if (selectedSeat !== null) {
        alert(
          'You can only reserve one seat at a time. Please cancel the current reservation.'
        );
        return;
      }

      // Reserve the seat if it's not already reserved
      setSelectedSeat(seat);
      console.log(seat);
      setSeatReserved([seat]);
      setSeatAvailable(
        seatAvailable.filter((availableSeat) => availableSeat !== seat)
      );
    }
  }

  return (
    <>
      <NavBar />
      <div>
        <h1>Seat Reservation System</h1>
        <h2>
          {match.homeTeamName} vs {match.awayTeamName}
        </h2>
        <DrawGrid
          seats={seats}
          available={seatAvailable}
          reserved={reservedSeats}
          setReservedSeats={setReservedSeats}
          selected={seatReserved}
          selectedSeat={selectedSeat}
          setSelectedSeat={setSelectedSeat}
          onClickData={onClickData}
          match={match}
        />
      </div>
    </>
  );
}

function DrawGrid({
  seats,
  available,
  reserved,
  setReservedSeats,
  selected,
  setSelectedSeat,
  selectedSeat,
  onClickData,
  match,
}) {
  function generateRows() {
    const rows = seats.reduce((acc, seat) => {
      const rowLabel = seat.split('-')[0]; // Extract "Row N"

      if (!acc[rowLabel]) acc[rowLabel] = [];
      acc[rowLabel].push(seat);
      return acc;
    }, {});

    return Object.keys(rows).map((row) => (
      <tr key={row}>
        {rows[row].map((seat) => (
          <td
            key={seat}
            className={
              reserved.includes(seat)
                ? 'reserved'
                : selected.includes(seat)
                ? 'selected'
                : available.includes(seat)
                ? 'available'
                : ''
            }
            onClick={reserved.includes(seat) ? null : () => onClickData(seat)}
          >
            {seat}
          </td>
        ))}
      </tr>
    ));
  }
  const fanService = new FanService();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleReservation = async (creditCardNumber, pin) => {
    function getRowAndSeat(seat) {
      const [row, seatNumber] = seat.split('-'); // Split the seat string into row and seat parts
      const rowIndex = parseInt(row.replace('R', ''), 10); // Remove "R" and convert to integer
      const seatIndex = parseInt(seatNumber.replace('S', ''), 10); // Remove "S" and convert to integer

      return { rowIndex, seatIndex }; // Return both row and seat indexes
    }
    const { rowIndex, seatIndex } = getRowAndSeat(selectedSeat);
    const seatDetails = {
      matchId: match.matchId,
      seatNumber: (rowIndex - 1) * match.seatsPerRow + seatIndex,
      creditCardNumber: creditCardNumber,
      pinNumber: pin,
    };
    try {
      const response = await fanService.addReservation(seatDetails);
      const handleReservation = (rowIndex, seatIndex) => {
        setReservedSeats((prevReserved) => {
          // Create a new array with the updated reserved seats
          const newReservedSeats = [...prevReserved, `R${rowIndex}-S${seatIndex}`];
          return newReservedSeats; // Return the new array
        });
      };
      handleReservation(rowIndex,seatIndex);
      setSelectedSeat(null);
      toast.success('Reservation added successfully!');
      setError('');
    } catch (error) {
      setError(error.message);
    }
  };
  const handleSubmited = () => {
    if (selectedSeat != null) {
      setOpen(true);
    }
  };

  return (
    <>
      <Grid container>
        <Grid item xs={12}>
          <Col>
            <table className="grid">
              <tbody>{generateRows()}</tbody>
            </table>
            {localStorage.getItem('role') === 'FAN' && (
              <Button
                variant="contained"
                size="large"
                sx={{ marginTop: '16px', backgroundColor: '#2e7d32' }}
                onClick={handleSubmited}
              >
                Book Ticket
              </Button>
            )}
          </Col>
        </Grid>
      </Grid>
      <CreditCardModal
        open={open}
        onClose={handleClose}
        onSubmit={handleReservation}
      />
    </>
  );
}

export default SeatReservation;
