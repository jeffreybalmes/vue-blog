<template>
   <div>
      <div class="container-fluid">
         <div class="row">
            <admin-menu :isActive="component"></admin-menu>

            <div class="col-9">
               <span class="alert alert-success float-right mt-4" role="alert">{{status.message}}</span>
               <h2 class="ml-5 mt-4 mb-3">New Post</h2>
               <form class="ml-5" @submit.prevent="addBlog()">
                  <div class="row">
                     <div class="col-md-8">
                        <div class="form-group">
                           <label>Title</label>
                           <input type="text" class="form-control" name="title" v-model="blog.title">
                        </div>
                        <div class="form-group">
                           <label>Body</label>
                           <textarea class="form-control" name="body" rows="9" v-model="blog.body"></textarea>
                        </div>
                        <label class="my-1 mr-2">Categories</label>
                        <select class="custom-select my-1 mr-sm-2" name="category_id" v-model="blog.category_id">
                           <option selected>Choose...</option>
                           <option v-for="category in categories" :value="category.id">{{category.name}}</option>
                        </select>
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
import { mapState, mapActions } from 'vuex'
import SideNav from './side-nav.vue'

export default {
   name: 'create',
   components: {
      'admin-menu': SideNav,
   },
   computed: {
      ...mapState({
         blog: state => state.blog,
         categories: state => state.categories,
         component: state => state.component,
         status: state => state.status
      })
   },
   methods: {
      ...mapActions([
         'fetchCategories',
         'resetBlogState',
         'addBlog'
      ])
   },
   created() {
      this.resetBlogState();
      this.fetchCategories();
   }
}
</script>

