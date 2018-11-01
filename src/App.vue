<template>
  <div>
      <app-navbar></app-navbar>
      <router-view></router-view>
      <app-footer></app-footer>
  </div>
</template>

<script>
import Navbar from './components/layout/navbar.vue'
import Footer from './components/layout/footer.vue'

export default {
  name: 'app',
  components: {
      'app-navbar': Navbar,
      'app-footer': Footer
   },
}
</script>
