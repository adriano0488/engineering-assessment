import React from 'react';
import { Modal } from '@mui/material';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import iconUrl from 'leaflet/dist/images/marker-icon.png';
import iconShadowUrl from 'leaflet/dist/images/marker-shadow.png';
import styled from 'styled-components';

// Configure Leaflet icon defaults
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: iconUrl,
    iconUrl: iconUrl,
    shadowUrl: iconShadowUrl,
});

const StyledBox = styled.div`
  width: 100%;
  max-width: 500px;
  height: 500px;
  background-color: white;
  border-radius: 0.5rem;
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const CenteredModal = styled(Modal)`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const MapModal = ({ truck, onClose }) => {
    return (
        <CenteredModal open={Boolean(truck)} onClose={onClose}>
            <StyledBox>
                {truck.Latitude && truck.Longitude ? (
                    <MapContainer center={[truck.Latitude, truck.Longitude]} zoom={15} style={{ height: '100%', width: '100%' }}>
                        <TileLayer
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        />
                        <Marker position={[truck.Latitude, truck.Longitude]}>
                            <Popup autoOpen={true}>
                                <strong>{truck.Applicant}</strong><br />
                                {truck.Address}
                            </Popup>
                        </Marker>
                    </MapContainer>
                ) : (
                    <div className="text-center">
                        <h2 className="text-lg font-semibold">{truck.Applicant}</h2>
                        <p>{truck.Address}</p>
                        <p>Sorry, the location could not be loaded on the map.</p>
                    </div>
                )}
            </StyledBox>
        </CenteredModal>
    );
};

export default MapModal;
