import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send } from "lucide-react";
import React from "react";

function Hero() {
  return (
    <div className="mt-24 w-full flex justify-center">
      {/* Content */}
        <div className="max-w-3xl w-full text-center space-y-6">
            <h1 className="text-xl md:text-5xl font-bold">Hey, I'm your personal <span className="text-primary">Trip Planner</span></h1>
            <p className="text-lg">Tell me what you want , and I'll handle the rest: Flights,Hotels,Trip Planner - all in seconds</p>
            {/* Input box */}
            <div>
                <div className="border rounded-2xl p-4">
                    <Textarea placeholder="Create a trip for Paris from NewYork "
                    className="w-full h-28 bg-transparent border-none focus-visible:ring-0 shadow-none resize-none"
                    />
                    <Button size={'icon'}><Send/></Button>
                </div>
            </div>
        </div>
      {/* Suggestion list */}

      {/* Video section */}

    </div>
  );
}

export default Hero;
