import React, { useState } from 'react';
import './SelectedShows.css';

const SelectedShows = ({ shows, onRemoveShow }) => {
  const [hoveredShow, setHoveredShow] = useState(null);

  const handleMouseEnter = (show) => {
    setHoveredShow(show);
  };

  const handleMouseLeave = () => {
    setHoveredShow(null);
  };

  return (
    <div className="selected-shows-container">
      <h3>Selected Shows</h3>
      <div className="selected-shows-scroll">
        <ul className="selected-shows-list">
          {shows.map((show) => (
            <li
              key={show.SN}
              onMouseEnter={() => handleMouseEnter(show)}
              onMouseLeave={handleMouseLeave}
            >
              <span>
                {show.Date} - {show.Venue}, {show.City}, {show.State}, {show.Country}
              </span>
              <button className="remove-button" onClick={() => onRemoveShow(show.SN)}>
                x
              </button>
              {hoveredShow === show && (
                <div className="setlist-popup">
                  <h4>Setlist:</h4>
                  <ul>
                    <li>Set 1: {show['Set 1']}</li>
                    <li>Set 2: {show['Set 2']}</li>
                    <li>Encore: {show.Encore}</li>
                  </ul>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SelectedShows;