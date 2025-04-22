"use client"
import React from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'

const Navbar = () => {
  const pathname = usePathname()
  const showNavbar = ["/", "/generate"].includes(pathname)

  return (
  <>
  { showNavbar &&<nav className='bg-white [@media(max-width:621px)]:mx-auto [@media(max-width:621px)]:w-[98vw] px-4 py-10 rounded-full h-15 flex [@media(max-width:621px)]:gap-6 justify-between items-center m-6 fixed w-[95vw]'>
    <div className="logo"><img className='object-contain  text-2xl' src="	https://linktr.ee/marketplace/assets/nav/logo-desktop.svg" alt="" /></div>
    <div>
        <ul className='flex justify-center [@media(max-width:621px)]:justify-between [@media(max-width:621px)]:8 items-center text-xl  gap-4'>
          <Link href="/"><li className='hover:text-gray-500 cursor-pointer [@media(max-width:621px)]:text-sm'>Home</li>  </Link>
            
            <li className='hover:text-gray-500 cursor-pointer [@media(max-width:621px)]:text-sm'>Admin</li>
            <li><button className='bg-black cursor-pointer [@media(max-width:621px)]:text-sm [@media(max-width:621px)]:p-1 [@media(max-width:621px)]:rounded-full  hover:bg-gray-600 text-white p-3 rounded-full'>SignIn</button></li>
        </ul>
    </div>
  </nav> }

  </>
  )
}

export default Navbar
