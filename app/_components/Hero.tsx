"use client"
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ArrowDown, Globe2, Landmark, Plane, Send } from "lucide-react";
import { HeroVideoDialog } from "@/components/ui/hero-video-dialog"
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useState } from "react";

const suggestion = [
  {
    title: 'Create new trip',
    icon:<Globe2 className='text-blue-400 h-5 w-5 '/>,
    action: 'create'
  },
  {
    title: 'Inspire me where to go',
    icon:<Plane className='text-green-400 h-5 w-5'/>,
    action: 'inspire'
  },  
  {
    title: 'Discover hidden gems',
    icon:<Landmark className='text-orange-400 h-5 w-5'/>,
    action: 'discover'
  },  
  {
    title: 'Adventure Destination',
    icon:<Globe2 className='text-yellow-400 h-5 w-5'/>,
    action: 'adventure'
  },
]

function Hero() {
  const {user} = useUser();
  const router = useRouter();
  const [tripInput, setTripInput] = useState('');

  const onSend = () => {
    if(!user){
      router.push('/sign-in');
      return;
    }
    // Navigate to Create trip planner web page
    router.push('/create-new-trip');
  }

  const handleSuggestionClick = (action: string) => {
    if(!user){
      router.push('/sign-in');
      return;
    }

    // Set appropriate text based on suggestion
    switch(action) {
      case 'create':
        router.push('/create-new-trip');
        break;
      case 'inspire':
        setTripInput('Inspire me with unique travel destinations');
        router.push('/create-new-trip');
        break;
      case 'discover':
        setTripInput('Show me hidden gems and off-the-beaten-path destinations');
        router.push('/create-new-trip');
        break;
      case 'adventure':
        setTripInput('Suggest adventure destinations for thrill seekers');
        router.push('/create-new-trip');
        break;
    }
  }

  return (
    <div className="mt-24 w-full flex flex-col items-center gap-8">
      {/* Content */}
        <div className="max-w-3xl w-full text-center space-y-6">
            <h1 className="text-xl md:text-5xl font-bold dark:text-white">Hey, I'm your personal <span className="text-primary">Trip Planner</span></h1>
            <p className="text-lg dark:text-gray-300">Tell me what you want, and I'll handle the rest: Flights, Hotels, Trip Planner - all in seconds</p>
            {/* Input box */}
            <div>
                <div className="border dark:border-gray-700 rounded-2xl p-4 relative bg-white dark:bg-gray-800">
                    <Textarea 
                      placeholder="Create a trip for Paris from New York"
                      className="w-full h-28 bg-transparent border-none focus-visible:ring-0 shadow-none resize-none dark:text-white dark:placeholder:text-gray-400"
                      value={tripInput}
                      onChange={(e) => setTripInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                          e.preventDefault();
                          onSend();
                        }
                      }}
                    />
                    <Button 
                      size={'icon'} 
                      className='absolute bottom-6 right-6' 
                      onClick={onSend}
                      disabled={!tripInput.trim()}
                    >
                      <Send className='h-4 w-4'/>
                    </Button>
                </div>
            </div>
            {/* Suggestion list */}
            <div className="flex justify-center gap-2 mt-3 flex-wrap">
              {suggestion.map((item, index)=>(
                <div 
                  key={index} 
                  className="flex items-center gap-2 px-4 py-2 border dark:border-gray-700 rounded-full hover:bg-primary hover:text-white hover:border-primary cursor-pointer transition-colors group whitespace-nowrap dark:bg-gray-800 dark:text-gray-300"
                  onClick={() => handleSuggestionClick(item.action)}
                >
                  <span className="group-hover:[&>svg]:text-white">
                    {item.icon}
                  </span>
                  <h2 className="text-sm">{item.title}</h2>
                </div>
              ))}
            </div>
        </div>

      {/* Video section */}
      <h2 className="my-7 mt-14 flex gap-2 text-center items-center justify-center dark:text-white">
        Not Sure where to Start? <strong className="ml-1">See How it works</strong> 
        <ArrowDown className="h-5 w-5"/>
      </h2>
      <div className="max-w-3xl w-full">
        <HeroVideoDialog
          className="block"
          animationStyle="from-center"
          videoSrc="https://www.youtube.com/embed/cbw6Q2vZnRU"
          thumbnailSrc="https://mma.prnewswire.com/media/2401528/1_MindtripProduct.jpg?p=facebook"
          thumbnailAlt="Trip Planner Demo Video"
        />
      </div>
    </div>
  );
}

export default Hero;
