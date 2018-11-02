<template>
   <div>
      <div class="container mb-5">
         <div class="row mt-4">

            <div class="col-md-8">
               <div>
                  <h2>{{ post.title }}</h2>
                  <small class="text-muted">{{ post.category_name }}</small>
                  <p class="card-text mt-3 mb-2">{{ post.body }}</p>
                  <div class="form-group mt-4">
                     <router-link to="/" class="btn btn-default">&laquo; Back</router-link>
                  </div>
               </div>
            </div> <!-- /.col-md-8 -->

            <app-sidebar :cats="categories" :show="false"></app-sidebar>

         </div>
      </div>
   </div>
</template>

<script>

import Sidebar from '../layout/sidebar.vue'
import searchBlogs from '../../mixins/searchMixin.js'

export default {
   name: 'PostSingle',
   components: {
      'app-sidebar': Sidebar,
   },
   data() {
      return {
         id: this.$route.params.id,
         post: {},
         categories: []
      }
   },
   created() {
      fetch("http://localhost/02phpprojects/simple_blog_pdo/api/post/read_single.php?id=" + this.id)
         .then(response => response.json())
         .then((data) => {
            this.post = data;
         });
      fetch("http://localhost/02phpprojects/simple_blog_pdo/api/category/read.php")
         .then(response => response.json())
         .then((categories) => {
            this.categories = categories;
         })
   }
}
</script>

