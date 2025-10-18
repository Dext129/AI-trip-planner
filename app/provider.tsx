"use client"
import React, { useEffect } from 'react'
import Header from './_components/Header';
import { useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { useUser } from '@clerk/nextjs';
function Provider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const CreateUser = useMutation(api.user.CreateNewUser)

  const {user} = useUser();


useEffect(() => {
 if(user) {
   CreateNewUser();
 }
},[user])

  
  const CreateNewUser = async () => {
    // Save new user if not exist
    try {
      const result = await CreateUser({
        email: user?.primaryEmailAddress?.emailAddress ?? '',
        imageUrl: user?.imageUrl ?? '',
        name: user?.fullName ?? '', 
      })
      console.log('User created/fetched:', result);
    } catch (error) {
      console.error('Error creating user:', error);
    }
  }
  return (
    <div> 
        <Header/>
        {children}</div>
  )
}

export default Provider