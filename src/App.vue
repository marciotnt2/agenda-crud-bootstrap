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
import api from './services/api';
import ContactForm from './components/ContactForm.vue';
import ContactList from './components/ContactList.vue';

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
      this.contacts = await api.getContacts();
    },
    async handleSubmitContact(contact) {
      if (contact.id) {
        await api.updateContact(contact.id, contact);
      } else {
        await api.addContact(contact);
      }
      this.fetchContacts();
      this.resetForm();
    },
    handleEditContact(contact) {
      this.contactToEdit = contact;
    },
    async handleDeleteContact(id) {
      await api.deleteContact(id);
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