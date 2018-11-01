import Posts from './components/post/index.vue'
import Admin from './components/admin/admin.vue'
import CreatePost from './components/admin/create-post.vue'

/*
   TODO: setup all routes
   All Posts
      Single Post with id/params

   Dashboard
      Create Post
      Update Post with id/params
   All Categories
      edit with id/params

   VUE X - state management
   naming and organization of data
 */
export default [
   {
      path: '/',
      component: Posts
   },
   {
      path: '/admin',
      component: Admin
   },
   {
      path: '/create-post',
      component: CreatePost
   }
]