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



// actions/UpdateCourt.js
export const UpdateCourt = async (id, name, description, courtLocation, hourlyRate, minDownPayment) => {
  const data = await fetch(`https://sportify-1haq.onrender.com/court/update_court/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.ADMIN_TOKEN}`,
    },
    body: JSON.stringify({
      name: name,
      description: description,
      court_location: courtLocation,  // Pass court_location correctly
      hourly_rate: hourlyRate,        // Pass hourly_rate correctly
      min_down_payment: minDownPayment // Pass min_down_payment correctly
    }),
  });

  const res = await data.json();
  console.log(res);  // Log the response for debugging purposes
  return res;
};