import Link from 'next/link'

async function register() {
    const username = document.getElementById("username").value;
    const response = await fetch("/api/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            username: username
        }),
    })
    if (response.status !== 200) {
        alert("Error: " + response.status)
    } else {
        document.getElementById("account_number").hidden = false;
        document.getElementById("account_number").innerText = "DO NOT LOSE THIS NUMBER, IF YOU DO THERE IS NO WAY OF YOU RECOVERING YOUR ACCOUNT! " + (await response.json()).account_number;
    }
}

export default function Paste() {
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
        </div>
      </nav>
        
        <div className="mt-20 w-full max-w-2xl flex flex-col items-center">
            <input type="text" id="username" className="m-5 w-full p-4 bg-gray-800 text-white border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Username"></input>
            <button id="submit" className="m-5 w-full p-4 bg-gray-800 text-white border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" onClick={register}>Submit</button>
            <p id="account_number" className="text-2xl font-bold text-white m-5" hidden={true}></p>
        </div>
      </div>
    );
  }