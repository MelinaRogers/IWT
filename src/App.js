import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ShowList from './components/features/showlist/ShowList';
import FullStatsPage from './components/features/showlist/FullStatsPage';
import './App.css';

const App = () => {
  const [shows, setShows] = useState([]);

  useEffect(() => {
    // Fetch the CSV file from the public folder
    fetch('/show_db.csv')
      .then((response) => response.text())
      .then((data) => {
        // Parse the CSV data using Papa Parse
        const parsedData = Papa.parse(data, {
          header: true,
          transformHeader: (header) => header.trim(),
          transform: (value) => value.trim(),
        }).data;

        // Convert the 'SN' column to a number
        const transformedData = parsedData.map((show) => ({
          ...show,
          SN: parseInt(show.SN, 10),
        }));

        setShows(transformedData);
      })
      .catch((error) => {
        console.error('Error fetching or parsing CSV:', error);
      });
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<ShowList shows={shows} />} />
        <Route path="/full-stats" element={<FullStatsPage shows={shows} />} />
      </Routes>
    </Router>
  );
};

export default App;
