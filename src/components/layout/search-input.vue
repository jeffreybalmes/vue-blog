<template>
   <div class="input-group mb-4">

      <input type="text" class="form-control"
         v-model="value"
         @keyup="filter(value)"
         @keyup.13="filter(value)"
         placeholder="Search...">

      <div class="input-group-append">
         <button
            class="btn btn-outline-danger"
            type="button"
            @click.prevent="value = ''; filter(value)">
            x
         </button>
      </div>
   </div> <!-- /.input-group mb-4 -->
</template>

<script>
export default {
   name: 'search-input',
   props: ['component'],
   data() {
      return {
         value: ''
      }
   },
   methods: {
      filter(value) {
         if (this.component == 'index') {
            if (value !== '') {
               this.$router.push({ path: '/', query: { search: this.value }});
            } else {
               this.$router.push({ path: '/'});
            }
         } else {
            if (value !== '') {
               this.$router.push({ path: '/admin/post', query: { search: this.value }});
            } else {
               this.$router.push({ path: '/admin/post'});
            }
         }
      }
   }
}
</script>

