// Just for testing, remove once we start making client / server components
'use client';

import { useState } from 'react';
import Link from 'next/link'

export default function Home() {

  type ResponseData = {
    message: string
  }

  const [data, setData] = useState<ResponseData | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    fetch('/api/hello')
      .then(res => res.json())
      .then(json => setData({ message: json.message }))
      .catch(reason => setData({ message: reason }))
      .finally(() => { setLoading(false) });
  }

  return (
    <div className='p-4 flex flex-col gap-4'>
      <div>
        <Link href='/about' className='bg-blue-500 text-white px-2 py-1 rounded'>Go to about page</Link>
      </div>
      <div>
        <button className='bg-blue-500 text-white px-2 py-1 rounded' onClick={fetchData}>Fetch data</button>
        {loading && <p>Loading data...</p>}
        {data && !loading && <p>{JSON.stringify(data)}</p>}
      </div>

    </div>
  );
}
