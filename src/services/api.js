const API_ROOT = 'https://api.breezometer.com/baqi/?key=d6c1ac35aea3480e8cf04c53527d9d32&';

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
