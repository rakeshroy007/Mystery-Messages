'use client'

import React from 'react'
import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'
import { User } from 'next-auth'
import { Button } from './ui/button'


const Navbar = () => {
    const { data: session, status } = useSession();

    const user: User = session?.user as User      

    return (
        <nav className="p-4 mx-3 my-2 md:p-6 shadow-md bg-[#c8daf7] rounded-md text-black">
            <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
                <a
                    className="text-2xl font-bold mb-4 md:mb-0"
                    href="#"
                >
                    Mystery Message
                </a>
                {session ? (
                    <div className="flex items-center space-x-4">
                        <span className="mr-4">Welcome, @{user?.username || user?.email}</span>
                        <Button
                            className="w-full bg-red-500 md:w-auto"
                            onClick={() => signOut()}
                        >
                            Logout
                        </Button>
                        <a
                            href="/how-to-use"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full md:w-auto bg-blue-500 text-white hover:bg-blue-600 transition px-4 py-2 rounded text-center"
                        >
                            How to Use
                        </a>
                    </div>
                ) : (
                    <div className="flex space-x-4">
                        <Link href="/sign-in">
                            <Button className="w-full font-normal hover:bg-slate-700 hover:scale-95 transition-all md:w-auto mr-4">
                                Login
                            </Button>
                        </Link>
                        <Link href="/sign-up">
                            <Button className="w-full md:w-auto bg-slate-900 text-white font-normal hover:scale-95 transition-all py-2 px-4 hover:bg-slate-700 transition">
                                Sign-up
                            </Button>
                        </Link>
                        <a
                            href="/how-to-use"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full md:w-auto bg-blue-500 text-white hover:bg-blue-600 transition px-4 py-2 rounded text-center"
                        >
                            How to Use
                        </a>
                    </div>
                )}
            </div>
        </nav>


    )
}

export default Navbar
