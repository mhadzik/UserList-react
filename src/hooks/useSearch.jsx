import { useState, useCallback } from "react";

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
