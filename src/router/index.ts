import {
  createRouter,
  createWebHistory,
  type Router,
  type RouterHistory,
  type RouteRecordRaw
} from 'vue-router';
import HomeView from '@/views/HomeView.vue';

export const ROUTE_NAMES = {
  home: 'home'
} as const;

export type RouteName = (typeof ROUTE_NAMES)[keyof typeof ROUTE_NAMES];

export const routes = [
  {
    path: '/',
    name: ROUTE_NAMES.home,
    component: HomeView
  }
] satisfies RouteRecordRaw[];

export const createAppRouter = (history: RouterHistory = createWebHistory()): Router =>
  createRouter({
    history,
    routes
  });
