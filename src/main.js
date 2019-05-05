import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import Routes from './routes'
import bootstrap from 'bootstrap/dist/css/bootstrap.min.css'
import jQuery from 'jquery'
import { store } from './store/store'

Vue.config.productionTip = false
Vue.use(VueRouter);

const router = new VueRouter({
   routes: Routes,
   mode: 'history'
});

new Vue({
   store: store,
   router: router,
   render: h => h(App)
}).$mount('#app')
