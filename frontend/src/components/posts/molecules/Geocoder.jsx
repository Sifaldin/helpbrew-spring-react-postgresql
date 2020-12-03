import { useMap } from "react-leaflet";
import * as ELG from "esri-leaflet-geocoder";

export default function Geocoder({ address }) {
  const map = useMap();

  ELG.geocode()
    .text(address)
    .run((err, results, response) => {
      if (results.length !== 0 && results.results && results.results[0]) {
        console.log(results);
        console.log(results.results[0].latlng);
        const { lat, lng } = results.results[0].latlng;
        map.setView([lat, lng], 12);
      }
    });
  return null;
}
