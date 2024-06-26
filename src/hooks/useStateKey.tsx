import { useEffect, useId, useMemo, useState } from 'react';
import { generateUniqueKey } from '../utils/helper';

const useStateKey = () => {
  const id = generateUniqueKey();
  const [inKey, setKey] = useState<string>(id); // Initialize with id obtained from useId
  const key = useMemo(() => inKey, [inKey]); // Memoize key using useMemo
  const resetKey = () => {
    setKey(generateUniqueKey()); // Update key to new id
  };

  return { key, resetKey };
};

export default useStateKey;
