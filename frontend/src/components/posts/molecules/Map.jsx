import { MapContainer, Marker, TileLayer } from "react-leaflet";
import { icon } from "leaflet";
import { useMap } from "react-leaflet";
import * as ELG from "esri-leaflet-geocoder";
import { BiPin } from "react-icons/bi";
import mapPin from "../../../assets/map-pin.png";
import { useState } from "react";

export default function Map({ address }) {
  const [position, setPosition] = useState([0, 0]);
  const myIcon = icon({
    iconUrl: mapPin,
    iconSize: [36, 36],
  });
  console.log(position);

  function Geocoder({ address }) {
    const map = useMap();

    ELG.geocode()
      .text(address)
      .run((err, results, response) => {
        if (results.length !== 0 && results.results && results.results[0]) {
          console.log(results);
          console.log(results.results[0].latlng);
          const { lat, lng } = results.results[0].latlng;
          setPosition([lat, lng]);
          map.setView([lat, lng], 12);
        }
      });
    return null;
  }
  return (
    <MapContainer className="map" zoom={20} center={position}>
      <TileLayer
        attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={position} icon={myIcon} />
      <Geocoder address={address} />
    </MapContainer>
  );
}
