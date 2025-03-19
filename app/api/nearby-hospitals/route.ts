import { NextResponse } from 'next/server';

// Get API key from environment variables
const GOOGLE_PLACES_API_KEY = process.env.GOOGLE_PLACES_API_KEY || '';

// Sample data for fallback in case of API errors
const SAMPLE_HOSPITALS = [
  {
    name: "City General Hospital",
    address: "123 Main Street, City Center",
    phone: "(555) 123-4567",
    rating: 4.5,
    isOpen: true,
    distance: "1.2km",
    location: { lat: 40.7128, lng: -74.0060 },
  },
  {
    name: "University Medical Center",
    address: "456 College Road, University District",
    phone: "(555) 987-6543",
    rating: 4.8,
    isOpen: true,
    distance: "2.5km",
    location: { lat: 40.7282, lng: -73.9942 },
  },
  {
    name: "Sports Medicine Clinic",
    address: "789 Athletic Avenue, Stadium District",
    phone: "(555) 789-0123",
    rating: 4.3,
    isOpen: true,
    distance: "3.7km",
    location: { lat: 40.7023, lng: -74.0156 },
  },
];

export async function POST(request: Request) {
  try {
    const { latitude, longitude } = await request.json();

    // Log the coordinates for debugging
    console.log(`Searching for hospitals near coordinates: ${latitude}, ${longitude}`);

    // Use sample data if no valid API key is available
    if (!GOOGLE_PLACES_API_KEY || GOOGLE_PLACES_API_KEY === 'YOUR_GOOGLE_PLACES_API_KEY_HERE') {
      console.log('Using sample hospital data (API key not configured)');
      return NextResponse.json(
        {
          hospitals: SAMPLE_HOSPITALS,
          message: 'Using sample data - API key not configured',
        },
        {
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization',
          },
        }
      );
    }

    console.log(`Using Google Places API key: ${GOOGLE_PLACES_API_KEY.substring(0, 3)}...`);

    // Search for nearby hospitals using Google Places API
    try {
      const placeApiUrl = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=5000&type=hospital&key=${GOOGLE_PLACES_API_KEY}`;
      console.log(`Calling Google Places API: ${placeApiUrl.replace(GOOGLE_PLACES_API_KEY, 'API_KEY_HIDDEN')}`);

      const response = await fetch(placeApiUrl, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        cache: 'no-store',
      });

      if (!response.ok) {
        console.error(`Google Places API returned status: ${response.status}`);
        throw new Error(`Google Places API returned status: ${response.status}`);
      }

      const data = await response.json();
      console.log(`API response status: ${data.status}, Found ${data.results?.length || 0} hospitals`);

      if (data.status !== 'OK') {
        console.error(`Google Places API returned status: ${data.status}`);
        throw new Error(`Google Places API returned status: ${data.status}`);
      }

      // Process and format the hospital data (limit to 5 results)
      const hospitals = await Promise.all(
        data.results.slice(0, 5).map(async (place: any) => {
          try {
            // Calculate distance
            const distance = calculateDistance(
              latitude,
              longitude,
              place.geometry.location.lat,
              place.geometry.location.lng
            );

            return {
              name: place.name,
              address: place.vicinity,
              phone: place.formatted_phone_number || 'Tap to call',
              rating: place.rating || 0,
              isOpen: place.opening_hours?.open_now || false,
              distance: formatDistance(distance),
              location: place.geometry.location,
            };
          } catch (detailsError) {
            console.error('Error processing hospital data:', detailsError);

            // Return basic information if processing fails
            const distance = calculateDistance(
              latitude,
              longitude,
              place.geometry.location.lat,
              place.geometry.location.lng
            );

            return {
              name: place.name,
              address: place.vicinity || 'Address not available',
              phone: 'Tap to call',
              rating: place.rating || 0,
              isOpen: place.opening_hours?.open_now || false,
              distance: formatDistance(distance),
              location: place.geometry.location,
            };
          }
        })
      );

      console.log(`Successfully processed ${hospitals.length} hospitals`);
      return NextResponse.json({ hospitals });
    } catch (apiError) {
      console.error('Error calling Google Places API:', apiError);
      // Fall back to generated data if API call fails
      return NextResponse.json(
        {
          hospitals: generateNearbyHospitals(latitude, longitude),
          message:
            'Using generated nearby hospital data based on your location. API error: ' +
            (apiError instanceof Error ? apiError.message : String(apiError)),
        },
        {
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization',
          },
        }
      );
    }
  } catch (error) {
    console.error('Error finding nearby hospitals:', error);
    return NextResponse.json(
      {
        error: 'Failed to find nearby hospitals',
        hospitals: SAMPLE_HOSPITALS,
        message: 'Using sample data - Request processing failed',
      },
      {
        status: 500,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        },
      }
    );
  }
}

// Generate more realistic hospital data based on user's location
function generateNearbyHospitals(userLat: number, userLng: number) {
  const hospitals = [];
  const hospitalNames = [
    'Community Medical Center',
    "St. Mary's Hospital",
    'Regional Health Center',
    'Memorial Hospital',
    'University Medical Center',
    'General Hospital',
    'Riverside Medical Center',
    'Orthopedic Specialty Hospital',
  ];

  // Generate 5 hospitals at various distances
  for (let i = 0; i < 5; i++) {
    // Random distance between 0.3 and 8 km
    const distance = 0.3 + Math.random() * 7.7;

    // Random angle for position
    const angle = Math.random() * 2 * Math.PI;

    // Calculate new position (simplified - not accounting for Earth's curvature for short distances)
    // 0.009 is roughly 1km in latitude/longitude at mid-latitudes
    const lat = userLat + Math.sin(angle) * distance * 0.009;
    const lng = userLng + Math.cos(angle) * distance * 0.009;

    hospitals.push({
      name: hospitalNames[Math.floor(Math.random() * hospitalNames.length)],
      address: `${Math.floor(Math.random() * 1000) + 1} ${
        ['Main', 'Oak', 'Maple', 'Cedar', 'Hospital'][Math.floor(Math.random() * 5)]
      } ${
        ['Street', 'Avenue', 'Boulevard', 'Road'][Math.floor(Math.random() * 4)]
      }`,
      phone: `(${Math.floor(Math.random() * 900) + 100}) ${Math.floor(Math.random() * 900) + 100}-${
        Math.floor(Math.random() * 9000) + 1000
      }`,
      rating: Math.floor(Math.random() * 20 + 30) / 10, // Rating between 3.0 and 5.0
      isOpen: Math.random() > 0.2, // 80% chance of being open
      distance: formatDistance(distance),
      location: { lat, lng },
    });
  }

  // Sort by distance
  return hospitals.sort((a, b) => parseFloat(a.distance) - parseFloat(b.distance));
}

// Calculate distance between two points using the Haversine formula
function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371; // Earth's radius in kilometers
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

function toRad(degrees: number): number {
  return (degrees * Math.PI) / 180;
}

function formatDistance(distance: number): string {
  if (distance < 1) {
    return `${Math.round(distance * 1000)}m`;
  }
  return `${Math.round(distance * 10) / 10}km`;
} 