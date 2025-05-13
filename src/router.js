import { createRouter, createWebHistory } from 'vue-router';
import MapPage from './pages/MapPage.vue';
import SlidesArchive from './pages/SlidesArchive.vue';
import SlidePost from './pages/SlidePost.vue';
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
    path: '/slides-archive',
    name: 'SlidesArchive',
    component: SlidesArchive
  },
  {
    path: '/slides-archive/:slug',
    name: 'SlidePost',
    component: SlidePost
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