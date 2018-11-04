import Posts from './components/post/index.vue'
import PostSingle from './components/post/single-post.vue'
import PostTable from './components/admin/admin.vue'
import CategoryTable from './components/admin/category-table.vue'
import CreatePost from './components/admin/create-post.vue'
import UpdatePost from './components/admin/update-post.vue'

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
      path: '/admin/post',
      name: 'PostTable',
      component: PostTable
   },
   {
      path: '/post/:id',
      name: 'Post',
      component: PostSingle
   },
   {
      path: '/admin/category',
      name: 'CategoryTable',
      component: CategoryTable
   },
   {
      path: '/admin/post/create',
      name: 'CreatePost',
      component: CreatePost
   },
   {
      path: '/admin/post/edit/:id',
      name: 'UpdatePost',
      component: UpdatePost
   },
   {
      path: '/admin/category/edit/:id',
      component: CategoryTable
   }

]