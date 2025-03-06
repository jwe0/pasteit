import Link from 'next/link'
import { useEffect, useState } from 'react';

export default function Legal() {
    useEffect(() => {
        function set_username() {
            const cookies = document.cookie;
            const username = cookies.match(/username=([^;]+)/);
            if (username) {
                document.getElementById("username1").innerHTML = "| Signed in as " + username[1];
            }
        }
        set_username();
    }, []);
    return (
        <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center p-6">
            <nav className="fixed top-0 left-0 w-full bg-gray-800 shadow-md p-4 flex items-center justify-between">
                <Link href="/" className="text-xl font-bold text-white">
                PasteIt 
                <span className="text-sm text-gray-400"> - Paste text anonymously</span>
                </Link>
                <div className="flex space-x-4">
                <Link href="/legal"><h1 className="text-l text-white">Legal</h1></Link>
                <Link href="/pastes"><h1 className="text-l text-white">Pastes</h1></Link>
                <Link href="/login"><h1 className="text-l text-white">Login</h1></Link>
                <p id="username1">| Signed in as ANON</p>
                </div>
            </nav>
            <div className="mt-20 w-full max-w-2xl flex flex-col items-center">
                <h1 className="text-2xl font-bold text-white">Legal</h1>
                <p className="text-white text-sm mt-4">
                    This service does not directly store any information of users. Due to the
                    nature of providing an anonymous service there is potential for users to post
                    illegal or harmful content.
                </p>
                <p className="text-white text-sm mt-4">
                    While I fully support free speech any posts that violate laws around child safety
                    will be removed, any other posts, regardless of content will remain on my platform
                    unless there are clear legal reasons as to why I should remove it.
                </p>
                <p className="text-white text-sm mt-4">
                    I do not support nor condone activites such as doxing, fraud or any kind of 
                    cybercrime. However I will stand firm on protecting my users right to free speech.
                </p>
                <p className='text-white text-sm mt-4'>
                    Although I do not store any information on users the services I use (vercel, supabse etc)
                    may collect telemetary data, because of this reason I recommend using a privacy
                    focused browser alongside Tor or a good VPN for example Mullvad.
                </p>
                <p className='text-white text-sm mt-4'>
                    Any and all requests from law enforcement agencies for user information will be
                    disregarded unless you can clearly show me how the user on my service is linked
                    with your investigation.    
                </p>
                </div>
        </div>
    )
}