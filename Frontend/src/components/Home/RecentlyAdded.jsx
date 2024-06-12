import React, { useEffect, useState } from 'react';
import axios from 'axios';

const RecentlyAdded = () => {
  const [Data, setData] = useState();

  useEffect(() => {
    const fetch = async () => {
        const response = await axios.get("http://localhost:1000/api/v1/get-recent-books");
        console.log(response.data);
    };
    fetch();
  }, []); 
  return (
    <div className='mt-8 px-12'>
      <h3 className='text-3xl text-yellow-100'>Recently added books</h3>
    </div>
  );
}

export default RecentlyAdded;
