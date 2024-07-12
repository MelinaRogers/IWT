import React, { useState } from 'react';
import './ShowList.css';
import SelectedShows from './SelectedShows';
import ShowStats from './ShowStats';

const ShowList = ({ shows }) => {
  const [checkedShows, setCheckedShows] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedYears, setExpandedYears] = useState([]);
  const [selectedShows, setSelectedShows] = useState([]);

  const handleShowClick = (showId) => {
    const isChecked = checkedShows.includes(showId);
    if (isChecked) {
      setCheckedShows(checkedShows.filter((id) => id !== showId));
    } else {
      setCheckedShows([...checkedShows, showId]);
    }
  };

  const handleSaveClick = () => {
    const selected = shows.filter((show) => checkedShows.includes(show.SN));
    setSelectedShows(selected);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleRemoveShow = (showId) => {
    setCheckedShows(checkedShows.filter((id) => id !== showId));
  };

  const handleYearClick = (year) => {
    const isExpanded = expandedYears.includes(year);
    if (isExpanded) {
      setExpandedYears(expandedYears.filter((y) => y !== year));
    } else {
      setExpandedYears([...expandedYears, year]);
    }
  };

  const filteredShows = shows.filter((show) => {
    const { Date, Venue, City, State, Country } = show;
    const searchTermLower = searchTerm.toLowerCase();
    return (
      Date.toLowerCase().includes(searchTermLower) ||
      Venue.toLowerCase().includes(searchTermLower) ||
      City.toLowerCase().includes(searchTermLower) ||
      State.toLowerCase().includes(searchTermLower) ||
      Country.toLowerCase().includes(searchTermLower)
    );
  });

  const groupedShows = filteredShows.reduce((acc, show) => {
    const year = new Date(show.Date).getFullYear();
    if (!acc[year]) {
      acc[year] = [];
    }
    acc[year].push(show);
    return acc;
  }, {});

  const years = Object.keys(groupedShows);
  const isAllExpanded = years.every((year) => expandedYears.includes(year));

  const toggleAllYears = () => {
    if (isAllExpanded) {
      setExpandedYears([]);
    } else {
      setExpandedYears(years);
    }
  };

  return (
    <div className="show-list-container">
      <div className="show-list-header">
        <input
          type="text"
          className="search-input"
          placeholder="Search by Date, Venue, City, State, or Country"
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <button onClick={handleSaveClick}>Save</button>
      </div>
      <div className="show-list-content">
        <div className="show-list-scroll">
          <div className="show-year-toggle">
            <span onClick={toggleAllYears}>
              {isAllExpanded ? 'Collapse All' : 'Expand All'}
            </span>
          </div>
          {Object.entries(groupedShows).map(([year, shows]) => (
            <div key={year} className="show-year">
              <div
                className="show-year-header"
                onClick={() => handleYearClick(year)}
              >
                <span>{year}</span>
                <span className="arrow">
                  {expandedYears.includes(year) ? '▲' : '▼'}
                </span>
              </div>
              {expandedYears.includes(year) && (
                <ul className="show-list">
                  {shows.map((show) => (
                    <li
                      key={show.SN}
                      className={`show-item ${
                        checkedShows.includes(show.SN) ? 'checked' : ''
                      }`}
                      onClick={() => handleShowClick(show.SN)}
                    >
                      <input
                        type="checkbox"
                        checked={checkedShows.includes(show.SN)}
                        readOnly
                      />
                      <span className="show-details">
                        {show.Date} - {show.Venue}, {show.City}, {show.State},{' '}
                        {show.Country}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
        <SelectedShows
          shows={shows.filter((show) => checkedShows.includes(show.SN))}
          onRemoveShow={handleRemoveShow}
        />
      </div>
      <ShowStats shows={selectedShows} />
    </div>
  );
};

export default ShowList;