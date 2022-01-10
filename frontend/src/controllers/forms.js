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
  Handles a form submission a form by id. The callback parameter is called in the follinwg ways:
    * callback(form) - if successful
    * callback(null, message) - if token is not found or res.status != 200
*/
export const handleSubmit = (formId, formSubmission, callback, onError) => {
  try {
    axios.post(baseEndpoint + "/handleSubmit/" + formId, {formSubmission: formSubmission})
      .then((res) => {
        if(res.status == 200) {
          callback(res.data.form);
        }
        else {
          callback(null, "Server failed to submit form");
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
  Deletes a form by id. The callback parameter is called in the follinwg ways:
    * callback(formId) - if successful
    * callback(null, message) - if token is not found or res.status != 200
*/
export const deleteForm = (formId, callback, onError) => {
  try {
    let token = auth.getAccessToken();
    if(token === null) {
      callback(null, "Token not found");
      return;
    }
    let headers = {[accessTokenHeader]: token};
    axios.delete(baseEndpoint + "/delete/" + formId, {headers: headers})
      .then((res) => {
        if(res.status == 200) {
          auth.storeAccessToken(res.headers[accessTokenHeader]);
          callback(res.data.deletedId);
        }
        else {
          callback(null, "Server failed to delete form");
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
    // form.submissions.push(
    //   {
    //     timestamp: 0,
    //     submissionErrors: [
    //       {error: 0, type: "test"}
    //     ],
    //     data: [
    //       {id: "test", name: "test", value: "test"},
    //       {id: "test", name: "test", value: "test"}
    //     ]
    //   }
    // );
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
          callback(null, "Server failed to update form");
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
export const getPublishedForm = (formId, callback, onError) => {
  try {
    axios.get(baseEndpoint + "/getPublishedForm/" + formId)
      .then((res) => {
        if(res.status == 200) {
          callback(res.data);
        }
        else {
          callback(null, "Server failed to get published form");
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
          callback(null, "Server failed to get form");
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
