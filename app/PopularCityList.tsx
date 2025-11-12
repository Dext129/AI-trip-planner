    "use client";

import React from "react";
import { Carousel, Card } from "@/components/ui/apple-cards-carousel";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { MapPin, Calendar, Users } from "lucide-react";

export function PopularCityList() {
  const cards = data.map((card, index) => (
    <Card key={card.src} card={card} index={index} />
  ));

  return (
    <div className="w-full h-full py-20">
      <h2 className="max-w-7xl pl-4 mx-auto text-xl md:text-3xl font-bold text-neutral-800 dark:text-neutral-200 font-sans">
        Popular Destinations to visit
      </h2>
      <Carousel items={cards} />
    </div>
  );
}

const DummyContent = ({ city }: { city: string }) => {
  const router = useRouter();
  const { user } = useUser();

  const handlePlanTrip = () => {
    if (!user) {
      router.push('/sign-in');
      return;
    }
    router.push('/create-new-trip');
  };

  const cityInfo: Record<string, { highlights: string[], bestTime: string, duration: string }> = {
    "Paris, France": {
      highlights: ["Eiffel Tower", "Louvre Museum", "Notre-Dame Cathedral", "Champs-Élysées"],
      bestTime: "April to June, September to October",
      duration: "4-5 days"
    },
    "New York, USA": {
      highlights: ["Times Square", "Central Park", "Statue of Liberty", "Broadway Shows"],
      bestTime: "April to June, September to November",
      duration: "5-7 days"
    },
    "Tokyo, Japan": {
      highlights: ["Shibuya Crossing", "Senso-ji Temple", "Tokyo Tower", "Cherry Blossoms"],
      bestTime: "March to May, September to November",
      duration: "5-7 days"
    },
    "Rome, Italy": {
      highlights: ["Colosseum", "Vatican City", "Trevi Fountain", "Roman Forum"],
      bestTime: "April to June, September to October",
      duration: "4-5 days"
    },
    "Dubai, UAE": {
      highlights: ["Burj Khalifa", "Dubai Mall", "Desert Safari", "Palm Jumeirah"],
      bestTime: "November to March",
      duration: "3-4 days"
    },
    "India": {
      highlights: ["Taj Mahal", "Jaipur Palaces", "Kerala Backwaters", "Goa Beaches"],
      bestTime: "October to March",
      duration: "7-10 days"
    }
  };

  const info = cityInfo[city] || cityInfo["Paris, France"];

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:bg-neutral-800 p-8 md:p-10 rounded-3xl">
        <h3 className="text-2xl font-bold text-neutral-800 dark:text-neutral-200 mb-4">
          Why Visit {city}?
        </h3>
        <div className="grid md:grid-cols-3 gap-4 mb-6">
          <div className="flex items-start gap-3">
            <Calendar className="h-5 w-5 text-primary mt-1" />
            <div>
              <p className="font-semibold text-neutral-700 dark:text-neutral-300">Best Time</p>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">{info.bestTime}</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Users className="h-5 w-5 text-primary mt-1" />
            <div>
              <p className="font-semibold text-neutral-700 dark:text-neutral-300">Duration</p>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">{info.duration}</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <MapPin className="h-5 w-5 text-primary mt-1" />
            <div>
              <p className="font-semibold text-neutral-700 dark:text-neutral-300">Location</p>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">{city}</p>
            </div>
          </div>
        </div>
        
        <div className="mb-6">
          <h4 className="font-semibold text-neutral-700 dark:text-neutral-300 mb-3">Top Highlights</h4>
          <div className="grid grid-cols-2 gap-2">
            {info.highlights.map((highlight, idx) => (
              <div key={idx} className="flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-400">
                <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
                {highlight}
              </div>
            ))}
          </div>
        </div>

        <Button 
          onClick={handlePlanTrip}
          className="w-full md:w-auto"
          size="lg"
        >
          Plan Your Trip to {city.split(',')[0]}
        </Button>
      </div>

      <div className="bg-white dark:bg-neutral-800 p-8 md:p-10 rounded-3xl">
        <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-lg font-sans">
          <span className="font-bold text-neutral-700 dark:text-neutral-200">
            Ready to explore {city}?
          </span>{" "}
          Let our AI-powered trip planner create a personalized itinerary just for you. 
          Get recommendations for the best hotels, restaurants, activities, and hidden gems 
          that match your interests and budget.
        </p>
      </div>
    </div>
  );
};

const data = [
    {
        category: "Paris, France",
        title: "Explore the City of Lights – Eiffel Tower, Louvre & more",
        src: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=2600&auto=format&fit=crop",
        content: <DummyContent city="Paris, France" />,
    },
    {
        category: "New York, USA",
        title: "Experience NYC – Times Square, Central Park, Broadway",
        src: "https://plus.unsplash.com/premium_photo-1661954654458-c673671d4a08?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        content: <DummyContent city="New York, USA" />,
    },
    {
        category: "Tokyo, Japan",
        title: "Discover Tokyo – Shibuya, Cherry Blossoms, Temples",
        src: "https://images.unsplash.com/photo-1522547902298-51566e4fb383?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        content: <DummyContent city="Tokyo, Japan" />,
    },
    {
        category: "Rome, Italy",
        title: "Walk through History – Colosseum, Vatican, Roman Forum",
        src: "https://plus.unsplash.com/premium_photo-1675975678457-d70708bf77c8?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        content: <DummyContent city="Rome, Italy" />,
    },
    {
        category: "Dubai, UAE",
        title: "Luxury and Innovation – Burj Khalifa, Desert Safari",
        src: "https://images.unsplash.com/photo-1526495124232-a04e1849168c?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        content: <DummyContent city="Dubai, UAE" />,
    },
    {
        category: "India",
        title: "Incredible India – Taj Mahal, Palaces & Beaches",
        src: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        content: <DummyContent city="India" />,
    },
];


