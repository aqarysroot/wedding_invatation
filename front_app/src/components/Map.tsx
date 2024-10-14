import React, { useEffect } from 'react';

declare global {
    interface Window {
        DG: any;
    }
}

const MapComponent: React.FC = () => {
    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://maps.api.2gis.ru/2.0/loader.js?pkg=full';
        script.async = true;
        script.onload = () => {
            const latitudeCenter = 43.248048;
            const longitudeCenter = 76.825284;
            const zoomLevel = 17.5;

            const map = new window.DG.map('map', {
                center: [latitudeCenter, longitudeCenter],
                zoom: zoomLevel,
            });

            window.DG.marker([43.24794, 76.825047])
                .addTo(map)
                .bindPopup('Название фирмы');
        };
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, []);

    return <div id="map" style={{ width: '100%', height: '450px' }} />;
};

export default MapComponent;
