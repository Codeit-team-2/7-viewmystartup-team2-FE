// src/hooks/useSort.js
export const useSort = (data, sortKey, sortFunctions) => {
  const [sortedData, setSortedData] = useState(data);

  useEffect(() => {
    const sortFunc = sortFunctions[sortKey];
    if (!sortFunc) return;
    setSortedData([...data].sort(sortFunc));
  }, [data, sortKey]);

  return sortedData;
};
