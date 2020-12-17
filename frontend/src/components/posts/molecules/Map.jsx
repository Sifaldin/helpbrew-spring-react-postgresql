import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { icon } from "leaflet";
import { useMap } from "react-leaflet";
import mapPin from "../../../assets/map-pin.png";


export default function Map({ position, address }) {
  let pos =
    position[0] === undefined || position[1] === undefined ? [0, 0] : position;
  const myIcon = icon({
    iconUrl: mapPin,
    iconSize: [36, 36],
  });


  function ChangeView({ center, zoom }) {
    try {
      const map = useMap();
      map.setView(center, zoom);
      return null;
    } catch {
      console.log(center);
      window.alert("Somethin went wrong. Please try again");
    }
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
