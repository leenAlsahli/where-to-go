import { createRouter, createWebHistory } from 'vue-router';


import Login from '@/components/pages/Login.vue';
import CreateAccount from '@/components/pages/CreateAccount.vue';
import ForgotPassword from '@/components/pages/ForgotPassword.vue';


import Home from '@/components/pages/Home.vue';
import EventDetails from '@/components/pages/EventDetails.vue';
import ProfilePage from '@/components/pages/ProfilePage.vue';

const BookingDetails = () => import('@/components/pages/BookingDetails.vue');
const Booked = () => import('@/components/pages/Booked.vue');
const Share = () => import('@/components/pages/Share.vue');

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/create-account',
    name: 'CreateAccount',
    component: CreateAccount
  },
  {
    path: '/forgot-password',
    name: 'ForgotPassword',
    component: ForgotPassword
  },
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path: '/event/:id',
    name: 'EventDetails',
    component: EventDetails,
    props: route => ({ event: JSON.parse(route.query.data) })
  },
  {
    path: '/profile',
    name: 'Profile',
    component: ProfilePage
  },
  {
    path: '/booking-details',
    name: 'BookingDetails',
    component: BookingDetails
  },
  {
    path: '/booked',
    name: 'Booked',
    component: Booked
  },
  {
    path: '/share',
    name: 'Share',
    component: Share
  },{
    path: '/browsing',
    name: 'Browsing',
    component: () => import('@/components/pages/Browsing.vue')
  },{
    path: '/settings',
    name: 'EditProfile',
    component: () => import('@/components/pages/EditProfile.vue')
  },{
    path: '/organizer-signup',
    name: 'JoinAsOrganizer',
    component: () => import('@/components/pages/JoinAsOrganizer.vue')
  }
  
  
  
  
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {

    return { top: 0 };
  }
});

export default router;
