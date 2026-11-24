'use client'

import { useEffect } from 'react'
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet'
import L from 'leaflet'
import type { Vehicle } from '@/data/mock-data'

function Recenter({ vehicle }: { vehicle: Vehicle | null }) {
  const map = useMap()
  useEffect(() => { if (vehicle) map.flyTo([vehicle.latitude, vehicle.longitude], 11, { duration: 0.8 }) }, [vehicle, map])
  return null
}

function FitFleet({ vehicles }: { vehicles: Vehicle[] }) {
  const map = useMap()
  return <button className="map-fit" onClick={() => map.fitBounds(vehicles.map((vehicle) => [vehicle.latitude, vehicle.longitude] as [number, number]), { padding: [32, 32] })}>Fit fleet</button>
}

const markerIcon = (status: Vehicle['status']) => L.divIcon({ className: 'fleet-marker-wrap', html: `<span class="fleet-marker ${status.toLowerCase()}"><i></i></span>`, iconSize: [28,28], iconAnchor: [14,14] })

export default function FleetMap({ vehicles, selected, onSelect, compact = false }: { vehicles: Vehicle[]; selected: Vehicle | null; onSelect: (vehicle: Vehicle) => void; compact?: boolean }) {
  return <div className={`map-frame ${compact ? 'map-compact' : ''}`}>
    <MapContainer center={[19.65,84.55]} zoom={7} scrollWheelZoom={!compact} zoomControl={!compact} className="fleet-leaflet">
      <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <Recenter vehicle={selected} />
      {!compact && <FitFleet vehicles={vehicles} />}
      {vehicles.map((vehicle) => <Marker key={vehicle.id} position={[vehicle.latitude,vehicle.longitude]} icon={markerIcon(vehicle.status)} eventHandlers={{ click: () => onSelect(vehicle) }}>
        <Popup><div className="map-popup"><strong>{vehicle.vehicleId}</strong><span>{vehicle.registrationNumber}</span><span>{vehicle.location} · {vehicle.speed} km/h</span><span className={`map-status ${vehicle.status.toLowerCase()}`}>{vehicle.status}</span></div></Popup>
      </Marker>)}
    </MapContainer>
  </div>
}
