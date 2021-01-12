// import { API } from "../config";


export const signup = (user) => {
    //console.log(process.env.REACT_APP_API_URL);
     return fetch(`/api/signup`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((response) => {
        return(response.json());
      })
      .catch((err) => {
        console.log(err,"Something gone wrong");
      });
  };


  export const signin = (user) => {
    //console.log(process.env.REACT_APP_API_URL);
     return fetch(`/api/signin`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((response) => {
        return(response.json());
      })
      .catch((err) => {
        console.log(err,"Something gone wrong");
      });
  };

  export const authenticate = (data,next) => {
      if(typeof window !== 'undefined'){
          localStorage.setItem('jwt',JSON.stringify(data));
          next();
      }
  };

  export const signout = (next) =>{
      if(typeof window !== 'undefined'){
          localStorage.removeItem("jwt");
          next();
          return fetch(`/api/signout`,{
              method:'GET'
          })
          .then(response =>{
              console.log(response);
          })
          .catch(err =>{console.log(err)});
      }
  };

  export const isAuthenticated = () =>{
    if(typeof window === undefined){
        return false;
    }
    if(localStorage.getItem('jwt')){
        return JSON.parse(localStorage.getItem('jwt'));
    }
    else{
        return false;
    }
  };