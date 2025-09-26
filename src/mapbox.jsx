import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

function MapBox() {
  return (
    <div className="w-full h-full">
      <MapContainer
        center={[20.5937, 78.9629]}
        zoom={5}
        scrollWheelZoom={true}
        className="w-full h-full rounded-2xl shadow-lg"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        />
        <Marker position={[28.6139, 77.2090]}>
          <Popup>New Delhi</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}



export default MapBox;
