<template>
   <div>
      <div class="container mb-5">
         <div class="row mt-4">

            <div class="col-md-8">
               <div v-if="filteredBlogs.length > 0">
                  <h2 class="mb-3">Posts</h2>
                  <div v-for="blog in filteredBlogs">
                     <div class="card mb-3">
                        <div class="card-body">
                           <h4 class="card-title">
                              <router-link :to="'/post/'+ blog.id" @click.prevent="readPost(blog.id)">{{blog.title}}</router-link>
                           </h4>
                           <p class="card-text">{{blog.body.length < 250 ? blog.body : blog.body.substring(0, 249)+" [...]"}}</p>
                        </div>
                        <div class="card-footer">
                           <small class="text-muted">{{blog.category_name}}</small>
                           <small class="text-muted float-right">{{blog.created_at}}</small>
                        </div>
                     </div>
                  </div>
                  <div class="form-group text-center mt-4">
                     <button class="btn btn-default">Load more...</button>
                  </div>
               </div>
               <div v-else>
                  <h2 class="mb-3">No Posts Found...</h2>
               </div>
            </div> <!-- /.col-md-8 -->

            <app-sidebar :cats="categories" :show="true"></app-sidebar>

         </div>
      </div>
   </div>
</template>

<script>

import Sidebar from '../layout/sidebar.vue'
import searchBlogs from '../../mixins/searchMixin.js'

export default {
   name: 'App',
   components: {
      'app-sidebar': Sidebar,
   },
   data() {
      return {
         blogs: [],
         post: {},
         filter: this.$route.query.search,
         categories: [],
      }
   },
   methods: {
      fetchData() {
         fetch("http://localhost/02phpprojects/simple_blog_pdo/api/post/read.php")
            .then(response => response.json())
            .then((blogs) => {
               this.blogs = blogs;
            })
         fetch("http://localhost/02phpprojects/simple_blog_pdo/api/category/read.php")
            .then(response => response.json())
            .then((categories) => {
               this.categories = categories;
            })
      }
   },
   watch: {
      $route(to, from) {
         this.filter = this.$route.query.search;
      }
   },
   mounted() {
      this.fetchData();
   },
   mixins: [searchBlogs]
}
</script>

