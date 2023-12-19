import { useState, useEffect, useRef } from 'react';
import React from 'react';

export default function Home() {
  const [query, setQuery] = useState('');
  const [hashSuccess, setHashSuccess] = useState(true);
  const [hashedQuery, setHashedQuery] = useState('');
  const [hashMap, setHashMap] = useState({});
  const textareaRef = useRef(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const adjustTextareaHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'inherit'; // Reset height to recalculate
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`; // Set height to scroll height
    }
  };

  const handleDeleteAll = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete all entries?");
    if (confirmDelete) {
      const response = await fetch('/api/delete-all-entries', { method: 'DELETE' });
      if (response.ok) {
        setHashMap({});
        alert('All entries deleted successfully');
      } else {
        alert('Failed to delete entries');
      }
    }
  };

  const handleQueryChange = (e) => {
    const newQuery = e.target.value;
    setQuery(newQuery);
    adjustTextareaHeight(); // Adjust the height whenever the query changes
    if (!newQuery) {
      setErrorMessage('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(''); // Reset the error message on new submission

    try {
      const response = await fetch('/api/hash-query', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query }),
      });

      const data = await response.json();

      if (response.ok) {
        setHashedQuery(data.hashedQuery);
        setHashSuccess(true);
      } else {
        setHashSuccess(false);
        setErrorMessage(data.error || 'An error occurred while processing your query.');
      }
    } catch (error) {
      setHashSuccess(false);
      setErrorMessage('Failed to send request. Please check your connection.');
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
          <button className='operation-button' type="submit">Submit</button>
        </form>
      </div>
      {
        errorMessage && <div className="error-message">
          {errorMessage}
        </div>
      }
      {
        hashedQuery.length > 0 && <div>
          <h2>Hashed SQL Query</h2>
          <pre className="wrapped-query">{hashedQuery}</pre>
        </div>
      }
      <div>
        <h2>Column-Hash Database</h2>
        <pre className="wrapped-query">{JSON.stringify(hashMap, null, 2)}</pre>
      </div>
      <div>
        <button className='view-button'
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}>{isDropdownOpen ? 'Hide Settings' : 'Settings'}
        </button>
        {isDropdownOpen && (
          <div>
            <button className='operation-button' onClick={handleDeleteAll}>Delete All Entries</button>
          </div>
        )}
      </div>
    </div>
  );
}
