import Link from 'next/link'
import { useEffect } from 'react';

async function decode() {
  const query = new URLSearchParams(window.location.search);
  const password = document.getElementById("password").value;

  const response = await fetch("/api/decode", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: query.get("id"),
      password: password
    }),
  })

  if (response.status === 401) {
    alert("Wrong password")
  } else {
    var data = await response.json();
    document.getElementById("title").innerText = data.title;
    document.getElementById("paste").innerText = data.data;
    document.getElementById("password").hidden = true;
    document.getElementById("decode").hidden = true;
    document.getElementById("title").hidden = false;
    document.getElementById("paste").hidden = false;
  }
}

async function get_paste() {
    var title   = "";
    var content = "";
    const query = new URLSearchParams(window.location.search);
    const response = await fetch("/api/get_post?id=" + query.get("id"));
    var data = await response.json();

    if (response.status === 401) {
      document.getElementById("password").hidden = false;
      document.getElementById("decode").hidden = false;
      document.getElementById("title").hidden = true;
      document.getElementById("paste").hidden = true;
    } else {
      content = data.data;
      title = data.title;
      console.log(content, title)
      document.getElementById("title").innerText = title;
      document.getElementById("paste").innerText = content;

  
    }

}


export default function Paste() {
  useEffect(() => {
    function set_username() {
        const cookies = document.cookie;
        const username = cookies.match(/username=([^;]+)/);
        if (username) {
            document.getElementById("username1").innerHTML = "| Signed in as " + username[1];
        }
    }
    set_username();
    get_paste();
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
          <input type="text" id ="password" className="m-5 w-full p-4 bg-gray-800 text-white border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Password" hidden></input>
          <button id="decode" onClick={decode} className="m-5 w-full p-4 bg-gray-800 text-white border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" hidden>Decode</button>
          <p id="title" className="text-2xl font-bold text-white m-5" hidden={false}></p>
          <p id="paste" className="w-full p-4 bg-gray-800 text-white border border-gray-700 rounded-lg" hidden={false}></p>
        </div>
      </div>
    );
  }