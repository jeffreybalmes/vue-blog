<template>
   <div class="col-md-4">
      <search-box v-if="show" :component="component"></search-box>
      <category-list :cats="cats"></category-list>
   </div> <!-- /.col-md-4 -->
</template>

<script>
import searchInput from './search-input.vue'
import categoryList from './category-list.vue';

export default {
   name: 'sidebar',
   components: {
      'search-box': searchInput,
      'category-list': categoryList
   },
   props: ['cats', 'show', 'component'],
   data() {
      return {
         value: ''
      }
   }
}
</script>

