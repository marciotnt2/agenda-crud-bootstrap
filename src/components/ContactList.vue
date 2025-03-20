<template>
    <div>
      <table class="table">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Telefone</th>
            <th>Email</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="contact in paginatedContacts" :key="contact.id">
            <td>{{ contact.name }}</td>
            <td>{{ contact.phone }}</td>
            <td>{{ contact.email }}</td>
            <td>
              <button class="btn btn-success btn-sm me-2" @click="editContact(contact)">
                Editar
              </button>
              <button class="btn btn-danger btn-sm" @click="deleteContact(contact.id)">
                Excluir
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <nav>
        <ul class="pagination">
          <li class="page-item" :class="{ disabled: currentPage === 1 }">
            <button class="page-link" @click="prevPage">Anterior</button>
          </li>
          <li class="page-item" v-for="page in totalPages" :key="page" :class="{ active: page === currentPage }">
            <button class="page-link" @click="changePage(page)">{{ page }}</button>
          </li>
          <li class="page-item" :class="{ disabled: currentPage === totalPages }">
            <button class="page-link" @click="nextPage">Próxima</button>
          </li>
        </ul>
      </nav>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      contacts: {
        type: Array,
        required: true
      }
    },
    data() {
      return {
        currentPage: 1,
        itemsPerPage: 5
      };
    },
    computed: {
      totalPages() {
        return Math.ceil(this.contacts.length / this.itemsPerPage);
      },
      paginatedContacts() {
        const start = (this.currentPage - 1) * this.itemsPerPage;
        const end = start + this.itemsPerPage;
        return this.contacts.slice(start, end);
      }
    },
    methods: {
      editContact(contact) {
        this.$emit('edit-contact', contact);
      },
      deleteContact(id) {
        this.$emit('delete-contact', id);
      },
      changePage(page) {
        this.currentPage = page;
      },
      prevPage() {
        if (this.currentPage > 1) this.currentPage--;
      },
      nextPage() {
        if (this.currentPage < this.totalPages) this.currentPage++;
      }
    }
  };
  </script>