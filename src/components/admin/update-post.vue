<template>
   <div>
      <div class="container-fluid">
         <div class="row">
            <admin-menu :isActive="component"></admin-menu>

            <div class="col-9">
               <span class="alert alert-success float-right mt-4" role="alert">{{status.message}}</span>
               <h2 class="ml-5 mt-4 mb-3">Update Post</h2>
               <form class="ml-5" method="post" @submit.prevent="updatePost(post)">
                  <div class="row">
                     <div class="col-md-8">
                        <div class="form-group">
                           <label>Title</label>
                           <input type="text" class="form-control" name="title" v-model="post.title">
                        </div>
                        <div class="form-group">
                           <label>Body</label>
                           <textarea class="form-control" name="body" rows="9" v-model="post.body">
                           </textarea>
                        </div>
                        <label class="my-1 mr-2">Categories</label>
                        <select class="custom-select my-1 mr-sm-2" name="category_id" v-model="post.category_id">
                           <option v-for="category in categories" :value="category.id" :selected="post.category_name == category.name">
                              {{category.name}}
                           </option>
                        </select>
                        <input type="hidden" name="id" v-model="post.id"/>
                        <div class="form-group mt-4">
                           <button type="submit" class="btn btn-primary" name="submit">Save</button>
                           <router-link to="/admin/post" class="btn btn-secondary">Cancel</router-link>
                        </div>
                     </div> <!-- /.col-md-8 -->
                     <div class="col-md-4"></div> <!-- /.col-md-4 -->
                  </div> <!-- /.row -->
               </form>
            </div>

         </div>
      </div>
   </div>
</template>

<script>
import SideNav from './side-nav.vue'

export default {
   name: 'update',
   components: {
      'admin-menu': SideNav,
   },
   data() {
      return {
         component: 'post-table',
         id: this.$route.params.id,
         post: {},
         categories: [],
         status: {},
      }
   },
   methods: {
      updatePost(blog) {
         fetch("http://localhost/02phpprojects/simple_blog_pdo/api/post/update.php", {
            headers: {
               'Accept': 'application/json',
               'Content-Type': 'application/json'
            },
            method: 'PUT',
            body: JSON.stringify(blog)
         })
         .then(response => response.json())
         .then((message) => {
            this.status = message;
            this.$router.push({ path: '/admin/post'});
         })
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

