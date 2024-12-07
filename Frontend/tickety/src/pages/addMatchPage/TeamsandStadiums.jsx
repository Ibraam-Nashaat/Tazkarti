const TEAMS = [
    { name: "Al Ahly" },
    { name: "Zamalek" },
    { name: "Pyramids FC" },
    { name: "Ismaily" },
    { name: "Al Masry" },
    { name: "Smouha" },
    { name: "El Gouna" },
    { name: "ENPPI" },
    { name: "Zed FC" },
    { name: "Ghazl El-Mahalla" },
    { name: "Ceramica Cleopatra" },
    { name: "Modern Sport" },
    { name: "Pharco SC" },
    { name: "Tala'ea El Gaish" },
    { name: "Petrojet" },
    { name: "National Bank" },
    { name: "Harras Hodoud"},
    { name: "ittihad Alex"}
  ];
  
  const STADIUMS = [
    { name: "Cairo International Stadium" },
    { name: "Borg El Arab Stadium" },
    { name: "Al Ahly Stadium" },
    { name: "Suez Stadium" },
    { name: "Ismailia Stadium" },
    { name: "PetroSport Stadium" },
    { name: "El Gouna Stadium" },
    { name: "El Mahalla Stadium" },
  ];
  
  export const loadTeams = async () => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(TEAMS), 1000);
    });
  };
  
  export const loadStadiums = async () => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(STADIUMS), 1000);
    });
  };
  