import Link from 'next/link'
import { useEffect, useState } from 'react';

async function make() {
  var username;
  const data = document.getElementById('message').value
  const title = document.getElementById('title').value
  const cookies = document.cookie;
  const user = cookies.match(/username=([^;]+)/);
  if (user) {
    username = user[1]
  } else {
    username = document.getElementById('username').value
  }
  const checkbox = document.getElementById('checkbox').checked
  const password_protected = document.getElementById('password_protect').checked
  const password = document.getElementById('password').value
  const response = await fetch('api/create_post', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      data: data,
      title: title,
      unlisted: checkbox,
      password_protected: password_protected,
      password: password,
      username: username
    }),
  }) 
  if (response.status !== 200) {
    alert('Error: ' + response.status)
    return
  }

  const result = await response.json()
  document.getElementById('url').innerText = "Your link: " + window.location.origin + result.url
}
export default function Home() {
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
        <input id="username" className="m-5 w-full p-4 bg-gray-800 text-white border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Username (optional)"/>
        <input id="title" className="m-5 w-full p-4 bg-gray-800 text-white border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Title" />

        <textarea
          id="message"
          className="w-full h-40 p-4 bg-gray-800 text-white border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Paste your text here..."
        ></textarea>
        <div className="flex items-center mt-4">
          <input
            type="checkbox"
            id="checkbox"
            className="mr-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <label htmlFor="checkbox" className="ml-2 text-white">Unlisted?</label>
        </div>

        <div className='flex items-center mt-4'>
          <input
            type="checkbox"
            id="password_protect"
            className="mr-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <label htmlFor="password_protect" className="ml-2 text-white">Password protect?</label>
        </div>



        <input
          type="password"
          id="password"
          className="m-5 w-full p-4 bg-gray-800 text-white border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Password (if applicable)"
        />

        <button
          onClick={() => make()}
          className="mt-4 px-6 py-2 bg-blue-600 hover:bg-blue-500 text-white font-medium rounded-lg shadow-md transition"
        >
          Submit
        </button>
      </div>
      
      <div className="mt-6 w-full max-w-2xl flex justify-center">
        <div className="w-full p-4 bg-gray-800 text-white border border-gray-700 rounded-lg text-center">
          <p id="url" className="text-sm text-gray-400 break-all"></p>
        </div>
      </div>
    </div>
  );
}

