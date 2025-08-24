import { useEffect, useState } from 'react';
import { Bill } from '../services/api';
const KEY = 'fav-bills';

// Custom hook to manage favourite bills in localStorage
export const useLocalFavourites = () => {
  const [favourites, setFavourites] = useState<Bill[]>(() => {
    try {
      const raw = localStorage.getItem(KEY);
      return raw ? (JSON.parse(raw) as Bill[]) : [];
    } catch {
      return [];
    }
  });
  useEffect(() => {
    localStorage.setItem(KEY, JSON.stringify(favourites));
  }, [favourites]);
  return { favourites, setFavourites };
};
