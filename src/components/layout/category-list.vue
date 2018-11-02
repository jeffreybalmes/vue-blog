<template>
   <div>
      <h4 class="mb-4">Categories</h4>
      <ul class="list-group list-group-flush">
         <li v-for="category in cats" class="list-group-item">
            <router-link :to="{ name: 'Posts', query: { search: category.name }}">{{category.name}}</router-link>
         </li>
      </ul>
   </div>
</template>

<script>
export default {
   name: 'categoryList',
   props: ['cats'],
   data() {
      return {
         value: ''
      }
   }
}
</script>

