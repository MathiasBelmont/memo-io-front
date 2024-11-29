import axios from 'axios';

const BASE_URL = 'http://localhost:8080/memo-io-back/notes';

const NotesAPI = {
  create: async (noteData: any) => {
    try {
      const response = await axios.post(BASE_URL, noteData);
      return response.data;
    } catch (error) {
      console.error('Error creating note:', error);
      throw error;
    }
  },

  getNote: async (id: number) => {
    try {
      const response = await axios.get(`${BASE_URL}/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching note:', error);
      throw error;
    }
  },

  getByAuthor: async (id: number) => {
    try {
      const response = await axios.get(`${BASE_URL}/author/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching notes by author:', error);
      throw error;
    }
  },

  getAll: async () => {
    try {
      const response = await axios.get(BASE_URL);
      return response.data;
    } catch (error: any) {
      if (error.response?.status === 404) {
        return [];
      }
      console.error('Error fetching all notes:', error);
      throw error;
    }
  },

  update: async (id: number, noteData: any) => {
    try {
      const response = await axios.put(`${BASE_URL}/${id}`, noteData);
      return response.data;
    } catch (error) {
      console.error('Error updating note:', error);
      throw error;
    }
  },

  delete: async (id: number) => {
    try {
      const response = await axios.delete(`${BASE_URL}/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting note:', error);
      throw error;
    }
  },
};

export default NotesAPI;
