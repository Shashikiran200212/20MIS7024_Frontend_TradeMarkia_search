"use client";

import React, { useState } from 'react';
import { basicSearch } from '../services/apiService';
import { PlaceholdersAndVanishInput } from "./vanish_input";

const Spinner = () => (
  <div className="flex justify-center items-center">
    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-500"></div>
  </div>
);

const SearchPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searched, setSearched] = useState(false);

  const placeholders = [
    "",
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await basicSearch({
        input_query: searchQuery,
        input_query_type: '',
        sort_by: 'default',
        status: [],
        exact_match: false,
        date_query: false,
        owners: [],
        attorneys: [],
        law_firms: [],
        mark_description_description: [],
        classes: [],
        page: 1,
        rows: 10,
        sort_order: 'desc',
        states: [],
        counties: [],
      });

      console.log('Full API Response:', response);

      const hits = response.body?.hits?.hits || [];
      console.log('Hits:', hits);

      setResults(hits);
      setSearched(true);
    } catch (err) {
      setError('No results found');
      console.error('Search error:', err);
    } finally {
      setLoading(false);
    }
  };

  const getMarkImageUrl = (id: string) => `https://static.trademarkia.com/images/${id}`;

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp * 1000);
    const options: Intl.DateTimeFormatOptions = { day: '2-digit', month: 'short', year: 'numeric' };
    return date.toLocaleDateString('en-GB', options);
  };

  return (
    <div className="bg-white min-h-screen text-gray-900 p-5 flex flex-col justify-center items-center">
      <div className={`flex-1 max-w-6xl w-full transition-all duration-500 ${searched ? 'mt-0' : 'md:mt-[23rem] mt-[18rem]'}`}>
        <div className="flex flex-col gap-4 justify-center items-center w-full mb-6 p-4 bg-gray-100 shadow-md rounded-lg">
          <a href="/"><img src="logo.webp" alt="Logo" className="w-36 h-auto mr-4" /></a>
          <PlaceholdersAndVanishInput
            placeholders={placeholders}
            onChange={handleChange}
            onSubmit={handleSearch}
          />
        </div>

        {loading && <Spinner />}

        {error && <p className="text-red-500 mb-4">{error}</p>}
        {results.length > 0 ? (
          <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <div className="hidden md:flex flex-wrap border-b border-gray-300 bg-gray-100 font-semibold">
                <div className="p-2 ml-4 w-full md:w-[175px]">Mark</div>
                <div className="p-2 w-full md:w-[340px]">Details</div>
                <div className="p-2 w-full md:w-[270px]">Status</div>
                <div className="p-2">Class/Description</div>
          </div>

            <ul>
              {results.map((result: any) => (
                <li key={result._id} className="p-4 border-b border-gray-300 bg-white flex flex-col md:flex-row items-start">
                  <div className="flex flex-col md:flex-row gap-4 w-full">
                    <div className="w-full md:w-32 flex-shrink-0 bg-gray-50 shadow-lg p-2 rounded-lg flex items-center justify-center">
                      <img
                        src={getMarkImageUrl(result._id)}
                        alt={result._source?.mark_identification}
                        className="w-24 h-auto object-contain"
                      />
                    </div>
                    <div className="flex-1 ml-0 md:ml-10 font-sans overflow-hidden">
                      <div className="text-lg font-bold truncate">{result._source?.mark_identification || 'N/A'}</div>
                      <div className="text-sm text-gray-500 truncate">{result._source?.current_owner || 'N/A'}</div>
                      <div className="text-sm text-black truncate font-bold mt-2">{result._id || 'N/A'}</div>
                      <div className="text-sm text-gray-500 truncate">
                        {result._source?.filing_date ? formatDate(result._source?.filing_date) : 'N/A'}
                      </div>
                    </div>
                    <div className="w-full md:w-64 flex-shrink-0 mt-4 md:mt-0">
                      <div className="flex items-center">
                        <div className="w-2.5 h-2.5 bg-green-500 rounded-full mr-2"></div>
                        <div className="text-lg truncate text-green-500 font-bold">
                          {result._source?.status_type === 'Registered' ? 'Live / Registered' : result._source?.status_type || 'N/A'}
                        </div>
                      </div>
                      <div className="text-xs text-gray-500 mt-2 flex items-center gap-2">
                        on <div className='font-bold'>{result._source?.status_date ? formatDate(result._source?.status_date) : 'N/A'}</div>
                      </div>
                      <div className="text-xs text-gray-500 mt-4 flex items-center gap-2 font-bold">
                        <img src="re.png" alt="" className='w-4 h-4' /> {result._source?.renewal_date ? formatDate(result._source?.renewal_date) : 'N/A'}
                      </div>
                    </div>
                    <div className="flex-1 mt-4 md:mt-0">
                      <div className="text-sm line-clamp-3">{result._source?.mark_description_description?.join(', ') || 'N/A'}</div>
                      <div className="text-sm text-gray-500 line-clamp-3">{result._source?.class_codes?.join(', ') || 'N/A'}</div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          !loading && <p className="text-gray-500 mt-4"> </p>
        )}
      </div>
      <footer className="text-neutral-500 mt-8 p-4 w-full text-center">
        2024 | Made By Shashi Kiran 
      </footer>
    </div>
  );
};

export default SearchPage;
