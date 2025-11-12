'use client'
import React, { useState, useEffect } from 'react'
import { DollarSign, Plane, Hotel, Utensils, MapPin, TrendingUp, TrendingDown, Minus } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface BudgetCalculatorProps {
    destination?: string;
    onBudgetUpdate?: (total: number) => void;
}

interface BudgetItem {
    category: string;
    amount: number;
    icon: React.ReactNode;
    color: string;
}

function BudgetCalculator({ destination = 'World', onBudgetUpdate }: BudgetCalculatorProps) {
    const [days, setDays] = useState(5);
    const [travelers, setTravelers] = useState(2);
    const [budgetStyle, setBudgetStyle] = useState<'budget' | 'moderate' | 'luxury'>('moderate');

    // Base costs per day per person (in INR) - India-centric pricing
    const baseCosts = {
        budget: { accommodation: 800, food: 500, activities: 400, transport: 300 },
        moderate: { accommodation: 2000, food: 1200, activities: 1000, transport: 600 },
        luxury: { accommodation: 5000, food: 3000, activities: 2500, transport: 1500 }
    };

    // Flight costs (estimated in INR) - Domestic India flights
    const flightCosts = {
        budget: 4000,
        moderate: 8000,
        luxury: 15000
    };

    const calculateBudget = () => {
        const costs = baseCosts[budgetStyle];
        const flightCost = flightCosts[budgetStyle];

        const accommodation = costs.accommodation * days * travelers;
        const food = costs.food * days * travelers;
        const activities = costs.activities * days * travelers;
        const transport = costs.transport * days * travelers;
        const flights = flightCost * travelers;

        return {
            accommodation,
            food,
            activities,
            transport,
            flights,
            total: accommodation + food + activities + transport + flights
        };
    };

    const budget = calculateBudget();

    useEffect(() => {
        if (onBudgetUpdate) {
            onBudgetUpdate(budget.total);
        }
    }, [budget.total, onBudgetUpdate]);

    const budgetItems: BudgetItem[] = [
        {
            category: 'Flights',
            amount: budget.flights,
            icon: <Plane className="h-5 w-5" />,
            color: 'text-blue-500'
        },
        {
            category: 'Accommodation',
            amount: budget.accommodation,
            icon: <Hotel className="h-5 w-5" />,
            color: 'text-purple-500'
        },
        {
            category: 'Food & Dining',
            amount: budget.food,
            icon: <Utensils className="h-5 w-5" />,
            color: 'text-orange-500'
        },
        {
            category: 'Activities',
            amount: budget.activities,
            icon: <MapPin className="h-5 w-5" />,
            color: 'text-green-500'
        },
        {
            category: 'Local Transport',
            amount: budget.transport,
            icon: <TrendingUp className="h-5 w-5" />,
            color: 'text-red-500'
        }
    ];

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(amount);
    };

    return (
        <div className='h-[85vh] flex flex-col border dark:border-gray-700 rounded-xl shadow-sm bg-white dark:bg-gray-800 overflow-hidden'>
            {/* Header */}
            <div className='p-4 border-b dark:border-gray-700 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20'>
                <div className='flex items-center gap-2 mb-2'>
                    <DollarSign className='h-6 w-6 text-green-600 dark:text-green-400' />
                    <h2 className='text-xl font-semibold dark:text-white'>Trip Budget Calculator</h2>
                </div>
                <p className='text-sm text-gray-600 dark:text-gray-400'>Estimate your travel costs for {destination}</p>
            </div>

            {/* Calculator Controls */}
            <div className='p-4 space-y-4 border-b dark:border-gray-700 bg-gray-50 dark:bg-gray-900'>
                {/* Days */}
                <div>
                    <label className='text-sm font-semibold text-gray-700 mb-2 block'>
                        Trip Duration: {days} days
                    </label>
                    <div className='flex items-center gap-3'>
                        <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setDays(Math.max(1, days - 1))}
                        >
                            <Minus className='h-4 w-4' />
                        </Button>
                        <input
                            type="range"
                            min="1"
                            max="30"
                            value={days}
                            onChange={(e) => setDays(Number(e.target.value))}
                            className='flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer'
                        />
                        <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setDays(Math.min(30, days + 1))}
                        >
                            <TrendingUp className='h-4 w-4' />
                        </Button>
                    </div>
                </div>

                {/* Travelers */}
                <div>
                    <label className='text-sm font-semibold text-gray-700 mb-2 block'>
                        Number of Travelers: {travelers}
                    </label>
                    <div className='flex items-center gap-3'>
                        <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setTravelers(Math.max(1, travelers - 1))}
                        >
                            <Minus className='h-4 w-4' />
                        </Button>
                        <input
                            type="range"
                            min="1"
                            max="10"
                            value={travelers}
                            onChange={(e) => setTravelers(Number(e.target.value))}
                            className='flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer'
                        />
                        <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setTravelers(Math.min(10, travelers + 1))}
                        >
                            <TrendingUp className='h-4 w-4' />
                        </Button>
                    </div>
                </div>

                {/* Budget Style */}
                <div>
                    <label className='text-sm font-semibold text-gray-700 mb-2 block'>
                        Travel Style
                    </label>
                    <div className='grid grid-cols-3 gap-2'>
                        <Button
                            size="sm"
                            variant={budgetStyle === 'budget' ? 'default' : 'outline'}
                            onClick={() => setBudgetStyle('budget')}
                            className='text-xs'
                        >
                            <TrendingDown className='h-3 w-3 mr-1' />
                            Budget
                        </Button>
                        <Button
                            size="sm"
                            variant={budgetStyle === 'moderate' ? 'default' : 'outline'}
                            onClick={() => setBudgetStyle('moderate')}
                            className='text-xs'
                        >
                            <Minus className='h-3 w-3 mr-1' />
                            Moderate
                        </Button>
                        <Button
                            size="sm"
                            variant={budgetStyle === 'luxury' ? 'default' : 'outline'}
                            onClick={() => setBudgetStyle('luxury')}
                            className='text-xs'
                        >
                            <TrendingUp className='h-3 w-3 mr-1' />
                            Luxury
                        </Button>
                    </div>
                </div>
            </div>

            {/* Budget Breakdown */}
            <div className='flex-1 overflow-y-auto p-4'>
                <h3 className='font-semibold mb-3 text-gray-700 dark:text-gray-300'>Cost Breakdown</h3>
                <div className='space-y-3'>
                    {budgetItems.map((item, index) => (
                        <div key={index} className='bg-gray-50 dark:bg-gray-900 rounded-lg p-3 border dark:border-gray-700'>
                            <div className='flex items-center justify-between mb-2'>
                                <div className='flex items-center gap-2'>
                                    <span className={item.color}>{item.icon}</span>
                                    <span className='text-sm font-medium dark:text-white'>{item.category}</span>
                                </div>
                                <span className='font-semibold text-gray-800 dark:text-white'>
                                    {formatCurrency(item.amount)}
                                </span>
                            </div>
                            <div className='w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2'>
                                <div
                                    className='bg-primary h-2 rounded-full transition-all'
                                    style={{ width: `${(item.amount / budget.total) * 100}%` }}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Total */}
            <div className='p-4 border-t dark:border-gray-700 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20'>
                <div className='flex items-center justify-between mb-2'>
                    <span className='text-lg font-semibold text-gray-700 dark:text-gray-300'>Estimated Total</span>
                    <span className='text-2xl font-bold text-primary'>
                        {formatCurrency(budget.total)}
                    </span>
                </div>
                <p className='text-xs text-gray-600 dark:text-gray-400 text-center'>
                    For {travelers} traveler{travelers > 1 ? 's' : ''} • {days} day{days > 1 ? 's' : ''} • {budgetStyle.charAt(0).toUpperCase() + budgetStyle.slice(1)} style
                </p>
                <div className='mt-3 text-xs text-gray-500 dark:text-gray-400 text-center'>
                    💡 Prices are estimates and may vary based on season and availability
                </div>
            </div>
        </div>
    )
}

export default BudgetCalculator
