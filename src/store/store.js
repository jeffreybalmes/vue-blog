import Vue from 'vue';
import Vuex from 'vuex';
import db from '../components/firebaseInit';

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
         db.collection('posts').get().then(querySnapshot => {
            // state.blogs = [];
            var dataArr = [];
            querySnapshot.forEach(doc => {
               db.collection('categories').doc(doc.data().category_id).get().then(documentSnapshot => {
                  const data = {
                     'id': doc.id,
                     'title': doc.data().title,
                     'body': doc.data().body,
                     'category_id': doc.data().category_id,
                     'category_name': documentSnapshot.data().name
                  };

                  dataArr.push(data);
               });
            })
            state.blogs = dataArr;
         })
      },
      fetchBlog(state, payload) {
         db.collection('posts').doc(payload).get()
            .then(documentSnapshot => {
               var data = documentSnapshot.data();
               state.blog.title = data.title;
               state.blog.body = data.body;
               state.blog.category_id = data.category_id;
               db.collection('categories').doc(data.category_id).get().then(documentSnapshot => {
                  state.blog.category_name = documentSnapshot.data().name;
               });
            })
      },
      addBlog(state) {
         db.collection('posts').add({
            title: state.blog.title,
            body: state.blog.body,
            category_id: state.blog.category_id
         });
         state.blog.title = '';
         state.blog.body = '';
         state.blog.category_id = '';
      },
      updateBlog(state, payload) {
         db.collection('posts').doc(payload).update({
            title: state.blog.title,
            body: state.blog.body,
            category_id: state.blog.category_id
         })

      },
      deleteBlog(state, payload) {
         if (confirm('are you sure?')) {
            db.collection('posts').doc(payload.id).delete();
            state.blogs.splice(payload.index, 1);
         }
      },
      fetchCategories(state) {
         db.collection('categories').orderBy('name').get().then(querySnapshot => {
            state.categories = [];
            querySnapshot.forEach(doc => {
               const data = {
                  'id': doc.id,
                  'name': doc.data().name
               }
               state.categories.push(data);
            })
         })
      },
      fetchCategory(state, payload) {
         db.collection('categories').doc(payload).get()
            .then(documentSnapshot => {
               state.category.id = documentSnapshot.id;
               state.category.name = documentSnapshot.data().name;
               state.editPlaceholder = `edit ${state.category.name} category`;
               state.editCategory = true;
            })
      },
      addCategory(state) {
         db.collection('categories').add({
            name: state.category.name
         })
      },
      updateCategory(state, payload) {
         db.collection('categories').doc(payload).update({
            name: state.category.name
         })
      },
      deleteCategory(state, payload) {
         if (confirm('are you sure?')) {
            db.collection('categories').doc(payload.id).delete();
            state.categories.splice(payload.index, 1);
         }
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
      updateBlog(context, payload) {
         context.commit('updateBlog', payload);
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
      updateCategory(context, payload) {
         context.commit('updateCategory', payload);
      },
      deleteCategory(context, payload) {
         context.commit('deleteCategory', payload);
      }
   }
});
