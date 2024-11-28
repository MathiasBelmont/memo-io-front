import axios from 'axios';

const BASE_URL = 'http://localhost:8080/memo-io-back/notes';

const NotesAPI = {
  getNote: async (id: number) => {
    try {
      const response = await axios.get(`${BASE_URL}/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching note:', error);
      throw error;
    }
  },

  updateNote: async (id: number, noteData: any) => {
    try {
      const response = await axios.put(`${BASE_URL}/${id}`, noteData);
      return response.data;
    } catch (error) {
      console.error('Error updating note:', error);
      throw error;
    }
  },

  deleteNote: async (id: number) => {
    try {
      const response = await axios.delete(`${BASE_URL}/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting note:', error);
      throw error;
    }
  },

  getAllNotes: async () => {
    try {
      const response = await axios.get(BASE_URL);
      // console.log(response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching all notes:', error);
      throw error;
    }
  },

  createNote: async (noteData: any) => {
    try {
      const response = await axios.post(BASE_URL, noteData);
      return response.data;
    } catch (error) {
      console.error('Error creating note:', error);
      throw error;
    }
  },

  getNotesByAuthor: async (id: number) => {
    try {
      const response = await axios.get(`${BASE_URL}/author/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching notes by author:', error);
      throw error;
    }
  },
};

export default NotesAPI;

