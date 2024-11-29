'use server'

export const Grounds = async () => {
  const data = await fetch("https://sportify-1haq.onrender.com/court/get_courts",{
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJjMTRiYjdiYS1hNmQxLTRmMjQtOTBmNC1mYjQyNDViMGFjNjAiLCJlbWFpbCI6InVzZXJAZ21haWwuY29tIiwicm9sZSI6WyJ1c2VyIl0sImlhdCI6MTczMjg2MDEyOSwiZXhwIjoxNzMzNzI0MTI5fQ.XegR7vcIz-jPLXDRibxRhj8m-0PHNG_Dw0GPUJt-HJQ'
    },
  });

  const res = await data.json();
  console.log(res);
  return res
  
  
}


export const SingleGround = async (id) => {
    const data = await fetch(`https://sportify-1haq.onrender.com/court/get_court_details/${id}`,{
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJjMTRiYjdiYS1hNmQxLTRmMjQtOTBmNC1mYjQyNDViMGFjNjAiLCJlbWFpbCI6InVzZXJAZ21haWwuY29tIiwicm9sZSI6WyJ1c2VyIl0sImlhdCI6MTczMjg2MDEyOSwiZXhwIjoxNzMzNzI0MTI5fQ.XegR7vcIz-jPLXDRibxRhj8m-0PHNG_Dw0GPUJt-HJQ'
      },
    });
  
    const res = await data.json();
    console.log(res);
    return res
    
    
  }
