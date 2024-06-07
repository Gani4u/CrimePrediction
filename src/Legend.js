// Legend.js

import React, { useState } from 'react';
import './Legend.css'; // Import CSS for styling the legend

import RobberyIcon from './Robbery.png';
import MurderIcon from './knife.png';
import TwoWheelerTheftIcon from './car.png';
import AttemptedMurderIcon from './attempt.png';
import ChainSnatchingIcon from './chain.png';

const crimeTypes = ['Robbery', 'Murder', 'TwoWheelerTheft', 'AttemptedMurder', 'ChainSnatching'];

const Legend = ({ onCheckboxChange }) => {
  const [checkedItems, setCheckedItems] = useState(crimeTypes.reduce((acc, crimeType) => {
    acc[crimeType] = true;
    return acc;
  }, {}));

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setCheckedItems({
      ...checkedItems,
      [name]: checked,
    });
    onCheckboxChange(name, checked);
  };

  return (
    <div className="legend-container">
      <h3>Legend</h3>
      {crimeTypes.map((crimeType) => (
        <div className="legend-item" key={crimeType}>
          <input
            type="checkbox"
            name={crimeType}
            checked={checkedItems[crimeType]}
            onChange={handleCheckboxChange}
          />
          <img src={getIconForCrimeType(crimeType)} alt={`${crimeType} Icon`} className="legend-icon" />
          <span>{crimeType}</span>
        </div>
      ))}
    </div>
  );
};

const getIconForCrimeType = (crimeType) => {
  switch (crimeType) {
    case 'Robbery':
      return RobberyIcon;
    case 'Murder':
      return MurderIcon;
    case 'TwoWheelerTheft':
      return TwoWheelerTheftIcon;
    case 'AttemptedMurder':
      return AttemptedMurderIcon;
    case 'ChainSnatching':
      return ChainSnatchingIcon;
    default:
      return null;
  }
};

export default Legend;

