import Posts from './components/post/index.vue'
import Admin from './components/admin/admin.vue'
import PostSingle from './components/post/single-post.vue'

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
      name: 'Posts',
      component: Posts
   },
   {
      path: '/admin',
      name: 'Admin',
      component: Admin
   },
   {
      path: '/post/:id',
      name: 'Post',
      component: PostSingle
   }
]