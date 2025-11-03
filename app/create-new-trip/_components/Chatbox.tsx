import { Button } from '@/components/ui/button'
import { div, section } from 'motion/react-client'
import React from 'react'
import { Textarea } from '@/components/ui/textarea'
import { Send } from 'lucide-react'
import axios from 'axios'
import { useState } from 'react'

type Message={
    role:string;
    content:string;
}

function Chatbox() {
    const [messages,setMessages]=useState<Message[]>([]);
    const [userInput,setUserInput]=useState<string>();
  const onSend = () => {
    if(!userInput?.trim()) return;
    setUserInput('');
        const newMsg:Message={
            role:'user',
            content:userInput
        }
    const result=await axios.post('/api/aimodel',{
        messages:
    })
  };

  return (
    <div className='h-[85vh] flex flex-col'>
        {/* Display messages */}
        <section className='flex-1 overflow-y-auto p-4'>
            <div className='flex justify-end mt-2'>
                <div className='max-w-lg bg-primary text-white px-4 py-2 rounded-lg'>
                    User msg
                </div>
            </div>
            <div className='flex justify-start mt-2'>
                <div className='max-w-lg bg-gray-100 text-black px-4 py-2 rounded-lg'>
                    Ai agent message
                </div>
            </div>
        </section>
        {/* User input */}
        <section>
            <div className="border rounded-2xl p-4 relative">
                <Textarea 
                    placeholder="Create a trip for Paris from NewYork"
                    className="w-full h-28 bg-transparent border-none focus-visible:ring-0 shadow-none resize-none"
                onChange={(event)=>setUserInput(event.target.value)}
                value={userInput}
                />
                <Button size={'icon'} className='absolute bottom-6 right-6' onClick={()=>onSend()}>
                    <Send className='h-4 w-4'/>
                </Button>
            </div>
        </section>
    </div>
  )
}

export default Chatbox