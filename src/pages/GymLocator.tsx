import React, { useState, useEffect, useRef } from 'react';
import { Loader } from '@googlemaps/js-api-loader';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { MapPin, Phone, Clock, DollarSign, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';

// We'll simulate gym data since we can't actually call the Places API without a key
const mockGymData = [
  {
    id: 'gym1',
    name: 'FitLife Gym',
    vicinity: '123 Main St, New York, NY',
    rating: 4.5,
    openingHours: {
      weekdayText: [
        'Monday: 6:00 AM – 10:00 PM',
        'Tuesday: 6:00 AM – 10:00 PM',
        'Wednesday: 6:00 AM – 10:00 PM',
        'Thursday: 6:00 AM – 10:00 PM',
        'Friday: 6:00 AM – 10:00 PM',
        'Saturday: 8:00 AM – 8:00 PM',
        'Sunday: 8:00 AM – 6:00 PM',
      ]
    },
    fees: '$49.99 per month',
    phone: '(555) 123-4567',
    location: { lat: 40.7128, lng: -74.0060 }
  },
  {
    id: 'gym2',
    name: 'PowerHouse Fitness',
    vicinity: '456 Park Ave, New York, NY',
    rating: 4.2,
    openingHours: {
      weekdayText: [
        'Monday: 5:00 AM – 11:00 PM',
        'Tuesday: 5:00 AM – 11:00 PM',
        'Wednesday: 5:00 AM – 11:00 PM',
        'Thursday: 5:00 AM – 11:00 PM',
        'Friday: 5:00 AM – 11:00 PM',
        'Saturday: 7:00 AM – 9:00 PM',
        'Sunday: 7:00 AM – 7:00 PM',
      ]
    },
    fees: '$59.99 per month',
    phone: '(555) 987-6543',
    location: { lat: 40.7193, lng: -73.9900 }
  },
  {
    id: 'gym3',
    name: 'Iron Works Gym',
    vicinity: '789 Broadway, New York, NY',
    rating: 4.7,
    openingHours: {
      weekdayText: [
        'Monday: 24 hours',
        'Tuesday: 24 hours',
        'Wednesday: 24 hours',
        'Thursday: 24 hours',
        'Friday: 24 hours',
        'Saturday: 24 hours',
        'Sunday: 24 hours',
      ]
    },
    fees: '$79.99 per month',
    phone: '(555) 456-7890',
    location: { lat: 40.7050, lng: -74.0090 }
  },
];

type Gym = {
  id: string;
  name: string;
  vicinity: string;
  rating: number;
  openingHours?: {
    weekdayText: string[];
  };
  fees: string;
  phone: string;
  location: {
    lat: number;
    lng: number;
  };
};

const GymLocator = () => {
  const [gyms, setGyms] = useState<Gym[]>([]);
  const [selectedGym, setSelectedGym] = useState<Gym | null>(null);
  const [loading, setLoading] = useState(true);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [searchRadius, setSearchRadius] = useState(5); // default 5 km
  const [searchQuery, setSearchQuery] = useState('');
  const mapRef = useRef<HTMLDivElement>(null);
  const googleMapRef = useRef<google.maps.Map | null>(null);
  const markersRef = useRef<google.maps.Marker[]>([]);
  const { toast } = useToast();
  const [googleMapsLoaded, setGoogleMapsLoaded] = useState(false);

  // Load Google Maps API
  useEffect(() => {
    const initMap = async () => {
      try {
        const loader = new Loader({
          apiKey: "AIzaSyNotYourActualKey123456789",
          version: "weekly",
          libraries: ["places"]
        });

        await loader.load();
        setGoogleMapsLoaded(true);
        getUserLocation();
      } catch (error) {
        console.error("Error loading Google Maps API:", error);
        toast({
          title: "Error",
          description: "Failed to load maps. Please try again later.",
          variant: "destructive"
        });
        setLoading(false);
      }
    };

    initMap();
  }, [toast]);

  // Get user's location
  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ lat: latitude, lng: longitude });
        },
        (error) => {
          console.error("Error getting location:", error);
          toast({
            title: "Location Error",
            description: "Failed to get your location. Using default location.",
          });
          setUserLocation({ lat: 40.7128, lng: -74.0060 });
        }
      );
    } else {
      toast({
        title: "Location Not Supported",
        description: "Geolocation is not supported by your browser.",
      });
      setUserLocation({ lat: 40.7128, lng: -74.0060 });
    }
  };

  // Initialize map when user location is available
  useEffect(() => {
    if (userLocation && mapRef.current && googleMapsLoaded && window.google) {
      googleMapRef.current = new window.google.maps.Map(mapRef.current, {
        center: userLocation,
        zoom: 13,
        mapTypeControl: false,
      });

      new window.google.maps.Marker({
        position: userLocation,
        map: googleMapRef.current,
        icon: {
          path: window.google.maps.SymbolPath.CIRCLE,
          scale: 10,
          fillColor: "#4285F4",
          fillOpacity: 1,
          strokeColor: "#ffffff",
          strokeWeight: 2,
        },
        title: "Your Location",
      });

      setGyms(mockGymData);
      setLoading(false);
      
      addGymMarkers(mockGymData);
    }
  }, [userLocation, googleMapsLoaded]);

  // Add markers for gyms on the map
  const addGymMarkers = (gyms: Gym[]) => {
    if (!googleMapRef.current || !window.google) return;
    
    markersRef.current.forEach(marker => marker.setMap(null));
    markersRef.current = [];
    
    gyms.forEach(gym => {
      const marker = new window.google.maps.Marker({
        position: gym.location,
        map: googleMapRef.current,
        title: gym.name,
        animation: window.google.maps.Animation.DROP,
      });
      
      marker.addListener("click", () => {
        setSelectedGym(gym);
      });
      
      markersRef.current.push(marker);
    });
  };

  // Search gyms functionality (simulated)
  const handleSearch = () => {
    setLoading(true);
    
    const filteredGyms = mockGymData.filter(gym => 
      gym.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    
    setTimeout(() => {
      setGyms(filteredGyms);
      addGymMarkers(filteredGyms);
      setLoading(false);
    }, 500);
  };

  return (
    <div className="container mx-auto py-6 px-4">
      <h1 className="text-2xl font-bold mb-6">Find Gyms Near You</h1>
      
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="lg:w-2/3 h-[400px] lg:h-[600px] rounded-lg overflow-hidden shadow-lg bg-gray-100 dark:bg-gray-800">
          {loading ? (
            <div className="h-full flex items-center justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
          ) : (
            <div ref={mapRef} className="h-full w-full"></div>
          )}
        </div>
        
        <div className="lg:w-1/3">
          <Card>
            <CardHeader>
              <CardTitle>Search Gyms</CardTitle>
              <CardDescription>Find gyms in your area</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex mb-4">
                <Input
                  placeholder="Search by name..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="mr-2"
                />
                <Button onClick={handleSearch} size="icon">
                  <Search className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
                {gyms.length === 0 ? (
                  <p className="text-center py-4 text-gray-500">No gyms found</p>
                ) : (
                  gyms.map((gym) => (
                    <Card 
                      key={gym.id} 
                      className={`cursor-pointer ${selectedGym?.id === gym.id ? 'border-primary' : ''}`}
                      onClick={() => setSelectedGym(gym)}
                    >
                      <CardHeader className="p-4">
                        <CardTitle className="text-lg">{gym.name}</CardTitle>
                        <CardDescription className="flex items-center">
                          <MapPin className="h-4 w-4 mr-1" />
                          {gym.vicinity}
                        </CardDescription>
                      </CardHeader>
                    </Card>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
          
          {selectedGym && (
            <Card className="mt-4">
              <CardHeader>
                <CardTitle>{selectedGym.name}</CardTitle>
                <CardDescription>Gym Details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <h3 className="font-semibold flex items-center">
                    <Clock className="h-4 w-4 mr-2" /> Opening Hours
                  </h3>
                  <ul className="text-sm pl-6 mt-1">
                    {selectedGym.openingHours?.weekdayText.map((day, idx) => (
                      <li key={idx}>{day}</li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-semibold flex items-center">
                    <DollarSign className="h-4 w-4 mr-2" /> Membership Fee
                  </h3>
                  <p className="text-sm pl-6">{selectedGym.fees}</p>
                </div>
                
                <div>
                  <h3 className="font-semibold flex items-center">
                    <Phone className="h-4 w-4 mr-2" /> Contact
                  </h3>
                  <p className="text-sm pl-6">{selectedGym.phone}</p>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full" onClick={() => window.open(`https://www.google.com/maps/dir/?api=1&destination=${selectedGym.location.lat},${selectedGym.location.lng}`, '_blank')}>
                  Get Directions
                </Button>
              </CardFooter>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default GymLocator;
