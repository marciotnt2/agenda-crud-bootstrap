import axios from 'axios';

const API_URL = 'https://localhost:7173/api/Contacts'; 

export default {
  async getContacts() {
    const response = await axios.get(API_URL);
    return response.data;
  },
  async addContact(contact) {
    const response = await axios.post(API_URL, contact);
    return response.data;
  },
  async updateContact(id, contact) {
    const response = await axios.put(`${API_URL}/${id}`, contact);
    return response.data;
  },
  async deleteContact(id) {
    await axios.delete(`${API_URL}/${id}`);
  }
};