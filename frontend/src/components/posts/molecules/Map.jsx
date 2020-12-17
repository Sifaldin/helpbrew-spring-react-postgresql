import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { icon } from "leaflet";
import { useMap } from "react-leaflet";
import mapPin from "../../../assets/map-pin.png";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Map({ position, address }) {
  let pos = position[0] === undefined ? [59.3293, 18.0686] : position;

  const myIcon = icon({
    iconUrl: mapPin,
    iconSize: [36, 36],
  });

  // console.log(process.env.REACT_API_KEY);

  function ChangeView({ center, zoom }) {
    const map = useMap();
    map.setView(center, zoom);
    return null;
  }

  return (
    <div className="map-wrapper">
      <MapContainer className="map" zoom={12} center={pos}>
        <ChangeView center={pos} zoom={12} />
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={pos} icon={myIcon}>
          <Popup>{address}</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}
