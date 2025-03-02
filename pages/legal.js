export default function legal() {
    return (
        <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center p-6">
            <nav className="fixed top-0 left-0 w-full bg-gray-800 shadow-md p-4 flex items-center justify-between">
                <h1 className="text-xl font-bold text-white">PasteIt <span className="text-sm text-gray-400">- Paste text anonymously</span></h1>
                <a href="/"><h1 className="text-l text-white align-right">Home</h1></a>
            </nav>
            <div className="mt-20 w-full max-w-2xl flex flex-col items-center">
                <h1 className="text-2xl font-bold text-white">Legal</h1>
                <p className="text-white text-sm mt-4">
                    PasteIt is a website that allows you to paste text anonymously.
                </p>
                <p className="text-white text-sm mt-4">
                    PasteIt is not in anyway affiliated with posts made on the website.
                </p>
                <p className="text-white text-sm mt-4">
                    No user information is stored on the server. Just the column ID and data.
                </p>
            </div>
        </div>
    )
}