"use client"
import React, { useContext, useEffect, useState } from 'react'
import Header from './_components/Header';
import Footer from './_components/Footer';
import { useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { useUser } from '@clerk/nextjs';
import { UserDetailContext } from '@/context/UserDetailContext';
import { ThemeProvider } from '@/context/ThemeContext';

function LayoutContent({
  children,
}: {
  children: React.ReactNode;
}) {
  const CreateUser = useMutation(api.user.CreateNewUser)
  const [userDetail, setUserDetail] = useState<any>();
  const { user } = useUser();

  useEffect(() => {
    if (user) {
      CreateNewUser();
    }
  }, [user])

  const CreateNewUser = async () => {
    // Save new user if not exist
    try {
      const result = await CreateUser({
        email: user?.primaryEmailAddress?.emailAddress ?? '',
        imageUrl: user?.imageUrl ?? '',
        name: user?.fullName ?? '', 
      })
      setUserDetail(result);
      console.log('✅ User saved to Convex:', result);
      console.log('📧 Email:', user?.primaryEmailAddress?.emailAddress);
      console.log('👤 Name:', user?.fullName);
      console.log('🖼️ Image:', user?.imageUrl);
    } catch (error) {
      console.error('❌ Error saving user to Convex:', error);
    }
  }

  return (
    <UserDetailContext.Provider value={{ userDetail, setUserDetail }}>
      <div className="flex flex-col min-h-screen bg-white dark:bg-gray-900 transition-colors"> 
        <Header/>
        <main className="flex-1">
          {children}
        </main>
        <Footer/>
      </div>
    </UserDetailContext.Provider>
  )
}

function Provider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ThemeProvider>
      <LayoutContent>
        {children}
      </LayoutContent>
    </ThemeProvider>
  )
}

export default Provider
export const useUserDetail = () => {
  return useContext(UserDetailContext);
}