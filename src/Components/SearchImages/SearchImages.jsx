import React, { useState, useEffect } from 'react';
import "../SearchImages/SearchImages.css";

const accessKey = "k_uuvYHxNj7Fqih3FRrhmDKRYiYxpF3oZuZQb0PeLUQ";

const SearchImages = () => {
  const [keyword, setKeyword] = useState('');
  const [results, setResults] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const searchImages = async () => {
    setLoading(true);
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${keyword}&client_id=${accessKey}&per_page=12`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      if (page === 1) {
        setResults(data.results);
      } else {
        setResults((prevResults) => [...prevResults, ...data.results]);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (page > 1) {
      searchImages();
    }
  }, [page]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setPage(1); // Reset to page 1 for a new search
    setResults([]); // Clear previous results
    searchImages();
  };

  const handleShowMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  return (
    <div>
      <h1>Image Search Engine</h1>
      <form id="search-form" onSubmit={handleSearchSubmit}>
        <input 
          type="text" 
          id="search-box" 
          placeholder="Search anything here..." 
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)} 
        />
        <button type="submit">Search</button>
      </form>

      <div id="search-result">
        {loading && <p>Loading...</p>}
        {!loading && results.length > 0 && results.map((result, index) => (
          <a key={index} href={result.links.html} target="_blank" rel="noopener noreferrer">
            <img src={result.urls.small} alt={result.alt_description} />
          </a>
        ))}
      </div>

      {results.length > 0 && !loading && (
        <button id="show-more-btn" onClick={handleShowMore}>
          Show More
        </button>
      )}
    </div>
  );
};

export default SearchImages;