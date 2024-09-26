import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import SignInPage from '../views/SignInPage.vue'
import ServicePage from '../views/ServicePage.vue'
import OwnersPage from '../views/OwnersPage.vue'
import LandHoldingsPage from '../views/LandHoldingsPage.vue'
import { useAuth } from '../AuthContext';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: AboutView
    },
    {
      path: '/signin',
      name: 'signin',
      component: SignInPage
    },
    {
      path: '/services',
      name: 'services',
      component: ServicePage
    },
    {
      path: '/owners',
      name: 'owners',
      component: OwnersPage
    },
    {
      path: '/land-holdings',
      name: 'land-holdings',
      component: LandHoldingsPage
    }
  ]
});

router.beforeEach((to, from, next) => {
  const { user } = useAuth();
  if (to.meta.requiresAuth && !user.value) {
    next({ name: 'signin' });
  } else {
    next();
  }
});

export default router
