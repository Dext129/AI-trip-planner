import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Globe2, Landmark, Plane, Send } from "lucide-react";
import React from "react";


const suggestion = [
  {
    title: 'Create new trip',
    icon:<Globe2 className='text-blue-400 h-5 w-5 '/>
  },
  {
    title: 'Inspire me where to go',
    icon:<Plane className='text-green-400 h-5 w-5'/>
  },  {
    title: 'Descover hidden gems',
    icon:<Landmark className='text-orange-400 h-5 w-5'/>
  },  {
    title: 'Adventure Destination',
    icon:<Globe2 className='text-yellow-400 h-5 w-5'/>
  },
]

function Hero() {
  return (
    <div className="mt-24 w-full flex justify-center">
      {/* Content */}
        <div className="max-w-3xl w-full text-center space-y-6">
            <h1 className="text-xl md:text-5xl font-bold">Hey, I'm your personal <span className="text-primary">Trip Planner</span></h1>
            <p className="text-lg">Tell me what you want , and I'll handle the rest: Flights,Hotels,Trip Planner - all in seconds</p>
            {/* Input box */}
            <div>
                <div className="border rounded-2xl p-4 relative">
                    <Textarea placeholder="Create a trip for Paris from NewYork "
                    className="w-full h-28 bg-transparent border-none focus-visible:ring-0 shadow-none resize-none"
                    />
                    <Button size={'icon'} className='absolute bottom-6 right-6'>
                      <Send className='h-4 w-4'/>
                      </Button>
                </div>
            </div>
            {/* Suggestion list */}
            <div className="flex justify-center gap-2 mt-3">
              {suggestion.map((suggestion,index)=>(
                <div key={index} className="flex items-center gap-2 px-4 py-2 border rounded-full hover:bg-primary hover:text-white hover:border-primary cursor-pointer transition-colors group whitespace-nowrap">
                  <span className="group-hover:[&>svg]:text-white">
                    {suggestion.icon}
                  </span>
                  <h2 className="text-sm">{suggestion.title}</h2>
                </div>
              ))}
            </div>
        </div>
      {/* Video section */}

    </div>
  );
}

export default Hero;
