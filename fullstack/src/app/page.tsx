// Just for testing, remove once we start making client / server components
'use client';

import { useState } from 'react';

export default function Home() {

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);

  const fetchData = async () => {
    setLoading(true);

    fetch('/api/hello')
      .then(res => res.json())
      .then(json => { setData(json) })
      .catch(error => { setData({ message: 'An error occured calling the api route.' }) })
      .finally(() => { setLoading(false) });
  }

  return (
    <div className="h-screen flex justify-center items-center">
      <div className="h-fit flex flex-col items-center">
        <button className='bg-blue-200 py-1 px-4 rounded' onClick={fetchData}>Click me</button>
        {loading && <p>Loading...</p>}
        {data && !loading && <p>{data.message}</p>}
      </div>
    </div>
  );
}
