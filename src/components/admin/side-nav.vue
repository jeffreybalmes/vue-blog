<template>
   <div class="col-2 bg-dark">
      <div class="list-group mt-4 mx-2">
         <router-link to="/admin/post"
            :class="{active: component == 'post-table'}"
            class="list-group-item list-group-item-action">
            Posts <span class="badge badge-pill bg-secondary text-white float-right">{{ blogs.length }}</span>
         </router-link>
         <router-link to="/admin/category"
            :class="{active: component == 'category-table'}"
            class="list-group-item list-group-item-action">
            Categories <span class="badge badge-pill bg-secondary text-white float-right">{{ categories.length }}</span>
         </router-link>
      </div>
   </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
   name: 'admin-menu',
   computed: {
      ...mapState({
         component: state => state.component,
         blogs: state => state.blogs,
         categories: state => state.categories
      })
   }
}
</script>

