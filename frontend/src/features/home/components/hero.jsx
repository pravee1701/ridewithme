import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Icon } from 'leaflet';
import { cn } from '@/lib/utils';
import {CarFront} from "lucide-react"
import {Button} from "@/components/ui/button"
// Custom hook for controlling the map
function MapController({ center }){
  const map = useMap();
  
  useEffect(() => {
    map.setView(center, map.getZoom());
  }, [center, map]);
  
  return null;
}

const HeroMap = () => {
  const [pickup, setPickup] = useState('');
  const [dropoff, setDropoff] = useState('');
  const [selectedType, setSelectedType] = useState('ride');
  const [mapCenter, setMapCenter] = useState([28.6139, 77.2090]); // Delhi coordinates

  // Custom icon for marker
  const customIcon = new Icon({
    iconUrl: 'https://cdn-icons-png.flaticon.com/512/684/684908.png',
    iconSize: [38, 38],
    iconAnchor: [19, 38],
    popupAnchor: [0, -38]
  });

  const handleRideTypeChange = (type) => {
    setSelectedType(type);
  };

  return (
    <div className="flex flex-col lg:flex-row w-full min-h-[100vh] bg-white overflow-hidden ">
      {/* Left Section */}
    <div className='flex flex-col items-start justify-start w-[50%]'>
    <h1 className='text-6xl text-start font-bold '>
    Go anywhere with  <span className='block ' >
      Uber
      </span> 
    </h1>
    <div className='flex flex-col items-center justify-center space-y-1'>
    <Button variant="outline" size={"icon"} className="mt-5">
    <CarFront size={28} />
    </Button>
    <span>Ride</span>
    </div>
    {/* TODO:NEED TO ADD RIDE RELATED FIELDS HERE */}
    </div>


      {/* Right Section - Map */}
      <div className="max-w-[50%] w-full  h-[50vh] lg:h-auto relative">
        <MapContainer 
          center={mapCenter} 
          zoom={13} 
          style={{ height: '100%', width: '100%' }}
          zoomControl={false}
          attributionControl={false}
          className="z-0 rounded-tl-xl lg:rounded-l-xl overflow-hidden"
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={mapCenter} icon={customIcon}>
            <Popup>
              Current location
            </Popup>
          </Marker>
          <MapController center={mapCenter} />
          {/* Controls */}
          <div className="absolute right-4 bottom-4 z-[1000] flex flex-col space-y-2">
            <button className="bg-white p-2 rounded-full shadow-lg hover:bg-gray-100 transition-all">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 5l0 14"></path>
                <path d="M5 12l14 0"></path>
              </svg>
            </button>
            <button className="bg-white p-2 rounded-full shadow-lg hover:bg-gray-100 transition-all">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12l14 0"></path>
              </svg>
            </button>
          </div>
        </MapContainer>
      </div>
    </div>
  );
};

export default HeroMap;