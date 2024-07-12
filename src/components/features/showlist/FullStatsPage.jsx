import React from 'react';
import { Link } from 'react-router-dom';
import './FullStatsPage.css';

const FullStatsPage = ({ selectedShows }) => {
  const getOccurrences = (arr, prop) => {
    const occurrences = arr.reduce((acc, item) => {
      const value = item[prop];
      acc[value] = (acc[value] || 0) + 1;
      return acc;
    }, {});

    return Object.entries(occurrences).map(([value, count]) => `${value} - ${count}`);
  };

  const getDays = (arr) => {
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const occurrences = arr.reduce((acc, item) => {
      const date = new Date(item.Date);
      const dayOfWeek = daysOfWeek[date.getDay()];
      acc[dayOfWeek] = (acc[dayOfWeek] || 0) + 1;
      return acc;
    }, {});

    return Object.entries(occurrences).map(([day, count]) => `${day} - ${count}`);
  };

  const getMonths = (arr) => {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const occurrences = arr.reduce((acc, item) => {
      const date = new Date(item.Date);
      const month = months[date.getMonth()];
      acc[month] = (acc[month] || 0) + 1;
      return acc;
    }, {});

    return Object.entries(occurrences).map(([month, count]) => `${month} - ${count}`);
  };

  const getYears = (arr) => {
    const occurrences = arr.reduce((acc, item) => {
      const year = new Date(item.Date).getFullYear();
      acc[year] = (acc[year] || 0) + 1;
      return acc;
    }, {});

    return Object.entries(occurrences).map(([year, count]) => `${year} - ${count}`);
  };

  const getSongs = (arr, prop) => {
    const songs = arr.reduce((acc, item) => {
      const setList = item[prop] || '';
      const setSongs = setList.split(', ');
      setSongs.forEach((song) => {
        acc[song] = (acc[song] || 0) + 1;
      });
      return acc;
    }, {});

    return Object.entries(songs).map(([song, count]) => `${song} - ${count}`);
  };

  const states = getOccurrences(selectedShows, 'State');
  const venues = getOccurrences(selectedShows, 'Venue');
  const days = getDays(selectedShows);
  const months = getMonths(selectedShows);
  const years = getYears(selectedShows);

  const set1Songs = getSongs(selectedShows, 'Set 1');
  const set2Songs = getSongs(selectedShows, 'Set 2');
  const encoreSongs = getSongs(selectedShows, 'Encore');

  return (
    <div className="full-stats-page">
      <h1>Full Show Statistics</h1>
      <div className="stats-section">
        <h2>States</h2>
        <ul>
          {states.map((state, index) => (
            <li key={index}>{state}</li>
          ))}
        </ul>
      </div>
      <div className="stats-section">
        <h2>Venues</h2>
        <ul>
          {venues.map((venue, index) => (
            <li key={index}>{venue}</li>
          ))}
        </ul>
      </div>
      <div className="stats-section">
        <h2>Days</h2>
        <ul>
          {days.map((day, index) => (
            <li key={index}>{day}</li>
          ))}
        </ul>
      </div>
      <div className="stats-section">
        <h2>Months</h2>
        <ul>
          {months.map((month, index) => (
            <li key={index}>{month}</li>
          ))}
        </ul>
      </div>
      <div className="stats-section">
        <h2>Years</h2>
        <ul>
          {years.map((year, index) => (
            <li key={index}>{year}</li>
          ))}
        </ul>
      </div>
      <div className="stats-section">
        <h2>Set 1 Songs</h2>
        <ul>
          {set1Songs.map((song, index) => (
            <li key={index}>{song}</li>
          ))}
        </ul>
      </div>
      <div className="stats-section">
        <h2>Set 2 Songs</h2>
        <ul>
          {set2Songs.map((song, index) => (
            <li key={index}>{song}</li>
          ))}
        </ul>
      </div>
      <div className="stats-section">
        <h2>Encore Songs</h2>
        <ul>
          {encoreSongs.map((song, index) => (
            <li key={index}>{song}</li>
          ))}
        </ul>
      </div>
      <div className="back-link">
        <Link to="/">
          <button>Back to Show List</button>
        </Link>
      </div>
    </div>
  );
};

export default FullStatsPage;