import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import './ShowStats.css';

const ShowStats = ({ shows }) => {
  const getTopOccurrences = (arr, prop, count) => {
    const occurrences = arr.reduce((acc, item) => {
      const value = item[prop];
      acc[value] = (acc[value] || 0) + 1;
      return acc;
    }, {});

    return Object.entries(occurrences)
      .sort((a, b) => b[1] - a[1])
      .slice(0, count)
      .map(([value, count]) => `${value} - ${count}`);
  };

  const getTopDays = (arr, count) => {
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const occurrences = arr.reduce((acc, item) => {
      const date = new Date(item.Date);
      const dayOfWeek = daysOfWeek[date.getDay()];
      acc[dayOfWeek] = (acc[dayOfWeek] || 0) + 1;
      return acc;
    }, {});

    return Object.entries(occurrences)
      .sort((a, b) => b[1] - a[1])
      .slice(0, count)
      .map(([day, count]) => `${day} - ${count}`);
  };

  const getTopMonths = (arr, count) => {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const occurrences = arr.reduce((acc, item) => {
      const date = new Date(item.Date);
      const month = months[date.getMonth()];
      acc[month] = (acc[month] || 0) + 1;
      return acc;
    }, {});

    return Object.entries(occurrences)
      .sort((a, b) => b[1] - a[1])
      .slice(0, count)
      .map(([month, count]) => `${month} - ${count}`);
  };

  const getTopYears = (arr, count) => {
    const occurrences = arr.reduce((acc, item) => {
      const year = new Date(item.Date).getFullYear();
      acc[year] = (acc[year] || 0) + 1;
      return acc;
    }, {});

    return Object.entries(occurrences)
      .sort((a, b) => b[1] - a[1])
      .slice(0, count)
      .map(([year, count]) => `${year} - ${count}`);
  };

  const getTopSongs = (arr, prop, count) => {
    const songs = arr.reduce((acc, item) => {
      const setList = item[prop] || '';
      const setSongs = setList.split(', ');
      setSongs.forEach((song) => {
        acc[song] = (acc[song] || 0) + 1;
      });
      return acc;
    }, {});

    return Object.entries(songs)
      .sort((a, b) => b[1] - a[1])
      .slice(0, count)
      .map(([song, count]) => `${song} - ${count}`);
  };

  const topStates = getTopOccurrences(shows, 'State', 3);
  const topVenues = getTopOccurrences(shows, 'Venue', 3);
  const topDays = getTopDays(shows, 3);
  const topMonths = getTopMonths(shows, 3);
  const topYears = getTopYears(shows, 3);

  const topSet1Songs = getTopSongs(shows, 'Set 1', 5);
  const topSet2Songs = getTopSongs(shows, 'Set 2', 5);
  const topEncoreSongs = getTopSongs(shows, 'Encore', 5);

  return (
    <div className="show-stats">
      <h2>Show Statistics</h2>
      <div className="stats-section">
        <h3>Top Occurrences</h3>
        <div className="stats-row">
          <div className="stats-column">
            <h4>Top 3 States</h4>
            <ul>
              {topStates.map((state, index) => (
                <li key={index}>{state}</li>
              ))}
            </ul>
          </div>
          <div className="stats-column">
            <h4>Top 3 Venues</h4>
            <ul>
              {topVenues.map((venue, index) => (
                <li key={index}>{venue}</li>
              ))}
            </ul>
          </div>
          <div className="stats-column">
            <h4>Top 3 Days</h4>
            <ul>
              {topDays.map((day, index) => (
                <li key={index}>{day}</li>
              ))}
            </ul>
          </div>
          <div className="stats-column">
            <h4>Top 3 Months</h4>
            <ul>
              {topMonths.map((month, index) => (
                <li key={index}>{month}</li>
              ))}
            </ul>
          </div>
          <div className="stats-column">
            <h4>Top 3 Years</h4>
            <ul>
              {topYears.map((year, index) => (
                <li key={index}>{year}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className="stats-section">
        <h3>Top Songs</h3>
        <div className="stats-row">
          <div className="stats-column">
            <h4>Top 5 Songs - Set 1</h4>
            <ul>
              {topSet1Songs.map((song, index) => (
                <li key={index}>{song}</li>
              ))}
            </ul>
          </div>
          <div className="stats-column">
            <h4>Top 5 Songs - Set 2</h4>
            <ul>
              {topSet2Songs.map((song, index) => (
                <li key={index}>{song}</li>
              ))}
            </ul>
          </div>
          <div className="stats-column">
            <h4>Top 5 Songs - Encore</h4>
            <ul>
              {topEncoreSongs.map((song, index) => (
                <li key={index}>{song}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className="full-stats-link">
        <Link to={{
              pathname: "/full-stats",
              state: { selectedShows: shows }
            }}>
          <button>Full Stats</button>
        </Link>
      </div>
    </div>
  );
};

export default ShowStats;
