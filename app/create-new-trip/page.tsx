"use client"
import React, { useState } from 'react'
import Chatbox from './_components/Chatbox'
import MapView from './_components/MapView'
import BudgetCalculator from './_components/BudgetCalculator'

function CreateNewTrip() {
  const [currentLocation, setCurrentLocation] = useState<string>('World');
  const [showBudget, setShowBudget] = useState(true);

  const handleLocationExtract = (location: string) => {
    setCurrentLocation(location);
  };

  return (
    <div className='min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800 p-4 md:p-10 transition-colors'>
      <div className='max-w-[1800px] mx-auto'>
        <div className='mb-6 flex items-center justify-between'>
          <div>
            <h1 className='text-3xl font-bold text-gray-800 dark:text-white'>Plan Your Perfect Trip</h1>
            <p className='text-gray-600 dark:text-gray-300 mt-2'>Chat with AI, view map, and calculate your budget</p>
          </div>
          <button
            onClick={() => setShowBudget(!showBudget)}
            className='px-4 py-2 bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-sm font-medium dark:text-white'
          >
            {showBudget ? 'Hide' : 'Show'} Budget Calculator
          </button>
        </div>
        
        <div className={`grid grid-cols-1 ${showBudget ? 'lg:grid-cols-3' : 'lg:grid-cols-2'} gap-6`}>
          <div>
            <Chatbox onLocationExtract={handleLocationExtract} />
          </div>
          <div>
            <MapView location={currentLocation} />
          </div>
          {showBudget && (
            <div>
              <BudgetCalculator destination={currentLocation} />
            </div>
          )}
        </div>
      </div>
    </div>  
  )
}

export default CreateNewTrip