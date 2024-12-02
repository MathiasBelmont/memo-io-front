import axios from 'axios';

const BASE_URL = 'http://localhost:8080/memo-io-back/users';

const UsersAPI = {
  createUser: async (userData: any) => {
    try {
      const response = await axios.post(BASE_URL, userData);
      return response.data;
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  },
  
  getUser: async (id: number) => {
    try {
      const response = await axios.get(`${BASE_URL}/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching user:', error);
      throw error;
    }
  },

  updateUser: async (id: number, userData: any) => {
    try {
      const response = await axios.put(`${BASE_URL}/${id}`, userData);
      return response.data;
    } catch (error) {
      console.error('Error updating user:', error);
      throw error;
    }
  },

  deleteUser: async (id: number) => {
    try {
      const response = await axios.delete(`${BASE_URL}/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting user:', error);
      throw error;
    }
  },

  getAllUsers: async () => {
    try {
      const response = await axios.get(BASE_URL);
      return response.data;
    } catch (error) {
      console.error('Error fetching all users:', error);
      throw error;
    }
  },

  // login
  login: async (email: string, password: string) => {
    try {
      const response = await axios.post(`${BASE_URL}/login`, { email, password });
      return response.data;
    } catch (error) {
      console.error('Error logging in:', error);
      throw error;
    }
  }
};

export default UsersAPI;
