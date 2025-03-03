import Link from 'next/link'


async function get_paste() {
    const query = new URLSearchParams(window.location.search);
    const response = await fetch("/api/get_post?id=" + query.get("id"));
    const data = await response.json();

    if (data.length == 0) {
        window.location.href = "/";
    }
    
    const content = data[0].data;
    const title = data[0].title;
    
    document.getElementById("title").innerText = title;
    document.getElementById("paste").innerText = content;
}


export default function Paste() {
    get_paste();
    return (
      <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center p-6">
      <nav className="fixed top-0 left-0 w-full bg-gray-800 shadow-md p-4 flex items-center justify-between">
        <h1 className="text-xl font-bold text-white">PasteIt <span className="text-sm text-gray-400">- Paste text anonymously</span></h1>
        <div className="flex space-x-4">
          <Link href="/legal"><h1 className="text-l text-white">Legal</h1></Link>
          <Link href="/pastes"><h1 className="text-l text-white">Pastes</h1></Link>
        </div>
      </nav>
        
        <div className="mt-20 w-full max-w-2xl flex flex-col items-center">
          <p id="title" className="text-2xl font-bold text-white m-5"></p>
          <p id="paste" className="w-full p-4 bg-gray-800 text-white border border-gray-700 rounded-lg"></p>
        </div>
      </div>
    );
  }