import { useState, useEffect, useRef } from 'react';

function SearchBox({ onSearch }) {
  const [query, setQuery] = useState('');
  const timeoutRef = useRef(null);

  useEffect(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      onSearch(query);
    }, 300);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [query, onSearch]);

  return (
    <div className="search-box-modern">
      <input
        type="text"
        placeholder="Поиск технологий..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="search-input-modern"
      />
    </div>
  );
}

export default SearchBox;