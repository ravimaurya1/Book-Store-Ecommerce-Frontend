// import {API} from '../config';

export const read = (userId, token) =>{
    return fetch(`/api/user/${userId}`,{
        method:"GET",
        headers: {
            Accept: "application/json",
            Token: `${token}`,
          },
    })
    .then(response => {
        return response.json();
    })
    .catch(err =>{console.log(err)});
};

export const update = (userId, token,user) =>{
    return fetch(`/api/user/${userId}`,{
        method:"PUT",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Token: `${token}`,
          },
        body: JSON.stringify(user)

    })
    .then(response => {
        return response.json();
    })
    .catch(err =>{console.log(err)});

};

export const userUpdate = (user,next) =>{
    if(typeof window !== 'undefined'){
        if(localStorage.getItem('jwt')){
            let auth = JSON.parse(localStorage.getItem('jwt'));
            auth.user = user;
            localStorage.setItem('jwt',JSON.stringify(auth));
            next();
        }
    }
}


export const getPurchaseHistory = (userId, token) =>{
    return fetch(`/api/orders/by/user/${userId}`,{
        method:"GET",
        headers: {
            Accept: "application/json",
            Token: `${token}`,
          },
    })
    .then(response => {
        return response.json();
    })
    .catch(err =>{console.log(err)});
};