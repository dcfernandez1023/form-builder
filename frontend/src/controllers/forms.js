/**
  Methods to interface with server Form REST APIs
*/

import axios from "axios";
const localStorage = require("./localStorage");
const constants = require("./constants");

const baseEndpoint = constants.SERVER_API_URL + "/api/form";
const accessTokenHeader = constants.ACCESS_TOKEN_HEADER;
const auth = require("./auth");


/**
  Updates a form by id. The callback parameter is called in the follinwg ways:
    * callback(form) - if successful
    * callback(null, message) - if token is not found or res.status != 200
*/
export const updateForm = (formId, form, callback, onError) => {
  try {
    let token = auth.getAccessToken();
    if(token === null) {
      callback(null, "Token not found");
      return;
    }
    let headers = {[accessTokenHeader]: token};
    axios.post(baseEndpoint + "/updateFields/" + formId, {fields: form}, {headers: headers})
      .then((res) => {
        if(res.status == 200) {
          auth.storeAccessToken(res.headers[accessTokenHeader]);
          for(var key in res.data) {
            form[key] = res.data[key];
          }
          callback(form);
        }
        else {
          callback(null, "Server failed to create form");
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
  Gets a form by id. The callback parameter is called in the follinwg ways:
    * callback(form) - if successful
    * callback(null, message) - if token is not found or res.status != 200
*/
export const getForm = (formId, callback, onError) => {
  try {
    let token = auth.getAccessToken();
    if(token === null) {
      callback(null, "Token not found");
      return;
    }
    let headers = {[accessTokenHeader]: token};
    axios.get(baseEndpoint + "/getForm/" + formId, {headers: headers})
      .then((res) => {
        if(res.status == 200) {
          auth.storeAccessToken(res.headers[accessTokenHeader]);
          callback(res.data);
        }
        else {
          callback(null, "Server failed to create form");
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
  Creates a new form. The callback parameter is called in the follinwg ways:
    * callback(forms) - if successful
    * callback(null, message) - if token is not found or request is unauthorized
*/
export const createForm = (title, callback, onError) => {
  try {
    let token = auth.getAccessToken();
    if(token === null) {
      callback(null, "Token not found");
      return;
    }
    let headers = {[accessTokenHeader]: token};
    axios.post(baseEndpoint + "/createNew", {title: title}, {headers: headers})
      .then((res) => {
        if(res.status == 200) {
          auth.storeAccessToken(res.headers[accessTokenHeader]);
          callback(res.data);
        }
        else {
          callback(null, "Server failed to create form");
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
  Gets user's forms. The callback parameter is called in the follinwg ways:
    * callback(forms) - if successful
    * callback(null, message) - if token is not found or request is unauthorized
*/
export const getForms = (callback, onError) => {
  try {
    let token = auth.getAccessToken();
    if(token === null) {
      callback(null, "Token not found");
      return;
    }
    let headers = {[accessTokenHeader]: token};
    axios.get(baseEndpoint + "/getForms", {headers: headers})
      .then((res) => {
        if(res.status == 200) {
          auth.storeAccessToken(res.headers[accessTokenHeader]);
          // Sort forms in ascending order by dateCreated
          res.data.sort((a, b) => {
            return a.dateCreated - b.dateCreated;
          });
          callback(res.data);
        }
        else {
          callback(null, "Could not get your forms from server");
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