import { Middleware } from 'redux';
import { loginUser } from '../redux/reducers/authSlice';


const authMiddleware: Middleware = (storeAPI) => (next) => (action: any) => {
  // Pass all actions through by default
  let result = next(action);

  // Intercept loginUser action
  if (action.type === loginUser.fulfilled.type) {
    // Store user data and access token in local storage upon successful login
    localStorage.setItem('user', JSON.stringify(action.payload.user));
    localStorage.setItem('accessToken', action.payload.access_token);
  }

  return result;
};

export default authMiddleware;
