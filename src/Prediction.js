import React, { useState, useMemo, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap, Rectangle } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import crimeData from './BS2.js';
import './CrimeMap.css';
import Legend1 from './Legend1.js';
import NavigationToolbar1 from './NavigationToolbar1';

import MurderIcon from './knife.png'; // Import the Murder icon

const iconMapping = {
  Murder: L.icon({
    iconUrl: MurderIcon,
    iconSize: [30, 30],
    iconAnchor: [15, 30],
    popupAnchor: [0, -30]
  })
};

const Prediction = () => {
  const [position, setPosition] = useState([12.93, 77.58]);
  const [filteredCrimeData, setFilteredCrimeData] = useState([]);

  // Filter data only for Murder crimes
  const filterMurderCrimes = () => {
    const murderData = crimeData.filter((crime) => crime.Type === 'Murder');
    setFilteredCrimeData(murderData);
  };

  // Initial filtering on component mount
  useEffect(() => {
    filterMurderCrimes();
  }, []);

  // Create an array of coordinates for the polyline
  const polylineCoordinates = useMemo(() => {
    return filteredCrimeData.map(({ Latitude, Longitude }) => [Latitude, Longitude]);
  }, [filteredCrimeData]);

  // Calculate bounds for the rectangle
  const bounds = useMemo(() => {
    if (filteredCrimeData.length > 0) {
      const latitudes = filteredCrimeData.map((crime) => crime.Latitude);
      const longitudes = filteredCrimeData.map((crime) => crime.Longitude);
      const minLat = Math.min(...latitudes);
      const maxLat = Math.max(...latitudes);
      const minLng = Math.min(...longitudes);
      const maxLng = Math.max(...longitudes);
      return [[minLat, minLng], [maxLat, maxLng]];
    }
    return null;
  }, [filteredCrimeData]);

  return (
    <div className="map-container">
      <MapContainer center={position} zoom={10} style={{ height: '700px' }}>
        <FitBounds markers={filteredCrimeData} />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {filteredCrimeData.map(({ Latitude, Longitude, Type, Date, Time }, index) => {
          const icon = iconMapping[Type];

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
        {bounds && <Rectangle bounds={bounds} color="blue" />}
        {filteredCrimeData.length > 1 && (
          <Polyline positions={polylineCoordinates} color="blue" />
        )}
      </MapContainer>
      <Legend1 />
      <NavigationToolbar1 />
    </div>
  );
};

const FitBounds = ({ markers }) => {
  const map = useMap();
  useEffect(() => {
    if (markers.length > 0) {
      const bounds = L.latLngBounds(markers.map(marker => [marker.Latitude, marker.Longitude]));
      map.fitBounds(bounds);
    }
  }, [map, markers]);

  return null;
};

export default Prediction;

