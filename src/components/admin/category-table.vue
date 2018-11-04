<template>
   <div>
      <div class="container-fluid">
         <div class="row">
            <admin-menu :isActive="component"></admin-menu>

            <div class="col-5 mb-5">
               <h2 class="mb-3 ml-1 mt-4">Categories</h2>

               <form method="post" @submit.prevent="addCategory()">
                  <div class="input-group mb-3">
                     <input type="text"
                        class="form-control"
                        name="name"
                        :placeholder="info"
                        v-model="category.name">

                     <div class="input-group-append">
                        <button class="btn btn-primary" type="submit">Save</button>
                     </div>
                  </div>
               </form>

               <div class="table-responsive">
                  <table class="table table-striped">
                     <thead>
                        <tr>
                           <th scope="col">#</th>
                           <th scope="col">Category Name</th>
                           <th scope="col">Command</th>
                        </tr>
                     </thead>
                     <tbody>
                        <tr v-for="cat, i in categories">
                           <th scope="row">{{cat.id}}</th>
                           <td>{{cat.name}}</td>
                           <td>

                              <router-link
                                 :to="'/admin/category/edit/'+ cat.id"
                                 class="btn btn-outline-secondary btn-sm">
                                 Edit
                              </router-link>

                              <button
                                 class="btn btn-outline-danger btn-sm"
                                 @click="deleteCategory(cat.id, i)">
                                 Delete
                              </button>

                           </td>
                        </tr>
                     </tbody>
                  </table>
               </div>
            </div> <!-- /.col-10 -->

         </div>
      </div>
   </div>
</template>

<script>
import SideNav from './side-nav.vue'

export default {
   name: 'category-table',
   components: {
      'admin-menu': SideNav,
   },
   data() {
      return {
         id: this.$route.params.id,
         component: 'category-table',
         status: {},
         edit: false,
         categories: [],
         category: {},
         info: 'add new category...'
      }
   },
   methods: {
      fetchCategory() {
         fetch("http://localhost/02phpprojects/simple_blog_pdo/api/category/read.php")
         .then(response => response.json())
         .then((categories) => {
            this.categories = categories;
         })
      },
      addCategory() {
         if (this.category.name == '') {
            alert('Please give a category name.');
         } else {
            if (this.edit === false) {
               // Add
               fetch("http://localhost/02phpprojects/simple_blog_pdo/api/category/create.php", {
                  headers: {
                     'Accept': 'application/json',
                     'Content-Type': 'application/json'
                  },
                  method: 'POST',
                  body: JSON.stringify({
                     name: this.category.name
                  }),
               })
                  .then(response => response.json())
                  .then((message) => {
                     this.fetchCategory();
                     this.status = message;
                     this.category.name = '';
                     this.category.id = '';
                     this.info = 'add new category...';
                     this.$router.push({ path: '/admin/category'});
                  })
            } else {
               // Update
               fetch("http://localhost/02phpprojects/simple_blog_pdo/api/category/update.php", {
                  headers: {
                     'Accept': 'application/json',
                     'Content-Type': 'application/json'
                  },
                  method: 'PUT',
                  body: JSON.stringify(this.category)
               })
                  .then(response => response.json())
                  .then((message) => {
                     this.$router.push({ path: '/admin/category'});
                     this.fetchCategory();
                     this.status = message;
                     this.category.name = '';
                     this.category.id = '';
                     this.info = 'add new category...';
                     this.edit = false;
                  })
            }
         }
      },
      deleteCategory(...args) {
         fetch("http://localhost/02phpprojects/simple_blog_pdo/api/category/delete.php", {
            body: JSON.stringify({ id: args[0] }),
            method: "DELETE",
            headers: {
               'Content-Type': 'application/json'
            }
         })
         .then(response => response.json())
         .then((message) => {
            this.status = message;
            this.categories.splice(args[1], 1);
         })
      }
   },
   watch: {
      $route(to, from) {
         this.id = this.$route.params.id;
         if(!this.id) {return}

         fetch("http://localhost/02phpprojects/simple_blog_pdo/api/category/read_single.php?id=" + this.id)
         .then(response => response.json())
         .then((data) => {
            this.category = data;
            this.info = `edit ${this.category.name} category`;
            this.edit = true;
         });
      }
   },
   created() {
      this.fetchCategory();
   }
}
</script>

