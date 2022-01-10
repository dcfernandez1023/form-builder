/**
  Methods to interface with server User/Auth REST APIs
*/

import axios from "axios";
const localStorage = require("./localStorage");
const constants = require("./constants");

const baseEndpoint = constants.SERVER_API_URL + "/api/user";
const accessTokenHeader = constants.ACCESS_TOKEN_HEADER;

/**
  Sends forgot password email
*/
export const sendForgotPasswordEmail = (email, callback, onError) => {
  try {
    axios.post(baseEndpoint + "/forgotPassword", {email: email})
      .then((res) => {
        callback();
      })
      .catch((error) => {
        onError(error);
      });
  }
  catch(error) {
    onError(error);
  }
}

/**
  Verifies registration email
*/
export const verifyRegistrationEmail = (email, callback, onError) => {
  try {
    axios.post(baseEndpoint + "/registerVerify", {email: email})
      .then((res) => {
        callback();
      })
      .catch((error) => {
        onError(error);
      });
  }
  catch(error) {
    onError(error);
  }
}

/**
  Completes registration
*/
export const register = (email, password, firstName, lastName, verificationToken, callback, onError) => {
  try {
    axios.post(baseEndpoint + "/register", {email: email, password: password, firstName: firstName, lastName: lastName, verificationToken: verificationToken})
      .then((res) => {
        console.log(res);
        storeAccessToken(res.headers[accessTokenHeader]);
        callback();
      })
      .catch((error) => {
        onError(error);
      });
  }
  catch(error) {
    onError(error);
  }
}

/**
  Deletes a user
*/
export const deleteUser = (password, callback, onError) => {
  try {
    let token = getAccessToken();
    if(token === null) {
      onError(new Error("Token not found"));
      return;
    }
    let headers = {[accessTokenHeader]: token};
    axios.post(baseEndpoint + "/delete", {password: password}, {headers: headers})
      .then((res) => {
        storeAccessToken(res.headers[accessTokenHeader]);
        callback(res.data.id);
      })
      .catch((error) => {
        onError(error);
      });
  }
  catch(error) {
    onError(error);
  }
}

/**
  Updates a user
*/
export const updateUser = (user, callback, onError) => {
  try {
    let token = getAccessToken();
    if(token === null) {
      onError(new Error("Token not found"));
      return;
    }
    let headers = {[accessTokenHeader]: token};
    axios.post(baseEndpoint + "/updateFields", {fields: user}, {headers: headers})
      .then((res) => {
        storeAccessToken(res.headers[accessTokenHeader]);
        for(var key in res.data) {
          user[key] = res.data[key];
        }
        callback(user);
      })
      .catch((error) => {
        onError(error);
      });
  }
  catch(error) {
    onError(error);
  }
}

/**
  Resets a user's password
*/
export const resetPassword = (email, newPassword, callback, onError, verificationToken) => {
  try {
    let token = verificationToken === undefined ? getAccessToken() : verificationToken;
    if(token === null) {
      onError(new Error("Token not found"));
      return;
    }
    axios.post(baseEndpoint + "/resetPassword", {email: email, newPassword: newPassword, verificationToken: token})
      .then((res) => {
        storeAccessToken(res.headers[accessTokenHeader]);
        callback(res);
      })
      .catch((error) => {
        onError(error);
      });
  }
  catch(error) {
    onError(error);
  }
}

/**
  Logs the user out
*/
export const logout = () => {
  clearAccessToken();
  window.location.href = "/";
}

/**
  Logs the user in. Callback parameter will be called in the following ways:
    * callback(true) - if login successful
    * callback(false, serverMessage) - if login failed
*/
export const login = (email, password, callback, onError) => {
  try {
    axios.post(baseEndpoint + "/login", {email: email, password: password})
      .then((res) => {
        if(res.status == 200) {
          storeAccessToken(res.headers[accessTokenHeader]);
          callback(true);
        }
        else {
          callback(false, "Server responded with " + res.status.toString());
        }
      })
      .catch((error) => {
        callback(false, error.response.data.message);
      });
  }
  catch(error) {
    onError(error);
  }
}

/**
  Helper method to set refreshed access token in local storage
*/
export const storeAccessToken = (token) => {
  localStorage.set(constants.ACCESS_TOKEN, token);
}

export const clearAccessToken = () => {
  localStorage.remove(constants.ACCESS_TOKEN);
}

/**
  Gets access token from local storage
*/
export const getAccessToken = () => {
  let token = localStorage.get(constants.ACCESS_TOKEN);
  return token;
}

/**
  Gets user from server. Callback parameter can be called in the following
  ways:
    * callback(user) - if response status code == 200
    * callback(null) - if response status code != 200
    * callback(null, error) - if within error block
*/
export const getUser = (callback, onError) => {
  try {
    let token = getAccessToken();
    if(token === null) {
      callback(null);
      return;
    }
    let headers = {[accessTokenHeader]: token};
    axios.get(baseEndpoint + "/getUser", {headers: headers})
      .then((res) => {
        if(res.status == 200) {
          storeAccessToken(res.headers[accessTokenHeader]);
          callback(res.data);
        }
        else {
          callback(null);
        }
      })
      .catch((error) => {
        onError(error);
      });
  }
  catch(error) {
    onError(error);
  }
}

/**
  Checks if user is logged in based on access token. If server says access
  token is invalid, this method will send 'false' to the callback() callback
  function. If the server says the access token is still valid, this method
  will send 'true' to the callback() callback function and set the access
  token in local storage
*/
export const validateAccessToken = (token, callback, onError) => {
  try {
    let headers = {[accessTokenHeader]: token};
    axios.post(baseEndpoint + "/refreshAccessToken", {}, {headers: headers})
      .then((res) => {
        if(res.status == 200) {
          callback(true);
        }
        else {
          callback(false);
        }
      })
      .catch((error) => {
        onError(error);
      });
  }
  catch(error) {
    onError(error);
  }
}
