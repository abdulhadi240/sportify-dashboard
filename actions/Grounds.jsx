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


export const DeleteCourt = async (id) => {
  const data = await fetch(`https://sportify-1haq.onrender.com/court/delete_court/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.ADMIN_TOKEN}`
    }
  });  
  
  console.log(data);
 
}


export const CreateCourt = async (name , description , court_location , hourly_rate , min_down_payment) => {
  const data = await fetch(`https://sportify-1haq.onrender.com/court/create_court`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.ADMIN_TOKEN}`
    },
    body: JSON.stringify({
      name: name,
      description: description,
      court_location: court_location,  // Pass court_location correctly
      hourly_rate: hourly_rate,        // Pass hourly_rate correctly
      min_down_payment: min_down_payment // Pass min_down_payment correctly
    }),
  });  
  
  const res = await data.json()
  console.log(res);
  
  return res
 
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




export const SingleCourtImage = async (id) => {
  const data = await fetch(`https://sportify-1haq.onrender.com/court/get_court_media/${id}`, {
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




export const AllGames = async () => {
  const data = await fetch(`https://sportify-1haq.onrender.com/game/get_games`, {
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


export const SingleGame = async (id) => {
  const data = await fetch(`https://sportify-1haq.onrender.com/game/get_game/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.ADMIN_TOKEN}`
    }
  });

  const res = await data.json();
  console.log(res);
  return res;
}

// actions/UpdateCourt.js
export const UpdateGame = async (id, name, category ,person , date , description) => {
  const data = await fetch(`https://sportify-1haq.onrender.com/game/update_game/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.ADMIN_TOKEN}`,
    },
    body: JSON.stringify({
      name: name,
      description: description,
      category: category,  // Pass court_location correctly
      person: person,        // Pass hourly_rate correctly
    }),
  });

  const res = await data.json();
  console.log(res);  // Log the response for debugging purposes
  return res;
};

export const CreateGame = async (name , category , person , date , description) => {
  const data = await fetch(`https://sportify-1haq.onrender.com/game/create_game`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.ADMIN_TOKEN}`
    },
    body: JSON.stringify({
      name: name,
      description: description,
      category: category,  // Pass court_location correctly
      person: person,        // Pass hourly_rate correctly
    }),
  });  
  
  const res = await data.json()
  console.log(res);
  
  return res
 
}

// actions/UpdateCourt.js
export const DeleteGame = async (id) => {
  const data = await fetch(`https://sportify-1haq.onrender.com/game/delete_game/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.ADMIN_TOKEN}`,
    },
    
  });

  const res = await data.json();
  console.log(res);  // Log the response for debugging purposes
  return res;
};

// actions/UpdateCourt.js
export const GetAllUser = async () => {
  const data = await fetch(`https://sportify-1haq.onrender.com/admin/get_users`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.ADMIN_TOKEN}`,
    },
  });

  const res = await data.json();
  console.log(res);  // Log the response for debugging purposes
  return res;
};


