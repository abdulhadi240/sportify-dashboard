'use server'

export const Courts = async (token) => {
  const res = await fetch("https://sportify-1haq.onrender.com/court/get_courts", {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  });
  const data = await res.json();
  console.log(data);
  return data;
}


export const SingleCourt = async (id,token) => {
  const data = await fetch(`https://sportify-1haq.onrender.com/court/get_court_details/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  });

  const res = await data.json();
  console.log(res);
  return res;
}


export const DeleteCourt = async (id,token) => {
  const data = await fetch(`https://sportify-1haq.onrender.com/court/delete_court/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  });  
  
  console.log(data);
 
}


export const CreateCourt = async (name , description , court_location , hourly_rate , min_down_payment,token) => {
  const data = await fetch(`https://sportify-1haq.onrender.com/court/create_court`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
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
export const UpdateCourt = async (id, name, description, courtLocation, hourlyRate, minDownPayment,token) => {
  const data = await fetch(`https://sportify-1haq.onrender.com/court/update_court/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
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




export const SingleCourtImage = async (id,token) => {
  const data = await fetch(`https://sportify-1haq.onrender.com/court/get_court_media/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  });

  const res = await data.json();
  console.log(res);
  return res;
}




export const AllGames = async (token) => {
  const data = await fetch(`https://sportify-1haq.onrender.com/game/get_games`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  });

  const res = await data.json();
  console.log(res);
  return res;
}


export const SingleGame = async (id,token) => {
  const data = await fetch(`https://sportify-1haq.onrender.com/game/get_game/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  });

  const res = await data.json();
  console.log(res);
  return res;
}

// actions/UpdateCourt.js
export const UpdateGame = async (id, name, category ,person , date , description,token) => {
  const data = await fetch(`https://sportify-1haq.onrender.com/game/update_game/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
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

export const CreateGame = async (name , category , person , date , description,token) => {
  const data = await fetch(`https://sportify-1haq.onrender.com/game/create_game`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
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
export const DeleteGame = async (id,token) => {
  const data = await fetch(`https://sportify-1haq.onrender.com/game/delete_game/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    
  });

  const res = await data.json();
  console.log(res);  // Log the response for debugging purposes
  return res;
};

export const GetAllUser = async (token) => {
  const data = await fetch(`https://sportify-1haq.onrender.com/admin/get_users`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  });

  const res = await data.json();
  console.log(res);  // Log the response for debugging purposes
  return res;
};


export const CreateUser = async (email,password,name,user_phone,secondary_user_phone,token) => {
  const data = await fetch(`https://sportify-1haq.onrender.com/auth/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({
      email: email,
      password: password,
      name: name,  // Pass court_location correctly
      user_phone: user_phone,        // Pass hourly_rate correctly
      secondary_user_phone: secondary_user_phone,        // Pass hourly_rate correctly

    }),
  });

  const res = await data.json();
  console.log(res);  // Log the response for debugging purposes
  return res;
};

export const UpdateUser = async (id,email,password,name,user_phone,secondary_user_phone,token) => {
  const data = await fetch(`https://sportify-1haq.onrender.com/admin/update_user/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({
      email: email,
      password_hash: password,
      name: name,  // Pass court_location correctly
      user_phone: user_phone,        // Pass hourly_rate correctly
      secondary_user_phone: secondary_user_phone,        // Pass hourly_rate correctly

    }),
  });

  const res = await data.json();
  console.log(res);  // Log the response for debugging purposes
  return res;
};


export const DeleteUser = async (id,token) => {
  const data = await fetch(`https://sportify-1haq.onrender.com/admin/delete_user/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    
  });

  const res = await data.json();
  console.log(res);  // Log the response for debugging purposes
  return res;
};

export const Dashbaord1 = async (start_time,end_time) => {
  const data = await fetch(`https://sportify-1haq.onrender.com/admin/dashboard`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({
      start_time:start_time,
      end_time:end_time
    }),
  });

  const res = await data.json();
  console.log(res);  // Log the response for debugging purposes
  return res;
};


export const GetAllReviews = async (token) => {
  const data = await fetch(`https://sportify-1haq.onrender.com/review/getall`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  });

  const res = await data.json();
  console.log(res);  // Log the response for debugging purposes
  return res;
};

export const DeleteReviews = async (id,token) => {
  const data = await fetch(`https://sportify-1haq.onrender.com/review/delete`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({
      "review_id":id
    })
  });

  const res = await data.json();
  console.log(res);  // Log the response for debugging purposes
  return res;
};


export const UpdateReviews = async (id,status,token) => {
  const data = await fetch(`https://sportify-1haq.onrender.com/review/changeStatus`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({
      "id": id,
      "status": status
    })
  });

  const res = await data.json();
  console.log(res);  // Log the response for debugging purposes
  return res;
};


export const Dashbaord = async (start_time,end_time,token) => {
  const data = await fetch(`https://sportify-1haq.onrender.com/admin/dashboard`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({
      start_time:start_time,
      end_time:end_time
    }),
  });

  const res = await data.json();
  console.log(res);  // Log the response for debugging purposes
  return res;
};




export const get_all_bookings = async (token) =>{
  const data = await fetch(`https://sportify-1haq.onrender.com/booking/get_all_bookings`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  });

  const res = await data.json();
  console.log(res);  // Log the response for debugging purposes
  return res;
}