"use server";

export const Courts = async (token) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_Backend_URL}court/get_courts`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  const data = await res.json();
  console.log(data);
  return data;
};

export const SingleCourt = async (id, token) => {
  const data = await fetch(
    `${process.env.NEXT_PUBLIC_Backend_URL}court/get_court_details/${id}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const res = await data.json();
  console.log(res);
  return res;
};

export const DeleteCourt = async (id, token) => {
  const data = await fetch(
    `${process.env.NEXT_PUBLIC_Backend_URL}court/delete_court/${id}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  console.log(data);
};

export const CreateCourt = async (formData, token) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_Backend_URL}court/create_court`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`, // Authorization header
        },
        body: formData, // Pass FormData directly
      }
    );

    const res = await response.json();
    console.log(res);

    return res;
  } catch (error) {
    console.error("Error creating court:", error);
    return { error: error.message };
  }
};

// actions/UpdateCourt.js
export const UpdateCourt = async (
  id,
  name,
  court_type,
  description,
  courtLocation,
  hourlyRate,
  minDownPayment,
  token
) => {
  const data = await fetch(
    `${process.env.NEXT_PUBLIC_Backend_URL}court/update_court/${id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: name,
        court_type: court_type,
        description: description,
        court_location: courtLocation, // Pass court_location correctly
        hourly_rate: hourlyRate, // Pass hourly_rate correctly
        min_down_payment: minDownPayment, // Pass min_down_payment correctly
      }),
    }
  );

  const res = await data.json();
  console.log(res); // Log the response for debugging purposes
  return res;
};

export const SingleCourtImage = async (id, token) => {
  const data = await fetch(
    `${process.env.NEXT_PUBLIC_Backend_URL}court/get_court_media/${id}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const res = await data.json();
  console.log(res);
  return res;
};

export const AllGames = async (token) => {
  const data = await fetch(
    `${process.env.NEXT_PUBLIC_Backend_URL}game/get_games`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const res = await data.json();
  console.log(res);
  return res;
};

export const SingleGame = async (id, token) => {
  const data = await fetch(
    `${process.env.NEXT_PUBLIC_Backend_URL}game/get_game/${id}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const res = await data.json();
  console.log(res);
  return res;
};

// actions/UpdateCourt.js
export const UpdateGame = async (
  id,
  name,
  category,
  person,
  description,
  token
) => {
  const data = await fetch(
    `${process.env.NEXT_PUBLIC_Backend_URL}game/update_game/${id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: name,
        description: description,
        category: category, // Pass court_location correctly
        person: person, // Pass hourly_rate correctly
      }),
    }
  );

  const res = await data.json();
  console.log(res); // Log the response for debugging purposes
  return res;
};

export const CreateGame = async (
  name,
  category,
  person,
  description,
  token
) => {
  const data = await fetch(
    `${process.env.NEXT_PUBLIC_Backend_URL}game/create_game`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: name,
        description: description,
        category: category, // Pass court_location correctly
        person: person, // Pass hourly_rate correctly
      }),
    }
  );

  const res = await data.json();
  console.log(res);

  return res;
};

// actions/UpdateCourt.js
export const DeleteGame = async (id, token) => {
  const data = await fetch(
    `${process.env.NEXT_PUBLIC_Backend_URL}game/delete_game/${id}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const res = await data.json();
  console.log(res); // Log the response for debugging purposes
  return res;
};

export const GetAllUser = async (token) => {
  const data = await fetch(
    `${process.env.NEXT_PUBLIC_Backend_URL}admin/get_users`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const res = await data.json();
  console.log(res); // Log the response for debugging purposes
  return res;
};

export const CreateUser = async (
  email,
  password,
  name,
  user_phone,
  secondary_user_phone,
  token
) => {
  const data = await fetch(
    `${process.env.NEXT_PUBLIC_Backend_URL}auth/signup`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        email: email,
        password: password,
        name: name, // Pass court_location correctly
        user_phone: user_phone, // Pass hourly_rate correctly
        secondary_user_phone: secondary_user_phone, // Pass hourly_rate correctly
      }),
    }
  );

  const res = await data.json();
  console.log(res); // Log the response for debugging purposes
  return res;
};

export const UpdateUser = async (
  id,
  email,
  password,
  name,
  user_phone,
  secondary_user_phone,
  token
) => {
  const data = await fetch(
    `${process.env.NEXT_PUBLIC_Backend_URL}admin/update_user/${id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        email: email,
        password_hash: password,
        name: name, // Pass court_location correctly
        user_phone: user_phone, // Pass hourly_rate correctly
        secondary_user_phone: secondary_user_phone, // Pass hourly_rate correctly
      }),
    }
  );

  const res = await data.json();
  console.log(res); // Log the response for debugging purposes
  return res;
};

export const DeleteUser = async (id, token) => {
  const data = await fetch(
    `${process.env.NEXT_PUBLIC_Backend_URL}admin/delete_user/${id}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const res = await data.json();
  console.log(res); // Log the response for debugging purposes
  return res;
};

export const Dashbaord1 = async (start_time, end_time) => {
  const data = await fetch(
    `${process.env.NEXT_PUBLIC_Backend_URL}admin/dashboard`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        start_time: start_time,
        end_time: end_time,
      }),
    }
  );

  const res = await data.json();
  console.log(res); // Log the response for debugging purposes
  return res;
};

export const GetAllReviews = async (token) => {
  const data = await fetch(
    `${process.env.NEXT_PUBLIC_Backend_URL}review/getall`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const res = await data.json();
  console.log(res); // Log the response for debugging purposes
  return res;
};

export const DeleteReviews = async (id, token) => {
  const data = await fetch(
    `${process.env.NEXT_PUBLIC_Backend_URL}review/delete`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        review_id: id,
      }),
    }
  );

  const res = await data.json();
  console.log(res); // Log the resp  onse for debugging purposes
  return res;
};

export const UpdateReviews = async (id, status, token) => {
  const data = await fetch(
    `${process.env.NEXT_PUBLIC_Backend_URL}review/changeStatus`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        id: id,
        status: status,
      }),
    }
  );

  const res = await data.json();
  console.log(res); // Log the response for debugging purposes
  return res;
};

export const Dashbaord = async (start_time, end_time, token) => {
  const data = await fetch(
    `${process.env.NEXT_PUBLIC_Backend_URL}admin/dashboard`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        start_time: start_time,
        end_time: end_time,
      }),
    }
  );

  const res = await data.json();
  console.log(res); // Log the response for debugging purposes
  return res;
};

export const get_all_bookings = async (token) => {
  const data = await fetch(
    `${process.env.NEXT_PUBLIC_Backend_URL}booking/get_all_bookings`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const res = await data.json();
  console.log(res); // Log the response for debugging purposes
  return res;
};

export const get_all_payment = async (token) => {
  const data = await fetch(
    `${process.env.NEXT_PUBLIC_Backend_URL}payment/get_payments`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const res = await data.json();
  console.log(res); // Log the response for debugging purposes
  return res;
};

