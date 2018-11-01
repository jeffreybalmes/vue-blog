<template>
   <div>
      <div class="container mb-5">
         <div class="row mt-4">

            <div class="col-md-8">
               <posts-component
                  v-if="allPosts"
                  :posts="filteredBlogs"
                  @viewPost="readPost($event)">
               </posts-component>

               <post-component
                  v-else
                  :row="post"
                  @home="back()">
               </post-component>
            </div> <!-- /.col-md-8 -->

            <app-sidebar
               :cats="categories"
               :show="allPosts"
               @updateList="back(); updateList($event)">
            </app-sidebar>

         </div>
      </div>
   </div>
</template>

<script>

import Posts from './posts.vue'
import SinglePost from './single-post.vue'
import Sidebar from '../layout/sidebar.vue'
import searchBlogs from '../../mixins/searchMixin.js'

export default {
   name: 'App',
   components: {
      'posts-component': Posts,
      'post-component': SinglePost,
      'app-sidebar': Sidebar,
   },
   data() {
      return {
         allPosts: true,
         blogs: [],
         post: {},
         filter: '',
         categories: [],
      }
   },
   methods: {
      readPost(id) {
         fetch("http://localhost/02phpprojects/simple_blog_pdo/api/post/read_single.php?id=" + id)
            .then(response => response.json())
            .then((data) => {
               this.post = data;
            });
         this.allPosts = false
      },
      back() {
         this.allPosts = true;
      },
      updateList(search) {
         this.filter = search;
      }
   },
   mounted() {
      console.log("mounted!");
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
   },
   mixins: [searchBlogs]
}
</script>

