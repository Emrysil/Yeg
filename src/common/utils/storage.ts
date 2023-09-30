import _ from "lodash";

export const getTokenLocalStorage = () => {
    if (typeof window !== 'undefined') {
        const jwtToken = localStorage.getItem('jwt-token');
        return jwtToken ? jwtToken : null;
    } else {
      return null;
    }
};

export const setTokensLocalStorage = (token: string) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('jwt-token',token);
    }
};

export const clearLocalStorage = () => {
    localStorage.removeItem('jwt-token');
};
  
export const isAuth = () => {
  const token = getTokenLocalStorage();
  if (token === null) {
    return false;
  }
  return true;
};