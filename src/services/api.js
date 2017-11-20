const API_ROOT = process.env.REACT_APP_API_URL;

const responseWithErrors = json => !json.data_valid || json.error;

const checkStatus = (response) => {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  const error = new Error(response.statusText);
  error.response = response;
  throw error;
};

const callApi = (endpoint) => {
  const fullUrl = (endpoint.indexOf(API_ROOT) === -1) ? API_ROOT + endpoint : endpoint;

  return fetch(fullUrl)
    .then(checkStatus)
    .then(response => response.json())
    .then((json) => {
      if (responseWithErrors(json)) {
        return Promise.reject(json.error);
      }
      return json;
    })
    .then(
      response => ({ response }),
      error => ({ error: error.message || 'Something bad happened' }),
    )
};

export const getData = coordinates => callApi(`lat=${coordinates.latitude}&lon=${coordinates.longitude}`);
