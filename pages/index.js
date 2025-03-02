
async function make() {
  const data = document.getElementById('message').value
  const response = await fetch('api/create_post', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      data: data
    }),
  }) 

  const result = await response.json()
  document.getElementById('url').innerText = "Your link: " + window.location.origin + result.url
}

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center p-6">
      <nav className="fixed top-0 left-0 w-full bg-gray-800 shadow-md p-4 flex items-center justify-between">
        <h1 className="text-xl font-bold text-white">PasteIt <span className="text-sm text-gray-400">- Paste text anonymously</span></h1>
        <a href="/legal"><h1 className="text-l text-white align-right">Legal</h1></a>
      </nav>
      
      <div className="mt-20 w-full max-w-2xl flex flex-col items-center">
        <textarea
          id="message"
          className="w-full h-40 p-4 bg-gray-800 text-white border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Paste your text here..."
        ></textarea>
        
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

