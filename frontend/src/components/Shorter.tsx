import React, { useState } from 'react';
import axios from 'axios';


const Shorter: React.FC = () => {
  const [longUrl, setLongUrl] = useState<string>('');
  const [shortenedUrl, setShortenedUrl] = useState<string>('');
  const [error, setError] = useState<string>('');
  interface ShortenResponse {
    shortUrl: string; // Ensure this matches the response key from the backend
  }

  const handleShorten = async () => {
    console.log(longUrl);
    
    try {
      const response = await axios.post<ShortenResponse>('https://snaplink-iskj.onrender.com/api/shorten', {
        originalUrl: longUrl,
      });      
      console.log(response.data.shortUrl);
      
      setShortenedUrl(response.data.shortUrl); // Now TypeScript knows this is a string
      setError(''); // Clear any previous error
    } catch (err) {
      console.error(err);

    }
    
  };

  return (
    <div className="flex flex-col items-center pt-10  ">
      <input
        type="text"
        value={longUrl}
        onChange={(e) => setLongUrl(e.target.value)}
        placeholder="Paste your long URL here"
        className="w-full max-w-md p-3 mb-4 rounded border-2 border-gray-300"
      />
      <button
        onClick={handleShorten}
        className="w-full max-w-md p-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        Shorten URL
      </button>
      {shortenedUrl && (
        <div className="mt-4 w-full max-w-md">
          <p className="text-lg mt-5 mb-5">Shortened URL:</p>
          <input
            type="text"
            value={shortenedUrl}
            readOnly
            className="w-full p-2 rounded border-2 border-gray-300 bg-gray-100"
          />
          <button
            onClick={() => navigator.clipboard.writeText(shortenedUrl)}
            className="mt-2 p-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
          >
            Copy to Clipboard
          </button>
        </div>
      )}
      {error && <p className="text-red-500">{error}</p>} {/* Display error message if any */}
    </div>
  );
}

export default Shorter;
