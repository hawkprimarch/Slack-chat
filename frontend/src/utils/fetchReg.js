import axios from 'axios';
import routes from '../routes.js';

export default async (authData) => {
  try {
    const response = await axios.post(routes.newUserPath(), authData);
    const { data, status } = response;
    return {
      data, status,
    };
  } catch (e) {
    const { data, status } = e.response;
    return {
      data, status,
    };
  }
};
