<template>
   <div class="col-2 bg-dark">
      <div class="list-group mt-4 mx-2">
         <router-link to="/admin/post"
            :class="{active: isActive == 'post-table'}"
            class="list-group-item list-group-item-action">
            Posts
         </router-link>
         <router-link to="/admin/category"
            :class="{active: isActive == 'category-table'}"
            class="list-group-item list-group-item-action">
            Categories
         </router-link>
      </div>
   </div>
</template>

<script>
export default {
   name: 'admin-menu',
   data() {
      return {

      }
   },
   props: ['isActive'],
}
</script>

