import Link from 'next/link'
import { useEffect, useState } from 'react';

export default function Pastes() {
    const [pastes, setPastes] = useState([]);

    useEffect(() => {
        async function fetchPastes() {
            const response = await fetch("/api/get_posts");
            const data = await response.json();
            setPastes(data);
        }
        fetchPastes();
    }, []);

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
                <h1 className="text-2xl font-bold text-white mb-4">Pastes</h1>
                <div className="w-full overflow-x-auto">
                    <table className="w-full bg-gray-800 text-white border border-gray-700 rounded-lg">
                        <thead>
                            <tr className="bg-gray-700">
                                <th className="px-4 py-2 text-left border-b border-gray-600">Title</th>
                                <th className="px-4 py-2 text-left border-b border-gray-600">Link</th>
                            </tr>
                        </thead>
                        <tbody>
                            {pastes.length > 0 ? (
                                pastes.map((paste) => (
                                    <tr key={paste.uuid} className="hover:bg-gray-600">
                                        <td className="px-4 py-2 border-b border-gray-600">{paste.title}</td>
                                        <td className="px-4 py-2 border-b border-gray-600">
                                            <Link href={`/paste?id=${paste.uuid}`} className="text-blue-400 hover:underline">View</Link>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="2" className="text-center py-4 text-gray-400">No pastes available</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
