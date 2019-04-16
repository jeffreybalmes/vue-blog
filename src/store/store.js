import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({
   state: {
      blogs: [],
      blog: {
         title: '',
         body: '',
         category_id: '',
         category_name: ''
      },
      categories: [],
      category: {
         id: '',
         name: ''
      },
      editCategory: false,
      editPlaceholder: 'add new category...',
      component: 'post-table',
      status: {}
   },
   mutations: {
      resetBlogState(state) {
         state.blog.title = '';
         state.blog.body = '';
         state.blog.category_id = '';
         state.blog.category_name = '';
      },
      resetCategoryState(state) {
         state.category.id = '';
         state.category.name = '';
         state.editPlaceholder = 'add new category...';
         state.editCategory = false;
      },
      fetchBlogs(state) {
         fetch("https://jeffreybalmes.000webhostapp.com/api/post/read.php")
            .then(response => response.json())
            .then((blogs) => {
               state.blogs = blogs;
            })
      },
      fetchBlog(state, payload) {
         fetch("https://jeffreybalmes.000webhostapp.com/api/post/read_single.php?id=" + payload)
            .then(response => response.json())
            .then((data) => {
               state.blog.title = data.title;
               state.blog.body = data.body;
               state.blog.category_id = data.category_id;
               state.blog.category_name = data.category_name;
            });
      },
      addBlog(state) {
         fetch("https://jeffreybalmes.000webhostapp.com/api/post/create.php", {
            headers: {
               'Accept': 'application/json',
               'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify(state.blog)
         })
            .then(response => response.json())
            .then((message) => {
               state.status = message;
               state.blog.title = '';
               state.blog.body = '';
               state.blog.category_id = '';
            })
      },
      // FIXME: update method
      updateBlog(state) {
         console.log(state.blog);
         fetch("https://jeffreybalmes.000webhostapp.com/api/post/update.php", {
            headers: {
               'Accept': 'application/json',
               'Content-Type': 'application/json'
            },
            method: 'PUT',
            body: JSON.stringify(state.blog)
         });
      },
      deleteBlog(state, payload) {
         fetch("https://jeffreybalmes.000webhostapp.com/api/post/delete.php", {
            body: JSON.stringify({ id: payload.id }),
            method: "DELETE",
            headers: {
               'Content-Type': 'application/json'
            }
         })
            .then(response => response.json())
            .then((message) => {
               state.status = message;
               state.blogs.splice(payload.index, 1);
            })
      },
      fetchCategories(state) {
         fetch("https://jeffreybalmes.000webhostapp.com/api/category/read.php")
            .then(response => response.json())
            .then((categories) => {
               state.categories = categories;
            })
      },
      fetchCategory(state, payload) {
         fetch("https://jeffreybalmes.000webhostapp.com/api/category/read_single.php?id=" + payload)
            .then(response => response.json())
            .then((data) => {
               state.category = data;
               state.editPlaceholder = `edit ${state.category.name} category`;
               state.editCategory = true;
            });
      },
      addCategory(state) {
         fetch("https://jeffreybalmes.000webhostapp.com/api/category/create.php", {
            headers: {
               'Accept': 'application/json',
               'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({
               name: state.category.name
            }),
         });
      },
      updateCategory(state) {
         fetch("https://jeffreybalmes.000webhostapp.com/api/category/update.php", {
            headers: {
               'Accept': 'application/json',
               'Content-Type': 'application/json'
            },
            method: 'PUT',
            body: JSON.stringify(state.category)
         });
      },
      deleteCategory(state, payload) {
         fetch("https://jeffreybalmes.000webhostapp.com/api/category/delete.php", {
            body: JSON.stringify({ id: payload.id }),
            method: "DELETE",
            headers: {
               'Content-Type': 'application/json'
            }
         })
            .then(response => response.json())
            .then((message) => {
               state.status = message;
               state.categories.splice(payload.index, 1);
            })
      }
   },
   actions: {
      resetBlogState(context) {
         context.commit('resetBlogState');
      },
      resetCategoryState(context) {
         context.commit('resetCategoryState');
      },
      fetchBlogs(context) {
         context.commit('fetchBlogs');
      },
      fetchBlog(context, payload) {
         context.commit('fetchBlog', payload);
      },
      addBlog(context) {
         context.commit('addBlog');
      },
      updateBlog(context) {
         context.commit('updateBlog');
      },
      deleteBlog(context, payload) {
         context.commit('deleteBlog', payload);
      },
      fetchCategories(context) {
         context.commit('fetchCategories');
      },
      fetchCategory(context, payload) {
         context.commit('fetchCategory', payload);
      },
      addCategory(context) {
         context.commit('addCategory');
      },
      updateCategory(context) {
         context.commit('updateCategory');
      },
      deleteCategory(context, payload) {
         context.commit('deleteCategory', payload);
      }
   }
});
