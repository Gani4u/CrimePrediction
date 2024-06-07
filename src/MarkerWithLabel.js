import React from 'react';
import { Marker, Popup } from 'react-leaflet';

const MarkerWithLabel = ({ position, label }) => (
  <Marker position={position}>
    <Popup>{label}</Popup>
  </Marker>
);

export default MarkerWithLabel;

