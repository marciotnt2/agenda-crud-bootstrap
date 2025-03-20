<template>
    <div>
      <div class="mb-3">
        <label for="name" class="form-label">Nome</label>
        <input type="text" class="form-control" id="name" v-model="contact.name"  required />
      </div>
      <div class="mb-3">
        <label for="phone" class="form-label">Telefone</label>
        <input type="text" class="form-control" id="phone" v-model="contact.phone" required />
      </div>
      <div class="mb-3">
        <label for="email" class="form-label">Email</label>
        <input type="email" class="form-control" id="email" v-model="contact.email" required />

        <small v-if="!isEmailValid && contact.email" class="text-danger">Email inválido.</small>
      </div>
      <button class="btn btn-primary me-2" @click="submitContact">
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
      }
    },
    
    data() {
      return {
        contact: { ...this.contactToEdit },
      };
    },
    computed: {
    isEmailValid() {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(this.contact.email);
    },
    isFormValid() {
      return this.contact.name && this.contact.phone && this.isEmailValid;
    }
    },
    watch: {
      contactToEdit(newVal) {
        this.contact = { ...newVal };
      }
    },
    methods: {
      submitContact() {
        this.$emit('submit-contact', this.contact);
        
      },
      cancel() {
        this.$emit('cancel');
      },
    }
  };
  </script>