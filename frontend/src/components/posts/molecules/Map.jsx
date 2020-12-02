import { MapContainer, Marker, TileLayer, Popup } from "react-leaflet";
import Geocoder from "./Geocoder";
export default function Map({ address }) {
  const position = [53.35, 18.8];
  return (
    <MapContainer
      className="map"
      center={position}
      zoom={6}
      style={{ height: 500, width: "100%" }}
    >
      <TileLayer
        attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Geocoder address={address} />
    </MapContainer>
  );
}
