<template>
   <div>
      <h4 class="mb-4">Categories</h4>
      <ul class="list-group list-group-flush">
         <li v-for="category in categories" class="list-group-item">
            <router-link :to="{ name: 'Posts', query: { search: category.name }}">{{category.name}}</router-link>
         </li>
      </ul>
   </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
   name: 'categoryList',
   computed: {
      ...mapState({
         categories: state => state.categories,
      })
   }
}
</script>

