import { MapContainer, Marker, TileLayer } from "react-leaflet";
import { icon } from "leaflet";
import { useMap } from "react-leaflet";
import mapPin from "../../../assets/map-pin.png";


export default function Map({ position }) {
  // const [position, setPosition] = useState([0, 0]);
  const myIcon = icon({
    iconUrl: mapPin,
    iconSize: [36, 36],
  });


  function ChangeView({ center, zoom }) {
    const map = useMap();
    map.setView(center, zoom);
    return null;
  }

  return (
    <div className="map-wrapper">
      <MapContainer className="map" zoom={12} center={position}>
        <ChangeView center={position} zoom={12} />
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position} icon={myIcon} />
      </MapContainer>
    </div>
  );
}
