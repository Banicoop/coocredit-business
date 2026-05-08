import React from 'react'

const AuthLayout = ({children}: {children: React.ReactNode}) => {
  return (
    <main className='bg-[#F1F5F9] min-h-screen flex flex-1 flex-col'>
        {children}
    </main>
  )
}

export default AuthLayout;
