'use client'
import React, { useState, useEffect } from 'react'
import { MapPin, Navigation } from 'lucide-react'

interface MapViewProps {
    location?: string;
}

function MapView({ location = 'World' }: MapViewProps) {
    const [mapUrl, setMapUrl] = useState('');

    useEffect(() => {
        // Generate Google Maps embed URL
        const query = encodeURIComponent(location);
        const embedUrl = `https://www.google.com/maps/embed/v1/place?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || 'YOUR_API_KEY'}&q=${query}&zoom=12`;
        setMapUrl(embedUrl);
    }, [location]);

    return (
        <div className='h-[85vh] flex flex-col border dark:border-gray-700 rounded-xl shadow-sm bg-white dark:bg-gray-800 overflow-hidden'>
            {/* Header */}
            <div className='flex items-center justify-between p-4 border-b dark:border-gray-700 bg-white dark:bg-gray-800'>
                <div className='flex items-center gap-2'>
                    <MapPin className='h-5 w-5 text-primary' />
                    <div>
                        <h2 className='text-xl font-semibold dark:text-white'>Location Map</h2>
                        <p className='text-sm text-gray-500 dark:text-gray-400'>{location}</p>
                    </div>
                </div>
                <Navigation className='h-5 w-5 text-gray-400 dark:text-gray-500' />
            </div>

            {/* Map Display */}
            <div className='flex-1 relative bg-gray-100 dark:bg-gray-900'>
                {process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ? (
                    <iframe
                        src={mapUrl}
                        className='w-full h-full border-0'
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                    />
                ) : (
                    <div className='w-full h-full flex items-center justify-center'>
                        <div className='text-center p-8'>
                            <MapPin className='h-16 w-16 text-gray-300 mx-auto mb-4' />
                            <h3 className='text-lg font-semibold mb-2'>Map Preview</h3>
                            <p className='text-gray-500 mb-4'>
                                Showing location: <span className='font-semibold'>{location}</span>
                            </p>
                            <div className='bg-blue-50 border border-blue-200 rounded-lg p-4 max-w-md mx-auto'>
                                <p className='text-sm text-blue-800'>
                                    To enable interactive maps, add your Google Maps API key to .env.local:
                                </p>
                                <code className='block mt-2 text-xs bg-white p-2 rounded'>
                                    NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_key_here
                                </code>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Trip Summary Section */}
            <div className='p-4 border-t dark:border-gray-700 bg-gray-50 dark:bg-gray-900'>
                <h3 className='font-semibold mb-2 dark:text-white'>Quick Info</h3>
                <div className='grid grid-cols-2 gap-2 text-sm'>
                    <div className='bg-white dark:bg-gray-800 p-2 rounded border dark:border-gray-700'>
                        <p className='text-gray-500 dark:text-gray-400'>Destination</p>
                        <p className='font-semibold dark:text-white'>{location}</p>
                    </div>
                    <div className='bg-white dark:bg-gray-800 p-2 rounded border dark:border-gray-700'>
                        <p className='text-gray-500 dark:text-gray-400'>Status</p>
                        <p className='font-semibold text-green-600 dark:text-green-400'>Planning</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MapView
