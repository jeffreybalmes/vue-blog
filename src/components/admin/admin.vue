<template>
   <div>
      <div class="container-fluid">
         <div class="row">
            <admin-menu :isActive="component"></admin-menu>

            <div class="col-10 mb-5">
               <h2 class="mb-3 ml-1 mt-4">Posts</h2>
               <router-link to="/admin/post/create" class="btn btn-primary mr-5">Add Post</router-link>
               <div class="float-right">
                  <search-box></search-box>
               </div>
               <div class="table-responsive">
                  <table class="table table-striped">
                     <thead>
                        <tr>
                           <th scope="col">#</th>
                           <th scope="col">Title</th>
                           <th scope="col">Body</th>
                           <th scope="col">Category</th>
                           <th scope="col">Command</th>
                        </tr>
                     </thead>
                     <tbody>
                        <tr v-for="blog, i in filteredBlogs">
                           <th scope="row">{{blog.id}}</th>
                           <td>{{blog.title}}</td>
                           <td>
                              {{blog.body.length < 50 ? blog.body : blog.body.substring(0, 49)+" [...]"}}
                           </td>
                           <td>{{blog.category_name}}</td>
                           <td>
                              <router-link :to="'/admin/post/edit/'+ blog.id" class="btn btn-outline-secondary btn-sm">Edit</router-link>
                              <button class="btn btn-outline-danger btn-sm" @click="deletePost(blog.id, i)">Delete</button>
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
import searchInput from '../layout/search-input.vue'
import searchBlogs from '../../mixins/searchMixin.js'

export default {
   name: 'admin',
   components: {
      'admin-menu': SideNav,
      'search-box': searchInput
   },
   data() {
      return {
         component: 'post-table',
         blogs: [],
         filter: this.$route.query.search
      }
   },
   methods: {
      deletePost(...args) {
         fetch("http://localhost/02phpprojects/simple_blog_pdo/api/post/delete.php", {
            body: JSON.stringify({ id: args[0] }),
            method: "DELETE",
            headers: {
               'Content-Type': 'application/json'
            }
         })
         .then(response => response.json())
         .then((message) => {
            this.status = message;
            this.blogs.splice(args[1], 1);
         })
      }
   },
   watch: {
      $route(to, from) {
         this.filter = this.$route.query.search;
      }
   },
   mounted() {
      fetch("http://localhost/02phpprojects/simple_blog_pdo/api/post/read.php")
         .then(response => response.json())
         .then((blogs) => {
            this.blogs = blogs;
         })
   },
   mixins: [searchBlogs]
};
</script>
