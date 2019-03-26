<template>
   <div class="col-md-4">
      <search-box v-if="showSearch" :component="component"></search-box>
      <category-list></category-list>
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
   props: ['showSearch', 'component']
}
</script>

