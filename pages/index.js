import { useState, useEffect, useRef } from 'react';
import React from 'react';

export default function Home() {
  const [query, setQuery] = useState('');
  const [hashSuccess, setHashSuccess] = useState(true);
  const [hashedQuery, setHashedQuery] = useState('');
  const [hashMap, setHashMap] = useState({});
  const textareaRef = useRef(null); // Ref to the textarea element

  const adjustTextareaHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'inherit'; // Reset height to recalculate
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`; // Set height to scroll height
    }
  };

  const handleQueryChange = (e) => {
    setQuery(e.target.value);
    adjustTextareaHeight(); // Adjust the height whenever the query changes
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch('/api/hash-query', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query }),
    });

    const data = await response.json();

    if (response.status === 200) {
      setHashedQuery(data.hashedQuery);
      setHashSuccess(true);
    } else {
      setHashSuccess(false);
    }
  };

  const fetchHashMap = async () => {
    const response = await fetch('/api/get-hashmap');
    const data = await response.json();
    setHashMap(data);
  };

  useEffect(() => {
    fetchHashMap();
  }, [hashedQuery]);

  useEffect(() => {
    if (query.length > 0) {
      setHashSuccess(true);
    } else {
      setHashSuccess(false);
    }
  }, [query]);

  useEffect(() => {
    setHashedQuery('');
  }, [hashSuccess]);

  return (
    <div className="container">
      <h1>SQL Query Hasher</h1>
      <div>
        <h2>Input Original SQL Query</h2>
        <form onSubmit={handleSubmit}>
          <textarea
            ref={textareaRef} // Attach the ref to the textarea
            value={query}
            onChange={handleQueryChange} // Use the new change handler
            style={{ maxHeight: '600px', overflowY: 'auto' }} // Inline styles for max height and scroll
          ></textarea>
          <br />
          <button type="submit">Submit</button>
        </form>
      </div>
      {
        hashedQuery.length > 0 && <div>
          <h2>Hashed SQL Query</h2>
          <pre className="wrapped-query">{hashedQuery}</pre>
        </div>
      }
      {
        !hashSuccess && query && <div>
          <pre className="wrapped-query-error">Error found when trying to parse SQL query. Please check your query and the terminal log.</pre>
        </div>
      }
      <div>
        <h2>Column-Hash Database</h2>
        <pre className="wrapped-query">{JSON.stringify(hashMap, null, 2)}</pre>
      </div>
    </div>
  );
}
