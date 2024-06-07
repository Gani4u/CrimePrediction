import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import crimeData from './BS1.js';
import './CrimeMap.css';
import Legend from './Legend.js';
import NavigationToolbar from './NavigationToolbar';

import RobberyIcon from './Robbery.png';
import MurderIcon from './knife.png';
import TwoWheelerTheftIcon from './car.png';
import AttemptedMurderIcon from './attempt.png';
import ChainSnatchingIcon from './chain.png';

const iconMapping = {
  Robbery: L.icon({
    iconUrl: RobberyIcon,
    iconSize: [30, 30],
    iconAnchor: [15, 30],
    popupAnchor: [0, -30]
  }),
  AttemptedMurder: L.icon({
    iconUrl: AttemptedMurderIcon,
    iconSize: [30, 30],
    iconAnchor: [15, 30],
    popupAnchor: [0, -30]
  }),
  TwoWheelerTheft: L.icon({
    iconUrl: TwoWheelerTheftIcon,
    iconSize: [30, 30],
    iconAnchor: [15, 30],
    popupAnchor: [0, -30]
  }),
  ChainSnatching: L.icon({
    iconUrl: ChainSnatchingIcon,
    iconSize: [30, 30],
    iconAnchor: [15, 30],
    popupAnchor: [0, -30]
  }),
  Murder: L.icon({
    iconUrl: MurderIcon,
    iconSize: [30, 30],
    iconAnchor: [15, 30],
    popupAnchor: [0, -30]
  })
};

const CrimeMap = () => {
  const [position, setPosition] = useState([12.93, 77.58]);
  const [filteredCrimeData, setFilteredCrimeData] = useState(crimeData);

  const handleCheckboxChange = (crimeType, checked) => {
  if (checked) {
    // If the checkbox is checked, add occurrences of the crime type to filteredCrimeData
    const newData = crimeData.filter((crime) => crime.Type === crimeType);
    setFilteredCrimeData((prevData) => [...prevData, ...newData]);
  } else {
    // If the checkbox is unchecked, remove occurrences of the crime type from filteredCrimeData
    setFilteredCrimeData((prevData) =>
      prevData.filter((crime) => crime.Type !== crimeType)
    );
  }
};

  return (
    <div className="map-container">
      <MapContainer center={position} zoom={13} style={{ height: '950px' }}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {filteredCrimeData.map(({ Latitude, Longitude, Type, Date, Time }, index) => {
          const icon = iconMapping[Type] || L.icon({
            iconUrl: 'knife.png',
            iconSize: [30, 30],
            iconAnchor: [15, 30],
            popupAnchor: [0, -30]
          });

          return Latitude && Longitude ? (
            <Marker key={index} position={[Latitude, Longitude]} icon={icon}>
              <Popup>
                <b>Crime Type:</b> {Type}<br />
                <b>Date:</b> {Date}<br />
                <b>Time:</b> {Time}
              </Popup>
            </Marker>
          ) : null;
        })}
      </MapContainer>
      <Legend onCheckboxChange={handleCheckboxChange} />
    
    <NavigationToolbar /> {/* Include the NavigationToolbar component */}
    </div>
  );
};

export default CrimeMap;

