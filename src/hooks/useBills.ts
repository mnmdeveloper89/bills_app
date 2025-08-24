import { useEffect, useMemo, useState } from 'react';
import { Bill, fetchBills } from '../services/api';

// Custom hook to fetch and manage bills data
export const useBills = () => {
  const [bills, setBills] = useState<Bill[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

// Fetch bills when the hook is first used
  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const data = await fetchBills();
        if (mounted) setBills(data);
      } catch (e) {
        setError(e instanceof Error ? e.message : 'Unknown error');
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  const billTypes = useMemo(
    () => Array.from(new Set(bills.map((b) => b.billType))).sort(),
    [bills]
  );

  return { bills, loading, error, billTypes };
};
