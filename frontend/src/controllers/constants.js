console.log(process.env.ENVIRONMENT);

export const ACCESS_TOKEN = "ACCESS_TOKEN";
export const ACCESS_TOKEN_HEADER = "access-token";
export const SERVER_API_URL = process.env.REACT_SERVER_ENVIRONMENT === "prod" ? window.location.protocol+'//'+ window.location.hostname + (window.location.port.toString().trim().length !== 0 ? ':'+ window.location.port: '') : "http://localhost:5000";
export const TOKEN_NOT_FOUND = "Token not found";
