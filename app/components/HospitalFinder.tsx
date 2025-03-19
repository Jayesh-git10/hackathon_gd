'use client';

import { useState, useEffect } from 'react';
import { FaHospital, FaMapMarkerAlt, FaPhone, FaClock, FaExclamationTriangle, FaDirections, FaInfoCircle } from 'react-icons/fa';

interface Hospital {
  name: string;
  address: string;
  phone: string;
  rating: number;
  isOpen: boolean;
  distance: string;
  location: {
    lat: number;
    lng: number;
  };
}

interface HospitalResponse {
  hospitals: Hospital[];
  message?: string;
  error?: string;
}

export default function HospitalFinder() {
  const [hospitals, setHospitals] = useState<Hospital[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [infoMessage, setInfoMessage] = useState<string | null>(null);
  const [locationError, setLocationError] = useState<boolean>(false);
  const [userLocation, setUserLocation] = useState<{lat: number, lng: number} | null>(null);

  const findNearbyHospitals = async () => {
    setLoading(true);
    setError(null);
    setInfoMessage(null);
    setLocationError(false);

    try {
      // Get user's current location
      const position = await new Promise<GeolocationPosition>((resolve, reject) => {
        if (!navigator.geolocation) {
          reject(new Error('Geolocation is not supported by your browser'));
          return;
        }
        
        navigator.geolocation.getCurrentPosition(
          resolve, 
          (err) => {
            console.error('Geolocation error:', err);
            setLocationError(true);
            reject(new Error('Unable to access your location. Please enable location services.'));
          },
          { timeout: 10000, enableHighAccuracy: true }
        );
      });

      const { latitude, longitude } = position.coords;
      setUserLocation({ lat: latitude, lng: longitude });

      // Call our API endpoint to find nearby hospitals
      const response = await fetch('/api/nearby-hospitals', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          latitude,
          longitude,
        }),
      });

      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }

      const data: HospitalResponse = await response.json();
      
      if (data.error) {
        throw new Error(data.error);
      }
      
      setHospitals(data.hospitals);
      
      if (data.message) {
        setInfoMessage(data.message);
      }
    } catch (err) {
      console.error('Hospital finder error:', err);
      if (locationError) {
        setError('Location access denied. Please enable location services in your browser settings and try again.');
      } else {
        setError(err instanceof Error ? err.message : 'Failed to find hospitals');
      }
    } finally {
      setLoading(false);
    }
  };

  // Function to open Google Maps directions
  const openDirections = (hospital: Hospital) => {
    if (!userLocation) return;
    
    const url = `https://www.google.com/maps/dir/?api=1&origin=${userLocation.lat},${userLocation.lng}&destination=${encodeURIComponent(hospital.name + ' ' + hospital.address)}&travelmode=driving`;
    window.open(url, '_blank');
  };

  // Function to get static map URL
  const getStaticMapUrl = (hospital: Hospital) => {
    if (!userLocation) return '';
    
    // Using OpenStreetMap since Google Maps may not work with current API key
    return `https://staticmap.openstreetmap.de/staticmap.php?center=${hospital.location.lat},${hospital.location.lng}&zoom=14&size=200x120&markers=${hospital.location.lat},${hospital.location.lng},red&markers=${userLocation.lat},${userLocation.lng},blue`;
  };

  return (
    <div className="bg-gray-900/80 backdrop-blur-sm rounded-xl p-6 border border-primary/20">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-bold text-primary flex items-center gap-2">
          <FaHospital className="text-primary" />
          Emergency Hospitals
        </h3>
        <button
          onClick={findNearbyHospitals}
          disabled={loading}
          className="btn-primary flex items-center gap-2"
        >
          {loading ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Finding Hospitals...
            </>
          ) : (
            <>
              <FaMapMarkerAlt />
              Find Nearby Hospitals
            </>
          )}
        </button>
      </div>

      {error && (
        <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-lg mb-6">
          <div className="flex items-start">
            <FaExclamationTriangle className="text-red-400 mt-1 mr-2 flex-shrink-0" />
            <div>
              <p className="font-medium mb-1">Error:</p>
              <p>{error}</p>
            </div>
          </div>
        </div>
      )}

      {infoMessage && (
        <div className="bg-blue-500/10 border border-blue-500/20 text-blue-400 p-4 rounded-lg mb-6">
          <div className="flex items-start">
            <FaInfoCircle className="text-blue-400 mt-1 mr-2 flex-shrink-0" />
            <div>
              <p className="font-medium mb-1">Note:</p>
              <p>{infoMessage}</p>
            </div>
          </div>
        </div>
      )}

      {hospitals.length > 0 && (
        <div className="space-y-4">
          {hospitals.map((hospital, index) => (
            <div
              key={index}
              className="bg-gray-800/50 rounded-lg p-4 border border-primary/10 hover:border-primary/30 transition-colors"
            >
              <div className="flex flex-col md:flex-row md:items-start gap-4">
                {userLocation && (
                  <div className="w-full md:w-48 h-32 flex-shrink-0 rounded-md overflow-hidden border border-gray-700 bg-gray-800">
                    <div className="relative w-full h-full">
                      {/* Hospital symbol fallback */}
                      <div className="absolute inset-0 flex items-center justify-center bg-gray-800 z-0">
                        <div className="flex flex-col items-center">
                          <FaHospital className="text-primary" size={42} />
                          <div className="text-primary text-sm mt-2 font-semibold">Hospital</div>
                          <div className="text-gray-400 text-xs mt-1">{hospital.distance} away</div>
                        </div>
                      </div>
                      
                      {/* Map image that will overlay the fallback if loaded successfully */}
                      <img 
                        src={getStaticMapUrl(hospital)} 
                        alt={`Map to ${hospital.name}`} 
                        className="w-full h-full object-cover relative z-10"
                        loading="lazy"
                        onError={(e) => {
                          // Hide the broken image when it fails to load
                          e.currentTarget.style.display = 'none';
                        }}
                      />
                    </div>
                  </div>
                )}
                <div className="flex-grow">
                  <h4 className="text-lg font-semibold text-primary mb-2">
                    {hospital.name}
                  </h4>
                  <div className="space-y-2 text-gray-300">
                    <div className="flex items-center gap-2">
                      <FaMapMarkerAlt className="text-primary flex-shrink-0" />
                      <span>{hospital.address}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FaPhone className="text-primary flex-shrink-0" />
                      <span>{hospital.phone}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FaClock className="text-primary flex-shrink-0" />
                      <span className={hospital.isOpen ? 'text-green-400' : 'text-red-400'}>
                        {hospital.isOpen ? 'Open Now' : 'Closed'}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-right text-primary font-semibold">
                      <FaMapMarkerAlt className="text-primary flex-shrink-0" />
                      <span>{hospital.distance}</span>
                    </div>
                  </div>
                  <div className="mt-4 flex gap-2">
                    <button 
                      onClick={() => openDirections(hospital)}
                      className="bg-primary/90 hover:bg-primary text-white px-4 py-2 rounded-md transition-colors flex items-center gap-1"
                    >
                      <FaDirections size={16} />
                      Get Directions
                    </button>
                    <a 
                      href={`tel:${hospital.phone.replace(/\D/g, '')}`}
                      className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-md transition-colors flex items-center gap-1"
                    >
                      <FaPhone size={14} />
                      Call
                    </a>
                  </div>
                </div>
                <div className="text-right flex-shrink-0 mt-2 md:mt-0">
                  <div className="flex items-center gap-1 text-yellow-400 justify-end">
                    <span>★</span>
                    <span>{hospital.rating.toFixed(1)}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {!loading && hospitals.length === 0 && !error && (
        <div className="text-center py-10 text-gray-400">
          <FaMapMarkerAlt className="mx-auto mb-3 text-primary/50" size={36} />
          <p className="text-lg mb-1">Find emergency medical help nearby</p>
          <p className="text-sm max-w-md mx-auto">Click the button above to locate hospitals near your current location</p>
        </div>
      )}
    </div>
  );
} 