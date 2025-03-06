import Link from 'next/link'

async function register() {
    const account_number = document.getElementById("account_number").value;
    const response = await fetch("/api/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            account_number: account_number
        }),
    })
    if (response.status !== 200) {
        alert("Error: " + response.status)
    } else {
        window.location.href = "/pastes"
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
            <input type="text" id="account_number" className="m-5 w-full p-4 bg-gray-800 text-white border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Account num"></input>
            <button id="submit" className="m-5 w-full p-4 bg-gray-800 text-white border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" onClick={register}>Submit</button>
            <Link href="/register" className="m-5 p-4 bg-gray-800 text-white border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" >Register</Link>
        </div>
      </div>
    );
  }