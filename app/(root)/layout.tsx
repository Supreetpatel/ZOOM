import StreamVideoProvider from '@/providers/StreamClientProvider';
import { Metadata } from 'next';
import React, { ReactNode } from 'react';

export const metadata: Metadata = {
  title: "YOOM",
  description: "Video calling app - inspired from zoom",
  icons :{
    icon:'/icons/logo.svg'
  }
};

const Rootlayout = ({children}:{children: ReactNode}) => {
  return (
    <main>
      <StreamVideoProvider>
        {children}
      </StreamVideoProvider>
      
    </main>
  )
}

export default Rootlayout
