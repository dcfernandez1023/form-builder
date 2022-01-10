/**
  Helper methods to interface with local storage of browser
*/

export const set = (key, value) => {
  if(key === undefined || key === null || value === undefined || value === null) {
    return;
  }
  window.localStorage.setItem(key.toString(), value.toString());
}

export const get = (key) => {
  if(key === undefined || key === null) {
    return null;
  }
  return window.localStorage.getItem(key.toString());
}

export const remove = (key) => {
  window.localStorage.removeItem(key);
}
