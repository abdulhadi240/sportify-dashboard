'use server'

export const Grounds = async () => {
  const res = await fetch("https://sportify-1haq.onrender.com/court/get_courts", {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.BEARER_TOKEN}`
    }
  });
  const data = await res.json();
  console.log(data);
  return data;
}


export const SingleGround = async (id) => {
  const data = await fetch(`https://sportify-1haq.onrender.com/court/get_court_details/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.BEARER_TOKEN}`
    }
  });

  const res = await data.json();
  console.log(res);
  return res;
}
