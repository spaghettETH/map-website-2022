import { createRouter, createWebHistory } from 'vue-router';
import MapPage from './pages/MapPage.vue';
import BlogPage from './pages/BlogPage.vue';
import BlogPost from './pages/BlogPost.vue';
import Intro from './pages/Intro.vue';
import Ecosystem from './pages/Ecosystem.vue';
import Projects from './pages/Projects.vue';
import Menu from './organisms/Menu.vue';
import Membership from './pages/Membership.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: MapPage
  },
  {
    path: '/blog',
    name: 'Blog',
    component: BlogPage
  },
  {
    path: '/blog/:slug',
    name: 'BlogPost',
    component: BlogPost
  },
  {
    path: '/intro',
    name: 'Intro',
    component: Intro
  },
  {
    path: '/ecosystem',
    name: 'Ecosystem',
    component: Ecosystem
  },
  {
    path: '/projects',
    name: 'Projects',
    component: Projects
  },
  {
    path: '/menu',
    name: 'Menu',
    component: Menu
  },
  {
    path: '/membership',
    name: 'Membership',
    component: Membership
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router; 