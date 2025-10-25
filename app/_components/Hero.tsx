"use client"
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ArrowDown, Globe2, Landmark, Plane, Send } from "lucide-react";
import { HeroVideoDialog } from "@/components/ui/hero-video-dialog"
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
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
  const {user} = useUser();
  const router =  useRouter();
  const onSend = () => {
    if(!user){
      router.push('/sign-in');
      return;
    }
    //Navigate to Create trip planner web page
    router.push('/create-new-trip');
    
  }
  return (
    <div className="mt-24 w-full flex flex-col items-center gap-8">
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
                    <Button size={'icon'} className='absolute bottom-6 right-6' onClick={()=>onSend()}>
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
      <h2 className="my-7 mt-14 flex gap-2 text-center">Not Sure where to Start <strong>See How it works</strong> <ArrowDown className="h-5 w-5"/></h2>
      <div className="max-w-3xl w-full">
        <HeroVideoDialog
          className="block dark:hidden"
          animationStyle="from-center"
          videoSrc="https://www.example.com/dummy-video"
          thumbnailSrc="https://mma.prnewswire.com/media/2401528/1_MindtripProduct.jpg?p=facebook"
          thumbnailAlt="Dummy Video Thumbnail"
        />
      </div>
    </div>
  );
}

export default Hero;
