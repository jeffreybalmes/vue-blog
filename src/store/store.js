import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({
   state: {
      blog: {},
      blogs: [],
      categories: [],
   },
   mutations: {
      fetchBlogs(state) {
         fetch("http://localhost/02phpprojects/simple_blog_pdo/api/post/read.php")
            .then(response => response.json())
            .then((blogs) => {
               state.blogs = blogs;
            })
      },
      fetchBlog(state, payload) {
         fetch("http://localhost/02phpprojects/simple_blog_pdo/api/post/read_single.php?id=" + payload)
            .then(response => response.json())
            .then((data) => {
               state.blog = data;
            });
      },
      fetchCategories(state) {
         fetch("http://localhost/02phpprojects/simple_blog_pdo/api/category/read.php")
            .then(response => response.json())
            .then((categories) => {
               state.categories = categories;
            })
      }
   },
   actions: {
      fetchBlog(context, payload) {
         context.commit('fetchBlog', payload);
      },
      fetchBlogs(context) {
         context.commit('fetchBlogs');
      },
      fetchCategories(context) {
         context.commit('fetchCategories');
      }
   }

});
