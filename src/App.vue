<template>
  <div class="container mt-5">
    <h1 class="mb-4">Agenda de Contatos</h1>
    <ContactForm
      :contactToEdit="contactToEdit"
      :contacts="contacts"
      @submit-contact="handleSubmitContact"
      @cancel="resetForm"
    />
    <ContactList
      :contacts="contacts"
      @edit-contact="handleEditContact"
      @delete-contact="handleDeleteContact"
    />
  </div>
</template>

<script>
import axios from 'axios';
import ContactForm from './components/ContactForm.vue';
import ContactList from './components/ContactList.vue';

const API_URL = 'https://localhost:7173/api/Contacts'; 

export default {
  components: {
    ContactForm,
    ContactList
  },
  data() {
    return {
      contacts: [],
      contactToEdit: null
    };
  },
  created() {
    this.fetchContacts();
  },
  methods: {
    async fetchContacts() {
      const response = await axios.get(API_URL);
      this.contacts = response.data;
    },
    async handleSubmitContact(contact) {
      if (contact.id) {
        await axios.put(`${API_URL}/${contact.id}`, contact);
      } else {
        await axios.post(API_URL, contact);
      }
      this.fetchContacts();
      this.resetForm();
    },
    handleEditContact(contact) {
      this.contactToEdit = contact;
    },
    async handleDeleteContact(id) {
      await axios.delete(`${API_URL}/${id}`);
      this.fetchContacts();
    },
    resetForm() {
      this.contactToEdit = null;
    }
  }
};
</script>

<style>
body {
  font-family: Arial, sans-serif;
}
</style>