<template>
   <div>
      <div class="container mb-5">
         <div class="row mt-4">

            <div class="col-md-8">
               <div>
                  <h2>{{ blog.title }}</h2>
                  <small class="text-muted">{{ blog.category_name }}</small>
                  <p class="card-text mt-3 mb-2">{{ blog.body }}</p>
                  <div class="form-group mt-4">
                     <router-link to="/" class="btn btn-default">&laquo; Back</router-link>
                  </div>
               </div>
            </div> <!-- /.col-md-8 -->

            <app-sidebar :showSearch="false"></app-sidebar>

         </div>
      </div>
   </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
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
      }
   },
   computed: {
      ...mapState({
         blog: state => state.blog,
         categories: state => state.categories,
      }),
   },
   methods: {
      ...mapActions([
         'fetchBlog',
         'fetchCategories'
      ])
   },
   created() {
      this.fetchBlog(this.id);
      this.fetchCategories();
   }
}
</script>

