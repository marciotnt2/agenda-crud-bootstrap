<template>
    <div>
      <div class="mb-3">
        <label for="name" class="form-label">Nome</label>
        <input type="text" class="form-control" id="name" v-model="contact.name" required />
      </div>
      <div class="mb-3">
        <label for="phone" class="form-label">Telefone</label>
        <input type="text" class="form-control" id="phone" v-model="contact.phone" required />
      </div>
      <div class="mb-3">
        <label for="email" class="form-label">Email</label>
        <input type="email" class="form-control" id="email" v-model="contact.email" required />
        <small v-if="!isEmailValid && contact.email" class="text-danger">Email inválido.</small>
        <small v-if="emailExists" class="text-danger">Já existe um contato com este email.</small>
      </div>
      <button class="btn btn-primary me-2" @click="submitContact" :disabled="!isFormValid">
        {{ isEdit ? 'Atualizar' : 'Adicionar' }}
      </button>
      <button class="btn btn-secondary" @click="cancel">Cancelar</button>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      contactToEdit: {
        type: Object,
        default: () => ({ name: '', phone: '', email: '' })
      },
      contacts: {
        type: Array,
        required: true
      }
    },
    data() {
      return {
        contact: { ...this.contactToEdit },
        emailExists: false
      };
    },
    computed: {
      isEmailValid() {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(this.contact.email);
      },
      isFormValid() {
        return this.contact.name && this.contact.phone && this.isEmailValid && !this.emailExists;
      }
    },
    watch: {
      contactToEdit(newVal) {
        this.contact = { ...newVal };
      },
      'contact.email'(newEmail) {
        this.checkEmailExists(newEmail);
      }
    },
    methods: {
      checkEmailExists(email) {
        this.emailExists = this.contacts.some(
          (contact) => contact.email === email && contact.id !== this.contact.id
        );
      },
      submitContact() {
        if (!this.isFormValid) return;
        this.$emit('submit-contact', this.contact);
        this.resetForm();
      },
      cancel() {
        this.$emit('cancel');
        this.resetForm();
      },
      resetForm() {
        this.contact = { name: '', phone: '', email: '' };
        this.isEdit = false;
        this.emailExists = false;
      }
    }
  };
  </script>