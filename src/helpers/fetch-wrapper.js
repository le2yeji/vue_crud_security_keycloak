import { useAuthStore } from '@features/keycloak/store/useAuthStore';

//import { inject } from 'vue';
export const fetchWrapper = {
  get: request('GET'),
  post: request('POST'),
  put: request('PUT'),
  delete: request('DELETE'),
};

function request(method) {
  return async (url, body) => {
    const composeUrl = url ; //import.meta.env.VITE_API_URL + url

    const requestOptions = {
      method,
      headers: authHeader(composeUrl),
    };
    console.log('데이터확인 body',body);
    if (body) {
      console.log('데이터확인 body2',body);
      requestOptions.headers['Content-Type'] = 'application/json';
      requestOptions.body = JSON.stringify(body);
    }
    console.log('데이터확인 url',composeUrl);
    console.log('데이터확인 requestOptions', requestOptions);
    const response = await fetch(composeUrl, requestOptions);
    console.log('데이터확인2', response);
    return handleResponse(response);
  };
}

// helper functions

function authHeader() {
  console.log('세번째');
  // return auth header with jwt if user is logged in and request is to the api url
  const { user } = JSON.parse(localStorage.getItem('auth'));
  const token = user.accessToken; // JSON.parse(user.accessToken);
  console.log('token', token);

  if (token) {
    return { Authorization: `Bearer ${token}` };
  } else {
    return {};
  }
}

function handleResponse(response) {
  console.log('네번째');
  return response.text().then((text) => {
    const data = text && JSON.parse(text);

    if (!response.ok) {
      const { user, logout } = useAuthStore();
      if ([401, 403].includes(response.status) && user) {
        // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
        logout();
      }

      const error = (data && data.message) || response.statusText;
      return Promise.reject(error);
    }

    return data;
  });
}
