import { useState, useCallback } from "react";
/*
Reusable Searching functionality
Required to pass the data and keys for searching purposes.
Returns the array of objects with search results.
*/

const useSearch = (data, searchKeys) => {
  const [searchResults, setSearchResults] = useState(data);
  const onSearch = useCallback(
    (e) => {
      const text = e?.target?.value;
      let rows = data;

      if (text) {
        searchKeys.map(
          (key) =>
            (rows = data.filter((row) => {
              return row[key]?.toLowerCase().includes(text.toLowerCase());
            }))
        );
      }

      setSearchResults(rows);
    },
    [data, searchKeys]
  );

  return { searchResults, onSearch };
};

export default useSearch;
