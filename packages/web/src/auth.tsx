export const isAuthenticated = () => {
  return true;
  //return localStorage.getItem('token');
};

export const getToken = () => {
  return localStorage.getItem('token');
};

export const login = token => {
  localStorage.setItem('token', token);
};

export const logout = () => {
  localStorage.removeItem('token');
};
