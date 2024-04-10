import { createRouter, createWebHistory } from "vue-router";
import { cookieValueOrNull } from '@/utils/cookieCheck.js';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("@/views/HomeView.vue"),
      meta: { requiresAuth: true },
    },
    {
      path: "/login",
      name: "login",
      component: () => import("@/views/LoginView.vue"),
    },
    {
      path: "/callback",
      name: "callback",
      component: () => import("@/views/CallbackView.vue"),
    },
    {
      path: "/recent",
      name: "recent",
      component: () => import("@/views/RecentView.vue"),
    }
  ],
});

router.beforeEach((to, _, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    const token = cookieValueOrNull('accessToken')
    if (!token) {
      next({ name: 'login' });
    } else {
      next()
    }
  } else {
    next();
  }
})

export default router