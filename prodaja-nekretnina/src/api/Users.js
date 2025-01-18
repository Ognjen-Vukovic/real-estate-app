import Axios from "./Axios";

export const registerUser = (user) => Axios.post("/users/register", user);

export const loginUser = (user) => Axios.post("/users/login", user);

export const createPost = (postData) => Axios.post("/users/posts", postData);

export const submitRating = (ratingData) => {
    console.log("Podaci za slanje:", ratingData); 
    return Axios.post("/ratings", ratingData, {
      headers: {
        "Content-Type": "application/json", 
      },
    });
  };
  
  



