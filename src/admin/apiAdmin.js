// import { API } from "../config";

export const createCategory = (userId, token, category) => {
  //console.log(process.env.REACT_APP_API_URL);
  return fetch(`/api/category/create/${userId}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Token: `${token}`,
    },
    body: JSON.stringify(category),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err, "Something gone wrong");
    });
};


//In this will send form data not json

export const createProduct = (userId, token, product) => {
  //console.log(process.env.REACT_APP_API_URL);
  return fetch(`/api/product/create/${userId}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      Token: `${token}`,
    },
    body:product,
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err, "Something gone wrong");
    });
};






export const getCategories = () =>{
    return fetch(`/api/categories`,{
        method:"GET"
    })
    .then(response => {
        return response.json();
    })
    .catch(err =>{console.log(err)});
};



export const listOrders = (userId, token) => {
  //console.log(process.env.REACT_APP_API_URL);
  return fetch(`/api/order/list/${userId}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      Token: `${token}`,
    }
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err, "Something gone wrong");
    });
};

export const getStatusValues = (userId, token) => {
  //console.log(process.env.REACT_APP_API_URL);
  return fetch(`/api/order/status-values/${userId}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      Token: `${token}`,
    }
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err, "Something gone wrong");
    });
};


export const updateOrderStatus = (userId, token,orderId,status) => {
  //console.log(process.env.REACT_APP_API_URL);
  return fetch(`/api/order/${orderId}/status/${userId}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type":'application/json',
      Token: `${token}`,
    },
    body:JSON.stringify({orderId,status})
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err, "Something gone wrong");
    });
};



/***
 * to perform crud on product
 * get all products
 * get a single product
 * update single product
 * delete single product
 */

export const getProducts = () =>{
  return fetch(`/api/products?limit=200`,{
      method:"GET"
  })
  .then(response => {
      return response.json();
  })
  .catch(err =>{console.log(err)});
};


export const deleteProduct = (productId,userId, token) => {
  //console.log(process.env.REACT_APP_API_URL);
  return fetch(`/api/product/${productId}/${userId}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type":'application/json',
      Token: `${token}`,
    }
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err, "Something gone wrong");
    });
};


export const getProduct = (productId) =>{
  return fetch(`/api/product/${productId}`,{
      method:"GET"
  })
  .then(response => {
      return response.json();
  })
  .catch(err =>{console.log(err)});
};

export const updateProduct = (productId,userId, token,product) => {
  //console.log(process.env.REACT_APP_API_URL);
  return fetch(`/api/product/${productId}/${userId}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      Token: `${token}`,
    },
    body:product
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err, "Something gone wrong");
    });
};
