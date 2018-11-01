<template>
   <div>
      <div class="container-fluid">
         <div class="row">

            <admin-menu
               :posts="filteredBlogs"
               :cats="categories"
               :isActive="component"
               @showPosts="showPostsTable()"
               @showCategories="showCategoriesTable()">
            </admin-menu>

            <admin-table
               v-if="component == 'post-table'"
               :posts="filteredBlogs"
               @updateList="updateList($event)"
               @showAddForm="component = 'create-post'"
               @editPost="readPost($event)"
               @deletePost="deletePost($event)">
            </admin-table>

            <category-table
               v-if="component == 'category-table'"
               @deleteCategory="deleteCategory($event)"
               @updateCategoryList="showCategoriesTable()"
               :cats="categories">
            </category-table>

            <update-post
               v-else-if="component == 'update-post'"
               :blog="post"
               :cats="categories"
               @back="showPostsTable()">
            </update-post>

            <create-post
               v-else-if="component == 'create-post'"
               :cats="categories"
               @back="showPostsTable()">
            </create-post>

         </div>
      </div>
   </div>
</template>

<script>

import SideNav from './side-nav.vue'
import PostTable from './post-table.vue'
import CategoryTable from './category-table.vue'
import CreatePost from './create-post.vue'
import UpdatePost from './update-post.vue'
import searchBlogs from '../../mixins/searchMixin.js'


export default {
   name: 'admin',
   components: {
      'admin-menu': SideNav,
      'admin-table': PostTable,
      'category-table': CategoryTable,
      'create-post': CreatePost,
      'update-post': UpdatePost
   },
   data() {
      return {
         component: 'post-table',
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
         this.component = 'update-post'
      },
      updateList(search) {
         this.filter = search;
      },
      deletePost(args) {
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
      },
      deleteCategory(args) {
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
      },
      fetchData() {
         fetch("http://localhost/02phpprojects/simple_blog_pdo/api/post/read.php")
            .then(response => response.json())
            .then((blogs) => {
               this.blogs = blogs;

               fetch("http://localhost/02phpprojects/simple_blog_pdo/api/category/read.php")
                  .then(response => response.json())
                  .then((categories) => {
                     this.categories = categories;
                  })
            })
      },
      showPostsTable() {
         this.fetchData();
         this.component = 'post-table';
      },
      showCategoriesTable() {
         this.fetchData();
         this.component = 'category-table';
      },
   },
   mounted() {
      this.fetchData();
   },
   mixins: [searchBlogs]
};
</script>
