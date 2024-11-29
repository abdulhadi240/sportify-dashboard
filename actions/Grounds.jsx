'use server'

export const Courts = async () => {
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


export const SingleCourt = async (id) => {
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


export const DeleteCourt= async (id) => {
  const data = await fetch(`https://sportify-1haq.onrender.com/court/delete_court/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.ADMIN_TOKEN}`
    }
  });
  console.log(data);
  
  return data;
}



export const UpdateCourt = async (id, name, description, location, rate, down_payment) => {
  const data = await fetch(`https://sportify-1haq.onrender.com/court/update_court/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.ADMIN_TOKEN}`,
    },
    body: JSON.stringify({
      name: name,
      description: description,
      location: location,
      hourly_rate: rate,
      down_payment: down_payment,
    }),
  });

  const res = await data.json();
  console.log(res);
  return res;
};