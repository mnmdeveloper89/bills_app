export type Bill = {
  billNo: string;
  billType: string;
  status: string;
  sponsor: string;
  titleEn: string;
  titleGa: string;
};

// Fetch a list of bills from the Oireachtas API
export async function fetchBills(): Promise<Bill[]> {
  const url = 'https://api.oireachtas.ie/v1/legislation?bill&limit=400';
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const json = await res.json();

  console.log('API raw response:', json); // debug

// Map API results to the Bill type structure
  const items: Bill[] = (json.results ?? []).map((r: any, i: number) => {
    const b = r.bill ?? {};

    return {
      billNo: String(b.billNo ?? i + 1),
      billType: b.billType ?? 'Unknown',
      status: b.status ?? 'Unknown',
      sponsor:
        b.sponsors?.[0]?.sponsor?.as?.showAs ?? b.sponsors?.[0]?.sponsor?.by?.showAs ?? 'Unknown',
      titleEn: b.shortTitleEn ?? 'Untitled',
      titleGa: b.shortTitleGa ?? 'Gan teideal',
    };
  });

  return items;
}
