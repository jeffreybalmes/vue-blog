<template>
   <div>
      <div class="container-fluid">
         <div class="row">
            <admin-menu :isActive="component"></admin-menu>

            <div class="col-5 mb-5">
               <h2 class="mb-3 ml-1 mt-4">Categories</h2>

               <form method="post" @submit.prevent="saveCategory()">
                  <div class="input-group mb-3">
                     <input type="text"
                        class="form-control"
                        name="name"
                        :placeholder="editPlaceholder"
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
                                 @click="deleteCategory({id: cat.id, index: i})">
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
import { mapState, mapActions } from 'vuex'
import SideNav from './side-nav.vue'

export default {
   name: 'category-table',
   components: {
      'admin-menu': SideNav,
   },
   data() {
      return {
         id: this.$route.params.id,
         request: ''
      }
   },computed: {
      ...mapState({
         categories: state => state.categories,
         category: state => state.category,
         editCategory: state => state.editCategory,
         editPlaceholder: state => state.editPlaceholder,
         component: state => state.component,
         status: state => state.status
      }),
   },
   methods: {
      ...mapActions([
         'fetchCategories',
         'fetchCategory',
         'addCategory',
         'updateCategory',
         'deleteCategory',
         'resetCategoryState'
      ]),
      saveCategory() {
         if (this.category.name == '') {
            alert('Please give a category name.');
         } else {
            if (this.editCategory === false) {
               this.request = this.addCategory();
            } else {
               this.request = this.updateCategory();
            }
         }

         this.request
            // FIXME: json issue
            .then(() => {
               this.resetCategoryState();
               this.$router.push({ path: '/admin/category'});
               this.fetchCategories();
            })
      }
   },
   watch: {
      $route(to, from) {
         this.resetCategoryState();

         this.id = this.$route.params.id;
         if(!this.id) {return}

         this.fetchCategory(this.id);
      }
   },
   created() {
      this.fetchCategories();
      this.resetCategoryState();
   }
}
</script>

