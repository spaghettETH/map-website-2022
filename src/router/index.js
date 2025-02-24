import { createRouter, createWebHistory } from 'vue-router';
import BlogPost from '../pages/BlogPost.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    // ... altre route ...
    {
      path: '/blog/:slug',
      name: 'BlogPost',
      component: BlogPost,
      props: true
    }
  ]
});

export default router; 